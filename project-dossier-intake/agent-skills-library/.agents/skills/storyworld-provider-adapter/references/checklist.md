# Storyworld Provider Adapter Checklist

## Intake

- [ ] Exact request and expected side effects are stated.
- [ ] Repository revision, branch, and dirty state are known.
- [ ] Applicable `AGENTS.md` and `.agent/` governance were read.
- [ ] Relevant accepted and staged decisions were classified separately.
- [ ] A task record exists for significant work.
- [ ] External crossings, credentials, spending, publication, or deployment are explicitly gated.

## Scope and authority

- [ ] The skill is applicable and the task is not better routed elsewhere.
- [ ] Required inputs are available:
  - [ ] `ProviderCapabilityProfile`
  - [ ] `ProviderPolicy`
  - [ ] `ProviderEgressDecision`
  - [ ] `CostPolicy`
  - [ ] `canonical_GenerationRecipe`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Define capability, input/output contract, supported modalities, limits, and named task profile
- [ ] Compile the provider-neutral recipe or analytic request into ProviderExecutionPlan
- [ ] Preflight credentials, egress, rights, retention, fallback, budget, rate, and idempotency
- [ ] Submit through a durable workflow and persist request identity before waiting
- [ ] Handle callbacks, polling, cancellation, retries, duplicate events, timeouts, and late results
- [ ] Capture actual provider/model/endpoint, prompts, parameters, costs, logs, and retention evidence
- [ ] Ingest outputs into quarantine and Storyworld custody
- [ ] Return ProviderExecutionResult and findings; never accept assets or canon

## Invariants

- [ ] Verified: Canonical recipe excludes provider implementation details
- [ ] Verified: Fallback must be policy-equivalent
- [ ] Verified: Secrets never enter prompts/logs/receipts
- [ ] Verified: Unknown outcomes remain reconcilable
- [ ] Verified: Provider completion only creates candidate potential

## Validation

- [ ] Provider mock and recorded replay
- [ ] Malformed structured output
- [ ] Fallback refusal
- [ ] Timeout/late completion
- [ ] Credential revocation
- [ ] Cost increase
- [ ] Provider substitution

## Closure

- [ ] Required outputs exist:
  - [ ] `provider_adapter`
  - [ ] `execution_plan`
  - [ ] `execution_result`
  - [ ] `workflow_events`
  - [ ] `cost_receipt`
  - [ ] `custody_handoff`
  - [ ] `recorded_fixtures`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
