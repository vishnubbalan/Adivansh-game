import Phaser from 'phaser';
import type { ResolvedQuality } from './quality';

type Facing = 1 | -1;
type Emitter = Phaser.GameObjects.Particles.ParticleEmitter;
const ADD = Phaser.BlendModes.ADD;

/** Fixed-size pool of images reused by short effects (flashes, rings, slashes). No per-hit allocation. */
class ImagePool {
  private items: Phaser.GameObjects.Image[] = [];
  constructor(
    private scene: Phaser.Scene,
    private texture: string,
    private depth: number,
    private capacity = 10
  ) {}

  acquire(): Phaser.GameObjects.Image {
    let image = this.items.find(item => !item.visible);
    if (!image && this.items.length < this.capacity) {
      image = this.scene.add.image(0, 0, this.texture).setDepth(this.depth).setBlendMode(ADD);
      this.items.push(image);
    }
    if (!image) {
      image = this.items.shift()!;
      this.scene.tweens.killTweensOf(image);
      this.items.push(image);
    }
    return image.setVisible(true).setActive(true).setAlpha(1).setScale(1).setRotation(0).setFlipX(false).clearTint().setOrigin(0.5);
  }

  release(image: Phaser.GameObjects.Image): void {
    image.setVisible(false).setActive(false);
  }
}

/**
 * Gameplay VFX facade. Gameplay code asks for *what happened* (hit, land, defeat);
 * this class decides *how it looks* and scales the cost to the active quality tier.
 * All emitters and sprites are created once and reused.
 */
export class VfxManager {
  private flashes: ImagePool;
  private rings: ImagePool;
  private slashes: ImagePool;
  private beams: ImagePool;

  private sparksRight: Emitter;
  private sparksLeft: Emitter;
  private hurtSparks: Emitter;
  private embers: Emitter;
  private dustLeft: Emitter;
  private dustRight: Emitter;
  private motes: Emitter;
  private beacon?: Emitter;
  private threat: Emitter;

  private heroLight: Phaser.GameObjects.Image;
  private guardianGlow: Phaser.GameObjects.Image;
  private damageVignette: Phaser.GameObjects.Image;

  private heroTarget?: Phaser.GameObjects.Components.Transform;
  private guardianTarget?: Phaser.GameObjects.Sprite;
  private guardianThreat = false;

  private zoomTween?: Phaser.Tweens.Tween;
  private timeUntil = 0;

  constructor(private scene: Phaser.Scene, private quality: ResolvedQuality) {
    this.flashes = new ImagePool(scene, 'vfx-glow', 21);
    this.rings = new ImagePool(scene, 'vfx-ring', 21);
    this.slashes = new ImagePool(scene, 'vfx-slash', 22, 4);
    this.beams = new ImagePool(scene, 'vfx-shaft', 6, 3);

    const sparkBase = {
      lifespan: { min: 220, max: 420 }, speed: { min: 140, max: 400 },
      scale: { start: 0.9, end: 0 }, alpha: { start: 1, end: 0 },
      gravityY: 500, blendMode: ADD, emitting: false
    };
    this.sparksRight = scene.add.particles(0, 0, 'vfx-spark', { ...sparkBase, angle: { min: -55, max: 55 } }).setDepth(21);
    this.sparksLeft = scene.add.particles(0, 0, 'vfx-spark', { ...sparkBase, angle: { min: 125, max: 235 } }).setDepth(21);
    this.hurtSparks = scene.add.particles(0, 0, 'vfx-spark', {
      ...sparkBase, angle: { min: 0, max: 360 }, tint: 0xff5a45, speed: { min: 80, max: 260 }
    }).setDepth(21);
    this.embers = scene.add.particles(0, 0, 'vfx-glow', {
      lifespan: { min: 900, max: 1600 }, speed: { min: 40, max: 220 }, angle: { min: 200, max: 340 },
      scale: { start: 0.22, end: 0 }, alpha: { start: 1, end: 0 }, gravityY: -40,
      tint: [0xff8a4a, 0xffc15a, 0xff5a3c], blendMode: ADD, emitting: false
    }).setDepth(21);
    const dust = {
      lifespan: { min: 280, max: 480 }, speed: { min: 30, max: 110 },
      scale: { start: 0.5, end: 1.4 }, alpha: { start: 0.55, end: 0 }, emitting: false
    };
    this.dustRight = scene.add.particles(0, 0, 'vfx-dust', { ...dust, angle: { min: -35, max: 5 } }).setDepth(11);
    this.dustLeft = scene.add.particles(0, 0, 'vfx-dust', { ...dust, angle: { min: 175, max: 215 } }).setDepth(11);
    this.motes = scene.add.particles(0, 0, 'vfx-glow', {
      lifespan: { min: 700, max: 1400 }, speed: { min: 30, max: 190 }, angle: { min: 0, max: 360 },
      scale: { start: 0.12, end: 0 }, alpha: { start: 1, end: 0 }, tint: [0xffe39a, 0xffd06a, 0xfff2c8],
      blendMode: ADD, emitting: false
    }).setDepth(21);
    this.threat = scene.add.particles(0, 0, 'vfx-glow', {
      lifespan: 650, frequency: 90, speedY: { min: -70, max: -30 }, speedX: { min: -25, max: 25 },
      x: { min: -30, max: 30 }, y: { min: -10, max: 40 },
      scale: { start: 0.1, end: 0 }, alpha: { start: 0.9, end: 0 }, tint: [0xff6a3a, 0xff9a4a],
      blendMode: ADD, emitting: false
    }).setDepth(10);

    this.heroLight = scene.add.image(0, 0, 'vfx-glow').setTint(0xffe0b0).setAlpha(0.16).setScale(2.4).setDepth(8).setBlendMode(ADD);
    this.guardianGlow = scene.add.image(0, 0, 'vfx-glow').setTint(0xff5a3c).setAlpha(0).setScale(2.6).setDepth(8).setBlendMode(ADD);
    this.damageVignette = scene.add.image(640, 360, 'vfx-vignette').setDisplaySize(1280, 720)
      .setScrollFactor(0).setDepth(41).setTint(0xff2a2a).setAlpha(0);

    this.applyCameraFx();
  }

