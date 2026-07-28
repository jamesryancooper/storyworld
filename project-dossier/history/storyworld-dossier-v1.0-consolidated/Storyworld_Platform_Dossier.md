---
title: "Storyworld Platform Dossier"
project: "Storyworld Platform"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
part: "Complete dossier"
---

# Executive decision

Storyworld should be built as an **independently deployable Stavium platform** with two primary products:

- **Storyworld Engine** — the governed, channel-independent system of record and production engine for persistent fictional worlds, editorial properties, branded narratives, and the media derived from them.
- **Storyworld Studio** — the first-party human authoring, production, review, release, and learning application built entirely on the Engine’s public contracts.

Commerce Foundry should be a deeply integrated first-party client, not the host of Storyworld. Commerce Foundry exposes a native **Narrative Campaigns** surface, shares identity and design language, exchanges typed briefs and asset bundles, and retains all commerce authority. Complex narrative work opens in Storyworld Studio with preserved context. The two products must not share business tables or write each other’s databases.

BeKindRewind confirms why this boundary matters. It needs the same canon, characters, locations, object state, missions, dialogue, continuity, asset lineage, and derivative promotional media as a serialized social property—but its 3D rendering, physics, runtime quest execution, player state, saves, networking, and deployment belong to the BeKindRewind runtime. Storyworld compiles immutable content packages for that runtime; it does not become a game engine.

The public standalone Storyworld Studio business should remain **conditional**, not assumed. Build the independent boundary now because it is technically and strategically correct. Open broad self-service SaaS only after repeat paid non-commerce demand proves that continuity, canon, and governed multi-asset production are valuable beyond Commerce Foundry and Stavium’s owned properties.

## Decisions to lock

| Decision | Final position | Consequence |
|---|---|---|
| Product boundary | Independent Storyworld platform | Its domain can serve Commerce Foundry, BeKindRewind, Stillhouse Archive, editorial properties, and future Stavium media without commerce or runtime contamination. |
| Human application | Storyworld Studio is the primary client | Studio has no separate source of truth; it issues commands and renders state through public Engine contracts. |
| Commerce integration | First-class and deep, but contract-based | Native Commerce Foundry entry points and review surfaces; Storyworld owns narrative work; Commerce Foundry owns product truth and commercial release. |
| Initial architecture | Independently deployable modular monolith plus workers | One coherent domain and transaction boundary; service extraction only when earned by scale, isolation, or release cadence. |
| Channel strategy | Instagram is the first optimized adapter | Canonical projects and media masters remain channel-independent. Manual export exists even if platform APIs change. |
| Model authority | Models propose; humans authorize | Generated plans, facts, assets, waivers, releases, and iterations remain candidates until an authorized person accepts them. |
| Game boundary | Content compiler, not runtime | Storyworld owns authored narrative source and releases; BeKindRewind owns execution and player state. |
| Public commercialization | Gated | Technical deployability is not treated as proof of an independent market. |

## The first build target

The first useful release is not “all mature features.” It is a governed vertical slice that can:

1. Represent a small persistent property with characters, locations, rules, timeline state, and visual references.
2. Plan a three-episode sequence and compile scene or panel specifications from pinned canon.
3. Generate or import still-image candidates and copy through one replaceable provider path.
4. Preserve provenance, compare candidates, make a focused revision, review continuity, approve exact versions, and export a package.
5. Complete both a small BeKindRewind content slice and a Commerce Foundry product-story campaign without forking or contaminating the core model.

Only after that boundary is proven should the platform add production video, direct social publishing, adaptive variants, broad self-service onboarding, or microservices.

![Storyworld platform boundary](assets/storyworld_architecture.png)

*Figure 1. Storyworld is a separate narrative authority with first-party clients and replaceable adapters. Integration depth comes from identity, contracts, events, embedded status and review, and shared design—not database coupling.*

# 1. Evidence basis and recovered direction

## 1.1 Context reviewed

This dossier consolidates the context available through:

- The current conversation, including the revised decision to account for BeKindRewind.
- Saved personal and project context associated with the account.
- The Library document **Integrated Personal, Project, and Strategic Profile**.
- Related saved project references surfaced through context search.
- The current workspace, which did not contain an implementation repository or runnable Storyworld or Commerce Foundry prototype.

The interface does not expose a literal raw transcript of every historical chat. Accordingly, “implemented” is used only where an accessible artifact or working system could be verified. Most recovered material is detailed design rather than verified production software. This limitation does not prevent a sound product and architecture plan, but it does mean implementation status should not be inferred from the maturity of prior prose.

## 1.2 Maturity legend

| Status | Meaning in this dossier |
|---|---|
| Discussed | An idea or direction appeared in prior context but lacks a sufficiently complete product or technical design. |
| Designed | Workflows, entities, formats, or architecture were described in material detail. |
| Prototyped | A runnable proof or demonstrable implementation was accessible. |
| Implemented | A working application or production capability was accessible and verifiable. |

No Storyworld Engine or Storyworld Studio prototype was found in the accessible workspace. Commerce Foundry has a substantial proposed architecture and workflow, but no production implementation was verified here. InvokeAI, ComfyUI, Temporal, Octon, and channel integrations are therefore treated as intended integrations until proven by working contracts and tests.

## 1.3 Recovered concept map

| Prior concept | Original purpose and format | Requirement contributed to Storyworld | Recovered maturity |
|---|---|---|---|
| BeKindRewind / Rewind Plaza | Browser-based, explorable 1980s memory world with family characters, fictional video store, arcade, mall, pizza shop, toy store, roller rink, neighborhood, missions, dialogue, collectibles, music and ambience | Spatial canon, era rules, NPCs, mission dependencies, object state, dialogue, sound zones, runtime manifests, content releases, derivative trailers and social posts | Substantially designed; no runnable prototype verified |
| Stillhouse Archive | Serialized liminal archival mystery for Instagram; followers act as witnesses or investigators | Hidden truth versus audience-visible truth, reveal graphs, symbol dictionary, chronology, evidence artifacts, mystery pacing, ARG safety, long-form continuity | Deeply designed; no published implementation verified |
| Notes to My Daughter | Dignity-preserving illustrated visual notebook from a father; recurring 8–10 slide carousels | Editorial voice, privacy and dignity controls, recurring characters, evolving metaphors, carousel grammar, caption patterns | Designed examples; no implemented series verified |
| Living inheritance | Long-lived advice and reflections for a younger generation, using photos, carousels, and Reels | Durable editorial taxonomy, source-photo rights, tone, cadence, cross-format reuse, separation of private source from public work | Discussed and partially designed |
| Proper Manhood / Sons’ Field Manual | Rugged illustrated life manual for young men | Reusable lesson templates, fixed visual system, recurring motifs, carousel-to-voiceover adaptation, publishing derivatives | Designed; no implementation verified |
| Dumpster Fire Friends | Comedy collectible-card series with recurring characters and structured stats | Schema-driven episodes, stable character identity, numbered releases, reusable card layouts, merchandising derivatives | Designed; no implementation verified |
| Recurring dog comedy | Fixed porch, recurring dog and delivery-driver setup, package-to-toy exchanges across short clips | Multi-shot continuity, prop state, fixed setting, cast consistency, shot assembly, sound and caption layers | Production-specified; no rendered prototype verified |
| Creative Media Ventures | Umbrella for image, audio, video, ambience, and storytelling properties | Multi-property reuse, media-provider abstraction, portfolio operations, internal tenancy and cost attribution | Strategic concept |
| Commerce Foundry | AI-native governed commerce lifecycle from research and product ideation through media, compliance, approval, publishing, measurement, and iteration | Catalog grounding, approved claims, product fidelity, natural placement, IP/compliance review, commercial approval, publishing authority, conversion feedback | Deep architecture and workflow design; implementation not verified |
| EndlessPopcorn | Adaptive movie discovery and intelligence | Later experiments, contextual variants, preference-aware media, performance learning; not an initial Storyworld dependency | Adjacent designed concept |
| Octon and Harmony | Governed agent execution and methodology | Models are non-authoritative, deny by default, mission-scoped capability, receipts, replay, rollback, clear control planes | Architectural principles and proposed platform |

## 1.4 Canonical synthesis

These concepts should not become separate generation tools. Their shared capability is:

> Maintain a durable representation of a storyworld or editorial property; plan narrative units against its canon and state; produce coherent media through replaceable tools; preserve provenance, rights, review, and approval; then adapt or compile approved work for commerce, social channels, owned media, and interactive runtimes.

The common core is stronger than an “Instagram storyline generator,” yet narrower than a universal creative suite. It is a **persistent narrative-production platform**. Genre-specific needs belong in templates, vocabularies, validators, and target adapters rather than an ever-expanding universal schema.

# 2. Product family and positioning

## 2.1 Storyworld Engine

**One-sentence definition:** Storyworld Engine is the governed, channel-independent system of record and production engine for persistent fictional worlds, editorial properties, branded narratives, interactive narrative source content, and the media derived from them.

Its durable value is not generic generation. It preserves:

- Meaning and authorial intent.
- Canon and causality.
- Character, environment, wardrobe, object, product, style, voice, spatial, and temporal continuity.
- Rights, consent, provenance, and required disclosures.
- Exact-version decisions, approvals, revisions, and releases.
- Reusable assets and context across formats and consumers.

The Engine is headless and independently deployable. It provides public contracts to Storyworld Studio, Commerce Foundry, BeKindRewind, command-line tools, SDK clients, and future Stavium properties.

## 2.2 Storyworld Studio

**One-sentence definition:** Storyworld Studio is the first-party creative-production application where people define properties, author canon, plan narratives, generate and revise media, supervise continuity, collaborate, approve exact versions, release or export work, and evaluate outcomes.

