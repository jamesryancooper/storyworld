---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0030",
  "title": "Phase 3 implementation: structured Arc views + inspector, attention Command Center, hierarchy",
  "task": "TASK-0020",
  "recorded_at": "2026-07-30",
  "authority_source": "external:operator improvement-program request 2026-07-30 to run the sequence; governed by accepted DEC-0024 (structured views as the graph's synchronized substrate; attention Command Center uses defined facts only) and DEC-0025",
  "owner": "claude-agent (improvement program lead)",
  "scope": "Implementation of SWUX-012's accessible structured Arc substrate, SWUX-016's attention Command Center with its read-only backend, and SWUX-018 hierarchy polish, with full-workspace validation and a focused review; the spatial graph itself is out of scope and remains owner-gated",
  "method": "Two Studio slices (Arc structured views; attention Command Center) plus a direct hierarchy change and a read-only attention backend, each with tests; pnpm -r typecheck/test/lint, contract validation, harness check/suite, git diff --check",
  "environment": "Local macOS; loopback compose postgres (recovered after a mid-session Docker daemon outage); in-process engine for HTTP tests; no live provider, publication, credential value, or external access",
  "subject_revision_or_fingerprint": "Phase 3 change set: commit 6249c3e (Arc structured views + attention backend) and the commit this evidence closes (attention Command Center + hierarchy)",
  "result": "pass",
  "fresh_until": "2026-08-30",
  "supersedes": null,
  "limitations": [
    "A dedicated Phase 3 rendered pass was not re-driven: a mid-session Docker daemon outage reset the loopback fixture, and the structured Arc view and attention Command Center are fully component-tested while the shell, navigation, active-route marker, and URL context they build on were rendered-verified in the search step (EVD-0029). The rendered-matrix gaps from EVD-0026 (dark theme, true 320px, screen reader, zoom, forced colors) carry forward; no WCAG conformance is claimed.",
    "Verification is a focused self-review proportionate to additive, view-only UX work reusing the Phase 1/2 primitives; no acceptance-class command or authority surface was added.",
    "The spatial graph/canvas is deliberately not built; per DEC-0024 it requires an owner-level graph-semantics successor decision (drafted as a proposal alongside this closure)."
  ]
}
---

## Method and result

**SWUX-012 — accessible structured Arc substrate (DEC-0024):** the Arc Board
renders narrative units grouped by parent_unit_ref with an explicit
"Unparented" group so none is dropped; presentation order and story time are
shown as two distinct, independently-labeled coordinates (never conveyed by
position or color); a keyboard-operable selected-unit inspector is
synchronized with the list and shows the unit's authoritative fields plus the
choices at it and branches leading to it; choices and branches render as
plain accessible structured lists — the graph information rendered
structurally, never as a spatial canvas. Selection is view-only (a test
asserts no mutation on select). The existing add-unit, authoring-mode toggle,
and direct/queued flows are intact.

**SWUX-016 — attention Command Center (DEC-0024 point 1):** a read-only,
tenant-scoped per-property attention summary (pending canon and structure
proposals, open continuity findings, production count, latest release) at
`GET /v1/attention`, from defined facts only — no invented readiness score
and no "drift" language. The Command Center replaces the flat property table
with an attention portfolio whose property names are contextual deep links
and whose non-zero facts link to the relevant surface, with a next-safe-task
hint derived only from those facts; a test asserts no "drift"/"readiness
score" text appears.

**SWUX-018 — hierarchy:** stronger surface titles (text-2xl tracking-tight
across all eight surfaces) and a constrained content max-width so wide
screens no longer sprawl, without weakening any exact-state, provenance, or
authority cue.

**Validation (final tree):** pnpm -r typecheck 0 errors; studio 100,
engine-api 23 (incl. the attention summary test), kernel 15, all others
green; lint clean; contract pack PASS; harness refresh/check and the 51-test
suite pass; git diff --check clean. (The Docker daemon went down mid-session;
it and the compose postgres were restarted and the DB-backed suites
re-confirmed green before closing.)

**Focused review:** the one new read (attention) is read-only and
tenant-scoped; the structured Arc view and inspector are view-only over
Engine state with no consequential action; the attention facts are defined
Engine state with nothing invented. No new authority, duplicate-mutation, or
lost-work path is introduced, and no spatial graph is built.

## Limitations

See frontmatter. The graph remains owner-gated; its semantics are proposed
separately for owner disposition.
