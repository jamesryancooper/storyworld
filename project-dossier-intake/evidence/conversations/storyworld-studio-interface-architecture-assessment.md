# Storyworld Studio Interface Architecture Assessment

## Executive conclusion

**Yes. Storyworld Studio requires several major interface architectures beyond the Graph Explorer.**

The Graph Explorer should be one reusable **projection system** within a broader, authority-centered creative environment. It is excellent for seeing structure, relationships, chronology, space, knowledge, dependencies, lineage, and release flow. It is not the right primary interface for writing prose, reviewing exact versions, comparing candidates, resolving continuity findings, managing source privacy, assembling release packages, or configuring integrations.

The complete Studio should be organized around:

1. **One persistent application shell**
2. **Two primary creative scopes**

   * Property Workspace
   * Production Workspace
3. **A limited vocabulary of reusable task interfaces**

   * Explorers
   * Editors
   * Boards
   * Timelines
   * Matrices
   * Workbenches
   * Consoles
   * Review Rooms
   * Builders
   * Libraries
   * Ledgers
   * Validation sandboxes
4. **One universal proposal-to-decision interaction model**

The unifying requirement is:

> At every moment, a user should know what object and version they are viewing, whether it is source, draft, proposal, candidate, accepted work, rendition, package, or publication; who has authority over the next decision; what evidence produced it; and what will be affected by acting.

The current repository already establishes an unusually strong foundation for this architecture. Studio is implemented as a Next.js client over the governed Engine API, with project-owned design-system components and accessibility checks. Its present alpha surfaces include the Command Center, World Bible, Arc Board, Generation Workbench, Continuity Console, Review Room, and Release Builder.

The most recent repository state available to me, commit `86f431aedc5145916a475f48abe22dc6f5a65cb7`, completes the structured Arc views, synchronized inspector, attention-oriented Command Center, and cross-workspace hierarchy improvements. It also introduces `DEC-0028` as a **proposed**, not yet accepted, graph-semantics decision. No canvas graph has been built under that decision yet.

---

# 1. One immediate correction to the proposed graph architecture

`DEC-0028` currently uses the phrase **“spatial Arc graph.”** That should be amended before acceptance.

The proposed semantics are sound for an **Arc Flow Graph**:

* Narrative units and choice points as nodes
* Presentation-order edges as the main spine
* Dashed choice or branch edges
* Story time represented independently as a lane or node attribute
* Episode containment rather than parent-child edges
* Selection synchronized with the structured inspector
* No consequential action triggered by a graph gesture
* Structured list fallback for accessibility and narrow screens

But this is not a spatial graph in the normal domain sense. A proper **Spatial Graph** represents physical geography and containment:

* A room is inside a building.
* A building is across from another building.
* A route connects two locations.
* An entrance requires a key.
* One location is visible from another.

I recommend amending `DEC-0028` as follows:

### Rename it

**Graph/canvas semantics for the Arc Flow workspace**

or:

**Narrative Flow Graph semantics for the Arc workspace**

### Scope its exclusions

Statements such as these should apply only to the Arc Flow view:

* “Entities, places, and rules are not nodes.”
* “No edge means dependency.”
* “The graph is scoped to one production.”

They must not become global Graph Explorer rules. Locations belong in a Spatial Graph; characters and organizations belong in a Relationship Graph; evidence and beliefs belong in a Knowledge/Reveal Graph; assets belong in a Derivation Graph; and dependencies belong in mission, release, rights, and integration graphs.

### Introduce a reusable graph profile

Each graph view should define a contract conceptually similar to:

```text
GraphViewProfile
├── profile ID
├── applicable scope
├── node types
├── edge types
├── exact edge semantics
├── grouping and containment rules
├── axes and coordinates
├── visual encodings
├── allowed gestures
├── structured fallback
├── inspector mapping
├── hidden-item behavior
└── authority statement
```

This prevents the Graph Explorer from becoming a universal canvas with ambiguous edges.

---

# 2. Major interface architectures Storyworld requires

The complete interface system should use the following reusable paradigms.