Studio can operate in four product modes without separate databases or incompatible schemas:

- **Story mode** — serialized fiction, mystery, character IP, short-form narrative.
- **Editorial mode** — voice-led publishing, illustrated essays, field manuals, educational or reflective series.
- **Commerce mode** — brand storyworlds and product-centered campaigns initiated by Commerce Foundry.
- **Interactive mode** — authored world, mission, dialogue, item, and state content compiled for runtimes such as BeKindRewind.

Modes alter language, defaults, templates, visible tools, and validators. They do not create separate products internally.

## 2.3 Supporting components

| Component | Responsibility |
|---|---|
| Storyworld Studio Web | Desktop-first authoring and production; responsive review and approval on mobile |
| Storyworld Engine API | Public application commands, queries, policy enforcement, versioning, and integration contracts |
| Storyworld Workflow Worker | Durable production, review, evaluation, release, and reconciliation workflows |
| Storyworld Render Runner | Optional local or remote media execution with scoped jobs and no database credentials |
| Storyworld Contracts SDK | OpenAPI/JSON Schema types, package schemas, signature and verification helpers, test fixtures |
| Commerce Foundry Connector | Brief, snapshot, asset-bundle, review-finding, publication-receipt, and performance-observation exchange |
| Runtime Compiler SDK | Target-specific compilation of approved source content into immutable runtime packages |
| Channel Adapters | Platform-specific renditions, exports, publication requests, receipts, and normalized observations |

## 2.4 Initial customers and paid job

The initial external target, if commercialization gates are met, is a visually led DTC brand or boutique creative agency producing recurring product-centered stories. The most compelling paid job is:

> Turn approved products and brand constraints into a coherent multi-episode visual campaign with consistent characters and settings, natural product placement, exact-version review, and reusable channel renditions—without coordinating disconnected prompting, editing, file storage, approvals, and compliance by hand.

Serialized creators and interactive-world developers are important validation segments, but the commerce workflow has a clearer early budget and direct connection to Commerce Foundry.

## 2.5 Mature packaging hypothesis

Pricing is a hypothesis to validate, not a forecast.

| Package | Intended customer | Indicative mature structure |
|---|---|---|
| Creator | Independent serialized storyteller or very small brand | 1–2 seats, limited active properties, still images and carousels, manual export; approximately $49–$79/month plus generation |
| Studio | Small brand or creative team | About 5 seats, more properties, video/audio, collaboration, publishing, analytics and API; approximately $149–$249/month plus generation |
| Agency | Multi-client creative agency | Client workspaces, guest approvals, reusable templates, cost allocation, broader API and rights controls; approximately $499–$999/month plus generation |
| Enterprise | Publisher, larger brand, or media company | SSO, dedicated deployment, data residency, custom policies, SLA and advanced audit; custom |
| Engine API | Interactive products and developers | Metered API, storage, processing, compilation, and export usage |
| Commerce Foundry Narrative Campaigns | Commerce Foundry customers | Add-on or upper-tier entitlement; avoid double billing for shared generation or asset custody |

Video-heavy work should be metered or passed through. “Unlimited” generation would produce avoidable margin and abuse risk.

# 3. Product principles, invariants, and non-goals

## 3.1 Product principles

1. **Canon is accepted truth, not model memory.** Models receive evidence-backed context packages and return proposals.
2. **One entity has one authoritative owner.** Storyworld, Commerce Foundry, and BeKindRewind exchange immutable references and snapshots; they do not share mutable business state.
3. **A production pins its context.** Canon, product data, claims, reference packs, policies, and provider workflows are versioned.
4. **Every material change creates a new version.** No destructive overwrite of accepted or published work.
5. **Approval binds to exact content.** A material change invalidates affected approvals; creative approval never implies commerce or publication approval.
6. **Continuity is a workflow, not a promise of perfect AI consistency.** The system exposes confidence, evidence, findings, and targeted correction.
7. **Channel masters remain neutral.** Instagram specifications live in an adapter, not in canon or narrative planning.
8. **Portable export is permanent.** Connected integrations may be preferred, but users can always export content, metadata, lineage, and approvals.
9. **Private sources are not automatically public canon.** Sensitive family-inspired or client material is restricted by default and requires deliberate generalization and approval.
10. **The platform is earned through repeated use.** Generalize only after genuinely shared behavior appears across several properties.

## 3.2 Architectural invariants

- Storyworld Studio never writes a separate copy of domain state.
- Storyworld and Commerce Foundry never share business tables or perform dual writes.
- BeKindRewind player state never becomes Storyworld canon.
- Product and claim snapshots are optional Storyworld extensions, not mandatory fields in the generic narrative model.
- Models, tools, InvokeAI, ComfyUI, render runners, and connectors never receive approval or unrestricted publication authority.
- Generated output enters staging as a candidate.
- Accepted assets, releases, and packages have immutable hashes and derivation lineage.
- Async delivery is at least once; consumers are idempotent.
- No distributed transaction spans Storyworld and another authority system.
- Direct publication remains optional; signed export always works.

## 3.3 Explicit non-goals

Storyworld is not:

- A foundation-model company.
- A replacement for Photoshop, Resolve, Blender, InvokeAI, ComfyUI, or a professional editor.
- A real-time game engine, 3D renderer, physics engine, networking stack, or player-save service.
- A commerce catalog, PIM, inventory, fulfillment, offer, or marketplace system.
- A generic digital-asset manager detached from narrative relationships and state.
- A generic social scheduler.
- A social network, creator marketplace, or user-generated-content community.
- An autonomous publishing agent.
- A legal-clearance guarantee.
- A surveillance or psychologically manipulative personalization platform.
- A mechanism for commercializing another person’s private circumstances.
- A requirement that every Stavium property share one fictional universe.

# 4. Users, jobs, and authority

## 4.1 Primary personas

| Persona | Primary job in Storyworld |
|---|---|
| IP owner / creative director | Define the property’s promise and canon, protect identity, approve meaningful changes, and reuse work across productions |
| Showrunner / narrative designer | Manage arcs, episodes, mysteries, reveals, character knowledge, chronology, promises, and payoffs |
| Visual producer / art director | Turn scenes into references, shot specifications, candidates, revisions, and approved sequences while preserving visual continuity |
| Editor / continuity supervisor | Compare proposals with canon and adjacent scenes; resolve or waive contradictions with evidence |
| Brand marketer / CF operator | Use approved products and objectives in narrative media without invented claims, inaccurate products, or forced placements |
| Interactive-world designer | Author locations, missions, NPC dialogue, triggers, items, and state effects and compile them for a runtime |
| Rights / compliance reviewer | Verify source rights, likeness and voice consent, trademarks, disclosures, claims, and provider restrictions |
| Client / executive approver | Review a focused sequence, changes, unresolved blockers, costs, and approval consequences |
| Publisher / channel manager | Validate channel renditions, credentials, quotas, publication receipts, and failure recovery |
| Analyst / growth lead | Understand performance by property, arc, episode, scene, asset, placement, channel, and experiment |
| Integration developer | Use stable APIs, events, SDKs, packages, test fixtures, and migration compatibility |
| Workspace administrator | Manage identity, roles, providers, budgets, policies, retention, audit, billing, and operational health |

## 4.2 Authority matrix

| System | Authoritative for | Explicitly not authoritative for |
|---|---|---|
| Storyworld Engine | Narrative canon, entities, chronology, arcs, scenes, interactive narrative source, continuity, creative references, master narrative assets, creative approvals, derivative packages | Products, approved claims, offers, commercial compliance, player saves, unrestricted channel credentials |
| Storyworld Studio | No independent authority; it commands and renders Engine state | Independent project, approval, or asset copies |
| Commerce Foundry | Products/SKUs, approved claims, offers, campaign budgets and commercial rules, final commerce approval, commerce publishing, conversion and revenue attribution | Narrative canon and character/world continuity |
| BeKindRewind runtime | Runtime build, geometry, physics, navigation, NPC and quest execution, optimized runtime derivatives, player state, saves, live deployment | Source canon and authoring state |
| InvokeAI | Temporary advanced human editing workspace | Master assets, provenance truth, or approval state |
| ComfyUI | Execution of approved, versioned media workflows | Workflow authority, canonical assets, approvals, or release state |
| Octon | Agent mission execution, capability leases, and execution receipts | Storyworld or Commerce Foundry business records |
| Harmony | Governance methodology, invariants, acceptance criteria, and review policy | Runtime application state |
| Channel connector | External delivery capability, channel IDs, delivery and metric receipts | Canon, product truth, or publication authorization |

For every project and delivery, an `authority_host` is explicit. A standalone editorial property may authorize release through Storyworld. A Commerce Foundry-originated campaign requires Commerce Foundry authorization. A BeKindRewind package requires runtime acceptance. Authority is never inferred from who initiated a job.

# 5. Mature capability map

## 5.1 Capability tiers

| Tier | Meaning | Examples |
|---|---|---|
| Foundational | Required before any trustworthy production | Versioning, canon, asset lineage, rights metadata, audit, human acceptance, export |
| Core production | Required for the first valuable application | Narrative plans, scenes, references, still-media generation/import, targeted revision, continuity findings, review room, channel export |
| Mature | Completes the envisioned applications after the core is proven | Multi-user collaboration, video/audio, channel adapters, analytics, runtime compiler, enterprise administration |
| Conditional | Built only after demand, quality, and economics justify it | Broad SaaS onboarding, direct publishing to every platform, fine-grained personalization, marketplace, microservices |

## 5.2 Storyworld Engine capability domains

### Property and canon

