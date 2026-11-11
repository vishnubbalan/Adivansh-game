# Adivansh — Technical Architecture

## Status
This is the target architecture for a premium 2D browser action-adventure. The current application is a Phaser 3 + TypeScript + Vite prototype. Target capabilities below are not necessarily implemented.

## Goals
Stable desktop/mobile browser play; deterministic and testable gameplay; premium 2D art and effects; efficient chapter loading; a commercially testable first release; online services only when justified.

## Logical modules
- **Bootstrap/configuration:** Phaser setup, scaling, renderer and initial scene.
- **Scene lifecycle:** chapter transitions, preload and cleanup.
- **Input adapter:** keyboard, pointer and touch mapped to common actions.
- **Player controller:** movement, jump, attack and state transitions.
- **Combat:** hitboxes, damage, stagger, cooldowns and tuning data.
- **Enemy AI:** deterministic FSM initially; Behaviour Trees/Utility AI when justified.
- **Quest/story:** objectives, flags, dialogue and milestones; canonical state remains authoritative.
- **World interaction:** pickups, doors, shrines, puzzles and checkpoints.
- **Progression:** inventory, weapons, abilities and rewards.
- **Rendering:** layered backgrounds, atlases, animation, shaders and effects.
- **Audio:** music, ambience, SFX and user settings.
- **Persistence:** versioned local saves first; cloud adapter later.
- **Telemetry:** minimal, consented product/performance events.

## Data flow
Input is normalised into game actions. Controllers update deterministic state. Combat and interaction emit typed events. Quest and progression systems update canonical state. Rendering/audio respond to state but do not own gameplay truth. Persistence serialises versioned progress. Optional analytics receives approved minimal events.

## Recommended stack
- TypeScript, Vite and npm.
- Existing Phaser 3 runtime; benchmark Phaser 4 before any migration.
- WebGL primary with fallback where practical; never require WebGPU.
- Phaser Arcade Physics initially; Matter.js only for a specific need.
- Phaser sprite animations and atlases; evaluate Spine 2D if skeletal rigs materially improve output.
- Finite-state machines first; Behaviour Trees/Utility AI later if justified.
- Phaser/Web Audio API for sound.
- Local persistence first; evaluate Supabase for cloud saves/accounts after demand and privacy review.
- Server-mediated, bounded LLM only for optional dialogue/hints; never authoritative quest logic or real-time combat.
- Unit tests, Playwright Chromium/WebKit, reviewed screenshot baselines and real-device checks.
- GitHub Actions and GitHub Pages for current web delivery.

## Asset and loading strategy
Use chapter preload manifests, lazy-load between chapters, texture atlases, documented naming/scales, compressed assets and measured cache/memory budgets. Keep source art separate from runtime exports. Provide lower-cost effects/resolution variants for weaker devices. Core gameplay must not depend on optional AI/network services.

## Performance and compatibility
Measure initial load, scene transitions, frame-time, memory, texture/audio payload and input responsiveness on representative devices. Validate Chromium, WebKit and real iOS Safari. WebGPU remains optional.

## Security and privacy
Never ship API secrets in browser bundles. Validate backend inputs. Minimise analytics and disclose external services. Keep core gameplay offline-capable. Scrub sensitive data from error reporting.

## Migration policy
A Phaser major-version migration requires a time-boxed spike comparing dependency compatibility, visual parity, build output, frame-time, memory, mobile/WebKit behaviour and effort. Record the decision before approval.

## Current limitations
The prototype contains procedural placeholder drawings in parts of the forest scene. This target architecture is not evidence that final art, cloud saves, advanced AI or all quality gates exist.
