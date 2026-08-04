---
name: storyworld-repository-orientation
description: Establish the exact Storyworld repository, governance, dossier, decision, task, package, test, and implementation context before significant work.
---

# Storyworld Repository Orientation

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Produce a compact, evidence-backed context package so later skills do not rely on stale prose or inferred repository state.

## Use this skill when

- Starting a significant task
- Resuming work after interruption
- The branch, commit, task, decision, or current implementation status is uncertain

## Do not use this skill when

- A fresh orientation package for the exact revision and task already exists and has not become stale

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- current_request
- repository_revision
- applicable_instructions

## Optional inputs

- task_record
- prior_handoff
- pull_request_or_branch

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Read applicable AGENTS.md files and .agent/START_HERE.md
2. Read policy, context, current state, relevant accepted decisions, and active tasks
3. Inspect the exact source, schemas, tests, fixtures, and package boundaries implicated
4. Classify dossier sources as accepted authority, observed current state, staged intake, history, or derived evidence
5. Record current branch/commit, dirty state, validators, reserved crossings, and known discrepancies
6. Produce only the minimum context required for the routed task

## Required invariants

- Mature prose is not proof of implementation
- Generated reports are point-in-time evidence, not current authority
- Staged intake is never silently treated as accepted

## Allowed side effects

`read_only`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Modifying repository files
- Creating or accepting decisions
- Assuming a task is authorized because it appears in a plan

## Required outputs

- repository_revision
- governance_context
- relevant_decisions
- active_tasks
- package_map
- validation_commands
- known_discrepancies
- uncertainties

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Cross-check revision against Git
- Cite direct file paths or command output for every current-state claim

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

- AGENTS.md
- .agent/START_HERE.md
- .agent/policy.json
- .agent/context.json
- .agent/state/current.json
- .agent/decisions/
- .agent/tasks/
- project-dossier/
- project-dossier-intake/

### Skill dependencies

- None.

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
