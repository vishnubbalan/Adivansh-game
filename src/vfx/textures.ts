import Phaser from 'phaser';

/** Small deterministic PRNG so generated art and layouts are identical on every run. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function canvasTexture(scene: Phaser.Scene, key: string, w: number, h: number, draw: Draw): void {
  if (scene.textures.exists(key)) return;
  const texture = scene.textures.createCanvas(key, w, h);
  if (!texture) return;
  draw(texture.getContext(), w, h);
  texture.refresh();
}

const radial = (ctx: CanvasRenderingContext2D, r: number, stops: Array<[number, string]>) => {
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  stops.forEach(([at, color]) => g.addColorStop(at, color));
  return g;
};

/** Procedural runtime textures used by gameplay objects (not VFX). */
export function createClueTexture(scene: Phaser.Scene): void {
  if (scene.textures.exists('clue')) return;
  const g = scene.add.graphics();
  g.fillStyle(0xf2cb75, 0.18); g.fillCircle(20, 20, 20);
  g.fillStyle(0xf8d98d);
  g.fillPoints([
    new Phaser.Geom.Point(20, 0), new Phaser.Geom.Point(25, 14), new Phaser.Geom.Point(40, 20), new Phaser.Geom.Point(25, 25),
    new Phaser.Geom.Point(20, 40), new Phaser.Geom.Point(15, 25), new Phaser.Geom.Point(0, 20), new Phaser.Geom.Point(15, 14)
  ], true);
  g.fillStyle(0x6c4934); g.fillCircle(20, 20, 5);
  g.generateTexture('clue', 40, 40);
  g.destroy();
}

