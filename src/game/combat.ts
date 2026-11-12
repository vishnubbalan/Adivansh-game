/** Pure combat rules. No Phaser imports, so they are deterministic and unit-testable. */
export type Facing = 1 | -1;

export const facingFromFlip = (flipX: boolean): Facing => (flipX ? -1 : 1);

export const canAttack = (now: number, lastAttack: number, cooldownMs: number): boolean =>
  now - lastAttack >= cooldownMs;

export interface Point { x: number; y: number }

/** A strike lands when the target is within reach AND on the side the attacker faces. */
export function isStrikeInRange(attacker: Point, target: Point, facing: Facing, reach: number): boolean {
  const distance = Math.hypot(target.x - attacker.x, target.y - attacker.y);
  return distance < reach && Math.sign(target.x - attacker.x) === facing;
}

export const isWithinContactReach = (attackerX: number, targetX: number, reach: number): boolean =>
  Math.abs(attackerX - targetX) < reach;

export const canTakeContactDamage = (now: number, lastDamage: number, cooldownMs: number): boolean =>
  now - lastDamage > cooldownMs;

export const damaged = (health: number, amount = 1): number => Math.max(0, health - amount);
