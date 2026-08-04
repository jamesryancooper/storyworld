# Storyworld Creative Command Implementation Checklist

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
  - [ ] `governing_decision`
  - [ ] `command_contracts`
  - [ ] `operation_contracts`
  - [ ] `consequence_policy`
  - [ ] `human_authority_policy`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Bind the original command to exact workspace, production, actor, base versions, selection, playhead, rights, egress, and budget context
- [ ] Interpret intent into targets, assumptions, ambiguities, preserved attributes, allowed variation, and affected media
- [ ] Classify consequence and clarification need before execution
- [ ] Build a dependency-aware CreativePlan with cost, preview, evaluation, and approval impact
- [ ] Compile only typed operations with stable Storyworld IDs
- [ ] Validate operations against current versions, policy, rights, and authority
- [ ] Create a proposal that supports accept all, accept selected, modify, reject, or branch
- [ ] Apply accepted operations to create immutable revisions and consequence receipts

## Invariants

- [ ] Verified: Conversation is never authority
- [ ] Verified: Selection context is snapshotted and visible
- [ ] Verified: Every mutation targets an exact base version
- [ ] Verified: Partial acceptance preserves operation dependencies
- [ ] Verified: Low/medium/high consequence rules cannot be downgraded by a model

## Validation

- [ ] Mistranscription and selection-drift tests
- [ ] Partial-acceptance dependency tests
- [ ] Idempotency and stale-version tests
- [ ] Cancel/steer/unknown-outcome tests
- [ ] Accessible proposal review

## Closure

- [ ] Required outputs exist:
  - [ ] `creative_command`
  - [ ] `interpretation`
  - [ ] `plan`
  - [ ] `typed_operations`
  - [ ] `proposal`
  - [ ] `preview`
  - [ ] `decision`
  - [ ] `revision`
  - [ ] `receipts`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
