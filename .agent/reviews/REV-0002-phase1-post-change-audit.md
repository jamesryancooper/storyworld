---
{
  "schema_version": "harness.review.v1",
  "id": "REV-0002",
  "title": "Phase 1 focused post-change audit: adversarial verification and remediation of the SWUX-001..007 scope",
  "task": "TASK-0016",
  "review_mode": "self_review",
  "status": "open",
  "recorded_at": "2026-07-30",
  "authority_source": "external:project-owner instruction 2026-07-30 — \"Run the audit now.\" — executing the TASK-0016 exit-gate audit under the storyworld-ux workflow; no product-acceptance, release, publication, credential, deployment, or external-action authority",
  "owner": "claude-agent (improvement program lead)",
  "scope": "Focused source-and-test audit of the Phase 1 implemented scope at commit 5759471 across the five exit-gate classes (false authority, accidental acceptance-class action, ambiguous duplicate mutation, fabricated provenance, lost work), the in-session remediation of its findings, and the resulting gate assessment",
  "evidence_refs": ["EVD-0022", "EVD-0025"],
  "limitations": [
    "Self-review disclosure: the auditor is the implementing agent. Independence was strengthened by two adversarial verification agents with no implementation context, tasked to refute the safety claims; their findings were independently re-verified against source before being acted on. This is not an independent human review.",
    "Source- and test-level only: no rendered browser pass, screen reader, zoom, theme, motion, or forced-colors verification occurred; the rendered matrix remains the open TASK-0016 gate item.",
    "Point-in-time against commit 5759471 plus the in-session remediation change set committed immediately after this record; findings and dispositions do not transfer to later revisions without reverification.",
    "No participant evidence; nothing here claims usability, WCAG conformance, or readiness."
  ]
}
---

# Phase 1 focused post-change audit

Successor review to REV-0001 for the Phase 1 (TASK-0016) scope. REV-0001 is
unmodified. This record reports what the adversarial verification found, what
was remediated in-session, what remains as accepted residual or follow-up,
and the exit-gate assessment. All evidence below is **observed fact**
(source, migration, or test at exact locations) unless labeled otherwise.

## Scope and evidence

- Exact revision: implementation at `5759471`; remediation in the change set
  this record is committed with. Validation on the final tree: `pnpm -r
  typecheck` 0 errors; all suites green (kernel 15, engine-api 14, studio 64
  incl. live-engine integration, evaluation 3, credentials 7, regression 18,
  remainder unchanged); `pnpm -r lint` clean; `git diff --check` clean.
- Method: two independent adversarial agents (engine/kernel; Studio) tasked
  to break the Phase 1 invariants; every acted-on finding re-verified
  directly against source by the auditor; fixes implemented with new
  negative/behavioral tests; full-workspace revalidation.
- Exclusions: Phase 2/3 scope; rendered behavior; anything outside the
  Phase 1 surfaces.

## Findings and dispositions

Severity is the adversarial assessment at discovery. Status is after the
in-session remediation.

