---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0035",
  "status": "draft",
  "previous_status": null,
  "title": "Children's-audience compliance layer",
  "created_at": "2026-07-31",
  "authority_source": "project-dossier-intake v1.1 package; foundational-gap analysis of 2026-07-31 (portfolio skews child- and family-facing; no existing machinery distinguishes child audiences). Acceptance reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Audience-designation metadata, channel configuration, commerce gates, child-data handling, conversational-character child safety, the compliance review layer, and initial portfolio designations.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Draft in the intake package; ID provisional until filed into .agent/decisions/.",
    "Planning input, not legal advice; acceptance carries the condition that counsel validates the regulatory mapping before the first child-directed publication.",
    "Regulatory specifics become research/ mutable-external-fact records, not baked canonical assertions."
  ]
}
---

## Context

The portfolio includes an illustrated children's book, a middle-school curriculum, kids-edutainment taxonomy families, and family properties, with future child-content/commerce intersections — and one inverse trap: Dumpster Fire Friends is adult satire in a cartoon style and must never be auto-classified as kids' content. Nothing in the current rights, privacy, or approval machinery represents any of this.

## Decision (proposed)

1. Adopt **audience designation** (child-directed with age band / mixed / general / adult) as required release metadata, cascading with review-gated overrides.
2. Adopt per-destination child-audience adaptor configuration (made-for-kids flags, non-personalized ads, feature disablement) with designations stored in publication records.
3. Adopt the default prohibition on commercial placements in child-directed properties; any exception requires its own accepted decision plus a dedicated blocking review (no host-selling; ad/story separation).
4. Adopt child-data prohibitions for owned experiences and aggregate-only analytics for child-directed releases; generalize learner privacy.
5. Adopt conversational-character child-safety requirements (age-appropriate policy pack, no minor-session retention, red-team evaluation per package revision) enforced at the runtime-export boundary.
6. Adopt the children's-compliance review layer and the age-appropriateness rubric; confirm the initial portfolio designations table, including the explicit Adult designation for Dumpster Fire Friends.
7. Engage counsel to validate the regulatory mapping before the first child-directed publication.

## Source artifacts

`../governance/childrens-audience-compliance.md`
