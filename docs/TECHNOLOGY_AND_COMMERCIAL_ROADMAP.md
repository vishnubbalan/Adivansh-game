# Adivansh — Premium 3D Commercial Technology & Agent Roadmap

> **Reset 2026-11-23:** the 2D Phaser prototype was deleted. The product is now a premium cinematic **3D** desktop game, built **story-first**. The authoritative technical design is [03-architecture/TECHNICAL_ARCHITECTURE.md](03-architecture/TECHNICAL_ARCHITECTURE.md); decisions are in [DECISIONS.md](03-architecture/DECISIONS.md) (ADR-006 to ADR-011).

## Product direction

**Chosen direction:** premium cinematic real-time 3D action-adventure for desktop computers.
**First business priority:** commercial viability and a credible path to launch.

Adivansh competes through a distinctive visual identity, a strong story, satisfying combat, memorable chapter design, reliable performance and a polished player journey — not through technology count. Technology is chosen to serve the story and is gated by measured spikes.

## Product positioning

- Genre: narrative-driven 3D action-adventure with light RPG progression, exploration, puzzles and boss encounters.
- Core promise: a cinematic, movie-like adventure inspired by the Ramayana, with original, very human characters and respectful cultural treatment.
- Initial platform: Windows desktop (keyboard/mouse + gamepad); browser demo build; macOS/Linux best-effort. Mobile is out of scope (ADR-008).
- Commercial validation: prove completion, player satisfaction and willingness to pay before investing in backend or live-service infrastructure.

## Target architecture (summary)

| Layer | Technology | Guardrail |
|---|---|---|
| Runtime | TypeScript + Vite + pnpm monorepo | Pure `game-core`; rendering is an adapter |
| Rendering | Three.js WebGPU renderer + TSL (WebGL2 fallback) | Quality tiers; never require WebGPU; baked GI, no ray tracing |
| Art pipeline | Blender → glTF 2.0 → glTF-Transform/meshopt/KTX2 | Reproducible CLI; provenance recorded |
| Physics | Rapier3D (WASM), fixed 60 Hz | Deterministic replay tests |
| AI | FSM first; BT/Utility for bosses; navmesh | Deterministic, seeded; no LLM in combat |
| Narrative | ink + JSON beats + timeline cinematics | Story playable in terminal before 3D exists |
| Audio | Web Audio mixer, adaptive stems | See AUDIO_SYSTEMS_DESIGN |
| UI | DOM/Preact overlay | Full gamepad/keyboard navigation, subtitles |
| Persistence | IndexedDB / desktop files, versioned schema | Local first; cloud only after demand + privacy review |
| Desktop shell | Tauri 2 (Electron if spike S6 fails) | Signed builds before public release |
| Quality | Vitest + Playwright + perf harness + human playtests | Report measurements, not guesses |
| Delivery | GitHub Actions (ubuntu-24.04 + windows-latest) | PR-gated; no direct pushes to main |

### Architecture principles

1. Keep gameplay deterministic and server-independent for the first release.
2. Separate rendering, input, combat, AI, progression, narrative data, audio and persistence behind clear modules; `game-core` has no rendering imports.
3. Stream chapter cells on demand; compressed meshes, textures (KTX2) and audio; explicit per-tier budgets.
4. Set performance budgets (see architecture §5.4) and measure on the minimum tier (HD 620) before adding expensive effects.
5. WebGPU is the primary path but the game must run on WebGL2.
6. Avoid premature multiplayer, open-world systems, blockchain/NFT features, always-online requirements and unbounded generative AI.
7. Audit all third-party assets, fonts, music, libraries and generated content for commercial-use rights.

## Commercial product strategy

### Release sequence

- **Prototype validation:** one complete, polished vertical slice (Chapter One), not five incomplete chapters.
- **Closed playtest:** invite a small group; observe onboarding, controls, combat clarity, difficulty, performance and completion.
- **Public web launch:** release a stable Chapter One with clear store/landing page, privacy notice, support/contact path and analytics consent where required.
- **Expansion decision:** build additional chapters based on playtest and funnel evidence.

### Monetization experiments — decide after validation

Potential models to test:
- Premium one-time purchase for the full game.
- Free first chapter with paid chapter/complete-game unlock.
- Demo plus full-game purchase on a suitable distribution platform.

Do not add ads, subscriptions, pay-to-win boosts, loot boxes or aggressive purchase prompts to the initial build. Compare platform fees, payment/tax obligations, refunds, regional pricing and customer support before selecting a model. No monetization model is approved yet.

### Product metrics

Instrument only what is needed and respect privacy. Establish baselines before setting numeric targets:
- Landing-page → start-game conversion.
- Tutorial/control onboarding completion.
- Chapter One completion and time-to-complete.
- Session length and voluntary return rate.
- Death/retry points and difficulty drop-offs.
- Crash-free sessions, load time, frame-time and memory on target devices.
- Player-reported enjoyment, clarity, accessibility and purchase intent.
- Support issues and refund/complaint rates after paid launch.

Do not optimize for engagement at the expense of player wellbeing or use misleading metrics as proof of commercial success.

## Agent operating model

These are six role prompts executed through the configured automation, not five independent always-on workers. The Orchestration role coordinates one bounded cycle at a time.

