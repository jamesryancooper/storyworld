---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0025",
  "title": "Phase 1 safety-critical implementation and engineering validation (SWUX-001..007)",
  "task": "TASK-0016",
  "recorded_at": "2026-07-30",
  "authority_source": "external:project-owner instruction 2026-07-30 — \"Go ahead and start Phase 1 implementation.\" under the accepted DEC-0019..0023 and the standing improvement-program request",
  "owner": "claude-agent (improvement program lead)",
  "scope": "Implementation of the TASK-0016 work order across kernel, evaluation, credentials, persistence, engine-api, and Studio, with full-workspace engineering validation",
  "method": "Implement per accepted decisions; validate with pnpm -r typecheck, pnpm -r test (all packages, including the Studio live-engine integration file against loopback postgres), pnpm -r lint, git diff --check, and the declared harness refresh/check/test commands",
  "environment": "Local macOS workspace on main; loopback compose postgres (declared dev stack) for database-backed suites; in-process engine instances for HTTP tests; no live provider, credential value, publication, deployment, or external access",
  "subject_revision_or_fingerprint": "Phase 1 implementation change set on main succeeding 7f04e9e; the exact commit is recorded in repository history immediately after this evidence",
  "result": "pass",
  "fresh_until": "2026-08-30",
  "supersedes": null,
  "limitations": [
    "Engineering validation only: component/HTTP/kernel tests and jsdom axe checks ran; the rendered real-browser matrix (320 px, zoom, themes, motion, forced colors), screen-reader pass, and the focused post-change storyworld-ux audit remain open TASK-0016 gate items.",
    "The harness unit/mutation suite runs after this record is written and gates the implementation commit, mirroring the EVD-0021 ordering precedent.",
    "Workspace/property creation retains the human-kind check only: DEC-0021's enumerated acceptance-class set does not include it; recorded as intentional, revisitable by successor decision.",
    "packages/workflows keeps one pre-existing conditionally-skipped Temporal test; unrelated to this change set."
  ]
}
---

## Method

Implemented the TASK-0016 work order in two coordinated slices (kernel/engine
backend; Studio client), then validated the full workspace.

**Kernel and services:**

- `requireOwner` (human AND `property_owner`) now gates every enumerated
  acceptance-class command: canon decision, structure acceptance (both
  paths), canon release, production creation, asset acceptance, continuity
  disposition, credential entry/replacement/revocation, editor re-import
  (DEC-0021). Typed `ValidationError`/`ConflictError` map to 400/409
  problems.
- Narrative-structure writes are contract-validated server-side
  (`narrative-structure.ts` mirrors the schema including
  additionalProperties: false and embedded-hash integrity); explicit
  supersession is required, stale bases are 409s naming the current head,
  and migration 0010 adds a partial unique index making supersession
  linear at the database (DEC-0020; SWUX-007).
- New typed `addNarrativeUnit` command: the kernel loads the complete
  current document, appends the unit, preserves every other field, heals
  contract fields legacy reduced revisions lack, reseals the hash, and
  validates — the client never reconstructs the document.
- Canon-release receipts now record `canon.release.created`; the stored
  legacy action string remains immutable history (DEC-0019; SWUX-004).
- Every acceptance-class command embeds a complete
  `storyworld.approval-receipt.v1` document in its receipt detail (layer,
  decision, subject refs + sha256, policy refs, decided_by/role,
  authority_host storyworld, waiver when present) and returns `receiptId`;
  `GET /v1/receipts/{id}` serves receipts tenant-scoped (DEC-0023).
- Continuity waivers require reviewer-authored non-empty reason and scope;
  empty or missing waivers are refused as validation errors (SWUX-003).
- Engine identity is fail-closed (DEC-0021; SWUX-006): header identity
  works only under explicit `STORYWORLD_DEV_IDENTITY=1` (set by the dev
  script, preserving the DEC-0017 walkthrough); all three actor headers
  are required; nothing defaults to a human actor; unknown kinds are
  refused; bearer-verified actors pass through the same role checks.
- Idempotency replay is durable (SWUX-001): migration 0011 adds the
  tenant-scoped `idempotency_keys` table; a retained key replays the
  original result across engine restarts (proven by a two-instance test).
- `canonChangeImpact` is exposed read-only at `/v1/canon-change-impact`.

**Studio client:**

- `useEngineCommand` safe-command state machine: one retained idempotency
  key per operation series, duplicate blocking while submitting/unknown,
  same-key retry from unknown/unavailable, refresh separated from execute
  (a refresh failure keeps the confirmed result and says so), distinct
  honest messages per failure state (SWUX-001).
- Shared inline `ConsequenceReview` region (two explicit activations by
  construction) applied to proposal decisions, Arc structure saves,
  continuity dispositions, canon snapshots, production creation, and
  credential save/revoke — showing subject, exact version/hash, origin,
  actor line "development identity — not verified · authority host:
  storyworld", state transition, affected context, and the resulting
  receipt id (SWUX-002/005).
- The fabricated waiver is removed; dispositions expose findingId,
  confidence, evidence, subject hashes, and remediation at the decision
  point; waived/intentional dispositions require typed rationale and
  scope, sent verbatim; a source-wide test proves the canned string is
  gone (SWUX-003).
- Arc Board uses the typed append with `supersedesRevisionId`; 409s show
  the server-named head with reload guidance and the typed input survives
  every failure path (SWUX-007).
- Release Builder states "canon.release.created … does not publish
  anything externally" and lists pinned productions as affected context;
  Settings never echoes the credential value and offers same-key retry
  plus status reconciliation on unknown outcomes (SWUX-004/005).

## Result

- `pnpm -r typecheck`: 0 errors across the workspace.
- `pnpm -r test`: all packages green — domain 7, identity 2, storage 6,
  persistence 8, portability 2, kernel 12 (incl. new phase1-safety),
  cli 2, channel-instagram 3, credentials 7, commerce-connector 3,
  runtime-compiler 2, evaluation 3, providers 7, regression 18,
  engine-api 10 (incl. new phase1-authority matrix), workflows 3 (+1
  pre-existing conditional skip), studio 45 (incl. the live-engine
  integration file, not skipped).
- `pnpm -r lint`: clean. `git diff --check`: clean.
- New negative/behavioral coverage includes: dev-mode-off 401s for reads
  and writes; missing/partial headers and unknown kinds never defaulting
  to human; non-owner humans refused over headers AND verified bearer
  tokens; reduced documents 400; stale supersession 409 with input
  preserved; byte-for-byte preservation of choices/branches/threads on
  typed append; legacy-head healing; durable replay across two server
  instances; single activation never deciding (pointer and keyboard);
  waiver payloads carrying reviewer-typed values verbatim; refresh
  failure reported as success-with-warning; credential values never
  rendered.

## Limitations

- Skipped checks: real-browser rendered matrix, 200% zoom, text spacing,
  reduced motion, forced colors, screen reader — recorded as open gate
  items; jsdom axe checks (with review regions open) are not conformance.
- Assumptions: the compose postgres dev database is the declared loopback
  stack; migrations 0010/0011 applied to it during test runs.
- What this evidence does not prove: usability, WCAG conformance,
  participant outcomes, production readiness, or closure of TASK-0016 —
  the focused post-change storyworld-ux audit and rendered checks remain.
