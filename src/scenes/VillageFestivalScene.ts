import Phaser from 'phaser';
import { EVENTS } from '../core/events';
import { canSpeakToMeera, nextFestivalObjective, RIBBON_HURDLES, type FestivalFlag } from '../story/chapterOneFestival';

/**
 * Chapter One's festival slice. Kept separate from ForestScene so the existing
 * forest pursuit prototype remains available while the canonical opening is built.
 */
export class VillageFestivalScene extends Phaser.Scene {
  private started = false;
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private touch = new Set<string>();
  private interactionQueued = false;
  private flags = new Set<FestivalFlag>();
  private hurdles = 0;
  private prompt!: Phaser.GameObjects.Text;
  private dialogue!: Phaser.GameObjects.Container;
  private dialogueText!: Phaser.GameObjects.Text;
  private objective!: Phaser.GameObjects.Text;
  private messengerActor!: Phaser.GameObjects.Container;
  private messengerLabel!: Phaser.GameObjects.Text;
  private messengerArrivalCall?: Phaser.Time.TimerEvent;
  private chapterCompleteCall?: Phaser.Time.TimerEvent;
  private interactTarget: { id: string; x: number; y: number; label: string } | null = null;
  private lastPositionReport = 0;
  private readonly floorY = 620;

  constructor() { super('VillageFestivalScene'); }

