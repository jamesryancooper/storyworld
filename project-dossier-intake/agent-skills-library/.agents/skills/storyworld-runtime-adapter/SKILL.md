---
name: storyworld-runtime-adapter
description: Compile validated immutable Storyworld content packages to browser and Godot runtimes while preserving save-state separation and runtime nonauthority.
---

# Storyworld Runtime Adapter

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Support interactive narrative delivery without making Storyworld a rendering, physics, networking, multiplayer, or player-save engine.

## Use this skill when

- Building shared runtime content contracts, browser adapter, Godot adapter, runtime package validation, receipt, observation, analytics, or proposal return

## Do not use this skill when

- Importing player/save state into working canon
- Letting runtime private formats define Storyworld narrative semantics

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- RuntimeContentPackage
- accepted_canon_release
- accepted_assets
- runtime_target_profile

## Optional inputs

- runtime_authority_host
- localization_package
- analytics_and_observation_contract

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Compile authored narrative, branches, entities, assets, rules, dialogue, missions, and references into shared immutable runtime package
2. Validate package identity, hashes, rights, locale, capability, and target constraints
3. Translate through browser or Godot adapter without changing source semantics
4. Have runtime authority host accept or reject package and issue RuntimeReceipt
5. Keep rendering, simulation, physics, networking, and save state runtime-owned
6. Return observations, player choices, analytics, and proposals as nonauthoritative records
7. Require human acceptance for promotion into working canon

## Required invariants

- One shared source contract, target-specific adapters
- Runtime cannot change working canon
- Player-specific state is separate
- Adapter differences are detected, not normalized away silently

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Automatic canon mutation
- Runtime state as Storyworld source truth
- Duplicated browser/Godot narrative models
- Package acceptance inferred from build success

## Required outputs

- RuntimeContentPackage
- target_build
- validation_report
- RuntimeReceipt
- observation_or_proposal_records
- adapter_diff

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Same fixture in browser and Godot
- Save-state separation
- Adapter semantic divergence
- Missing asset/rights
- Runtime rejection
- Proposal return without canon mutation

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

- DEC-0052

### Related contracts

- RuntimeContentPackage
- RuntimeReceipt
- RuntimeContentOperation

### Related POCs

- POC-12

### Relevant repository paths

- packages/integration/
- packages/portability/
- packages/contracts/
- apps/studio/

### Skill dependencies

- storyworld-contract-authoring
- storyworld-asset-custody-and-lineage
- storyworld-evaluation-layer
- storyworld-security-review

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`browser.md`](references/profiles/browser.md) — Browser-first interactive stories: portable web content, accessibility, offline/cache policy, sandboxing, URL/assets, save state, receipts, and analytics/proposals.
- [`godot.md`](references/profiles/godot.md) — Godot content bundle/import profile: resources, dialogue/quest/state package, assets, localization, import validation, runtime receipt, save state, and nonauthority.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
