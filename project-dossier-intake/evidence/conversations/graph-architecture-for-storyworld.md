The two mockups represent two levels of the same tool:

* The **first image** is the primary **Narrative Explorer — Story Flow View**, with image-led scene cards.
* The **second image** is a compact, cinematic narrative overview suitable for the project dashboard.

Storyworld should not treat every graph as a separate application. The best structure is a **unified Graph Explorer** with specialized views, plus smaller embedded graph previews inside the relevant property and production workspaces.

# Recommended graph architecture

## 1. Narrative Flow Graph

**Purpose:** Show how the authored story moves through episodes, scenes, beats, choices, reveals, and outcomes.

**Interface:**

* Image-led scene cards like the first mockup.
* Scene thumbnail, title, summary, location, characters, story time, and status.
* Solid connectors for primary sequence.
* Dashed connectors for dependencies.
* Split nodes for choices.
* Specialized nodes for reveals, clues, missions, flashbacks, and endings.
* Grouping by episode, chapter, mission chain, campaign release, or act.
* Optional lanes for main plot, subplot, character arc, or branch.
* Selecting a card opens the right-side narrative-unit inspector.

**Location:**

* Primary: `Production → Narrative Explorer`
* Compact preview: `Property Overview`
* Contextual preview: episode, chapter, mission, and campaign pages

**This is the graph shown in the first image.**

---

## 2. Chronology and Temporal Graph

**Purpose:** Separate what happened in the world from the order in which the audience encounters it.

**Interface:**

* Dual or triple synchronized timelines:

  * Story time.
  * Presentation order.
  * Publication or release time.
* Events appear as cards or markers connected to both axes.
* Flashbacks, flash-forwards, repeated events, time jumps, and uncertain dates receive distinct treatments.
* Character age, location, object condition, and knowledge can be displayed as temporal lanes.
* Dragging a release unit changes presentation order without changing story chronology.
* Conflict overlays identify impossible state or timing combinations.

**Location:**

* Primary: `Property → Timeline`
* Production-scoped mode: `Narrative Explorer → View: Chronology`
* Embedded strip beneath the Story Flow graph

The small “Story Time / Presentation Order” strip in the mockup is a compact version of this graph.

---

## 3. Reveal and Knowledge Graph

**Purpose:** Track creator truth, evidence, character beliefs, audience knowledge, secrets, and reveal dependencies.

**Interface:**

Nodes represent:

* Hidden truths.
* Clues and evidence artifacts.
* Testimony or assertions.
* Character beliefs.
* False beliefs.
* Audience conclusions.
* Reveals and confirmations.

The graph can be organized into horizontal lanes:

```text
Creator truth
Evidence and clues
Character knowledge
Character belief
Audience knowledge
Published reveals
```

Edges express relationships such as:

* Supports.
* Contradicts.
* Conceals.
* Causes belief.
* Requires prior reveal.
* May be revealed after.
* Disproves.

A time or episode slider shows the knowledge state at any point in the story.

**Location:**

* Primary: `Property → Truth & Reveals`
* Production view: `Arc Board → Reveal Graph`
* Character inspector: `Knowledge & Beliefs`
* Continuity Console when a spoiler or knowledge conflict is detected

This is especially important for Stillhouse and other mysteries.

---

## 4. Spatial Graph

**Purpose:** Represent the physical structure of a world: containment, adjacency, routes, access, distance, and environmental relationships.

**Interface:**

Depending on the property, it can switch among:

* World map.
* Town or neighborhood plan.
* Building floor plan.
* Abstract location-node graph.
* Runtime navigation reference.

Location nodes should contain:

* Environment image.
* Name and location type.
* Parent location.
* Era or condition.
* Accessible routes.
* Restricted entrances.
* Active scenes and characters.
* Sound or atmosphere profile.

Edges can mean:

* Inside.
* Adjacent to.
* Across from.
* Connected by.
* Visible from.
* Travel route.
* Hidden passage.
* Requires access item.
* Temporarily inaccessible.

Selecting a location highlights all scenes, objects, characters, missions, and state changes associated with it.

**Location:**

* Primary: `Property → Places & World Map`
* Alternate full-screen view: `Graph Explorer → Spatial`
* Scene inspector: small location-context map
* Interactive production: mission and trigger editor

This is the graph that should properly be called a **spatial graph**.

---

## 5. Character and Organization Relationship Graph

