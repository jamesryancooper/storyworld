---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0005",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Contract-pack formats and toolchain",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) acceptance 2026-07-28 in the operator session.",
  "owner": "ryan-cooper (project owner)",
  "scope": "Formats and validation toolchain for packages/contracts/ (the F0/F1 contract pack) until superseded.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted 2026-07-28 by the project owner.",
    "Does not choose implementation-stack tooling (that is ASM-0001 / a later F2 decision)."
  ]
}
---

## Context

The F0/F1 contract pack (Appendix B) needs concrete format and tooling
choices before authoring starts: which schema dialect, API/event contract
formats, and what validates round-trips in CI. The harness deliberately runs
on Python 3.11+ stdlib with zero dependencies; the eventual product stack is
TypeScript-first (canonical part 03 §9.2).

## Decision

1. **JSON Schema draft 2020-12** for the eleven record/package schemas;
   strict JSON, one schema per file, `$id` + semantic `version` in each.
2. **OpenAPI 3.1** for `storyworld.openapi.yaml`; **AsyncAPI 3 with
   CloudEvents 1.0 envelopes** for the event catalog. YAML only in these two
   formats, parsed by a pinned parser inside the contract validator.
3. **Lifecycle state machines as strict JSON** mirroring the harness
   `lifecycle.json` pattern.
4. **First validator in Python 3.11+ stdlib** (round-trip, compatibility,
   package verification) so CI stays dependency-free; it wires into
   `.agent/project.json` `commands.project_test` and the CI workflow when it
   lands.
5. **TypeScript SDK generation deferred** until the OpenAPI contract
   stabilizes; adopting the TS toolchain records a successor or amendment to
   this decision.

## Consequences

- Benefits: zero new dependencies now; formats match the canonical
  contract-style requirements (part 04 §14); the harness and contract pack
  share one validation philosophy.
- Costs: stdlib-only validation is more code than adopting ajv/spectral
  immediately; revisited when the SDK toolchain arrives.
- Risks: dialect churn if TS tooling later prefers different drafts —
  mitigated by 2020-12 being the settled modern draft.
- Undecided: TS package manager/generator choice; schema `$id` URI scheme.

## Validation and rollback

- Evidence: first passing round-trip test run over schemas + fixtures.
- Reversal: successor decision; formats are files, migration is mechanical
  this early.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-28 in the operator
session: "I accept all these items," with one revision — Temporal is decided
now (ADR-0006 revised at acceptance) — and confirmation that Octon must plug
in cleanly later (ADR-0007 as drafted). Recorded by claude-agent.
