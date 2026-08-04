# Storyworld Fixture Authoring Checklist

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
  - [ ] `semantic_under_test`
  - [ ] `expected_invariant`
  - [ ] `fixture_rights_basis`
  - [ ] `owning_evaluation_or_contract`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Choose the smallest synthetic or owner-authorized material that isolates one semantic
- [ ] Declare source rights, exact versions, accepted specifications, permissible variation, and intentional difference
- [ ] Create a valid case and at least one intentionally invalid or adversarial case
- [ ] Inject one defect at a time where possible
- [ ] Define expected deterministic result, model-assisted finding, and required human judgment
- [ ] Record hashes, generation method, dependencies, and redistribution terms
- [ ] Register the fixture and add regression tests

## Invariants

- [ ] Verified: Fixtures never imply legal clearance beyond their recorded rights
- [ ] Verified: One-variable pairs are preferred
- [ ] Verified: Expected failures must fail for the intended reason
- [ ] Verified: No model response is treated as ground truth without a declared baseline

## Validation

- [ ] Verify hashes and reproducibility
- [ ] Run the fixture through the owning validator
- [ ] Confirm intentional failures and no accidental hidden variables

## Closure

- [ ] Required outputs exist:
  - [ ] `fixture_manifest`
  - [ ] `fixture_assets_or_records`
  - [ ] `expected_results`
  - [ ] `mutation_definition`
  - [ ] `rights_record`
  - [ ] `tests`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
