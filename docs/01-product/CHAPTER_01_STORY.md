# Chapter 1 — The Last Harvest Festival
## Detailed Story and Design Document

> Status: Design complete. Implementation pending.
> This chapter is NOT yet built. The current game prototype maps to Chapters 4–5.

---

## At a Glance

| Property | Value |
|---|---|
| **Title** | The Last Harvest Festival |
| **Season** | 1 — The Whispering Forest |
| **Emotional Beat** | Joy, home, safety — this is what the hero will spend 100 chapters fighting to restore |
| **Core Mechanic** | Tutorial: movement, jumping, NPC interaction — taught as play, never as a training room |
| **New Elements** | Core controls, HUD introduction (health + energy bars), energy system activated |
| **Completion Condition** | Speak to Meera Devi at dusk and hand her the messenger's scroll |
| **Failure State** | None — this chapter has no failure condition. It is prologue. |
| **Duration Estimate** | 8–12 minutes for a first-time player |

---

## Setting

**Location:** The village of Nathula — a prosperous agricultural settlement at the edge of the great forest.
The village is terraced hillside construction: stone-walled platforms, carved wooden gates, flower garlands, oil lamps. It is harvest season. Every building is decorated with marigold strings, red cloth, and painted kolam patterns on the ground.

**Time:** Morning, rising to golden afternoon, ending at dusk.

**Atmosphere:** Warm, safe, alive. The music of the festival — drums, strings, bells — plays throughout. This is what home sounds like. When it is gone later, the silence will be its absence.

---

## Characters in This Chapter

### Adivansh (Player)
The hero is from this village. He is known here, trusted here. The festival is partly in his family's honour — his father was the village protector who died defending it years before. He carries that legacy lightly and hasn't decided yet what it means.

### Meera Devi
She arrived in Nathula six months ago with no announcement and no retinue, calling herself only a scholar and healer. The village accepted her immediately. By the time anyone thought to ask where she was from, she had already delivered three babies, cured the elder's cough, and taught the children songs from places they'd never heard of. She is the festival's spiritual centre today, chosen by the village to preside over the blessing ceremony at dusk. She knows something is coming. She has been preparing for it.

### The Village Elder (Raka)
Male, 70s, warm but perceptive. Knows the hero's family history. His dialogue reveals backstory organically. He will appear again in Chapters 24 and 39.

### The Messenger (Unnamed)
A royal court courier who collapses at the village gate at dusk with a sealed scroll. He will not appear again — he was intercepted and killed the following day by Mahaksha's advance forces. He never knew how important his message was.

### Festival NPCs (5 interactable)
- **Kamla the Weaver** — running a cloth stall. Gives lore about Nathula's history.
- **Arjun the Boy** — lost his toy in the festival crowd. Optional quest.
- **The Food Vendor** — provides festival food (energy full restore to 100).
- **The Drum Player** — teaches the rhythm game that is the tutorial's festival game section.
- **The Flower Seller (unnamed elder woman)** — gives a flower that is used in the Meera Devi interaction.

---

## Beat-by-Beat Flow

### Beat 1 — FADE IN: Opening Scene (Cinematic, ~60 seconds)

The game opens on darkness. Sound first: distant drums, children laughing, the crackle of oil lamps being lit.

**FADE IN:** Nathula at dawn. The village is decorating. People hang garlands from doorways. A child runs past with armfuls of marigolds. Oil lamps are arranged in long lines along the stone paths.

**CAMERA** drifts slowly to a window in a small stone house. Inside: Adivansh sleeps. The bow on the wall, a brass lamp still lit. His mother's voice offscreen:

> *"The festival won't wait for you."*

Adivansh wakes. The cinematic ends. The first frame of player control is Adivansh standing in the doorway of his house, bow on his back, looking out at the decorated village square.

**[Player gains control. No tutorial text. No prompt. Just: the festival, ahead.]**

---

### Beat 2 — FESTIVAL MORNING (Tutorial: Walk + Interact)

The village square is a 3D environment (camera model to be finalised in Phase 0; originally written as 2D side-scrolling). The camera is at medium distance, showing three buildings wide with the festival stalls between them.

