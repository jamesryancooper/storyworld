# Storyworld Conformance And Release Checklist

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
  - [ ] `task_record`
  - [ ] `acceptance_criteria`
  - [ ] `changed_artifacts`
  - [ ] `governing_decisions`
  - [ ] `validation_contract`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Re-orient to the exact revision and dirty state
- [ ] Trace every acceptance criterion to implementation and evidence
- [ ] Run declared typecheck, test, lint, contract, harness, fixture, security, and accessibility checks proportionate to risk
- [ ] Inspect generated manifests and forbidden hand edits
- [ ] Check authority, lifecycle, unknown outcomes, exact-version binding, and reserved crossings
- [ ] Record findings with severity and disposition owner
- [ ] Issue completed, blocked, or incomplete receipt without implying acceptance beyond the active task

## Invariants

- [ ] Verified: Passing checks does not establish production readiness or external authority
- [ ] Verified: Skipped checks remain visible
- [ ] Verified: Review findings cannot be self-resolved without evidence
- [ ] Verified: External outcomes require external receipts

## Validation

- [ ] Validate the receipt itself contains revision, commands, exit results, findings, limitations, and external effects

## Closure

- [ ] Required outputs exist:
  - [ ] `conformance_receipt`
  - [ ] `criterion_trace`
  - [ ] `validation_results`
  - [ ] `findings`
  - [ ] `skipped_checks`
  - [ ] `limitations`
  - [ ] `closure_recommendation`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
