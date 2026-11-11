# The Search for the Queen — Prototype 0.1.0

A mobile-first, 2D side-scrolling browser adventure inspired by the Ramayana. This first playable foundation includes a forest chapter, movement, jumping, a demon encounter, a collectible clue, and mobile touch controls.

## Run locally

Requires Node.js 22 LTS and npm.

```bash
npm install
npm run dev
```

## Controls

- Move: `A` / `D` or `←` / `→`
- Jump: `W`, `Space`, or `↑`
- Attack: `J`
- Interact: `E`
- Mobile: on-screen touch controls

## Quality checks

```bash
npm test
npx playwright install --with-deps chromium
npm run test:e2e
npm run build
```

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Set the build and deployment source to **GitHub Actions**.
3. Open **Actions** and monitor the **Build, test and deploy** workflow.
4. After a successful deployment, the game will be available at:

   https://vishnubbalan.github.io/Adivansh-game/

The workflow runs on every push to `main`, can be started manually, and is scheduled for 06:00 IST daily. The schedule rebuilds and republishes the latest committed code; it does not autonomously create new game features.

## Current prototype limitations

- Character and environment art are procedural placeholders, not final production artwork.
- Combat and the first clue are early mechanics; full quest progression and enemy defeat are not implemented.
- Save progress, a journal, sound, and additional levels remain planned.
- The game should be tested on target mobile devices before a wider release.

## Planned iteration

The next art upgrade is intended to add richly illustrated forest and temple environments, detailed animated hero and demon sprites, parallax layers, atmospheric effects, and improved combat feedback.

## Product / engineering workflow

- Product Analyst: refine story and write testable user stories.
- Developer: implement one approved story per increment.
- QA: independently verify acceptance criteria and report defects.
- Human owner: approve scope and release decisions.
