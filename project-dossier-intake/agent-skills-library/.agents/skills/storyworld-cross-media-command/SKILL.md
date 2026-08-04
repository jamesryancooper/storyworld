---
name: storyworld-cross-media-command
description: Compile one creator instruction into coordinated, separately governed image, video, audio, music, graphic, spatial, or runtime operations.
---

# Storyworld Cross Media Command

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Provide one conversational creative experience without collapsing media-specific semantics, costs, evaluations, or approvals.

## Use this skill when

- A command such as 'make the scene colder' or 'make this more urgent' affects more than one medium

## Do not use this skill when

- A single untyped mood flag would be used in place of concrete operations
- The affected medium lacks an accepted operation contract

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- CreativePlan_contract
- media_operation_contracts
- accepted_creative_specifications
- base_versions

## Optional inputs

- cross_media_preview_strategy
- dependency_graph
- counterpoint_intent

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Resolve the command's scope, narrative intent, and affected media
2. Ask or infer whether departments reinforce, contrast, withhold, destabilize, evolve, or remain ambiguous
3. Create one typed operation set per medium
4. Declare inter-operation dependencies and independent costs/evaluations
5. Preview coordinated results while retaining per-medium before/after views
6. Allow partial acceptance only when dependencies remain valid
7. Create separate revisions and one coordinating decision receipt

## Required invariants

- No universal mood operation
- Each medium retains its own authority and lifecycle
- Counterpoint is a first-class authored relation
- A failed operation cannot leave hidden partial cross-media application

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Expanding the active task's authority
- Treating staged dossier material or this skill as an accepted decision
- Claiming implementation, validation, readiness, approval, or external success without direct evidence
- Using credentials, spending money, publishing, deploying, or contacting external systems without explicit current authorization

## Required outputs

- cross_media_plan
- media_specific_operations
- coordination_graph
- coordinated_preview
- partial_acceptance_constraints
- decision_receipt

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Cold-scene fixture across image/video/sound/graphics
- Counterpoint fixture
- One medium fails or exceeds budget
- Partial acceptance and rollback

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

- DEC-0041
- DEC-0042
- DEC-0046

### Related contracts

- CreativePlan
- ImageOperation
- VideoEditOperation
- AudioEditOperation
- MusicOperation
- GraphicLayoutOperation
- SpatialEditOperation
- RuntimeContentOperation

### Related POCs

- POC-09

### Relevant repository paths

- None.

### Skill dependencies

- storyworld-creative-command-implementation
- storyworld-creative-direction
- storyworld-native-media-workspace

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- No vendor- or medium-specific profiles are bundled for this skill.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
