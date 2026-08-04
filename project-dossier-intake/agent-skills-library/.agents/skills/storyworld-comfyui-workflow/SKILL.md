---
name: storyworld-comfyui-workflow
description: Register, test, secure, promote, and execute self-hosted ComfyUI workflows as replaceable provider-execution artifacts under Storyworld policy.
---

# Storyworld Comfyui Workflow

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Use ComfyUI for complex orchestration and operator inspection without making its graph, nodes, database, or workflow JSON canonical creative authority.

## Use this skill when

- A complex, reusable, experimental, identity-preserving, or multi-model media operation requires a ComfyUI workflow

## Do not use this skill when

- A common stable direct fal endpoint is sufficient
- The workflow requires local generative weights under the current no-local-weight posture
- Unreviewed custom nodes or endpoints are required

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- WorkflowDefinition
- input_output_bindings
- node_and_endpoint_allowlists
- provider_egress_policy

## Optional inputs

- operator_review
- recorded_execution
- replacement_workflow
- deterministic_local_nodes

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Assign stable Storyworld workflow ID/version separate from ComfyUI graph identity
2. Pin workflow JSON hash, ComfyUI version, custom-node commits/dependencies, and hosted endpoint versions
3. Declare input/output bindings, media types, resources, cost, egress, retention, and evaluation plan
4. Security-review every node, filesystem/network capability, endpoint, and secret path
5. Run reproducibility, failure, restricted-data, and replacement fixtures
6. Promote through experimental, evaluated, production-approved, deprecated, and prohibited states
7. Execute only through the Storyworld adapter and durable workflow
8. Store redacted logs and exact execution provenance

## Required invariants

- Self-hosting does not make nodes or endpoints safe
- No local model weights without successor decision
- Graph is noncanonical execution detail
- ComfyUI cannot approve, publish, or write canon

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Unpinned custom nodes
- Arbitrary network egress
- Storyworld database credentials in ComfyUI
- Automatic production promotion
- Routine user dependency on the graph UI

## Required outputs

- WorkflowDefinition
- WorkflowPromotion
- security_review
- execution_binding
- recorded_fixture
- replacement_test
- operator_profile

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Node allowlist, endpoint allowlist, restricted-input denial, unauthorized egress, version drift, reproducibility, replacement workflow, output custody

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

- DEC-0012
- DEC-0045

### Related contracts

- WorkflowDefinition
- WorkflowPromotion
- ProviderExecutionPlan
- ProviderExecutionResult

### Related POCs

- POC-07

### Relevant repository paths

- integrations/
- packages/providers/
- packages/workflows/
- apps/studio/

### Skill dependencies

- storyworld-provider-adapter
- storyworld-security-review
- storyworld-fixture-authoring

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`workflow-registration.md`](references/profiles/workflow-registration.md) — Stable Storyworld workflow ID, version, graph hash, capability, node packages, endpoint bindings, resource profile, evaluation, security class, status, rollback, and replacement.
- [`node-and-egress-security.md`](references/profiles/node-and-egress-security.md) — Dedicated service identity, no database credentials, immutable inputs, isolated outputs, deny-by-default egress, allowlisted endpoints/nodes, dependency pinning, time/resource limits, and redacted logs.
- [`hosted-endpoint-posture.md`](references/profiles/hosted-endpoint-posture.md) — Under current DEC-0012 posture, generative nodes call approved hosted endpoints; deterministic nodes may run in the controlled boundary. Local model weights require a successor decision.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
