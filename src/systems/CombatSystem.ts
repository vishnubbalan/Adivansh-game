import Phaser from 'phaser';
import { EVENTS } from '../core/events';
import { canAttack, canTakeContactDamage, isStrikeInRange, isWithinContactReach } from '../game/combat';
import { TUNING } from '../game/tuning';
import type { Guardian } from '../entities/Guardian';
import type { Player } from '../entities/Player';
import type { StorySystem } from './StorySystem';
import type { VfxManager } from '../vfx/VfxManager';

const P = TUNING.player;
const G = TUNING.guardian;

/** Resolves player strikes, guardian contact damage and the defeat / respawn flow. */
export class CombatSystem {
  private lastContactDamage = -Infinity;

  constructor(
    private scene: Phaser.Scene,
    private player: Player,
    private guardian: Guardian,
    private story: StorySystem,
    private vfx: VfxManager,
    private respawn: () => void
  ) {}

  playerAttack(time: number): void {
    if (!canAttack(time, this.player.lastAttack, P.attackCooldownMs) || this.guardian.defeated) return;
    this.player.lastAttack = time;
    const facing = this.player.facing;
    this.player.playAttackPose();
    this.vfx.slash(this.player.x + facing * 25, this.player.y - 42, facing);

    const hit = isStrikeInRange(
      { x: this.player.x, y: this.player.y }, { x: this.guardian.x, y: this.guardian.y }, facing, G.strikeReach
    );
    const events = this.scene.game.events;
    if (!hit) { events.emit(EVENTS.toast, 'Move closer and face the demon to strike.'); return; }

    const remaining = this.guardian.takeHit(facing);
    this.vfx.hit(this.guardian.x - facing * 20, this.guardian.y - 25, facing);
    events.emit(EVENTS.toast, `Blade hit! Demon strength: ${remaining}/${G.maxHealth}`);
    if (remaining <= 0) {
      const { x, y } = this.guardian;
      this.guardian.defeat();
      this.vfx.defeat(x, y - 20);
      this.story.guardianDefeated();
    }
  }

  update(time: number): void {
    const g = this.guardian;
    if (g.defeated || !g.chasing) return;
    if (isWithinContactReach(g.x, this.player.x, G.contactReach) &&
        canTakeContactDamage(time, this.lastContactDamage, G.contactCooldownMs)) {
      this.lastContactDamage = time;
      this.damagePlayer();
    }
  }

  private damagePlayer(): void {
    const events = this.scene.game.events;
    const remaining = this.player.takeHit(this.guardian.x);
    if (remaining === 0) {
      events.emit(EVENTS.toast, 'The forest has overcome you. Returning to the trail…');
      this.scene.time.delayedCall(P.respawnDelayMs, () => { this.player.restoreHealth(); this.respawn(); });
    } else {
      events.emit(EVENTS.toast, 'The demon struck! Keep your distance.');
    }
  }
}
