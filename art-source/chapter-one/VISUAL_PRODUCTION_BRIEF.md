# Chapter One — Visual Production Brief

**Status:** Art production specification; no production art is claimed complete by this document.  
**Scene:** `VillageFestivalScene`  
**Visual target:** A hand-painted, cinematic 2D side-scroller with a warm harvest-festival atmosphere.  
**Runtime:** Phaser 3 / TypeScript. The game remains 2D; existing OBJ files are reference material only.

## 1. Art direction

Veyra should feel lived-in, welcoming and calm before the story's later danger. Use a painterly storybook treatment: confident silhouettes, soft textured shading, restrained linework and readable shapes at gameplay scale. Avoid photorealism, glossy 3D rendering, chibi proportions, excessive ornament and visual noise.

### Palette

| Role | Suggested colour | Use |
|---|---|---|
| Warm light | `#F4C982` | late-afternoon sun, lantern glow |
| Terracotta | `#A95F49` | roofs, pottery, festival cloth |
| Harvest gold | `#D9A64F` | grain, ribbons, trim |
| Leaf green | `#657D58` | trees, foliage, garments |
| River teal | `#4D8790` | water and distant atmosphere |
| Deep dusk | `#263D3B` | silhouettes, readable contrast |

Keep interactive characters and prompts distinct from the background. Do not use the palette as a substitute for contrast checks.

## 2. Required environment assets

Create the environment as separate transparent PNG layers so the scene can use parallax and controlled depth.

| Asset | Canvas / export | Requirements |
|---|---|---|
| Sky and distant hills | 2400×720, PNG | late-afternoon gradient, soft hills, no text |
| River and far bank | 2400×720, transparent PNG | broad calm river, far-bank vegetation; align to level horizon |
| Village silhouette | 2400×720, transparent PNG | varied Kerala-inspired rural timber, clay and thatch forms; no modern buildings |
| Festival foreground | 2400×720, transparent PNG | stalls, harvest baskets, pottery and lanterns; leave the gameplay lane clear |
| Dais | sprite / atlas element | modest raised platform, readable at 1× scale |
| Lantern string | atlas element | isolated lanterns and rope; support repeated placement |
| Festival props | atlas | pots, grain baskets, folded cloth, ribbons, wooden stand, boundary marker |

Do not depict a real historical site or claim the fictional village Veyra is a real location. Architectural inspiration should remain broad and respectful rather than presenting invented details as historical fact.

## 3. Character sprite requirements

All characters are side-view 2D game sprites with transparent backgrounds. Keep a consistent head-to-body ratio, ground contact, lighting direction and outline treatment. Export individual PNGs and a Phaser-compatible atlas JSON.

| Character | Required poses | Visual identity |
|---|---|---|
| Adivansh | idle, run (4–6 frames), jump, land | approachable young royal; practical festival clothing, muted green and rust accents; no combat pose in Chapter One |
| Meera Devi | idle, speaking, attentive | confident, self-possessed leader; elegant practical sari; active posture, not a passive/ornamental pose |
| Dev | idle, working, grateful | potter; earthy work clothes, practical build |
| Tara and Kavi | idle, excited, cheering | two visually distinct children; bright festival accents |
| Ila | idle, speaking | mature harvest keeper; warm, grounded presence |
| Messenger | ride-in/arrival, standing, speaking | travel-worn, professional and concerned; no threatening/hostile pose |

### Sprite technical rules

- Reference character cell: 128×160 px; transparent RGBA PNG.
- Keep feet on a common baseline; avoid per-frame character scale drift.
- Use a consistent light source from upper-left.
- No baked-in name labels, dialogue, UI, shadows that should be dynamic, or background scenery.
- Keep animation loops seamless and avoid one-frame visual pops.
- Provide a contact sheet for visual review plus individual source frames.
- Preserve clean alpha edges; no white/black matte fringe.

## 4. Prop atlas

Create a transparent atlas containing:
- pottery lantern stand (including a separate repair/steady interaction state),
- three low ribbon hurdles with clear numbered variants,
- harvest baskets and grain sheaves,
- festival bunting and lanterns,
- small stall details,
- southern boundary marker (turned-inward state for the cliffhanger),
- interaction sparkle / gentle success effect.

Props must not obscure the player, NPC silhouettes, objective text or jump lane. Decorative assets must not create physics collisions. Collision geometry remains code-authored and independent from art.

## 5. Scene composition and camera

- Preserve the current 2400×720 world and horizontal critical path unless implementation testing justifies a documented change.
- Maintain a clear player lane around the ground plane.
- Keep NPC interaction silhouettes readable against their local backgrounds.
- Keep the dais recognizable from a distance.
- Reserve a low-detail, low-contrast area behind dialogue and objective UI.
- Parallax should be subtle; never make the player appear to slide relative to the ground.
- Avoid placing high-contrast lanterns or bunting directly behind character heads.

## 6. Integration plan

1. Add source art under `art-source/chapter-one/` and runtime exports under `public/assets/chapter-one/`.
2. Use a single atlas for reusable props and separate character atlases where animation frame counts differ.
3. Add a typed asset manifest; do not scatter asset path strings throughout the scene.
4. Load assets in the scene preload lifecycle and retain a documented fallback for missing art during development.
5. Replace procedural drawing in small, reviewable slices: environment layers first, then Adivansh, NPCs, props and effects.
6. Keep physics bodies and interaction coordinates independent from sprite dimensions.
7. Preserve the existing `?forest` prototype and avoid changing the Phaser architecture.

## 7. QA acceptance checklist

### Visual
- [ ] All exported images have correct dimensions, transparent backgrounds where required and no unintended clipping.
- [ ] Character scale, baseline, lighting and outline treatment are consistent.
- [ ] Meera reads as a decisive leader; Adivansh remains approachable.
- [ ] Background contrast keeps every character and interaction prompt readable.
- [ ] The festival lane, ribbon hurdles and dais remain visually distinguishable at 100% and 50% scale.

### Runtime
- [ ] All assets load without 404s or console errors.
- [ ] Atlas frame names match the typed manifest.
- [ ] Idle/run/jump/land transitions do not flicker or shift the collision body.
- [ ] Camera follow and parallax do not cause ground drift.
- [ ] UI remains readable at 390px mobile width and desktop width.
- [ ] Touch and keyboard movement, jump and interaction remain functional.
- [ ] The player can still complete all three ribbon jumps and interact with every required NPC.
- [ ] `?forest` continues to load the preserved prototype.

### Delivery evidence
- [ ] Attach an in-game screenshot at the festival entrance and at the dais.
- [ ] Attach a character/prop contact sheet.
- [ ] Record automated unit, browser E2E and production-build results.
- [ ] Record real-device checks separately; browser mobile emulation is not a substitute for iOS/Android device testing.

## 8. Out of scope for this pass

No combat animations, village destruction, abduction imagery, Chapter Two assets, 3D runtime migration, rigged 3D characters or final cinematic sequences. The Chapter One cliffhanger remains a restrained warning at dusk.
