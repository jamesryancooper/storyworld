# Conformance

Conformance compares current evidence with canonical requirements.
`../machine-readable/findings.json` owns finding records; this file owns
assessment method, vocabulary, coverage, and summary.

## Classification vocabulary

Conformant · Compatible · Transitional · Nonconformant · Absent ·
Not Assessed · Not Applicable

## Method (assessment of 2026-07-28)

Direct file inventory and read of the uncommitted working tree (see
`../current-state/README.md`) compared against the proposed requirements
`REQ-0001`–`REQ-0010` in `../machine-readable/requirements.json`.

## Summary and coverage

| Finding | Requirement(s) | Classification |
|---|---|---|
| FIND-0001 — F0/F1 contract pack absent | REQ-0010 | `absent` |
| FIND-0002 — platform implementation not assessable | REQ-0001–REQ-0009 | `absent` |

Coverage: all ten proposed requirements are covered by the two findings. This
is the expected pre-implementation state — the canonical target is thorough;
nothing has been built. Remediation is sequenced in
`../machine-readable/plan.json` (PLAN-0002 through PLAN-0005).

Findings are reassessed when requirements change, current state changes, or a
phase gate is evaluated.
