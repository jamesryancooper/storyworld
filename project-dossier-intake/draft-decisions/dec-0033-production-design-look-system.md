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
    "No new generation path: Looks compile into the existing recipe mechanism (locked/flexible/provider-adjustable attributes); parameter values are template-level vocabulary, never new core schema.",
    "AMENDMENT INPUT EXISTS: the book-research program critiques this proposal and recommends amendment rather than acceptance as written — review ../evidence/book-research/3-visual-sonic-shelf-and-look-system-critique.md and the Amendment input section below before disposition."
  ]
}
---

## Context

The dossier covers production-design entities (sets, props, wardrobe, characters), reference packs, storyboards/shot lists, structured generation recipes, and style-similarity checks — but style exists only at property level and as per-recipe constraints. Missing: an explicit look cascade with scene-level look/feeling, an enumerated cinematography/photography/editing parameter vocabulary, a score/sound design layer, and named look-development artifacts. The parity map in the source artifact shows which traditional-shoot roles are covered versus proposed.

## Amendment input (2026-07-31)

The book-research program produced a substantive critique of this proposal (`../evidence/book-research/3-visual-sonic-shelf-and-look-system-critique.md`), grounded in the visual/sonic craft shelf, recommending amendment before acceptance:

* A single inherited Look bundles creative systems with different lifecycles, authorities, and scopes (typography stays stable while cinematography changes by season; a grade changes per rendition without changing the narrative palette; editing operates on shot relations, not single-shot properties). Recommended: **Look becomes a resolved view**, not the authoritative object — resolved from separately versioned creative systems (representation style, visual identity, production design, character appearance, directorial intent, cinematography, lighting, composition/blocking, color design, grade, editorial design, graphic design, sound design, music identity, medium realization), each with its own scoping; the cascade is deliberately not universal.
* Art style and Look claim overlapping fields; art style should narrow to the formal grammar of representation (medium, mark-making, form, value structure, texture, abstraction level), with mood, lighting, and composition authoritative in their own systems — this interacts with DEC-0031.
* A **directorial-intent layer** is missing (dramatic emphasis, POV, revelation/concealment, blocking, coverage rationale, scene rhythm); without it, camera and lighting parameters risk becoming attractive but unmotivated settings.
* Emotional-register mapping must permit deliberate counterpoint, not only congruent mood-to-parameter mappings.

Disposition options: amend this decision to the resolved-view architecture; accept as written and schedule the critique as a successor decision; or split into per-system decisions.

## Decision (proposed)

1. **Look system**: cascading, versioned Look definitions (property → production → arc/sequence → scene → shot overrides) with explicit inheritance, emotional-register mapping rules, compilation into recipes, and continuity validation against the resolved Look.
2. **Parameter vocabulary**: the structured, provider-neutral cinematography/photography/editing vocabulary (shot size, angle, lens/optics, movement, film/medium emulation, exposure/motion, lighting, color/grade, composition, transitions and cut rhythm, format, stills-series rules) usable in Looks, recipes, storyboard frames, and templates.
3. **Score and sound design layer**: themes/leitmotifs bound to characters, places, and arcs; instrumentation palettes; emotion-to-score mapping through the same cascade; cue types including authored silence; sound palettes extending location sound intent; rights unchanged.
4. **Look-development artifacts**: mood board → look book → style test as named pre-production artifact types whose acceptance graduates exploration into versioned Looks and reference packs.

## Source artifacts

`../platform-capabilities/production-design.md`