- Create, import, clone, archive, transfer, and export properties.
- Maintain official, alternate, experimental, and adaptation branches.
- Create immutable canon snapshots pinned to productions.
- Store typed facts, rules, exceptions, retcons, sources, rationales, scope, and visibility.
- Separate public, spoiler, team-private, and restricted material.
- Treat AI-extracted facts as proposals requiring acceptance.
- Detect contradictions and compute the impact of a proposed change.
- Export portable canon releases.

### Entity and relationship graph

- Characters, organizations, factions, audiences, and narrators.
- Locations, regions, sets, maps, spatial relationships, and era variants.
- Objects, props, products, artifacts, vehicles, collectibles, and symbols.
- Wardrobe, appearance states, voice profiles, and behavior constraints.
- Relationships and changes over story time.
- Character knowledge, beliefs, goals, and secrets.
- Product references pinned to Commerce Foundry versions.
- Custom fields and templates for genre-specific attributes.

### Timeline and state

- Revision time and fictional story time.
- Character age, appearance, location, condition, goals, knowledge, possessions, and relationships.
- Object ownership, damage, movement, availability, and transformation.
- Location condition, time of day, season, weather, lighting, signage, and era.
- Wardrobe, props, product packaging, logos, and offer context.
- Mysteries, clues, reveals, unresolved promises, mission availability, and completion dependencies.
- Audience knowledge versus creator truth and character belief.
- Computation of a minimal `SceneStatePacket` for generation or validation.

### Narrative planning

- Premise, themes, audience promise, tone, voice, and safety boundaries.
- Series, seasons, campaigns, arcs, episodes, chapters, missions, scenes, beats, shots, panels, and interactions.
- Flexible hierarchical `NarrativeUnit` rather than fixed genre tables.
- Reveal and dependency graphs.
- Beat sheets, storyboards, shot lists, emotional progression, and content calendars.
- Pacing, repetition, placement-fatigue, and unresolved-thread analysis.
- AI-assisted alternatives displayed as proposals and diffs.
- Reusable property and production templates.

### Continuity

- Character identity, visual appearance, age, voice, vocabulary, motivation, and behavior.
- Chronology, geography, spatial layout, wardrobe, props, object state, and product versions.
- Plot promises, symbols, motifs, themes, reveals, and audience knowledge.
- Visual style, palette, composition, camera language, typography, and negative references.
- Product fidelity, required depiction, prohibited transformations, claims, disclosures, rights, and policy.
- Deterministic checks, temporal checks, narrative-model review, vision/reference comparison, OCR/logo checks, and style similarity.
- Findings with severity, confidence, evidence, exact versions, remediation, disposition, waiver reason, approver, scope, and expiry.

### Context compilation and generation orchestration

- Compile a versioned scene specification from pinned canon, entering state, references, locks, rights, policy, channel target, and provider workflow.
- Route text, image, video, audio, voice, and later 3D-source tasks through replaceable adapters.
- Support local and hosted providers.
- Use Temporal for durable business orchestration and Octon for governed agentic missions.
- Record provider, model, revision, workflow hash, node versions, prompt hash, parameters, seed, inputs, references, cost, latency, transformations, and outputs.
- Curate and execute allowlisted ComfyUI workflows.
- Check assets out to InvokeAI or another editor and ingest returned work as new candidates.
- Resume, retry, cancel, prioritize, budget, and reconcile jobs.
- Make provider fallback explicit and policy-approved.

### Media production and variation

- Still images, illustrations, carousels, Story panels, scripts, captions, alt text, descriptions, CTAs, and promotional copy.
- Storyboards, animatics, short-form video, Reels, voiceovers, music cues, ambience, and sound effects after still-media gates are met.
- Web story packages, trailers, teasers, print/publishing derivatives, and interactive-runtime source assets.
- Instruction-based revision with locked invariants.
- Masked and regional revision.
- Replace one character, product, object, background, text layer, or shot without rerendering the sequence.
- Candidate grids, sequence comparison, contact sheets, branches, supersession, and explicit revision reason.
- Cost and impact preview before regeneration.

### Asset, provenance, rights, and consent

- Immutable asset versions and content hashes.
- Source, staging, candidate, accepted master, rendition, published instance, runtime derivative, superseded, and archived states.
- Derivation graph and transformation records.
- Ownership and license by territory, channel, period, purpose, and modification permission.
- Likeness, voice, music, font, photograph, trademark, property, and location consent.
- Training-use and provider-retention restrictions.
- Rights expiry, revocation, required attribution, and synthetic-media disclosure.
- Audit-ready reports and portable packages.

### Workflow, review, and release

- Configurable but governed lifecycle states.
- Creative, continuity, editorial, rights, client, channel, commercial, and runtime acceptance layers.
- Typed rejection and revision requests.
- Exact-version approval invalidation after material change.
- Delegation, expiry, exception handling, immutable decisions, and receipts.
- Release readiness checklists.
- Channel-neutral release masters and target-specific renditions.
- Manual download, signed package export, connected submission, scheduling, retry, receipt, and reconciliation.

### Analytics and learning

- Link observations to property, production, arc, episode, scene, shot, panel, asset, character, motif, placement, channel, segment, and experiment.
- Separate story engagement, commerce outcomes, and production effectiveness.
- Normalize views, retention, completion, swipes, saves, shares, clicks, conversions, revenue, time, cost, revision count, defects, and reuse while preserving source definitions.
- Convert observations into explainable hypotheses and iteration proposals.
- Never alter accepted canon, approved claims, or publication state automatically.

### Developer platform

- Versioned REST/OpenAPI application API.
- CloudEvents/AsyncAPI events and signed webhooks.
- Server-sent events or WebSocket job updates.
- Typed TypeScript SDK first; other SDKs after actual demand.
- Schema registry, migration policy, package verification, import/export CLI, sandbox tenants, fixtures, and contract tests.
- Provider, channel, Commerce Foundry, and runtime-adapter interfaces.

# 6. Storyworld Studio — mature application definition

## 6.1 Information architecture

### Global navigation

| Area | Purpose |
|---|---|
| Command Center | Active productions, assignments, blockers, spending, releases, connector health, and recommendations requiring a decision |
| Properties | Persistent fictional, editorial, brand, interactive, and hybrid storyworlds |
| Productions | Campaigns, seasons, series, releases, adaptations, and current production work |
| Library | Search and browse source material, references, masters, candidates, renditions, templates, and collections |
| Reviews | Personal and team queues for continuity, rights, client, creative, channel, commerce, and runtime decisions |
| Release Calendar | Planned and completed releases across social, owned media, Commerce Foundry, and runtimes |
| Insights | Story engagement, production efficiency, commerce observations, experiments, and reviewed iteration proposals |
| Integrations | Commerce Foundry, BeKindRewind, providers, editors, storage, channels, webhooks, and API keys |
| Administration | Organizations, workspaces, roles, policies, budgets, retention, audit, billing, and operational health |

### Command Center

The landing view should answer what needs attention rather than display generic analytics:

- Productions waiting on the current user.
- Release blockers grouped by authority: creative, continuity, rights, commerce, channel, or runtime.
- Generation queue, failed work, current budget use, and cost anomalies.
- Upcoming releases and stale source dependencies.
- Recently accepted assets and changed canon.
- Connector health, import/export failures, and reconciliations.
- Performance observations and iteration proposals requiring human disposition.

### Property workspace

Tabs and views:

- **Overview** — premise, promise, active branch, current canon release, health, owners, and active productions.
- **Bible** — world rules, facts, terminology, themes, safety boundaries, and structured source citations.
- **People and organizations** — characters, narrators, factions, relationships, voice, knowledge, appearance, and reference packs.
- **Places and world map** — locations, spatial relationships, era and condition variants, lighting, signage, and sound intent.
- **Objects, products, and artifacts** — props, products, collectibles, evidence, symbols, ownership, condition, and placements.
- **Timeline** — fictional chronology, state transitions, ages, events, reveals, and production anchors.
- **Truth and reveals** — creator truth, audience knowledge, character belief, dependencies, spoiler scopes, promises, and payoffs.
- **Style and voice** — visual references, palette, composition, typography, camera language, diction, prohibited traits, and provider attachments.
- **Rights and safety** — ownership, license, consent, sensitive sources, privacy, prohibited reuse, disclosure, and expiry.
- **Productions** — all works derived from the property and their pinned canon versions.
- **Assets** — references, masters, candidates, renditions, published instances, and runtime derivatives.
- **Insights** — performance and production observations scoped to the property.

Important visual tools include a relationship graph, fictional timeline, spatial map, audience-knowledge matrix, canon-change history, entity reference-sheet builder, and state inspector for any scene or point in story time.

### Production workspace

| View | Principal functions |
|---|---|
| Brief | Purpose, audience, objectives, format, channels, authority host, budget, constraints, references, and success measures |
| Arc Board | Episodes, chapters, missions, reveals, product placements, emotional beats, dependencies, and planned release order |
| Calendar | Narrative cadence and target releases without redefining story chronology |
| Scripts and Scenes | Narrative purpose, entering/exiting state, setting, cast, dialogue/copy, and relevant canon |
| Storyboard | Shots, panels, interactions, duration, camera, composition, and sequence preview |
| Generation Workbench | Compiled recipe, references, locks, provider selection, queue, candidates, comparison, annotations, revision, and cost |
| Continuity Console | Findings by sequence and severity, evidence, suggested correction, waiver, intentional exception, or canon-change proposal |
| Review Room | Focused sequence preview, exact-version differences, image-region/video-timecode comments, typed decisions, and approval consequences |
| Release Builder | Channel rendition matrix, accessibility, disclosures, rights readiness, device preview, export, connected submission, and receipt |
| Results | Narrative, production, channel, commerce, and experiment observations plus reviewed proposals |

## 6.2 Core Studio workflows

### Create or migrate a property

