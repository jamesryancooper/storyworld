---
name: storyworld-voice-command
description: Build first-class voice command capture, transcription, contextual binding, ephemeral-audio handling, correction, and parity with text commands.
---

# Storyworld Voice Command

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Allow creators to direct Storyworld while watching or selecting media without making audio recordings or transcripts implicit authority.

## Use this skill when

- Implementing microphone capture, transcription, playhead-aware commands, voice correction, command steering, or voice accessibility

## Do not use this skill when

- Building general audio assets or dialogue recording
- Persisting command audio outside the separately governed source/evidence workflow

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- CreativeCommand_contract
- voice_retention_policy
- egress_policy
- selection_and_playhead_context

## Optional inputs

- transcription_provider_profile
- local_browser_capture_capabilities
- confidence_thresholds

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Capture audio only after explicit user action and show recording state
2. Bind recording to a frozen context token containing current target and timing
3. Transcribe through an approved route or deterministic/local mechanism permitted by policy
4. Delete ephemeral audio after transcript admission unless separately governed preservation applies
5. Show transcript, confidence, target, and assumptions before medium/high-consequence use
6. Support correction, cancellation, and steering
7. Create the same canonical CreativeCommand shape as text input

## Required invariants

- Voice and text have semantic parity
- Audio is ephemeral by default
- A changing selection cannot silently retarget an in-flight command
- Low-confidence material decisions require correction

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Always-on recording
- Retaining audio as a normal preference
- Sending restricted voice to an unapproved hosted route
- Treating speech tone as authorization

## Required outputs

- voice_capture_receipt
- transcript
- context_snapshot
- creative_command
- deletion_receipt
- correction_history

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Permission-denied and device-loss states
- Mistranscription fixtures
- Selection changes during processing
- Keyboard and screen-reader equivalent
- No secret or unrelated audio capture

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
- DEC-0041
- DEC-0044

### Related contracts

- CreativeCommand
- CreativeContext
- ProviderEgressDecision

### Related POCs

- POC-01

### Relevant repository paths

- apps/studio/
- packages/contracts/
- packages/providers/

### Skill dependencies

- storyworld-creative-command-implementation
- storyworld-provider-adapter
- storyworld-security-review

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
