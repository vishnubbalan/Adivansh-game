# Adivansh — Story & Visual Production Plan

## Three-agent production loop

### Agent 1 — Product Analyst / Game Designer
Owns narrative continuity, chapter objectives, character motivations, level beats, visual references, accessibility and acceptance criteria.

### Agent 2 — Game Developer
Owns Phaser 3 + TypeScript implementation, scene composition, animation state machines, camera, input, combat, progression and performance.

### Agent 3 — QA Engineer
Owns unit tests for story data, Playwright browser tests, keyboard/touch parity, viewport coverage, collision and progression checks, regression reporting.

These are role-based passes coordinated in ChatGPT, not three independently running agents. A chapter is promoted only after design, implementation and QA review.

## Narrative premise

The queen has been abducted by a force moving through the southern kingdoms. The prince follows a trail from the palace frontier into the Whispering Forest. A guardian demon protects the old road. After defeating it, the prince discovers a golden thread torn from the queen's veil. The thread points to the Forgotten Temple, where the next chapter begins.

## Chapter roadmap

1. **The Whispering Forest** — learn movement, jump and sword combat; defeat the guardian; recover the golden thread.
2. **The Forgotten Temple** — explore collapsed halls, solve a light-and-shadow mechanism, evade temple sentinels.
3. **The River of Ashes** — cross a dangerous river gorge, rescue a stranded messenger, learn the queen was taken north.
4. **The Demon Citadel** — infiltrate the fortress, defeat elite guards, discover the queen's location.
5. **The Final Passage** — confront the antagonist, rescue the queen and resolve the kingdom's fate.

## Movie-like visual direction

- Compose each chapter in cinematic widescreen 16:9 with layered foreground, playable midground and distant matte-painting-style background.
- Use deep teal shadows, forest greens, warm gold highlights and ember red for danger.
- Use parallax layers, atmospheric fog, drifting leaves, fireflies, volumetric light shafts and restrained camera shake.
- Characters need idle, run, jump, fall, attack, hit and defeat states. Single static vector figures are temporary placeholders.
- Move towards authored sprite sheets and background plates as the art pipeline matures.
- Maintain readable silhouettes and contrast on laptop and mobile displays.

## Chapter One acceptance criteria

- Player can move right through a world wider than one screen; camera follows without exposing empty world edges.
- Demon can be defeated with directional melee attacks and clear hit feedback.
- Golden thread is placed at a reachable shrine; E works in interaction range and gives a useful hint otherwise.
- Defeating the guardian advances objective to the shrine clue.
- Collecting the clue completes Chapter One and announces the Forgotten Temple.
- Canvas remains visible within common desktop and mobile viewport sizes.
- Keyboard and touch controls provide equivalent core actions.

## QA gate

Run `npm test`, `npm run test:e2e`, and `npm run build`. Manually verify keyboard and touch controls, screen resize, horizontal camera travel, combat direction/range, clue proximity, milestone ordering and chapter completion. Report unverified checks as pending, not passed.
