# VFX System

Implements the layer model and VFX budget rules in [ENVIRONMENT_AND_VFX_BIBLE.md](../02-world/ENVIRONMENT_AND_VFX_BIBLE.md).
Code: `src/vfx/`. Gameplay code asks for *what happened* (`vfx.hit`, `vfx.land`, `vfx.defeat`); `VfxManager` decides how it looks.

## Quality tiers (`src/vfx/quality.ts`)

| Setting | low | medium | high |
|---|---|---|---|
| Burst particle multiplier | 0.35 | 0.7 | 1.0 |
| Fog layers | 1 | 2 | 2 |
| Light shafts | 0 | 3 | 6 |
| Fireflies / falling leaves | off / off | on / off | on / on |
| Foreground ferns | off | on | on |
| Bloom (WebGL post-FX) | off | off | on |

Auto-selection: weak hardware (≤2 cores or ≤2 GB) → low; touch device, ≤4 cores or ≤4 GB → medium; otherwise high.
Override with `?quality=low|medium|high`. The tier is stored in the Phaser registry as `vfxQuality`.

**Reduced motion** (`prefers-reduced-motion`) is honoured on every tier: no screen shake, hit-stop, slow-motion, zoom punch, camera flash or damage flash; ambient drift is slowed to 25%.

## Gameplay effects

| Effect | Trigger | Duration | Particles (high) | Blend | Mobile fallback | Can obscure hitboxes/prompts? |
|---|---|---|---|---|---|---|
| Blade slash crescent | Player attack | 190 ms | 0 (pooled sprite) | ADD | same | Briefly, small area |
| Hit impact (sparks, flash, ring) | Strike lands | 160–260 ms | 14 | ADD | count × tier scale | No |
| Hit-stop + zoom punch + shake | Strike lands | 55 ms / 140 ms / 110 ms | – | – | off with reduced motion | No |
| Player hurt (red sparks, vignette flash) | Contact damage | 200–420 ms | 12 | ADD / normal | vignette off with reduced motion | No (edge only) |
| Guardian defeat (embers, rings, slow-mo) | Health 0 | 260–1600 ms | 40 + 20 | ADD | count × tier scale | No |
| Guardian threat aura | Chasing the player | while chasing | ~7 live | ADD | same | No |
| Clue reveal (motes, beam, ring) | Clue collected | 600–1300 ms | 60 | ADD | count × tier scale | No |
| Clue beacon | Until collected | looping | ~10 live | ADD | frequency × tier scale | No |
| Jump / land / run dust | Movement | 280–480 ms | 6 / 4–10 / 1 per 150 ms | normal | count × tier scale | No |
| Hero light pool | Always | – | 0 (one sprite) | ADD | same | No |

All bursts reuse pre-created emitters (`explode`) and pooled sprites (`ImagePool`); nothing is allocated per hit.

## Atmosphere layers (`src/vfx/Atmosphere.ts`)

| Depth | Layer | Scroll factor |
|---|---|---|
| -20 | Painted backdrop (SVG) | 1.0 |
| -15 | Far fog band | 0.35 (+ slow drift) |
| -10 | God-ray light shafts | 0.55 |
| 2 | Near fog band | 0.8 (+ drift) |
| 7 | Pollen, fireflies, falling leaves | world / camera-following spawn zone |
| 8–10 | Hero light, guardian glow, characters | 1.0 |
| 18 | Foreground ferns (bottom edge only, below ground line) | 1.2 |
| 40 | Screen vignette | 0 (screen space) |

Foreground layers sit below the walking surface so they never cover the hero, enemy or prompts.

## Measurement status

Frame time, load time and texture memory have **not** been measured on representative hardware. Only a software-rendered (SwiftShader) headless Chromium was available, which is not a valid performance benchmark. The `high` tier uses bloom, a full-screen post effect; measure it on a mid-range phone before enabling it by default on mobile (it is currently only auto-selected on capable non-touch devices).
