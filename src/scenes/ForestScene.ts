import Phaser from 'phaser';

type TouchKey = 'left' | 'right' | 'jump' | 'attack' | 'interact';

export class ForestScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private demon!: Phaser.Physics.Arcade.Sprite;
  private clue!: Phaser.Physics.Arcade.Image;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private touch = new Set<TouchKey>();
  private health = 3;
  private hasClue = false;
  private started = false;
  private lastAttack = 0;
  private lastDamage = 0;
  private statusText!: Phaser.GameObjects.Text;

  constructor() { super('ForestScene'); }

  create() {
    this.drawBackdrop();
    this.platforms = this.physics.add.staticGroup();
    this.addPlatform(640, 684, 1280, 72);
    this.addPlatform(430, 545, 220, 24);
    this.addPlatform(875, 465, 190, 24);
    this.addPlatform(1130, 575, 210, 24);

    this.player = this.physics.add.sprite(130, 560, 'hero');
    this.player.setCollideWorldBounds(true).setBounce(0.04).setSize(34, 68).setOffset(18, 10);
    this.player.setDepth(10);
    this.physics.add.collider(this.player, this.platforms);

    this.demon = this.physics.add.sprite(760, 600, 'demon');
    this.demon.setCollideWorldBounds(true).setBounce(0.1).setSize(48, 64).setOffset(12, 8);
    this.demon.setDepth(9);
    this.physics.add.collider(this.demon, this.platforms);

    this.clue = this.physics.add.image(1090, 520, 'clue').setDepth(8);
    this.clue.setImmovable(true);
    this.physics.add.overlap(this.player, this.clue, () => this.collectClue());

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('A,D,W,SPACE,J,E') as Record<string, Phaser.Input.Keyboard.Key>;
    this.physics.world.setBounds(0, 0, 1280, 720);
    this.cameras.main.setBounds(0, 0, 1280, 720);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(260, 130);

    this.statusText = this.add.text(640, 80, 'THE FOREST IS WATCHING…', {
      fontFamily: 'Georgia, serif', fontSize: '18px', color: '#f4dfb1',
      stroke: '#101b2b', strokeThickness: 4, letterSpacing: 3
    }).setOrigin(0.5).setScrollFactor(0).setDepth(30).setAlpha(0);

    this.game.events.on('journey:start', () => {
      this.started = true;
      this.statusText.setAlpha(1);
      this.time.delayedCall(2600, () => this.statusText.setAlpha(0));
      this.game.events.emit('game:toast', 'The trail begins. Keep moving, and watch for danger.');
    });
    this.game.events.on('touch:key', (key: TouchKey, pressed: boolean) => {
      if (pressed) {
        this.touch.add(key);
        if (key === 'interact' && this.started) this.tryInteract();
      } else this.touch.delete(key);
    });
    this.input.keyboard!.on('keydown-E', () => this.tryInteract());
    this.input.keyboard!.on('keydown-J', () => this.attack());
    this.addDecorations();
  }

  update(time: number) {
    if (!this.started || !this.player?.body) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const left = this.cursors.left.isDown || this.keys.A.isDown || this.touch.has('left');
    const right = this.cursors.right.isDown || this.keys.D.isDown || this.touch.has('right');
    const jump = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.keys.SPACE) ||
      Phaser.Input.Keyboard.JustDown(this.keys.W) || this.touch.has('jump');
    if (left) { this.player.setVelocityX(-260); this.player.setFlipX(true); }
    else if (right) { this.player.setVelocityX(260); this.player.setFlipX(false); }
    else { this.player.setVelocityX(0); }
    if (jump && body.blocked.down) this.player.setVelocityY(-540);
    if (Phaser.Input.Keyboard.JustDown(this.keys.J) || this.touch.has('attack')) this.attack(time);
    this.updateDemon(time);
    this.checkDamage(time);
    if (this.player.y > 780) this.respawn();
  }

  private drawBackdrop() {
    const g = this.add.graphics();
    const sky = [ '#18283b', '#243d4a', '#49604e', '#9a7954' ];
    for (let i = 0; i < 4; i++) {
      g.fillStyle(Phaser.Display.Color.HexStringToColor(sky[i]).color, 1);
      g.fillRect(0, i * 180, 1280, 180);
    }
    g.fillStyle(0x172c36, 0.68);
    g.beginPath(); g.moveTo(0, 440); g.lineTo(160, 220); g.lineTo(330, 440);
    g.lineTo(520, 190); g.lineTo(760, 440); g.lineTo(970, 235); g.lineTo(1180, 440);
    g.lineTo(1280, 330); g.lineTo(1280, 720); g.lineTo(0, 720); g.closePath(); g.fillPath();
    g.fillStyle(0x1b382e, 0.88);
    for (let x = -40; x < 1380; x += 145) this.drawTree(g, x, 460 + Math.sin(x) * 18, 0.8 + ((x * 7) % 3) * 0.12);
    g.fillStyle(0x284534, 1); g.fillRect(0, 620, 1280, 100);
    g.fillStyle(0xf3c77b, 0.08);
    for (let x = 100; x < 1280; x += 280) {
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 80, 0); g.lineTo(x + 230, 630); g.lineTo(x + 120, 630); g.closePath(); g.fillPath();
    }
    g.setDepth(-5);
    this.add.particles(0, 0, 'spark', {
      x: { min: 0, max: 1280 }, y: { min: 100, max: 660 },
      lifespan: 6500, speedY: { min: -12, max: -35 }, speedX: { min: -8, max: 8 },
      scale: { start: 0.8, end: 0 }, alpha: { start: 0.5, end: 0 },
      frequency: 160, quantity: 1, blendMode: 'ADD'
    }).setDepth(2);
    this.createTextures();
  }

  private drawTree(g: Phaser.GameObjects.Graphics, x: number, y: number, scale: number) {
    g.fillStyle(0x171f24, 0.8); g.fillRoundedRect(x - 10 * scale, y - 170 * scale, 20 * scale, 190 * scale, 8);
    g.fillStyle(0x203c31, 0.96);
    g.fillCircle(x, y - 160 * scale, 64 * scale);
    g.fillCircle(x - 40 * scale, y - 125 * scale, 48 * scale);
    g.fillCircle(x + 42 * scale, y - 120 * scale, 52 * scale);
    g.fillStyle(0x476044, 0.45); g.fillCircle(x - 20 * scale, y - 180 * scale, 28 * scale);
  }

  private createTextures() {
    const hero = this.add.graphics();
    hero.fillStyle(0x211b22); hero.fillRoundedRect(18, 30, 34, 48, 10);
    hero.fillStyle(0xd6a36d); hero.fillCircle(35, 20, 15);
    hero.fillStyle(0x3d241d); hero.fillEllipse(35, 9, 34, 14);
    hero.fillStyle(0xd9ad4d); hero.fillRect(19, 39, 32, 7);
    hero.fillStyle(0x8e3b2f); hero.fillRoundedRect(13, 48, 44, 8, 3);
    hero.fillStyle(0x30232a); hero.fillRoundedRect(18, 75, 12, 20, 4); hero.fillRoundedRect(40, 75, 12, 20, 4);
    hero.fillStyle(0xd9ad4d); hero.fillRect(48, 39, 7, 40);
    hero.generateTexture('hero', 72, 100); hero.destroy();

    const demon = this.add.graphics();
    demon.fillStyle(0x241d2e); demon.fillRoundedRect(12, 25, 48, 54, 12);
    demon.fillStyle(0x8d493d); demon.fillCircle(36, 18, 20);
    demon.fillStyle(0x251b28); demon.fillTriangle(19, 8, 8, -5, 27, 5);
    demon.fillTriangle(53, 8, 64, -5, 45, 5);
    demon.fillStyle(0xf2c46c); demon.fillCircle(29, 17, 3); demon.fillCircle(43, 17, 3);
    demon.fillStyle(0x17131e); demon.fillRect(29, 29, 14, 4);
    demon.fillStyle(0x4b2935); demon.fillRoundedRect(18, 75, 14, 22, 4); demon.fillRoundedRect(42, 75, 14, 22, 4);
    demon.generateTexture('demon', 72, 100); demon.destroy();

    const clue = this.add.graphics();
    clue.fillStyle(0xf2cb75, 0.18); clue.fillCircle(18, 18, 18);
    clue.fillStyle(0xf8d98d); clue.fillPoints([
      new Phaser.Geom.Point(18, 0), new Phaser.Geom.Point(23, 13),
      new Phaser.Geom.Point(36, 18), new Phaser.Geom.Point(23, 23),
      new Phaser.Geom.Point(18, 36), new Phaser.Geom.Point(13, 23),
      new Phaser.Geom.Point(0, 18), new Phaser.Geom.Point(13, 13)
    ], true);
    clue.fillStyle(0x6c4934); clue.fillCircle(18, 18, 5);
    clue.generateTexture('clue', 36, 36); clue.destroy();

    const spark = this.add.graphics(); spark.fillStyle(0xffe4a6); spark.fillCircle(4, 4, 4); spark.generateTexture('spark', 8, 8); spark.destroy();
  }

  private addPlatform(x: number, y: number, width: number, height: number) {
    const platform = this.add.rectangle(x, y, width, height, 0x273a2c).setStrokeStyle(2, 0x8b744b, 0.8);
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);
    const g = this.add.graphics(); g.fillStyle(0x536044); g.fillRoundedRect(x - width / 2, y - height / 2, width, 8, 3);
    g.setDepth(3);
  }

  private addDecorations() {
    for (let i = 0; i < 24; i++) {
      const x = 30 + i * 55;
      this.add.ellipse(x, 665 + Math.sin(i) * 8, 25, 7, i % 2 ? 0x6d7645 : 0x9b7948, 0.6).setDepth(4);
    }
  }

  private updateDemon(time: number) {
    if (Math.abs(this.demon.x - this.player.x) < 270) {
      const direction = this.player.x < this.demon.x ? -1 : 1;
      this.demon.setVelocityX(direction * 90);
      this.demon.setFlipX(direction < 0);
      if (Math.abs(this.demon.x - this.player.x) < 62 && time - this.lastDamage > 1300) {
        this.damagePlayer(time);
      }
    } else this.demon.setVelocityX(0);
  }

  private attack(time = this.time.now) {
    if (time - this.lastAttack < 500) return;
    this.lastAttack = time;
    const facing = this.player.flipX ? -1 : 1;
    // Draw a visible blade sweep so the attack has immediate visual feedback.
    const slash = this.add.graphics().setDepth(20);
    slash.lineStyle(7, 0xffe2a0, 0.95);
    slash.beginPath();
    const start = facing === 1 ? Phaser.Math.DegToRad(-115) : Phaser.Math.DegToRad(65);
    const end = facing === 1 ? Phaser.Math.DegToRad(65) : Phaser.Math.DegToRad(245);
    slash.arc(this.player.x + facing * 18, this.player.y - 34, 48, start, end, false);
    slash.strokePath();
    slash.lineStyle(2, 0xffffff, 0.9);
    slash.strokeCircle(this.player.x + facing * 18, this.player.y - 34, 48);
    this.tweens.add({ targets: slash, alpha: 0, duration: 180, onComplete: () => slash.destroy() });
    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.demon.x, this.demon.y) < 125 &&
        Math.sign(this.demon.x - this.player.x) === facing) {
      this.demon.setTint(0xff8a62);
      this.demon.setVelocityX(facing * 300);
      this.time.delayedCall(240, () => this.demon.clearTint());
      this.game.events.emit('game:toast', 'A clean strike! The demon staggers.');
    } else {
      this.game.events.emit('game:toast', 'Your blade cuts through the mist.');
    }
  }

  private damagePlayer(time: number) {
    this.lastDamage = time; this.health = Math.max(0, this.health - 1);
    this.game.events.emit('player:health', this.health);
    this.player.setTint(0xff7777);
    this.time.delayedCall(350, () => this.player.clearTint());
    this.player.setVelocityX(this.player.x < this.demon.x ? -220 : 220);
    if (this.health === 0) {
      this.game.events.emit('game:toast', 'The forest has overcome you. Returning to the trail…');
      this.time.delayedCall(1000, () => { this.health = 3; this.game.events.emit('player:health', 3); this.respawn(); });
    } else this.game.events.emit('game:toast', 'The demon struck! Keep your distance.');
  }

  private checkDamage(time: number) {
    if (this.health < 1) return;
  }

  private collectClue() {
    if (this.hasClue) return;
    this.hasClue = true; this.clue.destroy();
    this.game.events.emit('clue:collected');
    this.game.events.emit('game:toast', 'Clue found: a golden thread caught on the southern thorn trees.');
    this.statusText.setText('THE FIRST SIGN HAS BEEN FOUND').setAlpha(1);
    this.time.delayedCall(2200, () => this.statusText.setAlpha(0));
  }

  private tryInteract() {
    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.clue.x, this.clue.y) < 90) this.collectClue();
    else this.game.events.emit('game:toast', this.hasClue ? 'The clue is recorded in your journal.' : 'Search the forest for something that does not belong.');
  }

  private respawn() {
    this.player.setPosition(130, 560).setVelocity(0, 0);
    this.demon.setPosition(760, 600).setVelocity(0, 0);
  }
}
