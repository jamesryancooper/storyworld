# Development Infrastructure

`compose.yaml` — the F2 local profile per DEC-0009 and canonical part 03
§9.4: PostgreSQL 16 (authoritative store, ADR-0004), MinIO (S3-compatible
immutable object storage, ADR-0005), Temporal auto-setup dev server
(ADR-0006). Dev-only credentials; never reuse outside local development.

    docker compose -f infra/compose.yaml up -d
