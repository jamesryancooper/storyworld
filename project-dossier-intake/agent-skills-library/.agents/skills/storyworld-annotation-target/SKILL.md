---
name: storyworld-annotation-target
description: Define and implement exact-version cross-media annotation targets and accessible renderers without making annotations approvals.
---

# Storyworld Annotation Target

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Provide one durable addressing model for image regions, document ranges, media time, shots, cuts, graph elements, and spatial regions.

## Use this skill when

- A comment, finding, operation, selection, review, or precision edit must target part of an exact asset or document

## Do not use this skill when

- Using pixel coordinates, timecodes, or editor selections without an exact source version
- Treating resolved comments as decisions

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- AnnotationTarget_contract
- media_or_document_version
- selector_profile

## Optional inputs

- W3C_Web_Annotation_profile
- Media_Fragments_profile
- renderer_library

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Identify exact asset/document/version and target domain
2. Choose a common target envelope and medium-specific selector
3. Represent spatial, temporal, structural, semantic, layer/track, graph, or spatial-location addressing
4. Define normalization, coordinate systems, time bases, and mutation behavior
5. Provide renderer adapters and a structured accessible alternative
6. Bind annotations to motivation/type such as comment, finding, edit request, evidence, or selection
7. Test target survival, invalidation, and remapping across derived versions

## Required invariants

- Annotations never imply approval
- Every target binds to an exact version
- Renderer private JSON is noncanonical
- Target invalidation is explicit rather than silently retargeted

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Expanding the active task's authority
- Treating staged dossier material or this skill as an accepted decision
- Claiming implementation, validation, readiness, approval, or external success without direct evidence
- Using credentials, spending money, publishing, deploying, or contacting external systems without explicit current authorization

## Required outputs

- AnnotationTarget_schema
- selector_profiles
- renderer_adapters
- accessible_representation
- fixtures
- invalidation_rules

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Image polygon/mask, video frame/interval/cut, audio interval/track, document semantic block, graph node/edge, and spatial region fixtures
- Version-change invalidation

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

- DEC-0047

### Related contracts

- AnnotationTarget

### Related POCs

- POC-01
- POC-04
- POC-05
- POC-08

### Relevant repository paths

- None.

### Skill dependencies

- storyworld-contract-authoring
- storyworld-fixture-authoring
- storyworld-studio-surface

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`image.md`](references/profiles/image.md) — Point, rectangle, polygon, mask, layer, object, subject, and color/grade region selectors.
- [`video.md`](references/profiles/video.md) — Frame, time interval, shot, cut, transition, track, caption, and storyboard selectors with rational time.
- [`audio.md`](references/profiles/audio.md) — Time interval, track, stem, cue, speaker turn, and justified frequency-region selectors.
- [`document-graph-spatial.md`](references/profiles/document-graph-spatial.md) — Document range/semantic block, graph node/edge, timeline event, world coordinate, route, zone, and region selectors.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
