---
name: storyworld-conformance-and-release
description: Validate Storyworld work against governing decisions, contracts, repository validators, tests, accessibility, security, and closure evidence.
---

# Storyworld Conformance And Release

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Provide an independent completion gate that distinguishes implementation, conformance, and production readiness.

## Use this skill when

- Closing a significant task, POC, contract change, integration, dossier update, Studio surface, or release candidate

## Do not use this skill when

- No implementation or artifact exists to validate
- The same agent is attempting to approve its own authority-changing work

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- task_record
- acceptance_criteria
- changed_artifacts
- governing_decisions
- validation_contract

## Optional inputs

- review_findings
- external_effect_receipts
- browser_or_assistive_technology_evidence

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Re-orient to the exact revision and dirty state
2. Trace every acceptance criterion to implementation and evidence
3. Run declared typecheck, test, lint, contract, harness, fixture, security, and accessibility checks proportionate to risk
4. Inspect generated manifests and forbidden hand edits
5. Check authority, lifecycle, unknown outcomes, exact-version binding, and reserved crossings
6. Record findings with severity and disposition owner
7. Issue completed, blocked, or incomplete receipt without implying acceptance beyond the active task

## Required invariants

- Passing checks does not establish production readiness or external authority
- Skipped checks remain visible
- Review findings cannot be self-resolved without evidence
- External outcomes require external receipts

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Accepting decisions or gates
- Claiming CI or tests ran when only repository prose says so
- Hiding dirty state or skipped validation

## Required outputs

- conformance_receipt
- criterion_trace
- validation_results
- findings
- skipped_checks
- limitations
- closure_recommendation

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Validate the receipt itself contains revision, commands, exit results, findings, limitations, and external effects

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

- .agent/validators.json
- .agent/scripts/validate.py
- .agent/tests/
- packages/contracts/tests/
- apps/studio/

### Skill dependencies

- storyworld-repository-orientation

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
