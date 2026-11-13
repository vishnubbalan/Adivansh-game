# Season 3 Design — The Endless Ocean

> Design reference for Chapters 51–75 (R3). Not for active implementation until R2 ships.
> NOTE: Water rendering spike should begin during R2 development cycle. See VFX_PRODUCTION_SYSTEMS.md §3.1.

---

## Season Overview

The ocean is not a crossing — it is a civilisation. The coastal peoples, the sea creatures, the sunken kingdoms, the weather systems: all of it has a life the hero has no claim on. He arrives on the shore with a mission and finds an entire world that has been here without him.

The structural centrepiece of Season 3 is the bridge. In the Ramayana, Rama's allies build a bridge of stones that float. Here the bridge is built by covenant: the Ocean Spirit grants the ability to lay anchor-stones that chain together, using the bridge's own weight and the sea's blessing to hold. The bridge becomes the season's visible progress meter — players can see it extending across the ocean as they play.

**Visual palette:** Deep teal water, jade shallows, coral orange/pink, storm grey, bioluminescent blue-green  
**Lighting:** High contrast at surface (harsh sunlight or storm), soft diffuse underwater, point lights from bioluminescence  
**Audio signature:** Ocean waves constant (varying by weather), underwater filter in sea sections, storm audio during weather chapters

---

## The Three Sub-Environments

### 1. The Coastal Region (Chapters 51–58)
The shoreline and near-shore waters. Coastal civilisations (fishing villages, old port ruins, coral reef shallows). The hero is out of his depth culturally and literally — he cannot swim long distances yet.

### 2. The Deep Ocean (Chapters 59–69)
Open water. The bridge extends across this section. Leviathan territory. The Ocean Spirit's domain. Mechanically the richest section of Season 3: naval encounters, underwater sections, current surfing, storm survival.

### 3. Ashura's Approach (Chapters 70–75)
The last stretch before the island. The sea becomes darker and more hostile — Mahaksha's ward is in effect here. The final section involves breaking through his barrier and landing.

---

## Key Chapter Designs

### Chapter 53 — Beneath the Waves
First underwater section. Introduces breath timer (60 seconds before surfacing required), underwater movement (slower, floatier, 8-directional), and the visual transformation of colour.  
**Design note:** The underwater section must immediately feel different — the audio filter, the colour grade, the physics change. Players should feel genuinely immersed.  
**Air pocket system:** Some underwater sections have air pockets (bubbles rising from vents) where the hero can replenish breath without surfacing.

### Chapter 55 — The Sunken Palace
Season 3's first full dungeon. An ancient palace of the coastal civilisation is now completely underwater. The dungeon is split between partially flooded rooms (breath timer active) and fully dry rooms (accessed through sealed airlocks).  
**Key puzzle:** Ancient water channels can be redirected to drain rooms, making previously flooded areas walkable. These same channels can be used to flood rooms for traversal.

### Chapter 59 — Leviathan Rising
The ocean's apex creature. The hero is traversing on the ocean surface (a makeshift raft section) when the Leviathan surfaces beneath them. Phase 1 of a two-phase fight (Phase 2 is Chapter 75).  
**Phase 1 mechanics:** Fight from the surface of the raft. The Leviathan attacks with tail sweeps, head strikes, and submerge/emerge attacks. The hero cannot go underwater during this fight — the Leviathan is too fast there.  
**Phase 1 ends:** The Leviathan submerges and retreats. The Ocean Spirit appears.

### Chapter 61 — The Ocean Spirit
The Ocean Spirit is ancient, vast, and entirely neutral — it does not care about the hero's mission. The meeting is a test of character, not combat. The Spirit presents three trials:  
1. **Physical:** survive a minute underwater without air pockets
2. **Knowledge:** answer three questions about the sea (answers found in lore fragments throughout Season 3)
3. **Character:** what will the hero sacrifice for the bridge? (Story choice — sacrifice is symbolic, not mechanical)  

**The covenant:** The Spirit grants the bridge-building ability. It also gives the hero a vision of Meera, confirming she is alive and that Mahaksha has not yet gotten what he wants from her.

### Chapter 63 — Naval Armada
Mahaksha knows the bridge is being built and sends his naval forces. This chapter introduces naval combat: the hero is on the Ocean Spirit's vessel, defending it from multiple attack ships. New mechanic: cannon targeting system, boarding repulsion.  
**Scale:** The largest combat encounter in the game to this point. Overwhelming in the best way.