| Interface architecture            | Primary job                                             | Representative Storyworld use                        |
| --------------------------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| **Action Dashboard**              | Identify work requiring attention                       | Command Center                                       |
| **Inbox / Queue**                 | Triage assigned or role-specific work                   | Source Inbox, My Reviews, Failed Jobs                |
| **Scoped Workspace**              | Coordinate several tools around one authoritative scope | Property Workspace, Production Workspace             |
| **Structured Record Editor**      | Edit typed entities, rules, rights, or metadata         | Character, location, object, world-rule records      |
| **Document / Script Editor**      | Author long-form or narrative text                      | Chapters, scenes, dialogue, voiceover                |
| **Board / Outline**               | Plan peer items by hierarchy, lane, order, or status    | Arc Board, chapter outline, campaign calendar        |
| **Timeline / Track Editor**       | Work with explicit temporal coordinates                 | Chronology, audio cues, release schedule             |
| **Matrix**                        | Compare multiple dimensions and expose gaps             | Knowledge, rights, localization, rendition matrices  |
| **Graph / Map**                   | Traverse typed relationships                            | Narrative Flow, Spatial, Reveal, Lineage graphs      |
| **Storyboard / Sequence Surface** | Arrange visual or temporal beats                        | Panels, shots, carousel slides                       |
| **Workbench**                     | Iterate through inputs, jobs, candidates, and revisions | Generation Workbench                                 |
| **Console**                       | Investigate and resolve findings or system conditions   | Continuity Console, Integration Health               |
| **Review Room**                   | Make formal exact-version decisions                     | Canon, creative, rights, commerce, runtime reviews   |
| **Builder / Compiler**            | Assemble and validate an output package                 | Release Builder, Runtime compiler                    |
| **Library**                       | Search, browse, compare, and reuse resources            | Asset and Reference Library                          |
| **Ledger**                        | Reconstruct immutable history and receipts              | Canon ledger, approval ledger, publication ledger    |
| **Simulator / Sandbox**           | Test behavior without mutating authority state          | Runtime preview, package validation, seed simulator  |
| **Wizard**                        | Guide infrequent bounded setup tasks                    | Property import, source migration, integration setup |
| **Mobile Decision Surface**       | Review, annotate, approve, and monitor on small screens | Mobile Review Room and Decision Inbox                |

Several important paradigms were missing or underemphasized in the original question:

## Matrix interfaces

Graphs are poor replacements for cross-dimensional comparison. Storyworld needs first-class matrices for:

* Character knowledge by point in story time
* Asset rights by territory, channel, purpose, and date
* Renditions by target and approval status
* Localization by locale and accessibility treatment
* Product claims by scene or placement
* Roles by authority layer
* Canon inheritance and adaptation overrides

## Ledger interfaces

The user must be able to reconstruct:

* Which canon release superseded another
* Which exact version was approved
* Which rights record applied
* Which package was submitted
* Which receiving system accepted or rejected it
* Which publication or deployment receipt came back

A normal activity feed is insufficient for this.

## Validation sandboxes

Several pattern-driven fixtures require testing rather than simply authoring:

* Mission dependencies
* Branch reachability
* Procedural seeds
* Runtime packages
* Locale renditions
* Rights withdrawal
* Product source drift
* Embargo and live-event conditions

These need isolated, non-authoritative simulations.

---

# 3. Consistent interface taxonomy

Storyworld should use interface terms according to their dominant user job.

| Term                    | Use it when…                                                                              | Do not use it when…                              |
| ----------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Application Shell**   | Referring to persistent identity, scope, navigation, search, and layout                   | Describing a domain workspace                    |
| **Workspace**           | Several coordinated tools operate around one property, production, or other durable scope | Referring to one editor or panel                 |
| **Dashboard**           | Summarizing concrete facts and actionable attention items                                 | Displaying passive vanity metrics                |
| **Explorer**            | The user finds, traverses, filters, and inspects existing structure                       | The primary job is changing one artifact         |
| **Editor**              | The user changes one principal object or document                                         | The user is assembling an output from many parts |
| **Board**               | The user arranges structured peer items by lane, hierarchy, order, or status              | Spatial position has undefined meaning           |
| **Timeline**            | Time or duration is an explicit coordinate                                                | Merely showing a list in date order              |
| **Matrix**              | The user compares intersections of two or more dimensions                                 | Showing a simple one-dimensional table           |
| **Workbench**           | The user runs an iterative production loop involving candidates and revisions             | Making a formal approval                         |
| **Console**             | The user investigates evidence, failures, findings, or operational state                  | Routine content authoring                        |
| **Inspector**           | Displaying contextual detail about the current selection                                  | Hiding an independent secondary editor           |
| **Review Room**         | A formal, exact-version decision can be made                                              | Displaying informal comments                     |
| **Builder**             | The user assembles a validated output from authoritative inputs                           | Writing the original content                     |
| **Compiler**            | Transforming approved source into a target-specific immutable package                     | Executing the target runtime                     |
| **Library**             | Searching and reusing many source, asset, reference, or template objects                  | Managing only the current production sequence    |
| **Inbox / Queue**       | Work is waiting for a person or role                                                      | Displaying general project navigation            |
| **Wizard**              | Performing infrequent setup, import, migration, or connection work                        | Daily authoring                                  |
| **Preview**             | Rendering an exact version for inspection without independent authority                   | Creating another editable master                 |
| **Compare / Diff**      | Understanding differences between exact versions or branches                              | Showing an unversioned before/after mockup       |
| **Ledger**              | Viewing append-only history, decisions, receipts, and supersession                        | Editing records in place                         |
| **Simulator / Sandbox** | Testing a package, branch, seed, runtime, or policy without authoritative mutation        | Running production silently                      |

