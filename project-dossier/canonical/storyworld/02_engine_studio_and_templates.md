---
title: "Storyworld Engine, Studio, and Templates"
project: "Storyworld Platform"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
part: "02_engine_studio_and_templates"
---

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
