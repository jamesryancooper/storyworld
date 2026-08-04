# Storyworld Contract Authoring Checklist

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
  - [ ] `contract_purpose`
  - [ ] `governing_decision_ref`
  - [ ] `authority_classification`
  - [ ] `at_least_two_fixture_needs_or_standard_mandate`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] State the contract's purpose and why a first-class object is warranted
- [ ] Define canonical, derived, temporary, external, or evidence status
- [ ] Define stable identity, immutable versioning, lifecycle, state transitions, authority, security, and retention
- [ ] Separate extensible controlled vocabularies from closed invariants
- [ ] Define inputs, outputs, references, hashes, receipts, unknown outcomes, and failure semantics
- [ ] Create positive, negative, boundary, compatibility, and replacement fixtures
- [ ] Add schema/OpenAPI/AsyncAPI artifacts, tests, documentation, and registry entries

## Invariants

- [ ] Verified: At least two materially different fixtures unless standards-mandated
- [ ] Verified: Private external formats remain behind adapters
- [ ] Verified: Unknown fields and version transitions are explicit
- [ ] Verified: A schema cannot confer human authority

## Validation

- [ ] Run contract-pack validation
- [ ] Validate fixtures with an independent implementation where required
- [ ] Test round-trip, rejection, version drift, and replacement behavior

## Closure

- [ ] Required outputs exist:
  - [ ] `contract_definition`
  - [ ] `schema`
  - [ ] `fixtures`
  - [ ] `tests`
  - [ ] `migration_notes`
  - [ ] `registry_update`
  - [ ] `evidence_receipt`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