  create() {
    this.drawFestival();
    this.createPlayer();
    this.createPeople();
    this.createHud();
    this.physics.add.collider(this.player, this.platforms);
    this.physics.world.setBounds(0, 0, 2400, 720);
    this.cameras.main.setBounds(0, 0, 2400, 720).startFollow(this.player, true, 0.08, 0.08);
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('A,D,W,SPACE,E') as Record<string, Phaser.Input.Keyboard.Key>;
    this.input.keyboard!.on('keydown-E', this.onInteract);
    this.input.keyboard!.on('keydown-SPACE', this.onJump);
    this.input.keyboard!.on('keydown-W', this.onJump);
    this.input.keyboard!.on('keydown-UP', this.onJump);
    this.game.events.on(EVENTS.touchKey, this.onTouch);
    this.game.events.on(EVENTS.journeyStart, this.onJourneyStart);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard?.off('keydown-E', this.onInteract);
      this.input.keyboard?.off('keydown-SPACE', this.onJump);
      this.input.keyboard?.off('keydown-W', this.onJump);
      this.input.keyboard?.off('keydown-UP', this.onJump);
      this.game.events.off(EVENTS.touchKey, this.onTouch);
      this.game.events.off(EVENTS.journeyStart, this.onJourneyStart);
      this.touch.clear();
      this.messengerArrivalCall?.remove(false);
      this.chapterCompleteCall?.remove(false);
      this.started = false;
      this.interactionQueued = false;
    });
    this.physics.pause();
  }

  update(time: number) {
    if (!this.started || !this.player.body) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const left = this.cursors.left.isDown || this.keys.A.isDown || this.touch.has('left');
    const right = this.cursors.right.isDown || this.keys.D.isDown || this.touch.has('right');
    body.setVelocityX(left === right ? 0 : left ? -245 : 245);
    if (left !== right) this.player.setFlipX(left);
    if (body.blocked.down) this.player.setTexture(Math.abs(body.velocity.x) > 10 ? 'festival-hero-run' : 'festival-hero');
    else this.player.setTexture('festival-hero-jump');
    if (this.interactionQueued) {
      this.interactionQueued = false;
      this.processInteraction();
    }
    this.updateRibbonProgress();
    this.updatePrompt();
    if (time - this.lastPositionReport > 100) {
      this.lastPositionReport = time;
      this.game.events.emit(EVENTS.playerPosition, { x: Math.round(this.player.x), y: Math.round(this.player.y) });
    }
  }

  private drawFestival() {
    const bg = this.add.graphics().setDepth(-20);
    bg.fillGradientStyle(0xe9b977, 0xb86f50, 0x496d70, 0x203c43, 1);
    bg.fillRect(0, 0, 2400, 720);
    // Distant hills and river
    bg.fillStyle(0x526d55, 0.85); bg.fillEllipse(350, 485, 900, 260); bg.fillEllipse(1500, 470, 1100, 300);
    bg.fillStyle(0x4b91a0, 0.75); bg.fillEllipse(1280, 600, 1700, 170);
    bg.fillStyle(0x28483e, 1); bg.fillRect(0, this.floorY, 2400, 100);
    bg.fillStyle(0x9c774b, 1); bg.fillRect(0, this.floorY - 13, 2400, 16);
    // Village roofs and stalls
    for (let x = 120; x < 2350; x += 310) {
      bg.fillStyle(0x6b4334, 1); bg.fillRect(x, 390, 185, 150);
      bg.fillStyle(0x392b2a, 1); bg.fillTriangle(x - 18, 395, x + 92, 315, x + 203, 395);
      bg.fillStyle(0xc38d54, 1); bg.fillRect(x + 18, 430, 52, 110);
      bg.fillStyle(0x263b3a, 1); bg.fillRect(x + 103, 445, 48, 95);
    }
    // Festival streamers and lantern strings
    for (let x = 80; x < 2360; x += 190) {
      bg.lineStyle(3, 0x5b3d37, 0.9); bg.lineBetween(x, 120, x + 150, 165);
      bg.fillStyle(0xd8a45d, 1); bg.fillTriangle(x + 30, 135, x + 52, 141, x + 37, 170);
      bg.fillStyle(0x6b8a63, 1); bg.fillTriangle(x + 80, 150, x + 102, 155, x + 88, 184);
      bg.fillStyle(0xb65e4e, 1); bg.fillTriangle(x + 125, 160, x + 145, 165, x + 132, 190);
      bg.fillStyle(0xffd58b, 0.85); bg.fillCircle(x + 150, 172, 7);
    }
    for (let x = 0; x < 2400; x += 95) {
      bg.fillStyle(0x5b3e31, 1); bg.fillRect(x, this.floorY - 25, 3, 25);
      bg.fillStyle(0xe8bd70, 0.75); bg.fillCircle(x + 1, this.floorY - 30, 4);
    }
    this.platforms = this.physics.add.staticGroup();
    const ground = this.add.rectangle(1200, this.floorY + 36, 2400, 72, 0x000000, 0);
    this.physics.add.existing(ground, true); this.platforms.add(ground);
    // Ribbon hurdles: low, forgiving jump targets with no damage.
    [690, 850, 1010].forEach((x, i) => {
      const hurdle = this.add.graphics().setDepth(4);
      hurdle.fillStyle(0x9d4d47, 1); hurdle.fillRoundedRect(x - 28, this.floorY - 30, 56, 30, 8);
      hurdle.lineStyle(3, 0xf0c77f, 1); hurdle.lineBetween(x - 34, this.floorY - 31, x + 34, this.floorY - 31);
      this.add.text(x, this.floorY - 62, String(i + 1), { fontFamily: 'Georgia', fontSize: '16px', color: '#fff0c9' }).setOrigin(0.5).setDepth(5);
    });
    // Dais at Meera's end of the square
    const dais = this.add.graphics().setDepth(3);
    dais.fillStyle(0x876444, 1); dais.fillRoundedRect(1830, 540, 250, 80, 12);
    dais.fillStyle(0xc39b62, 1); dais.fillRoundedRect(1810, 526, 290, 18, 8);
    this.add.text(1955, 505, 'FESTIVAL DAIS', { fontFamily: 'Georgia', fontSize: '15px', color: '#f8e4bd', letterSpacing: 3 }).setOrigin(0.5);
    this.add.text(65, 70, 'VEYRA  ·  THE HARVEST FESTIVAL', { fontFamily: 'Georgia', fontSize: '22px', color: '#fff0cf', letterSpacing: 4 }).setDepth(8);
  }

  private createPlayer() {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x253d35); g.fillRoundedRect(22, 32, 36, 55, 12);
    g.fillStyle(0xd7ad7b); g.fillCircle(40, 20, 17);
    g.fillStyle(0x252321); g.fillEllipse(40, 5, 24, 10);
    g.fillStyle(0xc36f4d); g.fillRoundedRect(17, 42, 10, 45, 4);
    g.fillStyle(0x6e5037); g.fillRect(26, 84, 10, 16); g.fillRect(44, 84, 10, 16);
    g.generateTexture('festival-hero', 80, 110); g.destroy();
    const run = this.make.graphics({ x: 0, y: 0 });
    run.fillStyle(0x253d35); run.fillRoundedRect(22, 32, 36, 55, 12);
    run.fillStyle(0xd7ad7b); run.fillCircle(40, 20, 17);
    run.fillStyle(0x252321); run.fillEllipse(40, 5, 24, 10);
    run.fillStyle(0xc36f4d); run.fillRoundedRect(15, 42, 12, 45, 4);
    run.fillStyle(0x6e5037); run.fillRect(20, 84, 10, 16); run.fillRect(48, 79, 10, 20);
    run.generateTexture('festival-hero-run', 80, 110); run.destroy();
    const jump = this.make.graphics({ x: 0, y: 0 });
    jump.fillStyle(0x253d35); jump.fillRoundedRect(22, 32, 36, 55, 12);
    jump.fillStyle(0xd7ad7b); jump.fillCircle(40, 20, 17);
    jump.fillStyle(0x252321); jump.fillEllipse(40, 5, 24, 10);
    jump.fillStyle(0xc36f4d); jump.fillRoundedRect(12, 42, 12, 40, 4);
    jump.fillStyle(0x6e5037); jump.fillRect(20, 82, 12, 12); jump.fillRect(46, 82, 12, 12);
    jump.generateTexture('festival-hero-jump', 80, 110); jump.destroy();
    this.player = this.physics.add.sprite(120, 540, 'festival-hero').setDisplaySize(72, 99).setDepth(7);
    this.player.setCollideWorldBounds(true).setBounce(0).setSize(48, 96).setOffset(16, 10);
  }

  private createPeople() {
    this.addNpc('dev', 420, 'DEV  ·  POTTER', 0x8b5d3b, 'Help Dev steady the lantern stand');
    this.addNpc('children', 1180, 'TARA & KAVI', 0x66845c, 'Try the ribbon-leap challenge');
    this.addNpc('ila', 1510, 'ILA  ·  HARVEST KEEPER', 0x9a7950, 'Hear Ila’s news');
    this.addNpc('meera', 1960, 'MEERA DEVI', 0x6d4e75, 'Speak with Meera at the dais');
    this.addNpc('messenger', 2240, 'SOUTHERN MESSENGER', 0x6b5545, 'A messenger has arrived');
  }

  private addNpc(id: string, x: number, label: string, colour: number, prompt: string) {
    const actorX = id === 'messenger' ? 2440 : x;
    const group = this.add.container(actorX, this.floorY - 52).setDepth(6);
    const art = this.add.graphics();
    art.fillStyle(colour, 1); art.fillRoundedRect(-20, -24, 40, 48, 12);
    art.fillStyle(0xd7ad7b, 1); art.fillCircle(0, -38, 15);
    art.fillStyle(0x302622, 1); art.fillEllipse(0, -52, 23, 10);
    art.fillStyle(0xe6c17e, 1); art.fillCircle(0, -38, 3);
    group.add(art);
    const nameTag = this.add.text(actorX, this.floorY - 116, label, { fontFamily: 'Georgia', fontSize: '12px', color: '#fff0cf', stroke: '#27352f', strokeThickness: 3 }).setOrigin(0.5).setDepth(7);
    if (id === 'messenger') {
      group.setVisible(false);
      nameTag.setVisible(false);
      this.messengerActor = group;
      this.messengerLabel = nameTag;
    }
    group.setData('prompt', prompt);
    group.setData('id', id);
  }

  private createHud() {
    this.objective = this.add.text(640, 122, 'Explore the festival square', {
      fontFamily: 'Georgia, serif', fontSize: '20px', color: '#fff0cf', stroke: '#1a2c2a', strokeThickness: 5
    }).setOrigin(0.5).setScrollFactor(0).setDepth(30);
    this.prompt = this.add.text(640, 650, '', {
      fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#fff0cf', backgroundColor: '#10201ddd',
      padding: { x: 14, y: 9 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(31);
    const panel = this.add.rectangle(640, 580, 900, 112, 0x101b24, 0.94).setScrollFactor(0).setDepth(40).setStrokeStyle(1, 0xe3c27f, 0.7);
    const speaker = this.add.text(210, 548, 'VEYRA', { fontFamily: 'Georgia', fontSize: '14px', color: '#e8c47c', letterSpacing: 2 }).setScrollFactor(0).setDepth(41);
    this.dialogueText = this.add.text(210, 575, '', { fontFamily: 'Georgia', fontSize: '18px', color: '#f7ead1', wordWrap: { width: 850 }, lineSpacing: 5 }).setScrollFactor(0).setDepth(41);
    this.dialogue = this.add.container(0, 0, [panel, speaker, this.dialogueText]).setDepth(40).setVisible(false);
  }

  private onJourneyStart = () => {
    if (this.started) return;
    this.started = true;
    this.physics.resume();
    this.objective.setText('Explore the festival square and greet the villagers');
    this.say('ADIVANSH', 'The rains were kind this year. Let the people have one day without worry.');
  };

  private onJump = (event: KeyboardEvent) => {
    if (!this.started || event.repeat || this.dialogue.visible) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (this.dialogue.visible) { this.onInteract(); return; }
    if (body.blocked.down) body.setVelocityY(-500);
  };

  private onInteract = () => {
    if (!this.started) return;
    this.interactionQueued = true;
  };

  private processInteraction() {
    if (this.dialogue.visible) { this.advanceDialogue(); return; }
    const target = this.findTarget();
    if (!target) { this.game.events.emit(EVENTS.toast, 'Move closer to a villager or the ribbon lane.'); return; }
    this.handleTarget(target);
  }

  private onTouch = (key: string, pressed: boolean) => {
    if (pressed) {
      this.touch.add(key);
      if (key === 'jump') this.onJump({ repeat: false } as KeyboardEvent);
      if (key === 'interact') this.onInteract();
    } else this.touch.delete(key);
  };

  private findTarget(): { id: string; x: number; y: number; label: string } | null {
    const candidates = [
      { id: 'dev', x: 420, y: this.floorY - 52, label: 'Dev' },
      { id: 'children', x: 1180, y: this.floorY - 52, label: 'Tara and Kavi' },
      { id: 'ila', x: 1510, y: this.floorY - 52, label: 'Ila' },
      { id: 'meera', x: 1960, y: this.floorY - 52, label: 'Meera Devi' },
      { id: 'messenger', x: 2240, y: this.floorY - 52, label: 'Messenger' }
    ];
    return candidates.find(item => Math.abs(this.player.x - item.x) < 125 && Math.abs(this.player.y - item.y) < 125) ?? null;
  }

  private updatePrompt() {
    const target = this.findTarget();
    this.interactTarget = target;
    if (this.dialogue.visible) { this.prompt.setText('E  ·  CONTINUE').setVisible(true); return; }
    if (target) this.prompt.setText('E  ·  ' + (target.id === 'dev' ? 'HELP DEV' : target.id === 'children' ? 'RIBBON CHALLENGE' : target.id === 'ila' ? 'SPEAK WITH ILA' : target.id === 'meera' ? 'SPEAK WITH MEERA' : 'HEAR THE WARNING')).setVisible(true);
    else this.prompt.setVisible(false);
  }

  private handleTarget(target: { id: string; x: number; y: number; label: string }) {
    if (target.id === 'dev' && !this.flags.has('dev')) {
      this.flags.add('dev');
      this.say('DEV', 'A steady hand. Just what a festival needs.', 'ADIVANSH', 'The hands that made these deserve the thanks.');
      this.updateObjective();
      return;
    }
    if (target.id === 'children' && !this.flags.has('ribbon')) {
      if (this.hurdles < RIBBON_HURDLES.length) {
        this.say('TARA & KAVI', 'Can you leap all three ribbons without touching them? Use the jump button, then come back to us.');
        return;
      }
      this.flags.add('ribbon');
      this.say('TARA', 'You cleared every ribbon!', 'KAVI', 'You must teach us that landing.');
      this.updateObjective();
      return;
    }
    if (target.id === 'ila' && !this.flags.has('ila')) {
      this.flags.add('ila');
      this.say('ILA', 'The Queen could have sent an order from the palace. Instead, she came and listened.', 'ADIVANSH', 'That is why they trust her.');
      this.updateObjective();
      return;
    }
    if (target.id === 'meera' && !this.flags.has('meera')) {
      if (!canSpeakToMeera(this.flags)) {
        this.say('MEERA', 'The whole village is part of this celebration. Take a moment to share it with them.');
        return;
      }
      this.flags.add('meera');
      this.say('MEERA', 'You came without the royal escort.', 'ADIVANSH', 'I was invited by the village. I thought I should arrive as a villager.', 'MEERA', 'Then you have already done better than half the court.', 'MEERA', 'At first light, I want the old border records. The forest road has become difficult.');
      this.updateObjective();
      this.messengerArrivalCall = this.time.delayedCall(3200, () => this.arriveMessenger());
      return;
    }
    if (target.id === 'messenger' && this.flags.has('meera') && !this.flags.has('complete')) this.arriveMessenger();
  }

  private arriveMessenger() {
    if (this.flags.has('complete')) return;
    this.messengerActor.setVisible(true).setX(2440);
    this.messengerLabel.setVisible(true).setX(2440);
    this.tweens.add({ targets: [this.messengerActor, this.messengerLabel], x: 2240, duration: 850, ease: 'Sine.out' });
    this.messengerArrivalCall = this.time.delayedCall(950, () => this.say('MESSENGER', 'My Queen. A report from the southern watch.', 'MEERA', 'You rode through the rain. Speak.', 'MESSENGER', 'Three unfamiliar companies were seen beyond the old boundary stones. They did not take the road. They moved along the forest edge.', 'ADIVANSH', 'Do we know who they are?', 'MEERA', 'Not yet. And we will not frighten the village with guesses.', 'MEERA', 'At first light, I want the old border records. Something about this report does not fit.', 'ADIVANSH', 'I will come with you.', 'MEERA', 'I expected you would.'));
    this.chapterCompleteCall = this.time.delayedCall(10500, () => {
      this.flags.add('complete');
      this.objective.setText('Chapter complete — Shadows in the Court await');
      this.game.events.emit(EVENTS.storyComplete, {
        objective: 'Chapter complete — Chapter II: Shadows in the Court',
        narration: 'The lanterns rise over Veyra. Beyond the southern boundary, an unfamiliar force is moving through the forest.'
      });
      this.game.events.emit(EVENTS.toast, 'CHAPTER I COMPLETE — THE LAST HARVEST FESTIVAL');
    });
  }

  private say(...lines: string[]) {
    this.dialogueText.setText(lines.join('\n\n'));
    this.dialogue.setVisible(true);
    this.prompt.setText('E  ·  CONTINUE').setVisible(true);
  }

  private advanceDialogue() {
    this.dialogue.setVisible(false);
    this.prompt.setVisible(false);
  }

  private updateObjective() {
    this.objective.setText(nextFestivalObjective(this.flags));
  }

  private updateRibbonProgress() {
    if (this.flags.has('ribbon') || this.hurdles >= RIBBON_HURDLES.length) return;
    const next = RIBBON_HURDLES[this.hurdles];
    if (this.player.x >= next && this.player.y < this.floorY - 72) {
      this.hurdles++;
      this.game.events.emit(EVENTS.toast, this.hurdles === RIBBON_HURDLES.length
        ? 'All three ribbons cleared! Return to Tara and Kavi.'
        : `Ribbon ${this.hurdles} of ${RIBBON_HURDLES.length} cleared.`);
    }
  }
}