| ID | Class | Severity | Finding | Status | Remediation and validation |
|---|---|---|---|---|---|
| E1 | lost-work | gate-blocking | Concurrent initial structure saves fork the head: NULL-supersedes roots evade the 0010 unique index (Postgres NULLs distinct) | **remediated** | Migration 0012 one-root-per-production and one-root-per-stable-id partial indexes plus supersedes-unique for canon revisions and findings; 23505 mapped to 409; concurrent-fork HTTP test proves [201, 409] and a single head |
| E2 | ambiguous-duplicate-mutation | gate-blocking | Idempotency key recorded in a separate transaction after the effect: crash-window and concurrent same-key both double-execute | **remediated** | Two-phase reservation: the key row is claimed before execution (primary key = mutex), finalized after; pending/orphaned keys fail closed to 409; definite client errors release the reservation for corrected same-key retry; concurrent exactly-once and release-then-retry tests |
| E3 | ambiguous-duplicate-mutation | residual-risk | Double acceptance of one candidate creates two divergent accepted masters | **remediated** | 0012 unique acceptance-derivation index; kernel double-accept test |
| E4 | false-authority | residual-risk | Completed replay served to any authenticated actor without re-authorization | **remediated** | Replay is actor-scoped (claiming actor recorded; mismatch 403); cross-actor replay test |
| E5 | ambiguous-duplicate-mutation | residual-risk | Duplicate/stale conflicts surfaced as 500 (double decide, concurrent supersede, absent-credential revoke), inviting retry storms | **remediated (partial)** | 23505 → 409 "duplicate"; NotFoundError → 404 (credential revoke converted); double-decide HTTP test. Residual: some legacy `Error("... not found")` throws in commands/assets/editor/state-packet still 500 — cosmetic, no unsafe effect, Phase 2 cleanup |
| E6 | fabricated-provenance | residual-risk | Receipts cannot distinguish claimed dev-header identity from verified bearer identity | **remediated (bounded)** | `identity_source` ("dev_header"/"mock_idp") recorded in every approval-receipt document and tested. Bounded residual: dev-header identity remains claimed-not-verified by design of the DEC-0021 alpha boundary; full verification is the identity reserved crossing |
| E7 | false-authority | residual-risk | Verified-token path skipped structural claim validation; tokens carry no tenant claim | **remediated (partial)** | verifyToken now rejects empty id/role and out-of-enum kind (tested at unit level). Accepted residual: no org/aud claim binding — single-org alpha, engine pinned to one tenant with RLS; deferred to the identity crossing |
| E8 | other | cosmetic | Structure receipt/column hash included the embedded hash, diverging from the canon-release convention | **remediated** | Column and receipt now use the document's embedded hash; kernel equality test |
| S1 | ambiguous-duplicate-mutation | residual-risk (borderline blocking) | No unknown/unavailable recovery in 4 of 6 acceptance flows — the only exits discarded the retained key, inviting a fresh-key duplicate | **remediated** | Shared CommandRecovery (same-key retry + check-status) wired into all six flows; component tests |
| S2 | ambiguous-duplicate-mutation / lost-work | residual-risk | Reload during an unknown outcome lost the retained key and all warning state | **remediated by disclosure** | sessionStorage unknown-outcome log plus a persistent dismissible banner in the shell; recorded on unknown/unavailable, cleared on later confirmation; tested incl. remount survival. Accepted residual: the key itself is not rehydrated — a post-reload resubmit mints a fresh key with the banner as the duplicate guard; full rehydration is a possible follow-up |
| S3 | lost-work (silent stale) | residual-risk | Evaluate and create-property swallowed refresh_failed: committed work invisible, button re-armed with a fresh key | **remediated** | Both flows show "recorded — refresh failed" and stay disarmed; component tests |
| S4 | accidental-action | residual-risk | Mid-review selector switch retargeted confirm to a different production/property than displayed (arc, release) | **remediated** | Reviewed subject frozen at open; selector disabled during review; review closes on selection change; subject names shown in every review; test |
| S5 | ambiguous-duplicate-mutation (latent) | residual-risk | Retained key could leak across logically different operations | **remediated** | Operation-identity-scoped keys in useEngineCommand (fresh key on opId change, retention within an op); key-capture tests |
| S6 | accidental-action (boundary) | residual-risk | Live-provider (fal) generation fires on a single Enter with real spend, gated only by an active key | **open — owner decision** | Not acceptance-class under DEC-0021, so outside the Phase 1 gate; recommendation: add a consequence review to live-provider generation runs. Needs an owner call (smallest scope addition) |

Server-side coverage added during the audit beyond the fixes: empty-waiver
refusal test (reviewer-authored rationale enforced at the kernel), and the
keyboard single-activation matrix now covers all six acceptance flows.

