---
name: storyworld-evaluation-layer
description: Design and implement evidence-backed deterministic, measurable, model-assisted, and human-review Storyworld evaluation layers.
---

# Storyworld Evaluation Layer

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Detect technical, continuity, rights, policy, and creative concerns without creating a deceptive universal quality score or autonomous acceptance.

## Use this skill when

- Adding a new check, finding type, evaluation plan, model-assisted reviewer, waiver rule, or regression corpus

## Do not use this skill when

- The result cannot state its evidence, uncertainty, authority, or limitation
- A subjective judgment is being converted into an automatic blocker without accepted policy

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- evaluation_semantic
- authority_classification
- fixture_set
- finding_contract

## Optional inputs

- human_baseline
- model_profile
- blocking_policy
- waiver_policy

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. State the semantic and the harm of false positive/negative outcomes
2. Classify deterministic checks, measurable indicators, model-assisted findings, and required human judgment
3. Define evidence refs, subject refs/hashes, severity, confidence, limitations, and remediation
4. Decide whether the result may block, warn, or only inform
5. Define waiver eligibility, authority, scope, expiry, and invalidation
6. Build valid, invalid, ambiguous, provider-substitution, and mutation fixtures
7. Measure against human baseline where interpretation is involved
8. Integrate findings into Review Room and approval invalidation

## Required invariants

- No universal quality score
- Model assistance creates findings, not acceptance
- Legal certainty is never claimed
- A pass means configured checks found no unresolved blocker, not that work is perfect

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Auto-waiving findings
- Hiding confidence or evidence
- Using one similarity threshold as universal creative truth
- Blocking interpretive work without accepted policy

## Required outputs

- evaluation_definition
- EvaluationPlan
- findings
- fixtures
- baseline_results
- waiver_rules
- approval_invalidation_rules

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Mutation/defect injection
- False positive/negative review
- Provider substitution
- Recorded-provider replay
- Human disposition workflow

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

- DEC-0049

### Related contracts

- EvaluationPlan
- EvaluationFinding
- ApprovalInvalidation

### Related POCs

- POC-04
- POC-05
- POC-06
- POC-08
- POC-09
- POC-12

### Relevant repository paths

- packages/evaluation/
- packages/regression/
- apps/studio/src/components/continuity-console*
- apps/studio/src/components/review-room*

### Skill dependencies

- storyworld-fixture-authoring
- storyworld-provider-model-evaluation
- storyworld-studio-surface

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
