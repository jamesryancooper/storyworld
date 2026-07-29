---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0011",
  "status": "completed",
  "previous_status": "review",
  "title": "V1 amendment \u2014 envelope-encrypted credential store, broker, and Studio Settings (CF pattern)",
  "authority_basis": "external:operator-instruction-2026-07-29 (project owner Ryan Cooper): build the CF credential pattern into Storyworld with a Studio interface for entering keys, so live fal.ai testing can inform the DEC-0017 review.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-29",
  "updated_at": "2026-07-29",
  "dependencies": [
    "TASK-0010"
  ],
  "scope": "Port the Commerce Foundry credential architecture: envelope encryption at rest (per-credential DEK wrapped under a master KEK that never enters the database), KEK ladder (env -> operator 0600 file -> dev default OUTSIDE the working tree), append-only credential revisions with receipted entry/replacement/revocation carrying redacted hints only, allowlisted provider slots, and a broker (store first, env second, per-request resolution, revocation denies without env fallback) as the sole runtime path; engine routes + Studio Settings surface; fal generation path resolved through the broker in both engine-api and the Temporal activities. Out of scope: Vault/KMS custody (the KEK seam), monthly spend aggregation (recipe-level ceilings remain the control).",
  "acceptance_criteria": [
    "Plaintext never persisted or returned by any surface; hints only. Revocation denies immediately with no environment fallback. Enter-key -> hosted generation reachable without restart; the full loop proven over HTTP against a recorded-shape fake queue.",
    "Ship-check green (unpiped), pushed, CI green (run resolved by head SHA)."
  ],
  "validation_plan": [
    "bash infra/scripts/ship-check.sh (unpiped; exit code checked)",
    "git push; observe CI by head SHA"
  ],
  "implementation_result": "@storyworld/credentials (crypto/slots/service/broker, 7 tests incl. tamper detection, KEK-ladder rules, human-only receipted entry, deny-on-revocation, env fallback only when absent); migration 0009 provider_credentials (append-only revisions, RLS); engine-api routes GET/POST /v1/credentials + /v1/credential-revocations and broker-resolved fal adapter with FAL_BASE_URL test seam; Temporal activities resolve through the same broker; Studio Settings surface (masked entry, hint badges, revoke, store-state banner, reserved-crossing copy) wired into the nav with component + axe tests; the HTTP E2E now proves absent -> enter -> hosted generation staged with provider=fal provenance -> revoke -> refused even with an env key present. Dev engine provisions the master key at boot at ~/.storyworld/kek.key (0600, outside every working tree).",
  "review_evidence": [
    "EVD-0017"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0017"
  ],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided remote; a master-key file is created at ~/.storyworld/kek.key on first boot (outside the repository, 0600, reversible by deletion \u2014 deleting it orphans stored ciphertext).",
    "The credential value transits localhost HTTP once at entry (same as the CF console posture); TLS termination is an O1 concern.",
    "Issuance-time last-used stamping is deliberately absent (append-only store; generation receipts already record use).",
    "Monthly spend aggregation not built; the per-recipe cost ceiling remains the spend control."
  ]
}
---

## Scope

Owner-instructed V1 amendment; see frontmatter.

## Evidence and closure

- Evidence: EVD-0017. DEC-0017 amended: keys enter via Studio Settings;
  .env.local FAL_KEY demoted to headless fallback.