1. Select a property type and an optional template.
2. Import source material verbatim into a restricted source inbox.
3. Record ownership, date, sensitivity, and permitted uses.
4. Extract proposed entities, facts, relationships, chronology, style, voice, and rights.
5. Review a source-to-canon mapping and conflicts.
6. Accept, revise, restrict, branch, or reject each proposal.
7. Publish the first canon release.
8. Create reference packs and a reusable production template.

Source documents never become accepted canon merely because an extraction model produced structured fields.

### Plan and produce a narrative release

1. Create a production and pin a canon release.
2. Write or generate the brief, arc, and release structure.
3. Review reveals, dependencies, placement fit, pacing, and rights.
4. Construct scenes with entering and exiting state.
5. Define shots, panels, or interactions and lock invariants.
6. Compile a generation recipe and cost preview.
7. Generate or import candidates.
8. Run technical, continuity, rights, policy, and target-format checks.
9. Compare candidates in sequence; accept, revise, reject, or check out to an editor.
10. Obtain creative and rights approval on exact versions.
11. Build channel or runtime packages.
12. Submit to the authority host, export manually, or publish where Storyworld holds explicit authority.
13. Record receipts and ingest normalized observations.
14. Review iteration proposals without automatically changing canon.

### Targeted revision

1. Select the finding or annotation.
2. Identify affected components and locked invariants.
3. Preview which approvals, renditions, packages, and releases would be invalidated.
4. Generate, edit, or import a replacement candidate for the smallest useful region or shot.
5. Re-run affected checks only.
6. Compare the candidate to the accepted sequence.
7. Accept as a new version or reject without losing prior evidence.

The default should be focused correction, not wholesale rerendering.

### Canon change

1. A person or model proposes a fact, rule, relationship, state, style, or retcon.
2. The Engine computes contradictions and affected productions, assets, packages, and releases.
3. An authorized reviewer sees evidence and migration consequences.
4. The proposal is accepted, revised, branched, or rejected.
5. Acceptance creates a new immutable canon release.
6. Existing productions stay pinned to their previous release.
7. Upgrading a production produces an explicit migration report and revalidation work.

### Review and approval

1. A review case binds to exact artifact, copy, source, policy, and reference versions.
2. Required reviewers see only the context needed for their role.
3. Decisions are approve, reject, request typed revision, waive with reason, or escalate.
4. A decision creates an immutable receipt.
5. Material changes invalidate only affected approval layers.
6. The receiving authority performs its own final acceptance; a Storyworld receipt is evidence, not delegated authority.

## 6.3 Roles and permissions

Suggested roles:

- Workspace Owner
- Administrator
- Property Owner
- Creative Director
- Showrunner / Narrative Designer
- Writer
- Visual Producer / Artist
- Editor
- Continuity Reviewer
- Rights Manager
- Commerce Reviewer
- Publisher
- Analyst
- Guest Approver
- Integration Service

RBAC should be combined with resource attributes: tenant, workspace, property, project classification, spoiler scope, rights scope, channel, geography, cost ceiling, and action. A role template grants a starting policy; it does not bypass project-specific restrictions.

## 6.4 Lifecycle states

### Canon and plans

`Draft → Proposed → Under Review → Accepted → Released → Superseded / Deprecated`

### Media artifacts

`Source / Imported → Staging → Candidate → Under Review → Accepted Master → Rendition → Submitted → Published / Runtime Released → Superseded / Withdrawn / Archived`

### Reviews

`Open → In Review → Revision Requested / Approved / Rejected / Waived → Superseded`

### Connected commerce work

`Brief Received → Story Plan Proposed → Creative Production → Creative Approved → Submitted to CF → Commercial Revision Requested / Commercial Approved → Publication Authorized → Published → Measured → Superseded`

No state transition should be inferred from a file being downloaded, a provider job completing, or a comment saying “looks good.”

## 6.5 Collaboration

Mature Studio collaboration includes:

- Comments, mentions, assignments, due conditions, and notification preferences.
- Image-region, document-range, and video-timecode annotations.
- Version compare for canon, scenes, copy, assets, and packages.
- Change proposals and branch/merge for significant creative exploration.
- Guest review links and client-facing rooms.
- Approval delegation and expiry.
- Presence and edit locking only where concurrent edits risk conflict.
- Checklists, templates, handoff packages, and activity feeds.
- External-editor checkout and governed re-import.
- A clear distinction among comments, proposed changes, accepted canon, review decisions, and approvals.

Mobile supports review, annotation, approval, release status, alerts, and basic analytics. Full world building and media authoring remain desktop-oriented.

## 6.6 UX principles

- Use creative language in the interface while preserving formal structure underneath.
- Make accepted canon, drafts, candidates, approved masters, renditions, and published instances visually unmistakable.
- Show AI work as a proposal, preview, or diff.
- Allow every result to answer: “Which facts, assets, models, workflows, and decisions produced this?”
- Progressively disclose complexity.
- Keep locked constraints visible during generation and revision.
- Make changes reversible or versioned.
- Keep channel requirements out of canonical narrative structure.
- Give Commerce Foundry users a native-feeling entry without duplicating the Studio editor or authority.

# 7. Property and production templates

Templates configure vocabulary, default hierarchy, required fields, views, rules, rubrics, and exports. They do not fork storage or create separate engines.

## 7.1 Serialized social mystery

Derived from Stillhouse Archive:

- Season mystery and hidden truth.
- Public, private-team, and creator-only knowledge.
- Reveal dependency graph and earliest permitted reveal.
- Evidence artifacts and source-like media types.
- Symbol dictionary and motif cadence.
- Atmosphere, clue, puzzle, and answer ratio.
- Audience participation and spoiler-aware response guidance.
- ARG boundaries, safety checks, and no-real-world-harm rules.
- Thirty- to ninety-post planning with carousel, caption, sound, motion, and reveal cadence.

## 7.2 Illustrated editorial carousel

Derived from Notes to My Daughter and Living Inheritance:

- Thesis or lesson.
- Emotional progression.
- Recurring narrator or character.
- Evolving visual metaphor.
- Eight- to ten-panel structure.
- Caption, footer, and attribution patterns.
- Dignity, consent, privacy, fictionalization, and prohibited-identifier checklist.
- Original-photo and source rights.
- Carousel-to-Reel voiceover and owned-media adaptation.

## 7.3 Illustrated field manual

Derived from Proper Manhood / Sons’ Field Manual:

- Lesson taxonomy.
- Scenario, principle, exercise, and takeaway.
- Fixed design tokens, rugged illustration system, and recurring motifs.
- Series numbering and cross-reference.
- Carousel, voiceover, print, book, and workbook derivatives.

## 7.4 Collectible character cards

Derived from Dumpster Fire Friends:

- Card number and stable layout grid.
- Character taxonomy, stats, recurring traits, and relationships.
- Scenario, behavior, impact, response, recovery, and lesson.
- Humor and tone constraints.
- Merchandising, print, and collection derivatives.

## 7.5 Recurring short-form comedy

Derived from the recurring dog/delivery-driver concept:

- Locked cast, fixed setting, and approved recurring props.
- Object-state transitions across shots.
- Setup, escalation, reversal, and payoff.
- Shot list, clip duration, camera, ambient sound, voice, and caption layers.
- Continuity-aware assembly and focused reshoots.
- Trademark, uniform, packaging, and implied-affiliation review.

## 7.6 Branded narrative campaign

For Commerce Foundry:

- Objective, audience, offer context, budget, and success metrics.
- Immutable product, collection, claim, image, policy, and disclosure snapshots.
- Narrative role and placement rationale per product.
- Three-episode or multi-release arc.
- Channel plan and rendition matrix.
- Creative, rights, commercial, and publication gates.
- Engagement and conversion correlation IDs.

## 7.7 Interactive memory world

Derived from BeKindRewind:

- World map, locations, spatial relationships, and era rules.
- Characters, NPC roles, dialogue constraints, and relationship state.
- Missions, prerequisites, outcomes, items, collectibles, and state effects.
- Trigger specifications and accessibility/localization strings.
- Sound-zone intent and reference assets.
- Runtime budgets and target capability declarations.
- Immutable content releases and runtime receipts.

## 7.8 Adaptive content experiment

Conditional and later:

- Explicit hypothesis.
- Audience segment with consented, minimized attributes.
- Canon-invariant and variable fields.
- Approved variation ranges.
- Experiment allocation and stopping criteria.
- Source-specific uncertainty.
- Human review before a winning variant becomes a new default.

Individualized psychologically targeted stories are out of scope without a separate ethical, legal, privacy, and consent review.

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

# 15. Identity, security, rights, and governance

## 15.1 Identity and authorization

Use federated OIDC/SSO with independent authorization in each product. Storyworld trusts identity assertions but evaluates its own permissions. Service-to-service calls use OAuth or mutually authenticated credentials and narrow scopes.

Required controls:

- Tenant and workspace membership.
- PostgreSQL row-level security as defense in depth.
- Resource classification: public, internal, confidential, restricted, embargoed.
- RBAC plus resource and action attributes.
- MFA for privileged roles.
- Service principals with rotation and revocation.
- Time-limited guest access.
- Separate connector credentials per channel and authority host.

## 15.2 Capability-based agent execution

An agent or tool receives a revocable lease scoped to:

- Exact tenant, workspace, project, assets, and versions.
- Permitted commands and staging destinations.
- Provider, model, workflow, and external destinations.
- Cost and token/media budget.
- Expiration and maximum attempts.
- Required evidence and review gates.

Agents can write only to proposal or staging commands. They cannot accept canon, approve rights, waive a blocker, authorize publication, or modify another authority system.

## 15.3 Rights and consent

Track:

