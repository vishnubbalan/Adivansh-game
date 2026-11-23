# Module Map and Agent Ownership (planned layout)

> Status: **planned**. No code exists yet. This is the layout the scaffold will create in Phase 1. It replaces the Phaser-era map (`ForestScene`, `src/vfx`, …), which was deleted on 2026-11-23.

pnpm workspace monorepo. Dependency direction is strictly downward: `apps` → `packages/engine`/`packages/game-core` → `packages/shared`. `game-core` and `narrative` never import `engine`.

| Path | Responsibility | Imports allowed | Lead role |
|---|---|---|---|
| `content/story/` | ink scripts, beat graphs, cinematics (`*.cine.json`) | — (data) | Narrative Designer / Product Analyst |
| `content/quests/`, `content/characters/`, `content/canon/` | Quest, character and canon data | — | Product Analyst |
| `content/tuning/` | All gameplay numbers (speeds, damage, cooldowns, hunger rates, quality budgets) | — | Principal Game Designer |
| `content/chapters/` | Chapter manifests, cell lists, streaming data | — | Level Design |
| `content/i18n/` | Locale string tables | — | Narrative Designer |
| `content/schemas/` | JSON Schemas for all of the above | — | Technical Architect |
| `packages/shared/` | Types, event definitions, math helpers, seeded RNG, schema validators | none | Technical Architect |
| `packages/game-core/` | Pure simulation: player/enemy FSMs, combat, quests, blessing, hunger/energy, save model | shared | Developer + Game Designer |
| `packages/narrative/` | inkjs wrapper, beat engine, story runner API | shared, game-core types | Narrative Designer + Developer |
| `packages/engine/` | Three.js renderer wrapper, quality tiers, cameras, streaming, resource registry, audio mixer, input, VFX service, animation graph, sequencer | shared | Technical Architect + Technical Art |
| `packages/physics/` | Rapier adapter (character controller, queries, sensors) | shared | Developer |
| `packages/ui/` | Preact HUD, menus, subtitles, settings | shared | Developer |
| `apps/game/` | Composition root: wires input → game-core → engine; boot, loading, debug overlay | all | Developer |
| `apps/desktop/` | Tauri 2 shell, file-system save repository, updater, Steam hooks (later) | apps/game | Developer |
| `tools/story-cli/` | `story-run`, `story-lint`, `story-graph`, `story-coverage` | narrative, shared | Narrative Designer + Developer |
| `tools/asset-cli/` | glTF-Transform optimise, KTX2 encode, lightmap/LOD/collision bake, manifest generation | shared | Technical Art |
| `tools/perf-harness/` | Scripted fly-through, frame-time/VRAM capture, tier benchmarks | — | QA + Architect |
| `art-source/` (Git LFS or external storage) | `.blend`, `.psd/.kra`, source textures, concept art | — | Art (human or licensed) |
| `tests/` | Vitest (unit/replay), Playwright (smoke/screenshots) | — | QA |

## Rules
- Gameplay requests effects by name from the VFX service (`vfx.play("hit.spark", at)`); it never touches particles or GPU resources.
- Tunable numbers → `content/tuning`. Layout/level data → `content/chapters`. New events → `packages/shared/events`.
- Anything free of rendering/DOM/WASM stays in `game-core` or `narrative` so Vitest can cover it, including deterministic input-replay tests.
- Debug overlay (`?debug`): backend (WebGPU/WebGL2), frame-time graph, draw calls, triangles, VRAM estimate, active quality tier, collision/hitbox view, story-flag inspector. `window.__ADIVANSH__` exposes engine + game-core handles for browser QA in dev builds only.
- Large binaries never go in normal git history; runtime-ready assets are produced by `tools/asset-cli` into a build output (not committed) or tracked via LFS.
