---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0022",
  "title": "UX improvement program rebaseline: REV-0001 findings reverified against the current revision",
  "task": "TASK-0015",
  "recorded_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — improvement-program initialization requires reverifying every REV-0001 finding against the current revision before any change",
  "owner": "claude-agent (improvement program lead)",
  "scope": "Source-static reverification of SWUX-001..018 at the current revision, delta analysis against the audited commit, capability-prerequisite observation, and baseline structural validation",
  "method": "git diff against the audited commit; five parallel read-only source inspections re-deriving each finding's claims from current files; SHA-256 verification of REV-0001 and both mockups; baseline python3 -B .agent/scripts/validate.py --check",
  "environment": "Local macOS workspace on main at f45c2e33b8a5f14c5c85b5d1309312fffdc912fa; worktree clean at observation time; no services started, no browser rendering, no mutation, no external access",
  "subject_revision_or_fingerprint": "HEAD f45c2e33b8a5f14c5c85b5d1309312fffdc912fa; REV-0001 SHA-256 90893849d65b9dd045ed6beecd0b664bb413edddac3161d526b387bc29c44364; mockup M1 c5b8bd3cf690feb87ab3db736eedb352bbb95fef2e45d54c7b5ede668da5f34f; mockup M2 a5f888222e5926314827381def862b8f9f5bc2300a521071e7040af486b501d0",
  "result": "pass",
  "fresh_until": "2026-08-29",
  "supersedes": null,
  "limitations": [
    "Source-static only: no rendered walkthrough, browser matrix, screen reader, zoom, or mutation was executed; REV-0001's rendered-only measurements are carried as its point-in-time observations, not re-verified here.",
    "Reverification confirms the findings' source claims at this revision; it does not prove usability, prevalence, WCAG conformance, or remediation feasibility.",
    "The evaluator is primed by REV-0001 and both mockups; nothing here is participant evidence or an unprimed first-use result."
  ]
}
---

## Method

- Delta: `git diff --stat 91867ed..HEAD` — 9 files, all `.agent/` records and
  regenerated dossier integrity views (REV-0001, TASK-0014, EVD-0021,
  generated manifests). Zero changes under `apps/` or `packages/`, so the
  audited implementation is byte-identical at HEAD.
- Artifact integrity: REV-0001 and both mockup PNGs hash to exactly the
  fingerprints REV-0001 declares (values in frontmatter).
- Reverification: five parallel read-only inspections re-derived each
  finding's claims from current source, contracts, migrations, and tests,
  recording exact `file:line` citations and any imprecision in the original
  claim.
- Baseline validation: `python3 -B .agent/scripts/validate.py --check` — PASS
  (Python 3.14.0) before any record from this program was written.

## Result

All eighteen findings are **still present** at `f45c2e3`. Per-finding status
and the material precision corrections found during reverification:

