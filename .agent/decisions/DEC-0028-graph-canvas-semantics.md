---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0028",
  "status": "proposed",
  "previous_status": null,
  "title": "Graph/canvas semantics for the Arc workspace (DEC-0024 successor)",
  "created_at": "2026-07-30",
  "authority_source": "external:operator improvement-program request 2026-07-30 to run the sequence through the graph; DEC-0024 requires this semantics successor decision, accepted by the project owner, before any spatial graph is built — the meanings must not be invented from the mockups. Acceptance is reserved to the project owner.",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "The fixed meanings a spatial Arc graph/canvas would use — node set, edge meanings, grouping, selection, pan/zoom/fit/reset, hidden-item handling, keyboard model, and narrow fallback — plus the requirement that it remain a synchronized view over the accepted structured substrate. Accepting this decision unblocks a separate, owner-authorized graph implementation task; it does not itself authorize implementation.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Proposal only; nothing is built until this is accepted AND a separate bounded graph-implementation task is owner-authorized (DEC-0024 two-step gate).",
    "The mockups (SW-M1/M2) establish visual intent only; these meanings are proposed to resolve the ambiguities REV-0001 §10 flagged, not read off the pixels.",
    "The Phase 3 structured Arc views (SWUX-012; EVD-0030) are the accepted synchronized alternative the graph must mirror; if this decision is deferred, the structured views stand alone and the graph stays absent."
  ]
}
---

## Context

DEC-0024 deferred the spatial graph and required, before any build, a
semantics successor decision fixing what the graph's positions, edges, and
controls mean — because the static mockups do not establish them (REV-0001
§10: edges could mean chronology, causation, presentation, dependency, or
authority; zoom scope, fit/reset, hidden-item handling, keyboard model, and
narrow fallback are all unspecified). Phase 3 (EVD-0030) built the accepted
structured substrate — episode-grouped units, a synchronized selected-unit
inspector, explicit story-time vs presentation-order coordinates, and
choices/branches as structured lists. This decision proposes the graph
meanings that would layer a spatial view over exactly that data.

## Decision (proposed)

1. **Node set.** Nodes are **narrative units** and **choice points**. Choice
   points render as a distinct node shape between the unit they sit at and
   the units their options lead to. Entities, places, and rules are NOT
   graph nodes (they remain in World Bible); threads are edges/annotations,
   not nodes. Scope is one production's current narrative structure.
2. **Edge meanings** (each visually distinct, always with a reachable
   legend, never color-only):
   - *Presentation-order* edges: solid, single-arrow, "encountered next in
     presentation order" — the primary spine, ordered by `presentation_order`.
   - *Choice/branch* edges: from a choice node along each option to its
     `leads_to_unit_ref`, labeled with the option's `branch_label`; dashed to
     mark alternates; mutually-exclusive branches share a legend marker.
   - *Story time* is a **node attribute and optional lane axis**, never an
     edge — M1's Story-Time track becomes an optional lane ordering, so the
     graph can show presentation flow and story-time position as two
     independent readings (preserving the coordinate independence).
   - *Parent/child* (episode) is **containment/grouping**, not an edge (see
     3).
   No edge means causation, dependency, or authority; those are out of scope.
3. **Grouping.** Units group by `parent_unit_ref` into episode lanes (M2),
   with an explicit "Unparented" lane — mirroring the structured view.
4. **Selection.** Selecting a node is bidirectionally synchronized with the
   structured inspector: selecting in either the graph or the list selects
   in the other and shows the same authoritative unit detail. Selection is
   view-only.
5. **Pan/zoom/fit/reset.** These affect the canvas only and are independent
   of browser zoom. *Fit* frames all nodes; *reset* returns to the default
   layout and selection; position/selection are recoverable after either.
6. **Hidden items.** Any filter or collapsed lane shows an explicit count of
   hidden nodes/edges; hidden items reappear in selection and in any impact
   or consequence view. Nothing is silently omitted.
7. **Keyboard model.** The graph is fully keyboard-operable without drag:
   Tab moves focus into the graph; Arrow/Tab move between nodes in a defined
   order (presentation order within a lane, then across lanes); Enter/Space
   selects (syncing the inspector); focus is always visible; every action
   available by pointer is available by keyboard.
8. **Narrow / reduced / forced-colors fallback.** Below a width threshold, or
   under reduced-motion / forced-colors, the graph falls back to the accepted
   structured list/outline (which carries all the same information and
   actions). The structured view is never removed.
9. **Authority.** The graph is an optional **view over Engine state**, never
   an authority source. No consequential action (accept, dispose, snapshot,
   repin, publish) is ever triggered by a spatial gesture; all such actions
   continue to route through the existing consequence-review flows.

## Consequences

- Benefits: resolves every REV-0001 §10 ambiguity with explicit, testable
  meanings; lets a later graph reuse the Phase 3 structured views as its
  synchronized, accessible alternative; keeps story-time/presentation-order
  independence and the human-authority model intact.
- Costs: a graph implementation is still substantial (layout, canvas
  rendering within the vendored design system, the full keyboard/zoom/
  motion/forced-colors matrix); it is a separate owner-authorized task.
- Risks: scope creep toward causation/dependency edges (excluded here);
  performance on dense structures (the fallback and hidden-item counts
  bound it).
- What remains undecided until a separate task: the rendering approach
  (there is currently no graph library in the Studio deps — adding one, or
  hand-rendering SVG, is an implementation choice), exact layout algorithm,
  and the width threshold for the fallback.

## Validation and rollback

- Evidence: REV-0001 §10 unknowns; EVD-0030 (the structured substrate). A
  graph built on this decision must pass equivalent-task parity with the
  structured view at narrow widths, 200% zoom, keyboard-only, reduced
  motion, and forced colors, and must prove no consequential action fires
  from a spatial gesture.
- Reversal or successor path: a successor decision can amend any meaning;
  because the graph is an optional view over the structured data, deferring
  or removing it never affects the authoritative structure.

## For owner disposition

This is the DEC-0024 gate. Options: **accept** these meanings (then a
separate graph-implementation task can be authorized), **amend** specific
meanings (e.g. drop choice nodes, change the story-time-as-lane choice),
**defer** (the structured views remain the Arc workspace and no graph is
built), or **reject**. Accepting does not authorize the build — that remains
a separate, explicitly authorized task.
