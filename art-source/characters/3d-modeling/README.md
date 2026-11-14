# Adivansh — 3D Character Modeling Reference Pack

**Status:** Pre-production modeling specification; not finished 3D assets.

## Purpose
Preserve a detailed, reusable modeling handoff for Adivansh, Meera Devi and the Forest Guardian before sculpting, retopology, rigging or engine integration.

## Contents
- CHARACTER_MODELING_SPEC.md — character identity, anatomy, proportions, costume construction, materials, topology, UVs, texture sets, rigging, expressions, LODs and per-character requirements.
- BLENDER_PRODUCTION_WORKFLOW.md — Blender scene setup, sculpt-to-game-mesh workflow, naming, validation and export checklist.

## Source-of-truth alignment
Read alongside:
- docs/01-product/HUNDRED_CHAPTER_VISION.md — governing product vision and cast.
- docs/02-world/ART_DIRECTION.md — original ancient Indic / epic-era styling and fictional realm art direction.
- docs/02-world/CHARACTER_BIBLE.md — character roles, agency and approval dossier.
- docs/02-world/SEASON_1_FOREST_DESIGN.md — Chapter 1 introduction of Meera, her deliberate clue trail, Chapter 22 Forest Guardian and Chapter 25 Forest Sentinel.
- docs/02-world/CHAPTER_ONE_CHARACTER_CONCEPT_APPROVAL.md — approved Seeker and Guardian concept direction.
- docs/02-world/CHAPTER_ONE_ASSET_INVENTORY_AND_ART_BRIEF.md — existing 2D asset contract and pipeline.

## Important production boundary
The governing commercial game vision remains **Phaser 3 + TypeScript + Vite, premium 2D side-scrolling**. This folder is a separate 3D character-development reference track. It does not authorize a Three.js migration, replace Phaser assets, or change the release platform.

The MetaHuman → glTF → Three.js sequence in the sample prompt is a proposed future pipeline only. The Technical Architect must validate MetaHuman licensing/export constraints, skeleton compatibility, glTF material/animation support, browser memory budgets and a real-device rendering spike before that pipeline is approved.

## Current deliverable status

| Deliverable | Status |
|---|---|
| Character-specific modeling brief | Documented in this pack |
| Blender scene and naming workflow | Documented in this pack |
| Approved portrait/full-body reference selection | Pending human selection |
| High-resolution sculpt files (.blend) | Not created |
| Retopologised game meshes | Not created |
| UVs and baked texture maps | Not created |
| Rigged animation-ready characters | Not created |
| Exported .glb/.gltf files | Not created |
| Engine integration / Three.js runtime | Not approved or implemented |

Do not label a character “3D modeled”, “rigged” or “game-ready” until the corresponding files and validation evidence exist.

## Identity and design continuity
- **Adivansh:** young royal warrior; direct, observant and restrained. The repository's approved Seeker concept specifies layered cream/earth-tone garments, green detailing, leather equipment, bronze accents, red-orange scarf, spiral medallion and dark tousled hair. The sample prompt's saffron/green costume and forehead mark are a concept exploration, not an automatic replacement.
- **Meera Devi:** the Queen and an active agent. She plans, resists, negotiates, studies the realm's ancient power and deliberately leaves clues. Her model must communicate intelligence, calm authority and capability.
- **Forest Guardian:** an oath-bound forest protector, not a creature derived from a real religion or mythology. The current Season 1 design separately names a corrupted Forest Guardian in Chapter 22 and a Forest Sentinel as the Chapter 25 season boss. Confirm which entity this model represents before final sculpt approval.

## Workflow rule
Create models as offline source assets first. Review sculpt, topology, costume, silhouette, facial consistency and rights provenance before runtime export. Never place high-resolution source meshes or unoptimised textures in the browser runtime bundle.
