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


## Autonomous AI development pipeline

The repository includes an OpenAI Codex-powered development cycle scheduled every three hours (UTC) in `.github/workflows/agent-cycle.yml`.

- The agent reads the project roadmap and agent role documents, selects one bounded improvement, implements it, and adds tests.
- It opens or updates a pull request rather than pushing directly to `main`.
- Pull requests run `npm test`, Playwright E2E tests, and `npm run build` through the `CI / quality-gates` workflow.
- The agent workflow requests GitHub auto-merge. GitHub merges only after required branch-protection checks pass.
- A merge to `main` triggers the Pages deployment workflow and its deployed-site browser smoke tests.

### One-time GitHub setup

1. Add repository secret `OPENAI_API_KEY` under **Settings → Secrets and variables → Actions**. Use an OpenAI API key with API billing enabled; a ChatGPT subscription is not an API key.
2. Under **Settings → General → Pull Requests**, enable **Allow auto-merge**.
3. Under **Settings → Branches** (or repository rulesets), protect `main` and require the status check **CI / quality-gates** before merging. Do not allow bypass of this requirement for the automation bot.
4. Ensure Actions are enabled and the repository's Pages source remains **GitHub Actions**.
5. The workflow's `GITHUB_TOKEN` needs repository Actions permissions to create pull requests and enable auto-merge. If repository policy restricts this, adjust **Settings → Actions → General → Workflow permissions** to allow read/write access.
6. Run **Actions → Adivansh autonomous agent cycle → Run workflow** once to verify the configuration.

The first successful agent cycle is not proof of production quality. Automated browser tests are smoke/regression checks; real device testing and human playtesting remain necessary. The agent must not claim that generated placeholders are finished game art.

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
