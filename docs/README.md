# Adivansh Documentation Hub

This folder is the source of truth for Adivansh product vision, narrative, world design, architecture, agent roles, production and commercial policy.

> **2026-11-23 reset:** the 2D prototype was deleted; the game is being rebuilt as a premium cinematic **3D desktop** game, **story first**. Docs written for the 2D prototype carry a note where they are superseded. Start with the architecture and decisions below.

## Document map

### 01 Product and story
- [Game vision](01-product/GAME_VISION.md) — objective, genre, audience and player promise.
- [100-chapter vision](01-product/HUNDRED_CHAPTER_VISION.md) and [chapter map](01-product/CHAPTER_MAP_ALL_100.md) — full-game scope, 4 seasons.
- [Story bible](01-product/STORY_BIBLE.md) — premise, themes, cast and arc.
- [Chapter 1 story](01-product/CHAPTER_01_STORY.md) — scene-by-scene script source for the first ink conversion; see also [Chapter One story (festival version)](01-product/CHAPTER_ONE_STORY.md) added on main — the two need reconciling in Phase 0.
- [Gameplay specification](01-product/GAMEPLAY_SPECIFICATION.md) — controller, combat loop, quest state, interaction and UX rules.
- [Chapter One level design](01-product/CHAPTER_ONE_LEVEL_DESIGN.md) — encounter sequence and completion criteria.

### 02 World and art
- [Art direction](02-world/ART_DIRECTION.md), [character bible](02-world/CHARACTER_BIBLE.md), [character sample prompts](02-world/CHARACTER_SAMPLE_PROMPTS.md), [Chapter 1 concept approval](02-world/CHAPTER_ONE_CHARACTER_CONCEPT_APPROVAL.md).
- [Environment and VFX bible](02-world/ENVIRONMENT_AND_VFX_BIBLE.md), [Chapter 1 asset inventory](02-world/CHAPTER_ONE_ASSET_INVENTORY_AND_ART_BRIEF.md).
- Season designs: [1 Forest](02-world/SEASON_1_FOREST_DESIGN.md), [2 Mountains](02-world/SEASON_2_MOUNTAINS_DESIGN.md), [3 Ocean](02-world/SEASON_3_OCEAN_DESIGN.md), [4 Island](02-world/SEASON_4_ISLAND_DESIGN.md).
- [Weapons and combat](02-world/WEAPONS_AND_COMBAT.md).

### Art source (outside docs/)
- [Chapter One visual production brief](../art-source/chapter-one/VISUAL_PRODUCTION_BRIEF.md), [3D character modelling spec](../art-source/characters/3d-modeling/CHARACTER_MODELING_SPEC.md), [Blender workflow](../art-source/characters/3d-modeling/BLENDER_PRODUCTION_WORKFLOW.md) and reference OBJ models in `art-source/characters/3d-models/`.

### 03 Architecture (3D)
- **[Technical architecture](03-architecture/TECHNICAL_ARCHITECTURE.md)** — stack, rendering, tiers, loop, spikes. *Read first.*
- **[Architecture decisions](03-architecture/DECISIONS.md)** — ADR-006 to ADR-011 define the 3D reset.
- **[Narrative system](03-architecture/NARRATIVE_SYSTEM.md)** — story as data, ink, beats, cinematics, tooling.
- [Module map](03-architecture/MODULE_MAP.md) — planned monorepo layout and ownership.
- [Asset pipeline](03-architecture/ASSET_PIPELINE.md) — Blender → glTF/KTX2, budgets.
- [VFX system](03-architecture/VFX_SYSTEM.md) and [VFX production systems](03-architecture/VFX_PRODUCTION_SYSTEMS.md).
- [Gameplay system design](03-architecture/GAMEPLAY_SYSTEM_DESIGN.md), [audio systems](03-architecture/AUDIO_SYSTEMS_DESIGN.md), [blessing and sacred weapons](03-architecture/BLESSING_AND_SACRED_WEAPONS.md), [hunger and energy](03-architecture/HUNGER_ENERGY_SYSTEM.md).

### 04 Agents
- [Agent team](04-agents/AGENT_TEAM.md), [Technical Architect role](04-agents/TECHNICAL_ARCHITECT_AGENT.md), [workflow](04-agents/AGENT_WORKFLOW.md), [prompt contracts](04-agents/AGENT_PROMPT_CONTRACTS.md).

### 05 Production
- [Roadmap](05-production/ROADMAP.md), [season release roadmap](05-production/SEASON_RELEASE_ROADMAP.md), [quality strategy](05-production/QUALITY_STRATEGY.md), [test plan](05-production/TEST_PLAN.md), [release runbook](05-production/RELEASE_AND_OPERATIONS_RUNBOOK.md), [GitHub Scrum setup](05-production/GITHUB_SCRUM_SETUP.md).

### 06 Commercial
- [Commercial strategy](06-commercial/COMMERCIAL_STRATEGY.md), [product validation plan](06-commercial/PRODUCT_VALIDATION_PLAN.md), [asset policy](06-commercial/ASSET_POLICY.md).

### Top level
- [Technology and commercial roadmap](TECHNOLOGY_AND_COMMERCIAL_ROADMAP.md) — phases 0–5, gates.
- [Story and visual plan](STORY_AND_VISUAL_PLAN.md), [agent operating model](AGENT_OPERATING_MODEL.md), [agent role notes](agents/).

## Approved direction
- Premium cinematic real-time **3D** action-adventure for desktop computers (Windows first; keyboard/mouse + gamepad). Mobile is out of scope.
- **Story first:** Chapter 1 is authored and validated as data before 3D production for it begins.
- Commercial viability is the first business priority.
- Ramayana-inspired emotional themes with an original fantasy story and cast; very human, original ancient Indic / epic-era heroic styling, not conventional Ramayana costume reproductions or stereotypes.
- Fictional mythic realm blending Indian and Chinese architectural, landscape and material influences (not a real-world country or a socioeconomic "third world").
- Combat may combine traditional weapon families, mythic weapons and restrained ancient-futurist/arcane technology.
- Technology: Three.js WebGPU (WebGL2 fallback) + TypeScript + Rapier + glTF/KTX2 + ink + Tauri, gated by Phase 1 spikes (ADR-006). Unreal 5 / Godot are documented exit paths, not current plans.
- First major milestone: one complete, polished, playtested Chapter One.

## Open questions (resolve in Phase 0)
1. Camera model: full third-person 3D movement, or side-locked 2.5D for most chapters?
2. Character art source: 3D artist, licensed base, or commission (cannot be produced by AI coding agents)?
3. Voice-over: subtitles-only first release, or recorded VO for Chapter 1?
4. Distribution: Steam, itch.io, web demo, or a combination?

## Documentation rules
Product intent belongs in 01-product; visual and combat direction in 02-world; architecture in 03-architecture; roles and handoffs in 04-agents; delivery/testing in 05-production; business and rights in 06-commercial. Record consequential changes in the decision log. Mark capabilities accurately as implemented, tested, reviewed, planned or proposed. Documentation of a target is not proof of implementation.
