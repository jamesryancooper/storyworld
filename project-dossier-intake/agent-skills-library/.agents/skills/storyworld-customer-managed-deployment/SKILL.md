---
name: storyworld-customer-managed-deployment
description: Package and validate customer-managed Storyworld deployments for eligible solo creators and small teams without expanding into enterprise scope or local model hosting.
---

# Storyworld Customer Managed Deployment

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Deliver portable Engine, database, object storage, Temporal, deterministic workers, self-hosted ComfyUI orchestration, and external-tool integration under customer control.

## Use this skill when

- Designing installation, upgrades, backup/restore, portability, support, secrets, health, or deployment profiles for customer-managed Storyworld

## Do not use this skill when

- Adding enterprise departments, large-studio tenancy, or local model weights
- Assuming a hosted Storyworld service has been approved

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- customer_managed_deployment_decision
- supported_platform_profile
- data_and_secret_ownership_model
- upgrade_contract

## Optional inputs

- container_or_native_packaging
- support_policy
- hosted_provider_credentials
- external_tool_detection

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Define supported topology, platform, resource, network, storage, identity, and backup requirements
2. Package Engine, Studio, PostgreSQL, object storage, Temporal, workers, and approved self-hosted services
3. Keep provider credentials customer-owned or scoped according to accepted credential decision
4. Provide installation, health, upgrade, migration, backup, restore, export, and uninstall procedures
5. Test provider outage and local deterministic operation
6. Test data export and replacement without vendor services
7. Document unsupported enterprise and local-model scenarios

## Required invariants

- Customer-managed storage is Storyworld custody when configured as system of record
- No local model weights under current posture
- Small-team boundary remains
- Portable export and restore are mandatory

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Hidden cloud dependency
- Default telemetry of governed content
- Bundling external creative apps without separate review
- Calling self-hosting enterprise-ready without evidence

## Required outputs

- deployment_profile
- installer_or_compose_package
- health_checks
- upgrade_and_migration_plan
- backup_restore_receipt
- portability_test

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Fresh install, upgrade, rollback, backup/restore, provider outage, credential rotation, offline deterministic work, export/uninstall, malicious config

A completion report must state:

- exact repository revision and dirty state;
- commands or checks actually executed;
- actual result of each check;
- checks not executed and why;
- known limitations and residual risks;
- external effects, costs, credentials, or network crossings, including “none”;
- decision and disposition owner for unresolved findings.

## Failure and escalation

Stop or narrow the task when:

- required authority or a governing decision is missing;
- current implementation contradicts the requested durable direction;
- a secret, personal, restricted, or highly restricted input lacks an approved path;
- the task would create an unreviewed public contract or migration;
- provider, external-tool, runtime, publication, or Commerce Foundry outcomes are ambiguous;
- required validation cannot run;
- unrelated repository work would be overwritten.

Record the blocking fact, smallest decision or evidence needed, safe partial result, and disposition owner. Never hide a blocked state by producing implementation-shaped prose.

## Traceability

### Related decisions

- DEC-0040
- DEC-0053 or hosting successor

### Related contracts

- CredentialBinding
- ProviderPolicy
- AssetVersion

### Related POCs

- POC-13

### Relevant repository paths

- infra/
- apps/
- packages/
- docs/

### Skill dependencies

- storyworld-security-review
- storyworld-conformance-and-release
- storyworld-cost-and-usage-accounting

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- No vendor- or medium-specific profiles are bundled for this skill.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
