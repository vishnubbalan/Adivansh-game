# Season 2 Design — The Shattered Peaks

> Design reference for Chapters 26–50 (R2). Not for active implementation until R1 ships.
> Agent team: read and plan during R1's final QA phase; implement after R1 ships.

---

## Season Overview

The mountains are where civilisations went to die. Five kingdoms rose in the peaks across the last thousand years; none survived. Their ruins — fortresses, temples, watchtowers, collapsed bridges — are layered on top of each other. The Stoneclan people live in this rubble, have always lived in this rubble, and regard everyone from below the treeline with a suspicion bordering on contempt.

Mahaksha passed through three weeks before the hero arrives. He left devastation but also, uncharacteristically, a trail of silver coins — payment to the Stoneclan for safe passage, which they accepted and now regret. The hero must navigate this political shame as much as the terrain.

**Visual palette:** Cold grey stone, distant white peaks, ancient bronze fittings, aurora green/purple at night, blood-red dawn light  
**Lighting:** Harsh directional light from above (no canopy), long shadows, cold blue ambient in shade, ember warmth in settlement interiors  
**Audio signature:** Wind dominant, echoing stone, sparse percussion, distant avalanche rumble

---

## The Three Sub-Environments

### 1. The Lower Passes (Chapters 26–33)
Ancient trade routes, now barely maintained. Stoneclan outposts at key points. The terrain teaches new mechanics: ice physics, rope bridges over chasms, updraft currents. The hero is a stranger here.

### 2. The High Mountain (Chapters 34–43)
Above the settlements, in the ruins of a kingdom nobody remembers. The weather here is active and dangerous. The Mountain's Heart dungeon sits at the centre. Mahaksha's forces are using an ancient fortress as their mountain camp.

### 3. The Summit Path (Chapters 44–50)
The final climb. The air is thin (stamina mechanic in this section). The views are impossible. The Mountain Titan guards the descent path to the ocean side.

---

## Key Chapter Designs

### Chapter 26 — First Light on Stone
Mountain entry. Teach ice physics and slope traversal. The transition from forest to mountain should feel immediate — colder, harsher, lonelier. The hero looks back at the forest for a moment. It looks impossibly far down.  
**New mechanic:** Ice surface reduces friction; angled surfaces slide the hero if moving too fast. Must slow down on ice.

### Chapter 27 — The Avalanche Road
An avalanche is triggered by Mahaksha's forces (they know the hero is behind them and use the terrain). Sprint/dodge chapter. Platforms collapse. The player has approximately 90 seconds to reach shelter. Vahana's scout ability provides 3-second advance warning of which path clears.

### Chapter 28 — Stoneclan Village
First hub of Season 2. The Stoneclan Elder (unnamed to the hero initially) is cold and hostile. The hero learns the coins story — the clan let Mahaksha pass for silver and now feel compromised. There are quests here that build reputation across the season.  
**New system:** Faction reputation — visible meter, starts low, actions improve it. Unlocks dialogue options and shortcuts.

### Chapter 32 — The Frozen Temple
Full dungeon. 5 rooms. The temple of an ancient mountain civilisation, built around a cold spring that has now frozen entirely. Puzzle: redirect heat to melt ice blocking paths. Ice can also be used offensively (freeze an enemy by redirecting heat away from them).  
**Ice puzzle mechanics:** Heat sources on rotating pipes; direct them to unlock doors or freeze/unfreeze elements.

### Chapter 34 — Alliance of Ice
After the Stoneclan reputation reaches mid-tier, the Elder offers a formal alliance. This triggers the season's political arc. The Stoneclan will provide a guide (Raka, a young scout) who becomes a temporary companion for Chapters 34–45.  
**New companion:** Raka — different abilities from Vahana. Knows every path in the mountains, can find shortcuts. Cannot fight directly but can distract enemies.

