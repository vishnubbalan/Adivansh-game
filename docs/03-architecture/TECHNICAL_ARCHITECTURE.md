# Adivansh — Technical Architecture (3D, Desktop-First)

> **Status: design only. Nothing in this document is implemented.** On 2026-11-23 the repository was reset: the Phaser 2D prototype and all of its code, tests, CI and assets were deleted (they remain in git history). Every number below is a *target* until the Phase 1 spikes measure it. Decisions are recorded in [DECISIONS.md](DECISIONS.md) (ADR-006 to ADR-011).

## 1. Product constraints that drive the architecture

| Constraint | Source | Consequence |
|---|---|---|
| Real 3D, "movie-like" look, very human characters | Product owner, 2026-11-14 | PBR + cinematic post stack, skinned realistic characters, authored cameras |
| Playable on computers (Windows first; macOS/Linux next) | Product owner, 2026-11-23 | Desktop-first: keyboard/mouse + gamepad, no mobile in scope |
| Most modern 3D technology | Product owner, 2026-11-23 | WebGPU + compute + node-based shaders; modern asset formats (glTF, KTX2, meshopt) |
| Story first | Product owner, 2026-11-23 | Narrative is **data** (authored, validated, testable) before engine work scales |
| Dev machine is an i3 / Intel HD 620 / 8 GB | Memory: dev hardware | Local dev must run on weak GPUs → web stack, quality tiers, no UE5 locally |
| 100 chapters, 4 seasons | Master plan | Content must be data-driven and streamable; engine code must not change per chapter |
| One developer + AI agents | Team model | Prefer mature, well-documented libraries; small surface area; strong automation |

## 2. Technology stack (chosen)

| Layer | Choice | Why | Fallback / exit |
|---|---|---|---|
| Language | **TypeScript** (strict) | Type-safe gameplay data, one language for game + tools | — |
| Renderer | **Three.js `WebGPURenderer`** with **TSL** (Three Shading Language) node materials | WebGPU is the modern path (compute, storage buffers, render bundles); TSL gives one shader source for WebGPU and WebGL2 | Automatic **WebGL2 backend** of the same renderer; Babylon.js is the evaluated alternative (ADR-006) |
| Build | **Vite** + **pnpm** workspaces | Fast HMR, simple, proven | — |
| Physics / collision | **Rapier3D** (WASM) | Kinematic character controller, shape casts, sensors, snapshot/restore, cross-platform determinism build | Jolt (WASM) if Rapier performance fails the spike |
| Game logic | Pure TS "game-core" package, **no rendering imports** | Unit-testable, replayable, engine-portable | — |
| Entities | Lightweight data-oriented ECS (evaluate **bitECS**; fall back to a small in-house one) | Hundreds of NPCs/foliage/VFX entities without per-object overhead | Plain class entities for low-count actors |
| State machines | Small hierarchical FSM library (in-house, ~200 lines) | Player, enemy, boss, dialogue states need guards + timeouts | XState only if tooling value is proven |
| Narrative | **ink** via `inkjs` + schema-validated beat/quest JSON | Industry-standard branching dialogue; web-native runtime | Yarn Spinner |
| Cinematics | In-engine **timeline sequencer** (JSON tracks: camera, animation clips, VO, subtitles, VFX cues) | Movie-like cutscenes rendered live at game quality, localisable | Pre-rendered video only for logos/intros |
| UI | **DOM/CSS overlay** (Preact) for HUD, menus, subtitles; 3D sprites only for world-space markers | Accessible, themable, text-heavy, cheap on GPU | — |
| Audio | **Web Audio API** with an in-house mixer (buses, ducking, adaptive stems, `PannerNode`/HRTF) | Full control for adaptive music (see [AUDIO_SYSTEMS_DESIGN.md](AUDIO_SYSTEMS_DESIGN.md)) | Howler.js for simple cases only |
| Input | Keyboard/mouse (Pointer Lock) + **Gamepad API**, action-map layer with rebinding | Desktop-first, controller-friendly | — |
| Persistence | Versioned save schema; **IndexedDB** (web) / app-data files (desktop) | Offline-first, migratable | Steam Cloud via desktop shell later |
| Desktop shell | **Tauri 2** (system WebView2 on Windows) | ~10 MB shell, Steam-distributable, native file access | Electron if WebView2 WebGPU support is insufficient (spike S6) |
| Asset tooling | **Blender** → glTF 2.0; **glTF-Transform** + `meshoptimizer` + **KTX2/Basis** (`toktx`) in a build CLI | Small, GPU-ready assets with a repeatable pipeline | — |
| Tests | **Vitest** (logic), **Playwright** (smoke + deterministic screenshots), scripted perf harness | See [QUALITY_STRATEGY.md](../05-production/QUALITY_STRATEGY.md) | — |
| CI/CD | GitHub Actions on `ubuntu-24.04` (+ `windows-latest` for desktop builds) | Existing repo workflow, PR-gated | — |

