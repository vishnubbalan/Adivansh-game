# Adivansh — Architecture Decision Records

Append material decisions here; do not silently rewrite history.

## ADR-001 — Retain Phaser 3 for the current vertical slice
**Status:** Accepted. Keep Phaser 3 + TypeScript + Vite while improving the existing game. Benchmark before considering Phaser 4. Avoid unnecessary version-specific coupling.

## ADR-002 — Premium cinematic 2D and commercial-first
**Status:** Accepted. Prioritise a complete, polished and playtested Chapter One before expanding scope or investing in large online systems.

## ADR-003 — Original cross-cultural fantasy art direction
**Status:** Accepted. Greek-inspired original heroic character styling; Indian-Chinese-inspired environments in a fictional mythic realm. Broad Ramayana thematic inspiration, not conventional Ramayana character depiction. Maintain an art bible and review originality, cultural coherence and commercial rights.

## ADR-004 — Deterministic gameplay AI
**Status:** Accepted. Use finite-state machines initially, then Behaviour Trees/Utility AI where justified. No LLM for real-time combat or authoritative quest progression.

## ADR-005 — Demand-led online services
**Status:** Accepted. Start with local/offline-capable gameplay. Add cloud saves, accounts, analytics or generated dialogue only when player demand, privacy design and cost justify them.
