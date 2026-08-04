# Storyworld Publication Connector Checklist

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
  - [ ] `ChannelPackage`
  - [ ] `destination_profile`
  - [ ] `authority_host`
  - [ ] `rights_and_disclosure_checks`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Implement export package first with exact content, metadata, accessibility, disclosures, and validation
- [ ] Define authority host, destination capability, credential scope, idempotency, quotas, and failure semantics
- [ ] Require exact PublicationAuthorization before any external attempt
- [ ] Revalidate material conditions immediately before execution
- [ ] Perform bounded idempotent transport and reconcile unknown outcome
- [ ] Record external IDs, timestamps, payload hashes, status, and PublicationReceipt
- [ ] Support correction, withdrawal, supersession, and fallback export

## Invariants

- [ ] Verified: Export remains first-class after direct connector
- [ ] Verified: Material change invalidates authorization
- [ ] Verified: Connector cannot alter creative content or scope
- [ ] Verified: External host outcome is not assumed

## Validation

- [ ] Dry-run/export fixtures
- [ ] Duplicate request
- [ ] Unknown outcome
- [ ] Rate/quota limit
- [ ] Metadata change invalidation
- [ ] Connector unavailable
- [ ] Withdrawal/correction

## Closure

- [ ] Required outputs exist:
  - [ ] `destination_exporter`
  - [ ] `publication_connector`
  - [ ] `validation_profile`
  - [ ] `PublicationReceipt`
  - [ ] `withdrawal_or_correction_receipt`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
