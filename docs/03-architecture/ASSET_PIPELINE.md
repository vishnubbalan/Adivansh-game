# 3D Asset Pipeline and Runtime Integration

> Status: design only (replaces the 2D sprite/atlas pipeline, deleted 2026-11-23). Tooling lives in `tools/asset-cli/` once scaffolded. Numeric budgets are targets pending spikes S3, S5, S7.

## Pipeline stages
1. **Brief:** gameplay purpose, emotional tone, scale in metres, variants, LOD and quality-tier needs.
2. **Research:** references, originality check, cultural review, licence review ([ASSET_POLICY.md](../06-commercial/ASSET_POLICY.md)).
3. **Concept:** silhouette, palette, costume/material callouts; owner approval for characters ([CHAPTER_ONE_CHARACTER_CONCEPT_APPROVAL.md](../02-world/CHAPTER_ONE_CHARACTER_CONCEPT_APPROVAL.md), [CHARACTER_SAMPLE_PROMPTS.md](../02-world/CHARACTER_SAMPLE_PROMPTS.md)).
4. **Production (DCC):** Blender (`.blend` in `art-source/`): modelling, sculpt, retopology, UV, bake (normal/AO/curvature), texturing (PBR metal-rough), rigging, animation. Substance/Krita/Quixel-class tools optional if licensed.
5. **Export:** glTF 2.0 (`.glb`) with named nodes, one material per surface type, animations as separate clips, custom properties for gameplay metadata (hit volumes, sockets, collision proxy).
6. **Optimise (`asset-cli`, automated and reproducible):** weld/dedup, simplify and generate **LOD0–2**, **meshopt** compression, texture resize + **KTX2** (UASTC for normal/ORM, ETC1S for colour), trim-sheet checks, collision proxy generation, optional **lightmap bake** and probe placement for static scenes, manifest generation with content hashes.
7. **Integration:** chapter/cell manifest entry, material overrides (TSL libraries), animation graph bindings, audio sockets, VFX sockets.
8. **Validation:** budget check (tris, materials, texture memory, bone count), in-engine review at gameplay distance and in cinematic close-up, GPU time on minimum and recommended tiers, provenance record.
9. **Release:** versioned manifest, reviewer, approval status, asset-register entry.

## Naming
Stable lowercase ids: `region_asset_variant` for files (`forest_peepal_tree_a.glb`); nodes `lod0_*`, `col_*` (collision), `sock_*` (sockets); animation clips `character_state_variant` (`adivansh_run_loop`). Do not rename runtime ids without updating manifests, content data and tests.

## Budgets (targets)

| Asset class | Triangles LOD0 / LOD1 / LOD2 | Textures (per asset, high) | Notes |
|---|---|---|---|
| Hero | 60k / 25k / 8k | 4k body, 4k face/hair, 2k outfit sets (KTX2) | ≤ 90 bones; facial blendshapes (ARKit-52-style) |
| Major NPC / boss | 40–80k / 20k / 6k | 2–4k | Bosses may exceed hero budget in arena only |
| Background NPC | 15k / 6k / 2k | 1–2k, shared outfit atlas | Crowds via vertex-animation textures |
| Tree / large foliage | 8k / 2k / billboard | trim sheet + leaf atlas | Instanced; wind via shader |
| Hero prop / weapon | 10–20k / 5k / 1k | 2k | Sockets for VFX |
| Environment kit piece | 2–15k / 50% / 25% | shared trim sheets 2k | Modular, grid-snapped |
| Terrain | chunked heightfield + splat/triplanar | 4–6 tiling PBR sets | Hero vistas authored as meshes |

Compressed download target for the Chapter 1 vertical slice: ≤ 250 MB; full-game install size tracked per season.

## Characters (highest-risk area)
Realism requires human-quality sculpt, topology suited to facial animation, skin/eye/hair shader work and motion capture or high-quality keyframing. **AI coding agents cannot author final 3D character art**; this needs a 3D artist, a licensed character base/asset pipeline, or commissioned work. AI-generated images are concept references only until cleared per the asset policy. Record the chosen character pipeline in an ADR after spike S3.

## Animation
Clips authored at 30 fps, resampled at build. Check foot contact, anticipation, follow-through, weapon arcs, cloth/hair secondary motion, loop seams and root motion. Combat timing (active frames, cancel windows, hit volumes) is data in `content/tuning` bound to clip names, **not** inferred from clip length.

## Texture and memory
Track decoded GPU memory, not download size. KTX2 transcodes to BC7/ASTC/ETC2 on load. Hero textures stay resident; environment textures stream with the cell. The resource registry reports VRAM by category in the debug overlay.

## Provenance
Every shipped asset links to the asset register in [ASSET_POLICY.md](../06-commercial/ASSET_POLICY.md). Unreviewed generated or marketplace content stays out of release builds.
