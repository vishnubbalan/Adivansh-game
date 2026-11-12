# Chapter One — Asset Inventory and Production Art Brief

**Status:** Production-planning baseline; no new artwork is claimed as commissioned, approved or integrated by this document.  
**Audit basis:** `src/scenes/ForestScene.ts` on the current main branch, plus the approved art direction, character bible, environment/VFX bible, asset pipeline and asset-rights policy.  
**Target:** The Whispering Forest vertical slice.

## 1. Executive finding

The current scene builds its hero, demon, clue and spark textures at runtime using Phaser Graphics. The forest, distant temple, platforms, shrine, ruins, vines, particles, waterfall, mist and foreground decoration are also drawn procedurally or assembled from primitive shapes. This provides a working visual prototype but is not a production illustration pipeline.

The repository currently has no dedicated `public/assets` or `assets` directory in the audited tree. Before asset production, establish a versioned source/export structure and an asset register. Existing runtime texture keys (`hero`, `demon`, `clue`, `spark`) are compatibility points to preserve or migrate deliberately.

**Do not remove the procedural fallback until the replacement asset is loaded, rendered, collision-aligned, reviewed at desktop/mobile sizes and covered by tests.**

## 2. Current implementation inventory

| Runtime element | Current implementation observed | Production replacement | Priority |
|---|---|---|---|
| Playable hero (`hero`) | Phaser Graphics texture: body, clothing, head, ornament, arm and sword; one static texture | Original character turnaround, silhouette, material/palette sheet, animation atlas and separate gameplay collision body | P0 |
| Guardian/demon (`demon`) | Phaser Graphics texture with body, head, horns and eyes; one static texture | Original guardian design and idle, telegraph, attack, recovery, hurt and defeat animations | P0 |
| Golden clue (`clue`) | Simple radial glow and geometric star/diamond | Distinct story relic / golden-thread visual with idle pulse, reveal and collection states | P0 |
| Ambient spark (`spark`) | Single small Graphics circle used by particle emitter | Designed firefly/ember atlas or lightweight particle texture | P1 |
| Sky, ridges and canopy | Graphics rectangles, polygons and repeated circles across world width | Painted layered background plates with parallax, atmospheric depth and seamless joins | P0 |
| Temple silhouette | Rectangles and triangle silhouette | Original distant architectural landmark; visually coherent with fictional world design | P1 |
| Waterfall and pool | Translucent rounded rectangles and ellipse | Layered water/waterfall illustration with restrained animation | P1 |
| Ground/platforms | Rectangle collision objects plus simple green top strip and gold line | Modular terrain/tileset with art-matched collision metadata; collision remains independent of decorative art | P0 |
| Forest decoration | Repeated ellipses, graphics vines and leaf shapes | Modular roots, trees, foliage, hanging vines, moss, stones and foreground framing assets | P1 |
| Shrine | Runtime container of polygonal stone, lines, vines, glow and text glyph | Hero landmark illustration with layered stonework, readable relic socket, animated light/reveal | P0 |
| Ruins/pillars | Basic rectangles and ellipse rings | Reusable carved stone pillars, broken masonry and environmental storytelling props | P2 |
| Slash VFX | Runtime graphics arc and circle | Hand-authored or reviewed weapon-trail frames/particles, with clear active window and mobile fallback | P1 |
| Hit feedback | Tint, knockback and camera shake | Character hit reaction animation, impact burst and restrained camera feedback | P1 |
| Guardian defeat | Sprite disabled after health reaches zero | Authored defeat animation and reward/story reveal beat | P0 |
| UI and prompts | DOM/CSS HUD plus Phaser text/status elements (not a substitute for gameplay art) | Review UI typography, icon family, objective and interaction prompt; keep text accessible and responsive | P1 |

This is a code-level inventory, not a visual approval. It does not establish that any current asset is artistically final.

## 3. Character art briefs

### 3.1 The Seeker — playable hero

**Role and feel:** Agile royal warrior, emotionally driven by the search for the queen. The design should communicate capable movement, discipline and urgency—not a generic armoured superhero.

**Approved direction:** Original ancient Indic / epic-era heroic fantasy styling. Use a coherent, researched vocabulary of draped garments, practical wraps, layered textiles, armlets, wrist guards, belt, greaves/sandals, protective leather/metal and restrained original ornament. Avoid copying canonical Ramayana character depictions or sacred iconography. Do not treat ethnicity or skin tone as a moral or biological specification.

**Silhouette:** Clear head/shoulder/torso/weapon read at small gameplay scale. Cloth and hair shapes must not obscure the blade or foot contact. The profile should remain recognizable when facing left or right.

**Palette/material proposal:** Deep indigo/forest-neutral cloth, muted maroon or rust accent, aged bronze/gold details, warm natural skin palette and dark hair. Treat these as a starting proposal for concept exploration, not final locked colours.