- Ownership and licensor.
- Territory, channels, duration, and purpose.
- Editorial versus commercial use.
- Modification and derivative permission.
- Model training and provider retention terms.
- Likeness, voice, music, font, photograph, trademark, location, and property consent.
- Required attribution and synthetic-media disclosure.
- Expiry, revocation, replacement, and affected releases.

Rights checks are evidence and workflow controls, not legal guarantees. The receiving authority may require its own counsel or policy review.

## 15.4 Privacy and sensitive-source handling

For editorial work inspired by real people or family experience:

- Preserve private source material separately from public canon.
- Restrict source notes by default.
- Require explicit fictionalization or generalization review.
- Record consent state and prohibited identifiers.
- Provide dignity and foreseeable-harm prompts.
- Block automatic reuse across properties.
- Exclude sensitive source text from providers unless policy explicitly allows it.

The product should support universal lessons without turning another person’s private situation into a commercial concept.

## 15.5 Content and infrastructure security

- Per-tenant object namespaces and encryption at rest and in transit.
- Vaulted provider and connector secrets.
- Signed packages and verified webhooks.
- Upload quarantine, MIME validation, malware scanning, decompression limits, and safe media parsing.
- Egress allowlists, SSRF protection, and sandboxed workflows.
- Imported content treated as untrusted data; prompt-injection instructions inside documents are not executed.
- Allowlisted ComfyUI nodes and pinned workflow/container hashes.
- Default prohibition on provider training with customer assets unless deliberately permitted.
- Immutable audit evidence, versioned backups, point-in-time recovery, restore drills, and object-version recovery.
- No raw Commerce Foundry customer-level data or BeKindRewind player identities in Storyworld analytics.

## 15.6 Approval layers

1. Canon approval.
2. Creative plan approval.
3. Asset creative approval.
4. Continuity disposition.
5. Rights clearance.
6. Channel-package approval.
7. Commerce-specific approval, if applicable.
8. Publication authorization or runtime release acceptance.

Every receipt binds to exact hashes and versions. Modification invalidates only the affected layers. Rejection never deletes evidence. An agent cannot approve its own or anyone else’s work.

# 16. Operations, reliability, and administration

## 16.1 Operational requirements

- Structured logs, distributed traces, and business metrics with end-to-end correlation.
- Queue, workflow, provider, connector, and package health dashboards.
- Cost by tenant, property, production, provider, workflow, and accepted output.
- Retry, cancellation, timeout, circuit breaker, dead-letter, and reconciliation tools.
- Feature flags and staged migrations.
- Backup, restore, export, deletion, retention, and legal-hold procedures.
- Provider-outage, queue-backlog, corrupted-upload, partial-export, signature-failure, and channel-failure runbooks.
- Usage quotas, rate limits, budget ceilings, and abuse controls.
- Support and administrative console with privacy-preserving impersonation controls or evidence packs rather than unrestricted data access.

## 16.2 Observability metrics

- Cost per accepted asset, panel, episode, or approved minute.
- Generation request, failure, cancellation, retry, and fallback rates.
- Provider latency and queue delay.
- Continuity, product-fidelity, rights, and policy pass or finding rates.
- First-pass acceptance and average focused revisions.
- Approval latency and blocked-release age.
- Asset and reference-pack reuse.
- Package delivery, import, signature, and reconciliation failures.
- Publication and runtime-release success.
- Tenant-isolation or permission-denial anomalies.
- Story, commerce, and production outcome metrics.

## 16.3 Reliability targets to define before production pilot

Exact service-level objectives should follow measured pilot behavior, but production promotion requires:

- No lost accepted assets or approvals under process restart.
- Idempotent retries and imports.
- Demonstrated database and object restore.
- Rollback of application and schema migrations without losing accepted work.
- Provider outage that preserves job and review state.
- Traceability from a failed rendition to its campaign, workflow, inputs, provider call, and current recovery action.
- Cost ceilings that stop runaway generation.
- Portable export even during noncritical connector outages.

## 16.4 Mature administration

- Organization, workspace, team, guest, and service-principal management.
- Role templates and custom policy packs.
- Provider credentials, routing, allowlists, regional restrictions, and budgets.
- Channel and Commerce Foundry connections.
- Storyworld templates, vocabularies, taxonomies, and style-policy administration.
- Rights, retention, deletion, and disclosure policy.
- API keys, webhooks, signing keys, and package verification.
- Usage, entitlements, billing, and internal cost allocation.
- Queue, workflow, connector, and provider health.
- Audit search and export.
- Data import, export, backup, deletion, and transfer.
- Localization configuration.
- Feature flags and staged rollout.

# 17. Quality, evaluation, and acceptance

## 17.1 Golden corpus

Create representative, rights-safe fixtures:

| Fixture | What it tests |
|---|---|
| Stillhouse Archive mini-season | Reveal dependencies, symbol continuity, chronology, creator truth versus audience knowledge, spoiler safety |
| Editorial carousel | Voice, recurring metaphor, privacy, dignity, source separation, carousel structure |
| Field Manual lesson | Template reuse, motif consistency, structured lesson and cross-format derivative |
| Dumpster Fire Friends cards | Stable recurring character schemas and numbered visual layouts |
| Recurring dog short | Multi-shot identity, fixed environment, prop movement and object-state transitions |
| BeKindRewind world slice | Locations, era rules, NPCs, mission dependencies, collectibles, dialogue, runtime export |
| Commerce Foundry campaign | Pinned products and claims, placement fit, fidelity, exact-version review, commercial rejection/revision, metrics return |

These are test fixtures, not automatically commercializable inventory. Source ownership, sensitivity, and permitted use must be recorded.

## 17.2 Test layers

- Domain invariant and state-machine unit tests.
- Persistence, migration, transaction, RLS, and object-store integration tests.
- OpenAPI, event, webhook, package, and consumer contract tests.
- Deterministic export/import and signature verification.
- Temporal workflow replay, retry, cancellation, and failure injection.
- Provider adapter contract tests with mocks and capped live canaries.
- Playwright end-to-end workflows and accessibility tests.
- Visual regression for Studio and deterministic rendition templates.
- Security tests for tenant isolation, permission escalation, webhooks, upload parsing, SSRF, prompt injection, and secret handling.
- Restore, rollback, provider-outage, partial-delivery, and duplicate-event drills.
- Human evaluation rubrics for narrative coherence, voice, visual continuity, placement naturalness, review usefulness, and willingness to reuse.

## 17.3 Initial production gates

Establish baselines before claiming permanent quality thresholds. The first production promotion should nevertheless require:

- 100% lineage completeness for accepted assets.
- Zero paths from an unapproved candidate to commercial publication.
- Zero silent accepted-canon mutations.
- Deterministic package verification and round trip.
- No unresolved critical rights or policy blocker.
- At least 80% of representative still panels accepted after no more than one focused revision.
- At least 50% reduction in production coordination time compared with the same pilot using generic disconnected tools.
- Median human review of at least 4/5 for narrative coherence, visual continuity, and product-placement fit.

Generated-media percentages are provisional pilot gates, not promises. If they are unrealistic, the remedy is to narrow the supported workflow or improve reference/control tooling—not to hide defects.

## 17.4 Completion standard for mature applications

Storyworld Engine and Studio are mature when they can:

1. Maintain an authoritative, versioned property across multiple productions and formats.
2. Preserve temporal, narrative, visual, object, product, rights, and approval continuity.
3. Produce and revise coherent multi-asset sequences through replaceable providers and external editors.
4. Support exact-version human decisions and reversible change.
5. Export or publish target-specific derivatives without redefining canonical work.
6. Compile interactive narrative content for BeKindRewind without absorbing the runtime.
7. Complete a governed product-story campaign with Commerce Foundry without duplicating commerce authority.
8. Return performance observations without allowing them to rewrite canon automatically.
9. Support multiple teams and clients with secure isolation, operational recovery, and portable data.
10. Demonstrate that the same core meaningfully serves fiction, editorial, interactive, and commerce use cases without genre-specific forks.

# 18. Smallest useful MVP

## 18.1 MVP objective

Prove that pinned canon, continuity-aware production, focused revision, governed approval, and portable delivery create materially more value than a collection of prompts and folders.

## 18.2 Include

- Single-organization deployment with workspace roles.
- Property, source inbox, accepted canon release, character, location, object, style, and rights records.
- Flexible production → episode → scene → panel hierarchy.
- Scene state packet and reference pack.
- One text provider and one still-image provider or local ComfyUI workflow.
- Durable generation queue with cost ceiling, provenance, candidates, and retry.
- Manual asset import and InvokeAI-style checkout/import contract.
- Candidate grid, focused panel revision, exact-version acceptance, and immutable history.
- Deterministic continuity checks plus a limited narrative and visual review.
- Simple Review Room.
- Instagram carousel rendition and manual export.
- `NarrativeCampaignBrief` fixture import and `NarrativeAssetBundle` export.
- Basic BeKindRewind world/mission manifest export.
- Package verification, audit, telemetry, and golden fixtures.

## 18.3 Postpone

- General public sign-up, billing, agency portals, and enterprise deployment.
- Broad video and audio generation.
- Direct Instagram or other social publication.
- Multiple live media providers and automatic quality-based routing.
- Fine-grained branching, real-time collaborative editing, and complex merge.
- Advanced personalization and automatic experimentation.
- Full game-editor functionality, runtime rendering, player state, and multiplayer.
- Every proposed channel adapter.
- Microservices, Kafka/NATS, and a separate vector database.

## 18.4 MVP proof scenarios

1. **Serialized still-media property:** produce three connected episodes with a recurring character, setting, visual style, object state, and focused panel regeneration.
2. **Commerce campaign:** import a pinned product brief, create a three-episode product story, submit a bundle, receive one typed rejection, revise the exact item, and pass commercial fixture validation.
3. **BeKindRewind slice:** define several locations, recurring NPCs, objects, one mission chain, and promotional media; compile and validate a runtime manifest.

