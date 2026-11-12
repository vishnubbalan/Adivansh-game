import { describe, expect, it } from 'vitest';
import { pickTier, resolveQuality, QUALITY_PRESETS } from '../../src/vfx/quality';

const desktop = { coarsePointer: false, hardwareConcurrency: 12, deviceMemory: 8, reducedMotion: false };

describe('VFX quality tiers', () => {
  it('defaults to high on capable desktops', () => {
    expect(pickTier(desktop)).toBe('high');
  });
  it('uses medium on touch devices and mid-range hardware', () => {
    expect(pickTier({ ...desktop, coarsePointer: true })).toBe('medium');
    expect(pickTier({ ...desktop, hardwareConcurrency: 4 })).toBe('medium');
  });
  it('uses low on weak hardware', () => {
    expect(pickTier({ ...desktop, hardwareConcurrency: 2 })).toBe('low');
    expect(pickTier({ ...desktop, deviceMemory: 2 })).toBe('low');
  });
  it('honours an explicit ?quality= override and ignores invalid values', () => {
    expect(pickTier({ ...desktop, requested: 'low' })).toBe('low');
    expect(pickTier({ ...desktop, requested: 'ultra' })).toBe('high');
  });
  it('limits expensive effects to the high tier', () => {
    expect(QUALITY_PRESETS.low.bloom).toBe(false);
    expect(QUALITY_PRESETS.medium.bloom).toBe(false);
    expect(QUALITY_PRESETS.high.bloom).toBe(true);
    expect(QUALITY_PRESETS.low.particleScale).toBeLessThan(QUALITY_PRESETS.high.particleScale);
  });
  it('disables shake, hit-stop and zoom for reduced-motion users on every tier', () => {
    for (const requested of ['low', 'medium', 'high']) {
      const q = resolveQuality({ ...desktop, requested, reducedMotion: true });
      expect(q.shakeScale).toBe(0);
      expect(q.cameraEffects).toBe(false);
      expect(q.driftScale).toBeLessThan(1);
    }
  });
});
