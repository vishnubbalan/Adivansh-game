# Adivansh — AI Agent Workflow and Handoffs

## Cadence
The repository workflow is scheduled every eight hours UTC (nominally three starts per day). GitHub may delay scheduled workflows. These are cycle starts, not guaranteed builds, PRs or releases.

## Cycle
1. Orchestration starts and gathers current status.
2. Innovation proposes a sourced opportunity.
3. BA prioritises and writes acceptance criteria.
4. Technical Architect reviews design, technology, risks and ADR needs.
5. Developer implements one bounded task.
6. QA runs relevant automated and manual-style checks.
7. Orchestration opens/updates PR and enforces gates.
8. Human review occurs where required.
9. Merge and deployment happen only under repository policy.
10. Post-deployment verification feeds the next cycle.

## Handoff contract
- Innovation → BA: opportunity, evidence, player value, cost and risk.
- BA → Architect: approved story, constraints, acceptance criteria and non-goals.
- Architect → Developer: module boundaries, interfaces, technology decision, ADR and test expectations.
- Developer → QA: implementation summary, changed files, known limits and verification steps.
- QA → BA/Developer: pass/fail evidence, reproduction, severity and residual risk.
- Orchestration → human owner: PR, CI/deployment status, spend/approval needs and unresolved decisions.

## Stop conditions
Stop and report if requirements conflict; paid services/secrets/privacy/legal decisions are needed; a major engine/dependency change lacks approval; unrelated failures cannot be diagnosed; production art rights are unknown; or a gate would be bypassed.

## Cycle report
Timestamp and commit/branch; selected task and rationale; role outputs and decisions; changed files; tests actually run; screenshots/traces/performance evidence; defects/risks; PR/deployment state; human decisions required.
