# Requirements and Constraints

In this High-Assurance profile, `../machine-readable/requirements.json` owns
individual requirement records; this file owns vocabulary, constraint
narrative, and explanation. Do not edit the same requirement independently in
both places.

## Vocabulary

Requirement records use the controlled glossary in
[`storyworld/08_appendices.md`](storyworld/08_appendices.md) (Appendix D):
property, canon, canon release, production, narrative unit, scene state
packet, reference pack, generation recipe, candidate, accepted master,
rendition, placement contract, NarrativeCampaignBrief, NarrativeAssetBundle,
RuntimeContentRelease, authority host, finding, approval receipt, performance
observation, iteration proposal.

## Active requirements

`REQ-0001` through `REQ-0010` in `../machine-readable/requirements.json` were
derived on 2026-07-28 from the canonical content pack — chiefly the locked
decisions and product principles (part
[01](storyworld/01_executive_context_and_product_direction.md), sections
"Decisions to lock", 3.1, 3.2) and the proposed architecture decisions (part
[08](storyworld/08_appendices.md), Appendix A). They cover: independent
deployability, Studio statelessness, the Commerce Foundry state boundary,
models-propose/humans-authorize, immutable versioning, exact-version
approvals, channel-neutral masters, portable signed export, the runtime
boundary, and contract-pack-first sequencing. All ten were ratified as
`active` by the project owner on 2026-07-28 (PLAN-0001, DEC-0003).

The full requirement surface of the platform is far larger than these ten
records; part [02](storyworld/02_engine_studio_and_templates.md) (capability
map) and part [06](storyworld/06_mvp_dependency_roadmap_and_vertical_slices.md)
(MVP include/postpone lists) hold the canonical detail. Records are added here
as phases make them actionable.

## Constraint narrative

- **Authority boundaries are constraints, not preferences.** The authority
  matrix (part 01 section 4.2) and architectural invariants (part 01 section
  3.2) constrain every design: no shared business tables, no dual writes, no
  distributed transactions across authority systems, async delivery
  at-least-once with idempotent consumers.
- **Sequencing constraint.** The F0/F1 contract pack precedes large-scale
  implementation (REQ-0010); phases begin only when entry dependencies are
  satisfied and end only at their evidence gates (part 06 section 19).
- **Technology intent** (part 03 section 9.2, held as assumption ASM-0001):
  TypeScript domain/API/workers/Studio, PostgreSQL, Temporal, S3-compatible
  object storage, modular monolith until extraction is earned.

## Hard boundaries

- The dossier does not grant permission.
- Current-state claims require direct evidence.
- Unknown project facts remain unknown.
- Real secrets and unnecessary personal data do not belong in the dossier.
