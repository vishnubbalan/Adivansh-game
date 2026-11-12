# Chapter One Character Concept Approval

**Status:** Approved as the visual direction for production development  
**Approval recorded:** 2026-11-12  
**Scope:** The Seeker (playable hero) and Forest Guardian (Chapter One guardian)

The user approved both generated concept designs as shown, with no requested visual revisions.

## The Seeker

Retain the concept's original ancient Indic-inspired heroic fantasy styling; practical layered cream and earth-tone garments with green detailing; leather equipment and bronze accents; distinctive red-orange scarf and spiral medallion; dark tousled hair; and agile, readable silhouette for running, jumping, climbing, stealth and melee combat.

## Forest Guardian

Retain the monumental forest-sentinel silhouette built from stone, roots, wood, moss and foliage; branch-like antlers; carved armor details and bronze-gold ornaments; restrained luminous teal runes and eyes; red cloth accent; and heavy attacks with readable wind-up, impact and recovery poses.

## Production constraints

These are approved **concept references**, not production sprite sheets or final in-game assets. Do not slice concept-sheet panels directly into animation frames.

Before integration, create a production pack with:
1. Consistent turnarounds and locked proportions.
2. Separate transparent-background character renders.
3. Frame-by-frame animation atlases with documented frame dimensions, pivots, frame rates and event markers.
4. Hitbox/hurtbox and gameplay-silhouette guides.
5. Optimized runtime exports and source-art provenance records.

Required Seeker states: idle, run, jump, fall, land, attack, hurt, interact and defeat.

Required Guardian states: idle, telegraph, attack, recovery, hurt, stagger and defeat.

## Rights and review

Record origin, tool/workflow, generation or commission details, human edits, applicable terms and approval for every shipped asset in the asset register. Generated concept art alone does not establish commercial-use rights for every downstream asset or third-party element. Complete rights review before release.

## Next implementation gate

Create a small technical proof with Seeker idle/run/attack, Guardian idle/telegraph/one attack, and one representative Whispering Forest background layer. Integrate into a test scene first. Review visual consistency, animation readability, mobile scale, memory/performance and collision alignment before replacing Chapter One scene assets.

This approval record does not imply gameplay implementation or production asset integration.
