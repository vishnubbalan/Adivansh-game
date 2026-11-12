# Adivansh Documentation Hub

This folder is the source of truth for Adivansh product vision, narrative, world design, architecture, agent roles, production and commercial policy.

## Document map
- [Game vision](01-product/GAME_VISION.md) — objective, genre, audience and player promise.\n- [Gameplay specification](01-product/GAMEPLAY_SPECIFICATION.md) — player controller, combat loop, quest state, interaction and UX rules.\n- [Chapter One level design](01-product/CHAPTER_ONE_LEVEL_DESIGN.md) — encounter sequence, spatial rules and completion criteria.
- [Story bible](01-product/STORY_BIBLE.md) — premise, themes, cast and chapter arc.
- [World and art direction](02-world/ART_DIRECTION.md) — ancient Indic heroic character styling and Indian-Chinese fantasy environments.\n- [Character bible](02-world/CHARACTER_BIBLE.md) — cast roles, motivations and approval dossiers.\n- [Environment and VFX bible](02-world/ENVIRONMENT_AND_VFX_BIBLE.md) — layers, lighting, regional look and effect budgets.
- [Weapons and combat](02-world/WEAPONS_AND_COMBAT.md) — traditional, mythic and arcane-technology weapon families.
- [Technical architecture](03-architecture/TECHNICAL_ARCHITECTURE.md) — modules, data flow and technology choices.\n- [Gameplay system design](03-architecture/GAMEPLAY_SYSTEM_DESIGN.md) — runtime ownership, events, determinism and persistence.\n- [Asset pipeline](03-architecture/ASSET_PIPELINE.md) — source art to tested runtime integration.
- [Architecture decisions](03-architecture/DECISIONS.md) — accepted technical/product architecture decisions.
- [AI agent team](04-agents/AGENT_TEAM.md) — all six roles and decision rights.
- [Technical Architect role](04-agents/TECHNICAL_ARCHITECT_AGENT.md) — new senior architecture and innovation role.
- [Agent workflow](04-agents/AGENT_WORKFLOW.md) — scheduled cycle and handoffs.\n- [Agent prompt contracts](04-agents/AGENT_PROMPT_CONTRACTS.md) — expected outputs and status vocabulary.
- [Production roadmap](05-production/ROADMAP.md) — milestones and exit criteria.
- [Quality strategy](05-production/QUALITY_STRATEGY.md) — automation, visual, device and player testing.\n- [Chapter One test plan](05-production/TEST_PLAN.md) — functional, non-functional and device scenarios.\n- [Release and operations runbook](05-production/RELEASE_AND_OPERATIONS_RUNBOOK.md) — PR, deployment, rollback and incident handling.
- [Commercial strategy](06-commercial/COMMERCIAL_STRATEGY.md) — validation, distribution and monetization options.\n- [Product validation plan](06-commercial/PRODUCT_VALIDATION_PLAN.md) — player research, hypotheses and go/revise/stop criteria.
- [Asset policy](06-commercial/ASSET_POLICY.md) — provenance, licensing and AI-assisted content.

## Approved direction
- Premium cinematic 2D side-scrolling action-adventure.
- Commercial viability is the first business priority.
- Ramayana-inspired emotional themes, with an original fantasy story and cast.
- Characters use original ancient Indic / epic-era heroic fantasy styling, not conventional Ramayana costume reproductions or racial stereotypes.
- The world is a fictional mythic realm blending Indian and Chinese architectural, landscape and material influences. This is not a real-world country or a socioeconomic use of “third world”.
- Combat may combine traditional weapon families, mythic weapons and restrained ancient-futurist/arcane technology.
- Current implementation remains Phaser 3 + TypeScript + Vite. Phaser 4 is an option to benchmark, not an approved migration.
- First major milestone: one complete, polished, playtested Chapter One.

## Documentation rules
Product intent belongs in 01-product; visual and combat direction in 02-world; architecture in 03-architecture; roles and handoffs in 04-agents; delivery/testing in 05-production; business and rights in 06-commercial. Record consequential changes in the decision log. Mark capabilities accurately as implemented, tested, reviewed, planned or proposed. Documentation of a target is not proof of implementation.

## Architecture additions

- [Module Map and Agent Ownership](03-architecture/MODULE_MAP.md)
- [VFX System](03-architecture/VFX_SYSTEM.md)
