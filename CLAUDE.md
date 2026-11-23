# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state (read first)

**The repository contains documentation only.** On 2026-11-23 the 2D Phaser prototype (all `src/`, tests, scripts, assets, npm/Vite/Playwright config and CI workflows) was deleted at the owner's request so the game can be rebuilt as a **3D, story-first desktop game**. The old code is in git history (commit `f90dc33` and earlier). There are no build, test or run commands yet; they are added here when the Phase 1 scaffold lands.

Do not recreate the old Phaser/2D code or add SVG/sprite character art. The owner requires real 3D, movie-like visuals with very human characters.

## Where the plan lives

- `docs/README.md` — hub and document map; start here.
- `docs/03-architecture/TECHNICAL_ARCHITECTURE.md` — chosen stack, rendering, tiers, game loop, risks and spikes S1–S8.
- `docs/03-architecture/DECISIONS.md` — ADR-006…011 define the 3D reset; ADR-001/002 are superseded/amended.
- `docs/03-architecture/NARRATIVE_SYSTEM.md` — story as data (ink + JSON), tooling, contracts.
- `docs/03-architecture/MODULE_MAP.md` — *planned* monorepo layout and dependency rules.
- `docs/TECHNOLOGY_AND_COMMERCIAL_ROADMAP.md` — phases 0–5 (we are in Phase 0: story lock).

## Planned stack (not yet implemented)

TypeScript + Vite + pnpm workspaces; Three.js `WebGPURenderer` + TSL with WebGL2 fallback; Rapier3D; glTF 2.0/KTX2/meshopt; inkjs; Preact HUD; Web Audio; Tauri 2 desktop shell; Vitest + Playwright. Pin versions at scaffold time (re-check npm; three.js minors can break).

## Key rules (apply once code exists)

- `game-core` and `narrative` packages never import rendering, DOM, WASM physics or audio — pure, deterministic, replay-testable.
- Presentation observes state/events and never decides gameplay or quest outcomes.
- Tunable numbers → `content/tuning`. Story/quests/dialogue → `content/` data with schemas. New events → `packages/shared`.
- Gameplay requests effects by name from the VFX service; it never creates GPU resources or particles directly.
- Target hardware: minimum Intel HD 620 / 8 GB at 720p 30 fps (`low` tier); all budgets are targets until measured. Never claim a performance number without a measurement.
- Desktop-first (keyboard/mouse + gamepad). Mobile is out of scope.

## Documentation conventions

- Mark capabilities as implemented, tested, reviewed, planned or proposed. A document describing a target is not proof of implementation.
- Record consequential technical decisions as new ADRs (append; do not rewrite history).
- Some older docs (VFX production, hunger/energy, blessing weapons, Chapter 1 asset inventory) still name Phaser/2D classes; they carry a note saying the design intent stands but the implementation is superseded.

## Workflow rules

- Never push directly to `main`. Open a PR (`gh pr create --title "..." --body "..." --base main --head <branch>`; `gh` is authenticated).
- CI and the scheduled `agent-cycle` workflow were removed in the reset (ADR-010). Recreate workflows only with the new scaffold, on `ubuntu-24.04` (not `ubuntu-latest`) plus `windows-latest` for desktop builds; document the reason for any workflow, branch-protection or deployment change.
- Do not auto-merge changes to workflows, secrets, engine/architecture or major art direction.
- A green CI run is not a commercial release — human playtesting and real-hardware QA are separate requirements.
- Claude cannot author final 3D character art or audio; route those through the asset pipeline (`docs/03-architecture/ASSET_PIPELINE.md`) with provenance recorded per `docs/06-commercial/ASSET_POLICY.md`.
