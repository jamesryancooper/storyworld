---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0032",
  "status": "draft",
  "previous_status": null,
  "title": "Export adaptors: destinations, format grammars, length ladders, and print/physical production",
  "created_at": "2026-07-31",
  "authority_source": "project-dossier-intake v1.1 package; owner disposition of 2026-07-31 (delivery concepts function as export adaptors). Acceptance reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "The adaptor layer through which properties publish: destination adaptors, the designed swipe-based storytelling web experience, format constraints as adaptor configuration (presentation-unit grammars, length-class ladders), and print/physical production adaptors.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Draft in the intake package; ID provisional until filed into .agent/decisions/.",
    "Consistent with the existing channel posture: export-first, direct publishing only where Storyworld holds explicit authority; adaptor output passes review before publishing.",
    "Physical-production vendor selection is implementation work, not part of this decision."
  ]
}
---

## Context

Projects currently name their destinations ad hoc. The adaptor concept centralizes destination formatting so one accepted master publishes to many targets without content duplication: social platforms, print/book, custom web experiences (one — the swipe-based layered storytelling experience — is fully designed), with destination-specific composition rules held as configuration rather than content.

## Decision (proposed)

1. Adopt export adaptors as the delivery layer: properties declare destinations; adaptors transform accepted masters into destination formats; output participates in review before publication.
2. Adopt format constraints as adaptor configuration: caption/post limits, loop-safety, presentation-unit grammars (carousel slides, comic panels/page-turns, threads, picture-book spreads), and per-destination length-class ladders aligned with the taxonomy's format classes.
3. Adopt the swipe-based interactive storytelling experience as a designed custom adaptor (primary consumer: the visual advice-storytelling property).
4. Adopt print/physical production adaptors: prepress requirements per product type, named product templates (book trims, card dimensions, calendars, posters), print-vendor submission with receipts, a physical-proof approval gate before any print release, and versioned editions for reprints.

## Source artifacts

`../platform-capabilities/additional-features.md` (Export adaptors; Print and physical production adaptors)