Library versions are **pinned when the scaffold is created**, not here. Latest at time of writing (npm, 2026-11-23): three 0.187.0, vite 8.3.8, typescript 7.0.2, vitest 5.1.1, @playwright/test 1.65.1, inkjs 2.4.0, @tauri-apps/cli 2.12.6, Node 24 LTS. Re-verify before pinning; three.js ships breaking changes between minors, so upgrades are deliberate and PR-gated.

### Why not the alternatives (summary — full reasoning in ADR-006)
- **Unreal Engine 5 (Nanite/Lumen/MetaHuman):** highest visual ceiling, but the dev machine cannot run the editor, and the product owner chose a light, browser-class stack on 2026-11-14. Kept as an *exit path*: story data, glTF assets and `game-core` are engine-neutral by design.
- **Unity / Godot 4:** viable, but neither gives WebGPU-class visuals on the web target nor runs well on an HD 620 editor session; Godot's web export has limits (threads/WebGPU).
- **Babylon.js:** more batteries-included (inspector, node-material editor, Havok). Three.js chosen for ecosystem size, TSL/WebGPU momentum and smaller runtime. Re-evaluate at spike S1 if Three.js tooling friction is high.

## 3. Platform targets

| Tier | Hardware (indicative) | Target | Render tier |
|---|---|---|---|
| **Minimum / dev baseline** | Intel UHD/HD 620, 8 GB RAM, 4-core CPU | 1280×720, **30 fps** stable | `low` |
| **Recommended** | GTX 1660 / RX 580 / Apple M1, 16 GB | 1920×1080, **60 fps** | `medium` |
| **High** | RTX 3060+ / RX 6700+ / M2 Pro+ | 1920×1080–2560×1440, 60 fps+ | `high` |
| **Cinematic** (capture/photo mode) | any | offline-quality frames for trailers | `ultra` |

Operating systems: Windows 10/11 (primary), macOS, Linux (best-effort via Chromium). Browser build for demo/itch.io on Chromium-class browsers with WebGPU or WebGL2; Safari/Firefox are best-effort. **Mobile/touch is out of scope** (supersedes earlier 2D plans). The renderer must start on WebGL2 if WebGPU is unavailable and report the active backend in the debug overlay.

## 4. High-level architecture

```
                        ┌───────────────────────────── content/ (data, no code) ───────────────────────────────┐
                        │ ink scripts · beats/quests JSON · dialogue strings · chapter manifests · tuning JSON │
                        └──────────────┬───────────────────────────────────────────────────────────────────────┘
                                       │ schema-validated at build + load
┌────────────┐   actions   ┌───────────▼───────────┐  typed events  ┌──────────────┐
│ Input layer├────────────►│     game-core (pure)  ├───────────────►│ Presentation │
│ kb/mouse/  │             │ state · combat rules  │                │  renderer    │
│ gamepad    │             │ quests · FSMs · AI    │◄───────────────┤  audio · UI  │
└────────────┘             │ hunger/blessing/save  │  read-only     │  VFX · cams  │
                           └───────────▲───────────┘  view state    └──────┬───────┘
                                       │ fixed 60 Hz step                  │ variable-rate render + interpolation
                           ┌───────────┴───────────┐                       │
                           │ Physics adapter       │                ┌──────▼───────┐
                           │ (Rapier WASM)         │                │ Three.js     │
                           └───────────────────────┘                │ WebGPU/WebGL2│
                                                                    └──────────────┘
```

