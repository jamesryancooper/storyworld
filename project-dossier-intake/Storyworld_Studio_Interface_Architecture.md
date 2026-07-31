# Storyworld Studio Interface Architecture

**Status:** Product and UX architecture proposal  
**Repository reviewed:** `jamesryancooper/storyworld`  
**Repository state reviewed through:** commit `86f431aedc5145916a475f48abe22dc6f5a65cb7` (2026-07-30)  
**Purpose:** Define the reusable interface architectures and interaction models required for Storyworld Studio beyond graph-based interfaces.

---

# 1. Executive conclusion

Storyworld Studio requires substantially more than a Graph Explorer. Graphs are valuable projections of narrative, spatial, epistemic, dependency, lineage, rights, and release relationships, but they are only one member of a larger interface system.

The recommended architecture is:

> **One authority-centered application shell, two primary creative scopes, a small vocabulary of reusable task surfaces, and a universal proposal-to-decision interaction protocol.**

The two primary creative scopes are:

1. **Property Workspace** — the durable world, canon, entities, rules, chronology, style, rights, and shared dependencies.
2. **Production Workspace** — a particular season, campaign, book, adaptation, interactive content release, editorial series, audio production, or other bounded effort pinned to exact canon.

Within those scopes, Studio should compose a limited family of interface paradigms:

- Actionable dashboards and queues.
- Explorers and libraries.
- Structured record and document editors.
- Boards and outlines.
- Timelines and track editors.
- Matrices.
- Graphs and maps.
- Production workbenches.
- Investigation consoles.
- Exact-version review rooms.
- Builders and compilers.
- Immutable ledgers.
- Validation sandboxes and simulators.
- Guided setup and migration workflows.
- Purpose-built mobile decision surfaces.

These paradigms should share one design system, one object identity model, one version model, one authority model, and one navigation shell. Property and production templates can change vocabulary, defaults, required fields, visible tools, validators, and saved views, but must not create separate databases, hidden product forks, or incompatible applications.

The Graph Explorer should be treated as a **projection layer over structured Engine state**, never as an authority source. Every graph must have explicit node and edge semantics, synchronize selection with a structured list or outline and inspector, expose hidden-item counts, and provide an accessible non-canvas equivalent.

## Immediate repository-level correction

The current proposed `DEC-0028` should be amended before acceptance:

- Rename **“spatial Arc graph”** to **“Narrative Flow Graph”** or **“Arc Flow Canvas.”**
- Scope “narrative units and choice points are nodes” to that graph profile only.
- Scope “entities, places, and rules are not nodes” to the Arc Flow profile only.
- Scope “dependency edges are out of scope” to the Arc Flow profile only.
- Reserve **Spatial Graph** for physical geography, containment, adjacency, routes, access, and distance.
- Establish a reusable `GraphViewProfile` concept so every later graph explicitly defines its node types, edge types, grouping, axes, available actions, structured fallback, and authority limits.

That amendment preserves the strong proposed Arc semantics while avoiding a naming and scope collision with the wider Graph Explorer architecture.

---

# 2. Current repository state and architectural implications

The current Studio is no longer merely a dossier concept. The reviewed repository includes:

- A Next.js Studio client using the same governed Engine API as other clients.
- A vendored project-owned component system and shared light/dark design tokens.
- A Command Center and World Bible.
- An Arc Board that keeps presentation order separate from story time.
- A Generation Workbench with scene-state context, locked attributes, candidates, and provenance.
- A Continuity Console with findings and governed dispositions.
- A Review Room with proposal and decision handling.
- A Release Builder with immutable release lineage and pinned productions.
- URL-owned property and production context.
- Cross-domain search and deep links.
- Responsive navigation and accessibility checks.
- A structured, keyboard-operable Arc representation serving as the accessible substrate for a future graph.
- A proposed, not yet accepted, Arc graph-semantics decision.

This means the interface plan should not replace the current alpha. It should organize and extend it.

The current surfaces already validate several core interface names:

- **Command Center**
- **World Bible**
- **Arc Board**
- **Generation Workbench**
- **Continuity Console**
- **Review Room**
- **Release Builder**

The next design work should make these surfaces part of a coherent Property/Production shell, deepen their interaction patterns, and add the missing paradigms required by the broader fixture corpus.

---

# 3. Complete interface-architecture strategy

A useful way to define Studio is:

```text
Storyworld Studio
├── Application Shell
│   ├── Organization / workspace scope
│   ├── Property / production scope
│   ├── Search and command palette
│   ├── Assignments and notifications
│   ├── Identity, role, authority, and connector state
│   └── Persistent navigation and saved layouts
│
├── Property Workspace
│   ├── Source Inbox
│   ├── World Bible
│   ├── Canon Workspace
│   ├── People, places, objects, rules, style, and rights
│   ├── Timeline, truth, knowledge, and reveals
│   ├── Shared-universe dependencies
│   ├── Graph Explorer
│   └── Property productions and assets
│
├── Production Workspace
│   ├── Brief
│   ├── Arc Board / Narrative Explorer
│   ├── Scene and Sequence Editor
│   ├── Storyboard / temporal editors
│   ├── Generation Workbench
│   ├── Continuity Console
│   ├── Review Room
│   ├── Release Builder
│   └── Results and Insights
│
├── Cross-Property Services
│   ├── Asset and Reference Library
│   ├── Review queues
│   ├── Release Calendar
│   ├── Integration Center
│   ├── Administration
│   └── Audit and evidence ledgers
│
└── Decision Protocol
    ├── Draft or proposal
    ├── Validation
    ├── Compare and impact preview
    ├── Authorized decision
    ├── Immutable receipt
    ├── Supersession or release
    └── Reconciliation and recovery
```

The most important architectural separation is not visual; it is semantic:

- **Exploration is not acceptance.**
- **Editing is not canonization.**
- **Creative approval is not commercial approval.**
- **Package preparation is not publication authorization.**
- **Runtime compilation is not runtime execution.**
- **Observation is not truth.**
- **A comment is not a formal decision.**
- **A passing test is not production-canon promotion.**

---

# 4. Taxonomy of interface architectures and interaction models

| Term | Definition in Storyworld | Primary verbs | Must not imply |
|---|---|---|---|
| **Application Shell** | Persistent frame providing identity, scope, navigation, search, notifications, authority context, and layout behavior. | switch, navigate, search, resume | domain authority or independent state |
| **Workspace** | A bounded collection of coordinated tools around an authoritative scope, usually a property or production. | organize, author, inspect, review | a separate product or database |
| **Dashboard** | An actionable summary of defined facts and work requiring attention. | assess, open, route, prioritize | invented readiness scores or passive analytics theater |
| **Inbox / Queue** | Work waiting for a person or role, with assignment, age, status, and consequence. | triage, claim, open, reassign | approval merely by removal from the queue |
| **Explorer** | A read-oriented surface for navigating relationships, hierarchy, time, space, or lineage. | find, filter, traverse, inspect | authoritative mutation from a spatial gesture |
| **Library** | Faceted search, browsing, reuse, and collection management over many source, asset, reference, or template records. | search, compare, reuse, collect | a folder system as the source of truth |
| **Editor** | A surface centered on changing one primary object or document under draft/proposal semantics. | write, revise, structure, validate | automatic acceptance |
| **Board** | A structured planning surface organizing peer items by order, lane, hierarchy, status, or responsibility. | arrange, group, sequence, plan | freeform canvas semantics without typed structure |
| **Outline** | Hierarchical structured representation of a long work or production. | nest, reorder, collapse, insert | identity derived from display position |
| **Timeline / Track Editor** | A temporal surface using explicit coordinates and lanes. | place, align, scrub, compare | story time conflated with presentation or publication time |
| **Matrix** | A cross-dimensional comparison surface. | compare, detect gaps, inspect intersections | flattening distinct dimensions into one status |
| **Graph / Map** | A typed relationship projection with explicit node and edge semantics. | traverse, focus, reveal, inspect | a universal canvas or authority source |
| **Canvas** | A spatial interaction area used only where position itself has defined meaning. | place, connect, frame, zoom | “drag anywhere” as an implicit domain mutation |
| **Workbench** | An iterative production loop combining inputs, jobs, candidates, compare, revision, and provenance. | run, compare, revise, accept candidate | provider output as accepted master |
| **Console** | An investigation and resolution surface for findings, failures, health, or policy. | diagnose, inspect evidence, resolve, waive | decorative monitoring or undocumented override |
| **Inspector** | Contextual detail panel for the selected object, including versions, relationships, rights, findings, and safe commands. | inspect, follow links, open editor | a hidden second source of truth |
| **Review Room** | Role-scoped, exact-version decision environment with annotations, diffs, consequences, and receipts. | approve, reject, request revision, waive, escalate | comments as approvals or stale-version decisions |
| **Builder** | Guided assembly of a validated output from authoritative inputs. | assemble, validate, preview, package | publication merely because a package exists |
| **Compiler** | Target-specific transformation of approved source content into an immutable package. | compile, verify, sign, hand off | ownership of runtime execution |
| **Preview** | Non-authoritative rendering of an exact version for a target or device. | inspect, compare, test | a separate editable master |
| **Compare / Diff View** | Side-by-side or semantic comparison of versions, branches, proposals, or renditions. | compare, explain, select changes | a plain text diff as sufficient for every media type |
| **Ledger** | Append-only evidence and history: versions, decisions, receipts, publications, rights events, and reconciliations. | trace, verify, audit | editing history in place |
| **Simulator / Validation Sandbox** | Isolated environment that executes or validates without mutating accepted authority state. | test, compile, replay, inject failure | a live production environment |
| **Wizard / Guided Workflow** | Bounded multi-step experience for infrequent setup, import, migration, or connection work. | configure, map, validate, finish | the primary daily authoring model |
| **Mobile Decision Surface** | Purpose-built narrow experience for review, annotation, approval, alerts, and release status. | triage, review, decide, comment | a shrunken desktop graph or swipe-to-approve interaction |

