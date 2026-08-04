---
name: storyworld-deterministic-media-worker
description: Implement sandboxed deterministic media ingestion, inspection, proxying, transformation, color, scanning, and validation workers.
---

# Storyworld Deterministic Media Worker

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Keep routine technical media processing inside the Storyworld-controlled boundary with reproducible receipts and no creative or acceptance authority.

## Use this skill when

- Adding FFmpeg, OpenImageIO, OpenColorIO, MediaInfo, ClamAV, libvips/sharp processing, thumbnails, proxies, waveforms, normalization, metadata, or technical validation

## Do not use this skill when

- A generative transformation is required
- Running an unpinned tool against untrusted media without isolation

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- processing_profile
- immutable_input_refs
- resource_limits
- output_validation_rules

## Optional inputs

- color_profile
- codec_profile
- malformed_media_corpus
- hardware_acceleration_profile

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Classify the operation as deterministic and define exact expected outputs
2. Run in an isolated worker with no database credentials and deny-by-default network egress
3. Enforce file size, dimensions, duration, recursion, decompression, memory, CPU, GPU, disk, process, and timeout limits
4. Pin tool/container/configuration versions and allowlisted operations
5. Preserve original bytes and read-only input mounts
6. Validate MIME, structure, metadata, color, duration, codec, hash, malware, and output limits
7. Write outputs to quarantine and emit TransformationRecord with exact command/profile/tool evidence
8. Promote only through Storyworld custody and evaluation

## Required invariants

- Worker cannot accept assets or publish
- Technical transforms never overwrite source
- Color intent and technical transform are distinct
- Malformed inputs fail closed

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Shelling arbitrary user commands
- Unbounded decompression
- Network fetch by media parser
- Secrets or database access
- Treating successful encode as creative approval

## Required outputs

- processed_output
- technical_metadata
- TransformationRecord
- scan_result
- validation_result
- worker_receipt

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Fuzz/malformed corpus
- Decompression bombs
- Codec/metadata edge cases
- Color round trip
- Timeout/resource exhaustion
- Tool replacement

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

- DEC-0048

### Related contracts

- TransformationRecord
- AssetVersion
- InterchangeProfile

### Related POCs

- POC-03
- POC-05
- POC-13

### Relevant repository paths

- packages/storage/
- packages/workflows/
- infra/
- packages/evaluation/

### Skill dependencies

- storyworld-security-review
- storyworld-fixture-authoring

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`ffmpeg.md`](references/profiles/ffmpeg.md) — Decode/encode, trim/join, proxy, frame extraction, waveform source, subtitles, audio normalization, streaming, and technical transforms through approved argument templates—not arbitrary shell strings.
- [`openimageio.md`](references/profiles/openimageio.md) — Robust image inspection, thumbnails, metadata, professional formats, malformed-input limits, and controlled image transforms.
- [`opencolorio.md`](references/profiles/opencolorio.md) — Pinned color configurations and transforms; separate authored ColorDesign/GradeIntent from technical input/display/output conversion.
- [`mediainfo-clamav.md`](references/profiles/mediainfo-clamav.md) — Normalized technical metadata and malware scanning before candidate admission.
- [`libvips-sharp.md`](references/profiles/libvips-sharp.md) — Fast routine web-image derivatives with explicit size, orientation, color, alpha, metadata, and output profiles.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
