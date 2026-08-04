# Storyworld Evaluation Layer Checklist

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
  - [ ] `evaluation_semantic`
  - [ ] `authority_classification`
  - [ ] `fixture_set`
  - [ ] `finding_contract`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] State the semantic and the harm of false positive/negative outcomes
- [ ] Classify deterministic checks, measurable indicators, model-assisted findings, and required human judgment
- [ ] Define evidence refs, subject refs/hashes, severity, confidence, limitations, and remediation
- [ ] Decide whether the result may block, warn, or only inform
- [ ] Define waiver eligibility, authority, scope, expiry, and invalidation
- [ ] Build valid, invalid, ambiguous, provider-substitution, and mutation fixtures
- [ ] Measure against human baseline where interpretation is involved
- [ ] Integrate findings into Review Room and approval invalidation

## Invariants

- [ ] Verified: No universal quality score
- [ ] Verified: Model assistance creates findings, not acceptance
- [ ] Verified: Legal certainty is never claimed
- [ ] Verified: A pass means configured checks found no unresolved blocker, not that work is perfect

## Validation

- [ ] Mutation/defect injection
- [ ] False positive/negative review
- [ ] Provider substitution
- [ ] Recorded-provider replay
- [ ] Human disposition workflow

## Closure

- [ ] Required outputs exist:
  - [ ] `evaluation_definition`
  - [ ] `EvaluationPlan`
  - [ ] `findings`
  - [ ] `fixtures`
  - [ ] `baseline_results`
  - [ ] `waiver_rules`
  - [ ] `approval_invalidation_rules`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
