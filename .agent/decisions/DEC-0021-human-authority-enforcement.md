---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0021",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Phase 0 D3: human authority enforcement for acceptance-class commands",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; accepted by the project owner (Ryan Cooper) in-session on 2026-07-30: “I accept all nine as written.”",
  "owner": "ryan-cooper (project owner)",
  "scope": "Which roles may execute acceptance-class commands, what the Engine must verify beyond actor kind, and the exact boundary of the development identity. Unblocks SWUX-006 and the authority lines of SWUX-002/003/005.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted 2026-07-30: enforcement lands under the Phase 1 task.",
    "Production identity, delegation, expiry, and multi-role matrices remain governed by the existing identity reserved crossing; deferral here means absent and fail-closed, not lenient."
  ]
}
---

## Context

REV-0001 SWUX-006 (P0), sharpened by EVD-0022: `requireHuman`
(`packages/kernel/src/actors.ts:11`) is the sole authorization check for
every acceptance-class command; actor headers are trusted unless
`MOCK_IDP_SIGNING` is set and a Bearer token is presented
(`apps/engine-api/src/server.ts:84-97`); missing headers **default** `kind`
to `"human"` (`server.ts:94`); `authorityHost` is stored but never enforced.
Tenant isolation exists at persistence (row-level security on
`organization_id`), but role and resource scope are unenforced. The accepted
approval-receipt contract requires `decided_by` to be a human principal or
delegated guest — never a model, tool, or connector.

## Decision

1. **Acceptance-class command set** (exhaustive for the alpha): canon
   proposal decision; narrative-structure acceptance; canon release creation;
   production creation and repin; asset acceptance; continuity disposition
   and waiver; credential save, replace, and revoke; editor re-import.
2. **Authorization rule**: each command requires a verified actor with
   `kind = human` AND role `property_owner` AND binding to the target
   tenant/property. `kind === human` alone is insufficient. The kernel
   check extends to an authorization helper that receives the command's
   subject scope and fails closed on any mismatch.
3. **Development identity boundary**: header-derived identity is accepted
   only when the Engine explicitly runs in development mode (a dedicated
   environment flag, default off). Outside development mode, acceptance-class
   commands from header-derived identity are refused. Missing or blank actor
   headers never default to `kind: human` — they are refused for
   acceptance-class commands in every mode. Studio visibly labels
   header-derived identity as "development identity — not verified" wherever
   the actor is displayed.
4. **Deferred to the identity reserved crossing**: delegation, expiry,
   guest identities, roles beyond `property_owner`, cross-host authority
   verification, and any production identity provider. The B3 mock-IdP path
   remains the staging ground. The dossier authority matrix stays product
   design, not repository or runtime permission.

## Consequences

- Benefits: the visible role badge stops overstating verified authority;
  forged or missing headers cannot reach acceptance-class commands outside
  the explicit development mode.
- Costs: kernel authorization helper, engine-api gating, dev-mode flag
  plumbing, Studio identity labeling, and a negative-authorization test
  matrix.
- Risks: local walkthrough ergonomics depend on the dev flag being set in
  compose/dev scripts — Phase 1 must keep the documented alpha walkthrough
  working unchanged.
- What remains undecided: the production identity provider, role taxonomy
  beyond `property_owner`, and delegation semantics.

## Validation and rollback

- Evidence: EVD-0022 citations. Phase 1 must add a negative matrix covering
  forged headers, missing headers, wrong tenant, wrong role, model/service
  actor kinds, and dev-mode off — each asserting refusal with no state
  change — plus a dev-mode-on path proving the walkthrough still works.
- Reversal or successor path: successor decision; enforcement is additive
  and can be relaxed only by explicit successor, never by default.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-30 in the operator
session — “I accept all nine as written” — covering DEC-0019 through DEC-0027
as amended (DEC-0020/0024/0026 amended 2026-07-30 on owner direction).
Recorded by claude-agent on the owner's instruction.
