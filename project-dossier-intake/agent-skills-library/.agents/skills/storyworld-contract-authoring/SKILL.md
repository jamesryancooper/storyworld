---
name: storyworld-contract-authoring
description: Design and author Storyworld-owned contracts with explicit authority, lifecycle, versioning, security, fixtures, and tests.
---

# Storyworld Contract Authoring

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Create durable provider-, editor-, renderer-, and runtime-neutral contracts rather than allowing implementation formats to become Storyworld semantics.

## Use this skill when

- Adding a first-class domain object, command, package, receipt, policy, provider boundary, external-tool boundary, or standards profile

## Do not use this skill when

- A local TypeScript interface is sufficient and no public or durable semantic boundary is created
- The governing decision is unresolved

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- contract_purpose
- governing_decision_ref
- authority_classification
- at_least_two_fixture_needs_or_standard_mandate

## Optional inputs

- external_standard
- migration_context
- existing_schema_refs

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. State the contract's purpose and why a first-class object is warranted
2. Define canonical, derived, temporary, external, or evidence status
3. Define stable identity, immutable versioning, lifecycle, state transitions, authority, security, and retention
4. Separate extensible controlled vocabularies from closed invariants
5. Define inputs, outputs, references, hashes, receipts, unknown outcomes, and failure semantics
6. Create positive, negative, boundary, compatibility, and replacement fixtures
7. Add schema/OpenAPI/AsyncAPI artifacts, tests, documentation, and registry entries

## Required invariants

- At least two materially different fixtures unless standards-mandated
- Private external formats remain behind adapters
- Unknown fields and version transitions are explicit
- A schema cannot confer human authority

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Expanding the active task's authority
- Treating staged dossier material or this skill as an accepted decision
- Claiming implementation, validation, readiness, approval, or external success without direct evidence
- Using credentials, spending money, publishing, deploying, or contacting external systems without explicit current authorization

## Required outputs

- contract_definition
- schema
- fixtures
- tests
- migration_notes
- registry_update
- evidence_receipt

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Run contract-pack validation
- Validate fixtures with an independent implementation where required
- Test round-trip, rejection, version drift, and replacement behavior

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

- DEC-0041 through DEC-0053

### Related contracts

- CON-001 through CON-053

### Related POCs

- None.

### Relevant repository paths

- packages/contracts/
- packages/contracts/schemas/
- packages/contracts/fixtures/
- packages/contracts/tests/

### Skill dependencies

- storyworld-decision-impact-analysis
- storyworld-fixture-authoring

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
