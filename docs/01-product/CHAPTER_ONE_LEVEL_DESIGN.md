# Chapter One — The Last Harvest Festival: Level Design

**Status:** First playable implementation in progress. Narrative source: [Chapter One Story](CHAPTER_ONE_STORY.md).  
**Runtime scene:** `VillageFestivalScene`  
**Target:** A warm, non-combat tutorial chapter in Veyra.

## Narrative purpose

Let the player experience the peace, community and mutual trust that Adivansh and Meera will later fight to restore. The chapter begins as a celebration and ends with a restrained warning from the southern watch. It must not depict the abduction or village attack; those belong to later chapters.

## Critical path

1. **Festival entrance:** safe movement lane, establish the village and objective.
2. **Dev's lantern stand:** proximity interaction; a small helpful action introduces Interact.
3. **Ribbon-leap lane:** three low, forgiving hurdles teach jumping and landing. No damage or failure penalty.
4. **Ila's harvest store:** short conversation reinforces Meera's public leadership.
5. **Meera's festival dais:** conversation is gated behind the three village activities.
6. **Messenger arrival:** dusk warning, short dialogue sequence and chapter-end title beat.

## Spatial design

- Keep the main path horizontal and camera-readable.
- Ensure every NPC can be approached from the ground.
- Keep the three hurdles visually distinct and spaced for separate jumps.
- The dais is the far-end landmark; Meera must remain visible as the player approaches.
- Decorative stalls, streamers and lanterns must not obscure the player, NPC prompts or jump lane.
- Use separate collision geometry; decorative props are not physics blockers.

## Player learning objectives

Teach movement, jumping, landing, proximity interaction and objective feedback. No attack, health loss, combat, enemy AI or inventory is required in Chapter One. Hide the attack touch control in this scene while preserving it for the forest prototype.

## Completion criteria

- New player understands how to move, jump and interact.
- Dev, Tara/Kavi and Ila interactions each register once.
- Meera cannot be advanced to before the three activities are complete.
- Each ribbon hurdle requires a visible jump and can be retried without penalty.
- Messenger warning and chapter-complete event occur once only.
- Keyboard and touch controls both work.
- Prompts and dialogue remain readable at 390px viewport width.
- Restart and resize do not strand the player.
- Chapter Two is teased as planned content, not presented as playable.

## Preserved prototype

The earlier shrine / Guardian / Golden Thread forest segment is retained as a later forest-pursuit prototype and remains accessible through the development URL query `?forest`. It is not the canonical opening of Chapter One.
