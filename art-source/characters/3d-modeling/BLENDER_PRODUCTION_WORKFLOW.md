# Blender Production Workflow — Character Source Assets

This workflow defines how a character artist should turn the modeling specification into editable Blender source files. It is a production handoff, not a claim that these steps or assets have already been completed.

## 1. Folder layout for each character

Use this structure as real assets are created:

~~~text
art-source/characters/
  3d-modeling/
    README.md
    CHARACTER_MODELING_SPEC.md
    BLENDER_PRODUCTION_WORKFLOW.md
  adivansh/
    references/
    source/
    sculpt/
    retopo/
    textures/
    rig/
    animation/
    exports/
    provenance.md
  meera-devi/
    references/
    source/
    sculpt/
    retopo/
    textures/
    rig/
    animation/
    exports/
    provenance.md
  forest-guardian/
    references/
    source/
    sculpt/
    retopo/
    textures/
    rig/
    animation/
    exports/
    provenance.md
~~~

Do not create empty fake .blend or .glb placeholders. Add a folder only when it contains real source or deliverables; Git does not preserve empty directories.

## 2. Blender scene setup
1. Create a new scene per character and save a clean baseline file before sculpting.
2. Set Units to Metric, Unit Scale 1.0, frame rate to 24 fps for cinematic previews. Runtime animation FPS is chosen by the technical animation lead.
3. Add a ground plane at Z=0, a scale mannequin, front/side/back orthographic cameras and a neutral studio light rig.
4. Add the character height marker and record agreed height in scene notes.
5. Use collections named 01_REFERENCE, 02_BLOCKOUT, 03_SCULPT_HIGH, 04_RETOPO_GAME, 05_CLOTH_HAIR_PROPS, 06_RIG, 07_LIGHTS_CAMERAS and 08_EXPORT.
6. Use object names from CHARACTER_MODELING_SPEC.md. No unnamed or default-named objects in approved source files.

## 3. Modeling passes

### Pass A — Reference and blockout
- Import approved front/side/3/4 references as image empties.
- Establish height, head scale, shoulder/hip proportions and silhouette.
- Block out body volumes, costume masses, hair and major props.
- Render front, side, back and 3/4 orthographic turnarounds.
- Review silhouette at full-body and thumbnail/gameplay size.
- Obtain human design approval before detailed sculpting.

### Pass B — High-resolution sculpt
- Refine primary anatomy and face planes first.
- Sculpt secondary forms: muscle groups, cloth folds, armour plates, bark cracks, root growth and accessories.
- Add tertiary detail only after silhouette and proportion approval.
- Keep skin, cloth, leather, metal, wood, stone and foliage as separate material regions.
- Preserve clean source scenes and versioned checkpoints.

### Pass C — Retopology
- Create quad-dominant topology suitable for approved deformation range.
- Place loops around shoulders, elbows, wrists, hips, knees, ankles, neck, eyelids and mouth.
- Keep hair cards, cloth strips and ornamental attachments separate where practical.
- Verify mesh in neutral pose and extreme required poses.
- Record polygon/triangle counts for each LOD.

### Pass D — UV and bake
- Unwrap with consistent texel density.
- Mark seams away from hero-facing focal areas where possible.
- Bake normal, AO and curvature/masks as needed from the high sculpt.
- Inspect bake cages, skew, seams, mirrored regions and tangent basis.
- Maintain a texture manifest with colour-space and compression metadata.

### Pass E — Materials and look development
- Use physically based materials; keep lighting out of Base Color.
- Validate roughness/metallic response under neutral studio HDRI and cinematic key light.
- Inspect face skin at close distance and costume materials at full-body distance.
- Keep emissive elements on separate masks/material slots.
- Test with intended glTF exporter and target renderer, not only Blender viewport.

### Pass F — Rig and deformation
- Build armature only after proportions and retopology are stable.
- Use a documented bind pose and skeleton hierarchy.
- Weight paint and test shoulders, elbows, wrists, hips, knees, neck, jaw and fingers.
- Add facial controls/shape keys for required expressions.
- Add prop sockets and confirm bow, quiver, shield and mace attachment transforms.
- Record animation clip names, frame ranges, loop flags and event markers.

### Pass G — Animation validation
- Preview every required state in a neutral-lit scene.
- Check cloth/hair/ornament intersections.
- Check foot contact, root motion, weapon arcs and silhouette readability.
- Ensure Guardian telegraph, active and recovery windows are distinct.
- Export test clips and validate in a standalone viewer before approval.

## 4. Export contract
The preferred exchange format for a future real-time pipeline is glTF 2.0 / GLB, subject to renderer compatibility approval.

Before export:
- Apply object transforms and verify positive, non-zero scale.
- Confirm armature and mesh hierarchy.
- Remove hidden source-only objects from the export collection.
- Confirm materials use supported glTF PBR features.
- Bake procedural materials and unsupported nodes to textures.
- Confirm animation actions export with stable names.
- Confirm root-motion and coordinate-conversion policy.
- Export a test GLB and re-import it into a clean Blender file.
- Compare scale, orientation, normals, material appearance, texture paths, skeleton and animation playback.

Do not assume MetaHuman assets can be exported directly to glTF with all facial rig, groom, material and animation features intact. Run a small proof with one representative character and document conversion loss before selecting it as the production route.

## 5. Quality gates

| Gate | Required evidence | Owner |
|---|---|---|
| Design lock | Approved turnaround, palette and silhouette sheet | Human Game Director |
| Sculpt lock | Close-up face and full-body review renders | Character Artist + Human |
| Retopo lock | Topology screenshots, counts, deformation poses | Character Artist / Technical Artist |
| Texture lock | UV layout, bake inspection, texture manifest | Texture Artist |
| Rig lock | Skeleton map, bind pose, weight tests | Technical Animator |
| Animation lock | Preview clips, event markers, no-intersection review | Animator + Gameplay |
| Export lock | Re-import test, GLB validation, renderer screenshot | Technical Artist |
| Rights lock | Provenance and licence review | Product Owner |

## 6. Asset provenance template
For every character, maintain provenance.md with:
- Character and asset ID.
- Creator and organisation.
- Creation date and tool/version.
- Reference images and their generation/source IDs.
- Human edits and sculpt/retopo/texture contributors.
- Third-party base meshes, scans, brushes, textures, fonts or HDRIs.
- Licence/terms version and commercial-use/modification/redistribution review.
- Attribution requirements.
- Approval owner/date.
- Source file version/hash and export file hashes.
- Integration PR/commit and validation evidence.

Unknown provenance or unclear commercial rights blocks release.