---

# 4. Recommended application shell

The dossier already anticipates global areas for Command Center, Properties, Productions, Library, Reviews, Release Calendar, Insights, Integrations, and Administration.

That is the correct mature navigation architecture.

## Global navigation

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

Administration and Insights may be hidden based on role, but the overall information model should remain stable.

## Persistent top bar

The top bar should contain:

* Organization and workspace selector
* Property and production breadcrumbs
* Active branch
* Pinned canon release
* Authority-host indicator
* Global search
* Command palette
* Assignments and notifications
* Active identity and role
* Connector or degraded-state indicator
* Help and keyboard-shortcut access

The complete scope should be URL-owned and shareable:

```text
Organization
→ Workspace
→ Property
→ Production
→ Narrative unit
→ Exact version
```

The interface must not silently substitute another property or production when the requested scope is inaccessible.

## Main frame

### Left side

One contextual system at a time:

* Navigation
* Outline
* Filters
* Graph layers
* Collections
* Saved views

### Center

The primary task surface:

* Editor
* Board
* Graph
* Matrix
* Timeline
* Workbench
* Console
* Review sequence
* Preview

### Right inspector

A consistent object inspector should support tabs such as:

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

Editing from the inspector should open a clearly labeled draft or proposal experience. The inspector should never become a hidden second source of truth.

### Bottom rail

Context-sensitive rather than permanently generic:

* Story time versus presentation order
* Audio or video timecodes
* Generation queue
* Lifecycle and approval stages
* Branch ancestry
* Rights-validity period
* Release and delivery status

## Focus modes

Studio should support reusable view modes:

* **Write**
* **Plan**
* **Inspect**
* **Compare**
* **Review**
* **Present**

These change layout and emphasis, not authority or data semantics.

## Saved layouts

A saved view may preserve:

* Scope
* Filters
* Columns
* Grouping
* Density
* Inspector tab
* Graph layers
* Panel dimensions
* Sort order

A saved layout must still be re-evaluated against current permissions and sensitivity access.

---

# 5. Complete information architecture

```text
Storyworld Studio
├── Command Center
│   ├── My work
│   ├── Attention required
│   ├── Active productions
│   ├── Upcoming releases
│   ├── Workflow and connector health
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
│       │   ├── Objects, artifacts, products, symbols
│       │   ├── Timeline and events
│       │   ├── Truth, assertions, beliefs, knowledge
│       │   ├── Reveals, clues, evidence
│       │   ├── Voice, style, motifs, references
│       │   └── Rights, consent, safety
│       ├── Canon Workspace
│       │   ├── Proposals
│       │   ├── Branches and releases
│       │   ├── Compare and diff
│       │   ├── Impact and migration
│       │   ├── Shared-universe dependencies
│       │   └── Canon ledger
│       ├── Graph Explorer
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
│       ├── Calendar
│       ├── Scene and Sequence Editor
│       ├── Storyboard
│       ├── Dialogue and mission editors
│       ├── Generation Workbench
│       ├── Continuity Console
│       ├── Review Room
│       ├── Release Builder
│       ├── Results and Insights
│       └── Settings
│
├── Library
│   ├── Sources
│   ├── Reference packs
│   ├── Assets
│   ├── Renditions
│   ├── Collections
│   ├── Templates
│   └── Lineage
│
├── Reviews
│   ├── My queue
│   ├── Team queues
│   ├── Canon
│   ├── Creative
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
│   ├── Channels
│   ├── Storage
│   ├── Webhooks and API clients
│   ├── Health and reconciliation
│   └── Validation sandboxes
│
└── Administration
    ├── Organizations and workspaces
    ├── Membership and guests
    ├── Roles and authority policies
    ├── Templates and vocabularies
    ├── Providers, allowlists, and budgets
    ├── Rights, retention, and disclosure policy
    ├── Credentials and signing keys
    ├── Usage and billing
    ├── Audit
    └── Backup, restore, export, and deletion
```

