---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0003",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Adopt the Storyworld dossier v1.0 as canonical target material and restructure it into the blueprint dossier",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) acceptance 2026-07-28 (PLAN-0001 review); the content itself is the owner's authored working dossier (SRC-0001).",
  "owner": "ryan-cooper (project owner)",
  "scope": "Placement, registration, and authority classification of the Storyworld content pack within project-dossier/; the applicability assessments recorded 2026-07-28 in the artifact registry; supersession SUP-0001.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted by the project owner on 2026-07-28.",
    "Canonical status covers intended-state material only; the pack's implementation-history claims are explicitly excluded per its own sections 1.1-1.2."
  ]
}
---

## Context

The pre-existing `project-dossier/` held the Storyworld Platform dossier v1.0
(eight modular parts, sub-index, two diagrams, and a consolidated single-file
edition duplicating the parts). The blueprint dossier requires registered
representations, declared edit direction, and one owner per concern.

## Decision

1. The modular parts are the **maintained canonical target material**, placed
   at `project-dossier/canonical/storyworld/` and registered as
   REP-0041–REP-0051 with the type mappings and combined-representation
   rationales recorded in the artifact registry.
2. The consolidated edition is **retired as an edit source** and retained as
   an immutable historical baseline at
   `project-dossier/history/storyworld-dossier-v1.0-consolidated/`
   (REP-0052/REP-0053, supersession SUP-0001).
3. The conditional artifact types MOD-0001, SEC-0001, OPS-0001, TRN-0001, and
   HIS-0001 are assessed `applicable` with the dated rationales in the
   registry; DAT-0001, SUP-0001 (supply chain), RES-0001, EVA-0001, and
   CTX-0001 deliberately remain `not_assessed` until their triggers arrive
   (PLAN-0006).
4. SRC-0001 is treated as accepted canonical-target authority; the four
   `canonical/*.md` entry files summarize and route into the pack and never
   duplicate its mutable content.

## Consequences

- Benefits: one edit owner per concern; the duplicate-authority hazard of the
  consolidated edition is closed; every dossier file is registered and
  integrity-covered.
- Costs: deep links to the old flat paths (if any exist outside this
  repository) need the crosswalk in `transition/README.md`.
- Risks: none identified beyond ratification.
- Undecided: nothing structural.

## Validation and rollback

- Evidence: registry coverage enforced by refresh; EVD-0001.
- Reversal: the crosswalk is complete and content-neutral; moves can be
  reversed file-for-file.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-28 in the operator
session, following the in-session overview of all four proposed decisions
(PLAN-0001 review). Recorded by claude-agent on the owner's instruction
"I accept these."
