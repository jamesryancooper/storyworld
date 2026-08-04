# Storyworld Deterministic Media Worker Checklist

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
  - [ ] `processing_profile`
  - [ ] `immutable_input_refs`
  - [ ] `resource_limits`
  - [ ] `output_validation_rules`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Classify the operation as deterministic and define exact expected outputs
- [ ] Run in an isolated worker with no database credentials and deny-by-default network egress
- [ ] Enforce file size, dimensions, duration, recursion, decompression, memory, CPU, GPU, disk, process, and timeout limits
- [ ] Pin tool/container/configuration versions and allowlisted operations
- [ ] Preserve original bytes and read-only input mounts
- [ ] Validate MIME, structure, metadata, color, duration, codec, hash, malware, and output limits
- [ ] Write outputs to quarantine and emit TransformationRecord with exact command/profile/tool evidence
- [ ] Promote only through Storyworld custody and evaluation

## Invariants

- [ ] Verified: Worker cannot accept assets or publish
- [ ] Verified: Technical transforms never overwrite source
- [ ] Verified: Color intent and technical transform are distinct
- [ ] Verified: Malformed inputs fail closed

## Validation

- [ ] Fuzz/malformed corpus
- [ ] Decompression bombs
- [ ] Codec/metadata edge cases
- [ ] Color round trip
- [ ] Timeout/resource exhaustion
- [ ] Tool replacement

## Closure

- [ ] Required outputs exist:
  - [ ] `processed_output`
  - [ ] `technical_metadata`
  - [ ] `TransformationRecord`
  - [ ] `scan_result`
  - [ ] `validation_result`
  - [ ] `worker_receipt`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