## Naming rule

Name the surface according to its dominant user job:

- **Explorer** when the user is locating and understanding.
- **Editor** when the user is changing a primary artifact.
- **Board** when the user is arranging structured peers.
- **Workbench** when the user is iterating through production candidates.
- **Console** when the user is diagnosing or resolving.
- **Review Room** when a formal exact-version decision is possible.
- **Builder** when the user is assembling an output package.
- **Ledger** when the user is reconstructing immutable history.
- **Sandbox** when the user is testing without authority mutation.

---

# 5. Recommended global application shell

## 5.1 Global navigation

The mature shell should use these stable top-level areas:

```text
Command Center
Properties
Productions
Library
Reviews
Releases
Insights
Integrations
Administration
```

Role and phase may hide or de-emphasize areas, but their identity should remain stable. A user should not encounter a fundamentally different application because a property is editorial instead of interactive.

## 5.2 Persistent top bar

The top bar should always expose:

- Organization and workspace selector.
- Breadcrumb and scope indicator:
  `Organization → Workspace → Property → Production → Narrative Unit`.
- Active branch and pinned canon release where applicable.
- Global search.
- Command palette.
- Assignments and notification center.
- User identity and active role.
- Authority-host indicator when a delivery is Commerce Foundry- or runtime-owned.
- Connector and offline/degraded status when relevant.
- Help, keyboard shortcuts, and documentation.

Scope should be URL-owned and shareable. The interface must never silently substitute a different property or production when a referenced one is unavailable.

## 5.3 Main workspace frame

### Left region

Used for one of:

- Contextual navigation.
- Hierarchical outline.
- Filters and facets.
- Layer controls.
- Saved views.
- Entity or asset collections.

### Center region

The primary task surface:

- Editor.
- Board.
- Graph.
- Matrix.
- Workbench.
- Console.
- Review sequence.
- Preview.

### Right region

A consistent inspector with tabs such as:

```text
Summary
Content
Relationships
State
Sources
Rights
Versions
Findings
Reviews
History
Linked assets
```

The inspector should not become a second editor with hidden save semantics. Editing should open a clear editor mode, drawer, or focused view.

### Bottom contextual rail

The bottom region changes according to task:

- Story-time and presentation-order rail.
- Audio/video timecode tracks.
- Lifecycle and approval rail.
- Generation job queue.
- Rights-validity period.
- Branch ancestry.
- Publication or runtime-delivery status.

It should be collapsible and never obscure primary content.

## 5.4 Focus modes

Studio should support explicit focus modes:

- **Write** — center the document or script editor.
- **Plan** — emphasize board, outline, timeline, or graph.
- **Inspect** — maximize context, evidence, and relationships.
- **Compare** — lock two or more exact versions side by side.
- **Review** — hide unrelated authoring controls and foreground consequences.
- **Present** — clean preview for stakeholder walkthrough.

Focus modes are views, not authority modes.

## 5.5 Saved layouts

Saved views should retain:

- Scope.
- Filters.
- Grouping.
- Columns.
- Graph layers.
- Inspector tab.
- Density.
- Panel sizes.
- Sort order.

They should not retain sensitive results for a user who later loses access.

## 5.6 Globally consistent versus adaptable elements

### Globally consistent

- Identity, role, and authority host.
- Object identity and stable URL.
- Branch and version.
- Lifecycle state.
- Visibility and sensitivity.
- Provenance and source links.
- Rights and policy status.
- Exact-version decision semantics.
- Comments versus formal decisions.
- Error and unknown-outcome recovery.
- Search, command palette, and keyboard model.

### Adaptable through templates and roles

- Vocabulary.
- Default hierarchy labels.
- Default tabs and saved views.
- Required fields.
- Visible validators.
- Preferred card, outline, matrix, or graph view.
- Default release targets.
- Role-specific queues.
- Available commands based on permission.

---

# 6. Complete information-architecture tree

```text
Storyworld Studio
├── Command Center
│   ├── My work
│   ├── Attention required
│   ├── Active productions
│   ├── Upcoming releases
│   ├── Connector and workflow health
│   ├── Recent accepted work
│   └── Recent activity
│
├── Properties
│   ├── Property portfolio
│   └── Property Workspace
│       ├── Overview
│       ├── Source Inbox
│       ├── World Bible
│       │   ├── Facts, terminology, themes
│       │   ├── World rules and exceptions
│       │   ├── People and organizations
│       │   ├── Places and spatial models
│       │   ├── Objects, products, artifacts, symbols
│       │   ├── Timeline and events
│       │   ├── Truth, assertions, knowledge, beliefs
│       │   ├── Reveals, clues, evidence
│       │   ├── Voice, style, motifs, reference packs
│       │   └── Rights, consent, safety
│       ├── Canon Workspace
│       │   ├── Proposals
│       │   ├── Branches and releases
│       │   ├── Compare and diff
│       │   ├── Impact and migration
│       │   ├── Shared-universe dependencies
│       │   └── Canon ledger
│       ├── Graph Explorer
│       │   ├── World graph
│       │   ├── Relationship graph
│       │   ├── Spatial graph
│       │   ├── Chronology graph
│       │   ├── Truth and reveal graph
│       │   ├── State graph
│       │   └── Shared-dependency graph
│       ├── Productions
│       ├── Assets and references
│       ├── Insights
│       └── Activity and audit
│
├── Productions
│   ├── Production portfolio
│   └── Production Workspace
│       ├── Overview and brief
│       ├── Arc Board
│       ├── Narrative Explorer
│       │   ├── Structured outline
│       │   ├── Story Flow graph
│       │   ├── Chronology view
│       │   ├── Character lanes
│       │   └── Location grouping
│       ├── Calendar
│       ├── Scene and Sequence Editor
│       ├── Storyboard
│       ├── Dialogue / Mission editors when applicable
│       ├── Generation Workbench
│       ├── Continuity Console
│       ├── Review Room
│       ├── Release Builder
│       ├── Results and Insights
│       └── Production settings
│
├── Library
│   ├── Sources
│   ├── Reference packs
│   ├── Assets
│   │   ├── Staging
│   │   ├── Candidates
│   │   ├── Accepted masters
│   │   ├── Renditions
│   │   ├── Published/runtime instances
│   │   └── Superseded and archived
│   ├── Collections
│   ├── Templates
│   └── Asset lineage
│
├── Reviews
│   ├── My queue
│   ├── Team queues
│   ├── Creative
│   ├── Canon
│   ├── Continuity
│   ├── Rights
│   ├── Commerce
│   ├── Runtime
│   ├── Guest rooms
│   └── Decision and waiver ledger
│
├── Releases
│   ├── Release Calendar
│   ├── Creative releases
│   ├── Channel packages
│   ├── Commerce bundles
│   ├── Runtime releases
│   ├── Publications and receipts
│   └── Reconciliation
│
├── Insights
│   ├── Narrative observations
│   ├── Production efficiency
│   ├── Commerce observations
│   ├── Experiments
│   ├── Hypotheses
│   └── Iteration proposals
│
├── Integrations
│   ├── Commerce Foundry
│   ├── Interactive runtimes
│   ├── Providers and render runners
│   ├── External editors
│   ├── Storage
│   ├── Channels
│   ├── Webhooks and API clients
│   ├── Health and reconciliation
│   └── Validation sandboxes
│
└── Administration
    ├── Organizations and workspaces
    ├── Members, guests, and service principals
    ├── Roles and authority policies
    ├── Templates and vocabularies
    ├── Provider policies and budgets
    ├── Rights, retention, and disclosure policies
    ├── Secrets and signing keys
    ├── Usage and billing
    ├── Audit
    ├── Backup, restore, export, and deletion
    └── Operational health
```

