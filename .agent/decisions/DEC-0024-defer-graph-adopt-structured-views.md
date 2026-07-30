---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0024",
  "status": "proposed",
  "previous_status": null,
  "title": "Phase 0 D6: defer the graph/canvas; adopt episode-grouped structured views with an inspector",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; acceptance is reserved to the project owner",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Whether and what graph/canvas Studio builds, and which structured alternatives carry the mockups' story-structure intent instead. Governs SWUX-012 and the Phase 3 shape of the Arc workspace (FG-08/09/10/12/14/15).",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Proposal only; the structured views land under Phase 3 tasks after acceptance and after Phase 1/2 gates.",
    "Deferring the canvas is not rejecting the mockups' story-structure intent — episode grouping, story-time legibility, and selection/inspector synchronization are carried by the structured views."
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

## Decision

1. **Defer the graph/canvas.** No spatial canvas is built in this program's
   phases. Every graph-specific meaning (edges, position, grouping by
   spatial arrangement, zoom/fit semantics) remains undecided and therefore
   unbuilt.
2. **Adopt structured views instead** (Phase 3, after Phase 1/2 gates):
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
3. **Re-entry condition.** A canvas may be proposed later only through a
   successor decision that fixes graph scope and edge semantics, requires a
   synchronized structured alternative with complete information and
   actions, and cites participant evidence. Any such graph is a view over
   Engine state — never an authority source, and never a surface where a
   spatial gesture performs a consequential action.

## Consequences

- Benefits: story-structure legibility without inventing unaccepted
  semantics; the full accessibility and authority safeguards the program
  requires for a canvas are not spent on an unproven view.
- Costs: the mockups' visual impression is only partially realized; some
  M1 atmosphere is intentionally not pursued.
- Risks: episode grouping presumes `parent_unit_ref` usage — Phase 3 must
  handle unparented units explicitly.
- What remains undecided: all spatial semantics; whether participants need
  a canvas at all.

## Validation and rollback

- Evidence: REV-0001 §10 unknowns; EVD-0022 structural absences. Phase 3
  must show equivalent task completion through the structured views at
  narrow widths, 200% zoom, and keyboard-only, with story-time vs
  presentation-order meaning preserved in the narrow fallback.
- Reversal or successor path: a successor decision can introduce a canvas
  under the stated re-entry condition; nothing in this decision blocks it.
