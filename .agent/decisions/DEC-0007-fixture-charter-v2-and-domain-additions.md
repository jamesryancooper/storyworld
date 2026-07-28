---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0007",
  "status": "proposed",
  "previous_status": null,
  "title": "Supersede the fixture charter with v2 (pattern-driven taxonomy) and ratify the F1 domain-model additions",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner-acceptance-pending — proposed under TASK-0004 while integrating the owner-supplied fixture authoring packet (SRC-0003); becomes authoritative through owner acceptance.",
  "owner": "ryan-cooper (project owner)",
  "scope": "1) charter/fixtures-and-slices-v2.json supersedes the accepted v1 artifact (SUP-0002 on acceptance), replacing the flat fixture enumeration with the five-class taxonomy (f1_production_fixtures, f1_schema_probes, post_f1_production_fixtures, metamorphic_test_families, vertical_slices) whose enumeration is owned by fixtures/registry.json. 2) The F1 domain-model additions grounded by the packet: narrative-structure schema (units/choices/branches/threads with explicit time coordinates) and three additive canon-release extensions (assertions/testimony, branch metadata for adaptations, version-pinned shared-canon dependencies).",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Proposed 2026-07-28; v1 remains the governing charter artifact until acceptance. Non-blocking for F1 implementation; required before GATE-0003 evaluation (OQ-0003).",
    "Vertical slices, stop conditions, fixture rules, and metric families carry into v2 unchanged."
  ]
}
---

## Context

The owner-supplied fixture packet (SRC-0003) established a pattern-driven
fixture program: 4 F1 production fixtures, 8 compact F1 schema probes, 19
post-F1 production fixtures, and phased metamorphic test families. The
accepted v1 charter enumerates only seven golden fixtures and cannot express
the new classes; its own rule requires changes through supersession, not
informal edits. The probes also surfaced domain semantics the F1 schemas
must carry.

## Decision

1. Accept `charter/fixtures-and-slices-v2.json` as successor to v1
   (supersession SUP-0002 recorded on acceptance), with enumeration
   delegated to the machine-readable `fixtures/registry.json` and the F1
   gate meaning fixed as: four production fixtures plus eight schema probes;
   post-F1 fixtures are committed, dependency-phased obligations.
2. Ratify the F1 domain-model additions, each grounded by at least two
   materially different fixture needs per the generic-primitive rule:
   - **narrative-structure schema** (stable-ID hierarchy, choices with
     prerequisites/effects, branches, threads; story time, presentation
     order, publication time, and revision kept explicit) — grounded by the
     branching, nonlinear-chronology, and deep-hierarchy probes plus the
     BeKindRewind and Stillhouse fixtures.
   - **canon-release assertions** (testimony distinct from accepted fact,
     with honesty/accuracy/confidence and typed corrections) — grounded by
     the contested-truth and evidence-correction probes plus Stillhouse and
     The Lanterns.
   - **canon-release branch metadata** (adaptation ancestry, source
     pinning, explicit overrides/composites/omissions) — grounded by the
     adaptation probe and the canonical branch model.
   - **version-pinned shared-canon dependencies** (consumers pin a provider
     property's canon release; forking records lineage; no silent
     cross-property mutation) — grounded by the shared-universe probe,
     mirroring the accepted Commerce Foundry snapshot pattern rather than
     introducing live cross-property references.

## Consequences

- The fixture program becomes charter-governed at its real granularity;
  GATE-0003 evaluates against the v2 meaning.
- The domain additions are additive (no breaking schema changes); no
  accepted ADR is contradicted — ADR-0001/0010/0012 boundaries are
  reinforced by the dependency-pinning choice.
- Rejecting item 2 in part would remove the corresponding probes from the
  F1 proof surface.

## Validation and rollback

- Evidence: contract-validator + CI runs over the probes and fixtures;
  registry coverage checks.
- Reversal: reject before acceptance; after acceptance, successor decision
  and charter v3.