| Finding | Status | Key current citations |
|---|---|---|
| SWUX-001 | still present | `apps/studio/src/lib/engine.ts:232` mints `crypto.randomUUID()` per `post` call; every mutation+refresh shares one try/catch (`settings.tsx:41-50`, `review-room.tsx:51-59`, `continuity-console.tsx:75-85`, `arc-board.tsx:57-82`, `release-builder.tsx:60-74`, `generation-workbench.tsx:76-95`); no receipt lookup or reconcile path in the client interface (`engine.ts:76-145`) |
| SWUX-002 | still present | Accept wired directly `review-room.tsx:269-271` via `onDecide` (:49-59); row shows only type/description/proposer (:258-277); Arc Board add posts from submit (`arc-board.tsx:52,73`) and the kernel records action `structure.accepted` (`packages/kernel/src/releases.ts:91`) |
| SWUX-003 | still present | Hard-coded waiver `continuity-console.tsx:80` — reason "Accepted as intentional by the owner", scope "this production", expiry null; one-click button :179-185 |
| SWUX-004 | still present | Receipt action `"canon.release.published"` `packages/kernel/src/releases.ts:49` (the only "published" terminology in kernel/engine/studio src); `canonChangeImpact` defined `packages/kernel/src/state-packet.ts:92-106`, exported, but not routed in `apps/engine-api/src/server.ts` and absent from the Studio client; no pinned-version impact/migration preview in `release-builder.tsx:163-197` |
| SWUX-005 | still present | `settings.tsx:36-64`: save (:42) and revoke (:57) fire immediately; consequence copy appears only post-action (:44, :58); no dialog/confirm state in the 139-line file |
| SWUX-006 | still present | Fixed `DEV_ACTOR` `engine.ts:199-203` sent by default (:211-217); header trust unless `MOCK_IDP_SIGNING` set AND a Bearer token present (`server.ts:84-97`); missing headers default `kind` to "human" (`server.ts:94`); `requireHuman` (`actors.ts:11`) is the sole authorization check across `commands.ts:35,113`, `releases.ts:22,64,84`, `assets.ts:60`, `editor.ts:57`; `authorityHost` stored but never enforced |
| SWUX-007 | still present | `arc-board.tsx:59-72` sends only `schema_version`, `structure_id`, `narrative_units`, `threads` — omitting 7 of 11 schema-required top-level fields (`property_id`, `canon_release_ref`, `production_ref`, `choices`, `branches`, `created_at`, `content_sha256`) and required per-unit fields (`display_number`, `publication_time`, `parent_unit_ref`); no server-side schema validation on the save path (`releases.ts:79-99` stores verbatim); tests assert the reduced shape (`arc-board.test.tsx:29-34`, `mock-engine.ts:104-121`) |
| SWUX-008 | still present | Sole nav `layout.tsx:27` is `hidden ... md:block`; header renders no navigation (:59-60); no menu/drawer anywhere in `apps/studio/src` |
| SWUX-009 | still present | `world-bible.tsx` `loaded` flag gates only the properties branch (:74-75), not "No canon release" (:77-79); `release-builder.tsx:137,172-174` and `review-room.tsx:244` have no loading flag; `command-center.tsx` gates only the header badge (:63), not the empty table (:80-83) |
| SWUX-010 | still present | Query returns the full document incl. confidence, evidence refs, subject hashes, remediation, waiver, receipt ref, found_at (`queries.ts:171-199`; passthrough `server.ts:301-305`); the console renders exactly five columns (`continuity-console.tsx:150-192`) |
| SWUX-011 | still present | Queue row = type/description/proposer/decide (`review-room.tsx:249-277`); `source_ref` persisted (`migrations/0006_narrative_kernel.sql:35`; written `commands.ts:93-95`) but not selected (`queries.ts:130-132`); decision `receipt_id` persisted but unreturned; no `rationale` field exists anywhere in the codebase |
| SWUX-012 | still present | Absence confirmed: no svg/canvas/graph library in `apps/studio` deps or source; no inspector component; units only in selects and table rows |
| SWUX-013 | still present | Route-local `useState` with `list[0]` auto-select (`production-picker.tsx:16-36`); zero `useSearchParams`/`useParams`/`useRouter` usage in `apps/studio/src`; flat `page.tsx` routes pass no context |
| SWUX-014 | still present; mechanism corrected | Tables are wrapped in `overflow-x-auto` (`ui/table.tsx:6`) and control rows use `flex-wrap`; the overflow driver is fixed widths — `w-64` (`production-picker.tsx:42,57`), `w-72` (`continuity-console.tsx:116`), `min-w-56` (`review-room.tsx:185,212`) — against ~272 px available inside `px-6` at 320 px. REV-0001's rendered overflow measurements stand as its point-in-time observation |
| SWUX-015 | still present | No skip link, no `aria-live`/`role=status|alert`, no `aria-invalid`, errors not associated to inputs; `info-hint.tsx:16` 16×16 trigger, no Escape handling; `test/axe.ts:13-16` disables four rules — `color-contrast`, `region`, `landmark-one-main`, `page-has-heading-one` (REV-0001 named two) |
| SWUX-016 | still present | Property rows are plain cells, no link/onClick (`command-center.tsx:85-106`); no attention aggregation in the file |
| SWUX-017 | still present | Absence confirmed: no presence/avatar/lock/assignment primitives; decisions/dispositions rendered without decider/role/receipt |
| SWUX-018 | still present | Every surface h1 is `text-lg`; `CardTitle` h2 is `text-base` (`ui/card.tsx:13`); no `aria-current`/active-route styling in `layout.tsx:37-42` |

Additional reverification facts material to Phase 1 design:

- The Engine has idempotency handling, but it is process-local
  (`server.ts:54` in-memory Map; replay marked `x-idempotent-replay`
  :105-109) and unreachable in practice because the client mints a fresh key
  per call.
- Several handlers set their success notice before the refresh call, so a
  failed refresh overwrites success with an error in the same catch
  (`review-room.tsx:96-97`, `continuity-console.tsx:64-65`,
  `release-builder.tsx:90-92`).
- The kernel requires a waiver object for `intentional_exception`
  (`packages/evaluation/src/evaluate.ts:116-122`) and generates
  `approver_receipt_ref` itself — the defect is canned client values for
  required fields, not unused kernel fields.
- Structure saves supersede append-only history; prior complete revisions
  survive, but the current revision becomes the reduced document and
  `export.ts:32-59` emits it verbatim.

Capability-prerequisite observation:

- `.agents/skills/storyworld-ux/SKILL.md` is absent from this checkout.
- The package exists untracked in the detached worktree
  `~/.codex/worktrees/8577/storyworld-platform` at the audited commit:
  13 files, 1330 lines, whole-package SHA-256
  `f43ce631407b1d381878973784940e748b40059531477f976297058f2a538294`.
- A full content review found no authority expansion, no external-action
  instructions, no embedded third-party instructions or URLs, no secret
  requests, and repo-path references that resolve in this checkout — with one
  traceability defect: its `references/provenance.json` self-asserts
  `adoption_status: "adopted"` with `adoption_decision_ref: "DEC-0023"`,
  which does not exist in this repository. Adoption, if authorized, must
  correct the adoption fields to a real accepted decision here.

Related decisions and gates: DEC-0017 bounds the accepted alpha; this record
creates no gate, approval, or disposition.

## Limitations

- Skipped checks: rendered walkthrough, Studio unit/integration suites,
  browser/accessibility matrix, and any mutation — the program's later phases
  own those under their own tasks.
- Assumptions: the delta analysis (docs-only since `91867ed`) is relied on to
  scope reverification to claim-accuracy rather than change detection.
- What this evidence does not prove: usability, prevalence, WCAG conformance,
  participant behavior, remediation feasibility, or any authority to
  implement.
