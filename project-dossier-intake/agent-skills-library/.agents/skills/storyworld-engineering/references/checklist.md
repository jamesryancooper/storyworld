# Storyworld Engineering Checklist

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
  - [ ] `applicable_instructions`
  - [ ] `repository_revision`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Orient to the repository and exact revision
- [ ] Classify the request as research, decision work, contract work, implementation, POC, validation, or external crossing
- [ ] Identify the governing accepted decisions and any staged successor needed
- [ ] Choose the smallest specialist skill chain using registry/routing.json
- [ ] Define authority, side effects, fixtures, validation, and evidence before work begins
- [ ] Route immediately; do not keep implementation logic inside the router
- [ ] Require conformance review and a completion receipt before closure

## Invariants

- [ ] Verified: Routing never expands authority
- [ ] Verified: Accepted repository decisions remain controlling until a successor is accepted
- [ ] Verified: Provider and external-tool private formats remain behind Storyworld-owned contracts
- [ ] Verified: A completion claim requires evidence from the responsible specialist and conformance skill

## Validation

- [ ] Validate every selected skill ID against registry/skills.json
- [ ] Confirm all dependency skills are included and no blocked decision is bypassed

## Closure

- [ ] Required outputs exist:
  - [ ] `routing_decision`
  - [ ] `skill_chain`
  - [ ] `authority_boundary`
  - [ ] `required_decisions`
  - [ ] `validation_plan`
  - [ ] `closure_requirements`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
