# Storyworld POC Execution Checklist

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
  - [ ] `poc_id`
  - [ ] `research_question`
  - [ ] `fixture`
  - [ ] `success_criteria`
  - [ ] `failure_cases`
  - [ ] `cost_ceiling`
  - [ ] `teardown_plan`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Confirm the POC is authorized and disposable
- [ ] Define the Storyworld-owned semantic layer before selecting dependencies
- [ ] Pin dependency versions, licenses, transitive packages, credentials, and external costs
- [ ] Build the smallest prototype with valid and intentional failure cases
- [ ] Run accessibility, security, privacy, performance, portability, replacement, and recovery checks
- [ ] Compare results to explicit success criteria
- [ ] Produce adopt, adapt, defer, reject, or repeat recommendation
- [ ] Tear down prototype code unless separately promoted through a governed task

## Invariants

- [ ] Verified: POC success does not adopt a dependency
- [ ] Verified: Production data and credentials are prohibited unless separately authorized
- [ ] Verified: Prototype code is not production code by default
- [ ] Verified: Decision evidence survives teardown

## Validation

- [ ] Check every declared success criterion and failure case
- [ ] Run replacement test
- [ ] Confirm costs stayed within ceiling
- [ ] Record unexecuted checks honestly

## Closure

- [ ] Required outputs exist:
  - [ ] `poc_report`
  - [ ] `evidence`
  - [ ] `dependency_inventory`
  - [ ] `security_and_accessibility_results`
  - [ ] `decision_recommendation`
  - [ ] `teardown_receipt`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
