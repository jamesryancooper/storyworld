---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0011",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Accept the F3 headless narrative kernel and evaluate GATE-0005 as passed",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) acceptance 2026-07-28 (sign-off on the three staged items); constitutes the GATE-0005 approval.",
  "owner": "ryan-cooper (project owner)",
  "scope": "The F3 kernel: migrations 0005-0006 (canon foundation; sources, proposals/decisions, working-canon revisions, productions, structures); @storyworld/kernel (actor-enforced commands, release snapshots, story-time state packets, impact analysis, asset import/acceptance, signed production export); @storyworld/engine-api (public HTTP surface with idempotency, Problem Details, correlation-id telemetry baseline); @storyworld/cli (export/verify surface). On acceptance: GATE-0005 records passed on EVD-0011; PLAN-0005 completes; the parallel B-phase tracks (B1 media, B2 Studio, B3 integration, B4 evaluation) unblock per the canonical roadmap.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Disclosed scope notes: retcon proposals are recorded but their apply-path semantics land with B-phase canon tooling; reference packs and beats/reveals live inside structure/release documents rather than dedicated tables (per the narrative-structure contract); the canon-change impact command is kernel-level, not yet an API route; API idempotency is process-local pending durable workflows (B1/Temporal); dev identity headers stand in for federated identity until O1.",
    "Behavioral proofs only; no production readiness is implied."
  ]
}
---

## GATE-0005 criterion mapping

| Exit criterion | Satisfied by |
|---|---|
| A user manually authors and approves a complete three-episode project through public contracts without direct database edits | gate-0005 test (EVD-0011): property → source → model proposals → human decisions → release → pinned production → three-episode structure → asset import + exact-version acceptance → scene packets, entirely via HTTP API and CLI |
| Imported or generated proposals never silently change accepted canon | Model decision attempts return 403 Problem Details (AuthorityError, ADR-0008); post-release accepted changes leave the pinned release byte-identical (hash-verified) |
| A canon change identifies affected productions and keeps existing work pinned | canonChangeImpact names pinned productions (kernel test); pinning immutability hash-proven in both kernel and gate tests |
| The CLI and API can complete a portable project round trip | CLI export-production → verify-package; blob store destroyed; package alone reproduces the release document hash-identical plus asset bytes (full-scope VS0) |

## Validation and rollback

- Evidence: EVD-0011 (25 tests across 6 packages against live Postgres +
  MinIO, locally and in CI; restore drill in CI every push).
- Reversal: revise named items before acceptance; after, supersession.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-28 in the operator
session: "I do sign off on the remaining three items." Recorded by
claude-agent.
