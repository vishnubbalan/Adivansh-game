# Audio Systems Design

> Audio director document. Covers all audio systems, music architecture, and sound design requirements across 4 seasons.
> No audio production can begin without commercial licence review. All audio assets need provenance documentation.

---

## Philosophy

Audio is not decoration — it is half the game experience. When a player closes their eyes during Hollow Knight's White Palace, the audio tells them everything they need to know about the space and their danger level. That's the target: audio that is so well integrated players would miss it immediately if it were removed.

**Three principles:**
1. **Adaptive** — the music and sound know what the game knows. When the player is spotted, the music shifts. When a boss enters Phase 2, the arrangement changes. No jarring jumps.
2. **Regional identity** — each of the 4 seasons has its own tonal palette, instrument family, and acoustic character. Players should recognise "this is the forest" or "this is the ocean" from audio alone.
3. **Performance first** — all audio targets web playback (Web Audio API). Compressed formats (OGG/MP3), reasonable file sizes, no synchronous loads.

---

## Audio Architecture

### Adaptive Music System

Music plays in **stems** — separate audio tracks that are layered and adjusted in real time:

| Stem | Active when |
|---|---|
| `ambient` | Exploration, no enemies nearby |
| `tense` | Enemy present but not in combat |
| `combat` | Active combat (enemy within attack range or attacking) |
| `boss` | Boss encounter active (replaces all other stems) |
| `victory` | Combat ends, brief fanfare, then returns to ambient |

Each stem must be BPM-synced so transitions happen on a beat boundary. The music system in code must:
- Cross-fade between stems over 1–2 beats
- Not restart the ambient stem when returning from combat (seamless continuation)
- Provide `AudioManager.setCombatState(state: 'ambient'|'tense'|'combat'|'boss'|'victory')` interface
- Support per-chapter ambient track selection

**Implementation:** `src/audio/AudioManager.ts` (new), `src/audio/MusicLayer.ts` (stem wrapper)

### Sound Effect Categories

| Category | Description | Max simultaneous |
|---|---|---|
| Combat | Attack impact, dodge whoosh, block clang, hit received | 4 |
| Movement | Footstep (surface-aware), jump, land, wall-slide | 2 |
| Environment | Ambient loops, weather, interactable triggers | 3 |
| UI | Menu click, checkpoint, objective, chapter complete | 2 |
| Character | Exertion grunts, hurt sounds, Vahana vocalisation | 2 |
| Boss | Phase change roar, attack telegraph, defeat roar | 2 |

### Surface-Aware Footsteps

Movement sounds differ by surface type:
- Stone/temple: hard sharp tap
- Wet stone: squishy, slight reverb
- Soil/forest floor: soft, padded
- Wood platform: resonant hollow thud
- Water: splash, varies with speed

**Implementation:** `src/audio/SurfaceAudio.ts` — reads tilemap layer property `surface` and selects the correct footstep pool.

### Dynamic Reverb Zones

Different locations have different acoustic character, implemented as Web Audio convolver node swap:

| Zone | Reverb character |
|---|---|
| Open forest | Short, lush, slightly wet |
| Temple interior | Long, stone, echoing |
| Mountain pass | Long, sparse, cold |
| Cave/chasm | Very long, deep, low-frequency |
| Underwater | Muffled, low-pass filter, slow fade |
| Open ocean | Short, wide, high-frequency emphasis |
| Ashura palace | Long, grand, slight distortion |

---

## Season 1 Audio Requirements

### Ambient Soundscape — Whispering Forest
**Layers:**
- Background: continuous forest ambience (birds, insects, distant water)
- Mid: forest canopy wind (subtle sway sound)
- Foreground: contextual (river near water, rain during storm, silence near enemies)
- Night layer: different insect chorus, occasional distant creature call

**Music palette — Forest:**
- Primary instruments: sitar, tabla, bansuri flute, light strings
- Character: warm, ancient, slightly mysterious
- BPM: 72 (ambient), 90 (tense), 110 (combat)

### Combat SFX — Season 1
- **Hero attack (sword/blade):** 3 swings (light, medium, heavy combo ender), each with distinct pitch and weight
- **Hero dodge:** quick whoosh, cloth movement
- **Hit received:** grunt + impact thud
- **Enemy hit:** satisfying thud/crack matching enemy material (roots = woody crack, soldiers = metal ring)
- **Enemy death:** per-enemy type (forest creature = dissipate/fade, soldier = collapse)