### Chapter 64 — Port of Shadows
Mahaksha controls the only remaining major port between the bridge's start and the island. The hero must infiltrate it to sabotage the naval supply line.  
**First full stealth section:** Sight cones, alert states, cover positions. This teaches the stealth system before it becomes the dominant mechanic in Season 4.

### Chapter 65 — The Kraken's Lair
The Kraken is not an enemy of the hero — it has been captured and controlled by Mahaksha's forces, used to attack vessels trying to cross. Freeing it is the objective, not killing it.  
**Boss mechanics:** The fight is against the Mahaksha-branded collar device on the Kraken (a structure), while the Kraken's tentacles (environmental hazards, not HP-based enemies) constantly disrupt the arena. Free the collar: Kraken becomes neutral and retreats.

### Chapter 66 — Building the Bridge
The bridge-building mechanic enters its main phase. The hero places anchor-stones (found/crafted from materials in the ocean chapters) across the water. Each anchor-stone creates a bridge segment that persists across sessions.  
**Visual:** Each placed stone creates a chain of light connecting to the previous one. The bridge is visible in the background of ocean chapters, growing longer over the course of the season.  
**Mechanic:** Each chapter from 66–70 has at least one bridge segment to place as part of the chapter objective.

### Chapter 72 — Song of the Sirens
Unique mechanic chapter. Siren spirits guard a passage and attack travellers with a hypnotic melody. The hero must resist by responding with the correct musical patterns.  
**Mechanic:** The siren plays a melody (3–5 notes). The player responds using directional inputs (each direction = a note). Match the melody: the siren is satisfied and stands aside. Fail three times: combat.  
**Design note:** This is a rhythm/music mini-game. Easy mode has 3-note phrases. Standard mode has 5-note phrases. Players who hate rhythm games can fight their way through on the third failed attempt.

### Chapter 73 — Shattering the Ward
Mahaksha has erected a magical ward around the approach to Ashura — a barrier that repels all vessels. The hero must use the Ocean Spirit's blessing to break through.  
**Mechanic:** A series of ward anchor points must be destroyed in sequence (they power each other). Each anchor is guarded. Breaking a ward creates a shockwave that damages nearby enemies. The order of destruction matters (marked by a visual connection line between anchors).

### Chapter 75 — Gates of the Dark City (Season 3 Final Boss)
**Leviathan Phase 2:** The Leviathan returns, now fully revealed. What was threatening in Phase 1 is now experienced fully.  
Phase 1 recap: Same arena, but the hero now has more tools.  
Phase 2 (true form): The Leviathan reveals it has been partially corrupted by Mahaksha — explaining its aggression. The hero must strike the corruption source (a node on its neck) while the creature is in its final dive pattern.  
Phase 3: Freed from corruption, the Leviathan becomes an ally momentarily — it rams the gates of Ashura's outer sea wall, creating the breach through which the hero enters.  
**Season end:** The hero stands on the shore of Ashura as the gates collapse. The island is as dark as promised. Season 3 ends.

---

## Season 3 New Mechanics Summary

| Mechanic | Introduced | Description |
|---|---|---|
| Underwater movement | Chapter 53 | 8-directional, breath timer, air pockets |
| Ocean current surfing | Chapter 56 | Grab current, travel direction/speed |
| Naval combat | Chapter 63 | Cannon targeting, boarding repulsion |
| Stealth foundation | Chapter 64 | Sight cones, cover, alert states |
| Bridge building | Chapter 66 | Anchor-stone placement, persistent progress |
| Music puzzle | Chapter 72 | Melody matching with directional inputs |
| Ward destruction | Chapter 73 | Sequential target priority |

---

## Water Rendering Technical Note

The ocean water surface is the most technically demanding single element in Season 3. Before R3 development begins, the Technical Architect must complete a performance spike:

1. Implement FFT wave simulation shader OR simplified Gerstner wave approach
2. Measure on Chrome mid-range Android: target ≥ 60fps with water surface active
3. If neither approach hits 60fps, fall back to animated texture (sprite-sheet wave)
4. Document decision as an ADR before Season 3 implementation begins

The ocean must look good enough to earn "awe" from the player. A sprite-sheet fallback is acceptable only if the visuals still meet the competitive quality bar on the target devices.
