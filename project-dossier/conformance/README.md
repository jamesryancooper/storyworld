# Conformance

Conformance compares current evidence with canonical requirements.
`../machine-readable/findings.json` owns finding records; this file owns
assessment method, vocabulary, coverage, and summary.

## Classification vocabulary

Conformant · Compatible · Transitional · Nonconformant · Absent ·
Not Assessed · Not Applicable

## Method (assessment of 2026-07-29)

Direct inspection of `main` at the accepted V1 revision, the implementation
tree, contract and platform validators, accepted decisions DEC-0001–DEC-0017,
and evidence EVD-0007–EVD-0018 (see `../current-state/README.md`) compared
against active requirements REQ-0001–REQ-0010 in
`../machine-readable/requirements.json`.

## Summary and coverage

| Finding | Requirement(s) | Classification |
|---|---|---|
| FIND-0001 — accepted F0/F1 contract pack implemented and CI-validated | REQ-0010 | `conformant` |
| FIND-0002 — V1 alpha implements the core architecture; production crossings remain | REQ-0001–REQ-0009 | `compatible` |

Coverage: all ten active requirements are covered by the two findings. F0–F3
and B1–B4 passed their recorded gates; the owner accepted the consolidated V1
alpha through DEC-0017/EVD-0018.

`compatible` is deliberate: the implemented alpha preserves the canonical
authority and architecture boundaries, but production key custody, TLS/real
identity, aggregate spend accounting, real model-assisted evaluation, live
Commerce Foundry/channel crossings, and production operations/reliability are
not complete. GATE-0006 therefore records the V1 alpha as passed while overall
production readiness remains `not_ready`.

Findings are reassessed when requirements change, current evidence changes, a
reserved crossing opens, or a later phase gate is evaluated.
