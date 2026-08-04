---
name: storyworld-publication-scheduler
description: Implement Storyworld's governed publication scheduler for exact authorized packages, revalidation, bounded retries, pause/cancel, unknown outcomes, and receipts.
---

# Storyworld Publication Scheduler

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Separate preparation, human publication authorization, and later mechanical execution without creating a generic ungoverned social scheduler.

## Use this skill when

- Scheduling export preparation or a separately activated direct destination connector

## Do not use this skill when

- No exact PublicationAuthorization exists
- The package, metadata, disclosures, destination, timing, or policy has materially changed

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- PublicationAuthorization
- exact_ChannelPackage
- destination_and_authority_host
- schedule_and_timezone

## Optional inputs

- connector_capability
- quota_cost_boundary
- retry_policy
- failure_policy

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Create PublicationJob bound to exact package, destination, authority host, metadata, disclosures, time zone, execution window, quota/cost, retry, and failure policy
2. Store authorization and capability expiry
3. At execution time revalidate package hash, rights, consent, blockers, credentials, connector capability, quota, and current stricter policy
4. Pause on material change, expired capability, cost/quota change, blocker, or uncertainty
5. Execute only the authorized mechanical attempt
6. Deduplicate retries and reconcile unknown outcomes before reattempt
7. Record receipt, correction, withdrawal, supersession, or failure

## Required invariants

- Scheduling preparation is distinct from authorizing publication
- Scheduler cannot select content or expand scope
- Current stricter policy wins
- Unknown outcome is not failure or success until reconciled

## Allowed side effects

`external_effects_require_explicit_current_authorization`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Automatic renewed authorization
- Changing destination or metadata
- Retrying non-idempotently
- Publishing while rights/consent are stale

## Required outputs

- PublicationJob
- execution_events
- revalidation_record
- PublicationReceipt
- pause_or_cancel_receipt
- unknown_outcome_resolution

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Time-zone/DST
- Metadata change
- Expired rights/consent
- Connector outage
- Duplicate attempt
- Unknown result
- Quota increase
- Cancel just before execution

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

- DEC-0050

### Related contracts

- PublicationAuthorization
- PublicationJob
- PublicationReceipt

### Related POCs

- POC-10
- POC-13

### Relevant repository paths

- packages/workflows/
- packages/integration/
- apps/studio/

### Skill dependencies

- storyworld-contract-authoring
- storyworld-publication-connector
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