---

# 7. Workspace-by-workspace specification

## 7.1 Command Center

**Purpose:** Show what requires attention now rather than generic analytics.

**Primary users:** Everyone; contents are role-filtered.

**Authoritative objects:** Read-only aggregates over assignments, proposals, findings, productions, releases, jobs, and connector status.

**Architecture:** Actionable dashboard plus inbox.

**Location:** Global landing page.

**Key tools:** My work, blockers by authority, pending decisions, generation failures, stale dependencies, upcoming releases, recent accepted work, connector health.

**Inputs:** Engine queries and normalized external receipts.

**Outputs:** Navigation, assignment, low-risk triage actions, saved views.

**Review consequences:** No canon, approval, release, or publication should occur directly from a summary card.

**Graph relationship:** Small read-only previews and deep links only.

**Mobile:** Excellent fit.

**Phase:** Present in current alpha; continue deepening.

## 7.2 Property Workspace

**Purpose:** Maintain the durable identity and canon of a fictional, editorial, brand, interactive, or hybrid property.

**Primary users:** Creator, showrunner, world builder, editor, continuity editor, rights reviewer.

**Authoritative objects:** Property, canon branch/release, entities, relationships, rules, timeline, style, rights, shared dependencies.

**Architecture:** Scoped workspace combining explorers, editors, matrices, graphs, and ledgers.

**Location:** Properties → selected property.

**Key tools:** Overview, Source Inbox, World Bible, Canon Workspace, Graph Explorer, Rights, Productions, Assets.

**Inputs:** Sources, imported canon, proposals, accepted decisions.

**Outputs:** Canon proposals, accepted canon releases, reference packs, production templates.

**Review consequences:** Changes to accepted canon require explicit authority and create new immutable releases.

**Graph relationship:** Property graphs project the same entities and facts.

**Mobile:** Read, search, review, and lightweight edits; full world-building remains desktop-oriented.

**Phase:** Partial in alpha through World Bible; full shell is intermediate.

## 7.3 Production Workspace

**Purpose:** Plan, create, review, and deliver a bounded narrative effort pinned to exact canon.

**Primary users:** Producer, writer, editor, visual artist, audio producer, continuity editor, approvers.

**Authoritative objects:** Production, narrative structure, scenes, assets, findings, reviews, releases, packages, observations.

**Architecture:** Scoped workspace with board, editor, workbench, console, review room, and builder.

**Location:** Productions → selected production.

**Inputs:** Brief, canon release, templates, source/reference packs, integration snapshots.

**Outputs:** Narrative releases, accepted masters, renditions, packages, receipts, observations.

**Review consequences:** Creative acceptance and release approval are separate from commerce or runtime acceptance.

**Graph relationship:** Narrative Flow and production-specific overlays.

**Mobile:** Review and status; limited authoring.

**Phase:** Core pieces exist in alpha; unified workspace is intermediate.

## 7.4 Source Inbox

**Purpose:** Ingest source material without allowing ingestion or extraction to become canon.

**Primary users:** Creator, editor, archivist, rights reviewer.

**Authoritative objects:** SourceRecord, sensitivity, rights, provenance, extraction proposals, mapping decisions.

**Architecture:** Queue + document viewer + source-to-canon matrix + compare view.

**Location:** Property Workspace → Source Inbox; Library → Sources.

**Key tools:** Upload/import, classification, restricted preview, metadata, extraction candidates, duplicate detection, mapping, redaction, prohibited-identifier review.

**Inputs:** Documents, images, transcripts, exports, notes, external packages.

**Outputs:** Restricted source records and typed canon proposals.

**Review consequences:** Every extracted fact remains proposed until accepted by an authorized human.

**Graph relationship:** Source lineage and assertion/evidence graphs originate here.

**Mobile:** Triage and classification only.

**Phase:** MVP-next and high priority.

## 7.5 World Bible

**Purpose:** Browse and author structured world knowledge.

**Primary users:** Creator, writer, world builder, editor, continuity editor.

**Authoritative objects:** Canon entities, relationships, rules, terminology, events, state, voice, style.

**Architecture:** Explorer + structured record editor + matrices + optional graph views.

**Location:** Property Workspace → World Bible.

**Key tools:** Faceted entity list, record editor, relationship/state tabs, source links, version history, proposal mode.

**Inputs:** Accepted canon and proposals.

**Outputs:** New or revised canon proposals; accepted records only through governed decisions.

**Review consequences:** Direct accepted revision or queued proposal depends on property policy and user authority.

**Graph relationship:** Every record can open a focused ego graph; graph selection opens the same inspector.

**Mobile:** Search, inspect, comment, small edits.

**Phase:** Basic form exists in alpha; specialized editors are intermediate.

## 7.6 Canon Workspace

**Purpose:** Make canon change safe, explainable, and reversible.

**Primary users:** Creator, showrunner, canon editor, continuity editor.

**Authoritative objects:** CanonProposal, CanonBranch, CanonRelease, migration decision, impact result, supersession.

**Architecture:** Proposal queue + semantic diff + branch explorer + impact matrix + immutable ledger.

**Location:** Property Workspace → Canon.

**Key tools:** Before/after diff, source evidence, rationale, affected productions/assets/packages, branch target, migration preview, release creation.

**Inputs:** Human or model proposals and current canon releases.

**Outputs:** Accepted/rejected/revised proposals, new canon release, migration plan.

**Review consequences:** High consequence; decisions bind to exact versions and produce receipts.

**Graph relationship:** Canon branch and shared-dependency graphs link into impact analysis.

**Mobile:** Review and approve only with compact impact summary; complex migrations require larger screens.

**Phase:** MVP-next.

## 7.7 Narrative Explorer

**Purpose:** Understand production structure from multiple projections.

**Primary users:** Creator, writer, editor, producer, continuity editor.

**Authoritative objects:** None independently; it projects narrative units, choices, relationships, and coordinates.

**Architecture:** Explorer with synchronized structured list, visual card flow, graph, timeline, and inspector.

**Location:** Production Workspace → Narrative Explorer.

**Key tools:** View switcher, grouping, layers, filters, saved views, selection, focus, compare.

**Inputs:** Engine narrative structure and linked entities/assets.

**Outputs:** Navigation, selection, proposed structure edits opened in appropriate editors.

**Review consequences:** No consequential decision directly from a graph gesture.

**Graph relationship:** This is the host of the Narrative Flow Graph.

**Mobile:** Structured list/outline only; mini-map optional.

**Phase:** Structured substrate exists; graph view after decision acceptance and separate authorization.

## 7.8 Arc Board

**Purpose:** Plan hierarchy, presentation order, threads, reveals, choices, and dependencies.

**Primary users:** Creator, writer, editor, producer.

**Authoritative objects:** Narrative structure revisions or structure proposals.

**Architecture:** Board + outline + lane view.