**Purpose:** Show interpersonal, familial, organizational, political, and emotional relationships.

**Interface:**

* Portrait-led character nodes.
* Organization and faction nodes use distinct shapes.
* Typed edges for family, friendship, employment, conflict, loyalty, romantic relationship, mentorship, debt, secrecy, and authority.
* Directional relationships where necessary: “trusts,” “reports to,” “protects,” or “believes.”
* Relationship strength and current state.
* Time slider to see relationships change through the story.
* Filters for one character, faction, episode, branch, or historical period.
* Proposed relationships appear visually distinct from accepted canon.

**Location:**

* Primary: `Property → People & Organizations`
* Alternate: `Graph Explorer → Relationships`
* Character page: ego graph centered on the selected character
* Scene Builder: cast relationship preview

The existing “Genealogy Map” should become one preset of this broader relationship graph rather than a separate isolated tool.

---

## 6. Entity and World Knowledge Graph

**Purpose:** Provide a complete typed view of the world’s canon entities and their relationships.

**Interface:**

Nodes can include:

* Characters.
* Organizations.
* Locations.
* Objects.
* Artifacts.
* Vehicles.
* Products.
* Symbols.
* Events.
* Rules.
* Terminology.

Users can filter by entity type, canon status, production, branch, period, or relationship type.

This is more analytical than the visual Story Flow graph. It helps answer questions such as:

* Which characters have handled this object?
* Which locations are tied to this historical event?
* Which symbols appear around June?
* Which rules constrain this entity?
* Which productions depend on this shared fact?

**Location:**

* Primary: `Property → Bible → Graph View`
* Full view: `Graph Explorer → World Graph`
* Search result option: `Show relationships`

---

## 7. State and Continuity Graph

**Purpose:** Track how characters, objects, locations, relationships, and world conditions change through story time.

**Interface:**

A selected entity appears with successive states:

```text
Ledger
Found in wall
→ Held by Mara
→ Pages removed
→ Locked in archive
→ Photographed
```

Each state node records:

* Effective story time.
* Location.
* Owner or possessor.
* Condition.
* Knowledge implications.
* Causing scene or event.
* Superseding state.

The graph can overlay conflicts such as:

* An object existing in two locations.
* A character knowing something too early.
* A damaged prop appearing intact.
* A deceased character appearing after the death event.
* A location using signage from the wrong era.

**Location:**

* Primary: `Continuity Console → State Graph`
* Entity inspector: `History & State`
* Scene Builder: entering-state and exiting-state preview
* Narrative Explorer: optional state overlays

---

## 8. Mission, Quest, and Choice Dependency Graph

**Purpose:** Represent interactive content prerequisites, choices, triggers, mission availability, and authored outcomes.

**Interface:**

Node types include:

* Mission.
* Objective.
* Choice.
* Trigger.
* Required item.
* Required relationship state.
* Outcome.
* Failure condition.
* Unlock.
* Runtime handoff.

Edges express:

* Requires.
* Unlocks.
* Blocks.
* Consumes.
* Grants.
* Activates.
* Mutually exclusive with.
* Reconverges at.

The interface should distinguish:

* Authored narrative definition owned by Storyworld.
* Runtime execution state owned by the game or interactive application.
* Player-specific state, which must not become canon.

**Location:**

* Primary: `Interactive Production → Mission Graph`
* Alternate: `Narrative Explorer → View: Mission Flow`
* Runtime release builder: dependency-validation preview

This is the appropriate graph for BeKindRewind mission chains.

---

## 9. Theme, Motif, and Symbol Graph

**Purpose:** Track recurring symbolic and thematic material across a property.

**Interface:**

* Visual nodes for symbols, motifs, themes, colors, objects, sounds, phrases, and recurring compositions.
* Connections to scenes, characters, locations, reveals, and emotional beats.
* Occurrence cadence across episodes or chapters.
* Public meaning versus creator-only meaning.
* Overuse and underuse warnings.
* First appearance, transformation, reversal, and payoff markers.

For example:

```text
Second chair
→ absence
→ hidden witness
→ suppressed memory
→ final recognition
```

**Location:**

* Primary: `Property → Style & Voice → Motifs`
* Full view: `Graph Explorer → Motif Graph`
* Arc Board: motif overlays
* Continuity Console: symbol-cadence findings

---

# Canon, variation, and shared-world graphs