The MVP passes only if the same core supports all three without a commerce-only or game-runtime fork.

## 18.5 Cheapest pre-build validation

Before substantial media automation:

1. Use Storyworld schemas and a concierge workflow to manually run two internal properties and one real or simulated Commerce Foundry campaign.
2. Build clickable Studio workflow prototypes for the World Bible, Arc Board, Scene Builder, Generation Workbench, Review Room, and CF submission.
3. Test with five to ten visually led DTC brands or boutique agencies using their approved products and existing generation/editing tools behind the scenes.
4. Charge for the outcome, not access to unfinished software.
5. Measure brief-to-approval time, revision count, continuity defects, asset reuse, repeat intent, and willingness to pay.
6. Interview independent serialized creators and interactive developers to verify that canon and continuity—not generic generation—are the differentiating reason.

If customers only value image generation or scheduling, use existing tools and narrow Storyworld to an internal capability.

# 19. Dependency-based phased roadmap

This is not a calendar. A phase begins only when its entry dependencies are satisfied and completes only when its evidence gate passes. Parallel branches reduce elapsed effort without weakening authority boundaries.

![Dependency-based roadmap](assets/storyworld_roadmap.png)

*Figure 2. Foundation phases are sequential. Media, Studio, integration, and evaluation then advance in parallel and converge at a dual-use proof. Commercialization and service extraction are conditional outcomes, not scheduled assumptions.*

## 19.1 F0 — Product charter and authority

**Depends on:** nothing.

**Purpose:** eliminate ambiguous ownership before building data or workflows.

**Deliverables:**

- Canonical product definition, use cases, vocabulary, and explicit non-goals.
- System context and authority matrix.
- Property classifications and project authority-host rule.
- Privacy, source-sensitivity, rights, and risk classifications.
- Approval taxonomy.
- Architecture decision records covering deployment boundary, identity, assets, approvals, publication, runtime state, analytics, and portability.
- Named golden fixtures and validation metrics.

**Exit gate:**

- Every important entity and decision has exactly one authoritative owner.
- Creative approval cannot be interpreted as commercial publication approval.
- Commerce Foundry, Storyworld, BeKindRewind, Octon, media tools, and connectors have unambiguous responsibilities.
- The first vertical slices and stop conditions are accepted.

## 19.2 F1 — Domain model and contracts

**Depends on:** F0.

**Purpose:** prove the model before binding it to UI or providers.

**Deliverables:**

- Versioned schemas for workspace, property, source material, canon branch/release, entity, relationship, timeline, state, style, voice, production, narrative unit, scene, beat, reveal, mission, product snapshot, placement, media recipe, asset, rendition, review, rights evidence, package, observation, and proposal.
- Lifecycle state machines and command invariants.
- OpenAPI application contract.
- Event and package catalogs.
- Commerce Foundry and runtime adapter interfaces.
- Contract fixtures for Stillhouse, editorial carousel, BeKindRewind, and a product campaign.

**Exit gate:**

- All representative fixtures can be modeled without mandatory commerce fields in generic canon or runtime execution fields in Storyworld.
- Contracts round-trip deterministically and pass compatibility tests.
- Narrative hierarchy is flexible without becoming untyped.
- Revision time and fictional story time are explicit.

## 19.3 F2 — Governed foundation

**Depends on:** F1.

**Purpose:** establish trustworthy custody before generation.

**Deliverables:**

- Repository, CI, local deployment, environments, feature flags, and migration framework.
- PostgreSQL persistence with tenant isolation.
- Immutable revisions, content-addressed object storage, asset lineage, and provenance.
- Rights, consent, sensitivity, and policy hooks.
- Identity, workspace roles, service principals, and capability boundaries.
- Audit receipts, correlation/causation IDs, transactional outbox/inbox, and idempotency.
- Deterministic signed project package export/import.
- Baseline telemetry, backup, and restore.

**Exit gate:**

- Exporting, deleting a local copy, and re-importing an accepted fixture preserves identifiers, hashes, lineage, rights, and approvals.
- Failed jobs cannot partially mutate canon.
- Command and event replay creates no duplicates.
- Every accepted asset traces to source material and transformations.
- A restore drill succeeds.

## 19.4 F3 — Headless narrative kernel

**Depends on:** F2.

**Purpose:** make the core useful through API and CLI before the full Studio.

**Deliverables:**

- Source ingestion and source-to-canon proposal workflow.
- Canon releases, entities, relationships, timeline, state, style, and reference packs.
- Production, narrative units, scenes, beats, reveals, missions, and placements.
- Scene state-packet compilation.
- Manual asset import, review, acceptance, supersession, and release-package export.
- Canon change impact report.
- Initial policy and approval commands.

**Exit gate:**

- A user can manually author and approve a complete three-episode project through public contracts without direct database edits.
- Imported or generated proposals never silently change accepted canon.
- A canon change identifies affected productions and keeps existing work pinned.
- The CLI and API can complete a portable project round trip.

## 19.5 B1 — Media orchestration and continuity pipeline

**Depends on:** F3.

**Can run in parallel with:** B2, B3, and the continuing B4 harness.

**Deliverables:**

- Temporal generation workflows with cancellation, retry, budget, priority, and resume.
- Replaceable text and still-image adapters first; interfaces for video and audio.
- Prompt/specification compiler using pinned canon and scene state.
- Reference packs, provider attachments, staging/quarantine, hashing, normalization, and lineage.
- Deterministic, narrative, visual, product-fidelity, rights, and format evaluation framework.
- Focused regeneration and external-editor round trip.
- Provider cost, latency, quality, fallback, and failure telemetry.

**Exit gate:**

- One provider can be replaced without changing canonical data.
- Failed, canceled, or retried work cannot corrupt accepted state.
- Every candidate records complete inputs, references, provider, model, workflow, parameters, cost, and derivation.
- Locked continuity attributes reach every recipe.
- A human can revise one panel without regenerating the episode.

## 19.6 B2 — Storyworld Studio workbench

**Depends on:** F3.

**Can run in parallel with:** B1, B3, and B4.

**Deliverables, in dependency order:**

1. Authentication, Command Center, property creation, and source inbox.
2. World Bible, entity libraries, timeline, style, voice, rights, and canon releases.
3. Arc Board, scene/beat builder, state inspector, and storyboard.
4. Generation queue, candidate compare, annotation, focused revision, and cost preview.
5. Continuity Console, Review Room, exact-version acceptance, and version diffs.
6. Release Builder, packages, integrations, and status.
7. Later within maturity: collaboration, analytics, administration, billing, and guided onboarding.

**Exit gate:**

- Every normal F3 and B1 task can be completed without CLI or database access.
- Users can always distinguish accepted canon, drafts, candidates, masters, renditions, and published/runtime instances.
- Revision reason and reviewer are preserved.
- Destructive changes are versioned or reversible.
- Core workflows pass accessibility and representative usability tests.

## 19.7 B3 — Integration substrate and portable packages

**Depends on:** F3.

**Can run in parallel with:** B1, B2, and B4.

**Deliverables:**

- Commerce Foundry connector SDK.
- Versioned `NarrativeCampaignBrief` and `NarrativeAssetBundle`.
- Signed approval and package receipts.
- Webhooks/events with outbox/inbox delivery and reconciliation.
- Connected and portable package import/export.
- Source-drift detection.
- SSO and service-identity interface.
- Runtime compiler interface.
- Instagram rendition/export interface.
- Integration health and replay tools.

**Exit gate:**

- Connected and portable exchange produce equivalent semantics.
- No connector accesses another product’s database.
- Duplicate delivery is harmless.
- Receiving systems treat imported packages as unapproved until they act.
- A rejected exact version can be revised and returned with lineage intact.
- Storyworld and Commerce Foundry CI run the same contract fixtures.

## 19.8 B4 — Evaluation and regression harness

**Depends on:** F1 and evolves throughout all later phases.

**Deliverables:**

- Golden fixtures and deterministic package snapshots.
- Domain, state-machine, contract, migration, permissions, and security suites.
- Provider adapter and workflow fixtures.
- Human evaluation rubrics and blinded comparison process.
- Cost, latency, failure, quality, and workflow-productivity baselines.
- Continuity defect injection for character, object, chronology, reveal, product, rights, and approval failures.

**Exit gate before V1:**

- Lineage and authority invariants are automated.
- The harness detects intentional continuity, claim, rights, source-drift, and permission defects.
- Baselines exist for time, cost, revisions, acceptance, and human quality.
- Restore, replay, duplicate delivery, and provider outage behavior are tested.

## 19.9 V1 — Dual-use architectural alpha

**Depends on:** B1, B2, B3, and B4.

**Purpose:** prove that the proposed boundary is real rather than aspirational.

**Vertical slice A — BeKindRewind:**

- Several connected locations.
- Recurring characters/NPCs and reference packs.
- Objects and collectibles.
- One mission chain with dependencies and state effects.
- Runtime manifest and promotional-media derivative.

**Vertical slice B — Commerce Foundry:**

- Pinned product and claim fixture.
- Three-episode product story.
- Placement contracts and naturalness review.
- Exact-version asset bundle and commercial validation.

**Exit gate:**

- Both are authored in the same Studio and use the same canon, asset, generation, review, provenance, and package infrastructure.
- Neither requires a fork of the core model.
- Commerce concepts remain optional extensions.
- Game and player state remain outside Storyworld.
- A second editorial or fictional property imports without schema changes.
- Operators complete both workflows through Studio.

**Stop or branch:**