  // ---- setup -----------------------------------------------------------

  private applyCameraFx(): void {
    // Bloom is WebGL-only and costs fill-rate, so it is limited to the high tier.
    if (!this.quality.bloom || this.scene.game.renderer.type !== Phaser.WEBGL) return;
    try {
      this.scene.cameras.main.postFX.addBloom(0xffffff, 1, 1, 1.1, 0.55, 4);
    } catch {
      /* Post-FX unsupported on this device; the game stays fully playable without it. */
    }
  }

  attachHero(target: Phaser.GameObjects.Components.Transform): void {
    this.heroTarget = target;
  }

  attachGuardian(target: Phaser.GameObjects.Sprite): void {
    this.guardianTarget = target;
    this.threat.startFollow(target, 0, 0);
  }

  /** Looping golden motes that draw the eye to the clue until it is collected. */
  startClueBeacon(x: number, y: number): void {
    this.beacon = this.scene.add.particles(x, y, 'vfx-glow', {
      x: { min: -18, max: 18 }, y: { min: -8, max: 8 }, lifespan: 1400, frequency: Math.round(140 / this.quality.particleScale),
      speedY: { min: -80, max: -40 }, scale: { start: 0.08, end: 0 }, alpha: { start: 0.9, end: 0 },
      tint: 0xffe39a, blendMode: ADD
    }).setDepth(9);
  }

  // ---- gameplay events -------------------------------------------------

  slash(x: number, y: number, facing: Facing): void {
    const image = this.slashes.acquire().setOrigin(0, 0.5).setPosition(x, y).setFlipX(facing < 0).setScale(0.7);
    this.scene.tweens.add({
      targets: image, scaleX: 1.15, scaleY: 1.05, alpha: 0, duration: 190, ease: 'Cubic.out',
      onComplete: () => this.slashes.release(image)
    });
  }

  hit(x: number, y: number, facing: Facing): void {
    (facing > 0 ? this.sparksRight : this.sparksLeft).explode(this.count(14), x, y);
    this.flash(x, y, 0xffd778, 1.4, 160);
    this.ring(x, y, 0xffe4a6, 0.2, 0.9, 260);
    this.hitStop(55);
    this.shake(110, 0.004);
    this.zoomPunch(0.02, 140);
  }

  hurt(x: number, y: number): void {
    this.hurtSparks.explode(this.count(12), x, y);
    this.flash(x, y, 0xff5a45, 1.6, 200);
    this.hitStop(70);
    this.shake(180, 0.006);
    this.pulseDamageVignette();
  }

  defeat(x: number, y: number): void {
    this.embers.explode(this.count(40), x, y);
    this.sparksRight.explode(this.count(10), x, y);
    this.sparksLeft.explode(this.count(10), x, y);
    this.flash(x, y, 0xffb060, 3.2, 420);
    this.ring(x, y, 0xffc27a, 0.3, 2.2, 560);
    this.ring(x, y, 0xfff0c8, 0.15, 1.5, 420);
    this.slowMotion(0.25, 260);
    this.shake(260, 0.007);
    this.zoomPunch(0.045, 340);
    if (this.quality.cameraEffects) this.scene.cameras.main.flash(140, 255, 220, 170);
    this.setGuardianThreat(false);
  }

