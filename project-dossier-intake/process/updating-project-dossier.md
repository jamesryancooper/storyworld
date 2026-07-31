**Yes—but not by copying every document verbatim into the canonical dossier.**

The project dossier should become the **authoritative synthesis and navigation layer** for this work, while the detailed reports remain versioned supporting artifacts. The repository already treats the dossier as product documentation rather than permission, and keeps decisions, tasks, evidence, contracts, and implementation in their own governed locations.

## Recommended structure

### 1. Add durable conclusions to the canonical dossier

The canonical Storyworld product definition should absorb the stable conclusions from the newer work:

* Complete Storyworld Studio interface-architecture strategy.
* Property Workspace versus Production Workspace.
* Interface taxonomy: Explorer, Editor, Board, Workbench, Console, Review Room, Builder, Ledger, Sandbox, and so forth.
* Global application shell and information architecture.
* Graph Explorer as one projection architecture—not the entire Studio.
* Narrative-architecture pattern coverage.
* Required structured alternatives to graphs and canvases.
* Exact-version review and authority-centered interaction model.
* Canonical document independence from editor libraries.
* Project-owned graph semantics and annotation targeting.
* Dependency philosophy and build-versus-buy principles.
* MVP, intermediate, mature, and conditional capability phases.
* Accessibility, mobile, scale, and responsive principles.
* Commerce Foundry and interactive-runtime boundaries.
* Major unresolved technical and product decisions.

These points are durable product and architecture direction. They belong in the canonical dossier because future engineers should not need to reconstruct them from conversation history.

### 2. Keep the full reports as supporting dossier artifacts

Do **not** paste the entire interface report, technical-enablement dossier, dependency register, or every fixture into the canonical narrative.

Keep them as separate, versioned documents, for example:

```text
project-dossier/
├── canonical/
│   └── storyworld/
│       ├── product-direction.md
│       ├── studio-interface-architecture.md
│       ├── technical-enablement-strategy.md
│       ├── narrative-architecture-coverage.md
│       └── dependency-roadmap.md
│
├── assessments/
│   ├── studio-interface-architecture-report.md
│   ├── technical-enablement-dossier.md
│   ├── dependency-recommendation-register.json
│   ├── technical-poc-plan.md
│   └── studio-ux-audit.md
│
├── fixtures/
│   └── fixture-authoring-packet/
│
└── owner-input/
    └── owner-decision-questionnaire.md
```

The canonical dossier should summarize and link to these rather than duplicate them.

## 3. Put decisions in decision records, not merely in the dossier

A dossier statement should not silently convert a recommendation into an accepted architectural decision.

Examples requiring governed decisions include:

* Amending `DEC-0028` from “spatial Arc graph” to **Narrative Flow Graph**.
* Adopting `GraphViewProfile`.
* Selecting the canonical `StoryDocument` representation.
* Choosing ProseMirror, Lexical, or another editor foundation.
* Defining the common annotation model.
* Choosing the production identity and session architecture.
* Adopting TanStack Query or another server-state layer.
* Introducing SSE.
* Selecting graph renderer and layout technologies.
* Establishing media-worker and FFmpeg policy.
* Defining shared-universe dependency semantics.
* Deciding whether Assertion/Testimony becomes a first-class domain primitive.

These should appear in the dossier as **accepted**, **proposed**, **deferred**, or **unresolved**, with links to their ADR or decision records. The repository currently lists `DEC-0001` through `DEC-0027` as accepted, while `DEC-0028` remains proposed and awaits owner disposition.

## 4. Put implementation obligations into plans and tasks

The dossier should explain the intended sequence, but executable work belongs in governed plans and tasks.

For example:

* Interface-shell implementation.
* Source Inbox prototype.
* Scene Editor proof of concept.
* Graph renderer prototype.
* Annotation model prototype.
* Media proxy worker.
* Search-index evolution.
* Mobile Review Room.
* Runtime validation sandbox.
* Commerce Foundry focused-review integration.

Each should have dependencies, fixtures, acceptance criteria, validation commands, and evidence expectations.

## 5. Keep fixture content in the fixture system

The fixture packet should inform the canonical product model, but the complete creative fixture data belongs under the contract fixtures and golden-corpus structure.

The dossier should retain:

* Why pattern-driven coverage exists.
* Fixture classifications.
* Which patterns are F1 probes versus post-F1 fixtures.
* The success condition for broad extensibility.
* Links to the machine-readable fixture registry and coverage matrix.

It should not reproduce all 31 fixture narratives. The packet itself already distinguishes formal F1 fixtures, schema probes, and post-F1 production fixtures. 

## 6. Treat the questionnaire as owner-input material

The owner questionnaire should not become canonical merely because it exists.

Its answers should flow into:

```text
Owner answer
→ proposed decision or clarified requirement
→ impact review
→ owner acceptance
→ canonical dossier update
→ plan/task update
```

The unanswered questionnaire can be stored in an `owner-input`, `working`, or `decision-inputs` area. Once answers are dispositioned, the durable conclusions should be integrated into the correct canonical sections.

## What should not be added directly

Avoid placing these verbatim in the canonical dossier:

* Raw brainstorming.
* Repeated conversation summaries.
* Every candidate library evaluation.
* Full package-comparison tables.
* Disposable prototype implementation details.
* Unanswered questions.
* Temporary technical assumptions.
* Generated checksums.
* Validation logs.
* Full fixture source text.
* Recommendations that have not yet been accepted.
* Implementation status inferred from planned architecture.

Those belong in assessments, evidence, plans, tasks, fixtures, or decision proposals.

# Recommended dossier update

I would create or substantially revise five canonical sections:

1. **Storyworld Studio Interface Architecture**
2. **Pattern-Driven Narrative Architecture Coverage**
3. **Technical Enablement and Dependency Strategy**
4. **Accessibility, Scale, and Responsive Architecture**
5. **Interface and Technical Dependency Roadmap**

Then add a supporting-artifact registry containing:

* Studio UX audit.
* Interface-architecture report.
* Technical-enablement dossier.
* Dependency recommendation register.
* Proof-of-concept plan.
* Fixture-authoring packet.
* Coverage and metamorphic-test matrices.
* Owner-decision questionnaire.
* Existing mockups and their status.

The correct principle is:

> **Canonicalize the conclusions, register the full evidence, and govern the decisions—do not turn the dossier into an undifferentiated archive.**
