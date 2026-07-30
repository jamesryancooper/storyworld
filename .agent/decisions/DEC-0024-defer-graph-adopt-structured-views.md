---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0024",
  "status": "proposed",
  "previous_status": null,
  "title": "Phase 0 D6: defer the graph/canvas during this program; adopt structured views; planned post-program graph follow-on",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; amended 2026-07-30 on the owner's instruction to record the post-program implementation intent; acceptance is reserved to the project owner",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Whether and when Studio builds a graph/canvas, which structured alternatives carry the mockups' story-structure intent during this program, and the recorded owner intent to implement the graph after the program completes. Governs SWUX-012 and the Phase 3 shape of the Arc workspace (FG-08/09/10/12/14/15).",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Proposal only; the structured views land under Phase 3 tasks after acceptance and after Phase 1/2 gates.",
    "Recording the post-program intent does not authorize the follow-on: the graph still requires its semantics successor decision and its own bounded, owner-authorized implementation task at that time.",
    "Deferring the canvas within this program is not rejecting the mockups' story-structure intent — episode grouping, story-time legibility, and selection/inspector synchronization are carried by the structured views."
  ]
}
---

## Context

Both mockups center a spatial narrative graph, but the static images do not
establish edge semantics (chronology vs causation vs presentation vs
dependency), position meaning, hidden-item handling, keyboard model, zoom
scope, or narrow fallback (REV-0001 §10; SWUX-012 P1). The program instructs:
if these meanings are not accepted, defer the graph rather than inventing
them. The narrative-structure contract already contains units, choices,
branches, threads, story time, and presentation order — the information the
mockups visualize — and the current Arc Board renders a plain table over a
reduced document (SWUX-007).

Amended 2026-07-30 on the owner's instruction: the graph is deferred for the
current program of work, and the owner intends to implement it afterward.
This record therefore adds a planned post-program follow-on instead of an
open-ended, evidence-gated deferral.

## Decision

1. **Defer the graph/canvas during this program.** No spatial canvas is
   built in Phases 1–3. Every graph-specific meaning (edges, position,
   spatial grouping, zoom/fit semantics) remains undecided during the
   program and therefore unbuilt.
2. **Adopt structured views** (Phase 3, after Phase 1/2 gates):
   - *Episode-grouped Arc views* keyed by `parent_unit_ref` (mockup M2's
     episode-lane intent) over the complete contract document;
   - a *selected-unit inspector* synchronized with the Arc table (FG-15),
     showing authoritative unit metadata, story time, presentation order,
     lineage, and decision context;
   - explicit, independently labeled *story time* and *presentation order*
     columns (mockup M1's strongest intent; already independent in the
     contract);
   - *choices and branches* rendered as structured lists once SWUX-007
     preservation lands (FG-14) — never as inferred spatial edges.
3. **Planned post-program follow-on** (owner intent, recorded): after the
   Phase 3 exit gate — the structured views and inspector are the graph's
   synchronized substrate — the follow-on proceeds in two steps:
   - *Semantics successor decision*: fixes graph scope (node set), edge
     meanings (chronology, presentation order, choice/branch), grouping,
     selection, pan/zoom/fit/reset, hidden-item counts, keyboard model, and
     the narrow/stacked fallback. Usability validation informs this design;
     it is no longer a precondition for starting the follow-on.
   - *Bounded implementation task* (separately owner-authorized) under the
     program's safeguards: the graph is a synchronized view over Engine
     state with the structured views carrying complete information and
     actions; it is never an authority source; no consequential action
     occurs through a spatial gesture; browser zoom stays independent;
     reduced-motion and forced-colors behavior, legend, filter counts, and
     lost-position recovery are required.

## Consequences

- Benefits: story-structure legibility now without inventing unaccepted
  semantics; a clear, ordered path to the canvas the mockups depict; the
  follow-on lands on proven context, inspector, and receipt primitives.
- Costs: the mockups' spatial impression waits until after the program;
  the semantics decision is real design work before any canvas code.
- Risks: episode grouping presumes `parent_unit_ref` usage — Phase 3 must
  handle unparented units explicitly; follow-on scope creep is bounded by
  the two-step structure.
- What remains undecided: all spatial semantics, reserved for the successor
  decision; the follow-on task's exact scope and timing.

## Validation and rollback

- Evidence: REV-0001 §10 unknowns; EVD-0022 structural absences. Phase 3
  must show equivalent task completion through the structured views at
  narrow widths, 200% zoom, and keyboard-only, with story-time vs
  presentation-order meaning preserved in the narrow fallback. The
  follow-on implementation must additionally pass the program's graph
  safeguards (synchronized-alternative parity, keyboard/zoom/motion/
  forced-colors checks, no consequential spatial gestures).
- Reversal or successor path: the semantics successor decision governs the
  canvas; the owner may cancel or re-defer the follow-on at that decision
  without affecting the structured views.