**Location:** Production Workspace → Arc Board.

**Key tools:** Hierarchy, grouping, order, story-time coordinate, threads, choices, dependencies, reveal markers, proposal mode.

**Inputs:** Pinned canon and production brief.

**Outputs:** New structure revision or queued proposal.

**Review consequences:** Direct accepted revision or queued review depends on governed authoring mode.

**Graph relationship:** Bidirectional synchronization with Story Flow view.

**Mobile:** Read and small status edits; major restructuring is desktop/tablet.

**Phase:** Present in alpha; deepen for full hierarchy and patterns.

## 7.9 Scene and Sequence Editor

**Purpose:** Author the actual narrative unit while preserving structured state and continuity.

**Primary users:** Writer, editor, director, visual or audio producer.

**Authoritative objects:** Scene, sequence, beats, dialogue, panels, shots, state transitions.

**Architecture:** Hybrid document editor + outline + structured metadata + inspector.

**Location:** Production Workspace → Scripts and Scenes.

**Key tools:** Rich text/script editor, entering/exiting state, cast, location, beats, dialogue, references, locked invariants, inline findings, version history.

**Inputs:** SceneStatePacket, canon, arc, references, prior state.

**Outputs:** Scene/sequence proposal or accepted revision, generation recipe inputs.

**Review consequences:** Scene acceptance does not automatically accept generated assets or release the production.

**Graph relationship:** Selected graph card opens the same scene in this editor.

**Mobile:** Read, comment, and light text edits.

**Phase:** MVP-next and highest-value missing authoring surface.

## 7.10 Storyboard

**Purpose:** Author and inspect visual or temporal sequence.

**Primary users:** Director, visual artist, editor, audio/video producer.

**Authoritative objects:** Panels, shots, interactions, durations, camera/composition, cue relationships.

**Architecture:** Image-led sequence board + strip/timeline + inspector.

**Location:** Production Workspace → Storyboard.

**Key tools:** Screenshot cards, panel strip, shot details, continuity overlays, compare, annotations, focused replacement.

**Inputs:** Scenes, accepted assets, candidates, references.

**Outputs:** Storyboard revision and generation/edit instructions.

**Review consequences:** Storyboard approval is distinct from final asset approval.

**Graph relationship:** Narrative Flow cards may use storyboard thumbnails; selection stays synchronized.

**Mobile:** Review and annotation, not dense rearrangement.

**Phase:** MVP/intermediate.

## 7.11 Generation Workbench

**Purpose:** Compile governed recipes, execute providers, compare candidates, and perform focused revision.

**Primary users:** Visual artist, audio producer, editor, creator.

**Authoritative objects:** Recipes, requests, runs, candidates, derivations, accepted masters.

**Architecture:** Workbench with inputs, job queue, candidate grid, compare, annotation, revision, and provenance.

**Location:** Production Workspace → Generation.

**Key tools:** Scene-state packet, locked attributes, references, cost preview, provider selection, queue, candidate compare, masks/regions, external-editor checkout, acceptance.

**Inputs:** Pinned canon, scene state, reference packs, rights and policy.

**Outputs:** Candidates and, after human acceptance, immutable master versions.

**Review consequences:** Provider completion never means creative acceptance.

**Graph relationship:** Asset lineage graph and scene links.

**Mobile:** Queue status, candidate review, annotations; generation configuration remains desktop-first.

**Phase:** Basic form exists; focused revision and external-editor round trip are intermediate.

## 7.12 Asset and Reference Library

**Purpose:** Find, understand, reuse, and govern source, reference, candidate, master, rendition, and publication assets.

**Primary users:** All creative roles, rights reviewer, release manager.

**Authoritative objects:** Asset, AssetVersion, ReferencePack, Collection, Rendition, Derivation.

**Architecture:** Faceted library + grid/list + compare + inspector + lineage ledger.

**Location:** Global Library and property/production-scoped tabs.

**Key tools:** Search, filters, collections, reference-pack builder, rights, lineage, duplicate/similarity, version compare.

**Inputs:** Uploads, imports, provider outputs, editor returns, packages.

**Outputs:** Reusable reference packs, accepted assets, renditions, collections.

**Review consequences:** Asset state must be explicit; browsing or adding to a collection is not acceptance.

**Graph relationship:** Derivation and usage graphs.

**Mobile:** Search, inspect, approve, add to collection.

**Phase:** MVP-next.

## 7.13 Continuity Console

**Purpose:** Investigate and resolve narrative, temporal, visual, state, rights, and product-fidelity findings.

**Primary users:** Continuity editor, creator, editor, rights and commerce reviewers.

**Authoritative objects:** Finding, evidence, disposition, waiver, remediation link.

**Architecture:** Investigation console + evidence compare + state/timeline overlays.

**Location:** Production Workspace → Continuity; global review queue.

**Key tools:** Severity queue, evidence, affected records, timeline/state view, suggested correction, focused remediation, waiver scope/expiry, recheck.

**Inputs:** Evaluations, rules, canon, assets, snapshots.

**Outputs:** Resolved, intentional-exception, waived, or escalated finding with receipt.

**Review consequences:** A waiver requires explicit authority, reason, scope, and expiry.

**Graph relationship:** Opens state, knowledge, rights, or dependency graph focused on the finding.

**Mobile:** Good for triage and simple disposition; complex investigation is desktop.

**Phase:** Basic form exists; deeper investigation views are intermediate.

## 7.14 Review Room

**Purpose:** Make an exact-version human decision with sufficient context and explicit consequences.

**Primary users:** Editors, creators, rights reviewers, clients, commerce reviewers, runtime reviewers, guests.

**Authoritative objects:** ReviewCase, annotation, ReviewDecision, RevisionRequest, ApprovalReceipt.

**Architecture:** Focused review room + compare/diff + annotation + decision bar.

**Location:** Global Reviews and contextual deep links.

**Key tools:** Sequence preview, exact versions, source/policy context, image-region or timecode comments, consequence preview, approve/reject/revise/waive/escalate.

**Inputs:** Exact artifacts, copy, source snapshots, policy, references.

**Outputs:** Immutable decision receipt or revision request.

**Review consequences:** Material changes invalidate only affected approval layers.

**Graph relationship:** Graph context may explain relationships, but formal action remains in Review Room.

**Mobile:** Priority mobile surface.

**Phase:** Basic form exists; media annotations and role-specific rooms are intermediate.

## 7.15 Release Builder

**Purpose:** Assemble channel-neutral releases and target packages while keeping authority boundaries explicit.

**Primary users:** Producer, release manager, rights reviewer, commerce/runtime integrator.

**Authoritative objects:** CreativeRelease, RenditionSpec, Package, SubmissionRequest, DeliveryReceipt.

**Architecture:** Builder + rendition matrix + preview + readiness console + ledger.

**Location:** Production Workspace → Release; global Releases.

**Key tools:** Target matrix, device previews, accessibility, disclosures, rights readiness, package verification, export, submission, receipt, reconciliation.

**Inputs:** Accepted masters, copy, approvals, rights, target profiles.

**Outputs:** Signed packages and submission requests.

**Review consequences:** Package creation does not authorize publication; receiving authority must accept.

**Graph relationship:** Release/distribution graph and asset lineage.

**Mobile:** Status, blockers, approval, receipts.

**Phase:** Basic canon-release form exists; full target packaging is intermediate.

## 7.16 Results and Insights

**Purpose:** Turn observations into explainable hypotheses and human-reviewed iteration proposals.

**Primary users:** Creator, producer, analyst, commerce partner, executive.

**Authoritative objects:** PerformanceObservation, MetricMapping, Hypothesis, Experiment, Result, IterationProposal.

**Architecture:** Dashboard + matrix + experiment builder + evidence ledger.

**Location:** Global Insights and property/production Results.

**Key tools:** Narrative-unit analysis, production efficiency, uncertainty, experiment invariants, variant compare, proposal review.

**Inputs:** Channel, commerce, runtime, and production observations.

**Outputs:** Hypotheses and proposals, never automatic canon changes.

**Review consequences:** Adopting a result requires a separate authorized change.

**Graph relationship:** Experiment and learning graph.