---

# 6. Core workspaces

| Workspace                       | Primary architecture                     | Central responsibility                              | Graph relationship                       | Mobile          | Phase                   |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------- | ---------------------------------------- | --------------- | ----------------------- |
| **Command Center**              | Dashboard + queue                        | Route users to concrete attention items             | Compact previews and deep links          | Excellent       | Present                 |
| **Property Workspace**          | Scoped workspace                         | Durable property and canon                          | Hosts property-level graph views         | Read/review     | Intermediate shell      |
| **Production Workspace**        | Scoped workspace                         | Bounded production pinned to canon                  | Hosts narrative and production graphs    | Review/status   | Partial present         |
| **Source Inbox**                | Queue + document viewer + mapping matrix | Source classification and source-to-canon proposals | Feeds source/evidence lineage            | Triage          | MVP next                |
| **World Bible**                 | Explorer + record editor                 | Entities, rules, chronology, voice, state           | Records synchronize with focused graphs  | Moderate        | Basic present           |
| **Canon Workspace**             | Compare + impact + ledger                | Proposals, releases, branches, migration            | Canon branch and dependency graphs       | Review          | MVP next                |
| **Narrative Explorer**          | Explorer + list + graph                  | Understand structure through projections            | Primary home of Story Flow               | List fallback   | Structured view present |
| **Arc Board**                   | Board + outline                          | Plan hierarchy, order, threads, choices             | Synchronized with Narrative Flow         | Limited editing | Present                 |
| **Scene and Sequence Editor**   | Document editor + structured inspector   | Author actual narrative units                       | Opens from selected graph card           | Light editing   | MVP next                |
| **Storyboard**                  | Visual sequence + timeline               | Panels, shots, interactions, cues                   | Provides visual thumbnails to flow graph | Review          | MVP/intermediate        |
| **Generation Workbench**        | Workbench                                | Recipes, jobs, candidates, focused revision         | Uses lineage graph                       | Review/status   | Basic present           |
| **Asset and Reference Library** | Library + lineage + inspector            | Reuse and govern assets and references              | Hosts derivation/usage graphs            | Strong          | MVP next                |
| **Continuity Console**          | Investigation console                    | Findings, evidence, remediation, waiver             | Opens focused state/knowledge graphs     | Triage          | Basic present           |
| **Review Room**                 | Exact-version review + compare           | Formal decisions and revision requests              | Graph offers context, never approval     | Priority mobile | Basic present           |
| **Release Builder**             | Builder + matrix + preview + ledger      | Renditions, packages, submissions, receipts         | Release/distribution graph               | Status/approval | Basic present           |
| **Results and Insights**        | Dashboard + matrix + experiment builder  | Observations to reviewed proposals                  | Experiment/learning graph                | Strong summary  | Mature                  |
| **Integration Center**          | Console + wizard + sandbox + ledger      | Configure and reconcile integrations                | Package and service-flow graphs          | Status only     | Intermediate            |
| **Administration**              | Console + policy editor + matrix         | Identity, policy, budgets, retention, operations    | Authority/dependency views               | Alerts          | Intermediate/mature     |

The Source Inbox is particularly important. The canonical workflow says imported material is stored verbatim in a restricted inbox, classified for ownership and sensitivity, converted into proposed structured information, and only then accepted, revised, restricted, branched, or rejected by a person. Extraction alone must never create canon.

---

# 7. Specialized authoring interfaces

A generic form renderer should handle ordinary metadata, administrative settings, and optional custom fields. It should not be the default for every creative object.

