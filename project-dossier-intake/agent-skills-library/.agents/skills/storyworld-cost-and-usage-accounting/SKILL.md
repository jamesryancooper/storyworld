---
name: storyworld-cost-and-usage-accounting
description: Implement Storyworld provider-cost estimation, allowances, per-job and batch confirmation, production budgets, actual reconciliation, attribution, and pause rules.
---

# Storyworld Cost And Usage Accounting

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Make AI spending visible and governable without letting cost optimization weaken privacy, rights, quality floors, or authority.

## Use this skill when

- Adding provider requests, previews, batches, queues, managed credentials, usage reporting, or budget controls

## Do not use this skill when

- A provider call has no cost ceiling or attribution
- Reducing privacy or policy to save money

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- CostPolicy
- workspace_or_production_budget
- credential_binding
- provider_price_snapshot

## Optional inputs

- member_attribution
- estimate_confidence
- managed_billing_plan

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Estimate cost where provider information permits and state uncertainty
2. Attribute estimate to workspace, production, command, operation, credential supplier, and member
3. Compare against low-cost allowance, per-job, batch, daily, weekly, and total limits
4. Require confirmation for every batch and any job outside applicable allowance
5. Pause when cost becomes materially higher or estimate is unavailable under policy
6. Record actual usage/cost from provider receipts
7. Reconcile estimate versus actual and update budget state
8. Queue only with price snapshot and execution-time revalidation

## Required invariants

- Policy/privacy and quality floors precede cost
- Budget approval is not creative approval
- Unknown estimate is visible
- Managed billing remains deferred until separately decided

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Unbounded provider requests
- Silent retries multiplying cost
- Cross-member key use without scope
- Charging based on unverified provider data

## Required outputs

- cost_estimate
- budget_preflight
- confirmation_requirement
- actual_cost_receipt
- attribution_record
- reconciliation

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Unknown estimate, price increase, batch, retry, fallback, member credential, queued stale price, daily/total limit

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

### Related contracts

- CostPolicy
- CredentialBinding
- ProviderExecutionResult

### Related POCs

- POC-02
- POC-03
- POC-13

### Relevant repository paths

- packages/providers/
- packages/credentials/
- packages/workflows/
- apps/studio/

### Skill dependencies

- storyworld-provider-adapter
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
