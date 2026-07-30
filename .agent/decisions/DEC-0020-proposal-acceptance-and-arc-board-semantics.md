---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0020",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Phase 0 D2: proposal acceptance and dual-mode Arc Board authoring (direct or queued, phased build)",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; amended 2026-07-30 on the owner's instruction to the dual-mode shape; accepted by the project owner (Ryan Cooper) in-session on 2026-07-30: “I accept all nine as written.”",
  "owner": "ryan-cooper (project owner)",
  "scope": "The exact transition performed by canon proposal acceptance; Arc Board authoring as an owner-selectable per-property mode (direct accepted revision or queued proposal) with governed toggle semantics; and the supersession/validation rules every structure change must obey in both modes. Unblocks SWUX-002 and SWUX-007.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted 2026-07-30: direct mode lands under the Phase 1 task; queued mode plus the toggle land as their own bounded follow-on task after the Phase 1 exit gate.",
    "Until the follow-on task ships, the authoring mode is fixed to direct and no toggle UI exists.",
    "Multi-author draft staging, per-role forced modes, and assignment remain out of scope until a collaboration model exists (DEC-0025 successor)."
  ]
}
---

## Context

REV-0001 SWUX-002 (P0): `Accept` immediately creates a working-canon revision
from a compact row, and Arc Board's "Add unit" directly records
`structure.accepted` (`packages/kernel/src/releases.ts:91`) with no
confirmation. SWUX-007 (P1): the Arc Board client rebuilds the structure
document from four fields, dropping seven of the eleven schema-required
top-level fields and required per-unit fields, and the Engine stores the
document verbatim with no contract validation (`releases.ts:79-99`;
EVD-0022). The program requires deciding whether Arc authoring is a draft,
proposal, or direct accepted revision.

Amended 2026-07-30 while proposed, on the owner's instruction: instead of a
single direct mode, Arc Board authoring supports both direct and queued
modes behind a governed per-property setting, built in phases.
"Author now, decide later" is a legitimate single-owner working style, so
queued mode is a supported choice rather than a rejected alternative.

## Decision

1. **Proposal acceptance** (`canon_approval` layer): accepting a canon
   proposal creates exactly one working-canon revision bound to the exact
   proposal payload and target branch, superseding the revision it was
   decided against. It never creates or modifies a canon release, production,
   pin, or narrative structure. Rejection records the decision with no canon
   change. Both outcomes produce receipts per DEC-0023 and pass through the
   Phase 1 pre-decision consequence review.
2. **Arc Board authoring modes** (`creative_plan_approval` layer). A
   per-property setting selects one of two modes:
   - *Direct* (default): saving records the accepted structure revision
     immediately — but only through the pre-decision consequence review.
     The sole authorized role is both author and decider, so this is the
     single-owner ergonomic path.
   - *Queued*: saving submits a structure proposal into the Review Room
     queue. Nothing changes the accepted plan until an authorized human
     accepts the proposal there, through the same consequence review,
     producing the same receipt. Supports deferred and batched
     self-review today and rehearses the future multi-author workflow.
3. **Safeguards apply in both modes**:
   - *Complete-document rule*: edits operate on the full current contract
     document; only intended fields change; all untouched fields — known and
     unknown — are preserved exactly.
   - *Server-side validation*: the Engine validates the resulting document
     against `narrative-structure.schema.json` before storage — at save in
     direct mode; at submission and again at acceptance in queued mode.
     Nonconforming documents are rejected (fail closed).
   - *Explicit supersession*: the recorded revision names the exact revision
     it supersedes. In direct mode a stale base is rejected at save; in
     queued mode the base is revalidated at acceptance time, and a moved
     base rejects the acceptance with reconciliation guidance while
     preserving the proposal. The creator's input is preserved in every
     rejection path.
   - *Pre-decision review*: the shared Phase 1 consequence review precedes
     the moment `structure.accepted` is recorded — the save in direct mode,
     the queue decision in queued mode.
4. **Toggle semantics** (the mode setting is itself governed):
   - Scope: per property. Default: direct.
   - Authority: only `property_owner` may change it (DEC-0021).
   - Point-of-action visibility: the Arc Board save control always names its
     mode — "Save as accepted revision" versus "Submit for review" — so the
     same click never silently changes meaning based on remote state.
   - Recorded: every flip writes an audit receipt (action
     `structure.authoring_mode.changed`) carrying actor, role, property, and
     old/new mode.
   - No mid-flight surprises: the submission is validated against the
     current mode server-side; if the mode changed after the form loaded,
     the submission is rejected with the new mode named and the creator's
     input preserved.
5. **Phased build**: Phase 1 ships direct mode with all safeguards (the
   SWUX-002/SWUX-007 remediation). Queued mode and the toggle land as their
   own bounded follow-on task immediately after the Phase 1 exit gate,
   reusing the shared pre-decision review and the DEC-0023 receipt
   substrate. Until then the mode is fixed to direct with no toggle UI.
6. **Rejected alternatives**: queue-only routing for all edits (pure
   friction with no oversight gain while a single authorized human is both
   author and decider); building both modes inside Phase 1 (roughly doubles
   its Arc scope while safety-critical fixes wait).

## Consequences

- Benefits: preserves creative work (SWUX-007), makes plan acceptance
  deliberate (SWUX-002), keeps single-owner ergonomics, and adds a
  supported author-now/decide-later workflow that rehearses the future
  multi-author queue on real primitives.
- Costs: beyond the Phase 1 direct-mode work — a structure-proposal type in
  persistence and kernel, queue rendering with structure diffs,
  apply-on-accept with moved-base reconciliation, toggle plumbing and
  receipts, and dual-path tests.
- Risks: mode confusion (mitigated by point-of-action labels and receipted
  flips); queued proposals aging against a moving base (mitigated by
  acceptance-time revalidation); a larger Arc test surface.
- What remains undecided: multi-author defaults and per-role forced modes
  (future collaboration model); whether queued structure proposals share the
  canon-proposal queue or get their own lane (follow-on task design
  detail); unit edit/delete flows beyond add (Phase 3 planning).

## Validation and rollback

- Evidence: EVD-0022 (reduced-document and no-validation citations).
  Phase 1 (direct mode) must add a contract-complete fixture (choices,
  branches, POV, parent links, hashes) proving byte-for-byte preservation
  of unaffected fields, a stale-supersession rejection test, and
  no-single-step acceptance tests for pointer and keyboard. The follow-on
  task (queued mode + toggle) must add: submit-then-accept round trip;
  acceptance-time stale-base rejection preserving the proposal;
  mode-mismatch-at-submit rejection preserving input; receipted flips; and
  point-of-action label tests in both modes.
- Reversal or successor path: successor decision; the toggle can be removed
  by fixing the mode to direct without data loss, provided queued proposals
  are first drained or explicitly voided.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-30 in the operator
session — “I accept all nine as written” — covering DEC-0019 through DEC-0027
as amended (DEC-0020/0024/0026 amended 2026-07-30 on owner direction).
Recorded by claude-agent on the owner's instruction.
