---
title: "Appendices"
project: "Storyworld Platform"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
part: "08_appendices"
---

# Appendix A. Proposed initial architecture decisions

| ADR | Decision |
|---|---|
| ADR-001 | Storyworld is independently deployable and owns its own database |
| ADR-002 | Studio uses only public Engine application contracts |
| ADR-003 | Initial architecture is a modular monolith plus async workers |
| ADR-004 | PostgreSQL is authoritative; search, graph, vector, and caches are rebuildable projections |
| ADR-005 | S3-compatible object storage holds immutable bytes; semantic asset records remain product-owned |
| ADR-006 | Temporal coordinates durable production workflows |
| ADR-007 | Octon receives mission-scoped evidence and capabilities; it is not an authority store |
| ADR-008 | Models and tools may create proposals and candidates only |
| ADR-009 | Canon, artifact, approval, and package versions are immutable and explicitly superseded |
| ADR-010 | Commerce Foundry integration uses snapshots, signed packages, events, and receipts; no shared business tables |
| ADR-011 | Commerce Foundry is final authority for CF-originated commercial publication |
| ADR-012 | BeKindRewind imports immutable runtime content releases and owns all runtime/player state |
| ADR-013 | Instagram is the first adapter, not a core domain |
| ADR-014 | Portable export and verification remain supported independently of connected integrations |
| ADR-015 | Provider-neutral recipes are canonical; provider prompts and embeddings are derivatives |
| ADR-016 | Service extraction requires measured scale, isolation, or release-cadence evidence |

# Appendix B. Initial contract artifacts

The F1 contract pack should contain:

- `storyworld.openapi.yaml`
- `storyworld-events.asyncapi.yaml`
- `common-package-envelope.schema.json`
- `narrative-campaign-brief.schema.json`
- `narrative-asset-bundle.schema.json`
- `runtime-content-release.schema.json`
- `canon-release.schema.json`
- `scene-state-packet.schema.json`
- `generation-recipe.schema.json`
- `continuity-finding.schema.json`
- `rights-evidence.schema.json`
- `approval-receipt.schema.json`
- `performance-observation.schema.json`
- TypeScript SDK generation configuration.
- Golden fixture packages for Stillhouse, editorial, BeKindRewind, and commerce.
- Contract compatibility, signature, idempotency, and round-trip tests.

# Appendix C. Core success metrics

## Production usefulness

- Median brief-to-approved-sequence effort.
- First-pass candidate acceptance.
- Focused revisions per accepted asset.
- Continuity defects per one hundred accepted assets.
- Approval rounds and blocked-release age.
- Reuse of reference packs, masters, and narrative structure.
- Generated-to-published ratio.
- Cost per accepted panel, episode, minute, or campaign.

## Product value

- Repeat production rate.
- Active properties producing approved releases.
- Cross-format reuse.
- Percentage of work completed without external coordination spreadsheets or file renaming.
- User-reported trust in version, source, and approval status.
- Return use by commerce, editorial, fiction, and interactive projects.

## Commercial viability

- Paid pilot conversion and repeat payment.
- Revenue per workspace or brand.
- Generation-adjusted gross margin.
- Support effort per production.
- Percentage of paid use not dependent on Commerce Foundry.
- Acquisition source and conversion.
- Churn reason, especially “generic tools are sufficient.”

## Governance and reliability

- Accepted assets with complete lineage.
- Unauthorized transition attempts blocked.
- Stale source dependencies detected before release.
- Rights expiry and revocation propagated correctly.
- Package and event reconciliation failures.
- Restore and rollback success.
- Security and tenant-isolation events.

# Appendix D. Glossary

| Term | Definition |
|---|---|
| Property | Persistent fictional, editorial, brand, interactive, or hybrid identity from which productions derive |
| Canon | Accepted facts, rules, relationships, chronology, style, and other authoritative creative truth |
| Canon release | Immutable named/versioned snapshot of accepted canon |
| Production | A campaign, season, series, adaptation, publication, or interactive content effort |
| Narrative unit | Flexible hierarchical element such as season, episode, post, chapter, mission, or panel |
| Scene state packet | Minimal pinned facts, entity states, references, and policies needed for a scene |
| Reference pack | Provider-neutral visual, voice, product, location, wardrobe, object, and negative references |
| Generation recipe | Structured, auditable, provider-neutral media specification |
| Candidate | Generated or imported work that has not been accepted as a master |
| Accepted master | Immutable creatively accepted Storyworld asset version |
| Rendition | Target-specific derivative of a master |
| Placement contract | Versioned narrative and commerce requirements for a product appearance |
| NarrativeCampaignBrief | Immutable Commerce Foundry input containing approved product, claim, policy, audience, objective, and channel context |
| NarrativeAssetBundle | Signed Storyworld output containing narrative media, lineage, reports, and creative approvals for receiving-authority review |
| RuntimeContentRelease | Immutable content package compiled for a target runtime such as BeKindRewind |
| Authority host | System responsible for the final decision or release in a specific project or delivery |
| Finding | Evidence-backed issue or advisory produced by deterministic or model-assisted checks |
| Approval receipt | Immutable decision bound to exact content, source, and policy versions |
| Performance observation | Normalized result received from a channel, Commerce Foundry, or runtime |
| Iteration proposal | Human-reviewable recommendation derived from observations; never an automatic canonical change |
