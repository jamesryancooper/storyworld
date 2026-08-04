# Storyworld Publication Scheduler Checklist

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
  - [ ] `PublicationAuthorization`
  - [ ] `exact_ChannelPackage`
  - [ ] `destination_and_authority_host`
  - [ ] `schedule_and_timezone`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Create PublicationJob bound to exact package, destination, authority host, metadata, disclosures, time zone, execution window, quota/cost, retry, and failure policy
- [ ] Store authorization and capability expiry
- [ ] At execution time revalidate package hash, rights, consent, blockers, credentials, connector capability, quota, and current stricter policy
- [ ] Pause on material change, expired capability, cost/quota change, blocker, or uncertainty
- [ ] Execute only the authorized mechanical attempt
- [ ] Deduplicate retries and reconcile unknown outcomes before reattempt
- [ ] Record receipt, correction, withdrawal, supersession, or failure

## Invariants

- [ ] Verified: Scheduling preparation is distinct from authorizing publication
- [ ] Verified: Scheduler cannot select content or expand scope
- [ ] Verified: Current stricter policy wins
- [ ] Verified: Unknown outcome is not failure or success until reconciled

## Validation

- [ ] Time-zone/DST
- [ ] Metadata change
- [ ] Expired rights/consent
- [ ] Connector outage
- [ ] Duplicate attempt
- [ ] Unknown result
- [ ] Quota increase
- [ ] Cancel just before execution

## Closure

- [ ] Required outputs exist:
  - [ ] `PublicationJob`
  - [ ] `execution_events`
  - [ ] `revalidation_record`
  - [ ] `PublicationReceipt`
  - [ ] `pause_or_cancel_receipt`
  - [ ] `unknown_outcome_resolution`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
