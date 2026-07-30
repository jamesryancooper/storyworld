---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0020",
  "status": "proposed",
  "previous_status": null,
  "title": "Phase 0 D2: proposal acceptance and Arc Board authoring semantics",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; acceptance is reserved to the project owner",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "The exact transition performed by canon proposal acceptance, whether Arc Board authoring is draft, proposal, or direct accepted revision, and the supersession/validation rules every structure save must obey. Unblocks SWUX-002 and SWUX-007.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Proposal only; implementation happens under Phase 1 tasks after acceptance.",
    "Multi-author draft staging is explicitly out of scope until a collaboration model exists (DEC-0025)."
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
proposal, or direct accepted revision, and what confirmation, impact review,
and receipt are required.

## Decision

1. **Proposal acceptance** (`canon_approval` layer): accepting a canon
   proposal creates exactly one working-canon revision bound to the exact
   proposal payload and target branch, superseding the revision it was
   decided against. It never creates or modifies a canon release, production,
   pin, or narrative structure. Rejection records the decision with no canon
   change. Both outcomes produce receipts per DEC-0023 and pass through the
   Phase 1 pre-decision consequence review.
2. **Arc Board authoring** (`creative_plan_approval` layer): remains **direct
   accepted-revision authoring by an authorized human** in the alpha — the
   sole authorized role is both author and decider, so a proposal queue for
   one's own structure edits adds friction without governance gain. Four
   conditions are mandatory on every save:
   - *Complete-document rule*: edits operate on the full current contract
     document; only intended fields change; all untouched fields — known and
     unknown — are preserved exactly.
   - *Server-side validation*: the Engine validates the resulting document
     against `narrative-structure.schema.json` before storage and rejects
     nonconforming documents (fail closed). A typed Engine command or
     validated patch is preferred over client-side reconstruction.
   - *Explicit supersession*: every save names the exact revision it
     supersedes; a stale base is rejected with explicit reconciliation
     guidance, and the creator's attempted input is preserved.
   - *Pre-decision review*: the shared Phase 1 consequence review precedes
     recording `structure.accepted`, showing subject, before/after,
     version/hash, impact, and the resulting receipt.
3. **Rejected alternative**: routing the owner's own Arc edits through the
   proposal queue. Revisit through a successor decision when a multi-author
   collaboration model (DEC-0025 successor) introduces authors who are not
   deciders.

## Consequences

- Benefits: preserves creative work (SWUX-007), makes plan acceptance
  deliberate (SWUX-002), and keeps the alpha's single-owner ergonomics.
- Costs: Engine-side schema validation and a document-patch path; fixture
  and test updates to contract-complete documents.
- Risks: server validation may reject documents the current client produces —
  intended, but Phase 1 must land client and server changes together.
- What remains undecided: draft staging and review assignment for future
  multi-author modes; unit edit/delete flows beyond add (Phase 3 planning).

## Validation and rollback

- Evidence: EVD-0022 (reduced-document and no-validation citations).
  Phase 1 must add a contract-complete fixture (choices, branches, POV,
  parent links, hashes) proving byte-for-byte preservation of unaffected
  fields, a stale-supersession rejection test, and no-single-step acceptance
  tests for pointer and keyboard.
- Reversal or successor path: successor decision; validation and preservation
  rules are additive and reversible without data migration.
