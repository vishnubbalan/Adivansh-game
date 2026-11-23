# Adivansh — Production Roadmap

## Guiding rule
Ship a complete, polished and playtested Chapter One before expanding to all five chapters. Commercial viability is the first priority.

## Milestone 0 — Story lock and technical baseline (current; 2026-11-23 reset)
The 2D prototype was deleted. Finalise the Chapter 1 story as runnable ink + beat data, the canon database and the character bible; approve the 3D architecture ([TECHNICAL_ARCHITECTURE.md](../03-architecture/TECHNICAL_ARCHITECTURE.md)); run spikes S1–S8; scaffold the monorepo, CI and perf harness.
**Exit:** owner-approved Chapter 1 script, spike results recorded, S1/S3/S6 passed (or an ADR for the alternative), measurable QA plan. See Phases 0–1 in [TECHNOLOGY_AND_COMMERCIAL_ROADMAP.md](../TECHNOLOGY_AND_COMMERCIAL_ROADMAP.md).

## Milestone 1 — Premium Chapter One
Produce original 3D ancient Indic / epic-era heroic characters and Indian-Chinese-inspired forest/temple environments. Complete controls, combat, boss, clue, objective flow and ending. Add animation, VFX, audio, pause/settings, checkpoints and HUD.
**Exit:** playable start-to-finish chapter, reviewed assets and no P0/P1 defects.

## Milestone 2 — Closed player validation
Run moderated playtests. Observe onboarding, combat readability, difficulty and completion. Test minimum and recommended hardware tiers. Fix highest-impact friction and performance issues; collect only necessary transparent feedback.
**Exit:** findings, fixes, measured performance and proceed/rework decision.

## Milestone 3 — Launch readiness
Release versioning, landing page, support path, rollback, privacy/security review, asset licence audit and commercial model/distribution evaluation.
**Exit:** reproducible release candidate and human approval.

## Milestone 4 — Expand based on evidence
Build Forgotten Temple and River of Ashes; add enemies, weapons and puzzles. Consider cloud saves/achievements only where player need is validated.

## Milestone 5 — Complete narrative arc
Build Demon Citadel and Final Passage; complete narrative, final boss and ending; full regression, accessibility, localisation and performance pass.

## Prioritisation
Release blockers and core gameplay first. Score other work by player value, commercial relevance, confidence, effort, risk and dependencies. Fashionable technology alone is not priority.

A scheduled agent run is not a release. Release requires passing gates, merged commit, deployed verification and human approval where specified.
