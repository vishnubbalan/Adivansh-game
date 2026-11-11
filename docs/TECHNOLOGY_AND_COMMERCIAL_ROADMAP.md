# Adivansh — Premium 2D Commercial Technology & Agent Roadmap

## Product direction

**Chosen direction:** premium cinematic 2D side-scrolling action-adventure.
**First business priority:** commercial viability and a credible path to launch.

Adivansh should compete through a distinctive visual identity, satisfying combat, memorable chapter design, reliable performance, and a polished player journey—not through technology count. Preserve the current Phaser + TypeScript browser foundation unless a measured technical spike proves a migration is worthwhile.

## Product positioning

- Genre: narrative-driven 2D action-adventure with light RPG progression, exploration, puzzles and boss encounters.
- Core promise: a cinematic, richly illustrated adventure inspired by the Ramayana, with original characters and respectful cultural treatment.
- Initial platform: responsive web game, desktop and mobile browsers.
- Commercial validation: prove retention, completion, player satisfaction and willingness to pay before investing in large backend or live-service infrastructure.

## Target architecture

| Layer | Recommended technology | Initial use / guardrail |
|---|---|---|
| Game runtime | Phaser 3 + TypeScript + Vite | Keep current engine while improving architecture and content. |
| Rendering | WebGL with Canvas fallback where practical | Use shaders, particles, layered parallax, lighting and post-processing selectively; profile on target phones. |
| Art pipeline | Authored 2D background plates, sprite sheets; Aseprite/Krita/Blender as appropriate; Spine 2D or DragonBones only if rigged animation justifies licensing and pipeline cost | Establish consistent art bible, source files, export settings, atlas naming and asset licences. AI concept art is reference until reviewed, cleaned and integrated as production assets. |
| Animation | Phaser animation system and sprite atlases; evaluate skeletal animation for complex characters | Required states: idle, run, jump, fall, attack, hit, defeat, special ability. |
| Physics | Phaser Arcade Physics initially | Evaluate Matter.js only for mechanics needing richer physical simulation. |
| Enemy AI | Finite-state machines first; Behaviour Trees / Utility AI when complexity warrants | Deterministic, testable combat; telegraphed attacks, phases, difficulty tuning. No LLM in real-time combat. |
| Game content | Data-driven chapters, quests, dialogue, items and balance configuration | Separate content from scene code; schema validation and versioned data. |
| Audio | Web Audio API / Phaser audio | Adaptive music layers, ambience, positional cues and accessibility controls. |
| Persistence / backend | Local save first; evaluate Supabase for accounts, cloud saves and leaderboards | Add only after privacy, security, backup, cost and platform requirements are designed. |
| Optional generative AI | Server-mediated LLM API for bounded NPC dialogue or hints | Optional, moderated, cost-capped, privacy-aware; authored narrative and quest state remain authoritative. |
| Analytics / crash reporting | Privacy-conscious product analytics and Sentry (or equivalent) | Track consented, minimal events: funnel, chapter completion, crashes, performance and control usage. |
| Delivery | GitHub Actions + GitHub Pages initially | CI, preview builds, release tags, rollback procedure and deployed smoke tests. |
| Quality | Vitest + Playwright Chromium/WebKit + reviewed screenshot baselines | Unit, integration, gameplay-flow, responsive, accessibility, performance and visual regression checks. Real iOS Safari device testing remains necessary. |

### Architecture principles

1. Keep gameplay deterministic and server-independent for the first release.
2. Separate rendering, input, combat, enemy behaviour, progression, narrative data, audio and persistence behind clear modules.
3. Load chapter assets on demand; use texture atlases, compressed images/audio, sensible resolution variants and cache budgets.
4. Set explicit mobile performance budgets and profile low/mid-range devices before adding expensive effects.
5. Keep WebGL as the primary accelerated renderer but do not require WebGPU.
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

These are five role prompts executed through the configured automation, not five independent always-on workers. The Orchestration role coordinates one bounded cycle at a time.

