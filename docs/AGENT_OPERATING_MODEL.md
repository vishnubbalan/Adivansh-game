# Adivansh Agent Operating Model

## Team roles

| Role | Primary responsibility | Output |
|---|---|---|
| Gaming Innovation Director | Research modern game innovation, mechanics, narrative and player experience | Evidence-backed innovation proposals |
| Product Analyst / BA | Own vision, backlog, story design, prioritisation and acceptance criteria | Approved stories and release scope |
| Developer | Implement approved stories and fix defects | Code, assets, tests and implementation notes |
| QA Engineer | Validate code and features through unit, integration and E2E automation | Test results and regression findings |
| Post-Deployment Player QA | Play the deployed build and evaluate real player experience | Reproducible player-facing defect reports |

These are AI role specifications coordinated by the project orchestrator. They are not five independently running background agents unless separately configured with an execution platform.

## Innovation-to-release loop

1. **Discover:** Gaming Innovation Director researches and submits proposals.
2. **Decide:** BA reviews player value, evidence, cultural fit, scope, risks, and roadmap priority.
3. **Specify:** BA converts accepted proposals into epics/stories with clear acceptance criteria and non-goals.
4. **Build:** Developer implements only approved scope and adds/updates automated tests.
5. **Verify:** QA Engineer runs unit tests, build checks, and Playwright E2E regression.
6. **Deploy:** CI/CD deploys only after required checks pass.
7. **Play:** Post-Deployment Player QA opens the exact deployed release and plays the game against the story acceptance criteria.
8. **Triage:** Player QA creates evidence-backed GitHub issues and routes them to the BA.
9. **Fix:** BA prioritises and turns confirmed defects into developer tasks. Developer fixes them; QA verifies the fix.
10. **Re-release:** Repeat CI/CD and deployed-build player QA until the release gate is satisfied.

## Defect lifecycle

`Detected → Reported → BA triage → Accepted / Duplicate / Not planned → Developer fix → Automated QA → Deployment → Player QA retest → Closed`

- P0: release-blocking; stop release or roll back where possible.
- P1: critical gameplay path broken; block release.
- P2: normal defect; schedule according to player impact.
- P3: minor polish issue; backlog unless it harms accessibility or comprehension.

## Definition of Done
A story is done only when:
- Its acceptance criteria are met.
- Implementation and regression tests are committed.
- Unit tests, production build, and relevant E2E tests pass.
- No known P0/P1 defect remains open.
- The deployed version is identified by commit SHA.
- Player QA has completed the relevant playthrough and recorded tested/not-tested areas.
- Any accepted residual issues have a BA decision and backlog reference.

## Operating principles
- The BA owns prioritisation and scope; innovation and QA roles advise with evidence.
- Developer does not self-approve player-facing quality.
- Automated tests and human-style gameplay checks are complementary.
- Never infer a successful deployment from a successful build alone.
- Never report a test, research activity, screenshot, or gameplay session that did not occur.
- Use GitHub Issues as the defect and story handoff record where repository permissions allow.
