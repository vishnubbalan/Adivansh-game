# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm test             # unit tests (vitest)
npm run test:e2e     # Playwright E2E (starts vite dev server automatically)
npm run build        # TypeScript check + production build to dist/
npm run dev          # local dev server at http://localhost:5173
```

Run a single unit test file:
```bash
npx vitest run tests/unit/combat.test.ts
```

Run a single E2E test:
```bash
npx playwright test tests/e2e/game.spec.ts --project=chromium
```

Convert SVG art assets to PNG (run once after adding new SVG sources):
```bash
node scripts/svg-to-png.mjs
```

Create a PR (gh CLI is authenticated):
```bash
gh pr create --title "..." --body "..." --base main --head <branch>
```

## URL query parameters (dev/test)

- `?quality=low|medium|high` — override VFX tier; `low` forces Canvas renderer (required for headless CI)
- `?debug` — exposes `window.__ADIVANSH__` (Phaser game instance) for browser QA assertions
- `?artProof` — loads `CharacterArtProofScene` instead of `ForestScene`

## Architecture

**Stack:** Phaser 3.90 + TypeScript + Vite. Single scene (`ForestScene`) orchestrates all gameplay. No engine migration without a measured spike and ADR.

**`ForestScene` is a thin orchestrator** — it creates systems and entities, wires them together, and ticks them each frame. Gameplay logic lives elsewhere:

| Path | What goes here |
|---|---|
| `src/game/tuning.ts` | All gameplay numbers (speeds, reach, cooldowns, HP) — edit here first |
| `src/game/combat.ts` | Pure combat rules — no Phaser, fully unit-tested |
| `src/entities/` | `Player`, `Guardian` — movement, state, sprite poses |
| `src/systems/` | `InputSystem`, `CombatSystem`, `StorySystem` |
| `src/world/forestLayout.ts` | Platform/clue/shrine coordinates (data only) |
| `src/world/ForestLevel.ts` | Builds static level from layout data |
| `src/world/artManifest.ts` | Runtime asset list with explicit PNG sizes |
| `src/vfx/` | `VfxManager`, `Atmosphere`, `quality.ts`, `textures.ts` |
| `src/story/chapterOne.ts` | Milestone text and quest flags |
| `src/core/events.ts` | Typed event name constants shared between canvas and DOM |
| `src/main.ts` | Phaser boot + DOM HUD bridge (health, toast, touch buttons) |

**Key rules:**
- Gameplay never creates particles directly — always call `VfxManager`.
- Tunable numbers → `tuning.ts`. Layout coordinates → `forestLayout.ts`. New events → `core/events.ts`.
- Logic that is free of Phaser imports (rules, layout, quality) can be covered by Vitest.
- `src/vfx/quality.ts` auto-detects device capability; `?quality=low` forces Canvas renderer for headless CI.

**Assets:** SVGs are pre-converted to PNGs via `scripts/svg-to-png.mjs` and committed. `artManifest.ts` lists the PNGs. `ForestScene.preload()` uses `load.image()` (not `load.svg()`) to avoid WebGL `texImage2D` failures on remote servers. PNG IHDR dimensions must match declared sizes in `artManifest.ts` — the unit test verifies this.

## CI / CD

- **`ci.yml`** — PR quality gate: unit tests → Playwright E2E (chromium only) → build. Must pass before merge.
- **`deploy.yml`** — On merge to main: same gates + GitHub Pages deploy + post-deployment browser QA.
- Both workflows run on **`ubuntu-24.04`** (not `ubuntu-latest`, which migrated to Ubuntu 26 in Oct 2026 and broke Playwright's `--with-deps` install).
- Playwright projects: `chromium` (desktop) and `mobile-chromium` (390×844, touch). WebKit was removed — it was never verified on Linux headless.
- **Never push directly to main.** All changes go through a PR.

## Agent team

`.github/workflows/agent-cycle.yml` runs every 4 hours using `anthropic/claude-code-action@v1`. It reads `.github/agents/adivansh-cycle.md` and the full docs to select one bounded task, then opens a PR on `automation/adivansh-agent-cycle`.

Requires `ANTHROPIC_API_KEY` secret set in GitHub → Settings → Secrets → Actions.

Active Chapter One milestone issues: **#10** (parent), **#12** (gameplay), **#13** (exploration), **#14** (QA).

## Workflow rules

- Never push directly to `main`. Open a PR; CI must pass before merge.
- Do not change `agent-cycle.yml`, branch protection, or deployment config without documenting the reason.
- Do not auto-merge changes to workflows, secrets, engine/architecture, or major art direction.
- A green CI run is not a commercial release — human playtesting and real-device QA are separate requirements.
