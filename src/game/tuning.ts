/** Gameplay tuning in one place so the Game Designer role can adjust values without touching logic. */
export const TUNING = {
  player: {
    maxHealth: 3,
    runSpeed: 260,
    jumpSpeed: 540,
    attackCooldownMs: 500,
    attackPoseMs: 260,
    hurtTintMs: 350,
    hurtKnockback: 220,
    respawnDelayMs: 1000,
    fallLimitY: 780,
    spawn: { x: 130, y: 560 }
  },
  guardian: {
    maxHealth: 3,
    spawn: { x: 760, y: 600 },
    aggroRange: 270,
    chaseSpeed: 90,
    contactReach: 62,
    contactCooldownMs: 1300,
    strikeReach: 135,
    hitKnockback: 320,
    hitFlashMs: 220
  }
} as const;
