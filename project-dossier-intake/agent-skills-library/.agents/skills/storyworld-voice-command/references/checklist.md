# Storyworld Voice Command Checklist

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
  - [ ] `CreativeCommand_contract`
  - [ ] `voice_retention_policy`
  - [ ] `egress_policy`
  - [ ] `selection_and_playhead_context`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Capture audio only after explicit user action and show recording state
- [ ] Bind recording to a frozen context token containing current target and timing
- [ ] Transcribe through an approved route or deterministic/local mechanism permitted by policy
- [ ] Delete ephemeral audio after transcript admission unless separately governed preservation applies
- [ ] Show transcript, confidence, target, and assumptions before medium/high-consequence use
- [ ] Support correction, cancellation, and steering
- [ ] Create the same canonical CreativeCommand shape as text input

## Invariants

- [ ] Verified: Voice and text have semantic parity
- [ ] Verified: Audio is ephemeral by default
- [ ] Verified: A changing selection cannot silently retarget an in-flight command
- [ ] Verified: Low-confidence material decisions require correction

## Validation

- [ ] Permission-denied and device-loss states
- [ ] Mistranscription fixtures
- [ ] Selection changes during processing
- [ ] Keyboard and screen-reader equivalent
- [ ] No secret or unrelated audio capture

## Closure

- [ ] Required outputs exist:
  - [ ] `voice_capture_receipt`
  - [ ] `transcript`
  - [ ] `context_snapshot`
  - [ ] `creative_command`
  - [ ] `deletion_receipt`
  - [ ] `correction_history`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
