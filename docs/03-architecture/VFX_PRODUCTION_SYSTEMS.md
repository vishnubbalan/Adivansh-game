# VFX Production Systems Roadmap

> Technical director document. Maps every VFX system required across all 4 seasons against implementation priority.
> The existing VfxManager in `src/vfx/` is the foundation. Everything here extends it.

---

## Competitive Quality Bar

Modern 2D games that this title competes with use the following VFX systems:

| Reference | Key VFX signature |
|---|---|
| Hollow Knight | Constant ambient particles, screen-space hit impact, boss aura systems, death burst |
| Ori and the Blind Forest | Spirit light trails, dynamic bloom, bioluminescence, screen colour grading per zone |
| Hades | Combat impact trails, screen shake variation, enemy telegraph auras, rapid screen VFX |
| Dead Cells | Motion blur on attacks, procedural hit sparks, death scatter, environmental glow |

Our target: **visually matches Hollow Knight at minimum** for R1, trending toward Ori-level environmental spectacle for R3–R4.

---

## VFX Architecture Principles

**All VFX go through VfxManager** (`src/vfx/VfxManager.ts`). Gameplay code emits semantic events (`vfx.hit`, `vfx.land`, `vfx.boss.phase2`). VfxManager decides the visual output. This keeps effects testable, replaceable, and quality-tier controlled.

**Three VFX domains:**

1. **Gameplay VFX** — combat, traversal, interaction effects. Must never obscure hitboxes or objectives. Pool-managed for performance.
2. **Environmental VFX** — ambient particles, weather, atmospheric layers. Quality-tier gated. Must maintain 60fps on mobile.
3. **Cinematic VFX** — boss introductions, vision sequences, chapter transitions. Full quality always, brief duration.

---

## Season 1 VFX Priority (Build First)

These are required before R1 ships.

### 1.1 — Attack Trail System
**What:** Motion trail behind player weapon during attack swing  
**Reference:** Hollow Knight's nail swing blur  
**Implementation:** `Phaser.GameObjects.Image` pool with decreasing alpha over 150ms, positioned at weapon arc  
**Quality tiers:** Low = 2 trail sprites; Medium = 4; High = 6 + motion blur shader  
**Files:** `src/vfx/VfxManager.ts` (extend `attackSlash()`), `src/vfx/shaders/motionBlur.glsl` (high tier only)  
**Test:** Visual regression test captures trail at frame 2, 5, 10 of attack animation

### 1.2 — Enhanced Hit Impact System
**What:** When an attack lands: screen shake variation, particle burst, impact ring, hit-stop  
**Current state:** Hit sparks exist. Needs enhancement: directional shake, ring pulse, hit-stop curve variation  
**Enhancements needed:**
- Directional shake: shake offset matches attack direction, not random
- Impact ring: single ring expanding outward from hit point, 120ms, ADD blend
- Hit-stop variation: 55ms base, scales with damage (heavy hit = 90ms)
- Hit flash: enemy sprite white-flash on hit (1 frame)  
**Quality tiers:** Low = shake off (reduced motion), no ring; Medium = shake + ring; High = all + chromatic aberration flash  
**Files:** `src/vfx/VfxManager.ts`, `src/entities/Guardian.ts` (white flash)

### 1.3 — Forest Particle System
**What:** Ambient environment particles specific to forest biome  
**Particles to implement:**
- **Falling leaves:** slow drift, rotation, random size variation, wind reactive (lean with player movement direction), pool of 30 max
- **Fireflies:** gentle bob, soft yellow-green glow, appear only in deep forest chapters, pool of 15 max
- **Pollen motes:** very slow upward drift, faint, pool of 20 max  
- **Mist wisps:** horizontal slow drift, low alpha, ground level only
- **Rain:** angled line particles during storm chapters, pool of 60 max  
**Quality tiers:** Low = mist only; Medium = mist + pollen; High = all particles  
**Files:** `src/vfx/Atmosphere.ts` (extend existing), `src/vfx/ForestParticles.ts` (new)

