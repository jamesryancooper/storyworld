---
name: storyworld-schema-evolution
description: Evolve Storyworld JSON Schema, OpenAPI, AsyncAPI, lifecycle, and package contracts without silent compatibility or migration breakage.
---

# Storyworld Schema Evolution

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Make every contract change's compatibility, migration, generated-artifact, and consumer impact explicit.

## Use this skill when

- Changing required fields, enums, identifiers, references, lifecycle states, API messages, package envelopes, or validation behavior

## Do not use this skill when

- Creating a wholly new contract with no predecessor; use storyworld-contract-authoring first

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- existing_contract_version
- proposed_change
- consumer_inventory
- governing_decision_ref

## Optional inputs

- migration_plan
- compatibility_window
- external_standard_version

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Classify the change as compatible additive, compatible semantic, breaking, corrective, or deprecating
2. Inventory producers, consumers, stored records, packages, fixtures, generated clients, and external adapters
3. Define new version, migration, coexistence, unknown-field, and rejection behavior
4. Update source schemas before generated artifacts
5. Add old/new compatibility fixtures and failure cases
6. Test import, export, replay, historical reads, and rollback
7. Record deprecation and removal gates

## Required invariants

- Semantic breaking changes receive new versions even if syntax still validates
- Enum growth is not assumed safe
- Historical exact versions remain interpretable
- Generated output is never the contract source

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Expanding the active task's authority
- Treating staged dossier material or this skill as an accepted decision
- Claiming implementation, validation, readiness, approval, or external success without direct evidence
- Using credentials, spending money, publishing, deploying, or contacting external systems without explicit current authorization

## Required outputs

- compatibility_analysis
- versioned_schema
- migration_or_coexistence_plan
- consumer_updates
- fixtures
- deprecation_record

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Validate old and new fixtures
- Run generated-client drift checks
- Test rejected downgrade and unknown-version behavior

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

- None.

### Related contracts

- None.

### Related POCs

- None.

### Relevant repository paths

- packages/contracts/
- apps/studio/src/lib/engine.ts
- packages/integration/
- packages/portability/

### Skill dependencies

- storyworld-contract-authoring
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
