import { describe, expect, it } from 'vitest';
import {
  FOREST_BACKGROUND_SEGMENTS,
  FOREST_BACKGROUND_SOURCE,
  FOREST_WORLD_WIDTH
} from '../../src/scenes/forestBackground';

describe('Chapter One forest background layout', () => {
  it('covers the complete world with contiguous segments', () => {
    const segments = [...FOREST_BACKGROUND_SEGMENTS].sort((a, b) => a.x - b.x);
    let nextLeft = 0;

    for (const segment of segments) {
      expect(segment.x - segment.width / 2).toBe(nextLeft);
      nextLeft += segment.width;
    }

    expect(nextLeft).toBe(FOREST_WORLD_WIDTH);
  });

  it('keeps every background segment at the source artwork aspect ratio', () => {
    const sourceRatio = FOREST_BACKGROUND_SOURCE.width / FOREST_BACKGROUND_SOURCE.height;

    for (const segment of FOREST_BACKGROUND_SEGMENTS) {
      expect(segment.width / segment.height).toBeCloseTo(sourceRatio, 5);
    }
  });
});
