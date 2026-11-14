# Adivansh — Season Release Roadmap

> Four major releases corresponding to the four seasons. Each release is a complete, shippable product.
> No release happens without human approval and passing exit gates.

---

## Release Philosophy

Each release ships 25 complete chapters. A release is not a demo, not a beta, not "early access" — it is a finished product for that season that players can purchase or play through start-to-finish and feel satisfied. The next season is a sequel, not content that should have been in the base game.

This structure serves commercial viability: R1 ships when it is ready, generates revenue, and funds R2 development. R4 completes the story. Players who buy R1 must feel they received a complete, satisfying experience even if they never buy R2.

---

## R1 — Season 1: The Whispering Forest

**Chapters:** 1–25  
**Core story:** Queen is taken; hero sets out through the forest, earns a companion, defeats the Forest Sentinel, and proves the trail leads into the mountains.  
**Player commitment:** 8–12 hours (first playthrough), 4–6 hours (replay/speed)  
**Replayability:** chapter select after completion, challenge modes, optional secrets

### Gameplay systems required at R1 ship
- Core 2D movement: run, jump, double-jump, wall-slide
- Combat: attack combo (3 hits), dodge roll, block/parry, special ability (1)
- Enemy AI: 5–6 enemy types (forest predators, spirit creatures, Mahaksha's vanguard)
- Boss system: health bar, phase change, telegraph patterns, defeat animation
- Companion: Vahana with 2 abilities (scout, distraction)
- Traversal: rope/vine swing, ledge grab, environmental interaction
- Puzzle: mechanism puzzle (lever, weight, light/shadow), environmental hazard
- Story delivery: opening cinematic, 4 vision sequences, NPC dialogue, closing cinematic
- Progression: health upgrades (3), ability upgrades (2), new equipment (1)
- HUD: health, objective, clue count, minimap (chapter scope)
- Save/checkpoint: auto-save at chapter start, manual checkpoint mid-chapter
- Accessibility: keyboard/touch parity, font size, reduced motion, audio settings

### VFX systems required at R1 ship
- Forest particle system: falling leaves, fireflies, pollen, rain, mist
- Combat VFX: slash trails, hit sparks, blood moon aura, defeat burst
- God ray light shafts through canopy
- Spirit encounter glow effects
- Boss aura: Forest Sentinel threat pulse
- Screen effects: vignette (hurt), fade to black (chapter transition), bloom (optional/high tier)
- Quality tiers: low/medium/high functional for all effects

### Audio required at R1 ship
- Adaptive combat music system (ambient → tense → combat → victory layers)
- Forest ambient soundscape (birds, water, wind, insects)
- Combat SFX: attack impact, dodge, hit received, death
- UI SFX: menu, checkpoint, chapter complete, objective update
- Boss music: Forest Sentinel theme with phase transition
- Opening scene music: emotional orchestral piece

### Art required at R1 ship
- Hero sprite: idle, run, jump, fall, attack (3 poses), dodge, hurt, death
- Companion Vahana: idle, follow, 2 ability animations
- Forest Guardian (boss): idle, telegraph, attack, hurt, defeat
- 5–6 enemy types: full animation sets
- Forest environment: 3 distinct sub-environments (forest entrance, deep forest, temple)
- Parallax backgrounds: 5-layer depth system
- UI art: HUD, dialogue box, chapter title card, vision sequence frame

### Exit gate for R1
- [ ] All 25 chapters completable start-to-finish without softlock or critical bug
- [ ] Zero P0/P1 defects
- [ ] Smooth 60fps on mid-range Android Chrome (Pixel 5 equivalent or better)
- [ ] iOS Safari tested on iPhone 12 or newer — no crashes
- [ ] All accessibility features functioning
- [ ] Story complete and satisfying as a standalone season
- [ ] Asset provenance and commercial licence review complete
- [ ] Human playtest: 3+ players, Chapter 1 and Chapter 25 at minimum
- [ ] Privacy/security review passed
- [ ] Human director approval

---

## R2 — Season 2: The Shattered Peaks

**Chapters:** 26–50  
**Prerequisite:** R1 shipped and player feedback collected  
**Core story:** Hero traverses the mountains, earns mountain clans as allies, faces a betrayal, and defeats the Mountain Titan to reach the ocean.  
**Player commitment:** 10–14 hours (new content), assumes R1 completion

### Additional gameplay systems required at R2
- Climbing/aerial mechanics: grapple hook or air dash
- Alliance system: faction reputation with Stoneclan
- Elemental interaction: fire/ice puzzle logic
- Weather system: blizzard visibility reduction, ice physics on slopes
- Armoured enemy type: break-armour mechanic
- Dual boss mechanic: simultaneous two-boss encounter
- 8+ new enemy types
- New abilities: 3 additional (player) + 2 Vahana
- Equipment slots: 3 (weapon, armour, accessory)

### Additional VFX required at R2
- Mountain particles: snow, ice crystals, avalanche debris
- Aurora borealis sky shader
- Ice/frost effect on hit: enemy freeze visual
- Lava glow in deep mountain dungeon
- Storm system: blizzard + lightning
- Dual boss combined aura effect

### Additional audio required at R2
- Mountain soundscape: wind, echoing stone, distant avalanche
- New combat music: harder, more percussive for mountain encounters
- Alliance system SFX: faction approval/disapproval cues
- Stoneclan Elder voice (text + audio tone indicators)
- Mountain Titan boss theme

### Exit gate for R2
- Saves correctly from R1 (chapter 25 progress carries forward)
- All 50 chapters completable in sequence
- Mountain traversal mechanics polished to R1 combat feel standard
- Alliance system has visible, meaningful player consequence
- Zero P0/P1 defects
- Real-device QA on iPhone Safari and Android Chrome

---

## R3 — Season 3: The Endless Ocean

**Chapters:** 51–75  
**Prerequisite:** R2 shipped and player feedback collected  
**Core story:** Hero crosses the ocean, finds the bridge, and lands on Ashura's shores.  
**Player commitment:** 10–14 hours new content

### Additional gameplay systems required at R3
- Underwater movement system (buoyancy, breath timer)
- Naval combat mode (ship-to-ship or sea creature combat)
- Bridge construction mechanic (resource gathering → build progress)
- Ocean current traversal
- Stealth foundation system (first deployed at Port of Shadows)
- 10+ new sea creature enemy types
- New abilities: 3 (player) + 2 Vahana
- Leviathan Phase 1 + Phase 2 boss fight (multi-session boss)

### Additional VFX required at R3
- Ocean water surface shader (FFT-based wave simulation)
- Underwater caustics and bioluminescence
- Sea spray and foam at wave impact
- Storm system: lightning, horizontal rain, ocean chop
- Kraken tentacle particle trail
- Bridge construction build progress VFX
- Island mist atmospheric effect (first glimpse of Ashura)

### Additional audio required at R3
- Ocean ambient: waves, undersea ambiance, storm
- Underwater audio filter (muffled/reverb)
- Leviathan/Kraken creature sound design
- Naval battle SFX
- Siren music puzzle: in-game musical mechanic
- Full orchestration milestone: live-recorded (or high-quality MIDI) full orchestra score for key moments

### Exit gate for R3
- Underwater sections tested on real iOS Safari (breathing timer works)
- Naval combat mode QA'd on mobile aspect ratio
- Bridge construction state saves/loads correctly
- All 75 chapters completable
- Ocean water shader performs at target FPS on mid-range mobile

---

## R4 — Season 4: The Isle of Ashura

**Chapters:** 76–100  
**Prerequisite:** R3 shipped and player feedback collected  
**Core story:** Hero infiltrates Ashura, rescues Meera Devi, confronts Mahaksha, and closes the narrative arc.  
**Player commitment:** 12–16 hours new content; total series 40–55 hours

### Additional gameplay systems required at R4
- Full stealth system: crouch, sight cones, alert states, cover
- Dark magic combat abilities (3+)
- Multi-phase final boss: Mahaksha Phase 1 (normal) + Phase 2 (unleashed) + Phase 3 (true form)
- Realm restoration mechanic: post-boss, the realm visually heals
- Infiltration mechanics: disguise, distraction, timing windows
- New abilities: 4 (player) + 3 Vahana (Season 4 scope)
- Meera Devi playable section (brief, in final chapters)
- Full ending: 2 epilogue scenes, credits, chapter select unlocked for entire game

### Additional VFX required at R4
- Dark corruption spread shader
- Lava/volcanic environment effects
- Mahaksha aura progression: Phase 1 (ember), Phase 2 (black fire), Phase 3 (celestial dark)
- Realm restoration: corruption recedes visually, colour palette shifts
- Final boss shockwave and energy effects
- Ending sequence: light restoration VFX

### Additional audio required at R4
- Ashura city soundscape: dark, grand, menacing
- Stealth tense music stems (additional combat layers)
- Mahaksha's theme: 3-phase boss music (each phase has distinct arrangement)
- Meera Devi's theme: played during reunion and epilogue
- Final battle orchestral climax
- Ending sequence music: earned, hopeful, full orchestration

### Exit gate for R4
- All 100 chapters completable
- Final boss all phases pass QA on desktop and mobile
- Ending is satisfying as a narrative conclusion (human player review required)
- Full game playthrough from Chapter 1 to 100 tested end-to-end
- Performance maintained through VFX-heavy final boss
- Complete asset, licence and provenance review for the full title
- Human director final approval before commercial release announcement

---

## Production Timeline (Target, Not Guaranteed)

| Release | Target | Key Dependency |
|---|---|---|
| R1 — Forest | When Chapter One vertical slice exits QA | Current active milestone |
| R2 — Mountains | 6–9 months after R1 ship | Player feedback, R1 revenue |
| R3 — Ocean | 6–9 months after R2 ship | Water rendering spike, R2 performance |
| R4 — Island | 9–12 months after R3 ship | Full stealth system, final boss design |

**Total production target:** 24–36 months from R1 ship to full 100-chapter completion.

Timelines are guidance, not deadlines. No release ships before its exit gate is passed. No timeline creates pressure to ship with P0/P1 defects or unreviewed art direction.

---

## Agent Team Season Focus

Each season has a designated agent cycle focus:

- **Active (current):** Season 1 — completing the Chapter One vertical slice (issues #10–#14)
- **Planning phase:** Season 2 — architecture spikes for climbing mechanics and weather system
- **Not started:** Season 3, Season 4

The agent team does not begin Season 2 implementation until Season 1 ships. Season 2 planning documents may be drafted while Season 1 is in QA.