**Required deliverables:**
- Front, side and back turnaround; neutral and action silhouette.
- Face/expression sheet and material callouts.
- Gameplay sprite atlas with transparent background and consistent frame bounds.
- Idle, run, jump-rise, fall, land, attack startup/active/follow-through, hurt/knockback, interact and defeat/recovery states. If dodge/defend is not in the approved Chapter One scope, do not invent it.
- Weapon separate or clearly layered where practical, so sword trail/VFX does not distort the body animation.
- Pivot/origin, logical frame dimensions, frame rate, animation event markers and recommended collision-body dimensions.
- Left/right readability plan: authored directional frames or tested flip strategy; check asymmetric ornaments/weapon grip before mirroring.

**Animation review:** Foot contact and run cycle, jump arc readability, attack anticipation/follow-through, hurt recoil, no foot sliding at rest, no weapon/body intersections and consistent silhouette across states.

### 3.2 The Guardian — Chapter One boss

**Role and motivation:** Protector of an old route and keeper of the clue. The design must support the story idea that the guardian has a duty, oath, corruption or mistaken belief—not simply function as a culturally coded monster.

**Visual direction:** Original forest-guardian / mythic sentinel. Use a strong readable outline, grounded weight and a distinctive relic/armour/organic-material motif. Avoid generic demon shorthand based on a real religion or culture; no sacred symbols used as enemy decoration.

**Palette/material proposal:** Dark forest stone/wood, weathered bronze, muted mineral red or ember accents reserved for telegraphs. Keep eyes/weak-point/readable attack cues visible without relying on colour alone.

**Required deliverables:**
- Front/side/three-quarter concept and scale comparison against hero.
- Idle/breathing, detection/turn, telegraph for each approved attack, attack active, recovery, hit reaction, phase transition if designed, defeat and post-defeat still/pose.
- Telegraph VFX with a clear shape/motion and defined danger region.
- Hitbox and hurtbox overlay sheet, aligned to actual gameplay body rather than decorative horns/cloth.
- Animation event markers for telegraph start, active start/end, recovery start/end and defeat trigger.

**Encounter readability:** Player must identify what the guardian is about to do, where danger will occur and when it is safe to counter. Avoid simultaneous off-screen threats or VFX that hide contact geometry.

### 3.3 Story relic — Golden Thread

Create an iconic, non-generic quest object: a luminous thread/relic trace that visually connects the forest clue to the queen's passage. It should feel authored to this world and remain readable against bright and dark backgrounds.

Deliver idle, proximity/reveal, interaction/collection and journal/icon states. Include a non-colour cue (shape, motion or sound when audio is added). Ensure the pickup does not obscure its interaction target.

## 4. Environment art brief — The Whispering Forest

**Mood:** Ancient monsoon forest at dusk; beautiful but watchful. A sense of scale, mystery and an old route reclaimed by nature. Avoid visual noise that competes with platforming.

**Composition and layers:**
1. Distant sky and misty mountain/ridge silhouettes.
2. Far canopy, architectural fragments and waterfall.
3. Midground forest masses and landmarks.
4. Playable terrain, platforms, shrine, clue and guardian arena.
5. Controlled foreground trunks, roots and foliage; never obscure player/enemy silhouettes or hazards.
6. Ambient fireflies, mist, falling leaves and restrained shafts of light.
7. Gameplay VFX for attacks, telegraphs, impacts and clue reveal.

**Cultural/environment vocabulary:** Coherent fictional synthesis of researched Indian and Chinese environmental influences as specified in the art bible. For this forest, prioritize monsoon woodland, banyan-like root structures, carved stone markers, water, moss, cliff/temple fragments and layered mountain atmosphere. Do not scatter unrelated cultural motifs as decoration.

**Required environment pack:**
- Seamless or tileable far-background plates sized for the world and parallax.
- Canopy/tree masses in multiple depth layers.
- Modular trunks, roots, vines, rocks, broken road markers and foliage clusters.
- Ground/platform tiles with top/side/underside variants, corners, slopes only if gameplay needs them.
- Waterfall, pool edge and mist layers.
- Shrine landmark: base, carved stone body, relic focal point, broken pillars, vines and reveal glow.
- Combat arena dressing that frames but does not distract from guardian telegraphs.
- Foreground framing assets with narrow-screen safe-area checks.

**Gameplay readability rules:** Keep collision geometry separate from illustration. Every platform edge must visually agree with the physics surface. Keep prompts, pickups and enemies distinguishable at 390px viewport width. No foreground asset may cover an attack tell or interactable.

## 5. VFX and animation language

