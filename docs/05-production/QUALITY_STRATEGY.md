# Adivansh — Quality Engineering and Player QA Strategy

## Objectives
Protect core gameplay, compatibility, visual consistency, performance, accessibility, security and player trust. Automated tests and human playtesting complement each other.

## Test layers
- **Unit:** combat calculations, state transitions, quest flags, inventory and save schemas.
- **Integration:** scene lifecycle, player/enemy interactions, pickups, checkpoints, settings and persistence.
- **E2E:** start, move, jump, attack, interact, collect clue and complete Chapter One.
- **Visual regression:** reviewed screenshots at agreed desktop/mobile viewports; never auto-update baselines to hide failures.
- **Compatibility:** Playwright Chromium/WebKit plus real iOS Safari and representative Android devices.
- **Performance:** initial load, transitions, frame-time, memory, texture/audio payload and input latency.
- **Accessibility:** contrast, text, target size, keyboard support, pause, audio and reduced-motion considerations.
- **Human playtest:** onboarding, enjoyment, fairness, confusion, pacing and completion.

## Severity
- **P0:** security/privacy breach, data loss, unusable game or severe crash; block release.
- **P1:** critical path/progression or major device/browser failure; block release.
- **P2:** material defect with workaround; fix or explicitly accept before release.
- **P3:** minor polish issue; backlog unless accessibility/comprehension is affected.

## Browser/input checks
Desktop Chromium and WebKit; mobile viewport/touch emulation; real iOS Safari for OS/browser behaviours automation cannot model. Verify keyboard/touch parity, pointer cancellation, focus, context menus and gestures. Touch controls should be at least 44x44 CSS pixels and have accessible names.

## Visual approval
Screenshot diffs detect changes, not artistic quality. Human review must assess art direction, readability, composition and cultural coherence. Concept art is not proof of integrated game quality.

## Performance evidence
Record device/browser, commit, viewport, scenario and actual measurements. Do not claim frame-rate or memory budgets pass without measurement. Profile low/mid-range hardware.

## Release candidate
Acceptance criteria met; unit/build/E2E pass; no P0/P1; art/audio rights reviewed; performance/accessibility evidence recorded; real-device testing and human playtest complete; privacy/security review complete; commit, artifact and rollback identifiable.
