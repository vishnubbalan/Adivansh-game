import Phaser from 'phaser';
import { CHAPTER_ONE_FINALE, getMilestone } from '../story/chapterOne';

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
  private demonHealth = 3;
  private hasClue = false;
  private started = false;
  private lastAttack = 0;
  private lastDamage = 0;
  private statusText!: Phaser.GameObjects.Text;
  private demonDefeated = false;

  constructor() { super('ForestScene'); }

  create() {
    this.createTextures();
    this.drawBackdrop();
    this.platforms = this.physics.add.staticGroup();
    this.addPlatform(640, 684, 1280, 72);
    this.addPlatform(1920, 684, 1280, 72);
    this.addPlatform(3200, 684, 1280, 72);
    this.addPlatform(430, 545, 220, 24);
    this.addPlatform(875, 465, 190, 24);
    this.addPlatform(1130, 575, 210, 24);
    this.addPlatform(1570, 545, 230, 24);
    this.addPlatform(2070, 500, 240, 24);
    this.addPlatform(2670, 565, 240, 24);

    this.player = this.physics.add.sprite(130, 560, 'hero');
    this.player.setCollideWorldBounds(true).setBounce(0.02).setSize(34, 68).setOffset(23, 31);
    this.player.setDepth(10);
    this.physics.add.collider(this.player, this.platforms);

    this.demon = this.physics.add.sprite(760, 600, 'demon');
    this.demon.setCollideWorldBounds(true).setBounce(0.1).setSize(48, 64).setOffset(12, 25);
    this.demon.setDepth(9);
    this.physics.add.collider(this.demon, this.platforms);

    this.clue = this.physics.add.image(2350, 610, 'clue').setDepth(8);
    this.clue.setImmovable(true);
    this.physics.add.overlap(this.player, this.clue, () => this.collectClue());

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('A,D,W,SPACE,J,E') as Record<string, Phaser.Input.Keyboard.Key>;
    this.physics.world.setBounds(0, 0, 3840, 720);
    this.cameras.main.setBounds(0, 0, 3840, 720);
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
    this.createShrine();
    this.addAmbientEffects();
  }

  update(time: number) {
    if (!this.started || !this.player?.body) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const left = this.cursors.left.isDown || this.keys.A.isDown || this.touch.has('left');
    const right = this.cursors.right.isDown || this.keys.D.isDown || this.touch.has('right');
    const jump = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.keys.SPACE) ||
      Phaser.Input.Keyboard.JustDown(this.keys.W) || (this.touch.has('jump') && body.blocked.down);
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
    // Deep dusk sky with a warm horizon.
    const sky = ['#142438', '#20394a', '#365447', '#8a704b'];
    for (let i = 0; i < 4; i++) {
      g.fillStyle(Phaser.Display.Color.HexStringToColor(sky[i]).color, 1);
      g.fillRect(0, i * 180, 3840, 180);
    }
    // Distant ridges and layered jungle canopy.
    g.fillStyle(0x172b38, 0.9);
    g.fillPoints([new Phaser.Geom.Point(0,390),new Phaser.Geom.Point(150,190),new Phaser.Geom.Point(310,390),new Phaser.Geom.Point(510,145),new Phaser.Geom.Point(760,390),new Phaser.Geom.Point(970,190),new Phaser.Geom.Point(1190,390),new Phaser.Geom.Point(3840,320),new Phaser.Geom.Point(3840,720),new Phaser.Geom.Point(0,720)], true);
    g.fillStyle(0x1d3b32, 0.95);
    for (let x=-60;x<3940;x+=112) {
      const y=330+Math.sin(x*0.02)*18;
      g.fillCircle(x,y,75); g.fillCircle(x-36,y+18,53); g.fillCircle(x+42,y+22,58);
    }
    // Ancient temple silhouette in the distance.
    g.fillStyle(0x172a2b,0.9);
    g.fillRect(880,300,220,135); g.fillTriangle(860,300,990,205,1120,300);
    g.fillRect(905,260,28,40); g.fillRect(1045,260,28,40);
    g.fillStyle(0x9b8052,0.28);
    for(let x=905;x<1090;x+=42) g.fillRect(x,330,8,105);
    // Waterfall and pool on the far right.
    g.fillStyle(0x7cb8b1,0.2); g.fillRoundedRect(1165,300,48,330,20);
    g.fillStyle(0xb9ded0,0.35); g.fillRoundedRect(1177,300,8,330,4);
    g.fillStyle(0x8bb8a5,0.22); g.fillEllipse(1188,641,180,22);
    g.fillStyle(0x284534,1); g.fillRect(0,620,3840,100);
    // Soft god rays.
    g.fillStyle(0xf3c77b,0.075);
    for(let x=80;x<3840;x+=300) {
      g.fillPoints([new Phaser.Geom.Point(x,0),new Phaser.Geom.Point(x+55,0),new Phaser.Geom.Point(x+220,625),new Phaser.Geom.Point(x+110,625)],true);
    }
    g.setDepth(-5);
  }

  private createTextures() {
    const hero=this.add.graphics();
    // Cloak and legs.
    hero.fillStyle(0x542d2b); hero.fillPoints([new Phaser.Geom.Point(27,43),new Phaser.Geom.Point(55,43),new Phaser.Geom.Point(63,91),new Phaser.Geom.Point(20,91)],true);
    hero.fillStyle(0x34242a); hero.fillRoundedRect(27,82,13,27,5); hero.fillRoundedRect(45,82,13,27,5);
    hero.fillStyle(0x9b7048); hero.fillRoundedRect(24,103,18,7,3); hero.fillRoundedRect(43,103,18,7,3);
    // Gold chest armour and shoulder guards.
    hero.fillStyle(0xd6a64e); hero.fillRoundedRect(23,38,35,43,8);
    hero.fillStyle(0xf4d78b); hero.fillRoundedRect(29,43,23,31,5);
    hero.fillStyle(0x8d3e31); hero.fillPoints([new Phaser.Geom.Point(22,48),new Phaser.Geom.Point(58,48),new Phaser.Geom.Point(65,83),new Phaser.Geom.Point(16,83)],true);
    hero.fillStyle(0xe8bd64); hero.fillRoundedRect(20,38,9,18,4); hero.fillRoundedRect(52,38,9,18,4);
    // Head, hair and forehead ornament.
    hero.fillStyle(0xb9794d); hero.fillCircle(40,24,16);
    hero.fillStyle(0x261e20); hero.fillEllipse(40,12,34,15);
    hero.fillStyle(0xe9c56f); hero.fillTriangle(40,2,34,14,46,14); hero.fillCircle(40,13,3);
    // Arm and visible sword.
    hero.fillStyle(0xb9794d); hero.fillRoundedRect(55,48,9,27,4);
    hero.lineStyle(5,0x8c6337); hero.lineBetween(63,62,73,36);
    hero.lineStyle(4,0xe6e1cf); hero.lineBetween(72,39,83,9);
    hero.lineStyle(2,0xffedb5); hero.lineBetween(74,34,82,12);
    hero.lineStyle(5,0xd7a64f); hero.lineBetween(61,64,75,69);
    hero.generateTexture('hero',96,116); hero.destroy();

    const demon=this.add.graphics();
    demon.fillStyle(0x302238); demon.fillRoundedRect(12,39,54,51,14);
    demon.fillStyle(0x5b3548); demon.fillRoundedRect(20,85,15,25,5); demon.fillRoundedRect(47,85,15,25,5);
    demon.fillStyle(0x9c5547); demon.fillCircle(39,29,23);
    demon.fillStyle(0x241b2d); demon.fillTriangle(22,15,7,0,29,9); demon.fillTriangle(56,15,72,0,49,9);
    demon.fillStyle(0xf6c56d); demon.fillCircle(31,27,4); demon.fillCircle(47,27,4);
    demon.fillStyle(0x241521); demon.fillRoundedRect(31,40,17,6,2);
    demon.fillStyle(0x8d6b51); demon.fillTriangle(39,4,34,17,44,17);
    demon.generateTexture('demon',80,116); demon.destroy();

    const clue=this.add.graphics();
    clue.fillStyle(0xf2cb75,0.18); clue.fillCircle(20,20,20);
    clue.fillStyle(0xf8d98d); clue.fillPoints([new Phaser.Geom.Point(20,0),new Phaser.Geom.Point(25,14),new Phaser.Geom.Point(40,20),new Phaser.Geom.Point(25,25),new Phaser.Geom.Point(20,40),new Phaser.Geom.Point(15,25),new Phaser.Geom.Point(0,20),new Phaser.Geom.Point(15,14)],true);
    clue.fillStyle(0x6c4934); clue.fillCircle(20,20,5); clue.generateTexture('clue',40,40); clue.destroy();
    const spark=this.add.graphics(); spark.fillStyle(0xffe4a6); spark.fillCircle(4,4,4); spark.generateTexture('spark',8,8); spark.destroy();
  }

  private addPlatform(x:number,y:number,width:number,height:number) {
    const platform=this.add.rectangle(x,y,width,height,0x263d30).setStrokeStyle(2,0xb5965a,0.9);
    this.physics.add.existing(platform,true); this.platforms.add(platform);
    const g=this.add.graphics(); g.fillStyle(0x718052); g.fillRoundedRect(x-width/2,y-height/2,width,8,3); g.setDepth(3);
    // Small carved gold edge.
    g.lineStyle(1,0xd2b477,0.35); g.lineBetween(x-width/2,y-height/2,x+width/2,y-height/2);
  }

  private addDecorations() {
    for(let i=0;i<78;i++) {
      const x=25+i*48;
      this.add.ellipse(x,665+Math.sin(i)*8,25,7,i%2?0x6d7645:0x9b7948,0.65).setDepth(4);
    }
    // Hanging vines and foreground leaves.
    const leaves=this.add.graphics().setDepth(6);
    for(let x=35;x<3840;x+=185) {
      leaves.lineStyle(3,0x18362b,0.9); leaves.lineBetween(x,0,x+Math.sin(x)*12,100);
      leaves.fillStyle(0x31583b,0.9); leaves.fillEllipse(x+12,76,25,10);
    }
  }


  private createShrine() {
    // A bespoke landmark gives the clue a readable destination in the landscape.
    const shrine = this.add.container(2350, 622).setDepth(5);
    const stone = this.add.graphics();
    stone.fillStyle(0x1b2928, 0.98);
    stone.fillPoints([
      new Phaser.Geom.Point(-74, 0), new Phaser.Geom.Point(-68, -94),
      new Phaser.Geom.Point(-44, -112), new Phaser.Geom.Point(44, -112),
      new Phaser.Geom.Point(68, -94), new Phaser.Geom.Point(74, 0)
    ], true);
    stone.lineStyle(3, 0x9a8054, 0.85);
    stone.strokePoints([
      new Phaser.Geom.Point(-74, 0), new Phaser.Geom.Point(-68, -94),
      new Phaser.Geom.Point(-44, -112), new Phaser.Geom.Point(44, -112),
      new Phaser.Geom.Point(68, -94), new Phaser.Geom.Point(74, 0)
    ], true);
    stone.fillStyle(0x101b20, 1);
    stone.fillRoundedRect(-23, -75, 46, 75, 20);
    stone.lineStyle(2, 0xd5b36e, 0.6);
    stone.strokeCircle(0, -75, 16);
    stone.lineBetween(0, -91, 0, -58);
    stone.lineBetween(-15, -75, 15, -75);
    shrine.add(stone);

    const vines = this.add.graphics();
    vines.lineStyle(4, 0x31553a, 0.95);
    vines.beginPath(); vines.moveTo(-63, -106); vines.lineTo(-45, -70); vines.lineTo(-54, -30); vines.strokePath();
    vines.beginPath(); vines.moveTo(62, -100); vines.lineTo(43, -67); vines.lineTo(52, -24); vines.strokePath();
    vines.fillStyle(0x63804b, 0.95);
    vines.fillEllipse(-48, -65, 20, 9); vines.fillEllipse(48, -61, 20, 9);
    shrine.add(vines);

    const glow = this.add.circle(0, -76, 38, 0xf1c76d, 0.11).setDepth(6);
    this.tweens.add({ targets: glow, alpha: { from: 0.05, to: 0.28 }, scale: { from: 0.8, to: 1.25 }, duration: 1700, yoyo: true, repeat: -1 });
    const rune = this.add.text(0, -76, '✧', {
      fontFamily: 'Georgia, serif', fontSize: '36px', color: '#ffe4a1',
      stroke: '#795a31', strokeThickness: 3
    }).setOrigin(0.5).setDepth(7);
    this.tweens.add({ targets: rune, y: -86, alpha: { from: 0.72, to: 1 }, duration: 1250, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    // Broken pillars and carved stones frame the ancient place.
    const ruins = this.add.graphics().setDepth(4);
    ruins.fillStyle(0x283632, 1);
    ruins.fillRect(-112 + 2350, 584, 18, 64);
    ruins.fillRect(2440, 600, 16, 48);
    ruins.fillStyle(0x9b8156, 0.8);
    ruins.fillRect(2228, 578, 48, 8);
    ruins.fillRect(2422, 594, 40, 7);
    ruins.fillStyle(0x1a302b, 1);
    ruins.fillEllipse(2350, 650, 240, 18);
    ruins.lineStyle(2, 0xd6b878, 0.45);
    ruins.strokeEllipse(2350, 650, 240, 18);
  }

  private addAmbientEffects() {
    this.add.particles(0,0,'spark',{
      x:{min:0,max:3840},y:{min:150,max:650},lifespan:5200,
      speedY:{min:-18,max:-38},speedX:{min:-10,max:10},
      scale:{start:0.75,end:0},alpha:{start:0.65,end:0},
      frequency:190,quantity:1,blendMode:'ADD'
    }).setDepth(7);
    const water=this.add.rectangle(1188,455,28,310,0xb9e6df,0.16).setDepth(1);
    this.tweens.add({targets:water,alpha:{from:0.08,to:0.28},duration:1100,yoyo:true,repeat:-1});
    const mist=this.add.ellipse(1000,620,280,34,0xb9c9b0,0.08).setDepth(2);
    this.tweens.add({targets:mist,x:850,duration:9000,yoyo:true,repeat:-1,ease:'Sine.inOut'});
  }

  private updateDemon(time:number) {
    if(this.demonDefeated) return;
    if(Math.abs(this.demon.x-this.player.x)<270) {
      const direction=this.player.x<this.demon.x?-1:1;
      this.demon.setVelocityX(direction*90); this.demon.setFlipX(direction<0);
      if(Math.abs(this.demon.x-this.player.x)<62 && time-this.lastDamage>1300) this.damagePlayer(time);
    } else this.demon.setVelocityX(0);
  }

  private attack(time=this.time.now) {
    if(time-this.lastAttack<500 || this.demonDefeated) return;
    this.lastAttack=time;
    const facing=this.player.flipX?-1:1;
    // A bright blade trail follows the sword arm and sweeps forward.
    const slash=this.add.graphics().setDepth(20);
    slash.lineStyle(9,0xffd778,0.95);
    slash.beginPath();
    const cx=this.player.x+facing*25, cy=this.player.y-42;
    slash.arc(cx,cy,58,facing===1?Phaser.Math.DegToRad(-125):Phaser.Math.DegToRad(55),facing===1?Phaser.Math.DegToRad(55):Phaser.Math.DegToRad(235),false);
    slash.strokePath(); slash.lineStyle(3,0xffffff,0.95); slash.strokeCircle(cx,cy,58);
    this.tweens.add({targets:slash,alpha:0,scaleX:1.15,scaleY:1.15,duration:210,onComplete:()=>slash.destroy()});
    const inRange=Phaser.Math.Distance.Between(this.player.x,this.player.y,this.demon.x,this.demon.y)<135;
    if(inRange && Math.sign(this.demon.x-this.player.x)===facing) {
      this.demonHealth--;
      this.cameras.main.shake(110, 0.003);
      this.demon.setTint(0xff8a62); this.demon.setVelocityX(facing*320);
      this.time.delayedCall(220,()=>{if(this.demon.active)this.demon.clearTint();});
      this.game.events.emit('game:toast',`Blade hit! Demon strength: ${this.demonHealth}/3`);
      if(this.demonHealth<=0) {
        this.demonDefeated=true; this.demon.setVelocity(0,0);
        this.demon.disableBody(true,true);
        const milestone = getMilestone('guardian-defeated');
        this.game.events.emit('story:milestone', milestone);
        this.game.events.emit('game:toast', milestone.toast);
      }
    } else this.game.events.emit('game:toast','Move closer and face the demon to strike.');
  }

  private damagePlayer(time:number) {
    this.lastDamage=time; this.health=Math.max(0,this.health-1);
    this.game.events.emit('player:health',this.health);
    this.cameras.main.shake(180, 0.006);
    this.player.setTint(0xff7777); this.time.delayedCall(350,()=>this.player.clearTint());
    this.player.setVelocityX(this.player.x<this.demon.x?-220:220);
    if(this.health===0) {
      this.game.events.emit('game:toast','The forest has overcome you. Returning to the trail…');
      this.time.delayedCall(1000,()=>{this.health=3;this.game.events.emit('player:health',3);this.respawn();});
    } else this.game.events.emit('game:toast','The demon struck! Keep your distance.');
  }

  private checkDamage(_time:number) {}
  private collectClue() {
    if(this.hasClue)return;
    this.hasClue=true; this.clue.destroy(); this.game.events.emit('clue:collected');
    const milestone = getMilestone('golden-thread-found');
    this.game.events.emit('story:milestone', milestone);
    this.game.events.emit('story:complete', CHAPTER_ONE_FINALE);
    this.game.events.emit('game:toast', milestone.toast);
    this.time.delayedCall(2600, () => this.game.events.emit('game:toast', CHAPTER_ONE_FINALE.toast));
    this.statusText.setText('THE FIRST SIGN HAS BEEN FOUND').setAlpha(1);
    this.time.delayedCall(2200,()=>this.statusText.setAlpha(0));
  }
  private tryInteract() {
    if(Math.abs(this.player.x-this.clue.x)<155 && Math.abs(this.player.y-this.clue.y)<190)this.collectClue();
    else this.game.events.emit('game:toast',this.hasClue?'The clue is recorded in your journal.':'Keep moving right. Look for the glowing clue near the forest shrine.');
  }
  private respawn() {
    this.player.setPosition(130,560).setVelocity(0,0);
    if(!this.demonDefeated){this.demon.enableBody(true,760,600,true,true);this.demonHealth=3;}
  }
}
