# Adivansh — Chapter One Character Production Sheet

**Asset ID:** CHR_ADIVANSH  
**Revision:** 1.0 concept-to-model handoff  
**Status:** Provisional production reference; human design approval required before high-resolution sculpt lock  
**Narrative source:** Chapter One — The Last Harvest Festival  
**Visual authority:** `CHAPTER_ONE_CHARACTER_CONCEPT_APPROVAL.md`, `ART_DIRECTION.md`, and `CHARACTER_MODELING_SPEC.md`

## 1. Design intent

Adivansh is the approachable, observant young Seeker who arrives at Veyra's harvest festival without a royal procession. He is disciplined and capable, but his first-chapter identity is helpful, curious and connected to ordinary people. His silhouette must read as agile and grounded rather than heavily armoured.

The requested Indo–East Asian blend is expressed through **fictional cultural design synthesis**, not biological or racial shorthand:
- Indic foundation: dhoti-inspired lower wrap, angavastram-like shoulder drape, woven borders, practical leather harness and bronze ornament.
- East Asian craft influence: restrained cloud/wave-inspired border geometry, refined lacquered fittings, woven knot closures and carefully shaped wood/bamboo bow details.
- Keep motifs original. Do not copy sacred symbols, canonical Ramayana costumes, real royal insignia or recognisable historical uniforms.

## 2. Identity and approved visual anchors

Preserve the previously approved Seeker concept:
- Layered cream and earth-tone garments with deep-green detailing.
- Distinctive rust/red-orange shoulder scarf.
- Leather equipment and aged-bronze accents.
- Spiral Veyra medallion.
- Dark, slightly tousled hair with a tied-back warrior section.
- Lean, agile and readable silhouette.

The newer concept explorations show a more controlled topknot and a faint left-eyebrow scar. Treat these as **provisional refinements**, not locked canon until the human owner approves them. Avoid adding a prominent forehead mark or changing the approved palette without approval.

## 3. Proportion blockout (provisional)

| Measurement | Target | Notes |
|---|---:|---|
| Standing height | 1.78 m | Ground to skull; exclude hair and cloth |
| Head-to-body | 7.5–7.75 heads | Realistic heroic proportion |
| Shoulder width | 2.3–2.5 head widths | Athletic, not bodybuilder |
| Pelvis width | 1.45–1.6 head widths | Supports running and crouching |
| Hand length | approx. face length | Verify bow grip and finger articulation |
| Foot length | approx. 1.45 head lengths | Sandal/footwrap variant |
| Neutral pose | relaxed A-pose | Arms 30–40 degrees from torso |

These values are blockout guides, not anatomical claims. Fit proportions to the approved face and silhouette before sculpt detail. Use the same measured body mesh for front, side and back views.

## 4. Turnaround requirements

Create a single locked model and render:
1. Front orthographic, neutral A-pose.
2. Left side orthographic, neutral A-pose.
3. Back orthographic, neutral A-pose.
4. Optional front three-quarter beauty view.

**Camera contract:** orthographic cameras; identical focal framing, ground contact, scale and pose; camera target at sternum height; no perspective distortion. Character faces +Y, +Z is up, +X is character-left. Show feet and top of head in every full-body view. Keep bow and quiver on separate prop layers so body proportions remain measurable.

Asymmetry must remain consistent: scarf tail, harness routing, quiver placement, medallion position and any approved eyebrow scar must appear on the correct side in all views.

## 5. Anatomy and sculpt plan

- Lean functional musculature: defined shoulders, back, forearms, core and legs; no exaggerated superhero mass.
- Natural clavicle, scapula, elbow, wrist, pelvis, knee and ankle landmarks.
- Hands have five distinct digits, opposing thumb and clean bow-grip deformation.
- Feet include heel, arch, ball and toes; validate sandals and foot wraps without changing leg length.
- Face: natural jaw, cheek planes, layered eyelids, realistic ears/nose/lips and dark-brown eyes.
- Hair: separate scalp, groom/curves for source sculpt and runtime cards/strips later; keep eye line and bow hand clear.
- Facial asymmetry should be subtle and human. Do not use ethnicity as a shortcut for facial design.

## 6. Costume construction — separate Blender objects

Model in this order, inside to outside:

| Layer / object | Construction and movement |
|---|---|
| `CHR_ADIVANSH_body_high` | Anatomical body; separate head/teeth/eyes where needed |
| `CHR_ADIVANSH_tunic_inner` | Breathable cream cotton/linen underlayer; fitted enough for movement |
| `CHR_ADIVANSH_dhoti_base` | Cream/earth lower wrap with gathered folds; secure waist and split-safe leg volume |
| `CHR_ADIVANSH_angavastram` | Deep-green or muted earth shoulder cloth; stable attachment at shoulder/chest |
| `CHR_ADIVANSH_scarf_rust` | Red-orange scarf; controlled tail, cloth thickness and secondary-motion rig |
| `CHR_ADIVANSH_harness_leather` | Cross-body bow harness with stitched straps and buckles; no shoulder/arm clipping |
| `CHR_ADIVANSH_bracers` | Layered leather forearm guards with bronze reinforcement |
| `CHR_ADIVANSH_belt_pouches` | Belt, small utility pouches and secure ties; avoid noisy dangling parts |
| `CHR_ADIVANSH_medallion` | Separate spiral Veyra medallion on cord; original non-sacred design |
| `CHR_ADIVANSH_footwraps` | Shin/ankle wraps and sandals; preserve toe and ankle articulation |
| `CHR_ADIVANSH_hair` | Separate hair masses/groom; woven tie and loose strands |
| `CHR_ADIVANSH_bow`, `CHR_ADIVANSH_quiver` | Separate attachable props with documented grip and back sockets |

