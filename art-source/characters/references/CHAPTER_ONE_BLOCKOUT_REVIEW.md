# Chapter One — First Character Blockout Review

**Characters:** Adivansh and Meera Devi  
**Stage:** First proportion and costume-silhouette blockout  
**Generated:** 2026-11-23  
**Status:** Proxy geometry review only; not a sculpt or production asset

## Source of truth

Use the approved identity/costume record in `CHAPTER_ONE_APPROVED_VISUAL_REFERENCES.md` and the individual production sheets:
- `art-source/characters/adivansh/CHARACTER_PRODUCTION_SHEET.md`
- `art-source/characters/meera-devi/CHARACTER_PRODUCTION_SHEET.md`

## Generated review deliverables

The working session produced a downloadable package containing:
- `adivansh_chapter_one_blockout.glb` — 43 separately named low-resolution mesh objects.
- `meera_chapter_one_blockout.glb` — 44 separately named low-resolution mesh objects.
- `chapter_one_two_character_blockout.glb` — both proxy characters side by side.
- `adivansh_orthographic_turnaround.png` and `meera_orthographic_turnaround.png`.
- `chapter_one_character_orthographic_review.png` — combined front/side/back contact sheet.
- `generate_chapter_one_blockouts.py` — reproducible source generator.

The orthographic review uses a shared projection scale and the same mesh geometry for front, left-side and back views. The GLB models are suitable for import into Blender as starting proxies.

## Measurement interpretation

The production sheets define height as ground to skull, excluding hair and accessories:
- Adivansh: 1.78 m to skull; hair/topknot extends above this.
- Meera: 1.66 m to skull; braid/flowers extend above or behind the skull.

The first-pass body ratios were adjusted toward the sheet targets: Adivansh approximately 7.5 head-heights and 2.3–2.5 head-width shoulder span; Meera approximately 7.5 head-heights and a narrower 2.0–2.2 head-width shoulder span. These remain provisional until an artist checks the models in Blender.

## Inspection findings / next corrections

1. The front/side/back projections share one scale and consistent ground contact. The side view reveals the current torso, scarf/pallu and lower-garment depth.
2. The models are deliberately primitive and faceted. Face planes, fingers, feet, joints and cloth folds are not sculpted.
3. The dhoti and sari are volume proxies, not sewn garment meshes. Refine pleats, pallu anchoring, scarf drape, and the back silhouette before sculpting.
4. Add proper hands/fingers and anatomical joint transitions; current hand and limb forms are placeholders.
5. Review shoulder span, pelvis width, leg length, head placement and hair silhouette against the approved concept image in Blender. Do not treat the orthographic proxy sheet as final art.
6. Keep Meera's braid, jasmine/marigold ornaments, medallion and sari pallu as separate editable assets. Keep Adivansh's scarf, harness, bracers and medallion separate.

## Tooling and validation limits

Blender was not installed in the generation environment. The GLBs were generated with a mesh library and their geometry/orthographic projections were inspected here; they have **not** yet been opened, re-rendered or validated inside Blender. The package includes its generator source. No `.blend` file, sculpt, retopology, UV layout, texture bake, rig, animation, or game-ready export is claimed.

## Next production gate

Import both GLBs into Blender, inspect the three orthographic views at the stated skull heights, correct the proxy silhouettes, then save an editable `.blend` blockout scene. Only after owner/artist approval should sculpting and retopology begin.
