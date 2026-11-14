# 3D Character Blockout Models

These are editable, low-to-mid detail OBJ blockout meshes generated as an initial 3D modeling pass from the character brief. They are not finished production sculpts, retopologised deformation meshes, rigged characters or game-ready GLBs.

## Files
- `adivansh.obj` — Adivansh / Seeker, with body volumes, layered garments, scarf, medallion, hair/topknot, bow and quiver.
- `meera-devi.obj` — Meera Devi, with body volumes, sari/blouse/pallu, braid, medallion, jewellery, manuscript and satchel.
- `forest-guardian.obj` — Forest Guardian concept, with monumental anatomy, bark/stone armour, root crown, moss, shield and mace.
- `characters.mtl` — shared material palette referenced by the OBJ files.

## Open in Blender
1. Download the OBJ and MTL files into the same folder.
2. In Blender choose **File → Import → Wavefront (.obj)** and import the OBJ.
3. Keep the MTL alongside the OBJ so the material palette can be resolved.
4. Inspect the character from front/side/back and adjust scale/orientation if your Blender import settings differ.
5. Save a working `.blend` copy before sculpting.

## Current limitations
- This first pass uses assembled procedural mesh volumes. Some parts overlap intentionally to establish silhouette and costume layers.
- Faces, hands, feet, cloth folds, bark detail, ornamental engravings and facial expressions need artist refinement.
- No armature, skin weights, UV unwrap, baked maps, animation clips, LODs or runtime export are included.
- The Forest Guardian / Forest Sentinel story mapping is still unresolved in the design brief.
- These models do not change the current Phaser 2D game architecture.

Treat these as starting blockout assets for a character artist, not final art.
