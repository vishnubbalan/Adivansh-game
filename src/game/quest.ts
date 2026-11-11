export interface QuestState {
  clueCollected: boolean;
}

export const initialQuestState = (): QuestState => ({ clueCollected: false });

export const collectFirstClue = (state: QuestState): QuestState => ({
  ...state,
  clueCollected: true
});

export const getQuestObjective = (state: QuestState): string =>
  state.clueCollected
    ? 'A clue has revealed a path deeper into the forest'
    : 'Find the trail through the forest';
