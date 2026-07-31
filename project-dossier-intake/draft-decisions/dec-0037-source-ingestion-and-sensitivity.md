---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0037",
  "status": "draft",
  "previous_status": null,
  "title": "Source-material sensitivity ladder and ingestion plan",
  "created_at": "2026-07-31",
  "authority_source": "project-dossier-intake v1.1 package; operational planning of 2026-07-31 instantiating the canonical source-inbox workflow for the actual corpus. Acceptance reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "The refined sensitivity-class ladder and permitted uses, the source-to-property inbox mapping, restricted-partition rules, the third-party-derivation review rule, and the ingestion order.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Draft in the intake package; ID provisional until filed into .agent/decisions/.",
    "Depends on DEC-0035 and DEC-0036 conventions for the child-adjacent and consent-bearing source groups.",
    "Ingestion authorizes imports into governed inboxes, not publication; publication remains gated by each property's review layers."
  ]
}
---

## Context

The canonical workflow (verbatim import → ownership/date/sensitivity/permitted-use record → extraction proposals → owner acceptance → first canon release) exists, but no plan mapped the actual corpus into it. The staged corpus includes owned creative drafts, third-party-derived research, personal-identifying family material, and restricted-sensitive correspondence — materially different handling classes.

## Decision (proposed)

1. Adopt the sensitivity ladder — S0 public, S1 internal creative, **S1R third-party-derived research** (ideas only; never verbatim), S2 personal-identifying (dignity/likeness review gates), **S3 restricted-sensitive** (owner-only; never provider-exposed; never published; no cross-property reuse) — with its permitted-use matrix.
2. Adopt the source-to-property inbox mapping table and the S3 restricted-partition design (restricted partition of the Notes to My Daughter inbox; excluded from extraction and prompts).
3. Adopt the S1R derivation-distance review rule: publishing pipelines drawing on S1R sources must produce original expression, checked in review like commerce claims.
4. Adopt the ingestion order (Ryan and Nicol pilot first — also piloting the DEC-0036 authorship dossier — then Saint Michael, SciSpark, Dumpster Fire Friends/Ambience, the advice property, the editorial properties, with Notes to My Daughter deliberately last).

## Source artifacts

`../plans/source-material-ingestion-plan.md`
