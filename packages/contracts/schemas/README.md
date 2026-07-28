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
| `canon-release.schema.json` | drafted (tranche 1) |
| `scene-state-packet.schema.json` | drafted (tranche 1) |
| `approval-receipt.schema.json` | drafted (tranche 1) |
| `narrative-campaign-brief` | pending (tranche 2) |
| `narrative-asset-bundle` | pending (tranche 2) |
| `runtime-content-release` | pending (tranche 2) |
| `generation-recipe` | pending (tranche 2) |
| `continuity-finding` | pending (tranche 2) |
| `rights-evidence` | pending (tranche 2) |
| `performance-observation` | pending (tranche 2) |

Enumerations (authority hosts, approval layers, sensitivity classes) must
match the accepted charter artifacts exactly; `../tests/validate_contracts.py`
enforces the coherence and fails CI on divergence. Every schema ships with at
least one fixture instance (synthetic smoke now; real golden fixtures when
PLAN-0007 content arrives).
