---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0015",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "Storyworld Studio UX improvement program: rebaseline and Phase 0 decision proposals",
  "authority_basis": "external:operator request 2026-07-29 — execute the phased Storyworld Studio governed improvement program against REV-0001 and the two supplied mockups: program-initialization rebaseline, capability-prerequisite resolution, and Phase 0 bounded decision proposals. Later phases require accepted Phase 0 decisions and their own bounded task records; this task creates no implementation or product-acceptance authority.",
  "owner": "claude-agent (improvement program lead)",
  "created_at": "2026-07-29",
  "updated_at": "2026-07-29",
  "dependencies": ["DEC-0017", "TASK-0014"],
  "scope": "In scope: rebaseline REV-0001 findings SWUX-001..018 against the current revision with per-finding status and citations; record the finding-to-phase program map; resolve the storyworld-ux capability prerequisite through explicit owner authorization; draft bounded Phase 0 decision proposals (proposed status only) for the nine program decision areas; run declared refresh/check/test validation. Out of scope: any Studio, Engine, kernel, contract, or test implementation change; accepting any decision; remediating any finding; credentials, providers, releases, publication, deployment, integrations, or any external effect.",
  "acceptance_criteria": [
    "EVD-0022 records the current revision, the delta from the audited commit, and a status with exact citations for every finding SWUX-001..018.",
    "The program map connects each finding to its phase, blocking decision areas, dependencies, planned validation, and REV-0001 disposition.",
    "The storyworld-ux capability prerequisite is resolved only by explicit owner authorization (adopt, named fallback, or halt) and the resolution is recorded.",
    "Phase 0 proposal records exist for the nine required decision areas in proposed status; none is self-accepted and no dependent implementation begins.",
    "Declared refresh, structural check, harness test suite, and git diff --check pass; no Studio, product, credential, canon, release, publication, or external state changes."
  ],
  "validation_plan": [
    "python3 -B .agent/scripts/refresh.py --refresh",
    "python3 -B .agent/scripts/validate.py --check",
    "python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check"
  ],
  "implementation_result": null,
  "review_evidence": ["REV-0001", "EVD-0022", "EVD-0023"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "repository_local",
  "limitations": [
    "The rebaseline is source-static: rendered-only observations in REV-0001 (empty-state flash, 320 px overflow measurements) are carried as point-in-time evidence, not re-executed.",
    "The evaluator is primed by the mockups, the intended journey, and REV-0001; no unprimed first-use claim is made anywhere in this program.",
    "The storyworld-ux skill was absent from this checkout at task open; the owner later authorized adoption, recorded by DEC-0018 and EVD-0023. That adoption does not accept any Phase 0 product decision.",
    "Sequencing work in this program does not accept REV-0001 findings, category 4 proposals, or any product decision; acceptance belongs to the project owner."
  ]
}
---

## Scope

In scope:

- Program initialization per the operator's improvement-program instruction:
  record current revision/worktree state, compare with REV-0001's subject
  commit `91867eda166591d6ce9ed2b21c6daa08173a7630`, reverify SWUX-001..018,
  and record per-finding status (EVD-0022).
- The finding-to-phase program map below.
- Capability-prerequisite resolution for `storyworld-ux` by explicit owner
  authorization only.
- Drafting Phase 0 decision proposals (proposed status) for the nine program
  decision areas; owner acceptance happens outside this task's authority.
- Declared validation (refresh, check, harness suite, whitespace).

Out of scope:

- Any implementation change under `apps/` or `packages/`.
- Accepting decisions, dispositioning findings, or claiming remediation.
- Editing REV-0001 (successor records only).
- Credentials, live providers, canon, releases, publication, deployment,
  integrations, production data, or any external effect.

## Program decision areas (Phase 0)

| Area | Subject |
|---|---|
| D1 | Lifecycle and authority vocabulary; release vs publication; receipt action rename |
| D2 | Proposal acceptance and Arc Board authoring semantics; supersession rules |
| D3 | Human authority: roles, enforcement beyond `kind === human`, dev-identity boundary |
| D4 | Shared context ownership and URL representation |
| D5 | Decision receipts: runtime shape, required fields, Studio reachability |
| D6 | Graph and workspace meaning (or explicit deferral) |
| D7 | Collaboration model and lock semantics (or explicit deferral) |
| D8 | Category 4 proposals PROP-FG-09 and PROP-FG-10 disposition |
| D9 | Ambiguous mockup implications: defer or decide |

Proposal records (drafted 2026-07-29, all `proposed`, owner disposition
pending): D1 → DEC-0019, D2 → DEC-0020, D3 → DEC-0021, D4 → DEC-0022,
D5 → DEC-0023, D6 → DEC-0024, D7 → DEC-0025, D8 → DEC-0026, D9 → DEC-0027.
Phase 0 exit gate: every area accepted, explicitly deferred, or rejected
before dependent implementation; a deferred area leaves affected behavior
absent or fail-closed.

## Capability prerequisite resolution

