# VFX System (3D)

> Status: design only (replaces the Phaser VFX system, deleted 2026-11-23). Content design: [ENVIRONMENT_AND_VFX_BIBLE.md](../02-world/ENVIRONMENT_AND_VFX_BIBLE.md) and [VFX_PRODUCTION_SYSTEMS.md](VFX_PRODUCTION_SYSTEMS.md). Where those documents name Phaser classes or 2D layers, treat them as *intent* to be re-expressed with the services below.

## Service model
Gameplay and story request effects **by name and data**: `vfx.play("hit.spark", {at, normal, intensity})`. The `VfxService` (in `packages/engine`) owns pooling, GPU resources, quality scaling and reduced-motion rules. Effect definitions live in `content/vfx/*.json` (emitters, ribbons, decals, light flashes, camera impulses, post pulses, audio cues).

## Building blocks
| Block | Implementation |
|---|---|
| Particles | WebGPU compute simulation (storage buffers, indirect draw); WebGL2 instanced CPU fallback with lower caps |
| Trails/ribbons | Camera-facing ribbon meshes sampled from weapon sockets per frame |
| Decals | Projected decals (scorch, footprints, wet marks), pooled |
| Dynamic lights | Capped pool (8 high / 4 medium / 2 low) with fast fade; emissive fakes beyond the cap |
| Distortion/heat | Screen-space refraction pass for fire, teleport, shockwave |
| Post pulses | Bloom boost, chromatic aberration, vignette pulse, LUT blend for blessings/boss phases |
| Camera impulses | Rig-level shake/FOV kick (disabled by reduced-motion) |
| Volumetrics | Fog density volumes and god-ray intensity driven by gameplay/story state |
| Shader FX | TSL node materials: dissolve, fresnel aura, arcane glyphs, water interaction ripples |

## Tier scaling
Counts and features scale with the render tier ([TECHNICAL_ARCHITECTURE.md §5.4](TECHNICAL_ARCHITECTURE.md)): particle caps 2k / 10k / 50k / 200k, no distortion on `low`, ribbon sample count halves per tier, dynamic lights capped. Each effect definition declares `minTier` and a `lowFallback` (for example an emissive sprite instead of a volumetric).

## Rules
- **Readability first:** effects must never hide enemy telegraphs, hitboxes or interaction prompts; each definition declares `obscuresGameplay: none|brief|area`.
- **Reduced motion/flash:** no shake, motion blur, hit-stop zoom or full-screen flash; ambient motion at 25%.
- **No allocation per hit:** pools are created per chapter from the effect manifest; the registry reports leaks on scene exit.
- **Budgeted:** every effect lists peak particles, overdraw estimate and GPU ms on the minimum tier; the perf harness runs a "VFX torture" scene each release.

## Atmosphere
Per-region atmosphere presets (sky, sun, fog, LUT, wind, ambient particles, god-ray strength) blend over story beats via the sequencer. Foliage wind is a shared uniform; water uses planar/screen-space reflections with foam and caustics (Season 3 critical, see [SEASON_3_OCEAN_DESIGN.md](../02-world/SEASON_3_OCEAN_DESIGN.md)).

## Measurement status
Nothing has been measured. Spike S1 establishes GPU timings on the HD 620 baseline; until then every budget is a target.
