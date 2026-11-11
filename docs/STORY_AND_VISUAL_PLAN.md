# Adivansh — Story & Visual Production Plan

## Approved product direction

Adivansh targets **premium cinematic 2D** with **commercial viability as the first priority**. Build one complete, polished and playtested Chapter One vertical slice before expanding the chapter count. See [Technology & Commercial Roadmap](TECHNOLOGY_AND_COMMERCIAL_ROADMAP.md) for the target stack, product validation, release gates and phased delivery plan.

## Production roles

- **Gaming Innovation Director:** propose evidence-backed game mechanics, visual/story innovations and player-experience improvements.
- **Product Analyst / BA:** own narrative continuity, chapter objectives, player value, backlog, scope and testable acceptance criteria.
- **Game Developer:** implement Phaser + TypeScript scenes, animation, camera, input, combat, progression, content loading and performance.
- **QA / Player Agent:** verify unit, browser, gameplay, responsive, accessibility and visual regression criteria; report evidence-backed defects.
- **Orchestration Agent:** coordinate scheduled cycles, pull requests, quality gates, deployment and status reporting.

These are role-based prompts coordinated by the repository automation; they are not five independent always-on workers.

## Narrative premise

The queen has been abducted by a force moving through the southern kingdoms. The prince follows a trail from the palace frontier into the Whispering Forest. A guardian demon protects the old road. After defeating it, the prince discovers a golden thread torn from the queen's veil. The thread points to the Forgotten Temple, where the next chapter begins.

## Chapter roadmap

1. **The Whispering Forest** — learn movement, jump and sword combat; defeat the guardian; recover the golden thread.
2. **The Forgotten Temple** — explore collapsed halls, solve a light-and-shadow mechanism, evade temple sentinels.
3. **The River of Ashes** — cross a dangerous river gorge, rescue a stranded messenger, learn the queen was taken north.
4. **The Demon Citadel** — infiltrate the fortress, defeat elite guards, discover the queen's location.
5. **The Final Passage** — confront the antagonist, rescue the queen and resolve the kingdom's fate.

## Premium 2D visual direction

- Use authored, cohesive 16:9 background plates with layered foreground, playable midground and distant painted environments.
- Establish an art bible for character silhouettes, proportions, palette, materials, lighting, UI and VFX before producing large asset batches.
- Use deep teal shadows, forest greens, warm gold highlights and ember red for danger, while maintaining readable contrast.
- Use parallax, atmospheric fog, drifting leaves, fireflies, light shafts, water effects and restrained camera shake where they support the scene.
- Characters need idle, run, jump, fall, attack, hit, defeat and ability states with consistent animation timing.
- Prefer reviewed original sprite sheets and authored background plates. AI-generated concept art is reference material until it is cleaned, approved, integrated and checked for commercial-use rights.
- Optimise atlas size, image resolution, loading and memory for mobile devices. Do not sacrifice responsiveness for decorative effects.
- Avoid representing Phaser primitive drawings as finished production art.

## Chapter One acceptance criteria

- Player can move right through a world wider than one screen; camera follows without exposing empty world edges.
- Demon can be defeated with directional melee attacks and clear hit feedback.
- Golden thread is placed at a reachable shrine; E works in interaction range and gives a useful hint otherwise.
- Defeating the guardian advances objective to the shrine clue.
- Collecting the clue completes Chapter One and announces the Forgotten Temple.
- Canvas remains visible within common desktop and mobile viewport sizes.
- Keyboard and touch controls provide equivalent core actions.
- Player receives clear feedback for damage, attack range, objective changes, checkpoint/restart and chapter completion.
- The chapter can be completed from start to finish without developer tools or hidden commands.

## Commercial vertical-slice gate

Before describing Chapter One as launch-ready, require:
- Human playtest evidence covering onboarding, controls, combat clarity, difficulty and completion.
- Reviewed final art/audio assets with commercial-use rights documented.
- Responsive checks on representative desktop and mobile devices, including real iOS Safari.
- Performance and memory measurements on agreed target devices.
- Accessibility checks for contrast, text, control size, pause and audio settings.
- No open P0/P1 defects and a reproducible release build.

## QA gate

Run `npm test`, `npm run test:e2e`, and `npm run build`. Manually verify keyboard and touch controls, screen resize, horizontal camera travel, combat direction/range, clue proximity, milestone ordering and chapter completion. Capture reviewed visual baselines for changed scenes. Report unverified checks as pending, not passed. A passing screenshot comparison does not by itself approve artistic quality.