**Golden rules**
1. `game-core` never imports Three.js, DOM, Web Audio or Rapier. It receives *input actions + elapsed fixed steps* and emits *events*. This keeps it testable, replayable and portable.
2. Presentation (render, audio, VFX, UI) *observes* state and events; it never decides gameplay or quest outcomes.
3. Story/quest truth lives in one canonical store ([NARRATIVE_SYSTEM.md](NARRATIVE_SYSTEM.md)); ink text never mutates flags directly except through declared external functions.
4. Every tunable number is in `content/tuning/*.json` (schema-validated), never inline.
5. Gameplay never creates GPU resources directly; it requests effects by name from the VFX service.

### Game loop
Fixed-timestep simulation at 60 Hz (accumulator, max 5 catch-up steps), rendering at display rate with state interpolation. Order per step: input sample → player/AI FSMs → physics step → combat resolution → quest/story update → events flushed → presentation reads snapshot. A seeded RNG (`mulberry32`-class) is passed in; no `Math.random()` in `game-core`. This enables deterministic **replay tests** (record inputs → assert end state).

## 5. Rendering architecture

### 5.1 Pipeline (high tier; lower tiers drop items in the order listed in §5.4)
1. **Geometry:** glTF meshes, meshopt-compressed; LOD chains (3 levels) and impostors for distant foliage; GPU-instanced vegetation, props and rocks; frustum + (WebGPU) occlusion-assisted culling per chapter cell.
2. **Materials:** PBR (metal-rough) as TSL node materials; trim sheets + tiling detail maps to keep texture memory low; per-region shader libraries (wet stone, mossy bark, lacquered wood, silk, jewellery).
3. **Lighting:** one directional sun/moon with **cascaded shadow maps** (CSM), **baked lightmaps + light probes** for static GI approximation, **IBL** from per-region HDR environment, a capped number of dynamic point/spot lights (oil lamps, torches) with clustered/tiled culling, emissive "fake lights" for the rest. (Real-time GI is **not** a target; baked is cheaper and looks better on weak GPUs.)
4. **Atmosphere:** height + distance **volumetric-style fog** (analytic + 3D noise slice, froxel-lite on high), god-rays (screen-space shafts keyed to the sun), sky/cloud dome, wind-driven vegetation (vertex shader), water (planar/screen-space reflections, foam, caustics — critical for Season 3).
5. **Characters:** skinned meshes, ≤ 60k tris hero / ≤ 30k NPC (high), skin shader with cheap subsurface approximation (wrap lighting + thickness map), hair cards with anisotropic spec + alpha-to-coverage, eye shader (cornea refraction fake, wetness), cloth via authored animation + **secondary-motion bones** (spring chains for scarves, hair, jewellery). Crowds use **vertex-animation-texture** instancing.
6. **Post-processing (WebGPU node pipeline):** GTAO, bloom, filmic tone-mapping (ACES/AgX), colour-grade 3D LUT per region/mood, TAA (with motion vectors) or FXAA on low, cinematic DoF (cutscenes only), subtle film grain/vignette, optional motion blur. All effects individually togglable; reduced-motion disables shake/blur/flash.
7. **GPU particles:** compute-shader simulation on WebGPU (storage buffers); instanced CPU simulation fallback on WebGL2 with lower counts. Ribbon trails for weapon arcs; soft particles via depth.
8. **Cinematic mode:** cutscenes and photo mode raise shadow resolution, LOD bias, enable DoF/ray-marched fog, and use authored camera rigs from the sequencer.