### 1.4 — God Ray System (Enhanced)
**What:** Dynamic light shafts through canopy breaks  
**Current state:** Static god rays in Atmosphere.ts (3–6 based on quality tier)  
**Enhancements needed:**
- Slow animated drift (sway 2–3 degrees over 8-second cycle)
- Intensity variation: brighter when hero approaches, dimmer in deep forest chapters
- Particle motes in shaft: visible dust particles only within ray bounds  
**Quality tiers:** Low = 0 rays; Medium = 2 static; High = 4 animated + motes  
**Files:** `src/vfx/Atmosphere.ts`

### 1.5 — Boss Aura Systems (Season 1 Bosses)
**What:** Unique visual signature per boss that communicates its state  
**Corrupted Treant aura:** pulsing dark green corruption cloud, expands in Phase 2  
**Forest Guardian aura:** golden shimmer when calm, red-black when active, corrupted-purple when at 40% HP  
**Forest Sentinel aura:** golden light emanation that shifts to dark-gold in Phase 2, then pure white-gold in Phase 3  
**Implementation:** Per-boss `AuraEmitter` class extending `Phaser.GameObjects.Particles.ParticleEmitter`  
**Files:** `src/vfx/boss/TreentAura.ts`, `src/vfx/boss/GuardianAura.ts`, `src/vfx/boss/SentinelAura.ts`

### 1.6 — Screen Post-Processing (High Tier)
**What:** Full-screen WebGL effects for mood and feedback  
**Effects needed for R1:**
- **Bloom:** existing in VFX config, needs tuning — forest should have subtle warm bloom
- **Vignette:** existing, needs soft edge variation (tighter during combat, looser in exploration)
- **Blood Moon filter:** red tint + increased contrast overlay, Chapter 10 only
- **Corruption spread:** dark edges encroaching, used during corruption encounters  
**Low/Medium fallback:** No WebGL post-FX; colour tints via Phaser camera effects  
**Files:** `src/vfx/PostProcessing.ts` (new), extend `src/vfx/quality.ts`

### 1.7 — Chapter Transition System
**What:** Transition effects between chapters and seasons  
**Types needed:**
- **Chapter start:** fade from black + chapter title card (animated in)
- **Chapter complete:** subtle bright flash + objective complete particle burst
- **Boss death:** slow-motion death burst (existing) + screen hold + fade
- **Season end:** cinematic fade with season-specific colour overlay  
**Files:** `src/vfx/Transitions.ts` (new)

### 1.8 — Vision Sequence VFX
**What:** Visual treatment for the 4 Meera Devi vision sequences  
**Style:** Soft focus, golden-tinted, slightly desaturated background, subject in full colour, particles of golden light drifting upward  
**Implementation:** Phaser overlay camera with custom tint + fullscreen particle effect  
**Files:** `src/vfx/VisionSequence.ts` (new)

---

## Season 2 VFX (Plan now, implement in R2 development)

### 2.1 — Mountain Particle System
- Snow: angled particles, density increases with altitude
- Ice crystals: angular, glint effect on each crystal as they fall
- Avalanche debris: fast-falling rock chunks, increasing size variation
- Breath condensation: visible breath puffs from hero in cold zones

### 2.2 — Aurora Borealis Sky Shader
- Full sky replacement shader for night chapters in mountains
- Animated flowing bands of teal/purple light
- Quality tier: Medium and High only; Low uses a static tinted backdrop

### 2.3 — Ice/Frost Hit Effect
- Enemy freeze: expanding ice crystal ring from hit point
- Frost accumulation: enemies accumulate frost texture as they take cold damage

### 2.4 — Mountain Storm System
- Extends rain from Forest. Adds: horizontal wind force, lightning flash (screen-wide), thunder shake
- Visibility reduction shader: forward distance blur in blizzard

### 2.5 — Lava Glow (Deep Mountain Dungeon)
- Lava pool: heat shimmer shader above lava surfaces
- Ember particles rising from lava edges
- Orange-red point light emanating from pools

