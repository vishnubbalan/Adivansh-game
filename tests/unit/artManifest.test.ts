import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { SVG_ASSETS } from '../../src/world/artManifest';

describe('art manifest', () => {
  it('each asset file exists and declared dimensions match the PNG', () => {
    for (const asset of SVG_ASSETS) {
      const buf = readFileSync(`public/assets/art-proof/${asset.file}`);
      // PNG header: bytes 16-19 = width (big-endian), bytes 20-23 = height
      const pngWidth  = buf.readUInt32BE(16);
      const pngHeight = buf.readUInt32BE(20);
      expect({ file: asset.file, width: pngWidth, height: pngHeight })
        .toEqual({ file: asset.file, width: asset.width, height: asset.height });
    }
  });
});
