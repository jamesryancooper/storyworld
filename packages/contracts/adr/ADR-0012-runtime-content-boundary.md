# ADR-0012 — BeKindRewind imports immutable runtime content releases and owns all runtime and player state

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: the interactive-runtime boundary
- Canonical sources: part 01 (executive decision), part 04 §12, Appendix A ADR-012

## Context

BeKindRewind needs Storyworld's canon — locations, NPCs, missions, items,
dialogue — but is itself a real-time system with rendering, physics,
navigation, saves, and live operations. Absorbing runtime concerns would
turn Storyworld into a game engine (an explicit non-goal); absorbing player
state would pollute canon with per-player facts.

## Decision

Storyworld compiles authored, approved source content into immutable
`RuntimeContentRelease` packages (manifest, entities, dialogue, mission
graph, triggers, asset index, checksums, rights, compiler versions). The
runtime imports exact versions, returns acceptance/rejection receipts and
aggregate observations, and owns everything at execution time: geometry,
physics, quest execution, player inventory/progression/saves, deployment.
Player-specific state never becomes canon; aggregate telemetry may inform
reviewed iteration proposals. Emergency runtime hotfixes reconcile through a
later explicit import — compiled files never silently become canon. The
runtime must remain operable without a live Storyworld connection.

## Consequences

- Storyworld stays a content compiler with a target-specific compiler SDK.
- Round-trip validation (dangling references, impossible missions, budget
  violations) happens at compile time, not in production.
- The same boundary pattern generalizes to future runtime targets.

## Alternatives considered

- Live runtime queries against the Engine: rejected — availability coupling
  and runtime-state leakage.
- Shared content database: rejected — ADR-0001/ADR-0010 reasoning applies.
