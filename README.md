# Adivansh — The Search for the Queen

A cinematic, premium **3D** action-adventure for desktop computers, inspired by the emotional themes of the Ramayana: separation, loyalty, courage, duty and the search for a loved one. 100 chapters across four seasons, told with very human characters and a movie-like look.

> **Status (2026-11-23): design phase — there is no runnable game yet.** The earlier 2D Phaser prototype was deleted so the game can be rebuilt from scratch in 3D, story first. The old code is recoverable from git history (commit `f90dc33` and earlier). Everything in `docs/` is the plan; nothing described there is implemented until a spike or milestone says so.

## Where we are

| Phase | Goal | State |
|---|---|---|
| 0 — Story lock | Chapter 1 story as runnable ink + beat data; canon; character bible | **Current** |
| 1 — Spikes + scaffold | Prove WebGPU renderer, human characters, physics, streaming, desktop shell on the minimum PC | Planned |
| 2 — Vertical slice | One complete, polished, playtested Chapter 1 | Planned |
| 3+ — Validate, launch, expand by season | See [roadmap](docs/TECHNOLOGY_AND_COMMERCIAL_ROADMAP.md) | Planned |

## Technology (decided in [ADR-006](docs/03-architecture/DECISIONS.md), gated by spikes)

- **TypeScript + Vite + pnpm** monorepo with an engine-free `game-core` (deterministic, replay-testable)
- **Three.js WebGPURenderer + TSL** shaders, automatic **WebGL2** fallback; PBR, cascaded shadows, baked GI, GTAO, bloom, volumetric-style fog, GPU-compute particles
- **Rapier3D** (WASM) physics; **glTF 2.0 + KTX2 + meshopt** assets from Blender
- **ink (inkjs)** narrative + schema-validated JSON beats + timeline cinematics
- **Tauri 2** desktop shell (browser demo build too); Windows first, keyboard/mouse + gamepad
- Quality tiers from Intel HD 620 (30 fps, 720p) up to high-end GPUs

Full design: [Technical Architecture](docs/03-architecture/TECHNICAL_ARCHITECTURE.md) · [Narrative System](docs/03-architecture/NARRATIVE_SYSTEM.md) · [Module Map](docs/03-architecture/MODULE_MAP.md) · [Asset Pipeline](docs/03-architecture/ASSET_PIPELINE.md) · [VFX](docs/03-architecture/VFX_SYSTEM.md).

## Documentation

The structured handbook is in [docs/README.md](docs/README.md): vision, story bible, Chapter 1 story, all-100-chapter map, characters, world and season designs, combat, systems, agents, production plans and commercial policy.

**Approved art direction:** original ancient Indic / epic-era heroic fantasy styling in a fictional mythic world blending Indian and Chinese environmental influences; broad Ramayana themes without conventional Ramayana character depictions.

## Working in this repository

There is nothing to install or run yet. Work today is documentation, story and design:

1. Branch from `main`; never push directly to `main`; open a PR.
2. Record material technical decisions as ADRs in `docs/03-architecture/DECISIONS.md`.
3. Mark capabilities accurately as implemented, tested, reviewed, planned or proposed.

Build/run/test instructions are added here when the Phase 1 scaffold lands.

## Delivery principle

A complete, polished, playtested Chapter 1 vertical slice comes before expansion. A green CI run is not a commercial release; human playtesting and real-hardware QA are separate requirements.
