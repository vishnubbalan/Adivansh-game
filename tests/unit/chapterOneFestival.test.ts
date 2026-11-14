import { describe, expect, it } from 'vitest';
import { canCompleteFestival, canSpeakToMeera, nextFestivalObjective, RIBBON_HURDLES } from '../../src/story/chapterOneFestival';

describe('The Last Harvest Festival progression', () => {
  it('defines three forgiving ribbon-jump milestones in order', () => {
    expect(RIBBON_HURDLES).toEqual([690, 850, 1010]);
  });

  it('keeps Meera unavailable until the village activities are complete', () => {
    expect(canSpeakToMeera(new Set(['dev', 'ribbon']))).toBe(false);
    expect(canSpeakToMeera(new Set(['dev', 'ribbon', 'ila']))).toBe(true);
  });

  it('guides the player through the intended objective sequence', () => {
    expect(nextFestivalObjective(new Set())).toMatch(/Dev/);
    expect(nextFestivalObjective(new Set(['dev']))).toMatch(/ribbon/i);
    expect(nextFestivalObjective(new Set(['dev', 'ribbon']))).toMatch(/keeper/i);
  });

  it('does not complete the chapter before the messenger beat', () => {
    expect(canCompleteFestival(new Set(['dev', 'ribbon', 'ila', 'meera']))).toBe(false);
    expect(canCompleteFestival(new Set(['dev', 'ribbon', 'ila', 'meera', 'complete']))).toBe(true);
  });
});
