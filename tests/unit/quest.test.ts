import { describe, expect, it } from 'vitest';
import { collectFirstClue, getQuestObjective, initialQuestState } from '../../src/game/quest';

describe('first chapter quest state', () => {
  it('starts with the clue undiscovered', () => {
    const state = initialQuestState();
    expect(state.clueCollected).toBe(false);
    expect(getQuestObjective(state)).toBe('Find the trail through the forest');
  });

  it('records the first clue and updates the objective', () => {
    const state = collectFirstClue(initialQuestState());
    expect(state.clueCollected).toBe(true);
    expect(getQuestObjective(state)).toBe('A clue has revealed a path deeper into the forest');
  });
});
