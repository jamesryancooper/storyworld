# Storyworld Customer Managed Deployment Checklist

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
  - [ ] `customer_managed_deployment_decision`
  - [ ] `supported_platform_profile`
  - [ ] `data_and_secret_ownership_model`
  - [ ] `upgrade_contract`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Define supported topology, platform, resource, network, storage, identity, and backup requirements
- [ ] Package Engine, Studio, PostgreSQL, object storage, Temporal, workers, and approved self-hosted services
- [ ] Keep provider credentials customer-owned or scoped according to accepted credential decision
- [ ] Provide installation, health, upgrade, migration, backup, restore, export, and uninstall procedures
- [ ] Test provider outage and local deterministic operation
- [ ] Test data export and replacement without vendor services
- [ ] Document unsupported enterprise and local-model scenarios

## Invariants

- [ ] Verified: Customer-managed storage is Storyworld custody when configured as system of record
- [ ] Verified: No local model weights under current posture
- [ ] Verified: Small-team boundary remains
- [ ] Verified: Portable export and restore are mandatory

## Validation

- [ ] Fresh install, upgrade, rollback, backup/restore, provider outage, credential rotation, offline deterministic work, export/uninstall, malicious config

## Closure

- [ ] Required outputs exist:
  - [ ] `deployment_profile`
  - [ ] `installer_or_compose_package`
  - [ ] `health_checks`
  - [ ] `upgrade_and_migration_plan`
  - [ ] `backup_restore_receipt`
  - [ ] `portability_test`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
