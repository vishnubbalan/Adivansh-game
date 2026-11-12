# Chapter One Character Concept Approval

**Status:** Approved as the visual direction for production development  
**Approval recorded:** 2026-11-12  
**Scope:** The Seeker (playable hero) and Forest Guardian (Chapter One guardian)

## Approved direction

The user approved both generated concept designs as shown, with no requested visual revisions.

### The Seeker

Retain the concept's:
- Ancient Indic-inspired heroic fantasy styling and practical layered clothing
- Cream and earth-tone garments, green detailing, leather equipment, bronze accents
- Distinctive red-orange scarf and spiral medallion
- Dark tousled hair and expressive, readable face
- Agile silhouette suitable for running, jumping, climbing, stealth and melee combat

### Forest Guardian

Retain the concept's:
- Monumental forest sentinel silhouette built from stone, roots, wood, moss and foliage
- Branch-like antlers, carved armor details and bronze-gold ornaments
- Restrained luminous teal runes and eyes
- Red cloth accent to distinguish the silhouette
- Heavy, clearly telegraphed attacks with readable wind-up, impact and recovery poses

## Production constraints

These are approved **concept references**, not production sprite sheets or final in-game assets. Do not slice the concept-sheet panels directly into animation frames.

Before integration, create or commission a production asset pack with:
1. Consistent orthographic character turnarounds and locked proportions.
2. Separate transparent-background character renders.
3. Frame-by-frame animation atlases with documented frame dimensions, pivots, frame rates and event markers.
4. Separate hitbox/hurtbox and gameplay silhouette guides.
5. Exported, optimized runtime assets and source-art provenance records.

Required Seeker animation states: idle, run, jump, fall, land, attack, hurt, interact and defeat.

Required Guardian animation states: idle, telegraph, attack, recovery, hurt, stagger and defeat.

## Rights and review

Record the origin, tool/workflow, generation or commission details, human edits, applicable terms and approval for every shipped asset in the asset register. Generated concept art alone does not establish commercial-use rights for every downstream asset or third-party element. Complete rights review before release.

## Next implementation gate

Produce a small technical proof containing:
- Seeker idle, run and attack animations
- Guardian idle, telegraph and one attack animation
- One representative Whispering Forest background layer

Integrate the proof into a disposable/test scene first. Review visual consistency, animation readability, mobile scale, memory/performance and collision alignment before replacing the Chapter One scene assets.

No gameplay implementation or production asset integration is implied by this approval record.