## Per-finding program dispositions (REV-0001 scope)

Format: finding | disposition | implementation evidence | validation evidence | residual risk | participant validation need.

| REV-0001 finding | Disposition | Implementation | Validation | Residual risk | Participant need |
|---|---|---|---|---|---|
| SWUX-001 | remediated | Safe-command state machine; durable atomic actor-scoped replay; recovery controls; unknown-outcome banner (EVD-0025 + this change set) | command-state, settings, recovery, banner, concurrent/replay/reservation tests | Reload recovery is disclosure-only (S2) | Useful for unknown-state copy comprehension |
| SWUX-002 | remediated | ConsequenceReview on all acceptance flows; frozen subjects; keyboard matrix | two-activation pointer+keyboard tests on all six flows; S4 test | Rendered keyboard/AT pass pending | Useful for language |
| SWUX-003 | remediated | Canned waiver removed; typed rationale/scope required client- and server-side; verbatim payloads | fabrication-string regression; disabled-confirm; kernel empty-waiver refusal | None material | Unnecessary |
| SWUX-004 | remediated | canon.release.created; non-publication statements; affected-pins context; impact route | kernel action test; receipt read; UI copy tests | Legacy action-name display label in future receipt panels (Phase 2) | Unnecessary |
| SWUX-005 | remediated | Crossing consequence reviews; no value echo; same-key retry + reconcile | settings tests incl. no-echo and unknown/retry | Rendered pass pending | Unnecessary |
| SWUX-006 | remediated within the DEC-0021 boundary | Dev-mode gating; no human defaults; role binding incl. bearer path; identity_source in receipts; token claim validation | negative matrix (dev-off, missing/partial/invalid, wrong role over headers and bearer); identity_source test | Tenant claim binding and real IdP deferred to the identity crossing (E7) | Unnecessary |
| SWUX-007 | remediated | Server-side contract validation; typed append; preservation and healing; linear-supersession DB guards incl. root forks | byte-for-byte preservation; stale 409; concurrent-fork test; healing test | None material | Unnecessary |

## Exit-gate assessment

Verdicts at source/test level on the final tree, per gate class:

- **False authority — pass.** Role binding holds over both identity paths;
  replay is actor-scoped; nothing defaults to human; receipts name their
  identity source. Accepted residuals E6/E7 are bounded by the DEC-0021
  alpha boundary and recorded.
- **Accidental acceptance-class action — pass.** Two activations required on
  every acceptance flow (pointer and keyboard, tested); reviewed subjects
  frozen and named. Open recommendation S6 concerns a non-acceptance spend
  path and needs an owner decision.
- **Ambiguous duplicate mutation — pass.** Exactly-once execution per key at
  the database; fail-closed pending keys; same-key recovery in every flow;
  op-scoped keys; disclosure banner across reload. Accepted residual: S2
  disclosure-only reload recovery.
- **Fabricated provenance — pass.** No canned content anywhere (regression-
  guarded); receipts record actual actor, role, identity source, and
  subject hashes; replay writes no receipt.
- **Lost work — pass.** Input survives every failure path (tested);
  complete-document preservation with DB-enforced single heads; refresh
  failures visible everywhere.

The audit half of the TASK-0016 exit gate is therefore satisfied at source
and test level. The rendered browser/assistive-technology matrix remains
the open gate item before closure, and S6 awaits an owner call.

## Conclusion and limitations

- Actionable remainder: S6 owner decision; E5 legacy-throw cleanup and the
  legacy action-name display label (Phase 2); HTTP-boundary tests for
  credentials/dispositions/editor and non-owner-over-bearer on the
  remaining routes (kernel-shared enforcement mitigates; follow-up);
  rendered matrix.
- Residual risks: S2 disclosure-only reload recovery; E6/E7 identity-
  crossing deferrals — all recorded above with their bounds.
- Review limitations: see frontmatter.
- Approval authority: none created by this review.