The project owner explicitly instructed on 2026-07-29 that the
`storyworld-ux` skill and all remaining changes be committed. DEC-0018 records
the durable adoption decision; EVD-0023 binds the reviewed thirteen-file
package and validation.

The invalid detached-worktree provenance reference `DEC-0023` was not copied.
The adopted package points to DEC-0018, remains `permission_grant: false`, and
inherits the current task boundary. This resolves only the capability
prerequisite. Phase 0 product decisions remain proposed/not-yet-created and
later implementation phases remain separately gated.

## Program map

Statuses from EVD-0022 (all reverified at `f45c2e3`). Phases per the
operator program; a finding moves only with its phase's own bounded task.

| Finding | Pri | Rebaseline status | Phase | Blocking areas | Planned validation | REV-0001 disposition |
|---|---|---|---|---|---|---|
| SWUX-001 mutation outcomes unreconcilable | P0 | still present | 1 | D5 (receipt shape); none for client state machine | lost-response, refresh-failure, retained-key retry tests | preserve engine contract; reject client behavior |
| SWUX-002 one-click canon/plan acceptance | P0 | still present | 1 | D1, D2, D3, D5 | no single-step acceptance (pointer+keyboard) tests | adapt mockup intent |
| SWUX-003 fabricated waiver rationale | P0 | still present | 1 | D3, D5 | no waiver without reviewer-authored rationale tests | reject due to conflict |
| SWUX-004 release/publication conflation | P0 | still present | 1 | D1 | contract+UI separation tests; receipt action rename | reject due to conflict |
| SWUX-005 unconfirmed credential crossing | P0 | still present | 1 | D3, D5 | no single-keypress transition; unknown-outcome reconcile tests | preserve encryption; adapt lifecycle |
| SWUX-006 unverified dev-identity authority | P0 | still present | 1 | D3 | negative authorization matrix; forged/missing header tests | preserve only within local alpha boundary |
| SWUX-007 Arc Board drops contract fields | P1 | still present | 1 | D2 | contract-complete fixture byte-preservation test | preserve invariant; reject reconstruction |
| SWUX-008 narrow layouts lose all navigation | P1 | still present | 2 | none (narrow pattern is a design decision) | 320 px + keyboard journey completion | design decision needed |
| SWUX-009 loading rendered as emptiness | P1 | still present | 2 | none | delayed-query no-false-empty tests | adopt intent with new loading designs |
| SWUX-010 continuity evidence hidden | P1 | still present | 2 | D5 | duplicate-description fixture; detail disclosure tests | adapt mockup intent |
| SWUX-011 proposal review lacks provenance | P1 | still present | 2 | D2, D5 | origin/diff/impact fixtures; stale-target tests | adapt mockup intent |
| SWUX-012 graph lacks accessible alternative | P1 | still present (absence confirmed) | 3 (only if D6 accepts a graph) | D6 | equivalent-task structured/graph parity checks | adapt mockup intent |
| SWUX-013 context not persistent/deep-linkable | P2 | still present | 2 | D4 | multi-property direct-entry/reload/Back/Forward fixtures | adopt mockup intent |
| SWUX-014 narrow horizontal overflow | P2 | still present (mechanism corrected: fixed w-64/w-72 widths, not missing wrap containers) | 2 | none | breakpoint sweeps near 320 px, 200% zoom | design decision needed |
| SWUX-015 a11y feedback/boundaries incomplete | P2 | still present (axe disables four rules) | 2 | none | manual keyboard/reader/contrast/target-size matrix | preserve native semantics; adapt |
| SWUX-016 Command Center lacks attention view | P2 | still present | 3 | D1-D5 foundations | empty/single/multi/blocked/stale fixtures | adapt mockup intent |
| SWUX-017 multi-author meaning incomplete | P2 | still present | 2 (recorded facts) + 3 (rest) | D7, D5 | multi-origin/decision-attribution fixtures | design decision needed |
| SWUX-018 under-articulated hierarchy | P3 | still present | 3 | none | matched-state captures both themes/widths | adopt mockup intent selectively |

Phase order is strict: Phase 1 exit gates precede Phase 2; Phase 2 precedes
Phase 3. No phase begins while its blocking areas are undecided, and no P0/P1
remains executable-and-unsafe across a phase boundary.

## Risks and gates

- Side effects: repository-local governance records and mechanically
  refreshed generated integrity views only.
- Required approvals: storyworld-ux adoption is authorized by the owner and
  recorded in DEC-0018; owner acceptance remains required for every Phase 0
  decision, with separate authorization for any implementation phase.
- Sensitive data: none; no credential values, secrets, or personal data.
- Rollback: version-control reversal of the added records; proposed decisions
  can be rejected without successor ceremony.

## Evidence and closure

- Evidence: EVD-0022 (rebaseline); EVD-0023 (capability adoption); REV-0001
  (baseline, unmodified).
- Review: pending — DEC-0019..0027 are drafted and await owner disposition.
- External effects: none.
- Residual limitations: see frontmatter.
- Next action: owner dispositions DEC-0019..0027 (accept, amend, defer, or
  reject each); Phase 1 opens only after the Phase 0 exit gate and separate
  implementation authorization.
