# Adivansh — Detailed 3D Character Modeling Specification

**Revision:** 1.0  
**Scope:** Adivansh, Meera Devi and Forest Guardian  
**Use:** Character artist / Blender modeler / technical artist handoff  
**Status:** Modeling brief only — no mesh, rig or texture is represented as complete.

---

## 1. Shared production standard

### 1.1 Target use and quality
Create premium, realistic, cinematic human/creature characters suitable for close-up story shots and a later real-time game adaptation. The high-resolution sculpt is the visual source of truth; a separately retopologised and optimised game mesh is derived from it.

The 3D references do not change the current 2D product architecture. Keep the source model pipeline independent until a technical architecture decision approves a runtime target.

### 1.2 Coordinate system and scale
Use metric units in Blender:
- Scene units: Metric; Unit Scale 1.0.
- Character height is measured from ground contact to top of skull/helmet, excluding loose hair, antlers, cloth tips and carried weapons.
- Apply object scale before rigging/export; avoid negative scale on deforming meshes.
- Character local axes: +Y forward, +Z up, +X character-left. Document exporter axis conversion.
- Set character origin at the midpoint between the feet on the ground plane.
- Keep a separate named root/armature origin and a documented weapon grip socket.
- Use consistent scale references: 1.0 m calibration cube, 1.8 m human-height marker and 3.0 m Guardian comparison marker.

Provisional proportions are modeling targets, not locked canon. Confirm with the human owner before final production.

### 1.3 Shared anatomy and face requirements
- Realistic anatomy and believable joint placement; avoid exaggerated superhero anatomy.
- Preserve natural asymmetry in face, ears, shoulders, hands and costume wear.
- Model hands with five distinct digits and usable thumb opposition; verify gripping poses.
- Model feet with heel, arch, ball and toe definition for close-up barefoot/sandal shots.
- Build eyes as layered geometry: eyeball, iris, pupil, eyelids and tearline.
- Separate scalp/hairline, brows, lashes, facial hair and hair cards/curves for controlled grooming.
- Keep ears, nostrils, lips and eyelids anatomically plausible at close camera distance.
- Expressions must use a consistent facial rig or documented shape-key set.

### 1.4 Mesh and topology requirements
**High-resolution sculpt**
- Separate logical sculpt objects for body, face, hair, clothing layers, armour, ornaments, footwear, weapons and Guardian organic growths.
- Use multiresolution or sculpt layers where appropriate; preserve a clean, non-destructive source.
- Establish primary forms before pores, stitches and micro-surface detail.
- Keep cloth, skin and metal as distinct material regions.

**Deformation/game mesh**
- Quad-dominant edge flow around shoulders, elbows, wrists, hips, knees, ankles, neck, jaw, eyelids and mouth.
- Supporting loops around joints and facial features; avoid poles at high-deformation creases.
- Keep cloth layers separate where independent simulation or secondary motion is needed.
- Give hems, straps, armour plates and medallions real thickness.
- Remove hidden internal faces and intersections where they affect export, skinning or performance.
- Provide a clean bind pose and non-overlapping deformation zones.
- Create a triangulated export copy only after the quad source is approved.

**Provisional real-time budgets (validate on target hardware):**
- Adivansh/Meera: 35k–65k triangles each for close-camera LOD0; lower LODs at approximately 50% and 20% of LOD0.
- Guardian: 55k–90k triangles for LOD0 due to organic armour, roots and silhouette detail; lower LODs at approximately 50% and 20%.
- These are starting budgets, not acceptance guarantees. Profile actual browser/device performance before locking them.

### 1.5 UVs and texture sets
- Use non-overlapping UVs for unique materials; reserve mirrored UVs for symmetric, non-unique details only.
- Maintain consistent texel density across visible body/costume regions.
- Separate face/body, cloth, leather, metal, hair and Guardian organic surfaces into logical material sets.
- Bake high-to-low normal and ambient-occlusion maps with a documented cage and skew check.
- Texture starting point: 4K face/body for cinematic source; 2K costume/material sets; 1K/2K accessories. Runtime resolution must be tested and may be reduced.
- PBR maps: Base Color, Tangent-Space Normal, Roughness, Metallic and AO as needed. Use ORM packing only after target renderer validation.
- Avoid painted lighting in Base Color. Keep emissive maps separate and restrained.
- Base Color/emissive are sRGB; normal/roughness/metallic/AO are linear data.
- Provide a texture manifest with dimensions, bit depth, format, colour space and intended compression.

