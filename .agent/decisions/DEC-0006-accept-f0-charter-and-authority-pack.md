---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0006",
  "status": "proposed",
  "previous_status": null,
  "title": "Accept the F0 charter and authority pack (GATE-0002)",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner-acceptance-pending — drafted under TASK-0003; acceptance of this record constitutes the GATE-0002 approval by the project owner.",
  "owner": "ryan-cooper (project owner)",
  "scope": "The complete F0 pack: ADR-0001..ADR-0016 in packages/contracts/adr/ and the five charter artifacts in packages/contracts/charter/. On acceptance: every ADR status flips to accepted (citing this decision), charter artifacts' status flips to accepted, GATE-0002 is evaluated passed with this decision and the pack as evidence, and PLAN-0002 completes.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Proposed 2026-07-28; nothing in the pack is authoritative until this decision is accepted.",
    "ADR-0006 deliberately defers the workflow-orchestrator selection to an evidenced F2-entry decision; accepting this pack accepts that deferral, not Temporal.",
    "Accepting the pack does not accept DEC-0005 (contract toolchain), which remains a separate pending decision."
  ]
}
---

## Context

F0 exists to eliminate ambiguous ownership before any data or workflow is
built. The pack was drafted from the canonical content pack (every artifact
carries source references); two records were deliberately framed beyond
Appendix A's literal text: ADR-0006 (orchestration as a category commitment
with an F2 selection checkpoint) and ADR-0007 (capability-lease interface
first, Octon non-blocking), both reflecting the tooling-landscape review
discussed with the owner in this session.

## Decision

Accept ADR-0001 through ADR-0016 and the five charter artifacts
(authority-matrix, property-classifications,
sensitivity-and-rights-classifications, approval-taxonomy,
fixtures-and-slices) as the authoritative F0 charter and authority pack.

## GATE-0002 criterion mapping

| Exit criterion | Satisfied by |
|---|---|
| Every important entity and decision has exactly one authoritative owner | `charter/authority-matrix.json` (nine systems, authoritative_for / not_authoritative_for, authority-host rule); ADR-0001/0002/0010/0011/0012 |
| Creative approval cannot be interpreted as commercial publication approval | `charter/approval-taxonomy.json` binding rules (no cross-layer inference); ADR-0011 |
| Commerce Foundry, Storyworld, BeKindRewind, Octon, media tools, and connectors have unambiguous responsibilities | `charter/authority-matrix.json` systems table; ADR-0007 (Octon), ADR-0010/0011 (CF), ADR-0012 (runtime), ADR-0015 (providers), ADR-0013 (connectors/adapters) |
| The first vertical slices and stop conditions are accepted | `charter/fixtures-and-slices.json` (VS0–VS6, eight stop-condition checkpoints, seven named golden fixtures with phase tags) |

## Consequences

- F1 (PLAN-0003) unblocks: schemas author against accepted enumerations
  (authority hosts, approval layers, classifications) instead of prose.
- Two future decision checkpoints are scheduled by the pack itself:
  orchestrator selection at F2 entry (ADR-0006) and any service extraction
  (ADR-0016).
- Revising any single ADR after acceptance uses supersession, not edits.

## Validation and rollback

- Evidence: harness structural validation and CI on the drafting commit;
  substantive review is this decision's acceptance.
- Reversal: reject or revise specific ADRs before acceptance; after
  acceptance, successor records.
