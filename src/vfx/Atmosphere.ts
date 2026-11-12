import Phaser from 'phaser';
import type { ResolvedQuality } from './quality';
import { seededRandom } from './textures';

const ADD = Phaser.BlendModes.ADD;

const randomZone = (rect: Phaser.Geom.Rectangle) =>
  new Phaser.GameObjects.Particles.Zones.RandomZone(rect as unknown as Phaser.Types.GameObjects.Particles.RandomZoneSource);

/**
 * Ambient layers behind, inside and in front of the playfield.
 * Layer order (depth): backdrop -20, far fog -15, light shafts -10, near fog 2,
 * fireflies/leaves 7, hero 10, foreground ferns 18, vignette 40.
 * Nothing here blocks gameplay: foreground layers sit at the screen's bottom edge only.
 */
export class Atmosphere {
  private fogLayers: Array<{ sprite: Phaser.GameObjects.TileSprite; parallax: number; drift: number }> = [];
  private followers: Phaser.GameObjects.Particles.ParticleEmitter[] = [];
  private shafts: Phaser.GameObjects.Image[] = [];

  constructor(private scene: Phaser.Scene, private quality: ResolvedQuality, private worldWidth: number) {
    this.addFog();
    this.addLightShafts();
    this.addWaterfallShimmer();
    this.addPollen();
    if (quality.fireflies) this.addFireflies();
    if (quality.fallingLeaves) this.addFallingLeaves();
    if (quality.foregroundFerns) this.addForegroundFerns();
    scene.add.image(640, 360, 'vfx-vignette').setDisplaySize(1280, 720).setScrollFactor(0).setDepth(40);
  }

  update(time: number): void {
    const camera = this.scene.cameras.main;
    for (const layer of this.fogLayers) {
      layer.sprite.tilePositionX = camera.scrollX * layer.parallax + time * layer.drift * this.quality.driftScale;
    }
    // Spawn zones follow the camera so particles are only made where the player can see them.
    for (const emitter of this.followers) emitter.setPosition(camera.scrollX + 640, 0);
    const sway = this.quality.driftScale;
    this.shafts.forEach((shaft, i) => {
      shaft.setAlpha(0.07 + (Math.sin(time / (1800 + i * 230) * sway + i) + 1) * 0.045);
    });
  }

  private addFog(): void {
    if (this.quality.fogLayers >= 1) {
      this.fogLayers.push({ sprite: this.fogSprite(430, 0x7fb6a8, 0.17, -15), parallax: 0.35, drift: 0.008 });
    }
    if (this.quality.fogLayers >= 2) {
      this.fogLayers.push({ sprite: this.fogSprite(575, 0xb9d1c0, 0.2, 2), parallax: 0.8, drift: 0.02 });
    }
  }

  private fogSprite(y: number, tint: number, alpha: number, depth: number): Phaser.GameObjects.TileSprite {
    return this.scene.add.tileSprite(0, y, 1280, 160, 'vfx-fog')
      .setOrigin(0, 0.5).setScrollFactor(0).setTint(tint).setAlpha(alpha).setDepth(depth);
  }

  private addLightShafts(): void {
    const rnd = seededRandom(11);
    const span = this.worldWidth * 0.55 + 1280; // matches the 0.55 scroll factor
    for (let i = 0; i < this.quality.lightShafts; i++) {
      const shaft = this.scene.add.image((i + 0.3 + rnd() * 0.4) * (span / this.quality.lightShafts), -10, 'vfx-shaft')
        .setOrigin(0.5, 0).setScrollFactor(0.55).setDisplaySize(110 + rnd() * 90, 640)
        .setRotation(0.16).setTint(0xf3c77b).setBlendMode(ADD).setDepth(-10).setAlpha(0.1);
      this.shafts.push(shaft);
    }
  }

  private addWaterfallShimmer(): void {
    const water = this.scene.add.rectangle(1188, 455, 28, 310, 0xb9e6df, 0.16).setDepth(1);
    this.scene.tweens.add({ targets: water, alpha: { from: 0.08, to: 0.28 }, duration: 1100, yoyo: true, repeat: -1 });
    const mist = this.scene.add.ellipse(1000, 620, 280, 34, 0xb9c9b0, 0.08).setDepth(2);
    this.scene.tweens.add({ targets: mist, x: 850, duration: 9000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
  }

  /** Slow drifting golden pollen across the whole forest (the original ambient effect, now tier-aware). */
  private addPollen(): void {
    this.scene.add.particles(0, 0, 'vfx-spark', {
      x: { min: 0, max: this.worldWidth }, y: { min: 150, max: 650 }, lifespan: 5200,
      speedY: { min: -38, max: -18 }, speedX: { min: -10, max: 10 },
      scale: { start: 0.75, end: 0 }, alpha: { start: 0.65, end: 0 }, tint: 0xffe4a6,
      frequency: Math.round(190 / Math.max(0.5, this.quality.particleScale)), quantity: 1, blendMode: ADD
    }).setDepth(7);
  }

  private addFireflies(): void {
    const zone = new Phaser.Geom.Rectangle(-720, 300, 1440, 340);
    const emitter = this.scene.add.particles(0, 0, 'vfx-glow', {
      emitZone: randomZone(zone),
      lifespan: { min: 4000, max: 7000 }, frequency: 240,
      speedX: { min: -16, max: 16 }, speedY: { min: -14, max: 8 },
      scale: { start: 0.09, end: 0.09 }, alpha: { values: [0, 1, 0.25, 1, 0] },
      tint: [0xf6e08a, 0xc8f0a0], blendMode: ADD
    }).setDepth(7);
    this.followers.push(emitter);
  }

  private addFallingLeaves(): void {
    const zone = new Phaser.Geom.Rectangle(-760, -20, 1520, 10);
    const emitter = this.scene.add.particles(0, 0, 'vfx-leaf', {
      emitZone: randomZone(zone),
      lifespan: 7000, frequency: 650,
      speedY: { min: 30, max: 60 }, speedX: { min: -10, max: 40 },
      rotate: { start: 0, end: 360 }, scale: { min: 0.8, max: 1.2 }, alpha: { start: 0.85, end: 0.85 }
    }).setDepth(7);
    this.followers.push(emitter);
  }

  private addForegroundFerns(): void {
    const rnd = seededRandom(33);
    // Parallax 1.2: these slide past faster than the world, which sells depth.
    for (let x = -100; x < this.worldWidth * 1.2 + 1280; x += 210 + rnd() * 120) {
      this.scene.add.image(x, 722, 'vfx-fern').setOrigin(0.5, 1).setScrollFactor(1.2)
        .setDisplaySize(150 + rnd() * 60, 62 + rnd() * 22).setFlipX(rnd() > 0.5).setDepth(18);
    }
  }
}
