/**
 * Single source of truth for cross-module event names.
 * Phaser game-level events connect the canvas scene to the DOM HUD in main.ts.
 */
export const EVENTS = {
  journeyStart: 'journey:start',
  touchKey: 'touch:key',
  playerHealth: 'player:health',
  playerPosition: 'player:position',
  storyMilestone: 'story:milestone',
  objectiveChanged: 'objective:changed',
  storyComplete: 'story:complete',
  clueCollected: 'clue:collected',
  toast: 'game:toast'
} as const;

export type GameEventName = (typeof EVENTS)[keyof typeof EVENTS];
export type TouchKey = 'left' | 'right' | 'jump' | 'attack' | 'interact';
