# Meera Devi — Chapter One Character Production Sheet

**Asset ID:** CHR_MEERA  
**Revision:** 1.0 concept-to-model handoff  
**Status:** Provisional production reference; human design approval required before high-resolution sculpt lock  
**Narrative source:** Chapter One — The Last Harvest Festival  
**Visual authority:** `CHARACTER_MODELING_SPEC.md`, `CHARACTER_BIBLE.md`, and `ART_DIRECTION.md`

## 1. Design intent

Meera is Queen of Veyra in the Chapter One presentation and a trusted, active leader. At the festival she reviews the harvest ledger, listens to elders, resolves a grain-allocation concern and calmly interprets the messenger's warning. Her design must communicate intelligence, compassion, strategic judgement and physical capability. She is not a passive reward or ornamental royal figure.

The Indo–East Asian blend should be a coherent fictional design synthesis:
- Indic foundation: practical handloom sari, blouse, pallu, restrained antique jewellery and woven border craft.
- East Asian craft influence: refined silk-weave geometry, subtle cloud/wave border patterns, elegant hair fastenings, lacquered manuscript fittings and restrained architectural/craft detailing.
- Keep symbols original and non-religious. Avoid direct copies of sacred iconography, canonical Ramayana costume designs or historical royal regalia.

## 2. Identity and approved anchors

Preserve the current character brief:
- Warm golden-brown skin with natural tonal variation.
- Intelligent dark eyes and nuanced brow performance.
- Long dark hair in a side braid with jasmine and a few marigold accents.
- Small nose stud and one delicate antique earring; avoid excessive jewellery.
- Ivory and muted-red handloom sari with a faded gold border.
- Brass medallion on a cord with original protective geometry.
- Subtle ink stain on fingertips.
- Refined quality should signal her role; no crown or heavy regalia is required for the festival.

The concept-sheet face, age range and exact facial features are provisional. Keep one consistent identity across turnaround and expressions. Do not make her more fragile or reduce her stature to communicate femininity.

## 3. Proportion blockout (provisional)

| Measurement | Target | Notes |
|---|---:|---|
| Standing height | 1.66 m | Ground to skull; exclude braid and flowers |
| Head-to-body | 7.25–7.5 heads | Natural adult proportions |
| Shoulder width | 2.0–2.2 head widths | Balanced, capable silhouette |
| Pelvis width | 1.45–1.6 head widths | Natural stance and walking |
| Hand length | approx. face length | Writing/manuscript grip validation |
| Foot length | approx. 1.4 head lengths | Practical footwear |
| Neutral pose | relaxed A-pose | Arms 30–40 degrees from torso |

All values are provisional blockout guides, not locked canon. Fit the model to the approved face and full-body silhouette before sculpt detail. Use one measured base mesh for all views.

## 4. Turnaround requirements

Render the same model in:
1. Front orthographic, neutral A-pose.
2. Left side orthographic, neutral A-pose.
3. Back orthographic, neutral A-pose.
4. Optional front three-quarter portrait.

All views must use identical scale, pose, ground contact and orthographic framing. Face +Y, up +Z, character-left +X. Include full sari hem, footwear, braid and flower ornaments in the appropriate views. Keep props on separate layers so body and garment proportions remain measurable.

Lock sari pleat count, pallu attachment, blouse seam placement, braid route and ornament positions across front/side/back. A side view must show pallu thickness and secure shoulder attachment; the back view must show braid length and hair ornament placement.

## 5. Anatomy and sculpt plan

- Realistic adult anatomy with natural shoulder, elbow, wrist, pelvis, knee and ankle landmarks.
- Balanced build; avoid stylised fragility or exaggerated hourglass proportions.
- Hands must support writing, turning manuscript leaves, holding a ledger and manipulating a small object.
- Feet have heel, arch, ball and toe definition; footwear is a separate mesh.
- Face: realistic eyelid thickness, brows, nose, lips, ears and jaw; preserve subtle asymmetry.
- Eyes: dark, intelligent and expressive; brow movement is central to her performance.
- Hair: separate scalp, braid masses/curves, woven hair ties and flower objects. Flowers are separate meshes/instances, not fused into the scalp.
- Keep face, hands and expression readable at close camera distance.

## 6. Costume construction — separate Blender objects

Build in layers, inside to outside:

| Layer / object | Construction and movement |
|---|---|
| `CHR_MEERA_body_high` | Anatomical body; separate face/eyes/teeth as needed |
| `CHR_MEERA_blouse` | Ivory or muted-red handloom blouse, realistic seams and arm mobility |
| `CHR_MEERA_sari_base` | Main sari body with secure waist wrap and practical pleats |
| `CHR_MEERA_pallu` | Shoulder drape anchored securely; restrained secondary motion |
| `CHR_MEERA_shawl_optional` | Optional separate shawl; omit if it obscures ledger interaction |
| `CHR_MEERA_waist_tie` | Concealed practical tie and small storage loop if approved |
| `CHR_MEERA_medallion` | Separate brass medallion on cord; original protective geometry |
| `CHR_MEERA_jewellery` | Small nose stud, one earring, simple bracelet/anklet; keep low count |
| `CHR_MEERA_hair_braid` | Separate braid mesh/curves and hair ties |
| `CHR_MEERA_flowers` | Separate jasmine and limited marigold pieces; natural matte response |
| `CHR_MEERA_footwear` | Practical sandals/footwear; toe and ankle articulation preserved |
| `CHR_MEERA_satchel` | Optional cloth satchel for herbs/notes; separate attachable prop |

