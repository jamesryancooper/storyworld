# Domain Models, Workflows, and Interfaces

> Conditional entry point. This file routes to the canonical models; it does
> not own them.

## Applicability assessment

- Status: `applicable`
- Assessed on: 2026-07-28
- Assessor and basis: claude-agent (operator-directed adoption session);
  ratified by the project owner 2026-07-28 via DEC-0003. Basis: domain complexity clearly
  exceeds the core outcome model — the canonical pack defines bounded
  contexts and aggregates, a typed fact model, placement contracts, reference
  packs, lifecycle state machines, API/event/package contracts, and a
  controlled glossary.

## Canonical model locations

| Model | Owner |
|---|---|
| Domain hierarchy, bounded contexts, aggregates, fact model, placement contract, reference packs | [`../canonical/storyworld/03_domain_architecture_and_media_pipeline.md`](../canonical/storyworld/03_domain_architecture_and_media_pipeline.md) section 8 (`REP-0044`) |
| Engine capability domains, Studio workflows, roles, lifecycle state machines, templates | [`../canonical/storyworld/02_engine_studio_and_templates.md`](../canonical/storyworld/02_engine_studio_and_templates.md) (`REP-0043`) |
| Integration contracts: API style, endpoints, event catalog, package envelope, versioning | [`../canonical/storyworld/04_foundry_rewind_channels_and_contracts.md`](../canonical/storyworld/04_foundry_rewind_channels_and_contracts.md) section 14 (`REP-0045`) |
| Controlled vocabulary (glossary) and F1 contract artifact inventory | [`../canonical/storyworld/08_appendices.md`](../canonical/storyworld/08_appendices.md) (`REP-0049`) |

When the F1 contract pack is produced (PLAN-0003), its machine-readable
schemas become additional registered representations; this directory may then
hold model explanations that the schemas do not carry.

## Narrative architecture patterns

The fixture program validates the domain model against **narrative
architecture patterns** — structural behaviors (branching, nonlinear
chronology, contested truth, adaptation, shared canon, evidence correction,
changing rights) rather than genres or channels. The pattern program and
its machine-readable inventory live at
`packages/contracts/fixtures/sources/packet/PATTERN_DRIVEN_EXPANSION.md`
and `packages/contracts/fixtures/registry.json`; taxonomy governance is the
fixture charter (v2 proposed, DEC-0007). Recommended dossier/planning title
for this body of work: **Pattern-Driven Narrative Architecture Coverage**.