### 1.6 Hair, cloth and secondary motion
- Hair must have a stable silhouette from front, side and back. Use curves for sculpt/beauty renders and groom cards/strips or a validated hair solution for runtime.
- Prevent loose strands from obscuring eyes, bow grip, shoulder silhouette or Meera's facial expressions.
- Cloth layers need thickness and clean hems. Use simulation for high-resolution presentation, then bake or author controlled secondary motion for runtime.
- Avoid runtime dependence on expensive cloth/hair simulation until measured on target mobile devices.
- Keep ornaments, medallion, quiver, bow, shield and mace as separate attachable objects where practical.

### 1.7 Rigging and animation
Use a humanoid deform rig for Adivansh and Meera, and a proportion-adjusted humanoid/creature rig for Guardian. Do not assume a MetaHuman skeleton is compatible without a mapping test.

Minimum skeleton groups:
- Root, pelvis/hips, spine chain, chest, neck, head.
- Clavicles, upper arms, forearms, hands and finger chains.
- Thighs, calves, feet and toe controls.
- IK/FK controls for arms and legs; pole targets for elbows/knees.
- Separate weapon, bow, quiver, shield and mace attachment sockets.
- Facial controls or shape keys for brows, eyes, blink, jaw, lips and expressions.
- Guardian-specific torso mass controls, shoulder armour/roots, antler/head growth controls and mace/shield sockets.

Deliver neutral A-pose and T-pose references, rest/bind-pose screenshots, skin-weight heatmaps, deformation tests, root-motion policy, in-place animation policy and a clip manifest with FPS, loop flags and event markers.

### 1.8 Naming convention
Use lowercase snake_case and stable prefixes:
- CHR_ADIVANSH_body_high, CHR_ADIVANSH_body_game
- CHR_MEERA_face_high, CHR_MEERA_sari_game
- CHR_GUARDIAN_root_high, CHR_GUARDIAN_armor_game
- RIG_ADIVANSH_main, RIG_MEERA_main, RIG_GUARDIAN_main
- MAT_ADIVANSH_skin, MAT_MEERA_sari_ivory, MAT_GUARDIAN_bark
- TEX_ADIVANSH_body_basecolor_4k
- SOCK_ADIVANSH_weapon_r, SOCK_ADIVANSH_bow_l, SOCK_GUARDIAN_mace_r

Never use generic names such as Cube.001 in approved source scenes.

---

## 2. Adivansh — Hero / The Seeker

### 2.1 Narrative and visual identity
Adivansh is a young royal warrior whose journey begins with urgency and gradually develops into leadership. His face and posture should read as observant, disciplined and emotionally restrained, not permanently angry. His movement identity is agile, economical and grounded.

The supplied sample prompt describes him at approximately 22 years old, with warm brown skin, a strong jaw, light stubble, dark eyes, thick black hair in a high warrior topknot, a small vermilion forehead mark, subtle gold ear cuffs, saffron/deep-green draped cloth, leather bow equipment and a faint left-eyebrow scar. Treat age and individual details as concept prompt attributes pending character-bible approval.

**Visual authority note:** The repository's earlier approved Seeker concept specifies layered cream/earth-tone garments, green detailing, leather equipment, bronze accents, red-orange scarf, spiral medallion and dark tousled hair. The new sample prompt's saffron/green costume and forehead mark are not an automatic replacement. Create a design comparison sheet and obtain explicit approval before locking costume/face changes.

### 2.2 Proportion and silhouette
- Provisional height: 1.78 m.
- Lean athletic build: defined functional musculature, not bodybuilder mass.
- Approximate head-to-body ratio: 7.5–7.75 heads.
- Athletic shoulders, functional waist/hips for running, crouching and climbing.
- Forearms/hands must support believable bow handling; verify reach against bow grip and draw anchor.
- Silhouette priorities: topknot, shoulder drape/scarf, quiver and bow. Keep weapon readable from either side.
- Feet must support barefoot or strapped-footwear options without changing leg proportions.

