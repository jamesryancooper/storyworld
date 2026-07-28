# Golden Fixture Packages

Rights-safe fixtures proving the contracts. Enumeration and classification
are owned by [`registry.json`](registry.json) (taxonomy governed by the
charter v2, accepted 2026-07-28 via DEC-0007). Source content is owner-supplied
(SRC-0003, PLAN-0007); all content is fictional and is test material, never
commercializable inventory. Fixture-only canon never silently promotes into
production property canon.

## Layout convention (F1 fixtures and probes)

```text
<fixture>/
├── MANIFEST.json          # fixture_id, ownership, fictional, sensitivity,
│                          # permitted_use, canon_classification, source map
├── source/                # owner-authored creative source (verbatim)
│   └── restricted/        # restricted test source; must never appear in
│                          # non-restricted records or packages
├── records/*.instance.json    # normalized valid contract instances
│                              # ($comment_schema names the schema $id)
├── invalid/*.invalid.json     # planned rejections: {$comment_schema,
│                              #  $expect_errors[], $description, instance}
└── expected/checksums.json    # sha256 of each record's canonical form
```

`tests/validate_contracts.py` enforces the whole convention: schema
validity, round-trip determinism, checksum stability, invalid-case findings,
registry coverage, restricted-source separation, and the MET-F1 metamorphic
transformations declared in `../tests/metamorphic-f1.json`.

## Contents

- `stillhouse/`, `editorial/`, `bekindrewind/`, `commerce/` — the four F1
  production fixtures (GATE-0003 exit set).
- `probes/` — eight compact F1 schema probes (PLAN-0008): branching,
  contested truth, nonlinear time, adaptation, shared canon, deep
  hierarchy, correction, rights change.
- `sources/packet/` — the owner's authoring packet: provenance, canon
  decision register, coverage matrix, pattern program.
- `sources/post-f1/` — owner-authored source for the five post-F1 property
  fixtures (PLAN-0009).
- `smoke/` — synthetic instances retained for isolated validator tests.