  clueRevealed(x: number, y: number): void {
    this.beacon?.stop();
    const beacon = this.beacon;
    if (beacon) this.scene.time.delayedCall(1500, () => beacon.destroy());
    this.motes.explode(this.count(60), x, y);
    this.ring(x, y, 0xffe39a, 0.2, 2, 700);
    this.flash(x, y, 0xffe39a, 3, 600);
    const beam = this.beams.acquire().setOrigin(0.5, 1).setPosition(x, y + 40).setTint(0xffe39a).setScale(0.8, 0.1).setAlpha(0.9);
    this.scene.tweens.add({
      targets: beam, scaleY: 1, scaleX: 1.1, alpha: 0, duration: 1300, ease: 'Cubic.out',
      onComplete: () => this.beams.release(beam)
    });
    this.zoomPunch(0.03, 420);
  }

  jump(x: number, y: number): void {
    this.dustLeft.explode(this.count(3), x, y);
    this.dustRight.explode(this.count(3), x, y);
  }

  land(x: number, y: number, strength: number): void {
    const n = this.count(4 + Math.round(strength * 6));
    this.dustLeft.explode(n, x, y);
    this.dustRight.explode(n, x, y);
    if (strength > 0.6) this.shake(70, 0.0015 * strength);
  }

  runDust(x: number, y: number, direction: Facing): void {
    // Puff trails behind the runner.
    (direction > 0 ? this.dustLeft : this.dustRight).explode(1, x - direction * 10, y);
  }

  setGuardianThreat(active: boolean): void {
    if (active === this.guardianThreat) return;
    this.guardianThreat = active;
    if (active) this.threat.start(); else this.threat.stop();
  }

  // ---- per-frame -------------------------------------------------------

  update(time: number): void {
    if (this.heroTarget) this.heroLight.setPosition(this.heroTarget.x, this.heroTarget.y - 20);
    const guardian = this.guardianTarget;
    if (guardian?.active) {
      this.guardianGlow.setPosition(guardian.x, guardian.y);
      const pulse = 0.22 + Math.sin(time / 90) * 0.08;
      this.guardianGlow.setAlpha(this.guardianThreat ? pulse : 0);
    } else {
      this.guardianGlow.setAlpha(0);
    }
  }

  // ---- helpers ---------------------------------------------------------

  private count(n: number): number {
    return Math.max(1, Math.round(n * this.quality.particleScale));
  }

  private flash(x: number, y: number, tint: number, scale: number, duration: number): void {
    const image = this.flashes.acquire().setPosition(x, y).setTint(tint).setScale(scale * 0.5).setAlpha(0.9);
    this.scene.tweens.add({
      targets: image, scale, alpha: 0, duration, ease: 'Cubic.out', onComplete: () => this.flashes.release(image)
    });
  }

  private ring(x: number, y: number, tint: number, from: number, to: number, duration: number): void {
    const image = this.rings.acquire().setPosition(x, y).setTint(tint).setScale(from).setAlpha(0.9);
    this.scene.tweens.add({
      targets: image, scale: to, alpha: 0, duration, ease: 'Cubic.out', onComplete: () => this.rings.release(image)
    });
  }

  private pulseDamageVignette(): void {
    if (!this.quality.cameraEffects) return;
    this.scene.tweens.killTweensOf(this.damageVignette);
    this.damageVignette.setAlpha(0.7);
    this.scene.tweens.add({ targets: this.damageVignette, alpha: 0, duration: 420, ease: 'Quad.out' });
  }

  private shake(duration: number, intensity: number): void {
    if (this.quality.shakeScale <= 0) return;
    this.scene.cameras.main.shake(duration, intensity * this.quality.shakeScale);
  }

  private zoomPunch(amount: number, duration: number): void {
    if (!this.quality.cameraEffects) return;
    const camera = this.scene.cameras.main;
    this.zoomTween?.stop();
    const state = { v: 0 };
    this.zoomTween = this.scene.tweens.add({
      targets: state, v: 1, duration, yoyo: true, ease: 'Sine.out',
      onUpdate: () => camera.setZoom(1 + amount * state.v),
      onComplete: () => camera.setZoom(1)
    });
  }

  private hitStop(ms: number): void { this.slowMotion(0.04, ms); }

  /** Slows physics and tweens together. Restored from the scene clock, which is not itself slowed. */
  private slowMotion(scale: number, ms: number): void {
    if (!this.quality.cameraEffects) return;
    const until = this.scene.time.now + ms;
    this.timeUntil = Math.max(this.timeUntil, until);
    this.scene.physics.world.timeScale = 1 / scale;
    this.scene.tweens.timeScale = scale;
    this.scene.time.delayedCall(ms, () => {
      if (this.scene.time.now + 1 < this.timeUntil) return;
      this.scene.physics.world.timeScale = 1;
      this.scene.tweens.timeScale = 1;
    });
  }

  destroy(): void {
    this.scene.physics.world.timeScale = 1;
    this.scene.tweens.timeScale = 1;
    this.scene.cameras.main.setZoom(1);
  }
}
