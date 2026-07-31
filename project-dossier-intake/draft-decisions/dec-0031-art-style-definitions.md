---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0031",
  "status": "draft",
  "previous_status": null,
  "title": "Art-style definitions as first-class platform objects",
  "created_at": "2026-07-31",
  "authority_source": "project-dossier-intake v1.1 package; owner disposition of 2026-07-31 (art styles are a Storyworld feature). Acceptance reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Reusable, named, versioned art-style specifications attachable at property, series, or render level; their structured contents; and the initial style inventory.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Draft in the intake package; ID provisional until filed into .agent/decisions/.",
    "Provider-specific implementations (embeddings, LoRAs, seeds) remain replaceable attachments per the existing reference-pack rule; the style definition is the canonical form.",
    "DEC-0033 (look system) builds on this decision; accepting this one does not imply accepting that one."
  ]
}
---

## Context

Projects need visual consistency guarantees across generated imagery. Working style specifications already exist (NeonSlash; Cozy Painterly Toon; Illustrative Tech-Urban Nature Realism; project-bound styles for the fairytale, the Saint Michael classical treatment, and Dumpster Fire Friends). The canonical dossier's "Style and voice" tab and reference packs carry style language but not styles as versioned first-class objects.

## Decision (proposed)

1. Adopt art-style definitions as first-class, versioned platform objects referenced by properties and renders — never text pasted into prompts.
2. Adopt the structured spec fields (name/version; mood/atmosphere; color and lighting; technique; composition rules; reference touchstones).
3. Seed the style library with the initial inventory named above; project-bound styles migrate into the same system.
4. One property may hold multiple styles (the Saint Michael series renders one canonical scene across several); style-similarity continuity checks validate renders against the bound style.

## Source artifacts

`../platform-capabilities/additional-features.md` (Art-style definitions)
