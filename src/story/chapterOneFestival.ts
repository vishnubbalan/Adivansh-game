export type FestivalFlag = 'dev' | 'ribbon' | 'ila' | 'meera' | 'complete';

export const RIBBON_HURDLES = [690, 850, 1010] as const;
export const REQUIRED_FESTIVAL_FLAGS: readonly FestivalFlag[] = ['dev', 'ribbon', 'ila'];

export function canSpeakToMeera(flags: ReadonlySet<FestivalFlag>): boolean {
  return REQUIRED_FESTIVAL_FLAGS.every(flag => flags.has(flag));
}

export function nextFestivalObjective(flags: ReadonlySet<FestivalFlag>): string {
  if (!flags.has('dev')) return 'Help Dev steady the festival lantern stand';
  if (!flags.has('ribbon')) return 'Take part in the ribbon-leap challenge';
  if (!flags.has('ila')) return 'Hear the harvest keeper’s news';
  if (!flags.has('meera')) return 'Speak with Meera at the festival dais';
  return 'Listen to the messenger’s warning';
}

export function canCompleteFestival(flags: ReadonlySet<FestivalFlag>): boolean {
  return canSpeakToMeera(flags) && flags.has('meera') && flags.has('complete');
}
