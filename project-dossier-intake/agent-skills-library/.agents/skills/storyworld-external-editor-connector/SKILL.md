---
name: storyworld-external-editor-connector
description: Implement a common exact-version checkout, native-tool work, untrusted return, portable interchange, semantic diff, and candidate-admission boundary for precision applications.
---

# Storyworld External Editor Connector

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Let creators use Blender, InvokeAI, Kdenlive, Resolve, and later tools without requiring Storyworld plugins or surrendering asset, approval, rights, or canon authority.

## Use this skill when

- Adding or changing an optional precision-tool integration
- A governed asset or sequence must leave and return from an external application

## Do not use this skill when

- Making the external tool part of the normal required workflow
- Allowing its project database or file format to become canonical
- Directly overwriting accepted assets

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- ExternalEditorCheckout_contract
- ExternalEditorReturn_contract
- tool_profile
- exact_source_versions
- rights_and_sensitivity_rules

## Optional inputs

- portable_interchange_profile
- launch_and_return_detection
- workfile_retention_policy

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Create exact checkout identity and immutable source/version manifest
2. Export self-contained standard media plus native-tool-friendly package and optional sidecar
3. Record permitted references, rights, egress, sensitivity, expected transforms, and expiry
4. Launch or guide the independently installed application without granting Storyworld secrets or authority
5. Detect one or more returned files and treat them as untrusted
6. Scan, validate, hash, associate, and declare transformations
7. Import portable interchange and compute semantic/loss diff where available
8. Invalidate affected evaluations/approvals and admit outputs as new candidates
9. Preserve important native workfiles as nonauthoritative custody artifacts

## Required invariants

- External application need not understand Storyworld internals
- Sidecar is mandatory for Storyworld retention even if tool ignores it
- Returned files are untrusted
- Concurrent returns remain separate candidates
- Tool disappearance must not destroy accepted work

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Tool writes canon/master/rights/publication state
- External project file as source of truth
- Unscanned auto-import
- Hidden overwrite of checked-out version

## Required outputs

- checkout_package
- return_record
- workfile_artifact
- portable_interchange
- semantic_diff
- loss_report
- candidate_admission
- approval_invalidation

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Two conflicting returns
- Missing sidecar at tool side but Storyworld copy retained
- Malicious workfile/media
- Unsupported effects
- Application replacement
- Offline/unavailable tool

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

- ExternalEditorCheckout
- ExternalEditorReturn
- InterchangeProfile
- ConversionLossReport
- TransformationRecord

### Related POCs

- POC-08

### Relevant repository paths

- packages/integration/
- packages/portability/
- integrations/
- apps/studio/

### Skill dependencies

- storyworld-asset-custody-and-lineage
- storyworld-rights-and-consent-review
- storyworld-security-review
- storyworld-evaluation-layer

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`blender.md`](references/profiles/blender.md) — OpenUSD/MaterialX/glTF packages for 3D assets, scene realization, cameras, lighting, blocking, animation, compositing, runtime prep, dependency resolution, renders, and .blend workfile custody.
- [`invokeai.md`](references/profiles/invokeai.md) — Optional precision image finishing: exact image/reference checkout, masks/regional editing, fal-backed operations where applicable, return candidates, transformation declaration, re-evaluation, workfile/session preservation; no local weights under current posture.
- [`kdenlive.md`](references/profiles/kdenlive.md) — OTIO timeline plus media/proxies/captions/stems/settings and stable Storyworld IDs; return OTIO, .kdenlive workfile, renders, semantic diff, loss report, and malicious-project handling.
- [`resolve.md`](references/profiles/resolve.md) — Resolve Studio local connector, scripting API, project/bins/media/metadata, OTIO, color/Fusion/Fairlight/subtitle/render boundaries, project archive, return package, supported versions, and unknown-outcome recovery.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