| Object or domain     | Primary interface                               | Supporting interface                                                         |
| -------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| Character            | Structured record editor with rich notes        | Portrait/reference pack, relationship graph, knowledge matrix, state history |
| Location             | Structured record plus map or floor-plan editor | Spatial graph, era variants, scene usage                                     |
| Object or artifact   | Record with image and state history             | Ownership/location timeline, evidence links                                  |
| Product              | Read-only pinned product snapshot               | Placement editor, claims/depictions matrix                                   |
| Symbol or motif      | Structured motif record                         | Occurrence timeline, secret/public meaning, cadence graph                    |
| World rule           | Rule editor with scope and exceptions           | Impact preview and validator simulation                                      |
| Voice profile        | Example-based voice editor                      | Copy preview, prohibited-language comparison                                 |
| Visual style         | Token and reference-pack editor                 | Mood board, negative references, composition preview                         |
| Timeline event       | Timeline and table hybrid                       | Multiple time-coordinate matrix                                              |
| Knowledge and belief | Matrix plus assertion records                   | Reveal graph and POV filtering                                               |
| Reveal and evidence  | Evidence board and dependency editor            | Reveal graph and audience-knowledge timeline                                 |
| Branch and choice    | Structured choice editor                        | Narrative Flow graph and branch-state matrix                                 |
| Mission and trigger  | Preconditions/effects builder                   | Dependency graph and runtime sandbox                                         |
| Dialogue tree        | Script editor plus conditional outline          | Node graph as secondary view                                                 |
| Editorial carousel   | Panel storyboard                                | Per-panel copy, caption, privacy checklist                                   |
| Long-form chapter    | Hierarchical outline and rich-text editor       | Thread margin, timeline, chapter compare                                     |
| Audio script         | Timecoded document with speaker and cue lanes   | Waveform preview and segment replacement                                     |
| Commerce placement   | Placement-contract editor                       | Product/claim snapshot and CF handoff                                        |
| Localization         | Source-target editor and rendition matrix       | Glossary and device/accessibility preview                                    |
| Rights and consent   | Grant editor and rights matrix                  | Expiry timeline, impact preview, immutable ledger                            |

## Why contested truth needs a matrix

The fixture corpus explicitly requires Storyworld to preserve distinctions among:

* Retrieved source material
* Production canon
* Fixture-only canon
* Creator-only truth
* Public story knowledge
* Character knowledge
* Character belief
* Speaker assertion
* Evidence-supported claim
* Restricted source material
* Policy constraints
* External runtime or channel state
* Observation
* Proposal
* Decision
* Approval
* Receipt

Flattening those categories into one canon collection would produce semantically invalid work even if the data were structurally valid.

A generic graph alone cannot manage that safely. Storyworld needs a **Truth and Knowledge Matrix** paired with the Reveal Graph.

---

# 8. Universal interaction architecture

Every consequential action should follow the same sequence:

```text
Observe exact state
→ Enter draft or proposal
→ Validate structure, rights, and policy
→ Compare with the current accepted version
→ Preview impact and invalidations
→ Confirm role and authority
→ Execute an idempotent command
→ Receive an immutable receipt
→ Reconcile visible state
```

## State distinctions

The design system should provide unmistakable treatments for:

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

The dossier already requires accepted canon, drafts, candidates, approved masters, renditions, and published instances to remain visually unmistakable; AI work should appear as a proposal, preview, or diff; changes should be versioned or reversible; and locked constraints should remain visible.

## Exact-version review

Every Review Room should show:

* Stable object ID
* Exact version
* Branch
* Hash where appropriate
* Source version
* Reference-pack version
* Policy version
* Rights version
* Authority host
* Decisions already granted
* Decisions invalidated by change
* Consequences of approval or rejection

## Focused revision

A finding or annotation should open the smallest useful revision scope:

1. Identify the affected component.
2. Preserve locked invariants.
3. Preview approval and package invalidation.
4. Edit or regenerate only that region, panel, line, shot, or field.
5. Re-run affected checks.
6. Compare with the accepted sequence.
7. Accept as a new version or reject without losing prior evidence.

## Comments versus decisions

* Comment: discussion only
* Suggestion: proposed edit
* Revision request: formal requested change
* Approval: typed exact-version decision
* Waiver: scoped, reasoned, expiring exception
* Receipt: immutable record of the decision

A comment saying “looks good” must never change state.

---

# 9. Graphs and non-graph interfaces

Every graph should have a paired structured interface.

| Graph            | Paired non-graph interface                      |
| ---------------- | ----------------------------------------------- |
| Narrative Flow   | Arc Board and structured outline                |
| Chronology       | Timeline table and coordinate matrix            |
| Spatial          | Map/floor plan and location records             |
| Relationships    | Character records and relationship table        |
| Truth and Reveal | Knowledge matrix and evidence board             |
| State            | Entity state history                            |
| Mission          | Mission builder and preconditions/effects table |
| Canon Branch     | Canon compare and migration view                |
| Shared Universe  | Versioned dependency matrix                     |
| Asset Lineage    | Asset Library and provenance inspector          |
| Rights           | Rights matrix and grant ledger                  |
| Release          | Release Builder and package ledger              |
| Commerce         | Placement editor and focused CF review          |
| Experiment       | Experiment builder and result matrix            |

