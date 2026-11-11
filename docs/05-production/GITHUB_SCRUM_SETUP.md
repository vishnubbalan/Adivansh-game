# GitHub Scrum workflow for Adivansh

Use GitHub Issues for backlog items and defects, GitHub Projects (v2) for sprint planning, pull requests for implementation review, and Actions for quality gates.

## Project board

Create a Project named **Adivansh — Game Development** and link this repository. Recommended views:
1. Scrum board — Board layout, grouped by Status.
2. Product backlog — Table filtered to Backlog.
3. Defects — Table filtered to Work Type = Bug.
4. Chapter roadmap — Roadmap layout, grouped by Chapter.
5. Current sprint — Board/table filtered to the active Sprint.

## Project fields

| Field | Type | Values |
|---|---|---|
| Status | Built-in | Backlog, Ready, In Progress, In Review, QA, Done |
| Work Type | Single select | Story, Bug, Task, Spike |
| Priority | Single select | P0 Critical, P1 High, P2 Medium, P3 Low |
| Story Points | Number | 1, 2, 3, 5, 8, 13 |
| Sprint | Iteration | Two-week iterations; set dates to the actual cadence |
| Chapter | Single select | Chapters 1–5, Cross-chapter / Platform |
| Agent Role | Single select | Innovation Director, Product Analyst, Technical Architect, Developer, QA / Player, Orchestration |
| QA Result | Single select | Not Tested, Passed, Failed, Blocked |

Do not estimate work in hours and story points simultaneously. A spike must produce a decision or evidence.

## Repository labels

Create these labels in Settings → Labels. The GitHub connection available for this setup can create issues but does not expose label creation:
- type: story
- type: bug
- type: task
- type: spike
- priority: P0
- priority: P1
- priority: P2
- priority: P3
- area: gameplay
- area: combat
- area: narrative
- area: art-audio
- area: UI-accessibility
- area: performance
- area: platform
- area: production

Issue forms apply the initial type labels. Add priority and area labels during triage.

## Milestones

Create these under Issues → Milestones:
- Chapter 1 — The Whispering Forest
- Chapter 2 — The Forgotten Temple
- Chapter 3 — The River of Ashes
- Chapter 4 — The Demon Citadel
- Chapter 5 — The Final Passage

Milestones represent chapter outcomes; use the Project Sprint iteration field for timeboxed work.

## Definition of Ready

An issue is ready for sprint planning only when it has player/business rationale, clear scope, testable acceptance criteria, chapter/area, priority, dependencies and a test/evidence plan. Split work that cannot reasonably finish in one sprint.

## Definition of Done

An issue is Done only when acceptance criteria are met, the linked PR is merged, required CI passes, QA independently verifies the result and records evidence, visual changes are reviewed, and relevant documentation/risks are updated. Record the actual device/browser for device-specific claims. Code generation or green CI alone does not make an issue Done.

## Sprint routine

1. Backlog refinement: Product Analyst clarifies value, scope, priority and acceptance criteria; Architect reviews technical risk.
2. Sprint planning: select Ready items, confirm capacity, set Sprint and Story Points.
3. Daily flow: move items across Status; link PRs with Closes #N only when they truly resolve the issue.
4. Review: demonstrate player-facing work and record QA evidence.
5. Retrospective: capture one process improvement as an issue.

Start with a small, finishable Chapter One outcome. Do not create speculative stories for all five chapters before validating the vertical slice.

## Automation and permissions

The six roles are prompts coordinated by scheduled automation, not independent always-on workers. Agents may propose issues and PRs but must not bypass review or required CI. Keep main protected. Human review remains required for major scope, art direction, paid services, monetization, privacy and public release.