### 2.3 Head and face
- Strong but natural jaw; cheekbone definition without caricature.
- Dark brown eyes, realistic eyelid thickness, subtle lower-lid structure and non-glossy sclera.
- Light stubble groom following jaw and upper lip; not a flat painted mask.
- Small scar near left eyebrow, visible in close-up but not exaggerated.
- Topknot secured with woven tie; loose strands follow gravity and movement.
- Forehead mark is a small removable character styling choice only, not a deity identity marker or sacred iconography.
- Expression targets: neutral-observant, focused, restrained concern, grief, resolve, pain, relief and restrained joy.

### 2.4 Costume construction
Model layers independently, inside-to-outside:
1. Base lower garment with practical dhoti-inspired folds and secure waist wrap.
2. Base torso cloth or fitted underlayer suitable for movement.
3. Main shoulder drape/angavastram; clear attachment at shoulder/chest and controlled trailing tail.
4. Leather chest/bow harness with believable strap thickness, stitching, buckles and wear.
5. Forearm guards in leather with bronze reinforcement; separate cuff/strap components.
6. Belt, small pouches and utility ties; avoid excessive dangling parts.
7. Armlets/ear cuffs/medallion as separate metal objects with softened edges.
8. Shin wraps or ankle straps; keep ankle and toe articulation unobstructed.
9. Bow and quiver as separate props; arrows individually instanced or efficiently grouped.

Test neutral A-pose, deep run stride and overhead/forward attack. Cloth must not intersect thighs, bow grip, hands or feet.

### 2.5 Materials
- Skin: natural warm-brown range with subtle roughness variation; avoid waxy specular.
- Cloth: woven fibre normal/roughness breakup; saffron, deep green, muted earth tones and restrained woven borders.
- Leather: mid-to-high roughness, edge wear and stitching; no plastic gloss.
- Bronze: aged bronze with directional scratches and restrained edge highlights.
- Hair: dark brown-black with strand variation, not a single opaque helmet.
- Bow: laminated/composite wood with horn/bronze details; believable string thickness and tension.

### 2.6 Props and attachment
- Recurve/composite bow: separate left-hand grip socket, string alignment and draw-hand contact point.
- Quiver: back attachment with stable strap placement; arrow nock access remains clear.
- Arrows: consistent shaft length, fletching and nock; use instancing for runtime.
- Optional sword only if confirmed by approved Chapter 1 loadout. Do not add weapons solely because an existing prototype uses one.

### 2.7 Required validation poses
Neutral front/side/back, 3/4 portrait, bow hold, bow draw, run, jump, landing crouch, melee anticipation, hurt recoil and interact kneel. Check left/right mirroring with asymmetric scar, drape and weapon grip.

---

## 3. Meera Devi — The Queen / Active Agent

### 3.1 Narrative and visual identity
Meera Devi is the Queen of Ayodhana and an active agent in the central story. She holds knowledge about the realm's ancient power that Mahaksha seeks to weaponise. She plans, resists, negotiates, studies, leaves deliberate clues and shapes the eventual outcome. Her visual language must communicate intelligence, agency, calm authority and practical capability.

The supplied sample prompt describes her at approximately 28 years old, with warm golden-brown skin, intelligent dark eyes, long black hair in a loose side braid with jasmine and marigold, a small gold nose stud, one delicate antique earring, an ivory/muted-red handloom sari, a brass protection medallion and ink-stained fingertips. Treat age and detailed styling as concept prompt attributes pending character-bible approval.

### 3.2 Proportion and silhouette
- Provisional height: 1.66 m.
- Realistic adult anatomy and balanced proportions; do not shrink or exaggerate fragility.
- Approximate head-to-body ratio: 7.25–7.5 heads.
- Shoulders, arms and hands support writing, manipulating mechanisms, carrying manuscripts and resisting restraint.
- Sari silhouette is elegant but practical: controlled pleats, secure waist, stable shoulder drape and no excessive trailing cloth.
- Recognisable without relying on crown or overt royal regalia.

### 3.3 Head, face and hair
- Warm golden-brown skin with natural tonal variation and realistic subsurface response.
- Intelligent dark eyes; subtle brow movement is essential for performance.
- Long black hair in a side braid with woven jasmine and a few marigold accents. Flowers are separate meshes/instances or groom elements, not fused to scalp.
- Small nose stud and one delicate antique earring; avoid excessive jewellery.
- Expression targets: composed neutral, attentive listening, analytical focus, quiet resolve, controlled anger, concealed fear, strategic confidence, compassion and relief.
- Facial performance is nuanced rather than exaggerated; she remains calm under pressure.