The graph must use the same object IDs, selection, filters, and inspector as the non-graph representation.

Consequential edits should normally occur in:

* The structured editor
* A proposal panel
* A compare/impact surface
* The Review Room

not through an unlabeled drag or edge gesture.

---

# 10. Narrative architecture pattern matrix

The packet now spans 31 fixtures across formal F1 fixtures, property fixtures, schema probes, and full post-F1 patterns. It specifically tests branching, contested truth, nonlinear chronology, adaptation, shared canon, deep hierarchy, evidence correction, rights change, localization, audio, audience influence, conversational runtime boundaries, experiments, persistent branded worlds, collaboration, procedural production, learning pathways, live windows, regional cuts, generational state, simulations, and concept albums.  

| Pattern                     | Reusable interfaces                           | Specialized treatment                                 |
| --------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| Linear serialized fiction   | Arc Board, Scene Editor, Storyboard, Review   | Episode grouping and reveal overlays                  |
| Branching and reconvergence | Arc Board, Scene Editor, Continuity           | Choice editor, branch-state matrix, flow graph        |
| Nonlinear chronology        | Arc Board, Timeline, Scene Editor             | Story/presentation coordinate comparison              |
| Contested truth             | Source Inbox, World Bible, Canon, Review      | Assertion editor, knowledge matrix, reveal graph      |
| Adaptation                  | Canon Workspace, Production Workspace         | Inheritance, overrides, omissions, migration compare  |
| Shared universe             | Property and Canon workspaces                 | Dependency pins and cross-property impact             |
| Long-form book              | Outline, document editor, timeline            | Deep hierarchy and stable IDs                         |
| Editorial carousel          | Storyboard, Review                            | Panel strip, captions, dignity and privacy checks     |
| Field manual                | Template-driven outline and panel editor      | Scenario/principle/exercise/takeaway structure        |
| Collectible cards           | Library and record editor                     | Card grid, numbering, stable template                 |
| Audio-first                 | Scene Editor, Workbench, Review, Release      | Speaker/cue lanes, timecodes, overlap, silence        |
| Interactive missions        | World Bible, Mission Builder, Compiler        | Preconditions, effects, triggers, runtime sandbox     |
| Commerce campaign           | Production, Storyboard, Release               | Placement contract, claims/depictions, CF handoff     |
| Audience-directed story     | Arc Board, Insights, Review                   | Poll observation and authorized branch selection      |
| Persistent brand universe   | Property, Canon, Production, Commerce         | Product snapshot history and selective drift          |
| Procedural content          | Template, Workbench, Continuity               | Rule editor, seed simulator, candidate ledger         |
| Localization                | Release, Library, Review                      | Rendition matrix and source-target compare            |
| Collaborative authorship    | Editors, Review, Canon                        | Proposal branches, merge compare, conflict resolution |
| Rights withdrawal           | Rights, Continuity, Release                   | Selective invalidation and replacement workflow       |
| Factual correction          | Source, Canon/claims, Release                 | Correction/retraction ledger                          |
| Generational saga           | Timeline, World Bible, State                  | Aging, inheritance, and multi-decade lanes            |
| Concept album               | Production, audio editor, Storyboard, Release | Track order, motif matrix, cross-media dependencies   |

The invariant is not that every pattern uses the same screen. It is that every screen uses the same underlying identity, canon, time, state, rights, provenance, version, and authority semantics.

---

# 11. Modes, templates, and views

Story, Editorial, Interactive, and Commerce should **not** become four global application products.

Use a layered system.

## Property template

Controls:

* Vocabulary
* Default Bible sections
* Recommended graphs
* Required safety and rights checks
* Suggested production templates

## Production template

Controls:

* Hierarchy labels
* Allowed unit types
* Required outputs
* Default editors
* Validators
* Review layers
* Release targets

## View preset

Controls:

* Visible panels
* Filters
* Grouping
* Density
* Graph layers
* Inspector tabs
* Saved layout

## Integration context

Controls:

* Authority host
* External snapshots
* Required package format
* Receiving review
* Source-drift behavior

## Permission profile

Controls:

* Visible restricted sources
* Allowed commands
* Approval layers
* Administrative capabilities

An onboarding choice labeled Story, Editorial, Interactive, or Commerce can create templates and presets. It should not route the user into a different storage model or hidden application fork.

