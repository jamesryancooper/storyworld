---
name: storyworld-provider-model-evaluation
description: Evaluate and promote provider models, endpoints, and routes for named Storyworld capabilities, egress classes, retention modes, costs, and quality floors.
---

# Storyworld Provider Model Evaluation

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Replace universal model rankings with capability-specific evidence and controlled discovered-to-prohibited lifecycles.

## Use this skill when

- A new OpenRouter model, fal endpoint, direct provider, evaluator, transcription model, or hosted workflow may enter production policy

## Do not use this skill when

- Selecting a model because it is popular or newly released
- Treating one benchmark as proof for all Storyworld uses

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- model_or_endpoint_identity
- named_capability
- egress_and_retention_requirements
- fixture_suite
- cost_and_latency_limits

## Optional inputs

- comparison_baseline
- provider_route_variants
- human_raters
- safety_evidence

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Register candidate as discovered with exact provider/model/endpoint version
2. Review license, retention, training, route, geographic, security, and modality constraints
3. Run capability-specific rights-safe fixtures against baseline and failure cases
4. Measure schema adherence, fidelity, continuity, latency, cost, reproducibility, and known limitations
5. Review outputs with qualified humans where interpretation is involved
6. Approve only for named capability, egress class, provider route, retention mode, and policy
7. Record deprecation, replacement, and prohibition triggers

## Required invariants

- Approval is scoped, never universal
- Provider routing changes can invalidate approval
- Current availability is not durable identity
- Human evaluation remains required for creative judgments

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Silent production promotion
- Using private/restricted fixtures on disallowed routes
- Hiding model/provider actually used
- Approving based solely on vendor claims

## Required outputs

- ModelCapabilityApproval
- evaluation_report
- fixture_results
- cost_latency_profile
- limitations
- promotion_or_rejection_decision

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Schema failure, provider substitution, price increase, retention change, route unavailable, benchmark drift, adverse creative fixture

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

- DEC-0044
- DEC-0049

### Related contracts

- ModelCapabilityApproval
- ProviderCapabilityProfile
- ProviderPolicy

### Related POCs

- POC-02
- POC-04
- POC-05

### Relevant repository paths

- packages/providers/
- packages/evaluation/
- project-dossier/research/
- project-dossier-intake/assessments/

### Skill dependencies

- storyworld-fixture-authoring
- storyworld-security-review

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
