---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0018",
  "title": "V1 owner walkthrough and consolidated acceptance of DEC-0017 (with DEC-0013..0016)",
  "task": "TASK-0011",
  "recorded_at": "2026-07-29",
  "authority_source": "external:project-owner (Ryan Cooper) in-session acceptance 2026-07-29: walkthrough complete, decision accepted",
  "owner": "claude-agent, recording the owner's review and decision",
  "scope": "The DEC-0012-deferred owner usability walkthrough (all Studio surfaces against the live engine, incl. the credential store and the human authorship loop) and the consolidated V1 gate decision",
  "method": "Owner-performed walkthrough over several hours against the dev profile (production-build Studio, live engine, live Postgres/MinIO/Temporal): property creation, release snapshot + pinned production, narrative units, scene packets, governed generation, continuity evaluation and disposition, proposal decisions, credential entry surface, and the full propose -> decide -> snapshot -> World Bible loop. Each finding was fixed same-day with a regression test and CI-validated on the pushed tree before acceptance",
  "environment": "Owner machine, dev profile; Studio production build; CI ubuntu-latest for every fix",
  "subject_revision_or_fingerprint": "main at a6e8180 at acceptance time (fix commits 11629bb, 218d453, 0f5e0a5, 868d802, 271417f, a6e8180)",
  "result": "pass",
  "fresh_until": "2026-10-29",
  "supersedes": null,
  "limitations": [
    "Acceptance covers the alpha posture: dev identity, export-only publication, mocked model-assisted evaluation, and per-recipe spend ceilings remain the recorded operating limits until their O1 items land."
  ]
}
---

## The five walkthrough findings (all fixed before acceptance)

| # | Finding | Fix (commit / CI run) |
|---|---|---|
| 1 | Browser fetches blocked: engine answered no CORS preflights | Localhost-only CORS, foreign 403 (11629bb / 30467372971) |
| 2 | No fal model choice; flat cost estimate understated FLUX dev ~8x; endpoint-less fal mis-routed | Allowlist-derived catalog, per-model pricing, safe default (0f5e0a5 / 30475170734) |
| 3 | Created productions invisible on the screen that created them | Productions card in the Release Builder (868d802 / 30478640864) |
| 4 | Jargon fields unexplained (Story time foremost) | Vendored accessible InfoHint on seven fields (271417f / 30479692021) |
| 5 | Humans could decide proposals but not author them | Propose-to-canon form through the same governed doorway (a6e8180 / 30482523671) |

Plus the owner-instructed credential-store amendment (218d453 /
30473971608): envelope encryption, broker, Studio Settings — entering a
key is the receipted reserved-crossing act.

## Decision

Owner accepted DEC-0017 in-session; DEC-0013..0016 accepted by
consolidation. The B run is closed. V1 alpha operation begins.