---

# 12. Scale and complexity

A graph with thousands of nodes is not a useful answer to scale.

Storyworld should support large properties through:

* Server-side search and facets
* Stable deep links
* Current versus superseded result labeling
* Virtualized lists, grids, outlines, and canvases
* Scope reduction by property, production, branch, time, type, status, and visibility
* One- or two-hop graph expansion
* Explicit hidden-item counts
* Collapsible hierarchy
* Aggregated rollups
* Visual, compact, table, outline, graph, and timeline density modes
* Saved views
* Asynchronous impact calculation
* Context compilation for the selected scene or task
* Exact version pins for cross-property references
* Archival and supersession rather than destructive deletion

For a scene, Studio should compile a bounded working context containing:

* Pinned canon
* Relevant entities
* Entering state
* Active threads
* Character knowledge
* References
* Rights and policy
* Locked invariants
* Current findings

That is more useful than exposing the entire property to every editor or model.

---

# 13. Role-specific architecture

The same Studio can serve all roles through permissions, queues, saved views, and reduced-complexity review surfaces.

| Role                        | Primary workspaces                                      | Typical authority                                         |
| --------------------------- | ------------------------------------------------------- | --------------------------------------------------------- |
| Creator / showrunner        | Command Center, Property, Canon, Production             | Canon and creative decisions when granted                 |
| Writer                      | Arc, Scene Editor, World Bible                          | Draft and structure proposals                             |
| Editor                      | Review, Scene Editor, Canon Compare                     | Editorial and creative decisions                          |
| World builder               | World Bible, Timeline, Graph Explorer                   | Canon proposals or delegated canon authority              |
| Visual artist               | Storyboard, Generation, Library                         | Candidate production and creative acceptance if delegated |
| Audio producer              | Timecoded editor, Workbench, Library                    | Audio candidate and creative acceptance if delegated      |
| Continuity editor           | Continuity Console, Timeline, state and knowledge views | Findings and scoped dispositions                          |
| Rights reviewer             | Rights matrix, Library, Release                         | Rights clearance and blockers                             |
| Commerce reviewer           | Focused Commerce Foundry review                         | Commercial approval in Commerce Foundry                   |
| Runtime integrator          | Runtime Builder and sandbox                             | Runtime acceptance in the runtime authority               |
| Guest reviewer              | Purpose-built Review Room                               | Comments and recommendations only unless delegated        |
| Administrator               | Administration and Integrations                         | Administrative policy, not creative authority by default  |
| Executive / client approver | Decision dashboard and Review Room                      | Exact delegated approval                                  |

Commerce Foundry should receive a native-feeling Narrative Campaigns entry and focused review component, but complex narrative authoring remains in Studio. Product truth, claims, commercial approval, and commerce publication remain in Commerce Foundry.

---

# 14. Responsive architecture

## Large desktop

* Persistent navigation
* Large central editor or canvas
* Persistent right inspector
* Bottom rail
* Multi-column compare
* Full graph, map, and timeline authoring

## Laptop

* Collapsible navigation
* Collapsible inspector
* Drawer-based bottom rail
* One primary compare pair
* Full authoring retained

## Tablet

* One primary surface
* Slide-over outline and inspector
* Storyboard and outline editing
* Graph read/focus/inspect
* Command alternatives to dragging

## Phone

A purpose-built **Decision Inbox**:

```text
Assignment
Exact version
Preview
Diff summary
Annotations
Rights and blockers
Consequences
Formal decision
Receipt
```

Phone should support:

* Review
* Annotation
* Approval
* Revision request
* Assignment
* Alerts
* Release status
* Comments
* Lightweight text correction

Phone should not attempt dense graph editing, complex canon migration, full world building, or multi-track audio editing.

The existing product definition already places review, annotation, approval, release status, alerts, and basic analytics on mobile while reserving full world building and media authoring for desktop-oriented interfaces.

---

# 15. Delivery phases

## Current V1 alpha foundation

Already present or substantially represented:

* Engine-backed application shell
* Command Center
* World Bible
* Arc Board
* Structured Arc views and inspector
* Generation Workbench
* Continuity Console
* Review Room
* Release Builder
* Responsive navigation
* Search and deep links
* Accessibility regression checks

## MVP completion

Add next:

* Source Inbox
* Source-to-canon mapping
* Canon compare and impact
* Scene and Sequence Editor
* Basic Storyboard
* Asset and Reference Library
* Reference Pack builder
* Candidate compare and focused revision
* Full exact-version Review Room
* Rights visibility and basic rights matrix
* Rendition matrix and portable-package preview
* Mobile review and approval

