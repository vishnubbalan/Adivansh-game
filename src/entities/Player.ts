import Phaser from 'phaser';
import { EVENTS } from '../core/events';
import { damaged, facingFromFlip, type Facing } from '../game/combat';
import { TUNING } from '../game/tuning';
import type { InputSystem } from '../systems/InputSystem';
import type { VfxManager } from '../vfx/VfxManager';

const T = TUNING.player;

export class Player {
  readonly sprite: Phaser.Physics.Arcade.Sprite;
  health: number = T.maxHealth;
  lastAttack = -Infinity;
  private wasGrounded = true;
  private fallSpeed = 0;
  private nextRunPuff = 0;

  constructor(private scene: Phaser.Scene, private input: InputSystem, private vfx: VfxManager) {
    this.sprite = scene.physics.add.sprite(T.spawn.x, T.spawn.y, 'hero-idle');
    this.sprite.setDisplaySize(92, 104);
    this.sprite.setCollideWorldBounds(true).setBounce(0.02).setSize(104, 196).setOffset(88, 58);
    this.sprite.setDepth(10);
    vfx.attachHero(this.sprite);
  }

  get x(): number { return this.sprite.x; }
  get y(): number { return this.sprite.y; }
  get facing(): Facing { return facingFromFlip(this.sprite.flipX); }
  private get body(): Phaser.Physics.Arcade.Body { return this.sprite.body as Phaser.Physics.Arcade.Body; }

  update(time: number): void {
    const body = this.body;
    const grounded = body.blocked.down;

    if (this.input.isDown('left')) { this.sprite.setVelocityX(-T.runSpeed); this.sprite.setFlipX(true); }
    else if (this.input.isDown('right')) { this.sprite.setVelocityX(T.runSpeed); this.sprite.setFlipX(false); }
    else this.sprite.setVelocityX(0);

    const moving = Math.abs(body.velocity.x) > 10;
    if (grounded && this.sprite.texture.key !== 'hero-attack') {
      this.sprite.setTexture(moving ? 'hero-run' : 'hero-idle');
    }

    if (this.input.jumpRequested(grounded) && grounded) {
      this.sprite.setVelocityY(-T.jumpSpeed);
      this.vfx.jump(this.sprite.x, body.bottom);
    }

    if (grounded && !this.wasGrounded && this.fallSpeed > 220) {
      this.vfx.land(this.sprite.x, body.bottom, Math.min(1, this.fallSpeed / 700));
    }
    if (grounded && moving && time > this.nextRunPuff) {
      this.vfx.runDust(this.sprite.x, body.bottom, this.facing);
      this.nextRunPuff = time + 150;
    }
    if (!grounded) this.fallSpeed = body.velocity.y;
    this.wasGrounded = grounded;
  }

  playAttackPose(): void {
    this.sprite.setTexture('hero-attack');
    this.scene.time.delayedCall(T.attackPoseMs, () => {
      if (!this.sprite.active || this.sprite.texture.key !== 'hero-attack') return;
      this.sprite.setTexture(Math.abs(this.body.velocity.x) > 10 ? 'hero-run' : 'hero-idle');
    });
  }

  /** Applies one point of damage and knockback away from `fromX`. Returns remaining health. */
  takeHit(fromX: number): number {
    this.health = damaged(this.health);
    this.scene.game.events.emit(EVENTS.playerHealth, this.health);
    this.vfx.hurt(this.sprite.x, this.sprite.y - 30);
    this.sprite.setTint(0xff7777);
    this.scene.time.delayedCall(T.hurtTintMs, () => this.sprite.clearTint());
    this.sprite.setVelocityX(this.sprite.x < fromX ? -T.hurtKnockback : T.hurtKnockback);
    return this.health;
  }

  restoreHealth(): void {
    this.health = T.maxHealth;
    this.scene.game.events.emit(EVENTS.playerHealth, this.health);
  }

  respawn(): void {
    this.sprite.setPosition(T.spawn.x, T.spawn.y).setVelocity(0, 0);
  }
}