### Chapter 39 — Night of Ten Thousand Stars
A deliberate pause chapter. No combat. The hero, Vahana, and Raka camp on a mountain platform for one night. The stars are extraordinary here — clearer than anywhere below. The chapter is entirely dialogue and environmental storytelling. Raka talks about the old kingdoms. Vahana reveals something about the realm's ancient builders (seeds Season 4). The hero talks about Meera.  
**Purpose:** Emotional anchoring. Players need a breath before the second half of Season 2. This chapter should be the one players remember from the mountains.

### Chapter 40 — The Mountain's Heart
Largest dungeon in Season 2. 8 rooms. Beneath the highest peak, Mahaksha has established his mountain command. Fire and lava here — the mountain has volcanic activity the Stoneclan knew about and exploited. The dungeon teaches: heat as puzzle element, lava as environmental hazard (not instant death on contact — brief damage, knockback, invulnerability frames), Mahaksha's forces as genuine organised military.  
**Boss:** Mountain Commander (not a supernatural creature — an elite general with tactical patterns)

### Chapter 45 — Betrayal at the Summit
The story twist: the Stoneclan elder who allied with the hero has been receiving further payments from Mahaksha — not to help, but to slow the hero down. Raka discovers this and tells the hero. The betrayal is handled with nuance: the Elder is not a villain, just someone who made an increasingly bad series of pragmatic decisions. He can be confronted or forgiven; either way, the alliance holds — the clan's shame is now tied to the hero's success.  
**Mechanic:** This chapter has a time-limited choice window (the hero has 60 seconds to decide what to do after the revelation before Mahaksha's forces arrive).

### Chapter 47 — The Ancient Generals
Dual boss fight. Two stone constructs from the old kingdom, still active after a thousand years. They fight in coordination: one attacks while the other defends. The strategy: target the same general to break their pattern — if you attack the defensive one, the offensive one ignores you.  
**Phase 2:** At 50% combined HP, the two constructs merge into one faster, combined form.

### Chapter 50 — The World Below (Season 2 Final Boss)
**The Mountain Titan:** A creature of the mountain itself — not a spirit, not Mahaksha's creation, but something ancient and territorial that the summit disturbance has awakened. Three phases:  
Phase 1: Throws boulders, ground slams. Terrain deforms.  
Phase 2: Becomes partially lava-infused. Floor hazard. The fight moves to higher platforms.  
Phase 3: The Titan's core is exposed. Must be attacked while avoiding lava rain from above.  

**Season end:** Defeating the Titan reveals the descent path. The first glimpse of the ocean from this height is the visual payoff of Season 2 — it stretches to every horizon, impossibly vast. The chapter end cinematic is the hero looking at the ocean for a full 10 seconds while the season theme plays.

---

## Season 2 New Mechanics Summary

| Mechanic | Introduced | Description |
|---|---|---|
| Ice physics | Chapter 26 | Reduced friction on ice, slope slide |
| Avalanche sprint | Chapter 27 | Timed environmental chase |
| Faction reputation | Chapter 28 | Stoneclan meter, affects dialogue/paths |
| Aerial grapple | Chapter 31 | Air dash to grapple points |
| Elemental pipe puzzle | Chapter 32 | Direct heat to solve frozen temple |
| Temporary companion (Raka) | Chapter 34 | Different skills from Vahana |
| Stamina in thin air | Chapter 44+ | Shorter sprint/jump duration at altitude |
| Dual boss | Chapter 47 | Two-enemy boss coordination |

---

## Season 2 New Enemy Types

| Enemy | Description |
|---|---|
| Mountain Wolf | Pack hunter, faster than forest predators |
| Stoneclan Outcast | Former Stoneclan fighters paid by Mahaksha |
| Mountain Sentinel | Stone construct, slow, heavily armoured |
| Snow Wraith | Spirit creature, intangible until frozen by ice attack |
| Armoured Warlord | Elite human, breaks on armour-shatter attack |
| Storm Eagle | Aerial enemy, swooping attacks |
| Lava Crawler | Ground creature near volcanic sections |
| Ancient General | Dual mini-boss (stone constructs) |
| Mountain Titan | Season 2 final boss |
