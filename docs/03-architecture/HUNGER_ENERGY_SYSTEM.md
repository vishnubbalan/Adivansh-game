# Hunger and Energy System

> Design document. The hero is a person on a physical journey through real environments.
> He gets hungry. The game tracks this. Finding and eating food is both a survival necessity
> and a strategic resource that the player actively manages.

---

## Design Philosophy

**This is not a punishment system.** Hunger is an opportunity — a reason to explore, a reason to interact with the world, a reason the NPCs who offer food become meaningful. When someone gives the hero a meal after helping them, the full belly is a mechanical expression of gratitude. That's the system's purpose.

**Key rule:** Food must always be findable before the player starves. The design guarantee is that every chapter contains enough food to sustain a player who explores it, plus a 20% buffer. Players who ignore food entirely will degrade gradually; players who explore will always have more than they need.

**Competitive reference:** Breath of the Wild's cooking system, Don't Starve's survival rhythm, and Ori's energy cell collection all handle resource management without frustration because availability always exceeds the minimum need. That balance is the target.

---

## The Energy Bar

### Structure
The hero has two separate resource bars:

| Bar | What it represents | Max | Min consequence |
|---|---|---|---|
| **Health** (existing) | Damage resistance | 3–5 pips (grows with upgrades) | Death → respawn at checkpoint |
| **Energy** (new) | Physical endurance, hunger | 100 points | Gradual degradation (see below) |

### Energy Depletion Rate
- Standing still: 0 points/minute
- Walking: 1 point/minute  
- Running: 3 points/minute  
- Combat (each hit landed): 2 points  
- Climbing/swimming: 4 points/minute  
- Boss fights: 5 points/minute (the stress cost)

Approximate: a 20-minute active chapter depletes 40–60 energy points.

### Effects of Low Energy

| Energy level | Player effect |
|---|---|
| 100–50 (Full → Half) | No effect. Normal performance. |
| 49–25 (Hungry) | Run speed reduced 15%. Jump height reduced 10%. Visual: subtle desaturation at screen edges. HUD energy bar pulses amber. |
| 24–10 (Very hungry) | Run speed reduced 30%. Jump height reduced 20%. Attack damage reduced 15%. Panting audio cue. HUD bar pulses red. |
| 9–1 (Starving) | Cannot sprint. Jump height reduced 35%. Blurred edges on screen. The hero's sprite gains a tired animation frame on idle. |
| 0 (Collapse) | Hero collapses. 5-second cutscene. Respawns at last checkpoint with 25 energy. This cannot happen in a boss fight — energy freezes at 5 during boss sequences. |

**Design note:** Collapse is a teaching moment, not a punishment — the hero sits down, recovers with whatever crumbs remain, and continues. It is designed to happen at most twice in a full playthrough for a player who is exploring normally.

---

## Energy Restoration — Food Types

Food restores energy instantly on pickup. The variety of food matches the environment — the forest has forest food, the mountains have mountain food. Players who pay attention to the world learn what to look for in each region.

### Season 1 — Forest Food

| Food | Energy restored | Where found |
|---|---|---|
| Wild mango | +20 | Hanging from trees, visible from below |
| Forest berries (cluster) | +10 | Low bushes, path edges |
| Coconut | +30 | Palm trees, need to knock down (jump + attack) |
| Wild mushroom | +15 | Near roots, damp ground |
| Honey comb | +25 | Tree hollows, defended by bees (brief hazard) |
| River fish (caught) | +35 | Shallow river sections — press interact at fishing spots |
| Fallen fruit (ripe) | +12 | Under fruit trees, slightly hidden |
| Herb bundle (gift) | +40 | Given by helped NPCs: Old Soldier, village healer |

**Forest food design notes:**  
- Mangoes and coconuts are visible from a distance — bright colours against green  
- Mushrooms require Spirit Sight or close inspection (sometimes hidden in shadows)  
- Fishing spots glow faintly (ambient shimmer) — rewarding players who explore near water  
- NPCs who were helped will sometimes call out to the hero with food as he passes through chapters later

### Season 2 — Mountain Food

| Food | Energy restored | Where found |
|---|---|---|
| Mountain pine nuts (bag) | +15 | In Stoneclan settlement shelves, path edges |
| Snow berries | +10 | Small red berries on grey bushes — easy to miss |
| Rock honey | +20 | Cliff face honeycombs (require climbing) |
| Dried meat bundle | +45 | Stoneclan traders (can be purchased or earned) |
| Mountain herb tea | +25 (slow release over 2 min) | Heated at fire sources — raw herb = +5 only |
| Root vegetable | +15 | Dug from soft snow patches (press interact) |
| Eagle egg | +30 | Nests at high points — risky to reach, significant reward |
| Stoneclan stew (bowl) | +60 | Only available in Stoneclan hub after earning alliance |

**Mountain food design notes:**  
- Mountain tea introduces a "slow release" restoration type — the energy bar fills gradually, requiring planning  
- Food is more sparse and harder to find than the forest, matching the environment's harsher character  
- Stoneclan stew is the most restoring food in Season 2 and can only be earned by helping the clan  
- Eagle eggs are genuinely risky to reach — legitimate risk/reward decision

### Season 3 — Ocean Food