### 5.2 Cameras
Camera is a pluggable **rig stack** (not hard-wired): `ThirdPersonFollow` (default exploration/combat), `LockOn`, `Authored` (sequencer), `Rail`/`SideLock` (precision platforming chapters in the master plan), `Photo`. Collision-aware boom, damping, FOV kick on sprint, rule-of-thirds framing assist for dialogue. **Open question for the story/gameplay phase:** whether the hero game is full third-person 3D or a 2.5D side-locked camera for most chapters; the architecture supports both without engine changes (see ADR-007).

### 5.3 Streaming and memory
- A chapter = **manifest** listing cells; each cell = glTF scene chunks + collision + lightmaps + audio refs. The loader streams cells around the player, unloads far cells, and shows a loading card only on chapter boundaries.
- Decode in **Web Workers** (KTX2 transcode, meshopt decode); upload textures incrementally to avoid frame spikes.
- GPU resources are owned by a **resource registry** with ref-counting and explicit `dispose()`; scene transitions must return the registry to baseline (tested).
- Texture format: **KTX2 (UASTC for normals/ORM, ETC1S for albedo where acceptable)**; transcode to BC7/ASTC/ETC2 per device.

### 5.4 Quality tiers (initial targets, to be measured)

| Setting | low | medium | high | ultra |
|---|---|---|---|---|
| Render scale | 0.75 (+ upscaler) | 1.0 | 1.0 | 1.0–1.5 |
| Shadows | 1 cascade, 1024 | 2 cascades, 2048 | 4 cascades, 2048–4096 | 4 cascades, 4096 + contact shadows |
| AO | off | GTAO half-res | GTAO full-res | GTAO + multi-bounce |
| Fog | height fog | + god-rays (cheap) | volumetric-style | volumetric + shafts |
| Bloom / grade | grade only | bloom + grade | + TAA | + DoF/motion blur |
| Particles (max live) | 2k | 10k | 50k | 200k |
| Foliage density / LOD bias | 0.4 / aggressive | 0.7 | 1.0 | 1.0 / none |
| Draw-call budget | ≤ 400 | ≤ 800 | ≤ 1500 | ≤ 2500 |
| Triangles in view | ≤ 600k | ≤ 1.5M | ≤ 3M | ≤ 6M |
| VRAM (textures+buffers) | ≤ 1.0 GB | ≤ 2.0 GB | ≤ 3.5 GB | ≤ 6 GB |

Auto-selection uses a **startup micro-benchmark + adaptive scaler**: if the rolling 95th-percentile frame time exceeds budget for 3 s, step render scale down, then drop one effect; never oscillate (hysteresis). Users can override in Settings; `?quality=` and `?debug` URL flags exist in the web build.

## 6. Gameplay architecture (details in [GAMEPLAY_SYSTEM_DESIGN.md](GAMEPLAY_SYSTEM_DESIGN.md))
- **Character controller:** Rapier kinematic controller (slopes, steps, moving platforms), coyote time, input buffering, root-motion-aware animation blending with a state-driven animation graph (locomotion blend spaces, additive hit reactions, IK foot placement on high).
- **Combat:** hit/hurt volumes authored per animation clip (frame-range data), resolved by shape casts at the fixed step; one hit per target per attack instance; hit-stop, stagger, poise; blessing/sacred weapon abilities and hunger/energy modifiers consume tuning data ([BLESSING_AND_SACRED_WEAPONS.md](BLESSING_AND_SACRED_WEAPONS.md), [HUNGER_ENERGY_SYSTEM.md](HUNGER_ENERGY_SYSTEM.md)).
- **AI:** FSM first; Behaviour Trees/Utility AI for bosses when justified; navigation via **navmesh** baked offline (Recast/Detour WASM, `recast-navigation-js`) with local steering for crowds. Deterministic given seed.
- **World interaction:** interactables, shrines, doors, puzzles are entities with data-defined triggers/actions; checkpoints write save snapshots.
- **Progression:** inventory, weapons, blessings, hunger/energy; all in `game-core` state.

