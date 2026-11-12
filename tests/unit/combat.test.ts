import { describe, expect, it } from 'vitest';
import {
  canAttack, canTakeContactDamage, damaged, facingFromFlip, isStrikeInRange, isWithinContactReach
} from '../../src/game/combat';

describe('combat rules', () => {
  it('maps flipX to facing', () => {
    expect(facingFromFlip(false)).toBe(1);
    expect(facingFromFlip(true)).toBe(-1);
  });

  it('enforces the attack cooldown', () => {
    expect(canAttack(1000, 600, 500)).toBe(false);
    expect(canAttack(1100, 600, 500)).toBe(true);
    expect(canAttack(0, -Infinity, 500)).toBe(true);
  });

  it('lands a strike only inside reach and on the facing side', () => {
    const attacker = { x: 100, y: 500 };
    expect(isStrikeInRange(attacker, { x: 200, y: 500 }, 1, 135)).toBe(true);
    expect(isStrikeInRange(attacker, { x: 200, y: 500 }, -1, 135)).toBe(false);
    expect(isStrikeInRange(attacker, { x: 400, y: 500 }, 1, 135)).toBe(false);
    expect(isStrikeInRange(attacker, { x: 0, y: 500 }, -1, 135)).toBe(true);
  });

  it('applies contact reach and damage cooldown', () => {
    expect(isWithinContactReach(100, 150, 62)).toBe(true);
    expect(isWithinContactReach(100, 200, 62)).toBe(false);
    expect(canTakeContactDamage(2000, 500, 1300)).toBe(true);
    expect(canTakeContactDamage(1000, 500, 1300)).toBe(false);
  });

  it('never reduces health below zero', () => {
    expect(damaged(3)).toBe(2);
    expect(damaged(0)).toBe(0);
  });
});