- If the shared model becomes a lowest-common-denominator abstraction, stop generalizing; preserve narrower products and share only proven low-level packages.
- If value is mostly generic image/caption generation, stop the distinct Storyworld product and use existing tools.
- If commerce is the only successful use, keep the API boundary but package Storyworld as a Commerce Foundry-adjacent internal capability.
- If commerce and non-commerce slices work, continue to C1 and C2.

## 19.10 C1 — Production-grade Commerce Foundry integration

**Depends on:** V1 and stable corresponding Commerce Foundry contracts.

**Deliverables:**

- Native Commerce Foundry Narrative Campaigns surface.
- Shared SSO, contextual links, status, notifications, and focused review component.
- Production campaign briefs, asset bundles, typed findings, receipts, and drift handling.
- Exact-version commercial approval and publication authority.
- Reconciliation and audit view across both systems.
- Normalized commerce observations and correlation to placements and narrative units.

**Exit gate:**

The full rejection/revision flow in Section 11.7 succeeds with real campaign data and:

- No invented or mutated product facts.
- No stale snapshot ambiguity.
- No Storyworld bypass of Commerce Foundry authority.
- Idempotent replay.
- Complete evidence reconstruction.
- Measurable reduction in production coordination and approval churn.

## 19.11 C2 — Owned media, runtime, and channel expansion

**Depends on:** V1; may run in parallel with C1.

**Unlock adapters in evidence-based order:**

1. Instagram carousel export.
2. Instagram Story and Reel production plans.
3. Short-form video only after still continuity, cost, and revision gates pass.
4. Web and email packages.
5. TikTok, Pinterest, YouTube Shorts, and Facebook as customer evidence warrants.
6. BeKindRewind runtime exporter and derivative promotional workflow.
7. Optional direct publication adapters for non-Commerce Foundry projects.

**Exit gate:**

- One accepted episode produces at least three renditions without duplicating canon or source assets.
- Platform-rule changes do not require narrative-domain migrations.
- BeKindRewind consumes structured content without treating Storyworld as its runtime.
- Video is promoted only if quality, continuity, unit cost, and revision burden meet a written gate.
- Portable export remains functional.

## 19.12 O1 — Operational, security, and tenant maturity

**Depends on:** V1 for full proof; foundational work begins in F2.

**Deliverables:**

- OIDC/SSO, mature roles, tenant isolation, service identities, secret management.
- Budgets, quotas, rate limits, abuse controls, and entitlements.
- Complete telemetry, workflow dashboards, cost allocation, and audit export.
- Backup, restore, rollback, deletion, retention, transfer, and incident procedures.
- Threat model, security review, vulnerability management, and provider review.
- Local and hosted deployment profiles.
- Support/admin console and product operations.
- Billing hooks without forcing public billing before demand.

**Exit gate:**

- Tenant-isolation and escalation tests pass.
- Restore and rollback are demonstrated.
- Provider-outage drills preserve job and decision state.
- Users can export and delete their complete project.
- Cost ceilings work.
- Operations can trace and recover a failed asset.
- A defined pilot SLO is met under controlled use.

## 19.13 A1 — Performance-informed iteration

**Depends on:** C1 or C2, O1, sufficient consented observations, and demonstrated user need.

**Deliverables:**

- Normalized story, channel, commerce, and production observations.
- Narrative-level attribution.
- Hypothesis, experiment, allocation, variant, and result records.
- Explainable, constrained iteration proposals.
- Canon protection, privacy controls, and opt-out.

**Exit gate:**

- Recommendations never change accepted canon or publish automatically.
- Editorial and fiction teams can disable commercial optimization.
- Uncertainty and data sufficiency are visible.
- Every recommendation traces to observations and constraints.
- Controlled pilots show benefit without unacceptable voice, continuity, privacy, or cost degradation.

## 19.14 S1 — Standalone commercial Studio

**Depends on:** O1 plus actual market evidence.

**Add only after the commercial gate:**

- Self-service organization, property, and team onboarding.
- Guided world/brand bible setup and reusable templates.
- Hosted billing, entitlements, metering, and overages.
- Agency client workspaces and guest approvals.
- Documentation, developer portal, API keys, integration gallery, and support operations.
- BYO-provider or local-generation gateway where supportable.
- Product analytics and acquisition instrumentation.

**Commercial entry gate:**

Most should be true:

- At least 20 external teams complete real productions.
- At least 10 repeatedly pay.
- At least half create a second production within roughly one operating cycle after the first.
- At least 40% of qualified usage originates outside Commerce Foundry.
- Two non-commerce segments use the same Engine without major custom forks.
- Buyers will pay above generic social-generation pricing.
- Generation-adjusted margin and support burden are viable.
- A repeatable acquisition path exists.

If the gate fails, keep Storyworld as a Stavium internal platform and Commerce Foundry integration. Architectural independence remains useful even without a separate SaaS business.

## 19.15 X1 — Conditional extraction

**Depends on:** measured operational evidence; it is not a committed feature phase.

Likely future extraction candidates are:

- Media-generation workers.
- Media transformation and rendition.
- Channel publishing connectors.
- Analytics ingestion.

Canon and continuity should remain together until a compelling domain or team boundary appears.

# 20. Critical vertical slices and dependency matrix

| Slice | Dependencies | Proof required |
|---|---|---|
| VS0 — Portable project round trip | F0–F3 | Create, accept, export, remove local copy, re-import, and reproduce versions, hashes, lineage, rights, and receipts |
| VS1 — Serialized still-media property | B1, B2, B4 | Three episodes with recurring identity/style/object continuity and focused panel regeneration |
| VS2 — Commerce campaign | B1–B4, C1 | Full brief-to-publication flow including rejection, focused revision, source drift, and observations |
| VS3 — BeKindRewind runtime slice | B1–B4, C2 | Locations, characters, objects, mission dependencies, runtime package, and promotional derivatives |
| VS4 — Cross-channel derivation | C2 | Carousel, Story/Reel plan, and web/email package from one accepted episode and one lineage tree |
| VS5 — Governed learning loop | A1 | Scoped observations become a reviewable variation proposal without changing canon |
| VS6 — Paying external team | O1, S1 | A new team onboards, pays, produces, approves, exports, returns, and can export/delete its data |

## 20.1 Workstream dependencies for a small AI-assisted team

| Workstream | Starts after | Primary responsibility |
|---|---|---|
| Product and authority | Immediately | Decisions, vocabulary, boundaries, acceptance, and stop conditions |
| Domain and contracts | F0 | Schemas, state machines, API/events, packages, compatibility |
| Storage and governance | F1 | Revisions, assets, provenance, rights, policy, receipts, portability |
| Narrative intelligence | F2 | Planning, state, continuity, context compilation, validation |
| Media execution | F3 | Providers, Temporal, ComfyUI, render runner, transformation, cost and failure |
| Studio UX | F3 | Authoring, review, versioning, continuity, release, accessibility |
| Integrations | F2 | Commerce Foundry, packages, events, BeKindRewind, channel adapters |
| Evaluation | F1 | Golden corpus, automated tests, human rubrics, provider regressions |
| Operations and security | F2 | Identity, isolation, telemetry, recovery, secrets, deployment |
| Commercial validation | V1 | Concierge pilots, pricing, repeat use, acquisition and support evidence |

One person must remain accountable for domain contracts and authority boundaries. AI agents can accelerate adapters, tests, migrations, documentation, evaluation preparation, and UI implementation. Humans approve canon semantics, rights policy, security, and release gates.

## 20.2 Definition of ready

A phase or epic is ready only when:

- Its predecessor gates have passed.
- The owning bounded context and authority are known.
- Contracts and error behavior are drafted.
- Sensitive data and rights implications are classified.
- Success evidence and rollback are defined.
- A representative fixture exists.
- The work does not create a second source of truth.

## 20.3 Definition of done

An epic is done only when:

- Domain invariants and migrations are tested.
- API, events, and packages are versioned and documented.
- Authorization and audit are enforced.
- Failure, retry, cancellation, and rollback behavior are verified.
- Accessibility and observability are present.
- User-facing states distinguish proposal, accepted work, approval, and release.
- A golden fixture exercises the capability.
- Documentation and operational ownership are complete.

# 21. Implementation backlog by product area

This backlog is ordered by dependency within each area. It is not a timeline or commitment to build every item.

## 21.1 Engine foundation epics

1. Repository, coding standards, ADR process, contract generation, CI, local environment, and preview deployment.
2. Organization, workspace, identity, membership, service principal, and project classification.
3. PostgreSQL transaction and migration layer with row-level security.
4. Object storage, content hashing, immutable asset versions, and derivation graph.
5. Command framework, optimistic concurrency, idempotency, audit receipts, and outbox/inbox.
6. Signed package envelope, deterministic export/import, and verification CLI.
7. Telemetry, correlation, feature flags, backup, and restore.

## 21.2 Canon and narrative epics

1. Source inbox, source classification, extraction proposals, and source-to-canon review.
2. Property, branches, canon releases, facts, rules, terminology, and retcons.
3. Entities, relationships, custom fields, reference packs, and visibility.
4. Fictional timeline, knowledge state, entity state, and transitions.
5. Flexible narrative hierarchy and production lifecycle.
6. Arcs, threads, promises, reveals, missions, dialogue, choices, and dependencies.
7. Scene state packets and impact analysis.
8. Property and production templates.

## 21.3 Media and continuity epics

1. Structured generation recipe and provider capability registry.
2. Temporal workflow, budgets, cancellation, retry, and staging.
3. Text adapter, still-image adapter, and local ComfyUI runner.
4. Candidate ingestion, normalization, preview, and cost telemetry.
5. Deterministic technical and structural validators.
6. Temporal, object-state, reveal, voice, visual-reference, and style findings.
7. Product-fidelity, OCR/logo, placement, claim, and disclosure preflight.
8. Targeted revision, masks/regions, sequence compare, and approval impact.
9. InvokeAI/editor checkout and governed import.
10. Video/audio recipe and provider adapters after still-media gates.