---

## Season 3 VFX (Plan now, implement in R3 development)

### 3.1 — Ocean Water Surface
**High priority, needs performance spike before R3 starts**  
- FFT-based wave simulation in WebGL shader (or simplified Gerstner waves if FFT too expensive on mobile)
- Foam at wave crests
- Specular highlights
- Mobile fallback: simple sine wave animation with pre-baked normal map

### 3.2 — Underwater System
- Blue-green colour grade (camera overlay)
- Caustic light patterns on underwater surfaces (animated texture)
- Bubble particles rising
- Bioluminescent creature glow (ADD blend point lights)
- Surface ripple visible from below

### 3.3 — Storm at Sea
- Extends mountain storm. Adds: ocean spray (horizontal particle bursts at wave peaks), lightning strikes on water (brief white flash), screen roll effect

### 3.4 — Bridge Construction VFX
- Stone/material placement particles
- Blue energy lines connecting anchor points
- Completed section: solid glow then fade to normal

---

## Season 4 VFX (Plan now, implement in R4 development)

### 4.1 — Dark Corruption Shader
- Spreading corruption overlay: dark tendrils creeping from edges
- Corruption on enemies: texture overlay, red-black aura

### 4.2 — Mahaksha Aura System
- Phase 1: ember and black smoke (normal demon king)
- Phase 2: black fire (unleashed — ADD blend, intense)
- Phase 3: celestial dark (deep space texture + gold cracks, most expensive effect in the game)

### 4.3 — Realm Restoration Effect
- Post-boss: corruption retreats in reverse from centre outward
- Colour palette shifts: environment desaturation reverses to full saturation
- Golden light blooms outward from hero
- This is the game's climactic visual moment — it must be spectacular

### 4.4 — Lava/Volcanic Environment
- Lava rivers with flowing shader
- Volcanic ash particle system (heavy, drifting down)
- Heat shimmer above all hot surfaces
- Eruption particles: upward burst of fire and debris

---

## VFX Budget per Scene

| Region | Max particles (High) | Max particles (Low) | Post-FX |
|---|---|---|---|
| Forest exploration | 90 live | 15 live | Bloom + vignette |
| Forest combat | 60 live (from combat) | 20 live | Vignette |
| Forest boss fight | 80 live | 25 live | Chromatic aberration (hit only) |
| Mountain exploration | 70 live | 15 live | Bloom + depth haze |
| Ocean surface | 100 live | 20 live | Water shader |
| Underwater | 60 live | 10 live | Caustic overlay |
| Ashura combat | 90 live | 20 live | Corruption overlay |
| Final boss | 120 live | 30 live | Multiple full-screen |

All budgets subject to real-device measurement before each release. Budgets are maxima, not targets.

---

## Implementation Order

**R1 — Must ship with:**
1.1 Attack Trail System  
1.2 Enhanced Hit Impact  
1.3 Forest Particle System  
1.4 God Ray Enhanced  
1.5 Boss Aura Systems (S1 bosses)  
1.6 Post-Processing (High tier)  
1.7 Chapter Transition System  
1.8 Vision Sequence VFX  

**R2 — Must ship with:**  
2.1–2.5 Mountain VFX suite  

**R3 — Must ship with (requires spike first):**  
3.1 Ocean Water Surface (spike in R2 dev cycle)  
3.2 Underwater System  
3.3 Storm at Sea  
3.4 Bridge Construction VFX  

**R4 — Must ship with:**  
4.1–4.4 Ashura VFX suite  

---

## Performance Gates

Before any VFX system ships it must pass:
- [ ] 60fps maintained on Chrome mid-range Android (Pixel 5 equivalent) with this system active at Medium tier
- [ ] No hitbox or prompt obscured by any VFX effect
- [ ] Reduced motion compliance: all screen shake, hit-stop and flash effects off
- [ ] Pool allocation: zero per-frame allocations in hot path (all effects use pre-created emitters)
- [ ] Load time impact: new shaders/textures within 200ms budget increase
