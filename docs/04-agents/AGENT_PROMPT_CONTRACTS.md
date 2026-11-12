# Agent Prompt Contracts and Output Schemas

## Common contract

All nine roles must inspect current repository state and relevant docs before acting. They must distinguish facts, assumptions and recommendations; cite external research when used; avoid fabricating test results; preserve user-approved direction; and report blockers early. These are coordinated role prompts, not nine always-on workers. A role may only claim work it actually performed.

## Innovation Director output
- Opportunity and player problem
- Evidence and source links (or explicit hypothesis)
- Player value and differentiation
- Implementation options and rough effort
- Technical, cultural, licence and commercial risks
- Recommended experiment and success signal

## Product Analyst output
- User story and persona/context
- Problem and desired outcome
- Priority and rationale
- Acceptance criteria in observable Given/When/Then form
- Non-goals, dependencies and edge cases
- Open decisions and owner

## Principal Game Designer output
- Player problem and intended experience
- Movement/combat/encounter/progression rules affected
- State transitions, tuning values and edge cases
- Difficulty/readability/accessibility considerations
- Observable acceptance criteria
- Playtest questions and success signals

## 2D Animation & Technical Art Specialist output
- Asset and animation-state inventory
- Sprite/atlas dimensions, pivots, frame timing and export/import requirements
- Visual consistency/readability review
- Hitbox/layering/texture-budget implications
- Provenance/licence status
- Screenshot or runtime evidence and outstanding human art approval

## Level Design & Player Experience Specialist output
- Critical path and optional routes
- Landmark, clue, affordance and navigation rules
- Encounter/puzzle/traversal sequence
- Checkpoint, respawn, reward and softlock risks
- Completion criteria and route test cases
- Accessibility and player-readability observations

## Principal Architect output
- Current-state inspection
- Proposed boundaries and data flow
- Options and trade-offs
- Performance, browser, security, privacy and cost implications
- ADR requirement
- Migration/rollback and verification plan

## Developer output
- Files changed and implementation summary
- Tests added/changed
- Commands actually executed and exact result
- Known limitations and manual verification steps
- No direct main push; no placeholder presented as final art

## QA / Player output
- Build/commit/browser/device under test
- Test cases and reproducible steps
- Pass/fail/blocked/not-run status
- Evidence: logs, screenshots, traces or measurements
- Severity and user impact
- Human-only checks still pending

## Orchestration output
- Cycle ID/time and selected task
- Specialist roles actually engaged and their decisions
- Handoffs and unresolved disagreements
- Branch/PR/CI/deployment state
- Approval requirements and blockers
- Next recommended action

## Status vocabulary

**Implemented** means code/assets are integrated. **Automated-tested** means a named automated test passed on a named commit. **Device-tested** means a real device/browser was used. **Human-playtested** means a person played the flow. **Art-approved** means a human reviewed actual integrated assets. **Release-ready** requires all defined release gates. Do not collapse these into a generic “done”.
