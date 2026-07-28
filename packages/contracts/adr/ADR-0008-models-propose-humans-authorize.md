# ADR-0008 — Models and tools may create proposals and candidates only

- Status: proposed (2026-07-28); acceptance via DEC-0006 at GATE-0002
- Scope: the authority ceiling for all generative and analytic automation
- Canonical sources: part 01 §3.1–3.2, part 03 §10.1, part 05 §15.2/§15.6, Appendix A ADR-008

## Context

The platform's durable value is trustworthy custody of meaning, rights, and
approvals. Any path where a model output silently becomes accepted truth —
extracted facts becoming canon, a completed provider job becoming an
accepted asset, an evaluation pass becoming a release — destroys that value
and cannot be audited after the fact.

## Decision

Every model, provider, workflow, connector, render runner, and agent output
enters the system as a proposal or staged candidate. Acceptance — of canon,
assets, waivers, releases, packages, iterations — requires an authorized
person and produces an immutable receipt bound to exact versions. A
completed provider job means only that a candidate exists. Automation never
approves its own or any other work (see approval taxonomy, charter).

## Consequences

- Human review is a designed cost, focused by evaluation layers and
  findings rather than eliminated.
- Every acceptance is reconstructible: who, what exact hash, under which
  policy.
- Batch or high-volume flows need efficient review surfaces, not approval
  shortcuts.

## Alternatives considered

- Confidence-threshold auto-acceptance: rejected — silent canon mutation
  with retroactive cleanup burden.
- Per-feature exceptions: rejected — one exception breaks the invariant
  everywhere.
