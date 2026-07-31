---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0034",
  "status": "draft",
  "previous_status": null,
  "title": "Five additional narrative patterns and the composition backlog",
  "created_at": "2026-07-31",
  "authority_source": "project-dossier-intake v1.1 package; gap analysis of 2026-07-31 against the accepted pattern set (fourteen post-F1 pattern fixtures, eight schema probes). Acceptance reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Adding five patterns to the platform's scheduled pattern set, registering six composition backlog notes, and one metamorphic-table addition.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Draft in the intake package; ID provisional until filed into .agent/decisions/.",
    "Acceptance schedules probe/fixture authoring per the charter's categories; it does not reprioritize the existing roadmap.",
    "New primitives remain subject to the standing rule: only when two materially different fixtures need the same semantic."
  ]
}
---

## Context

The catalog surfaced five narrative semantics the pattern set does not cover, each with a designated showcase property and a planned rejection: nested narrative/diegetic levels (canon-as-text vs. canon-as-event); in-fiction parallel timelines and loops (distinct from production branches); retcon lifecycle (deliberate revision of published canon, distinct from fork/adapt/simplify); transmedia complementary canon (audience knowledge per channel subset); and the community/fan contribution boundary (submissions distinct from votes; explicitly non-canon absent authorized acceptance).

## Decision (proposed)

1. Accept the five patterns into the scheduled pattern set with their showcase assignments as recorded in the catalog's proposed-patterns section; author them as compact probes (or fixtures where the charter requires) in `packages/contracts/fixtures/`.
2. Add "retcon a canon fact" to the metamorphic transformation table as the fiction counterpart of "correct a factual claim."
3. Register the six composition backlog notes (prequel insertion under future-canon constraints; real-time story-clock sync; spoiler-safe recap derivation; bounded crossover events; recurring seasonal re-release; spoiler-safe promotional and length-ladder derivation) as test compositions of existing patterns — no new primitives.
4. Prioritize nested-narrative and retcon-lifecycle first (nearest-term property needs).

## Source artifacts

`../product-definition/narrative-story-projects.md` ("Proposed additional patterns"; composition backlog notes)
