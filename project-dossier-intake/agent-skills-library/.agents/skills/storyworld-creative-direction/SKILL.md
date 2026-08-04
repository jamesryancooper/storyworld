---
name: storyworld-creative-direction
description: Define and implement compositional Creative Direction systems, scope bindings, inheritance, override, counterpoint, and ResolvedRealizationSpec compilation.
---

# Storyworld Creative Direction

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Replace a monolithic Look object with separately versioned professional creative systems while retaining a simple resolved view for creators.

## Use this skill when

- Working on representation style, visual identity, production design, character appearance, directing, camera, lighting, color, editing, graphics, sound, music, or medium realization

## Do not use this skill when

- Storing provider prompts or model controls
- Treating every professional term as a core enum
- Accepting draft DEC-0031 or DEC-0033 unchanged

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- creative_direction_successor_decision
- at_least_two_cross_media_fixtures
- accepted_canon_and_state

## Optional inputs

- book_research_packages
- controlled_vocabularies
- template_profiles

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Separate representation style, visual identity, production design, character appearance, directorial intent, cinematography, lighting, composition/blocking, color design, grade, editorial design, graphics, sound, music, and medium realization
2. Decide which are first-class specifications, scoped plans, bindings, vocabularies, template settings, or derived views
3. Define discipline-specific inheritance and override rules rather than one universal cascade
4. Define creative relations such as reinforce, contrast, withhold, destabilize, evolve, and remain ambiguous
5. Bind exact accepted revisions to production context
6. Compile pinned canon, state, specifications, and target constraints into ResolvedRealizationSpec
7. Expose Look only as a resolved Studio projection if retained

## Required invariants

- Creative intent is provider-neutral
- Art style does not own scene mood, camera, lighting, edit, sound, or score
- Grade intent is distinct from color design and technical transforms
- World canon is distinct from production realization

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- One everything-object for all creative departments
- One universal property-to-shot inheritance chain
- Named artist prompts as canonical style definitions
- Automatic emotion-to-color/lens/music rules

## Required outputs

- creative_system_ontology
- specification_contracts
- binding_and_scope_rules
- controlled_vocabularies
- ResolvedRealizationSpec
- Look_projection
- fixtures

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Still image, film, audio-only, picture-book, interactive, and cross-media fixtures
- Black-and-white realization with hidden production color
- Counterpoint and adaptation cases
- Provider replacement

A completion report must state:

- exact repository revision and dirty state;
- commands or checks actually executed;
- actual result of each check;
- checks not executed and why;
- known limitations and residual risks;
- external effects, costs, credentials, or network crossings, including “none”;
- decision and disposition owner for unresolved findings.

## Failure and escalation

Stop or narrow the task when:

- required authority or a governing decision is missing;
- current implementation contradicts the requested durable direction;
- a secret, personal, restricted, or highly restricted input lacks an approved path;
- the task would create an unreviewed public contract or migration;
- provider, external-tool, runtime, publication, or Commerce Foundry outcomes are ambiguous;
- required validation cannot run;
- unrelated repository work would be overwritten.

Record the blocking fact, smallest decision or evidence needed, safe partial result, and disposition owner. Never hide a blocked state by producing implementation-shaped prose.

## Traceability

### Related decisions

- DEC-0042

### Related contracts

- CreativeSpecification
- CreativeBinding
- ResolvedRealizationSpec

### Related POCs

- POC-04
- POC-05
- POC-09

### Relevant repository paths

- project-dossier-intake/platform-capabilities/production-design.md
- project-dossier-intake/draft-decisions/dec-0031-art-style-definitions.md
- project-dossier-intake/draft-decisions/dec-0033-production-design-look-system.md
- packages/contracts/

### Skill dependencies

- storyworld-contract-authoring
- storyworld-fixture-authoring

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`representation-style.md`](references/profiles/representation-style.md) — Narrow representation style to medium, mark-making, form, texture, abstraction, modeling, shading, spatial depiction, and motion treatment; keep scene mood, lighting, composition, and grade in their own systems.
- [`production-design.md`](references/profiles/production-design.md) — Separate canonical place/object from production realization, set/location design, dressing, props, spatial layout, constraints, and continuity state.
- [`directorial-intent.md`](references/profiles/directorial-intent.md) — Model point of view, audience alignment, performance objective, revelation, staging, subject hierarchy, coverage rationale, image-sound relation, and scene rhythm.
- [`cinematography-lighting-color.md`](references/profiles/cinematography-lighting-color.md) — Separate camera/lens/framing/focus/movement, motivated lighting, narrative color design, grade intent, and technical color pipeline.
- [`editorial-sound-music-graphics.md`](references/profiles/editorial-sound-music-graphics.md) — Separate shot relation and montage, soundscape/dialogue/ambience, score and motif identity, and typography/layout/graphic systems.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