## 7. Narrative and cinematics (details in [NARRATIVE_SYSTEM.md](NARRATIVE_SYSTEM.md))
Story is authored as **ink + JSON** in `content/story/`, validated in CI, and playable in a **console story runner** with no engine at all (so the story can be written, tested and reviewed first). Beats map to quest flags through a declared contract; cinematics are timeline JSON referencing ink knots, camera rigs, animation clips and audio cues; every line has a stable ID for localisation and future voice-over.

## 8. Audio, UI, accessibility
Audio follows [AUDIO_SYSTEMS_DESIGN.md](AUDIO_SYSTEMS_DESIGN.md) on a Web Audio mixer (music stems, ambience beds, spatial SFX, ducking for dialogue, loudness-normalised assets, Opus/OGG for web, higher-bitrate for desktop). UI is DOM-based with full keyboard/gamepad navigation, rebindable controls, subtitles on by default, text scaling, colour-blind-safe cues, reduced-motion/flash options, and toggle alternatives to hold inputs.

## 9. Persistence
`SaveRepository` interface with `IndexedDbRepository` (web) and `FileRepository` (desktop). Save = `{schemaVersion, savedAt, buildId, chapterId, checkpointId, storyFlags, inventory, stats, rngSeed}`; validate on read (schema), migrate known versions, quarantine corrupt saves, always provide reset. Autosave at checkpoints with 3 rotating slots. No secrets or personal data.

## 10. Security, privacy, licensing
No API keys in bundles. Telemetry opt-in, minimal, documented. Optional server-mediated LLM features (hints/flavour only) never gate quests or combat and are off by default. Third-party libraries logged with licence in `docs/06-commercial/ASSET_POLICY.md`; all shipped art/audio must have provenance records. Desktop shell: no remote code, strict CSP, signed builds before public release.

## 11. Repository layout (planned; created at scaffold time)
See [MODULE_MAP.md](MODULE_MAP.md).

## 12. Technical risks and the spikes that retire them (Phase 1)

| # | Risk | Spike (time-boxed) | Pass criterion |
|---|---|---|---|
| S1 | Three.js WebGPU/TSL immaturity or tooling friction | Lit PBR scene, CSM, GTAO, bloom, 3 LODs, 200 instanced trees | 30 fps @720p `low` on HD 620; 60 fps @1080p `medium` on GTX 1660-class |
| S2 | WebGPU unavailable on target machines | Same scene on WebGL2 backend | Visual parity ≥ `low` tier, no crash, ≤ 30% slower than WebGPU |
| S3 | Realistic human characters in a browser | One skinned hero, skin/hair/eye shaders, 40 anim clips, 2 outfits | ≤ 2.5 ms GPU on `medium`; reviewed by product owner against reference frames |
| S4 | Physics/controller feel | Rapier kinematic controller + slopes/steps + 3 combat hit tests | Fixed-step determinism test passes (same inputs → same state on Win + Linux CI) |
| S5 | Streaming hitches | 5-cell streamed forest, KTX2 + meshopt, worker decode | No frame > 50 ms during traversal; VRAM within tier budget |
| S6 | Desktop shell WebGPU | Tauri 2 + WebView2 running S1 scene | WebGPU available and ≥ 90% of Chrome frame rate; else evaluate Electron |
| S7 | Asset pipeline repeatability | Blender → glTF → optimise → KTX2 CLI, CI-reproducible | Same source → identical hash; asset ≤ budget |
| S8 | Story runner | Chapter 1 ink + beat JSON playable in terminal | All branches reachable; no dead ends (automated) |

Results go into `docs/03-architecture/SPIKE_RESULTS.md` (to be created) and drive ADR updates. **No production feature work starts until S1, S3 and S6 pass or an ADR records the alternative.**

## 13. Current limitations
No code, no art, no measurements exist yet. Photoreal "movie" fidelity depends on 3D character/environment art that must be produced by artists or a licensed pipeline; the engine alone does not deliver it. Real-time GI, hardware ray tracing and Nanite-style virtualised geometry are **not** achievable in this stack and are explicitly out of scope.
