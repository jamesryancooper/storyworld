# Storyworld Provider Model Evaluation Checklist

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
  - [ ] `model_or_endpoint_identity`
  - [ ] `named_capability`
  - [ ] `egress_and_retention_requirements`
  - [ ] `fixture_suite`
  - [ ] `cost_and_latency_limits`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Register candidate as discovered with exact provider/model/endpoint version
- [ ] Review license, retention, training, route, geographic, security, and modality constraints
- [ ] Run capability-specific rights-safe fixtures against baseline and failure cases
- [ ] Measure schema adherence, fidelity, continuity, latency, cost, reproducibility, and known limitations
- [ ] Review outputs with qualified humans where interpretation is involved
- [ ] Approve only for named capability, egress class, provider route, retention mode, and policy
- [ ] Record deprecation, replacement, and prohibition triggers

## Invariants

- [ ] Verified: Approval is scoped, never universal
- [ ] Verified: Provider routing changes can invalidate approval
- [ ] Verified: Current availability is not durable identity
- [ ] Verified: Human evaluation remains required for creative judgments

## Validation

- [ ] Schema failure, provider substitution, price increase, retention change, route unavailable, benchmark drift, adverse creative fixture

## Closure

- [ ] Required outputs exist:
  - [ ] `ModelCapabilityApproval`
  - [ ] `evaluation_report`
  - [ ] `fixture_results`
  - [ ] `cost_latency_profile`
  - [ ] `limitations`
  - [ ] `promotion_or_rejection_decision`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
