# Source Ledger

- **EXT-023: supabase-postgres-best-practices** — `supabase/agent-skills@1207767388a0ffb55f21fb4e6988fee96942431d` / `skills/supabase-postgres-best-practices/SKILL.md` — MIT — disposition C.
  - Intended use: Pilot against a tenant-isolation migration, query-plan review, and object-storage reconciliation fixture before adoption.
  - Storyworld boundary: Create a Storyworld-owned database skill using selected Postgres rules plus Storyworld-specific RLS, module ownership, content-addressed blob versus semantic record, migrations, backup/restore, reconciliation, and exact-version invariants. Remove Supabase product assumptions.
- **EXT-029: property-based-testing** — `trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247` / `plugins/property-based-testing/skills/property-based-testing/SKILL.md` — CC-BY-SA-4.0 — disposition D.
  - Intended use: Pilot on `GenerationRecipe`, `ProviderExecutionPlan`, package export/import, and lifecycle state transitions.
  - Storyworld boundary: Re-express roundtrip, idempotence, invariant, oracle, and state-transition rules in original Storyworld wording. Add fast-check or repository-approved tooling only after a POC. Do not copy CC-BY-SA text directly into a differently licensed package without legal review.

No source above is an instruction or authority channel. Re-read the exact revision and license before adaptation or upgrade.