1. **Gaming Innovation Director:** review player feedback, genre references and technology changes; propose improvements with sources, player value, cost and risk. Never claim research without evidence.
2. **Product Analyst / BA:** own product vision, backlog, acceptance criteria, prioritisation, commercial assumptions and scope. Reject features without a player or business rationale.
3. **Principal Game & AI Technical Architect:** evaluate technologies, review architecture, define interfaces and performance budgets, maintain ADRs and guide technical spikes.
4. **Developer:** implement one approved vertical-slice improvement, maintain architecture, optimise assets/runtime and add tests. Avoid speculative dependencies.
5. **QA / Player Agent:** verify acceptance criteria, browser/device behaviour, accessibility, visual quality, gameplay flow and performance; report reproducible evidence.
6. **Orchestration Agent:** schedule cycles, maintain PR workflow, enforce checks, report status and ensure only reviewed, passing changes reach production.

### Priority order for every cycle

1. Release blockers, security/privacy issues and broken core gameplay.
2. Chapter One completion and player onboarding.
3. Visual identity, animation and combat feel.
4. Desktop performance and accessibility.
5. Analytics, persistence and commercial launch requirements.
6. New content and optional AI features.

Every proposed task must include player value, commercial rationale (or explicitly state none), effort/risk, dependencies, acceptance criteria and test strategy. Choose one independently testable task per cycle.

## Quality and release gates

- Unit tests and production build pass.
- Relevant Chromium E2E/smoke tests pass on WebGPU and WebGL2 backends.
- Reviewed screenshot baselines pass for changed visual areas; never auto-approve changed baselines.
- Core gameplay path is tested: start, move, fight, interact, collect clue, complete chapter, save/reload if persistence exists.
- Accessibility (subtitles, rebinding, contrast, reduced motion) is checked.
- Performance is measured on agreed representative devices; report actual measurements, not guesses.
- No open P0/P1 defects.
- Release notes identify commit, changes, known issues and test evidence.
- Deployed-site smoke test passes. Human playtest and real-hardware checks are recorded separately from automation.

A green CI run does not prove commercial readiness or production quality. Human review, playtesting, licensing review, privacy/security review and release approval remain required.

## Phased delivery plan

### Phase 0 — Story lock (current)
- Finalise story bible, Chapter 1 story and character bible; convert Chapter 1 to ink + beat JSON; build `story-run`/`story-lint`.
- Owner approves Chapter 1 in runnable, readable form. Resolve open questions: camera model (3rd-person vs 2.5D), core verbs, ending of Season 1.
- Exit: approved Chapter 1 script, canon database seeded, lint green.

### Phase 1 — Technical spikes and scaffold
- Run spikes S1–S8 ([architecture §12](03-architecture/TECHNICAL_ARCHITECTURE.md)); record in SPIKE_RESULTS.md; update ADRs.
- Create monorepo scaffold, CI (unit, build, smoke), debug overlay and perf harness.
- Exit: S1, S3 and S6 pass (or an ADR records the alternative); measured budgets replace targets.

### Phase 2 — Commercial-quality vertical slice (Chapter 1)
- Greybox → blockout → final art for the village and forest; hero and key NPCs to approved concept; combat, quest loop, boss, checkpoints, audio, settings, accessibility.
- Exit: playable start-to-finish chapter on minimum and recommended tiers, no P0/P1 defects.

### Phase 3 — Player validation
- Moderated playtests, consented minimal analytics, difficulty/onboarding fixes, save/resume verification.

### Phase 4 — Launch foundation
- Desktop packaging and signing, store page, privacy notice, support path, licence audit, rollback runbook; select monetisation by evidence.

### Phase 5 — Expand by season
- Season 1 (forest) to completion, then Seasons 2–4 per [SEASON_RELEASE_ROADMAP.md](05-production/SEASON_RELEASE_ROADMAP.md), re-checking engine fit at each season boundary.

## Engine re-evaluation rule
Do not migrate engines casually. A migration (including to Unreal 5 or Godot) requires a time-boxed spike recording: what failed in the current stack (measured), asset/logic portability (glTF + `game-core` + content data), cost, licence and effort. See ADR-006 exit criteria.

## Definition of a commercial-quality milestone

A milestone is complete only when its player-facing acceptance criteria, automated checks, reviewed visual output, performance evidence, accessibility checks, asset/licence review and human playtest evidence are documented. Never label an untested feature or placeholder asset production-ready.


## Approved cross-cultural visual identity

- Characters use original ancient Indic / epic-era heroic fantasy styling, not conventional Ramayana costumes or direct depictions.
- The world is a fictional mythic realm blending researched Indian and Chinese architectural, landscape and material influences. It is not a real-world nation or socioeconomic “third world” setting.
- Weapon design may combine traditional weapon families, mythic fantasy weapons and restrained ancient-futurist/arcane technology.
- See [Art Direction](02-world/ART_DIRECTION.md), [Character Bible](02-world/CHARACTER_BIBLE.md), [Environment and VFX Bible](02-world/ENVIRONMENT_AND_VFX_BIBLE.md) and [Weapons & Combat](02-world/WEAPONS_AND_COMBAT.md).

## Six-agent team

The team includes a **Principal Game & AI Technical Architect** in addition to Innovation Director, Product Analyst, Developer, QA/Player and Orchestration. The Architect owns technical recommendations, technology radar, architecture reviews, performance budgets, ADRs and technical spikes. The role cannot unilaterally change product scope, migrate engines or add paid services. See [Agent Team](04-agents/AGENT_TEAM.md) and [Technical Architect specification](04-agents/TECHNICAL_ARCHITECT_AGENT.md).