The sari must be elegant and secure for walking, turning, writing and reaching. Pleats should not intersect thighs or knees. Pallu must not obscure the face, hands or ledger. Avoid excessive trailing cloth and heavy crown-like accessories.

## 7. Materials and palette

| Material ID | Base appearance | Surface response |
|---|---|---|
| `MAT_MEERA_skin` | Warm golden-brown, natural variation | Soft skin roughness and subtle SSS; no waxy sheen |
| `MAT_MEERA_sari_ivory` | Ivory / unbleached warm cream | Matte handloom fibre, fine weave |
| `MAT_MEERA_sari_muted_red` | Muted crimson / terracotta red | Woven silk-cotton; restrained sheen |
| `MAT_MEERA_border_gold` | Faded antique-gold thread | Metallic only where actual metallic thread is visible; mostly woven |
| `MAT_MEERA_brass` | Aged brass medallion | Subtle metallic response, engraved original geometry |
| `MAT_MEERA_jewellery` | Restrained antique gold | Small highlights; avoid mirror-like gold |
| `MAT_MEERA_hair` | Dark black-brown | Strand breakup and natural highlights |
| `MAT_MEERA_flower` | Jasmine ivory / marigold ochre | Matte organic petals |
| `MAT_MEERA_satchel` | Natural woven fibre / muted leather | High roughness, edge wear |

Use PBR metal/roughness. Keep lighting out of Base Color. Base Color is sRGB; normal, roughness, metallic and AO are linear. Keep the medallion's engraved motif original and non-religious. The Indo–East Asian blend appears in textile pattern design, knot/fastener craft and refined object detailing—not in an arbitrary mixture of unrelated garments.

## 8. Props and Chapter One story use

Required or useful separate props:
- Harvest ledger with simple non-readable placeholder marks until approved writing is supplied.
- Palm-leaf manuscript bundle and rolled records.
- Small writing stylus/brush and ink container, if scene interaction requires them.
- Brass medallion.
- Optional cloth satchel with herb bundle; not required for the festival dialogue.
- Messenger map is a separate scene prop, not permanently attached to Meera.

Do not use pseudo-text as final readable writing. The golden-thread clue VFX is a separate effect layer and must not be baked into skin, sari or jewellery. Add a deliberate clue-studying pose only for later story content; Chapter One's core pose is reviewing a ledger and responding thoughtfully to the messenger.

## 9. Facial expression reference

Use one head mesh, one camera and consistent lighting for: composed neutral, attentive listening, warm restrained smile, analytical focus, controlled concern, quiet resolve, compassion and strategic confidence. Avoid exaggerated cartoon expressions.

Minimum facial control groups: brow raise/lower, inner brow, blink, squint, cheek raise, lip corner, jaw open, lip press and asymmetric expression controls. Expression must support listening, reading, speaking and private conversation.

## 10. Rigging and deformation tests

Humanoid rig with root, pelvis, spine, chest, neck, head, clavicles, arms, hands/fingers, thighs, calves, feet and toes. Add IK/FK arm and leg controls. Keep braid, flowers, medallion, pallu and optional shawl as separate controlled attachments.

Required tests: neutral A-pose, writing at ledger, holding manuscript, turning a page, reaching, walking quickly, torso twist, seated/standing transition if required, restrained struggle for later chapters and composed negotiation. Validate sari/pallu collisions during arm raise, torso twist, walk and crouch. Do not author struggle animations as Chapter One content.

## 11. Blender scene and naming

- Metric units, Unit Scale 1.0; ground at Z=0.
- Character forward +Y, up +Z, character-left +X.
- Origin at midpoint between feet; separate armature root.
- Collections: `01_REFERENCE`, `02_BLOCKOUT`, `03_SCULPT_HIGH`, `04_RETOPO_GAME`, `05_CLOTH_HAIR_PROPS`, `06_RIG`, `07_LIGHTS_CAMERAS`, `08_EXPORT`.
- Names use stable lowercase snake_case and `CHR_MEERA_*`, `MAT_MEERA_*`, `RIG_MEERA_main`, `SOCK_MEERA_medallion`, `SOCK_MEERA_satchel`.

## 12. Technical targets and delivery gates

- High sculpt remains non-destructive with body, face, hair, sari, jewellery and props separated.
- Game mesh: quad-dominant deformation topology; provisional LOD0 35k–65k triangles, LOD1/2 around 50%/20% (profile before locking).
- Texture starting point: 4K face/body cinematic source; 2K sari/costume sets; 1K/2K accessories. Reduce only after browser/device profiling.
- Export candidate: glTF 2.0/GLB only after target renderer decision.
- Required evidence: matched front/side/back views, face close-up, topology screenshots, UVs, bake review, bind pose, weight tests, animation previews, GLB re-import, provenance and licence review.

**Do not mark sculpted, rigged, game-ready or integrated until actual source files and validation evidence exist.**
