---
title: "Executive Context and Product Direction"
project: "Storyworld Platform"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
part: "01_executive_context_and_product_direction"
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
