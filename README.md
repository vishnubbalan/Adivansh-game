# Adivansh — The Search for the Queen

A cinematic, premium 2D side-scrolling action-adventure inspired by the Ramayana. The current browser prototype uses Phaser 3, TypeScript and Vite. The product direction is a polished commercial-quality 2D experience, beginning with one complete Chapter One vertical slice.

## Product direction and technology roadmap

The approved direction is **Premium Cinematic 2D**, with **commercial viability as the first priority**. The game should compete through original illustrated art, responsive combat, memorable exploration, reliable mobile performance and a polished player journey—not by accumulating technologies.

See [Technology & Commercial Roadmap](docs/TECHNOLOGY_AND_COMMERCIAL_ROADMAP.md) for the target architecture, phased delivery plan, commercial validation, agent responsibilities and release gates.

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
npx playwright install --with-deps chromium webkit
npm run test:e2e
npm run build
```

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Set the build and deployment source to **GitHub Actions**.
3. Open **Actions** and monitor the **Build, test and deploy** workflow.
4. After a successful deployment, the game is available at:

   https://vishnubbalan.github.io/Adivansh-game/

The deployment workflow runs on pushes to `main` and can be started manually. The autonomous development cycle is separately scheduled every eight hours (UTC), corresponding to 05:30, 13:30 and 21:30 India Standard Time. These are scheduled cycle starts, not guaranteed releases; a cycle may produce no change, be blocked, or leave a pull request awaiting checks/review.

## Autonomous AI development pipeline

The repository includes an OpenAI Codex-powered development cycle in `.github/workflows/agent-cycle.yml`.

- Five role prompts coordinate innovation, product analysis, implementation, QA and orchestration.
- Each cycle selects one bounded, independently testable improvement aligned with the approved product roadmap.
- Changes are proposed through a pull request, not pushed directly to `main`.
- Pull requests run the configured unit, browser E2E and build checks.
- GitHub auto-merge is requested only where repository settings permit it and required checks pass.
- A merge to `main` triggers Pages deployment and deployed-site smoke tests.

### One-time GitHub setup

1. Add repository secret `OPENAI_API_KEY` under **Settings → Secrets and variables → Actions**. API billing is separate from a ChatGPT subscription.
2. Under **Settings → General → Pull Requests**, enable **Allow auto-merge** if unattended merging is desired.
3. Protect `main` and require the configured CI status check before merging.
4. Ensure Actions are enabled and Pages source is **GitHub Actions**.
5. Confirm workflow token permissions allow the required PR operations.
6. Run **Actions → Adivansh autonomous agent cycle → Run workflow** once to validate the setup.

Do not enable unattended merging until the first complete cycle, pull request, required checks and deployment have been verified. Keep human approval for significant art direction, commercial decisions and releases until the process is demonstrably reliable.

## Current prototype limitations

- Character and environment art are procedural placeholders, not final production artwork.
- Combat, quest progression and the first chapter remain early-stage.
- Save progress, a journal, audio and further chapters are planned, not completed.
- Browser automation is not a substitute for human gameplay or real iPhone/iPad Safari validation.
- A successful build or CI run does not establish commercial readiness.

## Delivery principle

Prioritise a complete, polished and playtested Chapter One vertical slice before expanding to five chapters, multiplayer or expensive online services. Review the technology roadmap for measurable performance, quality, licensing, privacy and commercial gates.
