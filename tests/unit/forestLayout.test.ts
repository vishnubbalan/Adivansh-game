import { describe, expect, it } from 'vitest';
import { CLUE_POSITION, FOREST_PLATFORMS, FOREST_WORLD } from '../../src/world/forestLayout';
import { TUNING } from '../../src/game/tuning';

describe('forest layout', () => {
  it('keeps every platform inside the world', () => {
    for (const p of FOREST_PLATFORMS) {
      expect(p.x - p.width / 2).toBeGreaterThanOrEqual(0);
      expect(p.x + p.width / 2).toBeLessThanOrEqual(FOREST_WORLD.width);
    }
  });

  it('has continuous ground from the spawn to the end of the world', () => {
    const ground = FOREST_PLATFORMS.filter(p => p.height === 72).sort((a, b) => a.x - b.x);
    expect(ground[0].x - ground[0].width / 2).toBe(0);
    for (let i = 1; i < ground.length; i++) {
      expect(ground[i].x - ground[i].width / 2).toBe(ground[i - 1].x + ground[i - 1].width / 2);
    }
  });

  it('places the player and guardian spawns and the clue within the world', () => {
    for (const p of [TUNING.player.spawn, TUNING.guardian.spawn, CLUE_POSITION]) {
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(FOREST_WORLD.width);
    }
  });
});