## 10. Canon Branch and Adaptation Graph

**Purpose:** Show canon ancestry, alternate branches, adaptations, production-local overrides, and retcons.

**Interface:**

* Branch tree or directed acyclic graph.
* Canon releases appear as version nodes.
* Productions attach to the exact canon release they use.
* Adaptations show inherited facts, approved overrides, omissions, and combined characters.
* A comparison mode highlights differences between two branches.
* Impact indicators show which productions would be affected by a proposed canon change.

**Location:**

* Primary: `Property → Canon → Branches & Releases`
* Existing `Branch Manager`
* Production inspector: pinned-canon panel
* Review Room when approving a canon migration

---

## 11. Shared-Universe Dependency Graph

**Purpose:** Manage canon reused across multiple properties or productions.

**Interface:**

* Shared locations, events, characters, rules, or canon modules appear centrally.
* Consuming properties connect to the exact version they reference.
* Authority badges indicate who may change shared material.
* Impact preview shows which properties are affected by a new version.
* Properties can inherit, pin, override, or deliberately fork shared canon.

**Location:**

* Organization or workspace level: `Shared Worlds`
* Property level: `Canon → Dependencies`
* Full view: `Graph Explorer → Cross-Property`

This becomes important when several Storyworld properties occupy the same universe.

---

# Asset and governance graphs

## 12. Asset Lineage and Derivation Graph

**Purpose:** Answer exactly where every asset came from and what was derived from it.

**Interface:**

```text
Source photograph
→ normalized reference
→ generation recipe
→ candidate image
→ accepted master
→ Instagram rendition
→ campaign package
→ published instance
```

Nodes show:

* Thumbnail.
* Version.
* Hash.
* Provider or editor.
* Status.
* Rights readiness.
* Approval state.

Edges show transformations such as:

* Generated from.
* Cropped from.
* Retouched from.
* Localized from.
* Replaced by.
* Included in package.
* Published as.

**Location:**

* Primary: `Assets → Lineage`
* Asset inspector: `Derivation`
* Generation Workbench.
* Release Builder.
* Audit and support views.

---

## 13. Rights, Consent, and Usage Graph

**Purpose:** Show whether an asset or source may legally and operationally be used in a specific way.

**Interface:**

Nodes include:

* Source asset.
* Creator or contributor.
* Person or voice subject.
* Rights grant.
* Consent record.
* Territory.
* Channel.
* Production.
* Published use.
* Expiry or revocation event.

Red or amber overlays identify:

* Expired grants.
* Missing evidence.
* Territory restrictions.
* Print versus social limitations.
* Voice or likeness withdrawal.
* Provider-retention restrictions.
* Assets affected by a revoked right.

**Location:**

* Primary: `Property → Rights & Safety`
* Asset inspector: `Rights`
* Release Builder: clearance graph
* Review Room: rights-review context
* Administration: cross-property rights audit

---

## 14. Review, Approval, and Workflow Graph

**Purpose:** Show how work moves from proposal to approved, locked, published, or rejected.

**Interface:**

Nodes represent lifecycle states and exact-version decisions:

```text
Draft
→ In Review
→ Revision Requested
→ Approved
→ Locked
→ Released
```

The graph displays:

* Current state.
* Available transitions.
* Required approval layers.
* Blockers.
* Decision authority.
* Invalidated approvals after modification.
* Exact hashes covered by each approval.
* Rejection and revision lineage.

**Location:**

* Primary: `Reviews`
* Production footer, like the status rail in the mockups
* Review Room.
* Asset and narrative-unit inspectors.
* Administrative lifecycle configuration

The bottom status rail in the images is a compact representation of this graph.

---

## 15. Release, Publication, and Distribution Graph

**Purpose:** Trace an accepted narrative release into target-specific outputs and destinations.

**Interface:**

```text
Accepted episode
├── Instagram carousel
├── Reel plan
├── Website story
├── Email package
├── Print derivative
└── Runtime release
```

Each target node shows:

* Rendition status.
* Required dimensions or format.
* Accessibility metadata.
* Disclosure requirements.
* Approval readiness.
* Scheduled or published state.
* External receipt.
* Failure or retry status.

**Location:**

* Primary: `Production → Release Builder`
* `Release Calendar`
* Publication inspector.
* Integration health screen

---

# Commerce and learning graphs

## 16. Product Placement and Commerce Graph

