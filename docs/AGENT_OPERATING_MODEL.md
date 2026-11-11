# Adivansh Agent Operating Model

The authoritative, structured role charters and handoffs now live in [docs/README.md](README.md), especially [Agent Team](04-agents/AGENT_TEAM.md), [Technical Architect](04-agents/TECHNICAL_ARCHITECT_AGENT.md) and [Agent Workflow](04-agents/AGENT_WORKFLOW.md).

## Six roles
1. Gaming Innovation Director — evidence-backed game/player innovation.
2. Product Analyst / BA — product vision, backlog, acceptance criteria and commercial prioritisation.
3. Principal Game & AI Technical Architect — technical strategy, technology radar, architecture reviews, ADRs, performance budgets and innovation spikes.
4. Game Developer — implementation, asset integration and tests.
5. QA / Player Agent — independent gameplay, browser, visual, accessibility and performance verification.
6. Orchestration Agent — cycle coordination, PRs, quality gates, deployment and reporting.

These are role prompts coordinated by repository automation, not six independent always-on workers.

## Innovation-to-release loop
Discover opportunity → BA prioritises and specifies → Architect reviews solution and risks → Developer implements one bounded task → QA verifies → Orchestration opens/updates PR → required checks and human review → merge/deploy → post-deployment verification → triage and next cycle.

## Defect lifecycle
Detected → Reported → BA triage → Accepted / Duplicate / Not planned → Developer fix → Automated QA → Deployment → Player QA retest → Closed.

- P0: release-blocking security/privacy, data-loss or unusable-game issue.
- P1: critical gameplay/progression or major browser/device failure; blocks release.
- P2: material issue with workaround; fix or explicitly accept.
- P3: minor polish issue; backlog unless accessibility/comprehension suffers.

## Definition of Done
Acceptance criteria met; implementation and regression tests committed; unit/build/relevant E2E pass; reviewed visual output and accessibility checks complete; representative performance evidence recorded when relevant; no open P0/P1; asset rights and privacy/security assessed; deployed version identified; player QA records tested and untested areas; residual risks accepted by BA/human owner.

## Operating principles
BA owns product priority; Technical Architect owns technical recommendations; Developer does not self-approve quality; automated tests and human playtesting are complementary; never infer deployment from build success; never report tests/research/screenshots/performance/playthroughs that did not occur; protect player privacy; commercial readiness requires human playtesting, licensing, privacy/security, distribution and release review.