**Mobile:** Summary, alerts, proposal review.

**Phase:** Mature.

## 7.17 Integration Center

**Purpose:** Configure, test, monitor, and reconcile product boundaries.

**Primary users:** Integration developer, administrator, release manager, commerce/runtime reviewer.

**Authoritative objects:** Connections, capabilities, package exchanges, receipts, sync cursors, health events.

**Architecture:** Console + wizard + ledger + validation sandbox.

**Location:** Global Integrations.

**Key tools:** Commerce Foundry connection, runtime targets, providers, external editors, channels, credentials, webhooks, package replay, reconciliation.

**Inputs:** Credentials, endpoint configuration, signed packages, receipts.

**Outputs:** Validated connections, delivery/reconciliation events.

**Review consequences:** Connecting a system grants only explicit capabilities; it does not transfer domain authority.

**Graph relationship:** Integration and package-flow graph.

**Mobile:** Status and alerts only.

**Phase:** Intermediate and mature.

## 7.18 Administration

**Purpose:** Govern identity, policies, budgets, retention, security, and operations.

**Primary users:** Workspace administrator, security/operations roles.

**Authoritative objects:** Membership, role, service principal, policy, budget, retention, credential, audit configuration.

**Architecture:** Administration console + policy editor + matrix + audit ledger.

**Location:** Global Administration.

**Key tools:** Role templates, action permissions, provider allowlists, retention, secrets, signing keys, usage, backup/restore, audit.

**Inputs:** Organization policy and operational configuration.

**Outputs:** Governed configuration and receipts.

**Review consequences:** Administrative access must not imply creative or commercial approval authority.

**Graph relationship:** Authority and service-dependency views only where useful.

**Mobile:** Alerts and emergency revocation; full configuration is desktop.

**Phase:** Intermediate, then mature.

---

# 8. Specialized authoring interfaces

| Domain | Recommended primary interface | Supporting views | Reason |
|---|---|---|---|
| Character | Structured record editor with rich narrative notes | Portrait/reference pack, relationship graph, knowledge matrix, state history | Identity, appearance, voice, relationships, knowledge, and state must remain typed |
| Location | Structured record plus map/floor-plan editor | Spatial graph, era/condition variants, scene list, sound intent | Physical containment and adjacency require spatial treatment |
| Object / artifact | Structured record with image and state history | Ownership/location timeline, evidence links, lineage | Movement, condition, possession, and symbolic meaning change through time |
| Product | Read-only pinned product snapshot plus placement editor | Claims/depictions matrix, packaging version compare | Commerce Foundry remains authoritative for product truth |
| Symbol / motif | Structured motif record | Occurrence timeline, scene links, secret/public meaning, cadence graph | Symbols have both canonical meaning and production cadence |
| World rule | Rule editor with scope, exceptions, rationale, and severity | Impact preview, examples, validator simulation | Rules need enforceable structure, not only prose |
| Voice system | Voice-profile editor with examples and prohibited traits | Copy preview, comparison, locale variants | Voice is reusable and testable across outputs |
| Visual style | Token/reference editor | Mood board, negative references, composition preview | Style combines structured constraints and visual examples |
| Timeline event | Timeline/table hybrid | Story/presentation/publication/revision coordinates | Temporal coordinates must not be conflated |
| Knowledge / belief / secret | Matrix plus structured assertion editor | Knowledge graph, POV filter, episode slider | Truth, assertion, belief, honesty, and accuracy are distinct |
| Reveal / evidence | Evidence board plus dependency editor | Reveal graph, spoiler scopes, audience-knowledge timeline | Mystery pacing and permissions require explicit dependencies |
| Branch / choice | Structured choice editor | Narrative Flow graph and branch-state matrix | Branch-local state and reconvergence must remain typed |
| Mission / trigger | Mission builder with preconditions/effects tables | Dependency graph, item/state links, runtime sandbox | Authored mission content differs from runtime/player state |
| Dialogue tree | Script editor plus conditional outline | Node graph, localization table, speaker/knowledge inspector | Graph alone is poor for long dialogue authoring |
| Editorial carousel | Panel storyboard with image/text pairs | Caption editor, sequence preview, source-safety checklist | The panel is the working unit, but source/privacy constraints span the sequence |
| Long-form book | Hierarchical outline plus rich-text editor | Thread margin, timeline links, chapter compare | Stable identity must survive insertion and reordering |
| Audio production | Timecoded script with speaker and cue lanes | Waveform/media preview, line-level replacement, rights | Audio meaning depends on time, overlap, silence, and sound cues |
| Commerce placement | Placement-contract editor | Product/claim matrix, scene preview, CF handoff | Product constraints and narrative purpose need one focused surface |
| Localization | Source-target editor and rendition matrix | Glossary, alt text, audio description, device preview | Variants must preserve facts, claims, and disclosure obligations |
| Rights and consent | Rights matrix and grant editor | Expiry timeline, usage graph, impact preview, ledger | Territory, channel, purpose, duration, and consent are multi-dimensional |

## Generic form editor boundary

A generic form renderer is suitable for:

- Low-complexity metadata.
- Administrative configuration.
- Optional custom fields.
- Rare fields hidden under progressive disclosure.

It is not sufficient for:

- Scene and chapter authoring.
- Branching choices.
- Timeline coordination.
- Knowledge and testimony.
- Source-to-canon mapping.
- Storyboards.
- Audio timing.
- Rights scope.
- Exact-version review.
- Canon impact analysis.

---

# 9. Cross-cutting interaction architecture

## 9.1 Universal consequential-action sequence

Every consequential workflow should follow the same pattern:

```text
Observe exact state
→ Enter draft or proposal
→ Validate structure, policy, and rights
→ Compare against current accepted version
→ Preview impact and invalidations
→ Confirm role and authority
→ Execute idempotent command
→ Receive immutable receipt
→ Reconcile visible state
```

The interface should explicitly recover unknown outcomes. A network failure after command submission must not encourage the user to repeat an acceptance blindly.

## 9.2 State model

Studio should maintain a consistent visual grammar for:

```text
Restricted source
Draft
Proposal
Candidate
Accepted canon
Accepted master
Rendition
Package
Published instance
Runtime instance
Superseded
Archived
Rejected
Withdrawn
```

Every state treatment should use text, iconography, and shape—not color alone.

## 9.3 Draft versus accepted

- Drafts are editable working state.
- Proposals are submitted candidate changes.
- Accepted records are immutable versions.
- “Editing accepted work” creates a new draft or proposal.
- Reversion creates a new superseding version; it does not erase history.

## 9.4 Exact-version review

Every decision surface should show:

- Object and version IDs.
- Branch.
- Content hash where appropriate.
- Source and reference versions.
- Policy version.
- Rights version.
- What changes invalidate the decision.
- Authority host.
- Decision consequences.

## 9.5 Semantic diffs

Diff presentation should match the medium:

- Structured fields: field-level semantic diff.
- Rich text: section and inline diff.
- Hierarchy: moved/inserted/deleted nodes with stable IDs.
- Image: overlay, blink, region compare, and reference compare.
- Audio/video: timecoded segment compare.
- Graph: added/removed nodes and typed edges.
- Package: manifest and hash diff.
- Rights: scope and expiry diff.

## 9.6 Focused revision

Revision should start from a finding, annotation, or exact region:

- Preserve unaffected components.
- Display locked invariants.
- Preview which approvals and packages will be invalidated.
- Regenerate or edit the smallest useful unit.
- Re-run affected checks only.
- Preserve the prior accepted version and evidence.

## 9.7 AI proposals

AI-originated material must always expose:

- Origin.
- Model/provider/workflow.
- Source scope.
- Confidence or uncertainty where meaningful.
- Locked constraints.
- Unresolved assumptions.
- Cost and latency where relevant.
- Candidate/proposal state.

AI work must never visually resemble accepted canon without a clear label.

## 9.8 Comments versus formal decisions

- Comments are conversational and non-authoritative.
- Suggestions are proposed edits.
- Review decisions use typed commands.
- Approval receipts bind exact versions.
- A “looks good” comment never changes lifecycle state.

## 9.9 Bulk actions

Bulk actions are appropriate for:

- Tagging.
- Assigning.
- Adding to collections.
- Export selection.
- Low-risk status transitions that share identical consequences.

Bulk acceptance, waivers, rights decisions, or publication actions require a grouped consequence preview and explicit authority check.

## 9.10 Keyboard and command palette

The command palette should:

- Be scope-aware.
- Show permission and consequence.
- Distinguish navigation from mutation.
- Require the same validation as visible buttons.
- Never bypass a Review Room or consequence screen.
- Provide commands to switch views, open inspector tabs, create proposals, and navigate findings.

---

# 10. How graph interfaces connect to non-graph interfaces

The Graph Explorer should use a common contract:

```text
GraphViewProfile
├── profile_id
├── scope
├── allowed node types
├── allowed edge types
├── edge semantics
├── grouping semantics
├── axis semantics
├── visual encodings
├── available filters
├── allowed non-consequential gestures
├── structured fallback
├── inspector mapping
├── deep-link behavior
└── authority statement
```

## Required behavior

1. Graph and structured list use the same stable IDs.
2. Selection is synchronized both ways.
3. The right inspector is the same object inspector.
4. Editing opens the corresponding structured editor.
5. Consequential decisions open Review Room or impact review.
6. Filters show explicit hidden-item counts.
7. Graph position is not canonical unless a specific graph profile defines position as data.
8. Graph layout state is a user view preference, not canon.
9. Every graph has keyboard navigation and a structured fallback.
10. Graph export labels the view, filters, scope, and timestamp.

## Graph profiles

| Profile | Nodes | Edges / relations | Non-graph partner |
|---|---|---|---|
| Narrative Flow | Narrative units, choice points | Presentation next, choice branch | Arc Board and structured outline |
| Chronology | Events, units, state changes | Temporal order or interval relations | Timeline table and coordinate matrix |
| Spatial | Locations, entrances, regions | Inside, adjacent, route, visible from, requires access | Map/floor plan and location records |
| Relationship | People and organizations | Typed relationship with time scope | Character records and relationship table |
| Truth and Reveal | Truths, assertions, evidence, beliefs, reveals | Supports, contradicts, conceals, requires | Knowledge matrix and evidence board |
| State | Entity state versions | Caused by, supersedes, moves, transforms | State history table |
| Mission | Missions, triggers, items, outcomes | Requires, unlocks, grants, blocks | Mission builder and runtime sandbox |
| Canon Branch | Canon releases and adaptations | Inherits, overrides, supersedes, forks | Canon compare and migration |
| Shared Universe | Shared modules and consuming properties | Pins, inherits, extends, forks | Dependency matrix and impact view |
| Asset Lineage | Sources, recipes, candidates, masters, renditions | Derived from, transformed by, included in | Asset Library and provenance inspector |
| Rights | Assets, grants, people, uses, territories | Permits, restricts, expires, revokes | Rights matrix and ledger |
| Release | Masters, renditions, packages, destinations | Included in, delivered to, supersedes | Release Builder |
| Commerce | Product snapshots, placements, claims, scenes, findings | Uses, permits claim, rejects, approves | Placement editor and CF focused review |
| Experiment | Hypotheses, variants, releases, results, proposals | Tests, observes, supports | Experiment builder and results matrix |

---

# 11. Interface behavior across narrative architectures

| Narrative architecture | Reused core interfaces | Specialized treatment | Invariants that do not change |
|---|---|---|---|
| Linear serialized fiction | Property, Arc Board, Scene Editor, Storyboard, Review, Release | Episode grouping and reveal overlays | Versions, authority, provenance, time separation |
| Branching and reconvergent | Arc Board, Scene Editor, Continuity | Choice editor, branch-state matrix, flow graph | Player-specific state remains external |
| Nonlinear chronology | Arc Board, Timeline, Scene Editor | Dual story/presentation coordinates and repeated-event compare | Release order cannot rewrite story time |
| Contested truth | World Bible, Source Inbox, Canon, Review | Assertion editor, knowledge matrix, reveal graph | Testimony is not automatically fact |
| Adaptation and alternate canon | Canon Workspace, Production Workspace | Branch ancestry, override matrix, migration compare | Source branch remains unchanged |
| Shared universe | Property Workspace, Canon Workspace | Versioned dependency explorer and cross-property impact | Consuming properties cannot silently mutate shared canon |
| Long-form books | Outline, Scene/Chapter Editor, Timeline | Deep hierarchy, chapter insertion, thread margin | IDs independent of numbering |
| Editorial carousel | Production Workspace, Storyboard, Review | Panel strip, caption system, dignity/privacy checklist | Restricted source remains separate |
| Field manual / educational | Template, outline, panel editor | Scenario/principle/exercise/takeaway builder | Template does not create new storage model |
| Collectible characters | Library, structured records, asset workflow | Collection grid, stable card template, batch preview | Character identity and card number remain stable |
| Audio-first | Scene Editor, Workbench, Review, Release | Timecoded script, speaker/cue lanes, segment replace | Audio tool does not gain authority |
| Interactive missions | World Bible, Mission Builder, Runtime compiler | Preconditions/effects, triggers, runtime sandbox | Runtime/player state stays outside canon |
| Commerce campaigns | Production, Storyboard, Workbench, Release | Placement contracts, claims/depictions matrix, CF handoff | Commerce Foundry retains product and publication authority |
| Audience-directed stories | Arc Board, Insights, Review | Poll observation and authorized branch-selection workflow | Audience result is observation, not authority |
| Persistent branded universe | Property, Canon, Production, Commerce | Product snapshot timeline and selective source-drift impact | Storyworld owns narrative, CF owns product truth |
| Procedural episodic content | Template, Workbench, Continuity | Rule/recipe editor, seed simulator, candidate ledger | Generated instance remains candidate until accepted |
| Localization and regional variants | Release Builder, Library, Review | Rendition matrix, glossary, source-target compare | Canon and approved claims remain invariant unless adaptation is explicit |
| Collaborative authorship | Editors, Review Room, Canon Workspace | Proposal branches, merge compare, conflict resolution | Comment, proposal, and decision remain distinct |
| Rights withdrawal | Rights workspace, Continuity, Release | Expiry timeline, selective invalidation, replacement workflow | Historical receipts remain preserved |
| Factual correction | Source Inbox, Canon/claim workspace, Release | Correction/retraction ledger and downstream impact | Published history is superseded, not erased |
| Generational saga | Timeline, World Bible, State | Long time ranges, inheritance and age lanes | Entity identity persists across decades |
| Concept or visual album | Production, Storyboard, audio editor, Release | Track order, motif matrix, cross-media dependency | Distribution/accounting systems remain external |

---

# 12. Modes, views, and templates

Story, Editorial, Interactive, and Commerce should not be global application modes in the sense of four separate products.

Use a layered model:

## Property template

Defines:

- Preferred vocabulary.
- Default World Bible sections.
- Recommended graph profiles.
- Required rights and safety checks.
- Default production templates.
- Optional custom fields.

## Production template

Defines:

- Hierarchy labels and allowed unit types.
- Required outputs.
- Default boards and editors.
- Validators.
- Review layers.
- Release targets.
- Rubrics.

## View preset

Defines:

- Which tools are visible.
- Default filters and grouping.
- Density.
- Inspector tabs.
- Saved layout.

## Integration context

Defines:

- Authority host.
- Pinned external snapshots.
- Required package types.
- Receiving-review requirements.

## Permission profile

Defines:

- Commands a user may execute.
- Review layers the user may decide.
- Sensitive source visibility.
- Administrative capabilities.

The onboarding flow may ask the user to start with Story, Editorial, Interactive, or Commerce, but the choice should create templates and presets—not a hidden code path or separate data model. Hybrid properties must be possible.

---

# 13. Scale and complexity management

Storyworld must work for a three-episode fixture and a universe with thousands of entities.

## 13.1 Search and navigation

- Server-side cross-domain search.
- Facets by property, production, type, branch, time, status, sensitivity, rights, and owner.
- Stable deep links.
- Search results labeled with current/superseded state.
- Visibility-aware and spoiler-aware results.
- Recently viewed and pinned objects.

## 13.2 Scope reduction