| Event | Visual treatment | Constraint |
|---|---|---|
| Hero attack | Short directional blade arc with clear start/end | Do not imply active damage outside the gameplay hit window |
| Confirmed hit | Compact impact spark + readable enemy reaction | Avoid full-screen flash; respect reduced-motion option if implemented |
| Guardian telegraph | Distinct warning pose plus localized shape/ground cue | Must be visible on mobile and not depend on colour alone |
| Guardian attack | Brief controlled trail/impact zone | Match authoritative hitbox exactly |
| Guardian defeat | Pose/animation then restrained release of clue energy | Milestone triggers once, not per animation frame |
| Clue discovery | Golden-thread reveal linking relic to story | Avoid hiding the object or HUD |
| Ambient life | Fireflies, mist, falling leaves, waterfall movement | Pool/reuse particles; cap count and screen coverage |

Every VFX deliverable must specify trigger, duration, screen coverage, blend mode, particle count/rate, texture size, mobile fallback and whether it can overlap a hitbox or prompt.

## 6. Technical asset contract

Before final sprite production, Developer and Technical Architect must agree:
- World units, logical frame sizes and pixels-per-unit convention.
- Hero and guardian origin/pivot and collision-body dimensions.
- Animation keys and state names matching the gameplay controller.
- Animation frame rate, loop rules and event markers.
- Texture atlas layout and maximum texture dimensions supported by target devices.
- Parallax factors and background chunking strategy.
- Asset loading/preloading and failure fallback behaviour.
- Compressed source/export formats, decoded texture-memory budget and mobile fallback.
- Deterministic test fixtures for scene state and screenshot capture.

Preserve existing keys or provide a deliberate compatibility mapping for `hero`, `demon`, `clue` and `spark`. Gameplay state and physics must not depend on decorative frame dimensions.

## 7. Proposed repository asset structure

Use this structure only after confirming the team's chosen source-file workflow. Keep editable source separate from runtime exports.

```text
art-source/
  characters/
    seeker/
    guardian/
  environments/
    whispering-forest/
  props/
    golden-thread/
    shrine/
  vfx/
  reference-and-approvals/
public/
  assets/
    characters/
      seeker/
      guardian/
    environments/
      whispering-forest/
    props/
    vfx/
    atlases/
docs/
  06-commercial/
    ASSET_REGISTER.md
```

Do not add large source PSD/Krita files to the runtime bundle. Decide whether source art lives in Git LFS or a controlled external source-art store before committing large binary files. Runtime exports should be optimized for web delivery.

## 8. Asset acceptance and rights register

No asset is production-approved until it has:
- Unique ID and runtime path.
- Source creator/vendor/tool and creation date.
- Source/editable file location and exported file hash/version.
- Licence/terms version and confirmation of commercial use, modification and redistribution permissions.
- Attribution obligations and model/tool restrictions where applicable.
- Originality and cultural review.
- Human reviewer and approval date.
- Integration PR/commit and runtime verification.
- Desktop/mobile visual review and performance notes.

AI-generated images may be used for ideation. They are not automatically exclusive, copyright-cleared or commercially safe. Human refinement, artefact inspection, rights review and provenance are mandatory. Unknown-rights assets must not ship.

## 9. Production sequence and gates

1. **Inventory and brief approval:** approve this document's asset list and design direction; select the production method (artist, commissioned work or AI-assisted concept plus human refinement). No purchase/contract is implied.
2. **Hero + guardian concept approval:** compare silhouettes at actual gameplay size; approve character sheets and animation state lists.
3. **Environment concept approval:** approve forest palette, composition, landmark and platform readability.
4. **Technical proof:** integrate one representative hero idle/run/attack set and one background slice; verify pivots, hitboxes, loading, mobile crop and performance.
5. **Production pack:** complete remaining hero/guardian states, environment modules, clue/shrine and VFX.
6. **Scene integration:** replace each placeholder incrementally, preserving a working fallback until each replacement passes.
7. **QA and art sign-off:** visual review at desktop and mobile viewports, full Chapter One E2E, human gameplay review, rights register and real-device checks.

**Gate rule:** Do not produce a full animation pack before the hero/guardian concept, animation-state contract and collision contract are approved. Do not integrate an entire background before parallax/crop and mobile texture-memory tests.

## 10. Immediate next implementation tasks

- [ ] Confirm hero and guardian visual concept direction with the human product owner.
- [ ] Decide whether art is commissioned, self-produced or AI-assisted with human refinement; confirm budget/rights constraints before external spend.
- [ ] Define exact logical sprite frame size and animation contract from the current player/enemy physics bodies.
- [ ] Create asset register and source/export folder policy.
- [ ] Produce one small integration proof (hero idle/run/attack + one forest background slice), not the entire art pack.
- [ ] Compare in-game screenshots at desktop and 390px mobile width; record performance and visual-review findings.
