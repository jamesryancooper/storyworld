---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0038",
  "status": "draft",
  "previous_status": null,
  "title": "Production template backlog for catalog project types",
  "created_at": "2026-07-31",
  "authority_source": "project-dossier-intake v1.1 package; gap between the canonical template system (ch02 §7) and the catalog's project types. Acceptance reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Adoption of the sixteen-instance template backlog and its scheduling rule.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Draft in the intake package; ID provisional until filed into .agent/decisions/.",
    "Depends on DEC-0029 (the catalog whose types the backlog serves).",
    "Each instance remains bound by the standing template rule: vocabulary and validation configuration only; no storage forks."
  ]
}
---

## Context

The template system exists with instances for the original property set; the catalog adds roughly sixteen project types without instances (storybook, iconographic series, curriculum unit, ambient collection, documentary-with-corrections, audio drama, concept album, audience-directed pair, embargoed calendar, saga part, collaborative anthology story, advice card, brand-world campaign episode, portrait anthology unit, rule-bound speculative drama, adaptation program).

## Decision (proposed)

1. Adopt the backlog as the scheduled template workplan, registered under plans with plan.json items.
2. Adopt the scheduling rule: a template instance lands with its property's first production, following the DEC-0037 ingestion order; templates for generated concepts wait until those concepts are adopted and named.
3. Fold accepted instances into canonical chapter 02 §7 as they are built.

## Source artifacts

`../plans/production-template-backlog.md`
