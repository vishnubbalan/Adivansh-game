/** Static layout data for Chapter One's forest. Pure data, so the Level Design role can edit and test it. */
export const FOREST_WORLD = { width: 3840, height: 720 } as const;

export interface PlatformSpec { x: number; y: number; width: number; height: number }

export const FOREST_PLATFORMS: readonly PlatformSpec[] = [
  { x: 640, y: 684, width: 1280, height: 72 },
  { x: 1920, y: 684, width: 1280, height: 72 },
  { x: 3200, y: 684, width: 1280, height: 72 },
  { x: 430, y: 545, width: 220, height: 24 },
  { x: 875, y: 465, width: 190, height: 24 },
  { x: 1130, y: 575, width: 210, height: 24 },
  { x: 1570, y: 545, width: 230, height: 24 },
  { x: 2070, y: 500, width: 240, height: 24 },
  { x: 2670, y: 565, width: 240, height: 24 }
];

export const CLUE_POSITION = { x: 2350, y: 610 } as const;
export const SHRINE_POSITION = { x: 2350, y: 622 } as const;
