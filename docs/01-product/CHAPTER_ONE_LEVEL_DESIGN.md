# Chapter One — The Whispering Forest: Level Design Brief

> Status: design target. The live scene and this brief must be reconciled during implementation reviews.

## Narrative purpose
The hero enters a forest road following evidence that the queen was taken through the frontier. The forest guardian blocks the route. Defeating it reveals a golden thread connected to the queen and points toward the Forgotten Temple.

## Player learning objectives
Teach, in order: movement; jump and landing; basic melee attack; enemy telegraph and recovery; interaction range; objective/milestone feedback; chapter-end transition. Do not introduce several unfamiliar mechanics in one encounter.

## Encounter sequence
1. **Threshold / orientation:** establish mood and direction; show the first objective and safe movement space.
2. **Traversal lesson:** introduce a low-risk gap or raised path; communicate jump affordance through composition.
3. **First threat:** one low-pressure enemy or guardian preview teaches spacing and attack feedback.
4. **Combat arena:** provide enough horizontal room to see the guardian and react to telegraphs. Avoid hazards that obscure the lesson.
5. **Guardian climax:** clear entry cue, readable attack patterns, recoverable mistakes and unmistakable defeat feedback.
6. **Discovery beat:** reveal the shrine and golden thread; guide the player with composition and a contextual prompt.
7. **Chapter resolution:** collecting the clue updates the objective, confirms completion and introduces the Forgotten Temple.

## Spatial design rules
- Maintain a readable critical path with optional exploration pockets.
- Place platforms and collision boundaries consistently with visible art.
- Avoid placing important prompts under touch controls or HUD.
- Keep boss combat within a camera-safe arena.
- Do not place an untelegraphed hazard immediately after a forced camera transition.
- Ensure the player cannot soft-lock by jumping past an interactable or defeating the guardian in an unusual location.

## Narrative beats
Opening: absence and urgency, not a long exposition dump.
Midpoint: the guardian is protecting something or following a motive, not merely evil decoration.
Discovery: the golden thread confirms the queen passed through and raises a question about why the guardian guarded it.
Ending: the next chapter is clearly signposted without falsely implying later chapters are playable.

## Completion checklist
- New player can identify movement and objective without verbal coaching.
- All critical traversal is possible with keyboard and touch.
- Guardian attacks are telegraphed and avoidable.
- Guardian defeat is registered once.
- Shrine prompt appears only in interaction range.
- Golden thread collection is registered once and persists for the chapter session.
- Chapter completion cannot occur before required milestones.
- Restart and resize do not strand the player or corrupt state.
- Full route is completable without developer tools.
- Human playtest records confusion, deaths, time-to-complete and qualitative feedback.

## Level telemetry for playtests
Collect only with consent and minimal scope: start/finish, checkpoint/death counts, time in major sections and optional survey responses. Do not record personal identifiers by default.
