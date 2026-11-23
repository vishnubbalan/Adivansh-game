# Narrative System — Story as Data

> Status: design only. The goal is that **the story can be written, branched, validated and played before any 3D engine code exists**, and that the same files later drive the game unchanged.

## 1. Principles
1. **Story first, engine second.** Chapter scripts are authored and tested in a terminal story runner (Phase 0). The 3D game later *consumes* the same files.
2. **One canonical story state.** Quest flags, relationships and chapter progress live in `game-core`. Dialogue text never decides outcomes except through declared, typed functions.
3. **Every line has a stable ID** (`ch01.village.raka.greet.001`) so localisation, subtitles, voice-over, QA bug reports and analytics all refer to the same thing.
4. **No dead ends.** CI walks every ink path and every beat graph; unreachable content or soft-locks fail the build.
5. **Designers own text; engineers own contracts.** Story files change often; the contract (flags, functions, event names) changes rarely and via PR.

## 2. Source documents → runtime data

| Human source (docs) | Runtime artefact (`content/`) | Notes |
|---|---|---|
| [STORY_BIBLE.md](../01-product/STORY_BIBLE.md), [HUNDRED_CHAPTER_VISION.md](../01-product/HUNDRED_CHAPTER_VISION.md), [CHAPTER_MAP_ALL_100.md](../01-product/CHAPTER_MAP_ALL_100.md) | `content/chapters/index.json` | Chapter id, season, title, region, emotional beat, unlock rules |
| [CHAPTER_01_STORY.md](../01-product/CHAPTER_01_STORY.md) | `content/story/ch01/*.ink`, `content/story/ch01/beats.json` | Scene scripts + beat graph |
| [CHARACTER_BIBLE.md](../02-world/CHARACTER_BIBLE.md) | `content/characters/*.json` | Speaker ids, display names, voice tags, portrait/expression sets |
| [GAMEPLAY_SPECIFICATION.md](../01-product/GAMEPLAY_SPECIFICATION.md) | `content/quests/*.json` | Objectives, prerequisites, rewards |

## 3. Formats

### 3.1 Dialogue and branching — ink (`.ink`)
Compiled with `inkjs`/`inklecate` at build time; runtime uses the compiled JSON. Conventions:
- One file per scene; knots named `scene_id`; speaker via tag: `# speaker:raka  # mood:worried  # id:ch01.village.raka.greet.001`.
- Variables are **read-only mirrors** of canonical state, injected at start; writes only via external functions declared in the contract below.
- No raw strings for names/items; use ids (`item.toy_bird`).

### 3.2 Beat graph — `beats.json`
```json
{
  "chapter": "ch01",
  "beats": [
    { "id": "ch01.festival.intro", "requires": [], "scene": "ch01/festival_intro", "grants": ["flag.festival_seen"] },
    { "id": "ch01.arjun.toy",      "requires": ["flag.festival_seen"], "scene": "ch01/arjun_toy",
      "objective": { "type": "collect", "item": "item.toy_bird", "count": 1 }, "grants": ["flag.arjun_helped"] }
  ],
  "completion": ["flag.queen_taken"]
}
```
Validated with JSON Schema (`content/schemas/`) and a graph check (reachability, cycles, orphan flags).

### 3.3 Cinematic timelines — `*.cine.json`
Tracks: `camera` (rig id + keyed params), `anim` (character, clip, start, blend), `ink` (knot to run), `audio` (cue ids), `vfx` (effect ids), `subtitle` (line ids), `fade`. Time-based, engine-agnostic; played by the sequencer in the game, and printable as a text storyboard by the story runner.

### 3.4 Localisation
`content/i18n/<locale>/strings.json` keyed by line id; ICU MessageFormat for plurals/gender (important for Hindi/Tamil/Malayalam and others). English is the source locale; the string table is the only place text lives besides ink tags. Subtitle speaker names resolve through `characters/*.json`.

## 4. The runtime contract (engine ↔ story)

**Events the game sends to the story** (typed): `player.entered(areaId)`, `item.collected(itemId)`, `npc.interacted(npcId)`, `enemy.defeated(enemyId)`, `shrine.activated(id)`, `time.elapsed(beatId, seconds)`.

**External functions ink may call** (the only way text affects state): `grantFlag(id)`, `setRelationship(npcId, delta)`, `giveItem(itemId)`, `startObjective(id)`, `completeObjective(id)`, `queueCinematic(id)`, `unlockBlessing(id)`.

**Events the story emits to the game**: `story.lineStarted(lineId, speakerId)`, `story.choicePresented(options)`, `story.beatCompleted(beatId)`, `story.cinematicRequested(id)`, `story.chapterCompleted(chapterId)`.

All events are idempotent by `(beatId, eventId)`; replaying a save must not double-grant rewards.

## 5. Tooling

| Tool | Purpose | Phase |
|---|---|---|
| `story-run` (Node CLI) | Play any chapter in the terminal with fake game events; print flags and objective state; supports `--auto` random walk and `--script` replay | 0 |
| `story-lint` | Schema validation, id uniqueness, missing speakers, missing strings, ink compile errors, line length/reading-time warnings | 0 |
| `story-graph` | Emits a Mermaid graph of beats and choices for review in docs/PRs | 0 |
| `story-coverage` | Reports which branches/lines a set of replay scripts reached (CI gate: 100% reachability, soft-lock-free) | 0–1 |
| Cutscene previewer | Plays `.cine.json` in the 3D engine with placeholder rigs | 2 |

## 6. Authoring workflow (Phase 0, now)
1. Product owner + Story agent update the prose docs (bible, chapter story).
2. Convert a chapter scene to `.ink` + `beats.json` (Narrative Designer agent).
3. `story-lint` + `story-run --auto` in CI; reviewer reads the Mermaid graph and a generated transcript.
4. Product owner reads the transcript, approves or requests changes. **Chapter 1 must be approved in this form before environment/character production for it begins.**

## 7. Voice-over and performance readiness
Line ids are permanent. Each line carries optional `emotion`, `intensity`, and `lipsync: auto|manual` tags. Facial animation will be driven by audio-to-viseme (offline tool, TBD) with hand-keyed emotional overrides for key scenes. Voice casting and recording are out of scope until the vertical slice is validated; subtitles ship first.

## 8. Risks
- ink has no first-class concept of spatial/real-time triggers → solved by the event contract, not by embedding game logic in ink.
- Long-form (100 chapters) consistency → the **canon database** (`content/canon/*.json`: characters, places, items, timeline) is linted for references from every chapter.
- Localisation bloat → strings only in tables; never concatenate sentences in code.