## Intermediate

* Narrative Flow Graph
* Spatial Graph
* Relationship Graph
* Truth/Reveal Graph
* State and Lineage Graphs
* Full Property and Production shells
* Long-form editor
* Editorial carousel editor
* Mission and dialogue editors
* Runtime compiler sandbox
* Commerce Foundry focused review
* Localization and accessibility matrix
* Collaboration proposals and merge compare
* Integration Center
* Release calendar and reconciliation

## Mature

* Audio timecode and cue editor
* Video annotations
* Shared-universe dependency workspace
* Persistent branded-world history
* Advanced rights withdrawal and factual correction
* Procedural rule and seed simulator
* Experiments and learning
* Multi-team collaboration
* Enterprise administration, audit, retention, and billing

## Conditional

Only after evidence justifies them:

* Direct publication across many platforms
* Real-time collaborative editing and presence
* Broad self-service SaaS onboarding
* Fine-grained personalization
* Automatic experiment allocation
* Marketplace or template ecosystem

## Permanent exclusions

* Commerce catalog authority in Studio
* Player state as canon
* Game rendering or physics editing
* Autonomous AI approval
* Silent canon change
* Universal freeform canvas replacing structured records

---

# 16. Primary risks

The largest UX and architecture risks are:

1. Treating every object as a generic form
2. Building one giant canvas for every task
3. Creating separate genre products
4. Duplicating the Commerce Foundry editor
5. Hiding lifecycle or authority state
6. Styling AI work like accepted work
7. Making graphs mandatory
8. Overloading global navigation
9. Mixing restricted sources with public canon
10. Treating comments as approvals
11. Losing scope and version when moving between views
12. Using passive dashboards instead of attention queues
13. Inventing undefined readiness scores
14. Hiding filtered consequential records
15. Implementing destructive undo
16. Giving administrators implicit creative authority
17. Using graph position as canon without defined semantics
18. Allowing a package to appear published merely because it was built

---

# 17. Unresolved decisions

The most important decisions still requiring explicit disposition are:

* Amend and accept, defer, or reject `DEC-0028`
* Establish the reusable graph-view-profile contract
* Select the canonical rich-text and script representation
* Decide whether Assertion/Testimony is a first-class domain primitive
* Resolve the shared-universe dependency model
* Define media annotation records
* Define saved-view persistence and sharing
* Define mobile re-authentication for high-consequence decisions
* Define external-editor checkout and conflict handling
* Define localization versus adaptation boundaries
* Define release, submission, publication, and runtime-acceptance vocabulary
* Define collaboration and merge semantics before real-time editing
* Define uncertainty and ethical limits for experiments

---

# 18. Prioritized interface mockups

The next mockups should be created in this order, based on architectural risk:

1. **Global Shell and State Language**
2. **Source Inbox and Source-to-Canon Mapping**
3. **Canon Proposal Compare, Impact, and Migration**
4. **Scene and Sequence Editor**
5. **Review Room on Desktop and Phone**
6. **Release Builder and Rendition Matrix**
7. **Generation Workbench Candidate Compare and Focused Revision**
8. **Asset and Reference Library**
9. **Continuity Investigation Console**
10. **Narrative Flow Graph with image-led scene cards**
11. **Spatial Graph and Location Workspace**
12. **Truth, Assertion, Knowledge, and Reveal Workspace**
13. **Storyboard and Editorial Carousel Editor**
14. **Audio Timecode Editor**
15. **Localization and Accessibility Matrix**
16. **Integration Center and Runtime/Commerce Validation Sandbox**
17. **Shared-Universe Dependency and Adaptation Workspace**
18. **Large-Scale Command Center**

The existing image-led Narrative Explorer mockup is an excellent direction for item 10. Each card should remain a structured narrative object with its own screenshot, title, summary, state, location, characters, and status. It should not replace the structured Arc list, Scene Editor, or Review Room.

# Final position

Storyworld Studio should not be conceived as a graph application with supporting forms.

It should be a **governed creative operating environment** in which graphs, documents, boards, matrices, timelines, workbenches, consoles, review rooms, builders, ledgers, and sandboxes all operate over the same Engine-owned objects and exact versions.

[Download the complete Storyworld Studio Interface Architecture report](sandbox:/mnt/data/Storyworld_Studio_Interface_Architecture.md)
