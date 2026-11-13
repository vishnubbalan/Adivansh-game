/**
 * Runtime art manifest. SVG sources only declare a viewBox, which browsers size inconsistently
 * (some report 0x0), so each file is rasterised at an explicit size taken from its viewBox.
 * These sizes are the frame sizes the physics bodies and display scales are tuned against.
 */
export const ART_ROOT = './assets/art-proof/';

export interface SvgAsset { key: string; file: string; width: number; height: number }

export const SVG_ASSETS: readonly SvgAsset[] = [
  { key: 'forest-bg', file: 'whispering-forest.png', width: 1280, height: 720 },
  { key: 'hero-idle', file: 'seeker-idle.png', width: 280, height: 300 },
  { key: 'hero-run', file: 'seeker-run.png', width: 280, height: 300 },
  { key: 'hero-attack', file: 'seeker-attack.png', width: 280, height: 300 },
  { key: 'guardian-idle', file: 'guardian-idle.png', width: 340, height: 360 },
  { key: 'guardian-telegraph', file: 'guardian-telegraph.png', width: 340, height: 360 },
  { key: 'guardian-attack', file: 'guardian-attack.png', width: 340, height: 360 }
];
