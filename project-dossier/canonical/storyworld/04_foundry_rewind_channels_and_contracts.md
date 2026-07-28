---
title: "Commerce Foundry, BeKindRewind, Channels, and Contracts"
project: "Storyworld Platform"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
part: "04_foundry_rewind_channels_and_contracts"
---

# 11. Commerce Foundry integration

## 11.1 Boundary

Commerce Foundry remains the AI-native governed commerce system for:

- Market intelligence and opportunity.
- Product ideation and catalog truth.
- Product/SKU, offer, and approved-claim state.
- Product artwork, print-ready production files, listing imagery, mockups, background removal, and listing-specific refinement.
- IP, trademark, compliance, marketplace policy, and final commercial approval.
- Marketplace and commerce publication.
- Conversion and revenue attribution.

Storyworld provides:

- Brand storyworlds and narrative campaigns.
- Arcs, episodes, scenes, characters, settings, product-placement proposals, and derivative narrative media.
- Continuity, creative review, master narrative assets, and channel-neutral narrative packages.

Commerce-native asset production should not migrate into Storyworld merely because both systems call image models. Storyworld may use approved product references inside a scene; Commerce Foundry remains responsible for product-truth and listing production.

## 11.2 Native experience without coupling

Commerce Foundry should expose a native **Narrative Campaigns** surface for:

- Selecting products, collections, audience, objective, channels, offer context, budget, and desired releases.
- Pinning approved product imagery, facts, claims, restrictions, and disclosures.
- Selecting an existing Storyworld property or initiating a campaign-local property.
- Viewing Storyworld progress, blockers, creative-review state, and current bundle version.
- Reviewing imported candidates for product, claim, IP, policy, offer, CTA, and marketplace suitability.
- Authorizing publication and viewing commerce outcomes.

Complex story and media authoring remains in Storyworld Studio. The initial implementation should use shared SSO, contextual deep links, typed status cards, and an embedded focused review component—not a duplicate editor. A shared design-system package can make the experience coherent without sharing state.

## 11.3 Connected campaign workflow

1. A user starts Narrative Campaign from a product, collection, opportunity, or launch in Commerce Foundry.
2. Commerce Foundry creates and signs an immutable `NarrativeCampaignBrief`.
3. Storyworld receives the brief idempotently, establishes the connection, and pins its product, claim, policy, and reference snapshots.
4. The user opens Storyworld Studio with shared identity and the campaign context.
5. Studio proposes an arc and placement strategy.
6. Each use of a product becomes a `PlacementContract`.
7. Story and media production, continuity review, rights review, and creative approval occur in Storyworld.
8. Storyworld prepares a signed `NarrativeAssetBundle`.
9. Commerce Foundry imports it as unapproved candidate media.
10. Commerce Foundry performs product, claim, IP, compliance, offer, CTA, channel, and final commercial review.
11. Typed findings return against exact assets, copy, placements, and source snapshots.
12. Storyworld performs a focused revision and submits a new immutable bundle.
13. Commerce Foundry grants exact-version commercial approval and publishes or delegates a constrained publication capability.
14. Publication receipts and normalized commerce observations return to both systems.
15. Storyworld may propose follow-up episodes or variants; a person decides.

## 11.4 NarrativeCampaignBrief

Required content:

- Origin, authority host, workspace, campaign, and correlation IDs.
- Objective, audience, channels, offer context, budget, and target conditions.
- Immutable product and collection versions.
- Approved source images and product-fidelity references.
- Approved facts and claims.
- Prohibited claims and depictions.
- Brand, style, safety, IP, and policy constraints.
- Required disclosures and accessibility.
- Approval and publication responsibilities.
- Expiry and source-drift behavior.

## 11.5 NarrativeAssetBundle

Required content:

- Story concept, arc, episodes, scenes, and placement rationale.
- Exact product, claim, policy, and source snapshot references.
- Master asset versions, channel renditions, copy, scripts, captions, alt text, CTAs, and disclosures.
- Derivation lineage, provider/workflow provenance, and content hashes.
- Rights and consent evidence.
- Continuity, product-fidelity, technical, and policy reports.
- Creative and rights approval receipts.
- Required receiving-authority checks.
- Package version, origin, correlation, expiry, and detached signature.

Commerce Foundry imports this bundle as unapproved. Storyworld creative approval is evidence; it is not commercial authorization.

## 11.6 Change, drift, and invalidation

Commerce Foundry emits source changes for:

- Product or packaging version.
- Claim withdrawal or revision.
- Rights expiry.
- Listing retirement.
- Offer or disclosure change.
- Added compliance or safety restriction.

Storyworld identifies affected drafts, accepted assets, scheduled packages, and published instances. It marks associations stale and proposes revalidation, replacement, withdrawal, or documented waiver to the proper authority. Published work is never silently deleted.

Commerce rejection does not necessarily invalidate a Storyworld master asset. It rejects the exact commercial-use association, rendition, copy, placement, or package.

## 11.7 Integration acceptance test

