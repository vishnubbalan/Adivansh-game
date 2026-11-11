# Gameplay Specification

> Status: target design. A feature is implemented only when the code and verification evidence say so.

## 1. Player experience
Adivansh is a single-player, side-scrolling action-adventure. The player should understand the immediate objective, trust the controls, read enemy intent, and feel rewarded for exploration. Every mechanic must serve traversal, combat, discovery or narrative.

## 2. Core gameplay loop
1. Arrive in a visually legible area and receive a concise objective.
2. Traverse platforms, hazards and optional routes.
3. Observe enemies and environmental clues.
4. Fight, evade or use the environment.
5. Interact with mechanisms, characters, shrines and discoveries.
6. Earn a story, ability or equipment reward.
7. Reach a checkpoint and progress to the next encounter.

A chapter should vary the rhythm: quiet exploration → traversal challenge → combat encounter → discovery → escalation → set-piece/boss → narrative resolution.

## 3. Player controller
The controller is a finite-state system. Initial states: idle, run, jump-rise, fall, attack, hurt, dodge/defend (when implemented), interact, defeat and scripted. Define legal transitions and interrupt rules explicitly.

- Ground movement must accelerate/decelerate predictably and stop without drift that harms precision.
- Jump input must be responsive; consider a short input buffer and coyote time after playtesting.
- Attack input must have clear startup, active and recovery phases.
- Hurt/defeat states must prevent invalid actions.
- Scripted sequences must restore control reliably, including on scene restart.
- Animation communicates state; animation completion must not be the sole source of gameplay truth.

## 4. Combat rules
Each attack defines damage, reach, startup frames/time, active window, recovery, hit-stun, knockback, cooldown/resource cost and interruptibility. Hitboxes must be debug-visualisable. Avoid damage being applied repeatedly on every frame of one overlap; use per-swing hit registration.

Enemy attacks need a readable telegraph, an active danger window and a recovery window. A fair encounter gives the player enough information and time to respond. Boss phases must be deterministic and testable.

## 5. Exploration and interaction
Interactions use a consistent range check and priority rule when objects overlap. Show a prompt only when the action is available. Pressing interact outside range should provide a useful hint only where appropriate. Pickups and quest objects must be idempotent: collecting twice cannot duplicate rewards or corrupt progress.

Secrets should be discoverable through visual/audio clues, not pixel hunting. Optional paths should reward the player without blocking the critical path.

## 6. Quest and chapter state
Represent progress as explicit, serialisable state. Chapter One milestones currently named in source include `guardian-defeated` and `golden-thread-found`. State transitions must be validated; a later milestone cannot silently imply an earlier prerequisite unless the design explicitly allows it.

The HUD objective is a projection of canonical quest state. UI text must not be the source of truth. Chapter completion should be a single transition with a clear event and restart-safe handling.

## 7. Difficulty and fairness
Tune enemy health, damage, spacing, telegraphs, recovery and checkpoint placement together. Avoid difficulty spikes caused by multiple off-screen attacks or overlapping hitboxes. Accessibility options may include reduced damage, longer telegraphs, remappable controls and reduced screen shake; validate scope with players.

## 8. Camera, collision and level readability
The camera follows the player with bounded world edges and no visible empty-world exposure. Collision geometry should match the visible platform sufficiently closely. Foreground decoration must not hide hazards, interactables or enemy attacks. Camera shake is brief and configurable.

## 9. HUD and feedback
HUD should show only information needed at the current stage: health/status, objective, interaction prompt and contextual boss/ability information. Use distinct feedback for hit, blocked attack, pickup, quest update, checkpoint and chapter completion. Never rely on colour alone.

## 10. Save and recovery
Before persistent saves exist, document the actual restart behaviour. When introduced, use a versioned schema, validate on load, handle corrupt/unknown versions safely and never overwrite a valid save with malformed state. Checkpoints restore a defined subset of player/quest state.

## 11. Acceptance criteria template
For each feature specify: player goal; preconditions; action; expected visible/audio feedback; state change; failure/edge cases; keyboard/touch parity; viewport/device scope; automated test; human playtest requirement; performance impact.

## 12. Explicit non-goals for the first slice
No multiplayer, procedural open world, real-time LLM combat, mandatory online account, monetisation loops or unbounded inventory/crafting. Add only after validated player demand.
