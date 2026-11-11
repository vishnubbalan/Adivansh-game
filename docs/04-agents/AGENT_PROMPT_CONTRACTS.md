# Agent Prompt Contracts and Output Schemas

## Common contract
All six roles must inspect current repository state and relevant docs before acting. They must distinguish facts, assumptions and recommendations; cite external research when used; avoid fabricating test results; preserve user-approved direction; and report blockers early.

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
- Role decisions and handoffs
- Branch/PR/CI/deployment state
- Approval requirements and blockers
- Next recommended action

## Status vocabulary
**Implemented** means code/assets are integrated. **Automated-tested** means a named automated test passed on a named commit. **Device-tested** means a real device/browser was used. **Human-playtested** means a person played the flow. **Art-approved** means a human reviewed actual integrated assets. **Release-ready** requires all defined release gates. Do not collapse these into a generic “done”.
