# Mockup feature-gap assessment

Use this after `mockup-review.md` only when the request asks what features or
capabilities a supplied design implies. Continue its comparator, evidence,
unknown-state, and non-authorization rules. A feature is a distinct creator
outcome, state, or action—not merely a visible element.

## Build the candidate list

For each implied feature, record a stable ID, mockup region/annotation, intended
creator job and outcome, current route/component/domain evidence, accepted
product context, confidence, and unknowns. Split composite concepts until each
can receive one classification.

## Classify every feature

Use exactly one:

1. **Already implemented:** current rendered, source, contract, or test evidence
   confirms the depicted user outcome and necessary state/action.
2. **Visual treatment of an existing capability:** the design rearranges or
   restyles current state, content, or actions without adding a domain outcome,
   Engine state, authority crossing, or integration.
3. **Missing interaction necessary for the design to work:** the depicted
   design depends on an absent control, transition, persistence, feedback, or
   recovery behavior, but its user outcome fits an existing capability.
4. **Genuinely new product capability worth proposing:** the feature adds a
   durable user outcome, domain state, integration, or authority boundary not
   currently available, with enough benefit and workflow fit for formal
   consideration.
5. **Too ambiguous to infer:** the visual and annotations do not establish the
   outcome, behavior, state ownership, or product need.

Do not use current documentation alone to claim implementation. Do not call a
visual difference a missing capability, or downgrade a new domain/authority
crossing to a missing interaction. If evidence supports multiple classes,
split the candidate; if it still cannot be split, use ambiguous and name the
question or evidence needed.

A mockup shows design intent, not implementation, participant demand, accepted
scope, or product approval. A missing feature is not automatically an alpha
defect. Keep observed facts, inference, synthetic evaluation, and any supplied
participant evidence separately labeled.

## Propose new capabilities without authorizing them

For every category 4 candidate, produce a bounded proposal even when the
recommended disposition is explore, defer, or decline. Include:

- **Status and evidence:** “proposal only,” candidate ID, mockup locator,
  current/product evidence, and the smallest proposed outcome and non-goals.
- **Creator benefit:** affected creator, task, problem, expected benefit, and
  why existing capability or visual treatment is insufficient.
- **Storyworld workflow fit:** entry point and relationship to the world,
  characters, places, rules, arcs, assets, productions, continuity, review,
  release, and publishing steps that are actually implicated.
- **Authority effects:** effects on canon, review, release, and publication
  authority; state, provenance, affected work, the exact human decision, and
  how models remain suggesters rather than authorizers.
- **Dependencies:** Engine/domain/contracts, state and data, roles/permissions,
  design-system/UI, accessibility, migration/integration, and validation needs,
  marking each confirmed, proposed, or unknown.
- **Risks and alternatives:** authority ambiguity, stale/conflict/failure and
  work-preservation risks, scope cost, security/privacy where relevant, reuse
  or adaptation of current capability, manual path, defer, and no-build.
- **Confidence and unknowns:** confidence basis, contrary evidence, open product
  decisions, and the next smallest evidence needed.
- **Acceptance checklist:** three to seven testable checks covering the creator
  outcome, authoritative state/consequence, failure/recovery, and applicable
  accessibility or responsive behavior.

Use `canon-consequences.md` for any canon, continuity, review, release, or
publication impact. A proposal does not create a task, accepted decision,
implementation permission, release authority, or publication approval.

## Report

Start with a classification table:

`ID | implied outcome | mockup evidence | current/product evidence | class | confidence/unknowns`

Keep category 3 items as interaction design gaps, category 5 items as explicit
questions, and category 4 proposals in a separate section. End with cross-cutting
dependencies, conflicts between candidates, and the smallest decision sequence.