**Chapter One loadout:** this is a peaceful, non-combat chapter. The bow/quiver may be carried as character identity props only if the scene direction confirms them; do not add attack animations or imply combat gameplay in this chapter. The story opening mentions a sheathed sword, but the current character spec says optional sword only when the Chapter One loadout is confirmed. Keep sword out of the base model until the owner explicitly locks that choice.

## 7. Materials and palette

| Material ID | Base appearance | Surface response |
|---|---|---|
| `MAT_ADIVANSH_skin` | Natural warm brown, nuanced undertones | Soft skin roughness variation; subtle SSS, no waxy gloss |
| `MAT_ADIVANSH_cloth_cream` | Warm ivory / unbleached cotton | Matte woven fibre, visible weave at close range |
| `MAT_ADIVANSH_cloth_green` | Deep forest/jade green | Woven silk/cotton blend, restrained sheen |
| `MAT_ADIVANSH_scarf_rust` | Rust / red-orange | Slightly richer woven cloth; patterned edge only |
| `MAT_ADIVANSH_leather` | Dark umber | Mid/high roughness, edge wear and stitching |
| `MAT_ADIVANSH_bronze` | Aged bronze | Metallic response, directional fine scratches |
| `MAT_ADIVANSH_hair` | Dark brown-black | Strand breakup; avoid opaque helmet-like mass |
| `MAT_ADIVANSH_bow_wood` | Dark warm wood | Satin wood grain; subtle lacquered details |

Use PBR metal/roughness. Base Color must not contain baked lighting. Base Color is sRGB; roughness, metallic, AO and normal are linear data. Use separate ORM only after renderer validation. The East Asian craft influence should appear in small woven geometry, knotwork and restrained lacquer detail, not as a costume swap.

## 8. Facial expression reference

Create the same head mesh and camera for: neutral-observant, focused/determined, curious/questioning, restrained concern, restrained joy, resolute. Expressions must be achievable with the intended facial rig/shape keys, not separate redesigned faces.

Minimum shape-key/control groups: brow raise/lower, inner brow, blink, squint, cheek raise, lip corner, jaw open, lip press and asymmetrical smile. Keep eye direction and head scale consistent across expression renders.

## 9. Rigging and deformation tests

Humanoid rig: root, pelvis, spine, chest, neck, head, clavicles, upper/lower arms, hands/fingers, thighs, calves, feet/toes. Include IK/FK for arms and legs, bow grip socket on left hand, draw-hand contact target, quiver socket and scarf secondary controls.

Required deformation checks: A-pose, deep run stride, jump, landing crouch, overhead reach, bow hold/draw, interact kneel and torso twist. Inspect scarf, dhoti folds, harness, bracers and quiver for clipping. Do not build combat clips as Chapter One requirements.

## 10. Blender scene and naming

- Metric units, Unit Scale 1.0; ground at Z=0.
- Character forward +Y, up +Z, character-left +X.
- Origin at midpoint between feet; separate named armature root.
- Collections: `01_REFERENCE`, `02_BLOCKOUT`, `03_SCULPT_HIGH`, `04_RETOPO_GAME`, `05_CLOTH_HAIR_PROPS`, `06_RIG`, `07_LIGHTS_CAMERAS`, `08_EXPORT`.
- Names use stable lowercase snake_case and `CHR_ADIVANSH_*`, `MAT_ADIVANSH_*`, `RIG_ADIVANSH_main`, `SOCK_ADIVANSH_bow_l`, `SOCK_ADIVANSH_quiver`.

## 11. Technical targets and delivery gates

- High sculpt: non-destructive source; body, face, hair, cloth, leather, metal and props remain separable.
- Game mesh: quad-dominant deformation topology; provisional LOD0 35k–65k triangles, lower LODs around 50% and 20% (profile before locking).
- Texture starting point: 4K face/body cinematic source; 2K costume sets; 1K/2K accessories. Reduce only after browser/device profiling.
- Export candidate: glTF 2.0/GLB only after target renderer decision; no runtime integration implied.
- Required evidence: front/side/back matched turnarounds, face close-up, topology screenshots, UVs, bake review, bind pose, weight tests, animation previews, GLB re-import, provenance and licence review.

**Do not mark sculpted, rigged, game-ready or integrated until actual source files and validation evidence exist.**