| Food | Energy restored | Where found |
|---|---|---|
| Coconut (coastal) | +25 | Palm-lined coast sections |
| Tropical fruit | +20 | Coral kingdom gardens |
| Ocean fish (caught) | +35 | Fishing spots at calm water |
| Sea vegetables (kelp) | +15 | Underwater sections — collect while diving |
| Coral fruit (rare) | +50 | Deep underwater, specific bioluminescent plants |
| Fisherman's catch (gift) | +40 | Given by coastal NPC if hero helped defend the village |
| Ship ration (salvaged) | +20 | Wreckage sections, sealed containers |
| Spirit kelp (blessed) | +60 (+ full spirit energy) | Ocean Spirit grants one bundle at covenant |

**Ocean food design notes:**  
- Underwater food collection creates a natural tension with the breath timer — manage air vs. collect food  
- Spirit kelp restores both energy AND spirit energy (sacred weapon charge) — the most valuable single food item in the game  
- River Memory blessing (earned from Old Fisherwoman) makes all hidden ocean food glow — a direct cross-system reward

### Season 4 — Island Food

| Food | Energy restored | Where found |
|---|---|---|
| Ashura market fruit (stolen/bought) | +20 | City market — risky during stealth sections |
| Garden vegetables | +25 | Mahaksha's garden, Meera's section (Chapter 83) |
| Prison ration | +10 | The bare minimum — sad but functional |
| Freed prisoner's sharing | +35 | Freed captives share food with the hero |
| Sacred fire fruit (rare) | +45 | Near the Homeward Flame shrine, Chapter 90 |
| Corrupted food (avoid) | –15 health | Dark-tinted fruit near corrupted areas — visual warning |
| Final feast (story gift) | +100 (full restore) | Meera Devi shares food with the hero after Chapter 97 |

**Island food design notes:**  
- Ashura city has abundant food but acquiring it has risk — stealth players who grab it cleanly are rewarded  
- Corrupted food is a teaching moment and a rare trap — clearly visually distinct (dark tint, purple aura)  
- **Meera Devi's sharing food (Chapter 97, after reunion):** This is the most important food moment in the game. After five chapters of fighting through Mahaksha's palace, she sits with the hero and shares the food she has been carefully saving. Full energy restore. The act of sharing food is the reunion's emotional language, more than any dialogue.  
- Final feast is designed to arrive just before the final boss, ensuring the player is at full strength for the most important fight in the game — not punished into it

---

## Vahana and Food

Vahana notices when the hero is getting hungry. At energy 30 or below:  
- **Chapter 6+:** Vahana will mark the nearest food source on the minimap (a small leaf icon)  
- **Chapter 20+:** Vahana can be sent to find food — 90-second search, returns with a 25-energy item  
- **Late game:** Vahana occasionally brings the hero food unprompted during long traversal sections — a small act that reinforces the bond

---

## Food as Story

Specific food sharing moments are authored into the narrative:

| Chapter | Story moment | Food context |
|---|---|---|
| Ch 13 | Old Soldier shares his meal | The first NPC who actively feeds the hero |
| Ch 28 | Stoneclan village meal | Earning hospitality by helping the clan |
| Ch 39 | Night of Ten Thousand Stars | Shared meal around the campfire (Vahana, Raka, hero) |
| Ch 52 | Old Fisherwoman offers a meal | She has very little; she offers it anyway |
| Ch 83 | Meera's garden | She has been leaving food near the garden wall for weeks |
| Ch 97 | Reunion meal | As described above — the emotional peak of the food system |

These moments are scripted — the energy bar refills as a story beat, not a pickup. The player knows exactly what just happened.

---

## HUD Design

**Energy bar:** Below the health bar. Visual style: warm orange/amber gradient, like a flame. At full: glowing steadily. At hungry: flickering. At starving: a low ember.

**Food pickup notification:** A subtle toast at the bottom: `+20 Energy` with the food icon. Brief, not intrusive.

**Vahana food alert:** Vahana's companion icon pulses when they've marked food — no text, just the visual cue.

---

## Technical Implementation

**Energy manager:** `src/game/EnergyManager.ts`  
- Tracks current energy (0–100 float)
- `update(dt, activityType)` — called each frame by ForestScene
- `consume(activity)` — called on specific actions
- `restore(amount)` — called on food pickup
- Emits `energy.hungry`, `energy.critical`, `energy.collapse` events

**Food items:** `src/world/FoodItem.ts`  
- Extends `Phaser.GameObjects.Sprite`
- `energyValue: number`
- `type: FoodType` (enum: FRUIT, VEGETABLE, FISH, COOKED, GIFT, SPECIAL)
- Collected on player overlap, pooled (never destroyed, just made inactive and repositioned on chapter reset)

**Food placement:** Defined in chapter layout data alongside platform/clue positions.  
Each chapter entry in `forestLayout.ts` gains a `food: FoodSpawn[]` array.

**Corrupted food:** `type: FoodType.CORRUPTED` — overlap causes `EnergyManager.heal(-15 health)` instead of restore. Visual: distinct dark tint shader applied at spawn.

**Persistence:** Current energy level saved per chapter checkpoint. On chapter load, restores to the checkpoint value (not full — the player should maintain it across chapters, not get a free reset each time). Exception: Boss chapters start the player at minimum 50 energy (design guarantee).

---

## Balancing Notes

- Never let a chapter be completable only by starving through it
- Each chapter must contain ≥120 total energy in food (20% buffer above average depletion of ~100)
- Boss chapters: food nodes always present in the approach area before the boss door
- Vahana food-mark ensures players are never truly lost for food
- Difficulty option (future): "Survival Mode" — reduce food availability, faster depletion rate. Standard mode is the designed experience.
