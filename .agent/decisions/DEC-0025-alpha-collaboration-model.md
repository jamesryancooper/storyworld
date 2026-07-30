---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0025",
  "status": "proposed",
  "previous_status": null,
  "title": "Phase 0 D7: alpha collaboration model — recorded facts only; no presence, locks, or assignments",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; acceptance is reserved to the project owner",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "The collaboration model the alpha actually has, which collaboration facts Studio may display, and what 'locked' may ever mean. Governs SWUX-017 and mockup feature gap FG-30.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Proposal only; attribution displays land under Phase 2/3 tasks after acceptance.",
    "A future multi-author model (checkout, branching, live co-editing, assignments) requires its own successor decision; nothing here designs it."
  ]
}
---

## Context

The mockups show avatars, a green presence-like dot, an owner field, activity
entries, and lock icons. REV-0001 classifies their meaning as too ambiguous
to infer (FG-30) and SWUX-017 records that current decisions, releases, and
dispositions omit visible decider/role/receipt. The program prohibits
collaboration indicators whose meaning is unknown and requires presence,
authorship, edit ownership, assignment, permission, review responsibility,
and approval authority to remain distinct.

## Decision

1. **The alpha collaboration model is asynchronous proposals decided by the
   single authorized owner.** There is no presence, no edit lock, no
   assignment, no live co-editing, and Studio must not display avatars,
   status dots, or any element implying liveness or concurrent editing.
2. **Studio may display only recorded facts**: author/proposer (kind and
   id), later human edits where recorded, decision actor with role and time,
   exact revision/hash, receipt reference (per DEC-0023), and
   stale/conflict state (supersession mismatch). Presence is never inferred
   from activity, and activity never implies acceptance or approval.
3. **"Locked" vocabulary is reserved** to canon-release immutability, if it
   is ever displayed at all. It is never used for permissions, editing
   state, or lifecycle stages.
4. **Mockup presence/avatar/owner/lock cues are deferred design concepts** —
   not alpha defects, not implementable from pixels. They may enter scope
   only through a successor decision that defines the collaboration model
   they would represent.

## Consequences

- Benefits: no invented meanings; attribution becomes trustworthy because
  everything shown is a durable recorded fact.
- Costs: the mockups' social texture is not reproduced in the alpha.
- Risks: none material — this decision only prevents unfounded UI.
- What remains undecided: the future multi-author model and its conflict,
  checkout, or branching semantics.

## Validation and rollback

- Evidence: EVD-0022 (absence of presence/lock primitives; attribution
  gaps). Phase 2 attribution work must render origin, decider, role,
  revision, and receipt from Engine data for human, model, and imported
  origins, with tests asserting no presence-like element exists.
- Reversal or successor path: a successor decision defining a real
  collaboration model supersedes the display restrictions it changes.