/** All VFX textures, generated once. White-based so effects can be tinted per use. */
export function createVfxTextures(scene: Phaser.Scene): void {
  // Soft round glow: light pools, fireflies, flashes, motes.
  canvasTexture(scene, 'vfx-glow', 128, 128, (ctx, w, h) => {
    ctx.translate(w / 2, h / 2);
    ctx.fillStyle = radial(ctx, w / 2, [[0, 'rgba(255,255,255,1)'], [0.3, 'rgba(255,255,255,0.4)'], [1, 'rgba(255,255,255,0)']]);
    ctx.fillRect(-w / 2, -h / 2, w, h);
  });

  // Hot spark with bright core.
  canvasTexture(scene, 'vfx-spark', 16, 16, (ctx, w, h) => {
    ctx.translate(w / 2, h / 2);
    ctx.fillStyle = radial(ctx, w / 2, [[0, 'rgba(255,255,255,1)'], [0.35, 'rgba(255,255,255,0.85)'], [1, 'rgba(255,255,255,0)']]);
    ctx.fillRect(-w / 2, -h / 2, w, h);
  });

  // Shockwave ring.
  canvasTexture(scene, 'vfx-ring', 128, 128, (ctx, w, h) => {
    ctx.strokeStyle = 'rgba(255,255,255,0.95)';
    ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(255,255,255,0.9)';
    ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(w / 2, h / 2, 54, 0, Math.PI * 2); ctx.stroke();
  });

  // Dust puff.
  canvasTexture(scene, 'vfx-dust', 32, 32, (ctx, w, h) => {
    ctx.translate(w / 2, h / 2);
    ctx.fillStyle = radial(ctx, w / 2, [[0, 'rgba(214,204,178,0.85)'], [1, 'rgba(214,204,178,0)']]);
    ctx.fillRect(-w / 2, -h / 2, w, h);
  });

  // Falling leaf.
  canvasTexture(scene, 'vfx-leaf', 16, 10, (ctx, w, h) => {
    ctx.fillStyle = '#7d9c52';
    ctx.beginPath(); ctx.ellipse(w / 2, h / 2, w / 2 - 1, h / 2 - 1, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(30,50,25,0.7)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(2, h / 2); ctx.lineTo(w - 2, h / 2); ctx.stroke();
  });

  // Crescent blade trail. Drawn facing right; flip for left.
  canvasTexture(scene, 'vfx-slash', 96, 160, (ctx, w, h) => {
    ctx.translate(-20, h / 2);
    const rad = (deg: number) => (deg * Math.PI) / 180;
    ctx.beginPath();
    ctx.arc(0, 0, 80, rad(-60), rad(60), false);
    ctx.arc(-35, 0, 102.1, rad(42.7), rad(-42.7), true);
    ctx.closePath();
    const g = ctx.createLinearGradient(40, 0, 80, 0);
    g.addColorStop(0, 'rgba(255,214,120,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.fillStyle = g;
    ctx.shadowColor = 'rgba(255,200,90,0.95)';
    ctx.shadowBlur = 14;
    ctx.fill();
  });

  // Tileable fog band (blobs wrap horizontally).
  canvasTexture(scene, 'vfx-fog', 512, 160, (ctx, w, h) => {
    const rnd = seededRandom(7);
    for (let i = 0; i < 16; i++) {
      const x = rnd() * w, y = 50 + rnd() * 70;
      const rx = 70 + rnd() * 90, ry = 16 + rnd() * 26;
      for (const dx of [-w, 0, w]) {
        ctx.save();
        ctx.translate(x + dx, y);
        ctx.scale(1, ry / rx);
        ctx.fillStyle = radial(ctx, rx, [[0, 'rgba(255,255,255,0.5)'], [1, 'rgba(255,255,255,0)']]);
        ctx.fillRect(-rx, -rx, rx * 2, rx * 2);
        ctx.restore();
      }
    }
  });

  // Light shaft (god ray).
  canvasTexture(scene, 'vfx-shaft', 96, 640, (ctx, w, h) => {
    const vertical = ctx.createLinearGradient(0, 0, 0, h);
    vertical.addColorStop(0, 'rgba(255,255,255,0.85)');
    vertical.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = vertical;
    ctx.beginPath();
    ctx.moveTo(w * 0.38, 0); ctx.lineTo(w * 0.62, 0); ctx.lineTo(w, h); ctx.lineTo(0, h);
    ctx.closePath(); ctx.fill();
    ctx.globalCompositeOperation = 'destination-in';
    const horizontal = ctx.createLinearGradient(0, 0, w, 0);
    horizontal.addColorStop(0, 'rgba(0,0,0,0)');
    horizontal.addColorStop(0.5, 'rgba(0,0,0,1)');
    horizontal.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = horizontal; ctx.fillRect(0, 0, w, h);
  });

  // Screen-space vignette.
  canvasTexture(scene, 'vfx-vignette', 512, 288, (ctx, w, h) => {
    ctx.translate(w / 2, h / 2);
    ctx.fillStyle = radial(ctx, Math.hypot(w, h) / 2, [[0, 'rgba(4,10,14,0)'], [0.55, 'rgba(4,10,14,0)'], [1, 'rgba(4,10,14,0.78)']]);
    ctx.fillRect(-w / 2, -h / 2, w, h);
  });

  // Foreground fern cluster silhouette.
  canvasTexture(scene, 'vfx-fern', 160, 110, (ctx, w, h) => {
    const rnd = seededRandom(21);
    for (let i = 0; i < 11; i++) {
      const baseX = 20 + rnd() * (w - 40);
      const tipX = baseX + (rnd() - 0.5) * 90;
      const tipY = 8 + rnd() * 55;
      ctx.fillStyle = i % 3 === 0 ? '#14291f' : '#0b1a16';
      ctx.beginPath();
      ctx.moveTo(baseX - 7, h);
      ctx.quadraticCurveTo(baseX + (tipX - baseX) * 0.2, h * 0.45, tipX, tipY);
      ctx.quadraticCurveTo(baseX + (tipX - baseX) * 0.5 + 8, h * 0.55, baseX + 7, h);
      ctx.closePath(); ctx.fill();
    }
  });
}
