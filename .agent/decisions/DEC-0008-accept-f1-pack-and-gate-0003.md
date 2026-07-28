---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0008",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Accept the F1 contract pack and evaluate GATE-0003 as passed",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) acceptance 2026-07-28; accepted together with DEC-0007, constituting the GATE-0003 approval.",
  "owner": "ryan-cooper (project owner)",
  "scope": "The complete F1 contract pack: 12 record/package schemas + CloudEvents envelope, 4 lifecycle state machines, OpenAPI 3.1 application contract (33 paths), AsyncAPI 3 event catalog (24 events), 3 adapter interface contracts, SDK generation config (deferred activation), 4 normalized production fixtures, 8 schema probes, MET-F1 metamorphic suite, fixture registry, and the contract validator enforcing all of it in CI. On acceptance: GATE-0003 records passed with this decision and EVD-0007 as evidence; PLAN-0003 completes; F2 (PLAN-0004) unblocks.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted 2026-07-28. One deliberate format decision: OpenAPI and AsyncAPI are authored as strict JSON (both formats permit it) so the zero-dependency validator covers them; a YAML derivative can be generated for external tooling (recorded in DESIGN_NOTES).",
    "Semantic enforcement items (reveal-order graphs, branch exclusivity, story-time state computation) are deliberately F3-kernel scope, documented per probe; F1 proves representability and schema-level rejection.",
    "Accepting this decision also implies the ASM-0001 stack-confirmation conversation at F2 entry (TypeScript/Node/package-manager choices) — flagged as the next owner touchpoint alongside the B1 provider posture."
  ]
}
---

## Context

All F1 artifacts named by canonical Appendix B and the charter (v2 proposed)
now exist and validate: schemas grounded in the owner's fixture packet,
contracts for API/events/adapters, four production fixtures normalized from
owner-authored sources, eight architecture probes, and an active metamorphic
suite — all enforced by the contract validator locally and in CI.

## GATE-0003 criterion mapping

| Exit criterion | Satisfied by |
|---|---|
| All representative fixtures model without mandatory commerce fields in generic canon or runtime execution fields in Storyworld | canon-release/narrative-structure carry no commerce-required fields (commerce data only in brief/bundle/placement contracts); runtime-content-release excludes player/execution state (invalid case proves rejection); probe manifests + validator |
| Contracts round-trip deterministically and pass compatibility tests | canonical round-trip + checksum verification for every record; MET-F1 export/re-import; CI-enforced |
| Narrative hierarchy is flexible without becoming untyped | narrative-structure: arbitrary-depth typed units with stable IDs (deep-hierarchy probe; BKR + Stillhouse fixtures) |
| Revision time and fictional story time are explicit | four independent time coordinates per unit (nonlinear-time probe); scene-state binds story time |
| Charter v2 expanded meaning: 4 production fixtures + 8 probes; typed invalid findings; explicit time/branch/source/truth/rights/authority semantics; no storage forks; registered post-F1 + metamorphic programs | fixtures/ + probes/ + registry.json + PLAN-0009/0010; every invalid case produces tested findings |

## Consequences

- F2 (governed foundation) unblocks with the contracts as its target.
- The DESIGN_NOTES refinement candidates remain open, additive-only.
- Rejection or revision reopens TASK-0004 for the named items.

## Validation and rollback

- Evidence: EVD-0007 (F1-boundary validation + CI).
- Reversal: revise named artifacts before acceptance; after, supersession.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-28 in the operator
session ("I accept the decisions"), covering DEC-0007 and DEC-0008 together.
Recorded by claude-agent.
