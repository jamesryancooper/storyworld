# Storyworld Decision Impact Analysis Checklist

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
  - [ ] `proposed_change`
  - [ ] `repository_revision`
  - [ ] `relevant_accepted_decisions`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] State the proposed durable change in neutral terms
- [ ] Locate accepted decisions, ADRs, authority-matrix entries, staged drafts, and implementation assumptions
- [ ] Classify each relationship as support, clarification, amendment, successor, supersession, deferral, or rejection
- [ ] Map impacted contracts, schemas, packages, fixtures, interfaces, dossier sections, tasks, and migrations
- [ ] Identify implementation that must remain blocked
- [ ] Draft the smallest independently ratifiable decision package and explicit alternatives

## Invariants

- [ ] Verified: Owner direction is binding input but does not silently supersede accepted decisions
- [ ] Verified: Historical alpha acceptance is not rewritten retroactively
- [ ] Verified: A successor names what remains valid and what changes

## Validation

- [ ] Every affected accepted decision must have an explicit disposition
- [ ] Every proposed successor must identify evidence, consequences, alternatives, and non-authorized effects

## Closure

- [ ] Required outputs exist:
  - [ ] `decision_impact_map`
  - [ ] `conflict_register`
  - [ ] `successor_or_amendment_draft`
  - [ ] `blocked_work`
  - [ ] `alternatives`
  - [ ] `owner_questions`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
