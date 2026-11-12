import Phaser from 'phaser';
import { FOREST_PLATFORMS, FOREST_WORLD, SHRINE_POSITION } from './forestLayout';
import { FOREST_BACKGROUND_SEGMENTS } from '../scenes/forestBackground';

const pt = (x: number, y: number) => new Phaser.Geom.Point(x, y);

/** Builds the static forest: backdrop, platforms, decorations and the shrine landmark. */
export function buildForestLevel(scene: Phaser.Scene): Phaser.Physics.Arcade.StaticGroup {
  for (const segment of FOREST_BACKGROUND_SEGMENTS) {
    scene.add.image(segment.x, segment.y, 'forest-bg')
      .setDisplaySize(segment.width, segment.height).setFlipX(segment.flipX).setDepth(-20);
  }
  const platforms = scene.physics.add.staticGroup();
  for (const p of FOREST_PLATFORMS) addPlatform(scene, platforms, p.x, p.y, p.width, p.height);
  addGroundDetail(scene);
  addShrine(scene);
  return platforms;
}

function addPlatform(scene: Phaser.Scene, group: Phaser.Physics.Arcade.StaticGroup, x: number, y: number, width: number, height: number) {
  const platform = scene.add.rectangle(x, y, width, height, 0x263d30).setStrokeStyle(2, 0xb5965a, 0.9);
  scene.physics.add.existing(platform, true);
  group.add(platform);
  const g = scene.add.graphics().setDepth(3);
  g.fillStyle(0x718052); g.fillRoundedRect(x - width / 2, y - height / 2, width, 8, 3);
  g.lineStyle(1, 0xd2b477, 0.35); g.lineBetween(x - width / 2, y - height / 2, x + width / 2, y - height / 2);
}

function addGroundDetail(scene: Phaser.Scene) {
  for (let i = 0; i < 78; i++) {
    scene.add.ellipse(25 + i * 48, 665 + Math.sin(i) * 8, 25, 7, i % 2 ? 0x6d7645 : 0x9b7948, 0.65).setDepth(4);
  }
  const leaves = scene.add.graphics().setDepth(6);
  for (let x = 35; x < FOREST_WORLD.width; x += 185) {
    leaves.lineStyle(3, 0x18362b, 0.9); leaves.lineBetween(x, 0, x + Math.sin(x) * 12, 100);
    leaves.fillStyle(0x31583b, 0.9); leaves.fillEllipse(x + 12, 76, 25, 10);
  }
}

function addShrine(scene: Phaser.Scene) {
  const { x, y } = SHRINE_POSITION;
  const shrine = scene.add.container(x, y).setDepth(5);
  const outline = [pt(-74, 0), pt(-68, -94), pt(-44, -112), pt(44, -112), pt(68, -94), pt(74, 0)];
  const stone = scene.add.graphics();
  stone.fillStyle(0x1b2928, 0.98); stone.fillPoints(outline, true);
  stone.lineStyle(3, 0x9a8054, 0.85); stone.strokePoints(outline, true);
  stone.fillStyle(0x101b20, 1); stone.fillRoundedRect(-23, -75, 46, 75, 20);
  stone.lineStyle(2, 0xd5b36e, 0.6); stone.strokeCircle(0, -75, 16);
  stone.lineBetween(0, -91, 0, -58); stone.lineBetween(-15, -75, 15, -75);
  shrine.add(stone);

  const vines = scene.add.graphics();
  vines.lineStyle(4, 0x31553a, 0.95);
  vines.beginPath(); vines.moveTo(-63, -106); vines.lineTo(-45, -70); vines.lineTo(-54, -30); vines.strokePath();
  vines.beginPath(); vines.moveTo(62, -100); vines.lineTo(43, -67); vines.lineTo(52, -24); vines.strokePath();
  vines.fillStyle(0x63804b, 0.95); vines.fillEllipse(-48, -65, 20, 9); vines.fillEllipse(48, -61, 20, 9);
  shrine.add(vines);

  const glow = scene.add.image(x, y - 76, 'vfx-glow').setTint(0xf1c76d).setBlendMode(Phaser.BlendModes.ADD).setDepth(6).setScale(1.1).setAlpha(0.3);
  scene.tweens.add({ targets: glow, alpha: { from: 0.15, to: 0.55 }, scale: { from: 0.9, to: 1.5 }, duration: 1700, yoyo: true, repeat: -1 });
  const rune = scene.add.text(x, y - 76, '✧', {
    fontFamily: 'Georgia, serif', fontSize: '36px', color: '#ffe4a1', stroke: '#795a31', strokeThickness: 3
  }).setOrigin(0.5).setDepth(7);
  scene.tweens.add({ targets: rune, y: y - 86, alpha: { from: 0.72, to: 1 }, duration: 1250, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

  const ruins = scene.add.graphics().setDepth(4);
  ruins.fillStyle(0x283632, 1); ruins.fillRect(x - 112, 584, 18, 64); ruins.fillRect(x + 90, 600, 16, 48);
  ruins.fillStyle(0x9b8156, 0.8); ruins.fillRect(x - 122, 578, 48, 8); ruins.fillRect(x + 72, 594, 40, 7);
  ruins.fillStyle(0x1a302b, 1); ruins.fillEllipse(x, 650, 240, 18);
  ruins.lineStyle(2, 0xd6b878, 0.45); ruins.strokeEllipse(x, 650, 240, 18);
}
