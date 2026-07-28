# Transition and Migration

> Migration intent and crosswalk only. Execution evidence lives in
> `.agent/evidence/`; accepted decisions live in `.agent/decisions/`.

## Applicability assessment

- Status: `applicable`
- Assessed on: 2026-07-28
- Assessor and basis: claude-agent (operator-directed adoption session);
  owner ratification pending via DEC-0003. Basis: established-project
  adoption — Project Blueprint 1.0.1 `high-assurance` structures were merged
  into a repository that already contained the Storyworld content dossier.

## Transition: blueprint adoption of 2026-07-28

### What changed

1. The generated harness (`AGENTS.md`, `.agent/`, `.agents/`) and dossier
   frame (`project-dossier/` structure files) were added from an
   independently generated, validated snapshot
   (`.project-blueprint-origin.json`, generation
   `8a719518f6307009dd1b6602ef6b4ac5`).
2. The existing Storyworld content was restructured without content rewrite.

### File and concept crosswalk

| Previous path | New path | Registry |
|---|---|---|
| `project-dossier/README.md` | `project-dossier/canonical/storyworld/README.md` | `REP-0041` |
| `project-dossier/01_…` … `08_…` (eight parts) | `project-dossier/canonical/storyworld/01_…` … `08_…` | `REP-0042`–`REP-0049` |
| `project-dossier/assets/*` | `project-dossier/canonical/storyworld/assets/*` | `REP-0050`, `REP-0051` |
| `project-dossier/Storyworld_Platform_Dossier.md` | `project-dossier/history/storyworld-dossier-v1.0-consolidated/Storyworld_Platform_Dossier.md` | `REP-0053`, superseded per `SUP-0001` |

Two content edits were made during the move, both in
`canonical/storyworld/README.md`: a placement note was added at the top, and
the consolidated-edition link was retargeted to the history location. No other
Storyworld content was modified.

### Authority delta

None transferred. All blueprint-derived policy remains non-authorizing and
deny-by-default. The decisions created in this transition (`DEC-0001` through
`DEC-0004`) were proposed by the agent session and accepted by the project
owner on 2026-07-28 (PLAN-0001; OQ-0001 resolved), which also ratified the
type/representation applicability assessments in the artifact registry. No
credential or readiness claim was created.

### Compatibility classification

Additive plus one content-neutral restructure (the moves above). No existing
file was overwritten; the single planner-reported collision
(`project-dossier/README.md`) was resolved by relocating the existing file
with its content pack and letting the generated index take the root position.

### Rollback

The repository had no git commits before this transition; rollback is
removal of the added structure plus moving the twelve content files back to
their previous paths (the crosswalk above is complete). The retained
consolidated edition makes content recovery trivial in the worst case.

### Verified supersession

`SUP-0001` in [`../SUPERSESSION.json`](../SUPERSESSION.json).

### Remaining transition work

Complete except committing the working tree; see
`../handoff/ADOPTION_CHECKLIST.md`.