### 3.4 Costume construction
Model layers independently:
1. Base blouse with historically inspired handloom construction and realistic seams.
2. Main sari body with practical pleating and cloth thickness.
3. Pallu/shoulder drape secured for action and writing.
4. Optional shawl layer, separately rigged and restrained.
5. Waist tie and discreet storage for herbs or writing tools if approved.
6. Brass medallion on a cord; engraved protection pattern must be original and non-religious.
7. Simple anklets and practical footwear as separate components.
8. Cloth satchel with herbs, folded notes and palm-leaf manuscripts.
9. Writing tools, manuscript bundle and small healer's kit as attachable props.

Her humble presentation should contain subtle royal quality through refined border workmanship, one carefully made medallion and fabric quality rather than a crown or heavy jewellery.

### 3.5 Materials
- Skin: warm golden-brown, natural pores and restrained sheen.
- Sari: ivory and muted red with a faded gold woven border; handloom fibre texture and believable thickness.
- Brass medallion: aged brass, engraved original protective geometry, subtle handling wear.
- Gold jewellery: restrained antique gold, low-to-medium metallic response.
- Hair: dark black-brown with realistic strand breakup; flowers remain matte and organic.
- Satchel: woven fibre/leather with wear at corners; manuscripts have layered edges and subtle surface texture.

### 3.6 Props and story-specific visual storytelling
- Palm-leaf manuscript set with decorative, non-readable marks; do not use pseudo-text as final readable writing.
- Herb satchel with separate herb bundles and bottle props.
- Brass medallion uses original geometric protection motifs, not copied religious symbols.
- Ink stain on fingertips is subtle and visible in close-ups.
- Golden-thread clue effect is a separate VFX/prop layer; do not bake emissive light into skin or costume.
- Include a “deliberate clue leaving” pose and “studying ancient mechanism” pose.

### 3.7 Required validation poses
Neutral A-pose, front/side/back, 3/4 portrait, reading, writing, holding a manuscript, manipulating a mechanism, walking quickly, restrained struggle and composed negotiation. Test sari and braid collisions during torso twist, arm raise and crouch.

---

## 4. Forest Guardian — Oath-bound Forest Protector

### 4.1 Narrative identity and continuity warning
The supplied concept prompt describes an ancient oath-bound warrior fused with the forest over centuries: bark-like grey-brown skin, moss and ferns, amber eyes, braided silver beard, bronze helm/armour, root growths, ochre cloth, serpent-carved shield and stone-headed mace. It is a fictional forest sentinel, not a demon or a being copied from real mythology.

**Repository continuity issue:** The current Season 1 chapter design names a corrupted Forest Guardian in Chapter 22 and a distinct Forest Sentinel as the Chapter 25 final boss. This brief's “Guardian” name must not silently replace or collapse those two story entities. Before final sculpt, the human owner and Game Director must specify whether this model is the Chapter 22 corrupted Forest Guardian, the Chapter 25 Forest Sentinel, or a concept variant to be renamed.

### 4.2 Proportion and silhouette
- Provisional height: 3.0 m to crown/helmet top; document antler/root height separately.
- Massive but believable weight distribution; feet broad enough to ground the scale.
- Torso and shoulders monumental; avoid an oversized human with random foliage attached.
- Arms long enough to wield a heavy mace while preserving readable elbow/shoulder articulation.
- Head smaller relative to torso than a human hero, but facial features remain legible in close camera.
- Antler/root crown creates an unmistakable upper silhouette; maintain camera/doorway clearance.
- Strong triangular composition: broad shoulders, stable hips and grounded feet.

### 4.3 Anatomy and organic fusion
- Build a readable humanoid skeleton beneath forest growth.
- Bark-like skin layers over muscle forms; cracks follow believable stress and growth lines.
- Roots wrap around limbs and torso as distinct geometry with controlled thickness.
- Moss and ferns sit in protected crevices; do not obscure joints, face, hands or attack tells.
- Stone plates and wood armour appear grown/attached over time, with visible transitions and contact shadows.
- Beard is braided silver/grey fibre with bronze rings; separate braid masses for rigging.
- Amber eyes are restrained emissive accents; no oversized glowing pupils.