1. **Gaming Innovation Director:** review player feedback, genre references and technology changes; propose improvements with sources, player value, cost and risk. Never claim research without evidence.
2. **Product Analyst / BA:** own product vision, backlog, acceptance criteria, prioritisation, commercial assumptions and scope. Reject features without a player or business rationale.
3. **Developer:** implement one approved vertical-slice improvement, maintain architecture, optimise assets/runtime and add tests. Avoid speculative dependencies.
4. **QA / Player Agent:** verify acceptance criteria, browser/device behaviour, accessibility, visual quality, gameplay flow and performance; report reproducible evidence.
5. **Orchestration Agent:** schedule cycles, maintain PR workflow, enforce checks, report status and ensure only reviewed, passing changes reach production.

### Priority order for every cycle

1. Release blockers, security/privacy issues and broken core gameplay.
2. Chapter One completion and player onboarding.
3. Visual identity, animation and combat feel.
4. Mobile/browser performance and accessibility.
5. Analytics, persistence and commercial launch requirements.
6. New content and optional AI features.

Every proposed task must include player value, commercial rationale (or explicitly state none), effort/risk, dependencies, acceptance criteria and test strategy. Choose one independently testable task per cycle.

## Quality and release gates

- Unit tests and production build pass.
- Relevant Chromium and WebKit E2E tests pass.
- Reviewed screenshot baselines pass for changed visual areas; never auto-approve changed baselines.
- Core gameplay path is tested: start, move, fight, interact, collect clue, complete chapter, save/reload if persistence exists.
- Accessibility and mobile touch targets are checked.
- Performance is measured on agreed representative devices; report actual measurements, not guesses.
- No open P0/P1 defects.
- Release notes identify commit, changes, known issues and test evidence.
- Deployed-site smoke test passes. Human playtest and real-device Safari checks are recorded separately from automation.

A green CI run does not prove commercial readiness or production quality. Human review, playtesting, licensing review, privacy/security review and release approval remain required.

## Phased delivery plan

### Phase 0 — Product and technical baseline
- Inventory dependencies, engine version, browser support, asset licences and current defects.
- Define target devices, minimum browser versions and performance budgets.
- Create a playable Chapter One acceptance checklist and a visual art bible.
- Benchmark current Phaser 3 build before considering Phaser 4.

### Phase 1 — Commercial-quality vertical slice
- Replace procedural placeholder hero, enemies and backgrounds with original production-quality 2D assets.
- Implement full Chapter One quest loop, polished combat, boss encounter, checkpoints and clear feedback.
- Add sound, settings, pause, restart, accessibility and responsive UI.
- Add reviewed visual baselines and real device test plan.

### Phase 2 — Player validation
- Conduct moderated playtests and collect consented analytics.
- Fix onboarding, difficulty, performance and completion issues.
- Test save/resume and evaluate cloud saves only if player need is demonstrated.

### Phase 3 — Launch foundation
- Landing page, release versioning, privacy notice, support channel, licence audit and deployment/rollback runbook.
- Select distribution and monetization model based on evidence and platform economics.
- Security and privacy review of all external services.

### Phase 4 — Expand based on evidence
- Develop Chapters Two to Five.
- Add achievements, cloud saves, leaderboards or bounded NPC AI only where they improve player value.
- Reassess engine/rendering upgrades only with benchmark evidence.

## Phaser 4 migration decision

Do not automatically migrate. Create a time-boxed branch spike only after recording:
- Current Phaser version and all plugin/API dependencies.
- Build and runtime compatibility.
- Visual parity for representative scenes.
- Desktop and mobile frame-time, memory and load-time comparisons.
- WebKit/iOS compatibility and fallback behaviour.
- Migration effort and maintenance risk.

Migrate only if measurable benefits outweigh disruption and the existing vertical slice remains stable.

## Definition of a commercial-quality milestone

A milestone is complete only when its player-facing acceptance criteria, automated checks, reviewed visual output, performance evidence, accessibility checks, asset/licence review and human playtest evidence are documented. Never label an untested feature or placeholder asset production-ready.
