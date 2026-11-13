/**
 * Converts SVG art assets to PNG so Phaser's WebGL texImage2D upload
 * does not fail on remote environments (GitHub Pages).
 * Run once: node scripts/svg-to-png.mjs
 */
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const artDir = path.join(root, 'public', 'assets', 'art-proof');

const assets = [
  { file: 'whispering-forest.svg', width: 1280, height: 720 },
  { file: 'seeker-idle.svg',       width: 280,  height: 300 },
  { file: 'seeker-run.svg',        width: 280,  height: 300 },
  { file: 'seeker-attack.svg',     width: 280,  height: 300 },
  { file: 'guardian-idle.svg',     width: 340,  height: 360 },
  { file: 'guardian-telegraph.svg',width: 340,  height: 360 },
  { file: 'guardian-attack.svg',   width: 340,  height: 360 },
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const { file, width, height } of assets) {
  const svgPath = path.join(artDir, file);
  const pngPath = path.join(artDir, file.replace('.svg', '.png'));

  await page.setViewportSize({ width, height });
  await page.goto(`file:///${svgPath.replace(/\\/g, '/')}`);
  await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width, height } });
  console.log(`✓ ${file} → ${path.basename(pngPath)}`);
}

await browser.close();
