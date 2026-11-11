export type StoryMilestoneId = 'guardian-defeated' | 'golden-thread-found';

export interface StoryMilestone {
  id: StoryMilestoneId;
  objective: string;
  narration: string;
  toast: string;
}

export const CHAPTER_ONE = {
  id: 'chapter-one',
  title: 'The Whispering Forest',
  subtitle: 'A trail of gold in a forest of shadows',
  opening: 'The queen has been taken beyond the southern hills. At the edge of the Whispering Forest, the prince finds a trail of strange golden light.',
  milestones: [
    {
      id: 'guardian-defeated',
      objective: 'Defeat the forest guardian',
      narration: 'The guardian falls. The forest grows quiet, and a faint golden shimmer appears deeper among the trees.',
      toast: 'The guardian is defeated. The path deeper into the forest is open.'
    },
    {
      id: 'golden-thread-found',
      objective: 'Find the golden thread near the ancient shrine',
      narration: 'A golden thread, torn from the queen’s veil, is caught on an old shrine. Its fibres point towards the forgotten temple.',
      toast: 'Story clue found: the golden thread points towards the forgotten temple.'
    }
  ] satisfies StoryMilestone[]
} as const;

export const CHAPTER_ONE_FINALE = {
  objective: 'Chapter complete — the forgotten temple awaits',
  narration: 'The first sign has been found. Beyond the forest, an ancient temple waits beneath the mountain mist. The search has only begun.',
  toast: 'CHAPTER I COMPLETE — THE TRAIL LEADS TO THE FORGOTTEN TEMPLE.'
} as const;

export function getMilestone(id: StoryMilestoneId): StoryMilestone {
  const milestone = CHAPTER_ONE.milestones.find(item => item.id === id);
  if (!milestone) throw new Error(`Unknown story milestone: ${id}`);
  return milestone;
}
