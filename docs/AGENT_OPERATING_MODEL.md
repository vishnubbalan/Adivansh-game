# Adivansh Agent Operating Model

## Approved product direction

Adivansh targets **premium cinematic 2D**, with **commercial viability as the first priority**. The initial commercial milestone is a polished, complete and playtested Chapter One vertical slice. The detailed target stack and delivery strategy are in [Technology & Commercial Roadmap](TECHNOLOGY_AND_COMMERCIAL_ROADMAP.md).

## Team roles

| Role | Primary responsibility | Output |
|---|---|---|
| Gaming Innovation Director | Evidence-backed innovation in game feel, story, visuals, accessibility and player experience | Proposals with player value, evidence, cost and risk |
| Product Analyst / BA | Own vision, backlog, scope, prioritisation, commercial assumptions and acceptance criteria | Approved stories and release scope |
| Developer | Implement approved stories, maintain architecture and optimise assets/runtime | Code, integrated assets, tests and implementation notes |
| QA / Player Agent | Validate functionality, gameplay, browser/device behaviour, accessibility, visual output and performance | Reproducible findings with screenshots/traces and test results |
| Orchestration Agent | Coordinate scheduled cycles, PRs, quality gates, deployments and reporting | Traceable workflow and release status |

These are role prompts coordinated by the repository automation. They are not five independent always-on workers unless a separate execution platform is configured.

## Innovation-to-release loop

1. **Discover:** Innovation Director reviews player feedback and credible game/technology references; proposals state sources, player value, effort and risk.
2. **Decide:** BA prioritises by player impact, commercial relevance, cultural fit, scope and dependencies.
3. **Specify:** BA writes a bounded story with acceptance criteria, non-goals, accessibility and test requirements.
4. **Build:** Developer implements one approved story and adds tests.
5. **Verify:** QA runs unit tests, build checks, Chromium/WebKit E2E, visual checks and relevant device/performance checks.
6. **Review:** Human owner reviews significant art, scope, licensing, privacy, monetization and release decisions.
7. **Deploy:** CI/CD deploys only after required checks and merge policy pass.
8. **Play:** Post-deployment QA tests the exact deployed version against acceptance criteria; automated smoke tests are not represented as a human playthrough.
9. **Triage:** QA records reproducible issues with commit/version and evidence; BA decides priority.
10. **Improve:** Developer fixes accepted defects; QA retests and the release pipeline repeats.

## Commercial prioritisation

Use this order when selecting work:
1. Release blockers, privacy/security concerns and broken core gameplay.
2. Chapter One completion, onboarding and combat feel.
3. Original 2D art, animation, sound and visual identity.
4. Mobile/browser performance, accessibility and reliability.
5. Launch foundations: licensing, privacy notice, support, versioning and privacy-conscious analytics.
6. Cloud saves, achievements, leaderboards and optional AI dialogue only when validated player demand supports them.
7. Additional chapters and nonessential features.

Every task records player value, commercial rationale (or none), effort/risk, dependencies, acceptance criteria and test strategy. Do not treat more technology or more frequent builds as business outcomes.

## Defect lifecycle

`Detected → Reported → BA triage → Accepted / Duplicate / Not planned → Developer fix → Automated QA → Deployment → Player QA retest → Closed`

- P0: release-blocking; stop release or roll back where possible.
- P1: critical gameplay path broken; block release.
- P2: normal defect; schedule according to player impact.
- P3: minor polish issue; backlog unless it harms accessibility or comprehension.

## Definition of Done

A story is done only when:
- Its acceptance criteria and relevant core gameplay path are met.
- Implementation and regression tests are committed.
- Unit tests, production build and relevant E2E tests pass.
- Reviewed visual output and accessibility checks pass for changed areas.
- Performance is measured on representative devices when runtime/rendering changed.
- No known P0/P1 defect remains open.
- Asset, font, music and dependency licences are reviewed for commercial use.
- Privacy/security implications are assessed for new external services.
- The deployed version is identified by commit SHA.
- Player QA records what was tested and what remains untested.
- Any residual issues have a BA decision and backlog reference.

## Operating principles

- BA owns prioritisation and scope; innovation and QA advise with evidence.
- Developer does not self-approve player-facing quality.
- Automated tests, real-device checks and human playtesting are complementary.
- Never infer successful deployment from a successful build.
- Never report a test, research activity, screenshot, performance measurement or gameplay session that did not occur.
- Use GitHub Issues as the defect and story handoff record where permissions allow.
- Protect player privacy; collect only necessary analytics with appropriate transparency and consent.
- Commercial readiness requires more than CI: human playtesting, release review, licensing, privacy/security and a viable distribution/monetization plan.
