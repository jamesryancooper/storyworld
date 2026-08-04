# Storyworld Schema Evolution Checklist

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
  - [ ] `existing_contract_version`
  - [ ] `proposed_change`
  - [ ] `consumer_inventory`
  - [ ] `governing_decision_ref`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Classify the change as compatible additive, compatible semantic, breaking, corrective, or deprecating
- [ ] Inventory producers, consumers, stored records, packages, fixtures, generated clients, and external adapters
- [ ] Define new version, migration, coexistence, unknown-field, and rejection behavior
- [ ] Update source schemas before generated artifacts
- [ ] Add old/new compatibility fixtures and failure cases
- [ ] Test import, export, replay, historical reads, and rollback
- [ ] Record deprecation and removal gates

## Invariants

- [ ] Verified: Semantic breaking changes receive new versions even if syntax still validates
- [ ] Verified: Enum growth is not assumed safe
- [ ] Verified: Historical exact versions remain interpretable
- [ ] Verified: Generated output is never the contract source

## Validation

- [ ] Validate old and new fixtures
- [ ] Run generated-client drift checks
- [ ] Test rejected downgrade and unknown-version behavior

## Closure

- [ ] Required outputs exist:
  - [ ] `compatibility_analysis`
  - [ ] `versioned_schema`
  - [ ] `migration_or_coexistence_plan`
  - [ ] `consumer_updates`
  - [ ] `fixtures`
  - [ ] `deprecation_record`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