**Purpose:** Connect narrative work to pinned product truth without allowing Storyworld to become the commerce authority.

**Interface:**

Nodes include:

* Product snapshot.
* Packaging version.
* Approved claim.
* Prohibited claim.
* Placement contract.
* Scene or panel.
* Narrative asset.
* Commerce review finding.
* Commercial approval.
* Publication.
* Performance observation.

The graph should clearly separate:

* Storyworld creative approval.
* Commerce Foundry commercial approval.
* Publication authorization.

**Location:**

* Primary: `Commerce Production → Placement Graph`
* Commerce Foundry’s Narrative Campaign surface.
* Scene inspector when a product is present.
* Commercial Review Room

---

## 17. Experiment and Learning Graph

**Purpose:** Connect hypotheses, approved variants, releases, observations, and human-reviewed iteration proposals.

**Interface:**

```text
Observation
→ Hypothesis
→ Approved experiment
→ Variant A / Variant B
→ Results
→ Reviewed proposal
```

It should show:

* What was held invariant.
* What was allowed to vary.
* Audience or locale scope.
* Experiment window.
* Sample uncertainty.
* Result source.
* Human decision.
* Whether a winning treatment was adopted, rejected, or retained only as evidence.

It must never imply that performance automatically changes canon.

**Location:**

* Primary: `Insights → Experiments`
* Production results.
* Campaign results.
* Property-level learning history

---

# Recommended unified interface

Rather than placing 17 unrelated graph buttons in the navigation, Storyworld should have a shared **Graph Explorer shell**.

## Global Graph Explorer layout

### Top toolbar

* **View:** Story Flow, Chronology, Spatial, Relationships, Truth & Reveals, State, Assets, Rights, and so forth.
* **Scope:** Property, production, season, episode, branch, character, or selected entity.
* **Group by:** Episode, act, location, character, branch, status, or time.
* **Layers:** Canon, proposals, findings, rights, state, assets, or performance.
* Filters.
* Search.
* Compare.
* Zoom and Fit.
* Auto-layout or manual-layout mode.
* Export snapshot.

### Center canvas

The graph itself, with node treatment based on type:

| Node type     | Recommended visual                         |
| ------------- | ------------------------------------------ |
| Scene or beat | Cinematic screenshot                       |
| Character     | Portrait                                   |
| Location      | Environment image, map, or floor-plan crop |
| Object        | Prop reference image                       |
| Evidence      | Artifact preview                           |
| Choice        | Two outcome previews                       |
| Reveal        | Evidence or symbolic image                 |
| Mission       | Mission artwork or environment preview     |
| Asset         | Exact asset thumbnail                      |
| Rights record | Document and status treatment              |
| Product       | Current packaging reference                |
| Publication   | Channel rendition preview                  |

### Left panel

* View-specific layers.
* Entity-type filters.
* Branch selection.
* Time range.
* Status filters.
* Saved views.
* Legend.

### Right inspector

The inspector should remain consistent across graph types:

* Summary.
* Content.
* Relationships.
* State.
* Versions.
* Reviews.
* Rights.
* History.
* Linked assets.

The right inspector in both mockups already follows this pattern well.

### Bottom contextual strip

Depending on the graph:

* Story time versus presentation order.
* Branch ancestry.
* State progression.
* Approval lifecycle.
* Publication status.
* Rights validity period.

# Recommended navigation placement

```text
Property
├── Overview
├── Bible
├── People & Organizations
├── Places & World Map
├── Objects & Artifacts
├── Timeline
├── Truth & Reveals
├── Style, Voice & Motifs
├── Rights & Safety
├── Productions
├── Assets
├── Insights
└── Graph Explorer
```

```text
Production
├── Brief
├── Arc Board
├── Narrative Explorer
├── Calendar
├── Scripts & Scenes
├── Storyboard
├── Generation Workbench
├── Continuity Console
├── Review Room
├── Release Builder
└── Results
```

# Most important distinction

Storyworld should distinguish **graph type** from **graph visualization**.

For example, the same underlying scene data could appear as:

* A visual card flow.
* A compact node graph.
* A chronological timeline.
* A location-grouped board.
* A character-lane view.
* A dependency-only view.

The first mockup should be retained as the primary **Story Flow** visualization because the image-led cards make the narrative legible to creators. The second should remain the more compact **Overview Timeline** shown on the project dashboard. Neither should be labeled a spatial graph.
