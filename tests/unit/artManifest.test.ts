import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { SVG_ASSETS } from '../../src/world/artManifest';

describe('art manifest', () => {
  it('matches each SVG viewBox so raster size is explicit and stable', () => {
    for (const asset of SVG_ASSETS) {
      const svg = readFileSync(`public/assets/art-proof/${asset.file}`, 'utf8');
      const box = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
      expect(box, asset.file).not.toBeNull();
      expect([Number(box![1]), Number(box![2])]).toEqual([asset.width, asset.height]);
    }
  });
});
