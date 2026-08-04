---
name: storyworld-native-media-workspace
description: Build Storyworld-native intent-driven image, video, audio, graphic, and spatial workspaces with semantic precision and optional external finishing.
---

# Storyworld Native Media Workspace

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Make Storyworld the normal creative environment without recreating conventional professional applications or exposing provider controls as the product model.

## Use this skill when

- Implementing native generation, editing, semantic selection, timeline, canvas, sound lanes, layout, preview, comparison, or professional precision

## Do not use this skill when

- Building a universal NLE, paint program, DAW, or DCC
- Implementing an operation without a typed Storyworld contract and evaluation plan

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- accepted_native_media_decision
- media_operation_contracts
- ResolvedRealizationSpec
- provider_and_worker_capabilities

## Optional inputs

- external_escape_criteria
- advanced_operator_controls
- annotation_profiles

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Define the user outcome and semantic media operation before UI or provider mechanics
2. Support text/voice, contextual selection, simple controls, and AI-mediated precision
3. Compile operations to deterministic worker or provider execution plans
4. Show plan, preservation locks, assumptions, cost, consequences, and progress
5. Generate previews and candidates under Storyworld custody
6. Run technical, continuity, rights, and requested-preservation evaluations
7. Support alternatives, partial acceptance, branching, undo, and immutable history
8. Offer an external precision checkout only when native capability is unsupported or explicitly chosen

## Required invariants

- Most supported work completes inside Storyworld
- A timeline/canvas is a view over Engine state
- Provider settings are not the creative model
- Professional precision remains accessible without dense default controls

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Direct asset overwrite
- Unversioned masks, keyframes, or selections
- Automatic creative acceptance
- External application as normal required workflow

## Required outputs

- native_workspace
- typed_operations
- preview_pipeline
- candidate_workflow
- precision_controls
- evaluation_hooks
- external_escape_hatch

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Beginner and expert usability
- Text/voice parity
- Exact manual adjustment
- Before/after and alternatives
- Screen-reader structured equivalent
- Provider/tool replacement

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

- DEC-0040
- DEC-0041
- DEC-0046

### Related contracts

- ImageOperation
- VideoEditOperation
- AudioEditOperation
- MusicOperation
- GraphicLayoutOperation
- SpatialEditOperation
- PreviewArtifact

### Related POCs

- POC-04
- POC-05
- POC-06

### Relevant repository paths

- apps/studio/
- packages/domain/
- packages/kernel/
- packages/providers/
- packages/evaluation/

### Skill dependencies

- storyworld-creative-command-implementation
- storyworld-creative-direction
- storyworld-annotation-target
- storyworld-provider-adapter
- storyworld-deterministic-media-worker
- storyworld-studio-surface

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`image.md`](references/profiles/image.md) — Native image generation/editing: variants, subject/object/background changes, appearance, relighting, reframing, canvas extension, identity/composition preservation, text repair, isolation, upscale, restoration, and multi-source composition.
- [`video.md`](references/profiles/video.md) — Native video: trim/split/insert/replace/reorder, J/L cuts, pacing, montage, transitions, alternate cuts, captions, sound/music placement, grade direction, generated inserts, rough cuts, and destination variants.
- [`audio.md`](references/profiles/audio.md) — Native audio: dialogue priority, region edits, ambience, room tone, fades, levels, noise/repair requests, cue placement, stems, and simple mix automation.
- [`graphic.md`](references/profiles/graphic.md) — Native graphics/layout: hierarchy, grids, type roles, text-image relationship, page/panel/card/carousel/title/caption layouts, safe areas, and destination adaptation.
- [`spatial.md`](references/profiles/spatial.md) — Native spatial planning: zones, routes, thresholds, sightlines, blocking, camera access, environmental clues, and medium/runtime realization.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
