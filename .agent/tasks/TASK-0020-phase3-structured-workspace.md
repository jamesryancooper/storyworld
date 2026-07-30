---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0020",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "Phase 3: structured Arc views and inspector, attention Command Center, hierarchy (SWUX-012 alt, SWUX-016, SWUX-018)",
  "authority_basis": "external:operator improvement-program request 2026-07-30 to run the sequence; governed by DEC-0024 (structured views as the graph's synchronized substrate; attention Command Center uses defined facts only), DEC-0025, and the Phase 3 scope of the TASK-0015 program map. The spatial graph/canvas itself is NOT in scope — it remains gated behind a separate owner graph-semantics decision.",
  "owner": "claude-agent (improvement program lead)",
  "created_at": "2026-07-30",
  "updated_at": "2026-07-30",
  "dependencies": ["TASK-0018", "DEC-0024", "DEC-0025"],
  "scope": "In scope: (SWUX-012 accessible alternative) episode-grouped Arc structured views keyed by parent_unit_ref, a selected-unit inspector synchronized with the Arc table, and explicit independently-labeled story-time and presentation-order columns — the graph's synchronized structured substrate; (SWUX-016) an attention-oriented Command Center using only defined Engine facts (pending canon and structure proposals, open findings, pinned productions, latest release) with property rows as contextual deep links, no invented readiness score or drift language; (SWUX-018) selective hierarchy polish (stronger titles/labels, content width, selection emphasis). Out of scope: the spatial graph/canvas (DEC-0024 — needs an owner graph-semantics decision first); unit-to-asset associations (PROP-FG-09, its own task); live-presence/locks (DEC-0025 defers); reserved crossings.",
  "acceptance_criteria": [
    "The Arc Board offers an episode-grouped structured view (by parent_unit_ref) and a selected-unit inspector synchronized with the table, with story time and presentation order shown as explicit, independently-labeled coordinates; unparented units are handled explicitly.",
    "The Command Center surfaces a bounded attention summary from defined Engine facts only (pending proposals/structure proposals, open findings, productions, latest release), makes property rows contextual deep links, invents no readiness score, and never calls a pinned production 'drifted'.",
    "Hierarchy polish strengthens titles/labels/selection emphasis without weakening any exact-state, provenance, or authority cue.",
    "Declared validation passes (pnpm -r typecheck/test/lint, contract validation, harness check/suite, git diff --check); untested assistive-technology/config gaps are recorded and no WCAG claim is made.",
    "No spatial graph is built; the structured views stand alone as the accessible substrate and the graph remains an owner-gated follow-on."
  ],
  "validation_plan": [
    "pnpm -r typecheck",
    "pnpm -r test",
    "pnpm -r lint",
    "python3 -B packages/contracts/tests/validate_contracts.py",
    "python3 -B .agent/scripts/validate.py --check",
    "python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check",
    "focused rendered check of the structured Arc view/inspector and the attention Command Center against loopback services"
  ],
  "implementation_result": null,
  "review_evidence": ["REV-0001", "DEC-0024"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "repository_local",
  "limitations": [
    "Created in progress; implemented in parts (Arc structured views, attention Command Center, hierarchy) with incremental commits and a phase-level validation, rendered check, and focused review before closure.",
    "The spatial graph/canvas is deliberately NOT built here; per DEC-0024 it needs an owner-level graph-semantics successor decision, which will be surfaced separately.",
    "Browser coverage is bounded to locally executable tooling; the EVD-0026 rendered-matrix gaps carry forward and no WCAG conformance is claimed."
  ]
}
---

## Scope

See frontmatter. Phase 3 delivers the structured, accessible substrate the
graph would later synchronize with (DEC-0024), an attention-oriented
Command Center from defined facts (DEC-0024 point 1), and hierarchy polish —
without building the spatial graph, which remains owner-gated.

## Acceptance criteria

See frontmatter; each requires test evidence.

## Risks and gates

- Side effects: repository-local Studio code, one additive read-only Engine
  attention summary, tests, and records.
- Required approvals: the accepted Phase 3 decisions; the graph itself stays
  gated pending an owner graph-semantics decision.
- Sensitive data: none.
- Rollback: version-control reversal; each part commits independently.

## Evidence and closure

- Evidence: to be recorded.
- Review: pending — focused review at phase end.
- External effects: repository-local only.
- Residual limitations: recorded at closure.
- Next action: Arc structured views + attention Command Center + hierarchy;
  validate, rendered check, focused review, close; then surface the graph
  -semantics decision for owner disposition.
