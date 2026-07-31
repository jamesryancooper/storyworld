---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0039",
  "status": "draft",
  "previous_status": null,
  "title": "v1.1 intake ratification and canonical integration (master)",
  "created_at": "2026-07-31",
  "authority_source": "project-dossier-intake v1.1 package; mirrors the DEC-0003 pattern by which Dossier v1.0 was adopted as canonical target material. Acceptance reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Ratifying the intake package as an accepted provenance source and executing the canonical integration per the impact map; registering the assessment packages; archiving the intake.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Draft in the intake package; ID provisional until filed into .agent/decisions/.",
    "Accept last: presupposes the owner has dispositioned the questionnaire, DEC-0028, and drafts DEC-0029 through DEC-0038 (in whatever amended form).",
    "Integration is documentation and registry work; it authorizes no implementation."
  ]
}
---

## Context

Individual decisions adopt the intake's content; this master decision performs the integration itself, the way DEC-0003 adopted the v1.0 content pack: provenance, disposition, registry refresh, and archival, leaving the repository with one governed dossier and no parallel unratified corpus.

## Decision (proposed)

1. Record the intake package (at its final commit hash) as an accepted source in `project-dossier/machine-readable/sources.json`.
2. Execute `../canonical-impact-map.md`: amend canonical chapters per the accepted decisions; move governance, plan, and product-definition artifacts to their governed homes; register them (artifact-registry, with path-authority and ARTIFACT_CATALOG regenerated); create plan.json and raidq items; record supersessions; convert the compliance doc's regulatory facts into research/ mutable-external-fact records.
3. Register the interface-architecture and technical-enablement packages as supporting artifacts; file the evidence conversations as provenance records or archive them with the package.
4. File accepted drafts into `.agent/decisions/` (renumbering if the sequence shifted); record deferred/rejected dispositions in the intake manifest.
5. Run `refresh.py --refresh` and `validate.py --check`; both must pass before closure.
6. Snapshot the package to `project-dossier/history/storyworld-dossier-v1.1-intake/` and dissolve `project-dossier-intake/`.

## Source artifacts

`../readme.md` (manifest and runbook), `../canonical-impact-map.md`
