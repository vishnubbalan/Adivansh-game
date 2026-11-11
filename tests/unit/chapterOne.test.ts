import { describe, expect, it } from 'vitest';
import { CHAPTER_ONE, CHAPTER_ONE_FINALE, getMilestone } from '../../src/story/chapterOne';

describe('Chapter One story design', () => {
  it('has a clear opening and two sequential objectives', () => {
    expect(CHAPTER_ONE.opening).toContain('Whispering Forest');
    expect(CHAPTER_ONE.milestones.map(item => item.id)).toEqual([
      'guardian-defeated',
      'golden-thread-found'
    ]);
  });

  it('connects the guardian encounter to the golden-thread clue', () => {
    expect(getMilestone('guardian-defeated').objective).toMatch(/guardian/i);
    expect(getMilestone('golden-thread-found').narration).toMatch(/forgotten temple/i);
  });

  it('ends by unlocking the next chapter destination', () => {
    expect(CHAPTER_ONE_FINALE.objective).toContain('forgotten temple');
  });
});
