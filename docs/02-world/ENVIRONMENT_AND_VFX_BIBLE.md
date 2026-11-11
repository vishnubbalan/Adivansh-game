# Environment, Lighting and VFX Bible

## Visual target
A richly illustrated 2D world with a strong playable midground, painted depth layers, purposeful light and atmospheric effects. Visual spectacle must not compromise combat or platform readability.

## Layer model
1. Distant backdrop: sky, mountain silhouettes and broad atmospheric gradients.
2. Far environment: architecture, forest masses and waterfalls.
3. Midground: playable terrain, doors, platforms, enemies and interactables.
4. Near foreground: controlled framing elements that never hide critical gameplay.
5. Atmosphere: fog, rain, leaves, dust, fireflies and light shafts.
6. Gameplay VFX: attacks, impacts, pickups, boss telegraphs and quest reveals.
7. UI: objective, health, prompts and menus.

Each layer needs documented depth/parallax factor, scroll behaviour, resolution and asset owner. Gameplay-critical objects must remain in a layer that supports reliable collision and interaction.

## Lighting language
Use warm gold for discovery/hope, cool teal/blue for mystery, ember tones for immediate danger and neutral daylight for safe orientation. These are guidance, not colour-only communication; pair effects with shape, animation and sound. Keep the hero readable against every background.

## Region treatments
- Whispering Forest: monsoon greens, wet stone, giant roots, waterfall mist, fireflies and broken road markers.
- Forgotten Temple: stepped courtyards, water channels, carved stone, controlled shafts of light and shadow mechanisms.
- River of Ashes: dark rock, turbulent water, suspended crossings, ash particles and distant mountain depth.
- Demon Citadel: basalt, bronze machinery, defensive terraces, smoke and strong directional silhouettes.
- Final Passage: celestial architecture and converging regional materials; avoid visual clutter at the climax.

## VFX budget
Every effect must specify trigger, duration, screen coverage, blend mode, particle count/rate, resolution, mobile fallback and whether it can obscure hitboxes or prompts. Use pooling for frequent effects. Avoid full-screen expensive filters on low-end devices.

## Camera and composition
Use a 16:9 composition as a concept baseline, then define safe areas and crop rules for narrow mobile viewports. Reserve readable negative space for HUD and objectives. Do not bake text/UI into background art.

## Asset handoff
Deliver layered source, exported runtime files, naming convention, dimensions, pivot/origin, colour profile, atlas metadata, animation frame rate, licence/provenance record and a preview at actual gameplay scale. Concept images must be labelled concept; only integrated assets may be represented as game screenshots.
