import Phaser from 'phaser';
import { EVENTS } from '../core/events';
import { CHAPTER_ONE_FINALE, getMilestone } from '../story/chapterOne';
import { CLUE_POSITION } from '../world/forestLayout';
import type { Player } from '../entities/Player';
import type { VfxManager } from '../vfx/VfxManager';

/** Clue pickup, story milestones, and the on-canvas status banner. */
export class StorySystem {
  hasClue = false;
  private clue: Phaser.Physics.Arcade.Image;
  private banner: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene, private player: Player, private vfx: VfxManager) {
    this.clue = scene.physics.add.image(CLUE_POSITION.x, CLUE_POSITION.y, 'clue').setDepth(8);
    // Static pickup: without this, world gravity drops the clue out of reach within a second of starting.
    this.clue.setImmovable(true);
    (this.clue.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    scene.physics.add.overlap(player.sprite, this.clue, () => this.collectClue());
    vfx.startClueBeacon(CLUE_POSITION.x, CLUE_POSITION.y);

    this.banner = scene.add.text(640, 80, 'THE FOREST IS WATCHING…', {
      fontFamily: 'Georgia, serif', fontSize: '18px', color: '#f4dfb1',
      stroke: '#101b2b', strokeThickness: 4, letterSpacing: 3
    }).setOrigin(0.5).setScrollFactor(0).setDepth(30).setAlpha(0);
  }

  showBanner(text: string | null, ms: number): void {
    if (text) this.banner.setText(text);
    this.banner.setAlpha(1);
    this.scene.time.delayedCall(ms, () => this.banner.setAlpha(0));
  }

  guardianDefeated(): void {
    const milestone = getMilestone('guardian-defeated');
    this.scene.game.events.emit(EVENTS.storyMilestone, milestone);
    this.scene.game.events.emit(EVENTS.toast, milestone.toast);
  }

  interact(): void {
    const near = Math.abs(this.player.x - this.clue.x) < 155 && Math.abs(this.player.y - this.clue.y) < 190;
    if (near && !this.hasClue) this.collectClue();
    else this.scene.game.events.emit(EVENTS.toast, this.hasClue
      ? 'The clue is recorded in your journal.'
      : 'Keep moving right. Look for the glowing clue near the forest shrine.');
  }

  private collectClue(): void {
    if (this.hasClue) return;
    this.hasClue = true;
    const { x, y } = this.clue;
    this.clue.destroy();
    this.vfx.clueRevealed(x, y);
    const events = this.scene.game.events;
    events.emit(EVENTS.clueCollected);
    const milestone = getMilestone('golden-thread-found');
    events.emit(EVENTS.storyMilestone, milestone);
    events.emit(EVENTS.storyComplete, CHAPTER_ONE_FINALE);
    events.emit(EVENTS.toast, milestone.toast);
    this.scene.time.delayedCall(2600, () => events.emit(EVENTS.toast, CHAPTER_ONE_FINALE.toast));
    this.showBanner('THE FIRST SIGN HAS BEEN FOUND', 2200);
  }
}
