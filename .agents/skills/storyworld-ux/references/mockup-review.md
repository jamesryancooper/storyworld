# Design review against mockups

Use this mode when the operator supplies mockups, screenshots, or other visual
references to compare with current Studio. This is an expert comparative audit,
not a participant study or permission to edit. Viewing design references primes
the evaluator; do not call the comparison an unprimed first-use pass.

## Establish bounded truth

Keep four sources distinct:

- Current instructions and accepted product/governance records define allowed
  scope, Storyworld meaning, human authority, and external boundaries.
- Current rendered behavior, code, tests, contracts, and design-system
  primitives establish the implemented baseline and implementable constraints.
- Supplied visuals and explicit operator annotations establish the
  **design-intent reference** only for what they visibly or explicitly specify.
- UX heuristics and predicted consequences remain inference.

A mockup may propose a different interaction but cannot make it implemented,
authorized, accessible, or product-correct. When design intent conflicts with
current behavior, the design system, accepted scope, or Storyworld authority,
report the conflict and required decision rather than silently choosing a side.

## Inventory and align evidence

Inspect each visual at its available original resolution. Record its stable
label/path, dimensions and aspect ratio, depicted viewport/theme, route or
surface, creator/task, data and lifecycle state, annotations, and provenance if
supplied. Treat anything not visible or explicitly annotated as unknown.

Inspect the nearest current route with comparable synthetic data, viewport,
theme, selection, and state when safely available. Record mismatches that
prevent direct comparison. A screenshot is observed visual evidence for its
pixels only; current source is not rendered evidence, and a mockup is not
evidence of current behavior.

## Separate three finding classes

### 1. Visual and design-intent deltas

Compare visible hierarchy and reading order; layout/grid, grouping, spacing,
density, and overflow; typography; iconography and imagery; color, contrast,
and status semantics; component presentation and visible states; action
prominence; and the responsive intent implied by supplied variants.

Check whether adopting the intent would hide or weaken exact world/property,
subject, status, version/hash, AI/provenance, contradiction, authority, or
approval/release consequence. Do not treat a stylistic mismatch as a behavior
defect.

### 2. Interaction and behavior deltas

Compare current and explicitly proposed navigation, selection, disclosure,
editing, filtering, affordances, action verbs, confirmation, feedback,
recovery, focus expectations, and state transitions. Evaluate component states
for idle, hover/focus where shown, busy, disabled, selected, and confirmed
outcomes.

Cover loading, empty/no-results, validation failure, permission denial,
stale/conflict, unavailable, and ambiguous/unknown states. If the visual does
not specify an interaction or state, label it unknown—not an intended change.
Never invent invisible handlers, transitions, persistence, or authority.

### 3. Independent UX, accessibility, and governance concerns

Report broader issues discovered in either source that are not caused by the
delta: orientation, task flow, accessibility, misleading product meaning,
unsafe authority, or a concern preserved in both versions. Keep these findings
separate so visual fidelity cannot conceal an incumbent or shared defect.

Check that draft/proposal/candidate/canon/release/publication and AI or imported
provenance remain distinct; models propose and authorized people decide. Apply
`canon-consequences.md` when the intent affects canon, continuity, review, or
release meaning. A cleaner design must not obscure affected work, unresolved
contradictions, or the exact consequence before approval.

## Preserve unknowns and accessibility limits

A static visual does not establish DOM order, roles, accessible names, keyboard
behavior, focus, live announcements, zoom/reflow, reduced motion, responsive
behavior beyond depicted variants, or complete contrast/conformance. Use
`accessibility.md` and current rendered/source evidence for those claims.

List missing or ambiguous component, responsive, light/dark, loading, empty,
error, permission, conflict, and consequential-action states. Do not fill them
with preferred behavior; identify the design decision and verification needed.

## Report the comparison

Start with evidence coverage and comparator limits; keep the core evidence
labels unchanged. Present the three finding groups separately. For each delta, identify
the mockup region, current route/state/location, facts, inference, impact, and disposition:

`preserve current | adopt intent | adapt intent | reject due to conflict | design decision needed`

Use `critique.md` for priority and finding detail. Distinguish an implementation-ready
visual change from an interaction or product decision needing separate authorization.
End with preserved strengths, the smallest coherent improvement set, validation,
missing mockup states, and uncertainty. Do not modify Studio unless separately authorized.
