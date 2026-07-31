---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0033",
  "status": "draft",
  "previous_status": null,
  "title": "Production design and look system (look cascade, parameter vocabulary, score layer, look-development artifacts)",
  "created_at": "2026-07-31",
  "authority_source": "project-dossier-intake v1.1 package; owner request of 2026-07-31 for project- and scene-level style/look/feeling control and traditional-shoot parity. Acceptance reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Four capabilities completing the production-design layer the canonical dossier already partially provides (entities, reference packs, storyboards, recipes, style checks).",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Draft in the intake package; ID provisional until filed into .agent/decisions/.",
    "Depends on DEC-0031 (art-style definitions) for the styles the Look cascade binds.",
    "No new generation path: Looks compile into the existing recipe mechanism (locked/flexible/provider-adjustable attributes); parameter values are template-level vocabulary, never new core schema."
  ]
}
---

## Context

The dossier covers production-design entities (sets, props, wardrobe, characters), reference packs, storyboards/shot lists, structured generation recipes, and style-similarity checks — but style exists only at property level and as per-recipe constraints. Missing: an explicit look cascade with scene-level look/feeling, an enumerated cinematography/photography/editing parameter vocabulary, a score/sound design layer, and named look-development artifacts. The parity map in the source artifact shows which traditional-shoot roles are covered versus proposed.

## Decision (proposed)

1. **Look system**: cascading, versioned Look definitions (property → production → arc/sequence → scene → shot overrides) with explicit inheritance, emotional-register mapping rules, compilation into recipes, and continuity validation against the resolved Look.
2. **Parameter vocabulary**: the structured, provider-neutral cinematography/photography/editing vocabulary (shot size, angle, lens/optics, movement, film/medium emulation, exposure/motion, lighting, color/grade, composition, transitions and cut rhythm, format, stills-series rules) usable in Looks, recipes, storyboard frames, and templates.
3. **Score and sound design layer**: themes/leitmotifs bound to characters, places, and arcs; instrumentation palettes; emotion-to-score mapping through the same cascade; cue types including authored silence; sound palettes extending location sound intent; rights unchanged.
4. **Look-development artifacts**: mood board → look book → style test as named pre-production artifact types whose acceptance graduates exploration into versioned Looks and reference packs.

## Source artifacts

`../platform-capabilities/production-design.md`
