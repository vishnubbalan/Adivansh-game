# Adivansh — Architecture Decision Records

Append material decisions here; do not silently rewrite history.

## ADR-001 — Retain Phaser 3 for the current vertical slice
**Status:** **Superseded by ADR-006 (2026-11-23).** Original text: keep Phaser 3 + TypeScript + Vite while improving the existing game; benchmark before considering Phaser 4. The Phaser prototype was deleted in ADR-010.

## ADR-002 — Premium cinematic 2D and commercial-first
**Status:** **Amended by ADR-007 (2026-11-23).** The "2D" half is superseded; "commercial-first / complete, polished, playtested Chapter One before expanding scope or investing in online systems" remains in force.

## ADR-003 — Original cross-cultural fantasy art direction
**Status:** Accepted. ancient Indic / epic-era inspired original heroic character styling; Indian-Chinese-inspired environments in a fictional mythic realm. Broad Ramayana thematic inspiration, not conventional Ramayana character depiction. Maintain an art bible and review originality, cultural coherence and commercial rights.

## ADR-004 — Deterministic gameplay AI
**Status:** Accepted. Use finite-state machines initially, then Behaviour Trees/Utility AI where justified. No LLM for real-time combat or authoritative quest progression.

## ADR-005 — Demand-led online services
**Status:** Accepted. Start with local/offline-capable gameplay. Add cloud saves, accounts, analytics or generated dialogue only when player demand, privacy design and cost justify them.

## ADR-006 — 3D web-technology stack: Three.js WebGPU (WebGL2 fallback) + TypeScript
**Date:** 2026-11-23 · **Status:** Accepted, gated by spikes S1–S3, S6 (see TECHNICAL_ARCHITECTURE §12).
**Context:** Owner requires real 3D, movie-like visuals with very human characters (2026-11-14) and "the most modern 3D gaming technologies", playable on computers (2026-11-23). Dev hardware is an i3/HD 620/8 GB laptop; owner previously chose a light, browser-class stack over UE5.
**Decision:** TypeScript + Vite + Three.js `WebGPURenderer` with TSL node materials (automatic WebGL2 fallback), Rapier3D WASM physics, glTF 2.0 + KTX2 + meshopt assets, Web Audio mixer, DOM/Preact UI.
**Alternatives:** Unreal 5 (best ceiling; editor unusable on dev machine; heavy; kept as exit path), Unity, Godot 4 (web export limits), Babylon.js (strong tooling; re-evaluate at S1).
**Consequences:** Excellent iteration speed and zero-install demo distribution; visual ceiling below UE5 (no Nanite/Lumen/hardware RT); fidelity depends on art quality and baked lighting; three.js minor releases may break APIs, so versions are pinned and upgraded deliberately.
**Exit criteria:** If S1/S3 fail their budgets on the minimum tier, or the owner's reference-frame review of S3 fails twice, open ADR-012 to evaluate Unreal 5/Godot using the engine-neutral assets and `game-core` logic.

## ADR-007 — Premium cinematic 3D; camera model deferred to story/gameplay phase
**Date:** 2026-11-23 · **Status:** Accepted.
**Decision:** Presentation is cinematic real-time 3D. The camera is a pluggable rig stack; the default is third-person exploration/combat, with a side-locked rig available for precision-platforming chapters. Whether the *whole* game is full 3D movement or mostly 2.5D is decided during Phase 0/2 from the story and level designs, not by the engine.
**Consequences:** Existing 2D-specific specs (side-scrolling controls, sprite/atlas pipeline, parallax layers) are superseded and must be reviewed when their chapters are designed.

## ADR-008 — Desktop-first platform; mobile out of scope
**Date:** 2026-11-23 · **Status:** Accepted.
**Decision:** Primary target is Windows 10/11 with keyboard/mouse and gamepad; macOS/Linux best-effort. Distribution: browser build for demo, **Tauri 2** desktop build for storefronts (e.g. Steam). Mobile/touch support is removed from scope and from QA gates until separately approved.
**Consequences:** Removes mobile performance constraints and the touch HUD; adds Windows packaging, signing and Steam integration to Phase 5+.

## ADR-009 — Narrative as data; story authored before engine
**Date:** 2026-11-23 · **Status:** Accepted.
**Decision:** Story is authored in ink + schema-validated JSON (see NARRATIVE_SYSTEM.md), playable in a terminal runner and linted in CI before 3D production for that chapter begins. Chapter 1 story must be owner-approved in runnable form first.
**Consequences:** Early, cheap iteration on story; engine work follows validated content; forces stable line ids/localisation from day one.

## ADR-010 — Repository reset: delete the 2D prototype
**Date:** 2026-11-23 · **Status:** Accepted (owner instruction).
**Decision:** Remove all code, tests, scripts, assets, build config, npm manifests and CI/agent workflows of the Phaser prototype; keep `docs/`, issue templates, `CLAUDE.md` and `README.md` (rewritten). The prototype remains recoverable from git history (commit `f90dc33` and earlier).
**Consequences:** No runnable game exists until Phase 1 scaffold. The `agent-cycle`, `ci` and `deploy` workflows were removed because they only ran the old stack; replacement workflows are created with the new scaffold (no scheduled autonomous cycle until the new CI is green and the owner re-enables it).

## ADR-011 — Monorepo with a pure, engine-free game-core
**Date:** 2026-11-23 · **Status:** Accepted.
**Decision:** pnpm workspaces; `game-core` and `narrative` have no rendering/DOM/WASM dependencies and are covered by deterministic replay tests. Rendering is an adapter.
**Consequences:** Portable to another engine if ADR-006's exit criteria trigger; slightly more upfront structure.
