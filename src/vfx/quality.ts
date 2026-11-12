/**
 * VFX quality tiers. Pure logic (no Phaser, no DOM) so it can be unit-tested.
 * Every effect in VfxManager / Atmosphere reads its budget from here.
 */
export type QualityTier = 'low' | 'medium' | 'high';

interface TierPreset {
  particleScale: number;   // multiplier on burst particle counts
  fogLayers: 0 | 1 | 2;
  lightShafts: number;
  fireflies: boolean;
  fallingLeaves: boolean;
  foregroundFerns: boolean;
  bloom: boolean;          // WebGL post-FX; high tier only
}

export const QUALITY_PRESETS: Record<QualityTier, TierPreset> = {
  low:    { particleScale: 0.35, fogLayers: 1, lightShafts: 0, fireflies: false, fallingLeaves: false, foregroundFerns: false, bloom: false },
  medium: { particleScale: 0.7,  fogLayers: 2, lightShafts: 3, fireflies: true,  fallingLeaves: false, foregroundFerns: true,  bloom: false },
  high:   { particleScale: 1,    fogLayers: 2, lightShafts: 6, fireflies: true,  fallingLeaves: true,  foregroundFerns: true,  bloom: true }
};

export interface QualityEnvironment {
  requested?: string | null;
  coarsePointer: boolean;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  reducedMotion: boolean;
}

export interface ResolvedQuality extends TierPreset {
  tier: QualityTier;
  reducedMotion: boolean;
  /** Screen shake multiplier; 0 disables it. */
  shakeScale: number;
  /** Hit-stop, slow-motion, camera zoom punches and flashes. */
  cameraEffects: boolean;
  /** Multiplier on ambient drift speed (fog, leaves). */
  driftScale: number;
}

const isTier = (value: unknown): value is QualityTier =>
  value === 'low' || value === 'medium' || value === 'high';

export function pickTier(env: QualityEnvironment): QualityTier {
  if (isTier(env.requested)) return env.requested;
  const cores = env.hardwareConcurrency ?? 8;
  const memory = env.deviceMemory ?? 8;
  if (cores <= 2 || memory <= 2) return 'low';
  if (env.coarsePointer || cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

export function resolveQuality(env: QualityEnvironment): ResolvedQuality {
  const tier = pickTier(env);
  const preset = QUALITY_PRESETS[tier];
  return {
    ...preset,
    tier,
    reducedMotion: env.reducedMotion,
    shakeScale: env.reducedMotion ? 0 : 1,
    cameraEffects: !env.reducedMotion,
    driftScale: env.reducedMotion ? 0.25 : 1
  };
}

/** Reads the real browser environment. `?quality=low|medium|high` overrides auto-detection. */
export function readQualityEnvironment(): QualityEnvironment {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return {
    requested: new URLSearchParams(window.location.search).get('quality'),
    coarsePointer: window.matchMedia?.('(pointer: coarse)').matches ?? false,
    hardwareConcurrency: nav.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
    reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  };
}
