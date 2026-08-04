---
name: storyworld-systematic-debugging
description: Diagnose Storyworld bugs, failed checks, unknown outcomes, provider errors, workflow failures, and cross-component regressions through reproducible root-cause investigation before implementing a bounded fix.
---

# Storyworld Systematic Debugging

This is a proposal-only Storyworld capability. It inherits the active task and cannot expand authority, adopt itself, approve work, activate credentials, perform external effects, or bypass project validation.

## Use this skill when

- A bug, failed check, performance regression, unknown outcome, provider callback inconsistency, data leak, or unexpected state is reported.
- Two attempted fixes have not resolved the same symptom.

## Do not use this skill when

- The task is unrelated to this lifecycle.
- A narrower existing skill owns the work.
- The active task does not authorize repository-local changes.
- A missing decision, license, security review, or source revision blocks safe execution.

## Required inputs

- exact symptom and expected behavior
- current revision and environment
- reproduction steps or evidence gap
- recent changes
- affected component boundaries
- applicable security and privacy constraints

## Authoritative sources

- current implementation and runtime evidence
- accepted contracts and lifecycle decisions
- task-scoped logs/traces that satisfy redaction policy

Read `references/provenance.json` before adopting or modifying this package. Read `references/source-ledger.md` before using an external rule. Use `references/task-checklist.md`, `references/output-contract.md`, and `references/adversarial-cases.md` during execution.

## Preconditions

- No fix is proposed before reproduction or a documented evidence-collection plan.
- Diagnostics must not expose credentials, restricted payloads, or unrelated tenants.
- Unknown outcomes remain unknown until reconciled.

## Workflow

1. Read the complete error and reproduce consistently.
2. Map the data, authority, and workflow boundaries crossed.
3. Compare with the nearest working path.
4. Trace the first divergence and state one falsifiable root-cause hypothesis.
5. Test one variable with the smallest safe experiment.
6. Create a failing regression fixture.
7. Implement one bounded root-cause fix.
8. Run fresh scoped and regression verification.
9. After repeated failed hypotheses, stop and request architectural review rather than stacking fixes.

## Required outputs

- root-cause statement with evidence
- boundary trace
- tested hypotheses
- regression fixture
- bounded fix or blocked finding
- verification receipt
- residual risks

## Prohibited actions

- guessing a fix without evidence
- logging secrets or private payloads
- making multiple unrelated changes in one hypothesis test
- changing accepted architecture to make a test pass
- claiming a provider job failed or succeeded without reconciliation
- using production data without authorization

## Validation

- original symptom reproduced or evidence limitation recorded
- regression fixture fails before and passes after
- full relevant validators pass
- no new cross-tenant or authority regression
- diagnostic instrumentation removed or governed

## Evidence receipt

- symptom
- revision
- reproduction
- hypothesis
- test result
- fix diff
- validation commands
- unknowns

## Failure and escalation

Return blocked with the missing evidence and safest next diagnostic action. Escalate for architectural review after repeated nonconfirming hypotheses or evidence of systemic coupling.

## Relationship to other Storyworld skills

Runs under governed-change; uses fixture-authoring and conformance-and-release; does not replace security-review for security incidents.
