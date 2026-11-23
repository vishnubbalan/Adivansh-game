# Adivansh — Quality Engineering and Player QA Strategy

## Objectives
Protect core gameplay, compatibility, visual consistency, performance, accessibility, security and player trust. Automated tests and human playtesting complement each other.

## Test layers
- **Unit:** combat calculations, state transitions, quest flags, inventory and save schemas.
- **Integration:** scene lifecycle, player/enemy interactions, pickups, checkpoints, settings and persistence.
- **E2E:** start, move, jump, attack, interact, collect clue and complete Chapter One.
- **Visual regression:** reviewed screenshots of deterministic scenes (fixed seed, camera and time-of-day) per quality tier; never auto-update baselines to hide failures.
- **Compatibility:** Chromium on WebGPU and WebGL2 backends in CI; real Windows machines (minimum: Intel HD 620-class; recommended: GTX 1660-class) before each milestone; keyboard/mouse and gamepad.
- **Replay/determinism:** recorded input replays assert identical end state on Windows and Linux CI.
- **Story:** `story-lint` and `story-coverage` (no dead ends, all beats reachable).
- **Performance:** initial load, transitions, frame-time, memory, texture/audio payload and input latency.
- **Accessibility:** contrast, text, target size, keyboard support, pause, audio and reduced-motion considerations.
- **Human playtest:** onboarding, enjoyment, fairness, confusion, pacing and completion.

## Severity
- **P0:** security/privacy breach, data loss, unusable game or severe crash; block release.
- **P1:** critical path/progression or major device/browser failure; block release.
- **P2:** material defect with workaround; fix or explicitly accept before release.
- **P3:** minor polish issue; backlog unless accessibility/comprehension is affected.

## Browser/input checks
Desktop Chromium (WebGPU and WebGL2 forced), the Tauri desktop build on Windows, and a real gamepad. Verify keyboard/gamepad parity, rebinding, focus, pointer-lock release on pause and device hot-plug. Mobile/touch is out of scope (ADR-008).

## Visual approval
Screenshot diffs detect changes, not artistic quality. Human review must assess art direction, readability, composition and cultural coherence. Concept art is not proof of integrated game quality.

## Performance evidence
Record device/browser, commit, viewport, scenario and actual measurements. Do not claim frame-rate or memory budgets pass without measurement. Profile the minimum and recommended tiers with the perf-harness fly-through; capture GPU ms, CPU ms, p95/p99 frame time, VRAM and load/stream hitches.

## Release candidate
Acceptance criteria met; unit/build/E2E pass; no P0/P1; art/audio rights reviewed; performance/accessibility evidence recorded; real-device testing and human playtest complete; privacy/security review complete; commit, artifact and rollback identifiable.