The integration is production-ready only after a real campaign completes:

> CF brief → pinned Storyworld project → story plan → generated panels and copy → creative acceptance → CF commercial rejection of one rendition → targeted Storyworld revision → CF approval → publication/export → performance observation returned.

Acceptance requires:

- Storyworld cannot invent or mutate product facts.
- Stale source versions are blocked or explicitly waived by the correct authority.
- Commerce Foundry is the only holder of credentials for CF-owned publication.
- Approval binds to exact assets, copy, disclosure, and source versions.
- Storyworld cannot bypass a CF rejection.
- Event replay and bundle import are idempotent.
- The complete audit chain is reconstructible through correlation and causation IDs.

# 12. BeKindRewind integration

## 12.1 Storyworld responsibilities

- Era and world bible.
- Locations and spatial relationships.
- Characters, NPC source definitions, relationships, dialogue constraints, and voice references.
- Missions, dependencies, authored outcomes, and narrative state effects.
- Items, artifacts, collectibles, lore, and source-state rules.
- Interaction and trigger specifications.
- Sound-zone intent and source references.
- Canonical source assets and content releases.
- Derivative trailers, character profiles, in-world advertisements, and social narrative media.

## 12.2 Runtime responsibilities

- Rendering, geometry, collision, navigation, physics, input, and animation controller behavior.
- Runtime scripting and implementation of NPC and quest systems.
- Asset optimization, platform budgets, world streaming, networking, and builds.
- Player inventory, progression, choices, saves, achievements, and live state.
- Multiplayer presence and runtime deployment.
- Raw player telemetry and operational monitoring.

Player-specific state is not canon. Aggregate observations may become evidence for a reviewed Storyworld iteration proposal.

## 12.3 RuntimeContentRelease

A target-specific compiler produces:

- Property manifest and canon snapshot.
- Locations and spatial references.
- Entities, NPCs, appearances, and runtime-facing metadata.
- Dialogue trees and localization.
- Mission graph, prerequisites, effects, and authored outcomes.
- Items, collectibles, triggers, and state transitions.
- Sound zones and source-asset references.
- Asset index and checksums.
- Rights, provenance, disclosure, and release notes.
- Target and compiler versions.

Validation includes dangling references, impossible or circular mission dependencies, inaccessible content, missing media or localization, conflicting transitions, rights expiry, runtime-budget violations, and canon drift.

## 12.4 Round trip

1. Author and approve source content in Storyworld Studio.
2. Compile an immutable package for the selected runtime target.
3. Validate structure, dependencies, assets, rights, and target budgets.
4. Preview in an isolated BeKindRewind test environment.
5. Approve the content release.
6. Runtime imports and compiles the exact version.
7. Runtime returns an acceptance or rejection receipt and deployment ID.
8. Aggregate telemetry and content errors return as observations.
9. Designers propose revisions in Studio.
10. Any emergency runtime hotfix is explicitly reconciled through a later import; compiled files never silently become canon.

The runtime must remain operable without a live Storyworld connection.

# 13. Channel strategy, publishing, and analytics

## 13.1 Instagram’s role

Instagram is the first launch adapter because the recovered properties naturally use carousels, Stories, Reels, captions, grid rhythm, and serialized audience interaction. It should not define the product.

The canonical Engine models:

- Narrative intent and sequence.
- Assets and copy.
- Accessibility and disclosure obligations.
- Release relationships and lineage.

The Instagram adapter models:

- Aspect ratios, safe zones, carousel limits, duration, caption and metadata constraints.
- Story/Reel rendering and subtitle rules.
- Account capability, API restrictions, rate limits, and publication receipts.
- Platform-specific metrics.

Later adapters can target TikTok, Pinterest, YouTube Shorts, Facebook, websites, email, web stories, and owned apps without changing canon.

## 13.2 Publishing authority

- A standalone Storyworld project may publish through Storyworld only when the project’s authority policy grants it.
- A Commerce Foundry campaign publishes through Commerce Foundry or a tightly delegated capability.
- A BeKindRewind runtime release requires runtime acceptance.
- Channel credentials live in a dedicated connector secret store and are scoped to an account and action.
- The Engine itself never holds unrestricted publication authority.
- Manual export is always available.

## 13.3 Publication record

A `Publication` stores:

- Exact asset, rendition, copy, disclosure, and approval versions.
- Authority host and channel account.
- Connector version and requested action.
- Publication time, external ID, and receipt.
- Failure, retry, later edit, removal, or supersession.
- Correlation to narrative, placement, campaign, and experiment.

## 13.4 Performance model

Storyworld should answer:

- Which properties, recurring characters, motifs, and worlds retain an audience?
- Which arcs, episodes, scenes, shots, or panels drive completion or drop-off?
- Which product placements feel natural and also contribute to commerce outcomes?
- Which reference packs, templates, and assets are reused?
- How much work is lost to continuity correction or approval churn?
- Which formats and channels justify their cost?

Data authority remains distributed:

- Channel connectors own raw platform receipts.
- Commerce Foundry owns conversion and revenue attribution.
- BeKindRewind owns raw player telemetry.
- Storyworld owns narrative-level analytical projections, experiments, and proposals.

The adaptation loop is:

> Observation → hypothesis → proposed variation → approved experiment → result → reviewed iteration.

Small-sample uncertainty must be visible. Editorial and fictional projects may disable commerce optimization. Performance cannot rewrite canon, approved claims, rights, or releases automatically.

# 14. APIs, events, and package contracts

## 14.1 External API style

Use contract-first REST/OpenAPI for public application behavior. Use:

- `202 Accepted` plus an operation ID for long-running work.
- Idempotency keys for all externally initiated mutations.
- Expected-version or ETag checks for concurrency.
- Cursor pagination and stable ordering.
- Server-sent events or WebSocket subscriptions for job and review status.
- Problem Details responses with typed, actionable errors.
- Generated TypeScript client types and contract fixtures.

A Studio-specific backend-for-frontend may aggregate views, but it cannot bypass the same application service, authorization, and invariants available through public commands.

## 14.2 Representative endpoints

| Endpoint family | Examples |
|---|---|
| Workspaces and properties | `POST /v1/workspaces`, `POST /v1/properties`, `GET /v1/properties/{id}` |
| Source and canon | `POST /v1/properties/{id}/sources`, `POST /v1/canon-proposals`, `POST /v1/canon-releases` |
| Entities and state | `POST /v1/entities`, `POST /v1/relationships`, `GET /v1/scenes/{id}/state-packet` |
| Productions | `POST /v1/productions`, `POST /v1/narrative-units`, `POST /v1/scenes` |
| Continuity | `POST /v1/continuity-checks`, `POST /v1/findings/{id}/dispositions` |
| Media | `POST /v1/generation-runs`, `POST /v1/assets/{id}/revisions`, `POST /v1/editor-checkouts` |
| Review | `POST /v1/review-cases`, `POST /v1/review-decisions`, `POST /v1/approval-receipts` |
| Release | `POST /v1/creative-releases`, `POST /v1/channel-packages`, `POST /v1/runtime-releases` |
| Commerce | `POST /v1/integrations/commerce-foundry/campaign-briefs`, `POST /v1/narrative-asset-bundles` |
| Observations | `POST /v1/performance-observations`, `POST /v1/iteration-proposals` |
| Portability | `POST /v1/exports`, `POST /v1/imports`, `POST /v1/packages/verify` |

## 14.3 Event catalog

Important events include:

- `SourceMaterialIngested`
- `CanonChangeProposed`
- `CanonReleasePublished`
- `ProductionPinnedToCanon`
- `StoryPlanProposed`
- `SceneStateCompiled`
- `GenerationRequested`
- `SceneCandidateReady`
- `ContinuityIssueFound`
- `RightsEvidenceMissing`
- `AssetVersionAccepted`
- `CreativeReleaseApproved`
- `NarrativeAssetBundlePrepared`
- `CommerceBundleImported`
- `CommercialReviewFindingRaised`
- `CommercialApprovalGranted`
- `PublicationAuthorized`
- `PublicationSucceeded`
- `PublicationFailed`
- `RuntimeReleasePrepared`
- `RuntimeReleaseAccepted`
- `SourceDependencyChanged`
- `PerformanceObservationRecorded`
- `IterationProposed`

Use CloudEvents-compatible envelopes with:

- Event and schema version.
- Event ID, aggregate ID, tenant, and workspace.
- Correlation and causation IDs.
- Occurred-at and recorded-at time.
- Producer, actor, and authority host.
- Expected consumer behavior and redaction classification.
- Signature where crossing product boundaries.

Delivery is at least once through transactional outbox and idempotent inbox. Duplicate delivery must be harmless. Do not use distributed transactions across products.

## 14.4 Shared package envelope

All connected and portable package types use a common envelope:

- Schema and package versions.
- Origin and declared authority host.
- Workspace, property, production, release, and correlation IDs.
- Canon and source snapshot versions.
- Entity, narrative, and asset manifests.
- Asset index, content types, sizes, and checksums.
- Rights, consent, provenance, disclosure, and sensitivity metadata.
- Approval receipts and validation reports.
- Integration-specific associations, such as product or runtime target.
- Detached signature and verification material.

Connected packages may reference immutable object URIs with scoped access. Portable packages embed assets. Packages exclude secrets, connector credentials, unnecessary personal information, restricted private notes, and hidden provider reasoning.

## 14.5 Versioning and compatibility

- Additive fields are backward compatible within a major contract version.
- Consumers ignore unknown optional fields but reject unknown required semantics.
- Breaking changes require a new major version and dual-read migration window.
- Contracts have golden fixtures in both Storyworld and consumer CI.
- Package verification is deterministic.
- Migrations never modify accepted source files or hashes.
- Deprecation requires telemetry showing remaining consumers and an explicit retirement gate.