### 4.4 Armour and props
- Patinated bronze plates with hand-worked edges, carved geometric borders and forest wear.
- Root-like growths integrate through armour openings and seams.
- Ochre cloth sash, torn but not excessively ragged; use cloth strips with separate motion controls.
- Round bronze shield with original coiled-serpent relief; fictional ornamental design, not sacred iconography.
- Stone-headed mace with bronze binding bands; chipped stone head and reinforced haft.
- Weapon grip must match rig hand and attack arc; provide dedicated mace socket.
- Shield socket supports guard pose without penetrating forearm/torso.

### 4.5 Materials and VFX separation
- Bark: rough layered brown-grey, directional grain, restrained specular.
- Stone: varied mineral roughness, chipped edges and subtle moss staining.
- Moss/foliage: matte green, controlled translucency; avoid excessive alpha overdraw.
- Bronze: aged green-brown patina with restrained metallic highlights.
- Cloth: muted ochre with frayed edges and believable weave.
- Eyes/runes: amber/teal emissive accents in separate masks/material slots.
- Telegraph energy, ground roots, dust and leaf bursts are separate VFX assets, not baked into the base mesh.

### 4.6 Rig and animation needs
- Humanoid core rig with extended torso/shoulder deformation.
- Additional controls for beard braids, root tendrils, antler tips, cloth sash, armour attachments and shoulder foliage.
- Keep silhouette stable through idle, telegraph and attack; decorative growth must not obscure weapon or danger region.
- Required states: idle/breathing, detection/turn, telegraph, attack, recovery, hurt, stagger and defeat.
- Each attack needs anticipation, active strike and recovery clips with exact timing/event markers.
- Include hitbox/hurtbox overlay poses; decorative antlers, foliage and cloth are not collision unless explicitly designed as such.

### 4.7 Required validation poses
Neutral front/side/back, 3/4 hero-scale comparison, idle breathing, shield guard, mace overhead wind-up, horizontal sweep, ground slam, recovery, stagger and defeat. Verify weapon clearance and attack arcs at full-body and gameplay camera scale.

---

## 5. Shared delivery checklist

Each character source package should contain:
1. source/<character>_high.blend — high-resolution sculpt and presentation scene.
2. source/<character>_game.blend — retopologised mesh, UVs, materials, armature and test actions.
3. textures/<character>/ — source maps and runtime exports with manifest.
4. exports/<character>_lod0.glb, _lod1.glb, _lod2.glb — only after export validation.
5. turnaround/ — front, side, back and 3/4 orthographic references.
6. rig/ — skeleton hierarchy, bind-pose image, weight tests and socket map.
7. animation/ — clip manifest, event markers and preview renders.
8. provenance.md — creator, tools, sources, licences, generated reference IDs, human edits and approvals.
9. validation.md — triangle counts, texture memory, scale, transforms, material checks, animation playback and target runtime tests.

## 6. Acceptance criteria
A character is not accepted until:
- Face, silhouette and costume match the approved design sheet across front/side/back/3/4.
- Anatomy, hands, feet and joints pass close-up review.
- No visible mesh intersections in required poses.
- Skin weights pass deformation tests at shoulders, elbows, wrists, hips, knees, neck and face.
- UVs are clean; baked maps show no seams, skew or projection artefacts.
- PBR materials render consistently in the chosen target renderer.
- LODs preserve face identity and gameplay silhouette.
- Exported glTF/GLB preserves transforms, hierarchy, materials, textures, sockets and animation clips.
- Character loads in an isolated test scene at expected scale.
- Rights/provenance are recorded and reviewed.
- Human art and technical sign-off is recorded.

## 7. Decisions still required
- Confirm whether sample-prompt designs supersede or explore earlier approved Seeker and Guardian concepts.
- Confirm story mapping of Forest Guardian versus Forest Sentinel.
- Approve Meera's final age range, costume and face design.
- Choose and validate actual 3D toolchain; MetaHuman is a candidate, not a locked dependency.
- Decide whether 3D is for cinematics/reference only or a future playable release.
- Approve target renderer, browser/device budgets and whether a Three.js proof is justified.
