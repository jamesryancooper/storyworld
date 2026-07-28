# Canonical Record and Package Schemas

JSON Schema draft 2020-12 (accepted DEC-0005), strict JSON, one schema per
file, closed object roots, `schema_version` const in every schema.

`$id` convention: stable tag URIs — `tag:storyworld-platform,2026:contracts/<name>/v1`
(chosen during TASK-0004 as the DEC-0005 "undecided" item; domain-neutral and
collision-safe; revisable by successor decision before external publication).

## Coverage (Appendix B target: 11 record/package schemas + envelope)

| Schema | Status |
|---|---|
| `common-package-envelope.schema.json` | drafted (tranche 1) |
| `canon-release.schema.json` | drafted (tranche 1); tranche-2 additive extensions (see below) |
| `scene-state-packet.schema.json` | drafted (tranche 1) |
| `approval-receipt.schema.json` | drafted (tranche 1) |
| `narrative-campaign-brief.schema.json` | drafted (tranche 2) |
| `narrative-asset-bundle.schema.json` | drafted (tranche 2) |
| `runtime-content-release.schema.json` | drafted (tranche 2) |
| `generation-recipe.schema.json` | drafted (tranche 2) |
| `continuity-finding.schema.json` | drafted (tranche 2) |
| `rights-evidence.schema.json` | drafted (tranche 2) |
| `performance-observation.schema.json` | drafted (tranche 2) |
| `narrative-structure.schema.json` | drafted (tranche 2) — new F1 primitive beyond Appendix B |

## F1 domain-model additions beyond Appendix B

Per the accepted decision rule (a generic primitive is added only when at
least two materially different fixture needs require the same semantics and
existing concepts cannot represent them coherently):

- **`narrative-structure.schema.json`** — narrative units with stable
  identity and explicit time coordinates (story time, presentation order,
  publication time, revision lineage), choices/branches with reconvergence,
  and promise/reveal threads. Grounded by schema probes A (branching),
  C (nonlinear chronology), and F (deep hierarchy) plus the BeKindRewind and
  Stillhouse production fixtures.
- **`canon-release.schema.json` additive extensions** (schema_version stays
  v1; all optional):
  - `assertions` — testimony distinct from facts (honesty, accuracy,
    confidence, correction lineage). Grounded by probes B (contested truth)
    and G (evidence correction) plus Stillhouse and The Lanterns.
  - `branch_metadata` — branch ancestry, source pinning, explicit
    overrides/composites/omissions for adaptations. Grounded by probe D and
    the canonical branch model (part 02 §5.2).
  - `shared_canon_dependencies` — version-pinned cross-property references
    mirroring the accepted product-snapshot pattern. Grounded by probe E;
    consumers never mutate provider canon.

Enumerations (authority hosts, approval layers, sensitivity classes) must
match the accepted charter artifacts exactly; `../tests/validate_contracts.py`
enforces the coherence and fails CI on divergence. Every schema ships with at
least one fixture instance (synthetic smoke now; real golden fixtures when
PLAN-0007 content arrives). The subset validator supports no `maximum`,
`anyOf`, or `patternProperties`; bounds noted in descriptions (e.g.,
continuity-finding confidence ≤ 1, rights-evidence `affected_on_expiry` map
values) are enforced by application invariants at implementation time.
