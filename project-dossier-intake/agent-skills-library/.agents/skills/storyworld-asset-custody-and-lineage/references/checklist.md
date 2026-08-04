# Storyworld Asset Custody And Lineage Checklist

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
  - [ ] `asset_lifecycle_contracts`
  - [ ] `storage_and_hashing_contract`
  - [ ] `rights_and_retention_policy`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Classify artifact as source, evidence, temporary input, disposable experiment, generated output, candidate, rejected candidate, master, workfile, rendition, package, publication, runtime artifact, superseded version, or archived evidence
- [ ] Ingest bytes into configured Storyworld system-of-record storage
- [ ] Scan, validate, hash, normalize metadata, and record source/tool/provider versions
- [ ] Create immutable asset version and TransformationRecord links
- [ ] Apply rights, access, egress, retention, legal-hold, and expiry policies
- [ ] Run required evaluations before candidate admission or promotion
- [ ] Preserve rejected evidence and accepted lineage according to policy
- [ ] Support reproduction, supersession, withdrawal, and safe deletion gates

## Invariants

- [ ] Verified: Storyworld custody means governed system of record, not legal ownership
- [ ] Verified: Provider URLs and caches are temporary
- [ ] Verified: Accepted bytes are immutable
- [ ] Verified: Every derivative names its exact sources and transformations

## Validation

- [ ] Hash/fixity verification
- [ ] Provider URL expiry
- [ ] Corrupt/malicious media
- [ ] Rejected candidate retention
- [ ] Workfile preservation
- [ ] Reproduction through alternate provider

## Closure

- [ ] Required outputs exist:
  - [ ] `AssetVersion`
  - [ ] `TransformationRecord`
  - [ ] `custody_receipt`
  - [ ] `lifecycle_transition`
  - [ ] `retention_record`
  - [ ] `lineage_graph`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
