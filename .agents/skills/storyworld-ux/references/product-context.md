# Storyworld product and Studio context

Use this file as a routing map after any conditional protected pass in
`first-use.md` is recorded or safely declined. Reinspect current sources; this
snapshot does not replace them and grants no authority.

## Contents

- Current posture and creator mental model
- Current Studio route register
- Incumbent sources
- Recommended first bounded audit

## Current posture

Storyworld helps creators maintain coherent fictional, editorial, brand,
interactive, or hybrid properties. The Engine owns narrative state and
authority; Studio commands and renders that state without maintaining a second
copy. The owner accepted the demonstrable V1 dual-use alpha in `DEC-0017`.
Production identity, transport, operations, several live integrations, and
direct publication remain outside that readiness claim.

The canonical dossier describes a mature target. Do not report an intended
future surface as implemented, and do not report every mature capability absent
from V1 as an alpha defect. Compare accepted scope, current code, tests, and
rendered behavior explicitly.

## Creator mental model

Audit whether the interface makes these distinctions clear:

| Concept | Product meaning |
|---|---|
| Property / world | The durable creative universe or editorial property. |
| World Bible | Structured accepted truth: people, places, rules, chronology, terminology, and related canon. |
| Proposal / draft | A suggested change from a person or model; not official canon by itself. |
| Review decision | An authorized person accepts, rejects, or requests revision on an exact proposal or artifact. |
| Canon release | An immutable, content-hash-bound snapshot of accepted canon. |
| Production | Work planned against one explicitly pinned canon release. |
| Arc / narrative unit | Ordered creative structure whose presentation order can differ from story time. |
| Candidate asset | Generated or imported staging output with provenance; not an accepted master or release. |
| Continuity finding | Evidence of a possible contradiction or risk, requiring a visible human disposition. |
| Release | A versioned creative snapshot or package; it is not automatically a published instance. |
| Publication | An authority-host-specific external action with its own approval and receipt. |

An acceptance receipt is evidence of a decision, not delegated authority for a
different approval layer or external system.

## Current Studio route register

Inspect `apps/studio/src/app/layout.tsx` and the relevant component before
auditing:

- Command Center (`/`): engine status, property portfolio, governed property
  creation.
- World Bible (`/world-bible`): current canon release, entities, and timeline.
- Arc Board (`/arc-board`): revisioned narrative units and story time.
- Generation Workbench (`/generation`): scene context, provider/model choice,
  cost preview, candidate generation, locks, and provenance.
- Continuity Console (`/continuity`): evaluation findings and human
  dispositions.
- Review Room (`/review`): human/model proposals and explicit human decisions.
- Release Builder (`/release-builder`): immutable canon snapshots and
  productions pinned to an exact release.
- Settings (`/settings`): credential status, deliberate entry, and revocation;
  treat as a reserved-crossing surface, not ordinary configuration.

Places, rules, relationships, richer asset workflows, and publishing may be
more complete in the mature definition than in the current alpha. State which
surface and acceptance boundary the finding uses.

## Incumbent sources

Read only what the task needs:

- Status and authority: `README.md`, `.agent/state/current.json`,
  `.agent/decisions/DEC-0012-b-phase-execution-authorization.md`,
  `.agent/decisions/DEC-0014-b2-gate-staged.md`, and
  `.agent/decisions/DEC-0017-v1-consolidated-review.md`.
- Current Studio scope and design system: `apps/studio/README.md`,
  `apps/studio/src/app/layout.tsx`, and `apps/studio/src/app/globals.css`.
- Actual UI: `apps/studio/src/components/`, including `ui/` primitives and
  `production-picker.tsx`.
- State and authority boundary: `apps/studio/src/lib/engine.ts`, relevant
  Engine/API/domain code, and contract tests.
- Behavior/accessibility evidence: component tests,
  `apps/studio/src/test/axe.ts`, and
  `apps/studio/src/lib/engine.integration.test.ts`.
- Accepted alpha evidence:
  `.agent/evidence/EVD-0014-b2-studio-behavioral-proofs.md` and
  `.agent/evidence/EVD-0018-v1-owner-walkthrough-and-acceptance.md`.
- Intended product context:
  `project-dossier/canonical/storyworld/01_executive_context_and_product_direction.md`
  sections 3–4 and
  `project-dossier/canonical/storyworld/02_engine_studio_and_templates.md`
  sections 5–6.

Passing axe under jsdom excludes paint-dependent contrast and whole-document
checks. Passing component and HTTP tests establishes only their recorded
behavior, not discoverability, responsive quality, WCAG conformance, or
participant usability.

## Recommended first bounded audit

Start with one synthetic new-creator journey:

`open Studio → create/select a property → understand and organize world truth → plan an arc/production → inspect an AI-assisted proposal → make a human review decision → surface and resolve a continuity contradiction → verify canon/release consequences → approve a release without implying publication`

Include both an empty start and a populated property. When a safe unprimed
rendered evaluation is available, complete `first-use.md` before loading this
file. Then compare its unchanged raw record against code, tests, accepted
scope, and canonical intent. If product context or the intended route was
already inspected, do not call a later walkthrough unprimed; disclose the
limitation and continue the normal audit workflow.
