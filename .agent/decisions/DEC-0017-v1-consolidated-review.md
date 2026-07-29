---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0017",
  "status": "proposed",
  "previous_status": null,
  "title": "V1 consolidated owner review: accept the B run (B1-B4) and open the V1 dual-use alpha",
  "created_at": "2026-07-29",
  "authority_source": "external:project-owner (Ryan Cooper) — DEC-0012 named this consolidated review as the hard stop; only the owner can decide it.",
  "owner": "ryan-cooper (project owner)",
  "scope": "Consolidated acceptance of the four provisionally passed B gates (DEC-0013 B1 media pipeline, DEC-0014 B2 Studio, DEC-0015 B3 integration substrate, DEC-0016 B4 regression harness) on their evidence (EVD-0013..0016, all CI-validated), plus the owner actions that were deferred to this boundary. On acceptance: DEC-0013..0016 flip accepted, the B run closes, and V1 alpha operation begins.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "This decision is the DEC-0012 hard stop: nothing past it proceeds without the owner.",
    "Live generation, live CF, live channels, and real IdP all remain closed until their reserved crossings are individually opened."
  ]
}
---

## What you are accepting (one decision, four staged gates)

| Gate | What was built | Evidence |
|---|---|---|
| B1 (DEC-0013) | Provider gateway (mock + fal), durable Temporal workflows with governance refusals, continuity evaluation with human dispositions, focused regeneration, editor round trip, InvokeAI-local staged disabled | EVD-0013 |
| B2 (DEC-0014) | Six-surface Next.js Studio over the public API, vendored shadcn/ui-pattern design system, axe zero-violation gate, full HTTP E2E | EVD-0014 |
| B3 (DEC-0015) | CF connector + simulator CI + exportable conformance suite, deterministic runtime compiler, Instagram export-first adapter, mock-IdP SSO | EVD-0015 |
| B4 (DEC-0016) | Golden corpus, 100% defect catch, recorded provider replay, rubrics R1-R5, asserted baseline | EVD-0016 |

## The dual-use alpha is demonstrable today

- **BeKindRewind slice**: the bkr fixture family compiles clean through the
  real runtime compiler (deterministic, validation-refusing); acceptance
  receipts and hotfix reconciliation are receipted (`pnpm --filter
  @storyworld/runtime-compiler test`).
- **Vellumvale commerce campaign**: the owner's commerce fixtures run the
  full connected-campaign loop against the CF simulator — brief intake,
  bundle submission, commercial rejection, revision, approval,
  publication, source-drift staleness (`pnpm --filter
  @storyworld/commerce-connector test`).
- **Studio walkthrough (deferred to here)**: `docker compose -f
  infra/compose.yaml up -d`, then an engine (`TASK: see README`) and
  `pnpm --filter @storyworld/studio dev` — six surfaces operate the
  governed flows end to end.

## Owner actions at this boundary

1. Decide this record (accept / amend / reopen any staged gate).
2. Studio usability walkthrough (the DEC-0012 deferral) — notes become
   findings or backlog.
3. When ready to open live generation: enter the fal.ai key in
   **Studio -> Settings** (owner-instructed amendment 2026-07-29,
   TASK-0011/EVD-0017): envelope-encrypted at rest, receipted with a
   redacted hint, revocable with immediate deny. Entering the key IS the
   reserved-crossing act and is receipted as such. The InvokeAI install
   takes its own separate metered key inside InvokeAI's External
   Providers settings. FAL_KEY in .env.local remains only a headless/CI
   fallback and never overrides a revocation. Spend control is the
   per-recipe cost ceiling (default 0.50 USD per generation).
4. Optionally hand packages/commerce-connector/conformance/ to the CF
   side to run against a real endpoint.

## Validation and rollback

- Evidence: EVD-0013..0016; every tranche CI-green on the pushed tree.
- Reversal: reject or amend here; individual gates reopen without
  ceremony (append-only history preserves everything).
