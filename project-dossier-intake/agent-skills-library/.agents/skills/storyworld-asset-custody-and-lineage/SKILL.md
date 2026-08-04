---
name: storyworld-asset-custody-and-lineage
description: Implement Storyworld asset custody, version lineage, transformation records, quarantine, candidates, masters, renditions, publications, workfiles, and retention.
---

# Storyworld Asset Custody And Lineage

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Ensure every governed artifact has exact bytes, identity, provenance, lifecycle, retention, and authority independent of provider URLs or external application storage.

## Use this skill when

- Importing provider output, external workfiles, edited media, transformations, renditions, packages, publications, runtime artifacts, or evidence

## Do not use this skill when

- Using provider CDN URLs or application folders as permanent custody
- Overwriting an accepted asset

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- asset_lifecycle_contracts
- storage_and_hashing_contract
- rights_and_retention_policy

## Optional inputs

- transformation_tool_receipt
- external_checkout_manifest
- publication_or_runtime_receipt

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Classify artifact as source, evidence, temporary input, disposable experiment, generated output, candidate, rejected candidate, master, workfile, rendition, package, publication, runtime artifact, superseded version, or archived evidence
2. Ingest bytes into configured Storyworld system-of-record storage
3. Scan, validate, hash, normalize metadata, and record source/tool/provider versions
4. Create immutable asset version and TransformationRecord links
5. Apply rights, access, egress, retention, legal-hold, and expiry policies
6. Run required evaluations before candidate admission or promotion
7. Preserve rejected evidence and accepted lineage according to policy
8. Support reproduction, supersession, withdrawal, and safe deletion gates

## Required invariants

- Storyworld custody means governed system of record, not legal ownership
- Provider URLs and caches are temporary
- Accepted bytes are immutable
- Every derivative names its exact sources and transformations

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Direct overwrite of accepted assets
- Promotion without exact-version human authority
- Deleting required evidence
- Cross-tenant physical deduplication leaking semantic access

## Required outputs

- AssetVersion
- TransformationRecord
- custody_receipt
- lifecycle_transition
- retention_record
- lineage_graph

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Hash/fixity verification
- Provider URL expiry
- Corrupt/malicious media
- Rejected candidate retention
- Workfile preservation
- Reproduction through alternate provider

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

- DEC-0048

### Related contracts

- AssetVersion
- TransformationRecord
- ExternalEditorReturn
- ChannelPackage
- RuntimeContentPackage

### Related POCs

- POC-03
- POC-04
- POC-05
- POC-08

### Relevant repository paths

- packages/storage/
- packages/domain/
- packages/persistence/
- packages/portability/

### Skill dependencies

- storyworld-deterministic-media-worker
- storyworld-rights-and-consent-review
- storyworld-evaluation-layer

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
