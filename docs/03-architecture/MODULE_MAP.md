# Module Map and Agent Ownership

`ForestScene` is a thin orchestrator. Each folder has one responsibility, so agents can work in parallel with minimal merge conflicts.

| Path | Responsibility | Lead role |
|---|---|---|
| `src/game/tuning.ts` | All gameplay numbers (speeds, reach, cooldowns, health) | Principal Game Designer |
| `src/game/combat.ts` | Pure combat rules, unit-tested, no Phaser | Game Designer + Developer |
| `src/entities/` | `Player`, `Guardian` (movement, state, poses) | Developer |
| `src/systems/` | `InputSystem`, `CombatSystem`, `StorySystem` | Developer |
| `src/world/forestLayout.ts` | Platform, clue and shrine coordinates (data only) | Level Design |
| `src/world/ForestLevel.ts` | Builds the static forest from layout data | Level Design + Technical Art |
| `src/world/artManifest.ts` | Runtime art list with explicit raster sizes | Technical Art |
| `src/vfx/` | `VfxManager`, `Atmosphere`, `textures`, `quality` | Technical Art + Architect |
| `src/story/` | Milestones and narration text | Product Analyst |
| `src/core/events.ts` | Event names shared by canvas and DOM HUD | Architect |
| `src/main.ts` | Game boot and DOM HUD bridge | Developer |

## Rules

- Gameplay never creates particles directly; it calls `VfxManager`.
- Tunable numbers go in `tuning.ts`; layout coordinates go in `forestLayout.ts`.
- New event names go in `core/events.ts`.
- Logic that can be pure (rules, layout, quality selection) stays free of Phaser imports so Vitest can cover it.
- `?debug` exposes `window.__ADIVANSH__` (the Phaser game) for browser QA. `?quality=` overrides VFX tier.