## 21.4 Studio epics

1. App shell, Command Center, property create/import, and source inbox.
2. World Bible, entity library, timeline, relationship graph, state inspector.
3. Style/voice/rights workspace and reference-pack builder.
4. Arc Board, calendar, scene builder, beat/shot/panel editor, and storyboard.
5. Generation Workbench, queue, cost preview, candidate grid, compare, annotate, and revise.
6. Continuity Console and canon-change impact.
7. Review Room, guest review, exact-version decision, and approval receipts.
8. Release Builder, target previews, packages, integration status, and receipts.
9. Collaboration, assignments, activity, branch proposals, client workspace.
10. Insights, experiments, administration, usage, and billing.

## 21.5 Commerce Foundry epics

1. Shared glossary, authority ADRs, correlation, and identity handshake.
2. Campaign brief and product/claim snapshot contracts.
3. Storyworld campaign import and status.
4. Placement contract and product-fidelity reference set.
5. Narrative asset bundle and verification.
6. Native Narrative Campaigns surface and contextual Studio handoff.
7. Focused CF review component and typed finding round trip.
8. Source-change/stale-dependency workflow.
9. Commercial approval, publication authorization, and receipt.
10. Commerce observation return and narrative projection.
11. Reconciliation, support evidence, and cross-system audit.

## 21.6 BeKindRewind epics

1. Interactive property vocabulary and runtime target contract.
2. Locations, spatial references, NPCs, items, dialogue, missions, triggers, preconditions, and effects.
3. Runtime package schema, checksums, signatures, and validation.
4. PlayCanvas or selected runtime importer/compiler.
5. Preview deployment and acceptance receipt.
6. Aggregate telemetry and content-error observation.
7. Hotfix reconciliation.
8. Derivative promotional-media workflow from approved world content.

## 21.7 Release and analytics epics

1. Channel-neutral release master.
2. Instagram carousel rendition and manual export.
3. Story/Reel production plan and subtitle/accessibility metadata.
4. Web/email package.
5. Optional publication adapter and secret isolation.
6. Publication receipts and reconciliation.
7. Normalized observation schema and mappings.
8. Narrative-level projection.
9. Hypothesis, experiment, variant, result, and reviewed proposal.

# 22. Validation and commercialization plan

## 22.1 Internal proof sequence

Run the same platform through materially different work:

1. **Stillhouse Archive mini-season** — encode hidden truth, a reveal graph, symbol continuity, and a representative serialized sequence.
2. **Editorial carousel sequence** — preserve a stable voice and recurring metaphor while demonstrating privacy and dignity review.
3. **Commerce Foundry campaign** — produce a pinned three-episode product story with natural placement, rejection/revision, final approval, and performance return.
4. **BeKindRewind world slice** — compile locations, characters, objects, one mission chain, dialogue, sound intent, and runtime metadata.
5. **Recurring short video storyboard** — test object-state transitions and multi-shot continuity before investing in production video.

A common kernel should emerge. Property-specific needs stay in templates or target adapters.

## 22.2 External demand validation

- Conduct problem interviews with visually led DTC brands, boutique agencies, serialized character-IP creators, and interactive developers.
- Offer a paid concierge campaign using the proposed workflow while manual production hides unfinished automation.
- Show exact-version review, continuity reports, focused revision, and portable delivery—not generic AI generation demos.
- Test whether teams will provide approved product data and participate in a structured review.
- Measure second-production intent and actual repeat behavior.
- Test pricing as a base platform fee plus generation.
- Track support burden and margin after provider cost.

## 22.3 Standalone-market decision

Launch public Storyworld Studio only if:

- External users complete real projects, return, and pay.
- A substantial share of use does not depend on Commerce Foundry.
- At least two non-commerce segments use the same core without customization becoming services work.
- Users name canon, continuity, governed review, reuse, or runtime/commerce integration—not “AI images”—as the reason to buy.
- Support, generation cost, and acquisition economics are credible.

If these conditions do not appear, Storyworld remains valuable as:

- A Stavium internal media and storyworld platform.
- Commerce Foundry’s independently bounded narrative capability.
- The content-authoring and release source for BeKindRewind.
- Reusable infrastructure for owned media properties.

# 23. Risks and mitigations

| Risk | Severity | Early signal | Mitigation / decision response |
|---|---|---|---|
| Scope expansion into a universal creative suite | Critical | Each property adds unrelated tools or mandatory fields | Enforce non-goals; templates/extensions; phase gates; one vertical slice at a time |
| Overgeneralized story schema | Critical | Frequent custom forks or unusable generic entities | Test four distinct fixtures before freezing; keep flexible hierarchy but typed core; split only after evidence |
| Duplicate control planes with Commerce Foundry | Critical | Shared tables, dual approvals, competing asset masters | Authority matrix, separate databases, signed bundles, receiving-system approval, cross-system audit |
| Game-runtime leakage | High | Player saves, physics, renderer, or runtime scripts enter Engine tables | Runtime compiler boundary; Storyworld stores authored preconditions/effects, not execution state |
| Continuity capability underperforms expectations | High | High manual correction or identity drift | Expose confidence; improve reference packs and targeted edits; narrow supported formats; never promise perfect automation |
| Generic tools erase differentiation | High | Users mainly value captions or images | Validate paid need for canon/continuity/review; stop or narrow if generic generation dominates |
| Provider and model dependency | High | Quality or rights change breaks workflows | Provider-neutral recipes, adapters, portable sources, evaluation harness, explicit fallback policy |
| Social-platform dependency | High | API, rate-limit, or policy change blocks delivery | Manual export, channel-neutral masters, independently versioned adapters |
| Video cost and quality | High | Unit costs or revision burden exceed value | Delay until still-media gates; storyboard/export to specialist tools; meter usage |
| Rights, likeness, trademark, or disclosure failure | Critical | Missing evidence or use outside license | Rights model, blocking gates, expiry propagation, human review, no legal-certainty claims |
| Sensitive source leakage | Critical | Private material enters prompts or public canon | Restricted inbox, classification, provider policy, consent and dignity review, no cross-property reuse |
| Uncontrolled generation spend | High | Retries, video, or variants consume budget | Per-job preview, quotas, tenant ceilings, cancellation, fallback approval, cost per accepted output |
| User complexity | High | Creators cannot tell canon from candidates or approvals | Progressive disclosure, modes/templates, unmistakable states, focused Review Room, usability tests |
| Operational sprawl | Medium–High | Too many services/connectors before real usage | Modular monolith, outbox/webhooks, extract only on measured pressure |
| Analytics overclaim | Medium–High | Small samples produce confident recommendations | Preserve source definitions, show uncertainty, reviewed proposals, opt-out |
| SaaS launched before demand | High | Low repeat use and services-heavy onboarding | Commercial gate; keep internal/CF value; concierge validation first |

# 24. Decision checkpoints

| Checkpoint | Continue when | Narrow, branch, or stop when |
|---|---|---|
| After F3 | Representative properties fit the model and portable round trip works | Genre-specific forks are required before media generation |
| After B1–B4 | Continuity and workflow savings exceed generic-tool coordination | Value is predominantly generic generation |
| After V1 | Commerce and BeKindRewind share the core without contamination | Split higher-level products and retain only genuinely shared low-level packages |
| After C1 pilots | Campaigns are published, repeated, easier to approve, and commercially useful | Keep narrative generation narrow or remove it from CF |
| Before production video | Still workflows are reliable and explicit video quality/cost gates pass | Continue with storyboards and external video tooling |
| Before direct publishing | Export is stable and users need operational automation enough to justify API risk | Remain export-first |
| Before standalone SaaS | Repeat paid non-commerce demand meets S1 gates | Remain internal platform and CF add-on |
| Before adaptive media | Consented data, demand, and ethical controls exist | Keep analytics descriptive and human-directed |
| Before microservices | Measured scale, security, failure isolation, or team boundary exists | Preserve modular monolith |

# 25. Final implementation recommendation

Build **Storyworld Engine first as an independently deployable modular monolith**, with **Storyworld Studio as its first-party client** and **Commerce Foundry as a deeply integrated peer authority**.

The first implementation sequence is:

1. Lock authority, vocabulary, schemas, state machines, packages, and non-goals.
2. Establish identity, immutable versions, provenance, rights, audit, portability, and durable workflow.
3. Implement the headless canon, state, narrative, review, and package kernel.
4. Build media orchestration, Studio, integration, and evaluation in parallel.
5. Converge them in a dual-use alpha: one BeKindRewind world slice and one Commerce Foundry product-story campaign.
6. Promote the Commerce Foundry integration only after the full rejection/revision/publish/measure loop works.
7. Add Instagram-first renditions, owned-media adapters, runtime compilation, operational maturity, and governed learning in dependency order.
8. Open a standalone SaaS business only after repeat external demand earns it.

The cleanest boundary is:

- **Storyworld owns narrative truth and master narrative media.**
- **Storyworld Studio owns the human experience, not separate data.**
- **Commerce Foundry owns product truth, commercial approval, commerce publication, and revenue attribution.**
- **BeKindRewind owns runtime execution and player state.**
- **Octon governs agent missions; Harmony defines policy; neither becomes a business database.**
- **Providers and creative tools execute scoped work and return candidates.**

The first artifact to create after this dossier is not a large codebase. It is an F0/F1 contract pack containing the authority ADRs, canonical schemas, lifecycle state machines, package envelopes, golden fixtures, and acceptance tests. That pack makes every later implementation decision faster, safer, and reversible.

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