Every large surface should make scope explicit:

- Current property.
- Current production.
- Current branch.
- Current canon release.
- Time interval.
- Entity focus.
- Selected relationship types.
- One- or two-hop graph expansion.
- Current release target.

Avoid loading an entire universe graph by default.

## 13.3 Virtualization

Use virtualized:

- Tables and lists.
- Asset grids.
- Long outlines.
- Timeline lanes.
- Graph nodes outside the viewport.
- Review queues.

## 13.4 Hierarchy and aggregation

- Collapsible hierarchy.
- Roll-up counts.
- Aggregated finding and rights status.
- Explicit hidden-item counts.
- “Unparented” and “unresolved” groups.
- Stable IDs independent of display order.

## 13.5 Density modes

Offer:

- Visual cards.
- Compact rows.
- Table.
- Outline.
- Graph.
- Timeline.

Density is a view preference, not a change to the data.

## 13.6 Context compilation

For a selected scene or unit, compile a bounded context packet:

- Pinned canon.
- Relevant entities and states.
- Active threads.
- Knowledge constraints.
- Reference packs.
- Rights/policy.
- Locked invariants.
- Current findings.

This prevents users and agents from relying on an undifferentiated world dump.

## 13.7 Impact previews

Large changes should compute impact asynchronously and summarize:

- Directly affected records.
- Downstream productions.
- Accepted assets.
- Scheduled packages.
- Publications/runtime releases.
- Required re-review.
- Unaffected areas.

## 13.8 Archival and supersession

- Archive reduces active noise without deleting history.
- Superseded objects remain discoverable through lineage.
- Search defaults to current but offers historical scope.
- Cross-property references pin exact versions.

---

# 14. Role-specific experiences

Use the same application architecture with permissions, role queues, saved views, and task-focused surfaces.

| Role | Default experience | Typical authoring commands | Formal decisions | Simplified/mobile emphasis |
|---|---|---|---|---|
| Creator / showrunner | Command Center, Property, Canon, Production | World, arc, scene, style proposals | Canon, creative plan, asset or release when granted | Attention and approval |
| Writer | Arc, Scene Editor, World Bible | Structure and text drafts/proposals | Usually revision acceptance within scope | Comments and text review |
| Editor | Review queues, Scene Editor, Canon Compare | Edit and request revision | Editorial/creative decisions | Exact-version review |
| World builder | World Bible, Timeline, Graph Explorer | Entities, rules, relationships, places | Canon decisions only if delegated | Record review |
| Visual artist | Storyboard, Generation, Library | Recipes, references, candidates, focused edits | Asset creative acceptance if delegated | Candidate review |
| Audio producer | Timecoded editor, Workbench, Library | Script timing, cues, audio candidates | Audio creative acceptance if delegated | Timecoded review |
| Continuity editor | Continuity Console, Timeline, State/Knowledge views | Findings and remediation proposals | Disposition or waiver within authority | Finding triage |
| Rights reviewer | Rights matrix, Library, Release | Rights evidence and restriction updates | Rights clearance or blocker | Expiry alerts and clearance |
| Commerce reviewer | Focused CF review and deep-linked Studio context | Typed commercial findings | Commercial approval only in CF authority | Product/claim review |
| Runtime integrator | Runtime Builder, sandbox, package ledger | Target configuration and content errors | Runtime release acceptance in runtime authority | Deployment status |
| Guest reviewer | Purpose-built Review Room | Comments and revision suggestions | None unless explicitly delegated | Review-only |
| Workspace administrator | Administration and Integration Center | Roles, policies, connections | Administrative decisions, not creative by default | Alerts and revocation |
| Executive / client approver | Task-focused dashboard and Review Room | Minimal or no authoring | Exact delegated approval | Sequence preview and decision |

Separate applications are unnecessary. Separate authority contexts and reduced-complexity views are necessary.

---

# 15. Responsive and mobile architecture

## Large desktop

- Persistent left navigation.
- Large center canvas/editor.
- Persistent right inspector.
- Bottom rail.
- Multi-column compare.
- Full graph/map/timeline editing.
- Asset grids and dense matrices.

## Laptop

- Collapsible navigation.
- Inspector as collapsible panel.
- Bottom rail can become a drawer.
- One primary compare pair at a time.
- Full authoring remains supported.

## Tablet

- Single primary surface.
- Slide-over outline and inspector.
- Storyboard and outline editing supported.
- Graphs primarily read/focus/inspect.
- Drag interactions have command-based alternatives.
- Review and annotations are strong.

## Phone

Use a purpose-built **Decision Inbox**:

```text
My assignments
Review case
Exact version
Preview
Annotations
Diff summary
Rights and blockers
Consequences
Approve / reject / request revision / escalate
Receipt and status
```

Phone supports:

- Review.
- Annotation.
- Approval.
- Revision requests.
- Assignments.
- Alerts.
- Release status.
- Connector status.
- Lightweight text corrections.
- Comments.

Phone should not expose:

- Dense graph editing.
- Full world building.
- Complex migration.
- Multi-track audio editing.
- Large rights matrices.
- Broad asset curation.

No swipe gesture should authorize canon, rights, release, commerce, runtime, or publication.

---

# 16. Shared interface primitives and design-system components

## Context and authority

- Scope breadcrumb.
- Property/production switcher.
- Branch and canon-release pill.
- Authority-host badge.
- Active-role badge.
- Visibility/sensitivity badge.
- Rights-status badge.
- Exact-version and hash chip.

## Object presentation

- Entity card.
- Scene/sequence card with visual thumbnail.
- Location card.
- Evidence artifact card.
- Product snapshot card.
- Asset card.
- Finding card.
- Review-case card.
- Package/publication card.

## Editing and proposal

- Draft/proposal banner.
- Source link block.
- Locked-invariant chips.
- Structured-field editor.
- Rich-text editor frame.
- Rule/condition builder.
- Revision reason field.
- Validation summary.

## Compare and impact

- Semantic diff.
- Media compare.
- Hierarchy diff.
- Branch compare.
- Impact summary.
- Invalidation list.
- Rights-scope diff.
- Package manifest diff.

## Review and decision

- Annotation layer.
- Role-scoped decision bar.
- Consequence preview.
- Typed revision-request form.
- Waiver form with scope and expiry.
- Immutable receipt card.
- Unknown-outcome recovery panel.

## Navigation and scale

- Faceted filter bar.
- Saved-view selector.
- Compact/visual density switcher.
- Virtualized table/list/grid.
- Graph legend and layer control.
- Explicit hidden-count indicator.
- Command palette.
- Recent/pinned objects.

## Reliability and accessibility

- Loading, empty, unavailable, stale, degraded, and permission-denied states.
- Live-region status message.
- Keyboard focus and shortcut hints.
- Reduced-motion and forced-color support.
- Structured fallback for every graph/canvas.
- No color-only lifecycle or severity communication.

---

# 17. Delivery phases

## MVP foundation / current alpha

Preserve and refine:

- Application shell over public Engine contracts.
- Command Center.
- World Bible.
- Arc Board with independent story/presentation coordinates.
- Generation Workbench.
- Continuity Console.
- Review Room.
- Release Builder.
- Responsive navigation.
- Search and deep links.
- Accessibility regression gates.
- Structured Arc view and inspector.

## MVP completion

Add:

- Source Inbox.
- Source-to-canon mapping.
- Canon Proposal Compare and Impact.
- Scene and Sequence Editor.
- Basic Storyboard.
- Asset and Reference Library.
- Reference Pack builder.
- Focused candidate compare and revision.
- Full exact-version Review Room.
- Target rendition matrix and portable package preview.
- Rights visibility and basic matrix.
- Mobile review and approval.

## Intermediate

Add:

- Narrative Flow Graph after semantics acceptance.
- Spatial, relationship, truth/reveal, state, and lineage graph profiles with separate semantics.
- Full Property and Production workspace shells.
- Long-form outline.
- Editorial carousel editor.
- Mission and dialogue editors.
- Runtime compiler sandbox.
- Commerce Foundry focused-review integration.
- Localization/accessibility matrix.
- Collaboration proposals and merge compare.
- Release calendar and reconciliation.
- Integration Center.
- Operational administration.

