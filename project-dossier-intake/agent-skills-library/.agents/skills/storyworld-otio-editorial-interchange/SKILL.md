---
name: storyworld-otio-editorial-interchange
description: Define and implement Storyworld's pinned OpenTimelineIO editorial interchange profile, stable identity mapping, round trips, and semantic loss reporting.
---

# Storyworld OTIO Editorial Interchange

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Exchange portable editorial meaning with Kdenlive, Resolve, and future NLEs without making an editor project format Storyworld's timeline contract.

## Use this skill when

- Exporting or importing editorial sequences, clips, tracks, timing, transitions, markers, captions, or media references

## Do not use this skill when

- Assuming OTIO preserves application-specific effects, grade, Fusion, Fairlight, plugin, or project state
- Using visible marker names as stable identity

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- Storyworld_editorial_model
- OTIO_profile_version
- asset_and_shot_identity_mapping
- target_adapter

## Optional inputs

- application_workfile
- sidecar_project_settings
- loss_rules

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Map Storyworld sequence, shot, clip, source range, timeline range, transition, marker, caption, and metadata semantics to a pinned OTIO profile
2. Carry stable Storyworld IDs in metadata and authoritative sidecar mapping
3. Include frame rate, resolution, audio, color, destination, and rights settings not safely represented in OTIO
4. Export and validate OTIO plus media manifest
5. Import returned OTIO and identify order, trim, replacement, transition, timing, gap, and metadata changes
6. Generate ConversionLossReport for unsupported or editor-specific semantics
7. Create a proposal rather than silently replacing the accepted sequence

## Required invariants

- OTIO is interchange, not the complete canonical editorial model
- Rational time and exact media versions are preserved
- Loss is explicit
- Workfile preserves application-specific realization separately

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Silent import overwrite
- Pretending round trip is lossless
- Using editor-internal clip IDs as Storyworld identity
- Dropping unsupported effects without a finding

## Required outputs

- EditorialHandoffPackage
- EditorialReturnPackage
- OTIO_profile
- identity_sidecar
- semantic_diff
- ConversionLossReport

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Kdenlive and Resolve round-trip fixtures
- Clip-instance marker mismatch
- Unsupported effect/retime
- Missing media
- Different frame rate/resolution
- Editor replacement

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

- EditorialHandoffPackage
- EditorialReturnPackage
- InterchangeProfile
- ConversionLossReport

### Related POCs

- POC-05
- POC-08

### Relevant repository paths

- packages/portability/
- packages/integration/
- apps/studio/

### Skill dependencies

- storyworld-external-editor-connector
- storyworld-schema-evolution
- storyworld-fixture-authoring

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`kdenlive.md`](references/profiles/kdenlive.md) — Kdenlive import/export profile, project settings sidecar, marker-instance caveats, MLT/Kdenlive version support, security validation, returned render/workfile.
- [`resolve.md`](references/profiles/resolve.md) — Resolve Studio scripting and OTIO profile, project/bin metadata, application-specific workfile archive, color/Fusion/Fairlight losses, and connector recovery.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
