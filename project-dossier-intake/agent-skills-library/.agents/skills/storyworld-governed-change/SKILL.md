---
name: storyworld-governed-change
description: Deliver one authorized Storyworld repository change with task scope, decision traceability, tests, evidence, and safe closure.
---

# Storyworld Governed Change

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Standardize the lifecycle of significant repository-local changes while preserving unrelated work and Storyworld's governance boundaries.

## Use this skill when

- Implementing or modifying code, contracts, schemas, fixtures, dossier records, workflows, or Studio behavior

## Do not use this skill when

- The request is read-only analysis
- The task requires an unresolved owner decision
- The requested external effect is not explicitly authorized

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- current_request
- task_record
- applicable_instructions
- governing_decision_refs
- project_validation_contract

## Optional inputs

- coordination_lease
- current_state_refs
- prior_evidence

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Confirm scope, authority, exclusions, and governing decisions
2. Inspect affected callers, contracts, fixtures, and generated artifacts
3. Create the narrowest coherent implementation and corresponding tests
4. Update task, evidence, registries, dossier, and generated sources only where required
5. Run risk-proportional checks and repository harness validation
6. Request or perform independent review under current authority
7. Record evidence, limitations, dirty state, and exact closure status

## Required invariants

- No implementation before required successor decisions
- Never hand-edit generated files
- External effects require a separate explicit gate
- Unknown outcomes remain unknown until reconciled

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Expanding the active task's authority
- Treating staged dossier material or this skill as an accepted decision
- Claiming implementation, validation, readiness, approval, or external success without direct evidence
- Using credentials, spending money, publishing, deploying, or contacting external systems without explicit current authorization

## Required outputs

- task_update
- changed_files
- validation_evidence
- review_disposition
- completion_receipt
- limitations

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Use .agent/validators.json as the repository validation contract
- Run refresh/check when dossier or harness paths require it
- Run typecheck/test/lint and contract checks proportionate to the change

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

- .agent/tasks/
- .agent/evidence/
- .agent/validators.json
- .agent/scripts/refresh.py
- .agent/scripts/validate.py

### Skill dependencies

- storyworld-repository-orientation
- storyworld-decision-impact-analysis
- storyworld-conformance-and-release

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
