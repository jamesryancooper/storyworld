---
name: storyworld-provider-adapter
description: Build and maintain Storyworld hosted-provider adapters behind capability profiles, provider-neutral recipes, policy gates, durable workflows, custody, and exact execution receipts.
---

# Storyworld Provider Adapter

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Use OpenRouter, fal.ai, and future providers without letting their APIs, prompts, models, URLs, or fallback behavior become Storyworld authority.

## Use this skill when

- Adding or changing language, multimodal, image, video, audio, embedding, transcription, TTS, or transformation provider capabilities

## Do not use this skill when

- Calling a provider directly from Studio or domain code
- The adapter would write accepted state
- The egress, credential, cost, or capability policy is unresolved

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- ProviderCapabilityProfile
- ProviderPolicy
- ProviderEgressDecision
- CostPolicy
- canonical_GenerationRecipe

## Optional inputs

- recorded_provider_fixture
- provider_credentials_binding
- fallback_policy
- workflow_profile

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Define capability, input/output contract, supported modalities, limits, and named task profile
2. Compile the provider-neutral recipe or analytic request into ProviderExecutionPlan
3. Preflight credentials, egress, rights, retention, fallback, budget, rate, and idempotency
4. Submit through a durable workflow and persist request identity before waiting
5. Handle callbacks, polling, cancellation, retries, duplicate events, timeouts, and late results
6. Capture actual provider/model/endpoint, prompts, parameters, costs, logs, and retention evidence
7. Ingest outputs into quarantine and Storyworld custody
8. Return ProviderExecutionResult and findings; never accept assets or canon

## Required invariants

- Canonical recipe excludes provider implementation details
- Fallback must be policy-equivalent
- Secrets never enter prompts/logs/receipts
- Unknown outcomes remain reconcilable
- Provider completion only creates candidate potential

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Provider direct write to assets/canon/approval
- Silent model or route substitution
- Browser-exposed provider secrets
- Permanent provider URLs
- Automatic fallback for prohibited profiles

## Required outputs

- provider_adapter
- execution_plan
- execution_result
- workflow_events
- cost_receipt
- custody_handoff
- recorded_fixtures

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Provider mock and recorded replay
- Malformed structured output
- Fallback refusal
- Timeout/late completion
- Credential revocation
- Cost increase
- Provider substitution

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

- ADR-0015
- DEC-0043
- DEC-0044

### Related contracts

- GenerationRecipe
- ProviderExecutionPlan
- ProviderExecutionResult
- ProviderCapabilityProfile
- ProviderPolicy
- ModelCapabilityApproval
- CredentialBinding
- CostPolicy

### Related POCs

- POC-02
- POC-03
- POC-13

### Relevant repository paths

- packages/providers/
- packages/workflows/
- packages/credentials/
- packages/evaluation/
- apps/studio/src/components/generation-workbench.tsx

### Skill dependencies

- storyworld-contract-authoring
- storyworld-rights-and-consent-review
- storyworld-asset-custody-and-lineage
- storyworld-security-review

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`openrouter.md`](references/profiles/openrouter.md) — OpenRouter profile: named capability profiles; strict structured output; proposed tool calls only; provider allow/deny lists; ZDR/data-collection rules; fixed/no-fallback profiles; actual route/cost capture; user-supplied credentials first.
- [`fal.md`](references/profiles/fal.md) — fal profile: queue-first durable execution; persist request ID; webhook authentication/deduplication; poll recovery; cancellation; late-result quarantine; X-Fal-Store-IO policy; short-lived URLs; immediate custody; cost reconciliation.
- [`provider-boundary.md`](references/profiles/provider-boundary.md) — Canonical GenerationRecipe -> noncanonical ProviderExecutionPlan -> ProviderExecutionResult -> quarantine/candidate. Prompt, seed, model, workflow, LoRA, endpoint, upload URL, and provider safety parameters stay noncanonical.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
