import Phaser from 'phaser';
import { EVENTS } from '../core/events';
import { TUNING } from '../game/tuning';
import { Guardian } from '../entities/Guardian';
import { Player } from '../entities/Player';
import { CombatSystem } from '../systems/CombatSystem';
import { InputSystem } from '../systems/InputSystem';
import { StorySystem } from '../systems/StorySystem';
import { Atmosphere } from '../vfx/Atmosphere';
import { readQualityEnvironment, resolveQuality } from '../vfx/quality';
import { createClueTexture, createVfxTextures } from '../vfx/textures';
import { VfxManager } from '../vfx/VfxManager';
import { ART_ROOT, SVG_ASSETS } from '../world/artManifest';
import { buildForestLevel } from '../world/ForestLevel';
import { FOREST_WORLD } from '../world/forestLayout';

/**
 * Thin orchestrator: it creates the systems and runs them in order each frame.
 * Gameplay lives in entities/ and systems/, visuals in vfx/, layout data in world/.
 */
export class ForestScene extends Phaser.Scene {
  private started = false;
  private input_!: InputSystem;
  private player!: Player;
  private guardian!: Guardian;
  private story!: StorySystem;
  private combat!: CombatSystem;
  private vfx!: VfxManager;
  private atmosphere!: Atmosphere;

  constructor() { super('ForestScene'); }

  preload() {
    for (const asset of SVG_ASSETS) {
      this.load.svg(asset.key, ART_ROOT + asset.file, { width: asset.width, height: asset.height });
    }
  }

  create() {
    createClueTexture(this);
    createVfxTextures(this);
    const quality = resolveQuality(readQualityEnvironment());
    this.registry.set('vfxQuality', quality.tier);

    const platforms = buildForestLevel(this);
    this.vfx = new VfxManager(this, quality);
    this.atmosphere = new Atmosphere(this, quality, FOREST_WORLD.width);

    this.input_ = new InputSystem(this);
    this.player = new Player(this, this.input_, this.vfx);
    this.guardian = new Guardian(this, this.vfx);
    this.physics.add.collider(this.player.sprite, platforms);
    this.physics.add.collider(this.guardian.sprite, platforms);

    this.story = new StorySystem(this, this.player, this.vfx);
    this.combat = new CombatSystem(this, this.player, this.guardian, this.story, this.vfx, () => this.respawn());
    this.input_.onInteract(() => { if (this.started) this.story.interact(); });

    this.physics.world.setBounds(0, 0, FOREST_WORLD.width, FOREST_WORLD.height);
    const camera = this.cameras.main;
    camera.setBounds(0, 0, FOREST_WORLD.width, FOREST_WORLD.height);
    camera.startFollow(this.player.sprite, true, 0.08, 0.08);
    camera.setDeadzone(260, 130);

    this.game.events.on(EVENTS.journeyStart, this.onJourneyStart);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.game.events.off(EVENTS.journeyStart, this.onJourneyStart);
      this.input_.destroy();
      this.vfx.destroy();
    });
  }

  update(time: number) {
    this.atmosphere.update(time);
    this.vfx.update(time);
    if (!this.started || !this.player.sprite.body) return;
    this.player.update(time);
    if (this.input_.attackRequested()) this.combat.playerAttack(time);
    this.guardian.update(this.player.x);
    this.combat.update(time);
    if (this.player.y > TUNING.player.fallLimitY) this.respawn();
  }

  private onJourneyStart = () => {
    this.started = true;
    this.story.showBanner(null, 2600);
    this.game.events.emit(EVENTS.toast, 'The trail begins. Keep moving, and watch for danger.');
  };

  private respawn() {
    this.player.respawn();
    this.guardian.reset();
  }
}
