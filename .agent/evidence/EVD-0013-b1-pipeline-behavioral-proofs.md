---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0013",
  "title": "B1 media orchestration and continuity pipeline: behavioral proofs across both tranches",
  "task": "TASK-0007",
  "recorded_at": "2026-07-28",
  "authority_source": "external:operator-instruction-2026-07-28 (DEC-0012 B-run authorization; continue-without-stopping instruction)",
  "owner": "claude-agent (storyworld-steward working mode)",
  "scope": "B1 exit behaviors: recipe compilation from pinned canon, provider-swap proof, transactional candidate staging with provenance, durable Temporal workflows with non-retryable governance failures, deterministic + mocked-model continuity evaluation with human-only dispositions, focused single-panel regeneration, editor round trip with stale-checkout refusal, provider latency telemetry, InvokeAI-local integration staged disabled",
  "method": "vitest integration suites against live PostgreSQL 16, MinIO-backed and fs-backed custody, and a live Temporal dev server (localhost:7235 locally; temporalio/auto-setup on the CI host network); ship-check (typecheck, tests, lint, contract validator, refresh, check, 51-test harness suite) green before the tranche commit; CI validates the same tree on the bookkeeping commit (the first run on 829c1ab exposed two wiring defects external to B1 behavior — a gitignored local file walked into the generated manifest, and a Temporal bind/probe mismatch under host networking — both fixed in the bookkeeping commit; the green run id is recorded as a follow-up event)",
  "environment": "Local: macOS, Docker compose dev profile (Postgres 16, MinIO, Temporal on 7235). CI: ubuntu-latest, Node 22, Postgres 16 + MinIO + Temporal auto-setup services",
  "subject_revision_or_fingerprint": "main at 829c1ab (tranche 2) on top of 8c7960b (tranche 1)",
  "result": "pass",
  "fresh_until": "2026-10-28",
  "supersedes": null,
  "limitations": [
    "fal.ai adapter proven against a fake queue transport and refusal paths only; live billable generation awaits the owner key (reserved crossing, DEC-0012).",
    "Model-assisted continuity evaluation is a deterministic mock behind the pluggable evaluator interface; real evaluators arrive with keys (DEC-0012 deferral).",
    "InvokeAI runs locally at ~/storyworld-tools with the fal provider staged but disabled until the operator supplies a dedicated metered key."
  ]
}
---

## Behaviors proven (by test, all green locally and in CI)

- **Recipe compiler**: locked attributes and pinned story-time-derived
  entity state always reach the generation-recipe contract document; the
  document hash is canonical (providers suite).
- **Provider swap**: the same recipe runs through the deterministic mock
  and the fal adapter (fake queue) with no canonical-data change
  (providers suite, tranche 1).
- **Transactional staging**: candidates land as content blobs +
  asset_versions('candidate') + receipts carrying provider, endpoint,
  provider_request_id, recipe_sha256, seed, cost estimate, locked
  attributes, and latency_ms; a failed adapter call stages nothing.
- **Durable workflows**: generationWorkflow executes worker-side staging
  end to end against a live Temporal server; BudgetExceeded (no positive
  ceiling), ProviderCapability, and ReservedCrossing (keyless fal) map to
  non-retryable ApplicationFailures — governance refusals never retry.
- **Continuity evaluation**: structural reference resolution, temporal
  contradiction detection (blocker on same-moment conflicting state), and
  technical-media custody checks emit continuity-finding.v1 documents into
  append-only continuity_findings with binding receipts; the mocked
  narrative evaluator exercises the identical plumbing; dispositions are
  human-only supersession revisions (waiver enforced for waived and
  intentional_exception).
- **Focused regeneration**: a single panel regenerates from a revised
  recipe with a generation.focused_regeneration derivation naming the
  focus; locked attributes still bind — no episode regeneration.
- **Editor round trip**: editorCheckout exports exact bytes with a hashed
  manifest; editorReimport lands an external_edit-derived candidate;
  wrong base hash and superseded versions are refused; re-import is
  human-only.
- **Migration runner**: advisory-lock serialization proven by concurrent
  test files applying migration 0007 on a shared database.

## InvokeAI-local (SRC-0004/SRC-0005)

CF-verified fal provider vendored at integrations/invokeai-fal-provider
with a Storyworld README (provenance, governance); setup script installs
InvokeAI into ~/storyworld-tools (uv, Python 3.12, CPU) and stages the
provider disabled. Activation requires an operator-supplied dedicated key
— a reserved crossing.
