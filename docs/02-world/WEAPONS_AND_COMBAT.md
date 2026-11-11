# Adivansh — Weapons and Combat Design

## Combat goals
Combat must be responsive, readable, tactical and rewarding. Each weapon changes the player's approach rather than only changing damage numbers. Enemy attacks need clear anticipation, active frames and recovery windows.

## Weapon families

### Traditional / historically inspired
- **Sword:** balanced range, speed and combos.
- **Spear:** longer reach, thrusts and spacing control.
- **Bow:** ranged precision with ammunition or cooldown balance.
- **Shield:** blocks, parries and counters.
- **Staff:** reach, sweeping attacks and control.
- **Dual blades:** fast close-range attacks with positioning risk.

These are fictional gameplay interpretations of broad weapon families, not claims of exact historical reconstruction.

### Mythic / fantasy
- **Celestial blade:** charged strikes and special energy effects.
- **Runic bow:** elemental or ricochet arrows.
- **Guardian staff:** barriers and area control.
- **Chain weapon:** pulls, disarms or traversal interactions.
- **Relic gauntlet:** short-range power bursts and environmental activation.

### Ancient-futurist / arcane technology
Use sparingly to suggest a lost advanced civilisation: energy-edged weapons, mechanised bow limbs, resonance devices, temporary force shields and modular relic attachments. They should feel like ancient craft, not modern firearms pasted into a fantasy setting. Firearms are not part of the initial core direction unless separately approved.

## Progression
Unlock equipment through story, exploration and challenges. Upgrades should involve trade-offs such as reach vs speed or power vs recovery. Avoid excessive grind and pay-to-win progression. Keep the first chapter's weapon set small enough to balance and teach.

## Mechanics
Directional attacks, clear hitboxes/hurtboxes, wind-up/active/recovery windows, readable hit stun, dodge/defence rules, telegraphed enemy attacks, boss phases and fair recovery windows. Provide accessibility options for timing/difficulty where feasible.

## Enemy AI
Start with deterministic finite-state machines: idle, patrol, alert, approach, telegraph, attack, recover, stagger and defeat. Add Behaviour Trees or utility scoring only when complexity warrants it. Do not use a generative LLM for frame-by-frame combat decisions.

## Balance record
For each weapon document damage, range, startup, active duration, recovery, resource costs, hitbox, stagger rules, intended matchups and touch-control implications. Validate through repeatable tests and player observation.
