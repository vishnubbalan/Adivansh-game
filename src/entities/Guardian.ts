import Phaser from 'phaser';
import { TUNING } from '../game/tuning';
import type { Facing } from '../game/combat';
import type { VfxManager } from '../vfx/VfxManager';

const G = TUNING.guardian;

/** The forest guardian enemy. Behaviour is intentionally unchanged from the prototype (chase, telegraph pose, contact damage). */
export class Guardian {
  readonly sprite: Phaser.Physics.Arcade.Sprite;
  health: number = G.maxHealth;
  defeated = false;

  constructor(private scene: Phaser.Scene, private vfx: VfxManager) {
    this.sprite = scene.physics.add.sprite(G.spawn.x, G.spawn.y, 'guardian-idle');
    this.sprite.setDisplaySize(142, 150);
    this.sprite.setCollideWorldBounds(true).setBounce(0.1).setSize(116, 154).setOffset(112, 88);
    this.sprite.setDepth(9);
    vfx.attachGuardian(this.sprite);
  }

  get x(): number { return this.sprite.x; }
  get y(): number { return this.sprite.y; }

  /** True while the guardian has noticed the player and is closing in. */
  chasing = false;

  update(playerX: number): void {
    if (this.defeated) return;
    this.chasing = Math.abs(this.sprite.x - playerX) < G.aggroRange;
    if (this.chasing) {
      const direction = playerX < this.sprite.x ? -1 : 1;
      this.sprite.setVelocityX(direction * G.chaseSpeed);
      this.sprite.setFlipX(direction < 0);
      if (this.sprite.texture.key !== 'guardian-attack') this.sprite.setTexture('guardian-telegraph');
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.setTexture('guardian-idle');
    }
    this.vfx.setGuardianThreat(this.chasing);
  }

  /** Returns remaining health. */
  takeHit(facing: Facing): number {
    this.health--;
    this.sprite.setTexture('guardian-attack');
    this.sprite.setTint(0xff8a62);
    this.sprite.setVelocityX(facing * G.hitKnockback);
    this.scene.time.delayedCall(G.hitFlashMs, () => {
      if (this.sprite.active) { this.sprite.clearTint(); this.sprite.setTexture('guardian-idle'); }
    });
    return this.health;
  }

  defeat(): void {
    this.defeated = true;
    this.chasing = false;
    this.sprite.setVelocity(0, 0);
    this.sprite.disableBody(true, true);
  }

  reset(): void {
    if (this.defeated) return;
    this.sprite.enableBody(true, G.spawn.x, G.spawn.y, true, true);
    this.health = G.maxHealth;
  }
}
