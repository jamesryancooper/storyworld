# Canonical Record and Package Schemas

JSON Schema (draft 2020-12, per proposed DEC-0005) for the eleven Appendix B
schema artifacts. One schema per file, `kebab-case.schema.json`, each with
`$id`, `$schema`, a `version` const, and duplicate-key-free strict JSON.
Every schema ships with at least one valid and one invalid fixture under
`../fixtures/` and a round-trip test under `../tests/`.
