---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0028",
  "title": "Phase 2 implementation: navigation, loading, URL context, detail panels, accessibility",
  "task": "TASK-0018",
  "recorded_at": "2026-07-30",
  "authority_source": "external:operator improvement-program request 2026-07-30 to run the sequence; governed by accepted DEC-0022/0023/0025 and the Phase 2 program map",
  "owner": "claude-agent (improvement program lead)",
  "scope": "Implementation of SWUX-008..015 and the recorded-facts part of SWUX-017 across the Studio and the smallest supporting Engine reads, full-workspace validation, a focused rendered check, and a focused self-review",
  "method": "Four implementation groups (A navigation/a11y, B loading, C URL context, D detail panels) with incremental commits; pnpm -r typecheck/test/lint, contract validation, harness check/suite, git diff --check; a rendered check of the Phase 2 surfaces against the loopback stack; a focused governance self-review of the additive reads and context model",
  "environment": "Local macOS; loopback compose postgres; in-process engine for HTTP tests; Studio dev build against Engine :4400 for the rendered check; no live provider, publication, credential value, or external access",
  "subject_revision_or_fingerprint": "Phase 2 change set on main across commits a379c73 (A+B), bdf64d7 (C), 6b35c24 (D); this evidence is committed with the closure",
  "result": "pass",
  "fresh_until": "2026-08-30",
  "supersedes": null,
  "limitations": [
    "The sub-768px narrow-navigation VISUAL could not be forced: the macOS window stayed at 1728 CSS px this session (resize was ignored), the same viewport-tooling limit recorded in EVD-0026. The narrow menu disclosure logic is component-tested and its markup (menu button, aria-controls, responsive classes) is confirmed in the rendered DOM, but the below-md rendering was not seen.",
    "Back/Forward history restoration relies on the browser restoring useSearchParams; jsdom cannot exercise history, so it is covered by deep-link tests and the rendered deep-link check rather than a driven Back/Forward pass.",
    "Verification is a focused self-review proportionate to additive UX/state/read work reusing the Phase 1 safety primitives, not a full adversarial audit; no new acceptance-class command or authority surface was added.",
    "Rendered-matrix tooling gaps from EVD-0026 (dark theme, true 320px, screen reader, page zoom, forced colors) carry forward; no WCAG conformance is claimed."
  ]
}
---

## Method and result

Implemented Phase 2 in four committed groups.

**Group A — navigation + accessibility (SWUX-008/015/018):** an AppNav
client component with an `aria-current` active-route marker; a narrow-screen
menu disclosure (aria-expanded/controls, Escape closes and returns focus, no
overlay) that restores navigation below the md breakpoint; a skip-to-main
link; InfoHint raised to a 24x24 target with Escape-dismiss; a StatusMessage
primitive (role=status/alert, aria-live) replacing plain notice/error text
across every surface.

**Group B — loading discipline (SWUX-009):** a Loading skeleton with stable
geometry; every surface now renders unavailable/loading/empty/populated
distinctly and never shows authoritative empty text before its query
resolves; the command refresh stays throwing so the SF3 refresh_failed
signal survives.

**Group C — URL-owned context (SWUX-013; DEC-0022):** a useUrlContext hook
carries property/production in `?property=&production=`; PropertyPicker and
the reworked ProductionPicker resolve selection from the URL with
reconciliation (an unknown id shows an explicit "not available — choose
another" state, never a silent substitution), single-candidate auto-select
with a note, and an explicit prompt when several candidates exist; the six
context routes are wrapped in Suspense; picker selects are responsive
(SWUX-014 picker overflow).

**Group D — detail panels + attribution (SWUX-010/011/014/017):** the Review
Room proposal review fetches getProposalContext + canonChangeImpact and
shows origin, source provenance, a before/after diff, and impact (with an
explicit "no pinned production" and "not evaluated" distinction), degrading
to "provenance unavailable" without blocking the governed decision; the
Continuity Console gains a per-finding detail disclosure exposing finding
id/revision, found_at, confidence, evidence, subject refs + hash,
remediation, disposition, and waiver lineage; attribution shows only
recorded facts (DEC-0025 — no invented presence/locks/assignment). The
supporting Engine reads (source_ref on proposals; getProposalContext) are
tenant-scoped and read-only.

**Validation (final tree):** `pnpm -r typecheck` 0 errors; studio 91,
engine-api 18, kernel 15, all others green; `pnpm -r lint` clean; contract
pack PASS; harness refresh/check and the 51-test suite pass; `git diff
--check` clean.

**Rendered check (loopback):** the active-route marker, skip link, and
URL-owned context (`?property=&production=` reflected after auto-select) all
render with no console errors; an unknown `?property=` shows "The property
named in the link is not available — choose another" without substituting
(DEC-0022); the continuity detail disclosure expands to show a finding's id,
revision, found_at, confidence, evidence, subjects + hash — making the three
near-identical findings distinguishable (SWUX-010). CSS generated cleanly
after a race-free restart.

**Focused governance self-review:** the two new reads are read-only and
tenant-scoped (withTenant); URL context navigates within the tenant with
opaque ids and fails closed on unknown/absent context, so no cross-tenant
leak or silent-subject-swap path is introduced; no acceptance-class command,
authority surface, or duplicate/lost-work path was added. The Phase 1 safe
-command, consequence-review, and receipt behaviors are unchanged.

## Limitations

See frontmatter. Narrow-viewport visual and Back/Forward history were not
driven in the browser (tooling); everything else was rendered-verified or
test-covered.
