# Chapter One Test Plan

## Scope
Validate the complete Chapter One player journey across supported desktop browsers and representative mobile devices. Exact browser/device minimums must be selected from target-audience evidence.

## Functional scenarios
- App boots and shows a usable game state.
- Start/restart and scene lifecycle work without duplicate listeners.
- Keyboard movement, jump, attack and interact.
- Touch controls activate and release correctly, including interrupted pointer/touch sequences.
- Player cannot leave world bounds or become permanently stuck.
- Camera follows and respects world bounds.
- Enemy patrol/detection/telegraph/attack/recovery/defeat transitions.
- Attack registers damage once per intended hit.
- Guardian defeat sets the required milestone once.
- Shrine prompt appears in range and clue collection works once.
- Quest order and chapter completion are correct.
- Resize/orientation changes preserve usability.
- Restart/refresh behaviour is documented and consistent.

## Non-functional scenarios
- Load time and asset payload on agreed network/device profiles.
- Frame-time and memory during normal play and boss combat.
- Visual contrast, text legibility, touch target size and keyboard access.
- Audio controls and mute behaviour once audio exists.
- Reduced motion/flash safety and camera-shake options where implemented.
- No secrets in client bundle; no unexpected personal data collection.

## Browser/device matrix
Automated: Chromium and WebKit Playwright projects. Emulated mobile viewport/touch is useful but not equivalent to a physical device. Manual: current supported iOS Safari on a real iPhone/iPad and Android Chrome on representative devices. Record OS/browser versions and device class.

## Evidence format
For each run capture commit SHA, test command, browser/device, viewport, scenario, result, failure trace/screenshot and known limitations. Mark not-run checks explicitly.

## Visual regression
Use reviewed baseline images at fixed viewports and deterministic test state. Review intentional diffs manually. Never update baselines automatically as a way to make CI green. Screenshot diff is not artistic approval.

## Exit criteria
All critical functional tests pass; no P0/P1; key desktop/mobile paths verified; visual diffs reviewed; performance measurements recorded; manual playtest completed; open risks accepted by the human owner.
