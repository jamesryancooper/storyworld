---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0023",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Phase 0 D5: runtime decision receipts align to the approval-receipt contract and become reachable",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; accepted by the project owner (Ryan Cooper) in-session on 2026-07-30: “I accept all nine as written.”",
  "owner": "ryan-cooper (project owner)",
  "scope": "The runtime shape of decision receipts for acceptance-class commands, their relationship to the accepted storyworld.approval-receipt.v1 contract, and their read path into Studio. Unblocks the receipt lines of SWUX-001/002/003/005 and Phase 2 provenance panels (SWUX-010/011/017).",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted 2026-07-30: implementation is Phase 1/2 scope.",
    "Cross-host receipt exchange and retention policy remain undecided and out of scope."
  ]
}
---

## Context

The accepted contract `storyworld.approval-receipt.v1` requires
`approval_layer`, `decision`, `subject_refs`, `subject_sha256`,
`policy_refs`, `decided_by` (human or delegated guest — never a model, tool,
or connector), `decided_by_role`, `decided_at`, `authority_host`,
`invalidated_by`, and `expiry`, with optional `waiver` and
`revision_request`. The runtime `audit_receipts` table (immutable by trigger,
tenant-isolated) stores only `actor`, `action`, `subject_ref`,
`subject_sha256`, `correlation_id`, `causation_id`, `recorded_at`, and a
`detail` jsonb defaulting to `{}` (EVD-0022). Studio copy asserts receipts
that are not reachable: `proposal_decisions.receipt_id` is persisted but
never returned, and no receipt read endpoint exists (SWUX-011, SWUX-017).

## Decision

1. **Contract-conformant receipt document.** Every acceptance-class command
   (per DEC-0021's set) records, inside the receipt row's `detail`, a
   complete `storyworld.approval-receipt.v1` document:
   - `approval_layer` per command (canon decision → `canon_approval`;
     structure acceptance → `creative_plan_approval`; asset acceptance →
     `asset_creative_approval`; continuity disposition/waiver →
     `continuity_disposition`);
   - `decision`, all `subject_refs` with their `subject_sha256` values,
     `policy_refs` naming the accepted decisions governing the action,
     `decided_by` and `decided_by_role` from the verified actor (DEC-0021),
     `decided_at`, `authority_host: "storyworld"`, `waiver` when applicable,
     and nullable `invalidated_by`/`expiry`.
   The change is additive: existing rows and table columns are untouched;
   receipts remain append-only and immutable.
2. **Read path.** The Engine exposes a tenant-scoped, authorization-filtered
   read of a receipt by id. Every consequential mutation response includes
   its `receipt_id`, and each Studio decision surface links to a read-only
   receipt view. Receipts never contain secret values or unnecessary
   personal data.
3. **Invalidation display.** The alpha implements, at minimum, subject-hash
   comparison at display time: when a receipt's subject hash no longer
   matches the current subject, Studio labels it "subject changed since this
   decision." Full `invalidated_by` chains may phase in through a successor.

## Consequences

- Benefits: durable decisions become verifiable evidence with role, layer,
  host, policy, and exact subject hashes; Studio can finally show "what will
  this record" before action and "what was recorded" after.
- Costs: kernel receipt construction, one read route, Studio views, and
  fixtures asserting exact receipt content.
- Risks: receipts written before this decision lack the document — readers
  must treat the absence as "legacy receipt", never fabricate fields.
- What remains undecided: retention, export, and cross-host exchange.

## Validation and rollback

- Evidence: contract schema and EVD-0022 gap analysis. Phase 1/2 tests must
  assert exact receipt documents for each acceptance-class command
  (including waiver content for intentional exceptions), the mutation
  response carrying `receipt_id`, the read route's tenant/authorization
  filtering, and the stale-subject label.
- Reversal or successor path: successor decision; the document is additive
  inside `detail`, so reverting affects only future writes.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-30 in the operator
session — “I accept all nine as written” — covering DEC-0019 through DEC-0027
as amended (DEC-0020/0024/0026 amended 2026-07-30 on owner direction).
Recorded by claude-agent on the owner's instruction.
