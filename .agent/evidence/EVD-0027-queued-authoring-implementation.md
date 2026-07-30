---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0027",
  "title": "Queued Arc authoring mode and toggle: implementation, validation, and focused verification",
  "task": "TASK-0017",
  "recorded_at": "2026-07-30",
  "authority_source": "authority:DEC-0020 — the accepted decision phasing queued Arc authoring mode and the governed per-property toggle as a bounded follow-on; opened on the owner's 2026-07-30 instruction to start the DEC-0020 follow-on and continue the sequence",
  "owner": "claude-agent (improvement program lead)",
  "scope": "Backend and Studio implementation of DEC-0020 queued authoring mode, its governance-critical HTTP tests, full-workspace validation, and a focused rendered check of the new mode surfaces",
  "method": "Kernel/persistence/engine implementation with HTTP negative/positive tests; Studio wiring with component tests and a live-engine integration test; pnpm -r typecheck/test/lint, contract validation, harness check/suite, git diff --check; a rendered smoke check of the mode toggle and mode-aware Arc save against the loopback stack",
  "environment": "Local macOS; loopback compose postgres; in-process engine instances for HTTP tests; Studio dev build against Engine :4400 for the rendered check; no live provider, publication, credential value, or external access",
  "subject_revision_or_fingerprint": "Queued-authoring change set on main succeeding 2549d3a (this evidence is committed with it); one governed test mutation (an authoring-mode flip round-trip, left at the default 'direct') to the local Stillhouse fixture",
  "result": "pass",
  "fresh_until": "2026-08-30",
  "supersedes": null,
  "limitations": [
    "Verification is a focused self-review proportionate to a bounded additive follow-on that reuses the Phase 1 safety primitives, not the full two-agent adversarial audit applied to the Phase 1 P0 scope; the governance-critical paths are covered by the HTTP test matrix.",
    "The rendered check covered the mode toggle and mode-aware save control; the queued submit -> Review Room accept flow is covered by the component and live-engine integration tests rather than re-driven in the browser.",
    "A dev-cache race produced an empty Tailwind stylesheet on the first restart (it affected the untouched Command Center identically and was resolved by a clean restart); it is an environment artifact, not a code defect. Rendered-matrix tooling gaps from EVD-0026 (dark theme, true 320 px, AT, zoom) carry forward.",
    "Single-owner alpha (DEC-0025): submit and decide both require property_owner; multi-author submission is out of scope."
  ]
}
---

## Method and result

Implemented DEC-0020 queued authoring additively over the accepted Phase 1
direct mode, which stays the per-property default.

**Backend (kernel, persistence, engine-api):**

- Migration 0013 adds `property_authoring_modes` (current mode per property,
  default direct), `structure_proposals`, and append-only
  `structure_proposal_decisions`.
- A per-property mode read/write: `setAuthoringMode` is property_owner-only
  and records a `structure.authoring_mode.changed` receipt naming actor,
  role, property, and from/to.
- A shared `buildAppendedStructure` helper so the direct-accept and
  queued-submit paths build the same complete, validated document; neither
  reconstructs a reduced document (SWUX-007 preserved).
- Mode-mismatch guards: a direct save in queued mode and a queued submit in
  direct mode each fail closed (409).
- `submitStructureProposal` stores the validated document as a pending
  proposal against its base revision; `decideStructureProposal` accepts only
  if the base is still the current head — a moved base fails closed (409) and
  preserves the proposal; reject records the decision; one decision per
  proposal (unique → 409 on double-decide).
- `listStructureProposals` surfaces the queue per property; `propertyId` was
  added to the productions read (also seeds DEC-0022's URL context).

**Studio:** mode-aware Arc Board (governed toggle with a two-activation
receipted flip; the save control reads "Save as accepted revision" or
"Submit for review" per mode with matching copy and effect rows; a
mode-mismatch conflict offers a reload-mode reconcile), and a Review Room
"Structure proposals" section that decides queued edits through the shared
consequence review with moved-base reconciliation. All Phase 1 safe-command
behavior (frozen subjects, op-scoped keys, recovery controls,
unknown-outcome banner, input preservation) is preserved on both paths.

**Validation (final tree):** `pnpm -r typecheck` 0 errors; all suites green —
engine-api 17 (incl. the queued lifecycle: toggle + role gate, both
mode-mismatch directions, submit → review → accept, moved-base 409,
double-decide 409, receipted flip), studio 70 (incl. the live-engine
integration test, not skipped), kernel 15, all others unchanged; `pnpm -r
lint` clean; contract pack PASS; `git diff --check` clean; harness
refresh/check and the 51-test suite pass.

**Focused rendered check:** the Authoring mode card renders styled with no
console errors; "Switch to queued" opens a two-activation consequence review
(Change: direct → queued, dev-identity-labeled actor, effect "receipted as
structure.authoring_mode.changed. No existing structure changes."), not an
immediate flip; confirming changes the mode and the Add unit control adapts
to "Submit for review" with the queued "sends this to the Review Room"
copy; a round-trip flip returned the fixture to direct. No render-crash-class
defect (unlike the Phase 1 banner).

## Limitations

See frontmatter. Governance-critical paths are HTTP-test-covered; the
verification is a proportionate focused review, not the Phase 1 adversarial
audit.