### Season 1 Music Tracks Required
| Track | Usage | Duration |
|---|---|---|
| `forest-ambient` | Forest exploration | 3-minute loop, stems |
| `combat-forest` | General combat | 2-minute loop, stems |
| `corrupted-treant` | Chapter 15 boss | 2.5 minutes with phase transition |
| `forest-guardian` | Chapter 22 boss | 2.5 minutes with phase transition |
| `forest-sentinel` | Chapter 25 final boss | 3.5 minutes (3-phase with transitions) |
| `village-theme` | Chapters 1–2 | 2-minute loop |
| `chapter-complete` | Stinger | 8–12 seconds |
| `vision-sequence` | 4× vision sequences | 90-second emotional piece |
| `season-1-title` | Opening/season title | 90 seconds |
| `season-1-end` | Final boss defeat + end cinematic | 3 minutes |

---

## Season 2 Audio Requirements

**Music palette — Mountains:**
- Primary instruments: strings (heavier, more cello), duduk/oboe, percussion (taiko influence), low brass
- Character: cold, ancient power, weight of history
- BPM: 68 (ambient), 88 (tense), 118 (combat)

Additional tracks: Mountain ambient (wind dominant), blizzard layer (wind + percussion), Stoneclan hub music (folk-influenced), Ancient Generals boss theme (dual character — two distinct melodic lines for two bosses), Mountain Titan final boss.

---

## Season 3 Audio Requirements

**Music palette — Ocean:**
- Primary instruments: guitar (nylon string), harp, light percussion, ambient pads, deep bass (for undersea sections)
- Underwater filter: low-pass on all audio + slight delay + reduced dynamic range
- Character: vast, awe-inspiring, ancient (the ocean predates the kingdoms)
- BPM: 60 (ambient), 92 (tense), 115 (combat)

**Special requirement — The Siren Music Puzzle (Chapter 72):**  
This chapter is built around a musical mechanic. The sirens produce a melody the player must respond to with specific timing inputs. The audio system must support:
- Playing back a siren phrase (pre-authored melody)
- Receiving player timing inputs mapped to musical beats
- Scoring accuracy against the target phrase
- This requires a `SirenMusicPuzzle` component in `src/audio/`

---

## Season 4 Audio Requirements

**Music palette — Ashura:**
- Primary instruments: heavy percussion, distorted strings, brass (dark), synthetic bass, choir (ominous)
- Character: dark grandeur, power, menace — this is an empire, not a dungeon
- BPM: 70 (ambient/infiltration), 100 (tense), 125 (combat), 140 (final boss)

**Mahaksha Theme — 3 Phases:**
- Phase 1: strong, rhythmic, brass-led — a king going to war
- Phase 2: strings go dissonant, percussion doubles, choir enters — the demon unleashed
- Phase 3: choir dominant, everything else reduces to texture — the true form, ancient and terrible, then shifts to major key as the tide turns

**Realm Restoration Music (Chapter 100):**  
The climactic audio moment of the entire game. As the corruption retreats:
- Music starts sparse, hushed
- As each zone visually restores, its ambient music layer enters (forest birds, then mountain wind, then ocean waves — all simultaneously audible as one restored realm)
- Full orchestra enters for the homecoming
- This must be authored as a single continuous 4-minute piece with choreographed entry points

---

## Audio File Format and Pipeline

| Use | Format | Quality | Max file size |
|---|---|---|---|
| Music stems | OGG | 160kbps | 3MB per stem |
| Music stems (mobile) | MP3 | 128kbps | 2.5MB per stem |
| SFX | OGG/WAV | 44.1kHz | 200KB |
| Ambient loops | OGG | 128kbps | 1.5MB |
| Cinematic music | OGG | 192kbps | 4MB |

**Phaser AudioManager usage:** All audio through Phaser's `this.sound` manager. Web Audio API available on WebGL renderer. Fallback to HTML5 audio if Web Audio unavailable.

**Preloading:** Only current chapter's audio loads. Boss audio preloads during the final platform section before the boss room (not at scene load).

---

## Commercial Licence Requirements

All audio assets must be:
- Commercially licensable (Creative Commons CC-BY, royalty-free purchase, or original commission)
- Documented in asset provenance register before shipping
- Not sourced from AI audio generators without rights review (AI audio generation IP remains unclear — treat as AI image: concept reference only until legal review)

For the adaptive music stems, consider commissioning from an Indian classical fusion composer who can deliver BPM-synced stems in OGG format. Budget line to be established before R1.

---

## Implementation Checklist (R1 Gate)

- [ ] `src/audio/AudioManager.ts` with stem-based adaptive music
- [ ] `src/audio/MusicLayer.ts` with cross-fade on beat boundary
- [ ] `src/audio/SurfaceAudio.ts` with 5 surface types
- [ ] Dynamic reverb zones implemented for Forest sub-environments
- [ ] All Season 1 SFX implemented (attack, dodge, hit, land, enemy death)
- [ ] All Season 1 music tracks present and looping correctly
- [ ] Audio settings panel: master volume, music volume, SFX volume
- [ ] Mute on tab-hidden (page visibility API)
- [ ] All audio files within budget (total Season 1 audio ≤ 25MB)
