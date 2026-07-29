---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0015",
  "title": "B3 integration substrate: CF connector loop, exportable conformance, runtime compiler, Instagram export-first, mock-IdP SSO",
  "task": "TASK-0009",
  "recorded_at": "2026-07-29",
  "authority_source": "external:operator-instruction-2026-07-28 (DEC-0012 B-run authorization with the CF-simulator deferral)",
  "owner": "claude-agent (storyworld-steward working mode)",
  "scope": "B3 exit behaviors across the three normative adapter interfaces plus the SSO boundary",
  "method": "vitest integration suites against live Postgres: (1) CF fixture loop on the owner's commerce fixtures — signed-brief intake with inbox dedupe, bundle v1 -> commercial rejection -> bundle v2 -> approval -> publication -> source-drift staleness with proposed actions and retained published work; simulator enforcing import-as-unapproved, idempotent receipt replay, typed 422 findings; the exportable no-dependency conformance runner (conformance/conformance.mjs) executed in CI against the simulator; (2) runtime compiler determinism (identical inputs -> identical hash), dangling-ref and circular-mission refusal, embedded asset index, runtime-authority acceptance receipts; (3) Instagram adapter: accepted-masters-only renditions with lineage receipts, Ed25519-signed envelope verified, C2 proof (platform-rule change via adapter version only); (4) mock-IdP bearer tokens verified at the engine boundary, forgeries 401. Ship-check green (run unpiped after the tranche-1 masking incident)",
  "environment": "Local: macOS, Docker compose dev profile. CI: ubuntu-latest platform job",
  "subject_revision_or_fingerprint": "main at f4874e5 (tranches baaf36c, f4874e5)",
  "result": "pass",
  "fresh_until": "2026-10-29",
  "supersedes": null,
  "limitations": [
    "CF-side verification is the simulator, not Commerce Foundry (DEC-0012 deferral); the conformance suite ships as a standalone artifact CF can point at a real endpoint.",
    "Publication submission remains export-only; no live channel credentials exist.",
    "Real IdP federation is O1; the mock IdP proves the SSO interface only.",
    "Tranche 1 initially shipped stale generated manifests (ship-check piped through tail masked a red lint); corrected in f4874e5 and recorded as a working-practice rule."
  ]
}
---

## Interface coverage

- commerce-foundry-connector.v1: all six inbound operations plus bundle
  submission implemented and fixture-tested; no shared tables, no
  counterparty credentials, at-least-once absorbed by the inbox.
- runtime-compiler.v1: compile, acceptance receipt, hotfix reconcile
  recorded; validation list per the interface (dangling refs, circular
  missions) enforced with typed errors.
- channel-adapter.v1: capabilities declaration, render to signed package,
  publication deliberately export-only pending authority policy.
