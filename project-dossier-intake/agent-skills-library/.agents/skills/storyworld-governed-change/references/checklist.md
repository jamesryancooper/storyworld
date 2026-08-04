# Storyworld Governed Change Checklist

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
  - [ ] `current_request`
  - [ ] `task_record`
  - [ ] `applicable_instructions`
  - [ ] `governing_decision_refs`
  - [ ] `project_validation_contract`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Confirm scope, authority, exclusions, and governing decisions
- [ ] Inspect affected callers, contracts, fixtures, and generated artifacts
- [ ] Create the narrowest coherent implementation and corresponding tests
- [ ] Update task, evidence, registries, dossier, and generated sources only where required
- [ ] Run risk-proportional checks and repository harness validation
- [ ] Request or perform independent review under current authority
- [ ] Record evidence, limitations, dirty state, and exact closure status

## Invariants

- [ ] Verified: No implementation before required successor decisions
- [ ] Verified: Never hand-edit generated files
- [ ] Verified: External effects require a separate explicit gate
- [ ] Verified: Unknown outcomes remain unknown until reconciled

## Validation

- [ ] Use .agent/validators.json as the repository validation contract
- [ ] Run refresh/check when dossier or harness paths require it
- [ ] Run typecheck/test/lint and contract checks proportionate to the change

## Closure

- [ ] Required outputs exist:
  - [ ] `task_update`
  - [ ] `changed_files`
  - [ ] `validation_evidence`
  - [ ] `review_disposition`
  - [ ] `completion_receipt`
  - [ ] `limitations`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
