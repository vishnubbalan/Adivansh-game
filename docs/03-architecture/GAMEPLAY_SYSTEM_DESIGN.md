# Gameplay System Design

> Logical design target; verify actual code paths before treating a module as implemented.

## Runtime ownership
- Scene owns lifecycle and composition, not business rules.
- Player controller owns player movement/state.
- Combat service owns attack resolution and damage rules.
- Enemy controller owns enemy state and intent.
- Interaction system resolves nearby actionable objects.
- Quest system owns canonical milestone state.
- HUD observes state/events and renders feedback.
- Save adapter serialises validated progress.
- Audio/VFX react to domain events and never decide quest outcomes.

## Event contract
Use typed, documented events such as player-damaged, enemy-defeated, interaction-started, item-collected, milestone-completed, checkpoint-reached and chapter-completed. Include stable entity IDs and relevant context. Avoid untyped string payloads scattered across scenes. Events that mutate canonical state must be handled exactly once or be idempotent.

## State and determinism
Gameplay state should be reproducible from inputs and configuration where practical. Random behaviour must use a controlled seed in tests. Avoid timers and asynchronous callbacks that mutate destroyed scenes. Every scene transition cancels or disposes subscriptions, timers, tweens and input listeners.

## Collision and combat
Separate physical collision from attack hitboxes and hurtboxes. Define collision layers/masks. Provide a debug overlay for bounds. Register one hit per target per attack instance unless the move explicitly supports multi-hit. Resolve simultaneous damage with a documented order.

## Enemy state machine
Initial state set: idle, patrol, detect, approach, telegraph, attack, recover, stagger, defeated. Each transition needs guards and timeout behaviour. Bosses may add phase states but reuse shared combat contracts. Difficulty parameters belong in data/config, not duplicated conditionals.

## Content data
Chapter, enemy, item, dialogue and weapon definitions should move toward schema-validated data files. Include stable IDs, versioning, required-field validation and safe fallback for missing optional content. Never let user-facing dialogue text control quest flags.

## Persistence boundary
Expose a SaveRepository interface. Start with local storage only if and when required. Include schema version, timestamp, chapter ID, milestones and checkpoint payload. Validate on read; migrate known older versions; reject corrupt data safely; provide a reset path. Never store secrets or unnecessary personal information.

## Observability
Development builds may expose debug state, collision overlays and structured logs. Production logs should be sparse, privacy-conscious and useful for crash diagnosis. Include commit/build identifier in diagnostics without personal data.

## Required architecture tests
Test state transition legality, event idempotency, combat hit registration, quest prerequisites, scene disposal, save migration and malformed save handling. Integration tests must cover a full Chapter One flow.
