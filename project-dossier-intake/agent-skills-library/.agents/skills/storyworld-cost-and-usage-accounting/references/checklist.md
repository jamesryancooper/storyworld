# Storyworld Cost And Usage Accounting Checklist

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
  - [ ] `CostPolicy`
  - [ ] `workspace_or_production_budget`
  - [ ] `credential_binding`
  - [ ] `provider_price_snapshot`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Estimate cost where provider information permits and state uncertainty
- [ ] Attribute estimate to workspace, production, command, operation, credential supplier, and member
- [ ] Compare against low-cost allowance, per-job, batch, daily, weekly, and total limits
- [ ] Require confirmation for every batch and any job outside applicable allowance
- [ ] Pause when cost becomes materially higher or estimate is unavailable under policy
- [ ] Record actual usage/cost from provider receipts
- [ ] Reconcile estimate versus actual and update budget state
- [ ] Queue only with price snapshot and execution-time revalidation

## Invariants

- [ ] Verified: Policy/privacy and quality floors precede cost
- [ ] Verified: Budget approval is not creative approval
- [ ] Verified: Unknown estimate is visible
- [ ] Verified: Managed billing remains deferred until separately decided

## Validation

- [ ] Unknown estimate, price increase, batch, retry, fallback, member credential, queued stale price, daily/total limit

## Closure

- [ ] Required outputs exist:
  - [ ] `cost_estimate`
  - [ ] `budget_preflight`
  - [ ] `confirmation_requirement`
  - [ ] `actual_cost_receipt`
  - [ ] `attribution_record`
  - [ ] `reconciliation`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