## Mature

Add:

- Audio timecode and cue editor.
- Video annotations and focused segment replacement.
- Shared-universe dependency workspace.
- Persistent brand-world history.
- Advanced rights withdrawal and correction workflows.
- Procedural recipe and seed simulator.
- Experiment and learning workspace.
- Multi-team collaboration and guest rooms.
- Advanced analytics with uncertainty.
- Enterprise policy, retention, audit, and billing.

## Conditional

Build only when evidence justifies:

- Direct publishing to many channels.
- Real-time presence and collaborative text editing.
- Broad self-service SaaS onboarding.
- Fine-grained personalization.
- Automatic experiment allocation.
- Marketplace or template ecosystem.
- Microservice-specific operational UI.

## Permanent exclusions

Do not build into Studio:

- Commerce catalog authority.
- Commercial publication authority for Commerce Foundry-originated work.
- Game rendering, physics, or player-state editor.
- Runtime execution as Storyworld canon.
- Autonomous AI approval.
- Hidden automatic canon change.
- A generic “everything canvas” replacing structured records.

---

# 18. UX risks and anti-patterns

## 18.1 Generic database application

**Risk:** Every object becomes the same form and table.

**Correction:** Use specialized editors where time, sequence, evidence, state, or media meaning requires them.

## 18.2 One giant canvas

**Risk:** A universal node editor attempts to handle story, geography, knowledge, assets, rights, and releases.

**Correction:** Use per-view graph semantics and structured partner surfaces.

## 18.3 Genre-specific products

**Risk:** Story, Editorial, Interactive, and Commerce become separate applications.

**Correction:** Templates and presets alter language and validation over one core.

## 18.4 Duplicate Commerce Foundry editor

**Risk:** Product and claim truth is editable in both systems.

**Correction:** Use immutable snapshots, deep links, typed findings, and focused receiving-authority review.

## 18.5 Hidden authority

**Risk:** A user cannot tell whether an action creates a draft, accepts canon, approves an asset, authorizes a release, or publishes externally.

**Correction:** Persistent state, authority-host, and consequence language.

## 18.6 AI visual ambiguity

**Risk:** Model output looks accepted.

**Correction:** Candidate/proposal framing, origin, uncertainty, and locked constraints.

## 18.7 Mandatory graph use

**Risk:** Routine work becomes slower and inaccessible.

**Correction:** Structured list, outline, matrix, and editor remain first-class.

## 18.8 Navigation overload

**Risk:** Every domain object becomes a top-level route.

**Correction:** Stable global areas, scoped workspaces, view presets, and contextual navigation.

## 18.9 Source/canon contamination

**Risk:** Restricted notes and extracted claims appear in public outputs.

**Correction:** Separate Source Inbox, visibility model, source-to-canon mapping, and output checks.

## 18.10 Comment/approval conflation

**Risk:** Informal conversation changes lifecycle.

**Correction:** Typed decisions and immutable receipts.

## 18.11 Context loss across surfaces

**Risk:** Moving from graph to editor to review loses selection and exact version.

**Correction:** Stable URLs, synchronized selection, shared inspector, and explicit return context.

## 18.12 Passive dashboards

**Risk:** Dashboards report numbers without helping users act.

**Correction:** Attention-first summaries using defined Engine facts.

## 18.13 Invented readiness scores

**Risk:** Aggregated “health” appears authoritative without defined semantics.

**Correction:** Show concrete blockers and counts; introduce scores only with explicit models and evidence.

## 18.14 Invisible filtering

**Risk:** A graph or table hides consequential records.

**Correction:** Hidden-item counts and impact views that reinclude affected records.

## 18.15 Destructive undo

**Risk:** History is rewritten.

**Correction:** Immutable revisions, supersession, and rollback through new accepted versions.

## 18.16 Separate role applications

**Risk:** Roles lose shared context and product consistency.

**Correction:** Same shell, different permissions, queues, saved views, and focused review surfaces.

---

# 19. Unresolved decisions

1. Amend and disposition `DEC-0028`, including the Arc Flow naming correction.
2. Define the reusable graph-view-profile contract.
3. Decide the canonical rich-text/script representation and semantic diff rules.
4. Decide whether Assertion/Testimony is a first-class reusable primitive.
5. Decide the shared-universe model: parent property, versioned canon module, or explicit property dependency.
6. Define media annotation records across image regions, document ranges, and audio/video timecodes.
7. Define saved-view storage, sharing, and permission invalidation.
8. Define mobile re-authentication requirements for high-consequence approvals.
9. Define external-editor checkout locking and conflict recovery.
10. Define the boundary between direct accepted editing and queued proposals for each object family.
11. Define graph rendering technology only after semantics and accessibility requirements are accepted.
12. Define localization/transcreation acceptance and which changes become adaptation branches.
13. Define release terminology so “released,” “submitted,” “published,” and “runtime accepted” cannot collide.
14. Define collaboration merge semantics before adding real-time presence.
15. Define acceptable analytics uncertainty and experiment governance before personalization.

---

# 20. Recommended prototypes and mockups, in priority order

The order is based on architectural risk and workflow importance, not visual excitement.

1. **Global Shell and State Language**
   - Desktop, laptop, tablet, and phone.
   - Scope, branch, canon release, role, authority host, search, and lifecycle states.

2. **Source Inbox and Source-to-Canon Mapping**
   - Restricted source viewer, extraction candidates, mapping matrix, privacy/rights review.

3. **Canon Proposal Compare, Impact, and Migration**
   - Semantic diff, affected productions/assets/packages, branch target, decision receipt.

4. **Scene and Sequence Editor**
   - Rich authoring, scene-state packet, beats, cast, location, knowledge, locked invariants, findings.

5. **Review Room — Desktop and Mobile**
   - Exact-version sequence, annotations, consequences, role-scoped decision controls.

6. **Release Builder and Rendition Matrix**
   - Targets, accessibility, disclosures, rights, authority host, package verification, receipts.

7. **Generation Workbench — Candidate Compare and Focused Revision**
   - Reference packs, candidate grid, visual compare, mask/region revision, approval impact.

8. **Asset and Reference Library**
   - Faceted grid/list, reference-pack builder, rights and lineage inspector.

9. **Continuity Investigation Console**
   - Finding evidence, state/timeline context, focused remediation, waiver scope.

10. **Narrative Flow Graph**
    - Image-led scene cards, choice nodes, presentation spine, story-time lane, structured fallback.

11. **Spatial Graph and Location Workspace**
    - Map/floor-plan, containment, adjacency, routes, access constraints, scene overlays.

12. **Truth, Assertion, Knowledge, and Reveal Workspace**
    - Matrix, evidence board, reveal graph, audience/character state over time.

13. **Storyboard and Editorial Carousel Editor**
    - Visual sequence cards, per-panel copy, caption, source-safety and continuity.

14. **Audio Timecode Editor**
    - Speaker lanes, dialogue, overlap, silence, music/SFX cues, line replacement.

15. **Localization and Accessibility Matrix**
    - Locale, reading-level, captions, alt text, audio description, target preview.

16. **Integration Center and Runtime/Commerce Validation Sandbox**
    - Package inspect, compile, submit, rejection, revision, receipt, replay.

17. **Shared-Universe Dependency and Adaptation Workspace**
    - Version pins, inherited facts, overrides, impact, migration.

18. **Large-Scale Command Center**
    - Multiple properties, roles, releases, connectors, and explicit concrete blockers.

---

# 21. Final recommendation

Storyworld Studio should not be designed as a graph application with supporting forms. It should be designed as a **governed creative operating environment** in which graphs, documents, boards, matrices, timelines, workbenches, consoles, review rooms, builders, ledgers, and simulators all operate over the same Engine-owned objects and versions.

The unifying user experience is not a visual style or a navigation bar. It is this invariant:

> At every moment, the user can tell what they are looking at, which scope and version it belongs to, whether it is source, draft, proposal, candidate, accepted work, rendition, package, or publication, who has authority over the next decision, what evidence produced it, and what will change if they act.

That architecture can support the full pattern-driven fixture portfolio without collapsing into a generic database UI, a universal canvas, or a family of incompatible genre products.
