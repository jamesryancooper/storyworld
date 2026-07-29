---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0017",
  "title": "Credential store, broker, and Studio Settings: behavioral proofs (CF pattern ported)",
  "task": "TASK-0011",
  "recorded_at": "2026-07-29",
  "authority_source": "external:operator-instruction-2026-07-29 (owner: build the CF credential pattern with a Studio key-entry interface)",
  "owner": "claude-agent (storyworld-steward working mode)",
  "scope": "Envelope crypto, KEK ladder, receipted lifecycle, broker semantics, engine routes, Studio Settings, end-to-end hosted-generation activation and revocation",
  "method": "Three suites: @storyworld/credentials (AES-256-GCM envelope round trip plus tamper/wrong-key refusal; KEK ladder incl. named-file-must-exist and corrupt-file fail-closed; human-only allowlisted receipted entry with hints never values, asserted against the receipts AND the stored rows; replacement supersedes; revocation denies at issuance and the broker never falls back past it; env fallback only when no credential exists); Studio Settings component + axe suite (masked password input, hint badges, revoke); the HTTP E2E driving the Studio client against a live engine: absent -> enter (hint returned, plaintext absent from every response) -> fal generation staged with provider=fal provenance against a recorded-shape fake queue -> revoke -> 403 reserved-crossing refusal even with FAL_KEY set in the environment",
  "environment": "Local: macOS, Docker compose dev profile; CI: ubuntu-latest platform job",
  "subject_revision_or_fingerprint": "working tree at the tranche commit (recorded in the commit message)",
  "result": "pass",
  "fresh_until": "2026-10-29",
  "supersedes": null,
  "limitations": [
    "The live fal endpoint is exercised only when the owner enters a real key — that act itself opens the reserved crossing and is receipted.",
    "Dev KEK is auto-provisioned (outside the working tree, 0600); production custody (STORYWORLD_SECRET_KEY from a real secret manager or an operator 0600 file) is O1."
  ]
}
---

## Security-relevant assertions (all green)

- Plaintext appears in NO receipt, NO stored row, NO status response, and
  NO Studio DOM after save.
- Tampered ciphertext and wrong-key decryption throw typed crypto errors;
  a corrupt master-key file fails closed rather than being replaced.
- Revocation is a decision: issuance denies, the broker chain stops, and
  an environment FAL_KEY cannot resurrect a revoked credential.
- A newly entered key activates hosted generation with no restart
  (per-request resolution), proven over HTTP through the Studio client.
