---
title: "Domain Architecture and Media Pipeline"
project: "Storyworld Platform"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
part: "03_domain_architecture_and_media_pipeline"
---

# 8. Canonical domain model

## 8.1 Hierarchy

```text
Organization
└── Workspace
    └── Property
        ├── Source inbox
        ├── Canon branch and canon releases
        │   ├── Entities and relationships
        │   ├── Facts, rules, terminology and themes
        │   ├── Timeline, knowledge and state transitions
        │   ├── Style, voice, rights and safety
        │   └── Reference packs
        ├── Production
        │   └── Release structure
        │       └── Narrative units
        │           └── Scenes / sequences
        │               └── Beats
        │                   └── Shots / panels / interactions
        ├── Assets and renditions
        ├── Reviews and approvals
        ├── Packages and publications
        └── Performance observations and proposals
```

`NarrativeUnit` is hierarchical and configurable. A template may label levels season → episode → scene, campaign → post → panel, book → chapter → spread, or world → mission → interaction. Labels and validation differ; the underlying lifecycle and version semantics remain consistent.

## 8.2 Bounded contexts and aggregates

| Bounded context | Principal aggregates |
|---|---|
| Workspace and tenancy | Organization, Workspace, Membership, ServicePrincipal, ProjectClassification |
| Property and canon | Property, CanonBranch, CanonRelease, CanonEntity, Relationship, Timeline, CanonFact, WorldRule, Terminology |
| Narrative planning | Production, NarrativeWork, Series, Season, Arc, Episode, Sequence, Scene, Beat, Thread, Reveal, CalendarPlan |
| Interactive narrative | NarrativeNode, Choice, Trigger, Preconditions, Effects, QuestDefinition, DialogueDefinition |
| Brand and editorial context | CreativeBrief, BrandSnapshot, VoiceProfile, AudienceProfile, StyleSystem, ConstraintSet |
| Continuity | ContinuitySnapshot, EntityState, StateTransition, ReferencePack, ContinuityCheck, Finding, Waiver |
| Media assets | Asset, AssetVersion, Rendition, AssetCollection, Derivation, Annotation |
| Generation | GenerationRecipe, GenerationRequest, GenerationRun, Candidate, ProviderExecution, EvaluationRun |
| Rights and provenance | SourceRecord, RightsGrant, ConsentRecord, LicenseTerm, UsageRestriction, ProvenanceRecord, DisclosureObligation |
| Review and release | ReviewCase, ReviewDecision, RevisionRequest, ApprovalReceipt, CreativeRelease |
| Adaptation and delivery | CanonicalMediaPackage, RenditionSpec, ChannelPackage, RuntimeContentRelease, DeliveryReceipt |
| Commerce integration | CommerceConnection, ProductSnapshot, ClaimSnapshot, CampaignBrief, ProductPlacement, NarrativeAssetBundle, SyncCursor |
| Analytics and learning | PerformanceObservation, MetricMapping, Experiment, Variant, Insight, IterationProposal |

Avoid an enormous `Storyworld` aggregate. Canon entities, scenes, assets, reviews, and packages need independent concurrency boundaries. Use UUIDv7 or ULID identifiers, optimistic concurrency, immutable accepted versions, and explicit supersession.

## 8.3 Fact model

A canon fact includes:

- Stable fact ID and immutable revision ID.
- Subject, predicate, typed value, and optional unit.
- Canon branch and scope.
- Valid story-time range.
- Source and rationale.
- Visibility and sensitivity.
- Status and strength.
- Owner and required approver.
- Superseding fact or retcon reference.

Fact classifications:

- **Hard canon** — cannot be contradicted without an approved retcon.
- **Soft canon** — preferred but adjustable through normal review.
- **World rule** — constrains what is possible.
- **Style rule** — constrains visual or linguistic expression.
- **Production-local fact** — applies only to one adaptation or campaign.
- **Proposed fact** — non-authoritative.
- **Secret truth** — creator-visible but not yet audience-visible.
- **Audience-visible fact** — released knowledge.
- **Character belief** — may be incomplete or wrong.
- **Deprecated fact** — preserved for history but no longer active.

## 8.4 Placement contract

Every product appearance in a connected commerce production is represented by a `PlacementContract` containing:

- Commerce Foundry product and product-version reference.
- Narrative role: hero, utility, gift, background texture, problem solver, optional cameo, or custom.
- Scene-level narrative rationale.
- Required and prohibited depictions.
- Fidelity and minimum-visibility requirements.
- Allowed transformations.
- Approved and prohibited claims.
- Disclosure and CTA obligations.
- Offer association.
- Approval state and exact-version evidence.
- Performance correlation identifiers.

The Engine may flag a requested placement as narratively inappropriate. “Include the product” is not permission to damage the story or invent a problem the product does not solve.

## 8.5 Reference packs

Provider-neutral reference packs can include:

- Character turnarounds, age or era variants, expressions, poses, and negative traits.
- Wardrobe sets and valid transitions.
- Location views, layout, time, lighting, signage, weather, damage, and sound intent.
- Product angles, packaging, scale, color, logo, and prohibited deformation.
- Prop and object-state references.
- Palette, material, composition, typography, texture, camera, and lens language.
- Approved voice and language examples.
- Negative references and prohibited visual or tonal patterns.

Provider-specific embeddings, LoRAs, seeds, control networks, or persistent IDs attach to a reference pack as replaceable implementation details. They are not the canonical definition.

# 9. Technical architecture

## 9.1 Recommended implementation shape

Build one Storyworld repository containing an independently deployable modular monolith and workers:

```text
apps/
  studio-web/              Next.js Storyworld Studio
  engine-api/              Public application API and integration gateway
  workflow-worker/         Temporal workflows and activities
  render-runner/           Optional local/remote media execution
  admin-tools/             CLI, migrations, package verification
packages/
  domain/                  Aggregates, value objects, invariants
  application/             Commands, queries, authorization, policies
  contracts/               OpenAPI, JSON Schema, events, packages
  persistence/             PostgreSQL and object-store adapters
  canon-continuity/        Snapshots, state computation, checks
  media/                   Recipes, provider gateway, transformations
  rights-policy/           Rights, consent, disclosure, policy hooks
  review-release/          Reviews, approvals, releases
  integrations/            Commerce Foundry, runtime, channel adapters
  sdk-typescript/          Generated and hand-authored client helpers
  ui-system/               Shared Storyworld components and design tokens
```

Commerce Foundry remains in its own repository. Share versioned packages and generated client types through a registry or release artifact, not through source-level access to internal modules.

## 9.2 Recommended stack

| Concern | Initial choice | Rationale and boundary |
|---|---|---|
| Language | TypeScript for domain, API, contracts, workers, and Studio | Matches the user’s preferred stack and enables one strongly typed vertical-slice workflow |
| Studio | React / Next.js | Mature app routing, server rendering where useful, shared TypeScript contracts, preview deployments |
| API | Node.js modular application service with REST/OpenAPI | Clear external contracts, portable clients, straightforward idempotency and authorization |
| Database | PostgreSQL | Authoritative relational state, transactions, JSON where necessary, mature migrations and row-level security |
| Similarity | `pgvector` as a rebuildable projection | Avoid a separate vector database until scale or isolation requires it |
| Object storage | S3-compatible immutable storage; MinIO or filesystem adapter for local use | Portable and content-addressed; metadata remains in Storyworld |
| Workflow | Temporal | Durable retries, waits, human gates, cancellation, resumability, and long-running media operations |
| Agent execution | Octon when available; local capability/policy interface before then | Keeps agent missions governed without making Octon a Storyworld database |
| Cache | Redis only for cache and ephemeral coordination | Never authoritative |
| Media tooling | Python workers only where ML or media libraries require them | Keeps the core domain in TypeScript while supporting practical inference tooling |
| Telemetry | OpenTelemetry | End-to-end correlation from UI to workflow, provider, connector, and authority receipt |
| Events | Transactional outbox/inbox and signed webhooks initially | At-least-once, idempotent exchange without premature Kafka/NATS |
| Testing | Unit, integration, contract, migration, Playwright E2E, visual regression, evaluation corpus | Covers deterministic and generated behavior |
| Delivery | Monorepo CI, preview deployments, feature flags, manual promotion and rollback | Matches preferred controlled release practices |

## 9.3 Modules inside the Engine

- Workspace and Identity
- Source and Ingestion
- Property and Canon
- Entity and Relationship
- Narrative Planning
- Interactive Narrative
- Continuity and State
- Reference and Style
- Generation and Provider Gateway
- Assets and Provenance
- Rights, Consent, and Policy
- Review and Approval
- Adaptation, Release, and Delivery
- Commerce Integration
- Runtime Integration
- Channel Connectors
- Analytics, Experiments, and Proposals
- Administration, Usage, and Billing

Each module owns its tables and application commands inside the monolith. Cross-module access occurs through application interfaces or domain events, not arbitrary table queries. Network services are introduced only when measured need warrants them.

## 9.4 Deployment profiles

- **Local/private development** — Docker Compose; PostgreSQL; filesystem or MinIO; Temporal; local provider mocks; optional local GPU runner.
- **Managed Stavium deployment** — web, API, and workers; managed PostgreSQL and object storage; managed or self-operated Temporal; isolated secrets; autoscaled media runners.
- **Hybrid media execution** — cloud control plane with an outbound-only, mutually authenticated local render runner for sensitive assets or local GPUs.
- **Dedicated tenant deployment** — conditional enterprise option for data residency, isolation, or contractual need.

A mature Stavium content-addressed blob layer may physically deduplicate binaries across products, but Storyworld and Commerce Foundry retain separate semantic asset records, permissions, lifecycle, and authority.

## 9.5 Why not microservices first

The hardest early problem is defining correct narrative semantics and human workflow, not horizontal scale. A modular monolith provides:

- One transactional boundary for canon, artifact, review, and release invariants.
- Easier local development and deployment for a small AI-assisted team.
- Contract discipline without network and operational sprawl.
- Clear extraction seams if generation workers, transformations, connectors, or analytics later require independent scale or security.

Extract only when at least one is measured:

- Three or more independent products consume the module.
- The workload requires materially different hardware or scaling.
- Security or compliance requires stronger isolation.
- Separate teams require independent release cadence.
- Failures threaten unrelated application availability.
- A vendor boundary cannot be maintained in-process.

# 10. Generation, continuity, and revision architecture

## 10.1 Durable generation flow

1. Studio or an integration creates a versioned `GenerationRequest`.
2. Temporal starts a workflow with correlation, idempotency, budget, and cancellation controls.
3. The Engine resolves a pinned canon release, scene state, references, rights, product snapshots, policies, and channel specification.
4. Preflight validates permission, rights, disclosure, cost ceiling, provider policy, claims, and continuity locks.
5. Agentic reasoning tasks go to Octon with an evidence-backed context package and time-limited capability lease. Narrow deterministic inference may use the provider gateway directly.
6. An approved provider, ComfyUI workflow, or local runner executes the job.
7. Outputs enter quarantine or staging.
8. The Engine validates MIME type, scans, hashes, normalizes, records lineage, and creates candidates.
9. Technical, continuity, product-fidelity, style, rights, and format evaluations run.
10. Candidates enter human review.
11. Acceptance creates an immutable asset version and receipt. Rejection or revision preserves the failed candidate as evidence.

The provider never writes accepted state. A completed provider job means only that a candidate exists.

## 10.2 Prompt and specification compiler

The compiler produces structured, auditable recipes rather than opaque prompt strings. A recipe contains:

- Scene purpose and emotional objective.
- Entering and intended exiting state.
- Relevant canon facts and world rules.
- Cast, location, objects, wardrobe, products, and relationships.
- Narrative, visual, voice, and safety constraints.
- Locked, flexible, and provider-adjustable attributes.
- Approved reference-pack versions.
- Negative references and prohibited traits.
- Product fidelity, claim, disclosure, and placement requirements.
- Shot, panel, duration, aspect ratio, safe area, and target-format rules.
- Provider capability requirements and cost ceiling.
- Evaluation plan and acceptance rubric.

The exact provider prompt is a rendered derivative of the recipe. Provider changes do not migrate canonical data.

## 10.3 Continuity snapshots

Every scene or interaction pins a `ContinuitySnapshot` containing:

- Canon release and narrative branch.
- Story-time coordinate.
- Relevant entity states.
- Entering state and expected effects.
- Audience and character knowledge.
- Active promises, reveals, missions, and dependencies.
- Visual and voice references.
- Product and claim snapshots where applicable.
- Applicable rights and policy.

Snapshots make generation reproducible and change impact explicit. A later canon release does not silently rewrite an in-flight production.

## 10.4 Evaluation layers

| Layer | Example checks | Authority |
|---|---|---|
| Structural | Schema completeness, dangling references, legal state transition, package checksums | Deterministic; may block |
| Technical media | Dimensions, duration, codec, transparency, safe zone, legibility | Deterministic; may block |
| Temporal and state | Wardrobe, possession, location, damage, mission/reveal dependencies | Deterministic plus model assistance; finding |
| Narrative | Voice, motivation, pacing, reveal leakage, unresolved thread, repetition | Model-assisted; human decides |
| Visual continuity | Character identity, setting, composition, palette, prop and product match | Vision/reference comparison; human decides |
| Commerce fidelity | Product version, packaging, logo, placement, claim grounding, disclosure | Storyworld preflight plus mandatory CF final review |
| Rights and safety | License, consent, expiry, restricted source, provider use, disclosure | Policy may block; rights reviewer decides exceptions |

Findings include evidence, confidence, severity, exact versions, suggested remediation, and disposition. “Pass” never means legal certainty; it means the configured checks found no unresolved blocker.

## 10.5 InvokeAI and ComfyUI

### InvokeAI round trip

1. Check out an exact asset and reference manifest.
2. Create a temporary editing session.
3. Preserve the original accepted version.
4. Import the edited output as a new candidate with the editor, transformation declaration, and source manifest.
5. Re-run affected evaluations and approval gates.

InvokeAI is an advanced workspace, not an asset or approval authority.

### ComfyUI execution

- Only versioned, allowlisted workflows and nodes are executable.
- Workflow and container hashes are recorded.
- Inputs are immutable and scoped.
- Output folders and ComfyUI database are transient.
- Provider and node changes require evaluation before production promotion.
- A workflow cannot publish, approve, or write canon.

## 10.6 Local render runner

The runner:

- Establishes an outbound-only, mutually authenticated connection.
- Receives signed, mission-scoped jobs.
- Downloads immutable inputs and provider-neutral recipe derivatives.
- Runs sandboxed workflows with resource limits and egress policy.
- Uploads results to staging.
- Returns logs, costs, workflow hashes, and completion receipts.
- Has no Storyworld database credentials and no approval capability.
