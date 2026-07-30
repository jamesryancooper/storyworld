---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0029",
  "title": "Cross-domain search: implementation, validation, rendered check, focused audit",
  "task": "TASK-0019",
  "recorded_at": "2026-07-30",
  "authority_source": "authority:DEC-0026 — PROP-FG-10 planned as a bounded follow-on after the Phase 2 gate; opened on the owner's 2026-07-30 standing instruction to run the sequence through search",
  "owner": "claude-agent (improvement program lead)",
  "scope": "Read-only cross-domain search backend, its Studio combobox, full-workspace validation, a rendered check, and a focused leakage/navigation-only audit",
  "method": "Kernel search query + engine route with HTTP tests (tenant isolation, restricted+spoiler exclusion, typed deep links, wildcard escaping); an accessible Studio combobox with component tests; pnpm -r typecheck/test/lint, contract validation, harness check/suite, git diff --check; a rendered check of the combobox and result navigation against the loopback stack",
  "environment": "Local macOS; loopback compose postgres; in-process engine for HTTP tests; Studio dev build against Engine :4400 for the rendered check; no live provider, publication, credential value, or external access",
  "subject_revision_or_fingerprint": "Search change set committed at 6cff596; this evidence and the closure are committed on top",
  "result": "pass",
  "fresh_until": "2026-08-30",
  "supersedes": null,
  "limitations": [
    "Verification is a focused self-review appropriate to a read-only, navigation-only feature (its leakage vectors — tenant scope, restricted/spoiler exclusion, wildcard escaping, no-mutation-on-select — are HTTP/component-test-covered), not the Phase 1 adversarial audit.",
    "Ranking is simple text/recency match; index freshness is live-query at alpha scale.",
    "Rendered-matrix tooling gaps from EVD-0026 carry forward (dark theme, true 320px, screen reader, page zoom, forced colors); no WCAG conformance is claimed."
  ]
}
---

## Method and result

**Backend (kernel/search.ts + engine route GET /v1/search):** a
tenant-scoped read-only search (every query inside withTenant, so RLS
confines results to the acting tenant) across properties, current canon
entities, timeline events, narrative units, continuity findings, canon
proposals, productions, and canon releases. Each typed result names its
property/production and state and carries a stable DEC-0022 deep link;
superseded releases are labeled, never implied current. The term's SQL
wildcards are escaped and a query under two characters returns nothing.

**Visibility fail-closed (governance-critical):** restricted AND spoiler
canon are excluded from titles and snippets — the accepted decision requires
neither to leak and the alpha has no per-viewer authorization model to
safely reveal spoilers. The backend test caught a real leak during
development: a restricted entity surfaced through its canon-proposal payload
(the proposals table carries no visibility column); the proposals query now
also filters the payload visibility, and the test asserts neither the
restricted nor the spoiler entity appears while the public one does.

**Studio (search-box.tsx in the shell header):** an accessible combobox
(WAI-ARIA combobox+listbox, aria-activedescendant roving focus,
ArrowUp/Down + Enter to navigate, Escape to close, 200ms debounce with a
stale-response guard) with distinct idle/loading/no-results/unavailable
states. Navigation-only: selecting a result only router.push()es the
server-provided deep link — a test asserts no mutation method is called on
select.

**Validation (final tree):** pnpm -r typecheck 0 errors; engine-api 22
(incl. tenant isolation, restricted+spoiler exclusion, typed deep-link
shape, wildcard/short-query guards), studio 96, kernel 15, all others green;
lint clean; contract pack PASS; harness refresh/check and the 51-test suite
pass; git diff --check clean.

**Rendered check (loopback):** typing "Stillhouse" opened the listbox with
six typed results carrying type badges; ArrowDown + Enter navigated to
`/world-bible?property=<id>` — the server-provided deep link — and the
deep-linked property's canon loaded (navigation-only, DEC-0022 restore),
with no console errors. The window rendered below the md breakpoint this
session, which also confirmed the SWUX-008 narrow navigation visually: the
"Menu" disclosure expands to all eight routes with the active route marked
(aria-current) — closing the one rendered gap the Phase 2 pass could not
reach.

**Focused audit:** the search path is read-only and tenant-scoped; restricted
and spoiler content cannot leak (including via proposals); results are
navigation-only with no mutation, approval, or publication; wildcards are
escaped so a term cannot broaden the query. No new authority surface,
duplicate-mutation, or lost-work path is introduced.

## Limitations

See frontmatter.
