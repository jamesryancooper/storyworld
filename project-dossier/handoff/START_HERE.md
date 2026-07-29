# Handoff Start

> Navigation only. Reinspect the repository and current instructions before
> resuming work.

## Current position (2026-07-29, V1 boundary — HARD STOP)

- F0-F3 accepted (GATE-0001..0005; DEC-0001..0012). The B run (B1-B4) is
  complete: every tranche shipped ship-check green and CI-validated.
- Four B gates are staged provisionally passed per DEC-0012:
  DEC-0013 (B1 media pipeline), DEC-0014 (B2 Studio), DEC-0015 (B3
  integration substrate), DEC-0016 (B4 regression harness), on evidence
  EVD-0013..0016.
- **The only open boundary is DEC-0017 — the V1 consolidated owner
  review.** Nothing proceeds without the owner deciding it.
- Reserved crossings still closed: live fal generation (needs FAL_KEY +
  budget), InvokeAI provider enablement (separate metered key), live CF,
  live channel publication, real IdP.

## Next safe action

Owner: read and decide `.agent/decisions/DEC-0017-v1-consolidated-review.md`
(it contains the gate table, the dual-use alpha demonstrations, and the
deferred owner actions).

## Resume in this order

1. Read `AGENTS.md` and `.agent/START_HERE.md`.
2. Read `.agent/state/current.json` and `.agent/state/RESUME.md`.
3. Read DEC-0017, then the staged gates DEC-0013..0016 and their evidence.
4. Validate: `python3 -B .agent/scripts/validate.py --check`.
