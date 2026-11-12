# Adivansh — AI Agent Workflow and Handoffs

## Cadence

The repository workflow is configured to start every four hours UTC (cron: 0 */4 * * *), nominally six starts per day. In India Standard Time, the expected slots are 01:30, 05:30, 09:30, 13:30, 17:30 and 21:30. GitHub may delay or skip scheduled workflows, particularly during periods of high load. These are cycle starts, not guaranteed builds, PRs or releases. A playable deployment occurs only when a meaningful change passes required checks, is merged under repository policy and passes deployed verification.

## Operating model

Nine role prompts are coordinated by one scheduled Codex workflow. They are not nine independent always-on agents and should not be described as nine simultaneous workers. The workflow orchestrates relevant role reviews in a deliberate sequence; specialist participation is recorded in the cycle report.

## Cycle

1. Orchestration inspects current main, active milestone issues, open PRs, recent CI/deployment outcomes and the agent report from prior cycles.
2. Innovation identifies a player-value opportunity or concrete defect.
3. BA prioritises one bounded task and defines observable acceptance criteria.
4. The relevant game specialist reviews the task: Principal Game Designer for mechanics/combat; 2D Animation & Technical Art for visual assets/animation; Level Design & Player Experience for routes/puzzles/encounters. Multiple specialists may review cross-cutting work, but irrelevant reviews are skipped.
5. Technical Architect reviews boundaries, dependencies, performance, browser support, cost, rights and ADR needs.
6. Developer implements one bounded task and adds tests.
7. QA independently verifies the changed behaviour and records evidence, limitations and human-only checks.
8. Orchestration records specialist handoffs, opens/updates a PR and enforces quality gates.
9. Human review occurs where required; merge and deployment happen only under repository policy.
10. Post-deployment verification feeds the next cycle.

## Handoff contract

- Innovation → BA: opportunity, evidence, player value, cost and risk.
- BA → relevant specialist: approved story, constraints, acceptance criteria and non-goals.
- Game Designer → Developer/QA: mechanics rules, tuning intent, edge cases and playtest questions.
- 2D Technical Art → Developer/QA: asset specification, animation states, pivots, frame timing, hitbox and import requirements, provenance.
- Level Design → Developer/QA: route flow, landmarks, encounter/puzzle sequence, checkpoints, completion and softlock cases.
- Architect → Developer: module boundaries, interfaces, technology decision, ADR and test expectations.
- Developer → QA: implementation summary, changed files, known limits and verification steps.
- QA → BA/Developer/specialist: pass/fail evidence, reproduction, severity and residual risk.
- Orchestration → human owner: PR, specialist decisions, CI/deployment status, spend/approval needs and unresolved decisions.

## Stop conditions

Stop and report if requirements conflict; paid services/secrets/privacy/legal decisions are needed; a major engine/dependency change lacks approval; unrelated failures cannot be diagnosed; production art rights are unknown; or a gate would be bypassed.

## Cycle report

Timestamp and commit/branch; selected task and rationale; specialists engaged and their actual recommendations; architect decision; changed files; tests actually run; screenshots/traces/performance evidence; defects/risks; PR/deployment state; human decisions required; next task candidate.
