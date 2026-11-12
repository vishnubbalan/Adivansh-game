export const FOREST_BACKGROUND_SOURCE = { width: 1280, height: 720 } as const;
export const FOREST_WORLD_WIDTH = 3840;

export const FOREST_BACKGROUND_SEGMENTS = [
  { x: 640, y: 360, width: 1280, height: 720, flipX: false },
  { x: 1920, y: 360, width: 1280, height: 720, flipX: true },
  { x: 3200, y: 360, width: 1280, height: 720, flipX: false }
] as const;
