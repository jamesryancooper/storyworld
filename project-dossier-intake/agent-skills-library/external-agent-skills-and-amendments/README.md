# Storyworld External Agent Skills Research Package

**Status:** Research only; unadopted; grants no permission  
**Assessment date:** 2026-08-01  
**Storyworld commit assessed:** `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565`  
**Candidates assessed:** 54  
**Proposed new skills:** 3  
**Existing-skill amendment packages:** 15  
**Disposable pilots:** 10

This package evaluates publicly available agent skills, instruction packages, workflows, and engineering playbooks against Storyworld’s existing skill architecture and intent-driven creative-production direction.

It does **not** install, adopt, activate, or execute external capabilities. It does not modify Storyworld, grant authority, call providers, spend money, deploy, publish, or change accepted decisions.

## Principal conclusion

External ecosystems contain substantial reusable value, but almost none should be imported wholesale. The best result is a **Storyworld-owned synthesis**:

- create three missing top-level skills;
- add scoped, pinned references beneath existing skills;
- pilot executable tools and platform-specific integrations in disposable environments;
- retain external repositories as nonauthoritative evidence;
- preserve Storyworld’s `.agent/` governance plane, `.agents/` capability separation, `permission_grant: false`, owner adoption, exact revision pinning, and evidence requirements.

## Proposed new skills

- `storyworld-skill-authoring-and-evaluation`
- `storyworld-systematic-debugging`
- `storyworld-postgres-and-storage-engineering`

## Package map

- `01-executive-conclusion.md` — decision-ready synthesis.
- `02-prioritized-external-skill-register.md/json` — full candidate register.
- `03-cluster-analysis.md` — capability-cluster comparisons.
- `04-storyworld-skill-library-amendment-plan.md/json` — exact skill changes.
- `05-proposed-new-skills.md` — complete proposed contracts for three new skills.
- `06-pilot-program.md/json` — bounded pilots with rollback.
- `07-rejected-skill-appendix.md` — serious rejects and common failure modes.
- `08-source-license-and-maintenance-register.md` — exact revisions and license posture.
- `09-adversarial-review.md` — response to the required failure cases.
- `10-adoption-runbook.md` — safe review and adoption sequence.
- `11-conceptual-crosswalk.md/json` — external concept to Storyworld boundary mapping.
- `overlay/` — proposal-only new skill packages and reference amendments.
- `scripts/validate_package.py` — offline structural validator for this research package.

## Disposition totals

| Code | Disposition | Count |
| --- | --- | --- |
| B | Customize into an existing Storyworld skill | 19 |
| C | Create a new Storyworld skill from the external foundation | 3 |
| D | Extract selected rules only | 11 |
| E | Architectural or instructional reference only | 10 |
| F | Disposable experiment | 7 |
| G | Reject | 4 |

## Priority totals

| Priority | Count |
| --- | --- |
| P0 | 17 |
| P1 | 25 |
| P2 | 9 |
| P3 | 3 |

## Installation warning

Do not copy `overlay/` into Storyworld as an adoption shortcut. Review sources, licenses, security, overlap, triggers, context cost, fixtures, and decision impact first. If adopted, install through a governed Storyworld task, update capability provenance, run the project validators, and preserve source attribution.