**Tutorial integration:**
The player can move left and right immediately — no popup, no explanation. The natural destination is the festival activity. Interactable objects have a subtle golden glow (not intrusive — Meera's energy signature, explained later). First interaction the player naturally reaches: the **Food Vendor's stall**.

**[First interaction: Food Vendor]**
> *"Adivansh! Take some — you look like you haven't eaten."*

Picking up the festival food **fills the energy bar to 100**. A subtle toast appears: `+100 Energy · Festival Feast`. The energy bar glows warmly before settling. This establishes the energy system without explaining it.

**[Second interaction: Raka the Elder]**
Raka is sitting on a stone step watching the festival.
> *"Your father loved this day. Would start the harvest games every year before anyone else was awake. You look more like him every season."*
> Player response options (cosmetic, no consequence):
> — *"He would have enjoyed this."*
> — *"I'll make him proud today."*

**[Third interaction: Kamla the Weaver]**
> *"I've been weaving this banner for two weeks. The queen — the scholar, I mean, Meera — she asked for the old patterns. Said they were for protection. I didn't ask what from."*

This is the first hint that Meera knows something is wrong. It doesn't land yet.

**[Optional: Arjun the Boy]**
Arjun is crying near the cloth stall. His wooden toy bird fell from a platform above.
- Jump up two platforms (height: teaches vertical movement) to retrieve the toy.
- Return it to Arjun.
- **Reward:** Arjun gives the hero a small brass bell charm. +10 spirit energy (silent, no popup — players who discover this will understand later).
- **Optional lore:** Arjun says *"My mother made it in the shape of Vahana — the forest guide. She says Vahana watches over children."* First mention of Vahana, as a legend.

---

### Beat 3 — THE FESTIVAL GAME (Tutorial: Jump + Timing)

The Drum Player calls out from the centre of the square:
> *"Who wants to test their timing? Catch the golden leaves before they touch the ground!"*

**Festival game mechanic:**
- Golden leaves fall from a tall peepal tree in the centre of the square.
- Each caught leaf: +5 spirit energy.
- Catch 5 to win (more for bonus).
- Teaches: jump timing, aerial positioning, double-jump (the third leaf requires it).

Meera Devi is watching from the raised dais at the end of the square. She is smiling. If the player catches 8 or more leaves, she applauds and calls the hero over. If fewer: she still calls them over, but comments on the ones that got away.

**This is the chapter's centrepiece** — a joyful, skill-based interaction that teaches the core movement vocabulary without naming it. The player who masters the golden leaf game is ready for the forest.

---

### Beat 4 — MEETING MEERA DEVI (Dialogue + Story)

The player walks to the dais where Meera is seated. She stands when the hero approaches — she treats him as an equal, not a subject.

**Opening exchange:**
> **Meera:** *"You move like you're trying to prove something."*
> **Adivansh:** *"I'm just catching leaves."*
> **Meera:** *"That is what I meant."*

She gives him a **brass medallion** — engraved with the same protection pattern Kamla was weaving. This item appears again in Chapter 97 (the reunion — Meera kept an identical one with her the entire journey).

> **Meera:** *"Keep this. For when you can't see the path ahead."*

The Flower Seller approaches and hands Meera a garland of marigolds. Meera looks at it, then hands it to Adivansh:
> **Meera:** *"For the ceremony at dusk. I'll need you there. I have something to tell you."*

The player now has a soft objective: **"Return to Meera at dusk."**
The festival continues. The player can explore, complete optional interactions, revisit stalls.

---

### Beat 5 — DUSK: THE MESSENGER (Story Turn)

The light shifts to deep amber. Oil lamps light automatically across the village. The music quiets.

A commotion at the village gate. The player can walk toward it or wait — a courier animation triggers either way after 20 seconds.

**The messenger collapses at the gate.** He hands the hero a sealed scroll before losing consciousness:
> *"Forest border... Mahaksha's forward force... five thousand... they know the route..."*

The scroll seal is the royal court's mark. It is addressed to Meera Devi by name — not to the village, not to the guard captain. To her specifically.

**[Objective updates: "Bring the scroll to Meera Devi."]**

The route back through the festival square now feels different — same geometry, different mood. The lamps that felt warm now feel fragile.

---

### Beat 6 — THE WARNING (Chapter Completion)

**[Player walks to Meera at the dais.]**

She is mid-sentence of the dusk blessing ceremony when the hero arrives. She pauses. She reads the message in the hero's expression before reading the scroll. She takes it, opens it, reads quickly.

Her expression doesn't change. She folds it carefully.

> **Meera:** *"I've been expecting this for some time. I prepared a letter — it is in my room, on the writing desk. If anything happens tonight, read it."*
> **Adivansh:** *"Nothing is going to—"*
> **Meera:** *"If anything happens. Promise me."*

She holds his gaze until he nods.

> **Meera:** *"Good. Then let's finish the ceremony."*

She turns back to the ceremony. The hero stands beside her. The oil lamps flicker. Far away, beyond the treeline — barely visible — there is a light that is not from any lamp.

**[FADE TO BLACK.]**

**[Chapter 1 Complete.]**
**[Emotional score: "What Was" — the festival theme reprised as a single sustained note.]**

> *The Last Harvest Festival. The last night everything was whole.*

---

## HUD Elements Introduced

| Element | When introduced | How |
|---|---|---|
| Health bar (3 pips) | At first player control | No popup — it appears and waits |
| Energy bar | When food is first consumed | A pulse animation draws the eye |
| Minimap | After Beat 2 (second NPC) | Fades in gently |
| Objective text | After the messenger falls | First time the HUD speaks to the player |
| Spirit energy (small bar) | Only if Arjun's optional quest is done | Silent — no explanation |

**Design principle:** The HUD introduces itself through use, not through tutorial popups. By the end of Chapter 1, the player understands what every element means because they experienced it, not because they were told.

---

## Energy and Food Placement

| Food | Energy | Location | Notes |
|---|---|---|---|
| Festival feast | +100 (full restore) | Food vendor stall | The game's first food — sets the full bar |
| None thereafter | — | — | Chapter 1 is very low activity — energy drains <5 points total |

**Design note:** Chapter 1 is intentionally energy-abundant. The player starts at 100 and ends near 100. The hunger system does not create pressure here — it only establishes the visual language. Chapters 4+ begin the actual energy management loop.

---

## Optional Content

| Optional | Trigger | Reward | Lore value |
|---|---|---|---|
| Arjun's toy | Speak to Arjun at the cloth stall | +10 spirit energy (silent) | First mention of Vahana by name |
| All 5 NPC stalls | Complete all festival interactions | Backstory lore entries | History of Nathula; Meera's arrival |
| 8+ golden leaves | Catch 8 or more in the festival game | Meera's specific reaction dialogue | Establishes her as an observer |
| Examine all kolam patterns | Ground-level decorations (3 to find) | Kolam lore fragment | Foundation for Meera's protection inscriptions (Chapter 83) |

---

## Completion Condition

**Flag set:** `chapter1_complete = true`
**Trigger:** Player hands the scroll to Meera Devi (dialogue sequence completes)
**Next chapter:** Chapter 2 begins immediately in the same session, next morning.

---

## Failure State

**None.** Chapter 1 has no health-threatening content, no combat, and no time pressure. The player cannot fail Chapter 1. It is designed to be completed by everyone who plays it.

**Design rationale:** The chapter's purpose is to create something the player cares about losing. If the player fails here, they never build the attachment Chapter 3 is meant to destroy. The tutorial is purely joyful. The difficulty starts in Chapter 5.

---

## Implementation Notes

**Scenes required:**
- `NathulaVillageScene.ts` — the festival environment
- `Chapter1DialogueData.ts` — all NPC dialogue trees
- `FestivalGameMinigame.ts` — the golden leaf catching game

**Assets required:**
- Background: Nathula village (festival decorated) — to be commissioned per Art Bible v3.0
- Character models (originally listed as sprites): Adivansh (idle, walk, jump, interact), Meera Devi (seated, standing, dialogue)
- NPC models: Raka, Kamla, Arjun, Food Vendor, Drum Player, Flower Seller
- Prop models: Festival stalls, oil lamps, garlands, peepal tree with falling leaves
- VFX: Golden leaf particles, energy bar fill pulse, lamp flicker
- Audio: Festival drum loop, ambient crowd, dusk wind, single sustained note (chapter end)

**Story flags set by this chapter:**
- `ch1_meera_met = true`
- `ch1_medallion_given = true`
- `ch1_arjun_helped = true/false` (affects Ch 13 dialogue)
- `ch1_all_npcs_spoken = true/false` (affects elder's Ch 24 dialogue)
