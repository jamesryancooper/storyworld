# F0 Charter Artifacts

Derived-normative charter artifacts for the F0 gate (GATE-0002): the
authority matrix, the property classifications and authority-host rule, the
sensitivity/rights classifications, the approval taxonomy, and the
golden-fixture / vertical-slice / stop-condition registry.

## Source direction

Each file is **derived from the canonical content pack**
(`project-dossier/canonical/storyworld/`, per-item `source_refs`) and
transformed into strict-JSON normative form for consumption by the F1
schemas and tests. Until DEC-0006 is accepted at GATE-0002:

- every file's `status` is `proposed`;
- on any conflict, the canonical pack governs and the drift is a defect here.

After acceptance, these artifacts become the machine-consumable owners of
their enumerations (authority hosts, approval layers, classifications) and
the canonical pack remains the prose explanation; subsequent changes flow
through ADRs and supersession, not silent edits.

## Files

| File | Owns (once accepted) | Feeds |
|---|---|---|
| `authority-matrix.json` | system authority boundaries; `authority_host` rule and enum | package envelopes, publication records, integration schemas |
| `property-classifications.json` | property types, Studio modes, classification dimensions | workspace/property schemas, RBAC attributes |
| `sensitivity-and-rights-classifications.json` | resource/visibility classes, sensitive-source rules, rights dimensions, risk severity vocabulary | rights-evidence schema, source-inbox rules, policy hooks |
| `approval-taxonomy.json` | the eight approval layers and binding rules | approval-receipt schema, lifecycle state machines, review contracts |
| `fixtures-and-slices.json` | named golden fixtures, vertical slices VS0–VS6, stop conditions, metric families | F1 fixture layout, gate evaluations, phase reviews |

Sixteen product ADRs in [`../adr/`](../adr/README.md) carry the durable
decisions these artifacts assume. Acceptance of the whole pack is proposed as
`DEC-0006` in `.agent/decisions/`.
