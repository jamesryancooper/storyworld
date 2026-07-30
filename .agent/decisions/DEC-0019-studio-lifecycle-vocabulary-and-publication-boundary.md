---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0019",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Phase 0 D1: lifecycle and authority vocabulary; the release/publication boundary",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; accepted by the project owner (Ryan Cooper) in-session on 2026-07-30: “I accept all nine as written.”",
  "owner": "ryan-cooper (project owner)",
  "scope": "Durable Studio and Engine vocabulary for content lifecycle states, ownership of each transition, the meaning of any lifecycle display, and the exclusive reservation of the word 'published'. Unblocks SWUX-004 and the wording of every Phase 1 consequence review.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted 2026-07-30: code, contracts, and receipts change only under the implementing Phase 1 task.",
    "External publication, creative release approval, and release candidates remain undefined stages that stay closed and absent from UI regardless of this decision's outcome."
  ]
}
---

## Context

REV-0001 SWUX-004 (P0): both mockups progress a single strip to `PUBLISHED`,
and the current canon-release receipt action is named
`canon.release.published` (`packages/kernel/src/releases.ts:49` — the only
"published" token in kernel/engine/studio source, per EVD-0022). The accepted
approval-receipt contract already separates eight approval layers
(`canon_approval` … `publication_or_runtime_acceptance`), requires an
`authority_host`, and states that a receipt from one layer never implies
another layer's approval. The adopted product context defines a release as "a
versioned creative snapshot or package; not automatically a published
instance" and publication as "an authority-host-specific external action with
its own approval and receipt."

## Decision

1. **Vocabulary** (durable; Studio labels must use these meanings):
   - *Idea*: unrecorded working input. Never a durable state; no badge.
   - *Canon proposal*: durable suggested change (human or model origin),
     pending an authorized human decision (`canon_approval` layer).
   - *Working canon*: the accepted canon revisions of a branch — append-only,
     supersession-ordered, mutable truth between releases. There is **no
     separate "approved canon" stage**: every working-canon revision exists
     because a human accepted it, and carries that acceptance receipt. Studio
     must not display "approved" as a distinct canon state.
   - *Canon release*: immutable, content-hash-bound snapshot of working canon
     (`canon-release` contract; `accepted_by_receipt_ref` required). The act
     is *creating* or *snapshotting* a release — never "publishing".
   - *Superseded release*: any non-latest release; labeled as such wherever
     displayed, with its successor reachable.
   - *Production pin*: a production bound to one exact release
     version + hash. Pins never drift; they change only by explicit human
     repin.
   - *Release candidate*, *creative release approval*, *channel package*:
     contract layers with no alpha implementation. No UI stage may exist for
     them until a successor decision defines them.
   - *Submitted / externally published / externally accepted*: reserved
     crossings in the `publication_or_runtime_acceptance` layer, owned by a
     named external authority host. Closed in the alpha.
2. **"Published" is reserved.** The token may appear in UI text, receipts, or
   telemetry only for an authority-host-specific external action recorded as
   a `publication_or_runtime_acceptance` receipt naming its host. New
   canon-release receipts therefore use the action **`canon.release.created`**.
   Stored receipts are immutable history: readers accept the legacy string
   and display it as "canon release created (recorded under the legacy action
   name)"; no rewriting.
3. **Transition ownership.** The Engine kernel executes every transition;
   authorized humans decide acceptance-class transitions (per DEC-0021);
   models and tools only propose. External hosts own publication transitions;
   a Storyworld decision never grants host-owned authority.
4. **Lifecycle display.** The mockups' single `APPROVED → LOCKED → PUBLISHED`
   strip is rejected: it collapses approval layers the accepted contract
   separates. Studio may show a per-subject status trail (proposal → working
   canon → canon release vX + hash) as *status only* — not navigation, not a
   workflow call-to-action — ending at canon release, with no publication
   stage in the alpha.

## Consequences

- Benefits: removes the false-publication evidence path (SWUX-004); gives
  Phase 1 consequence reviews exact state names; aligns UI vocabulary with
  the accepted contract instead of the mockups.
- Costs: kernel action rename plus a legacy-read path and test updates.
- Risks: two action strings coexist in history; mitigated by the explicit
  legacy label rule.
- What remains undecided: semantics of creative release approval, release
  candidates, and any external publication flow (all stay closed).

## Validation and rollback

- Evidence: EVD-0022 (current naming and absence of impact preview);
  Phase 1 tests must assert no internal action or UI stage uses a
  "publish"-derived token and that legacy receipts render with the exact
  stored action name plus the clarifying label.
- Reversal or successor path: successor decision; the rename is additive
  (append-only receipts), so reverting affects only future writes.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-30 in the operator
session — “I accept all nine as written” — covering DEC-0019 through DEC-0027
as amended (DEC-0020/0024/0026 amended 2026-07-30 on owner direction).
Recorded by claude-agent on the owner's instruction.
