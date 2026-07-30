---
{
  "schema_version": "harness.review.v1",
  "id": "REV-0001",
  "title": "Storyworld Studio comparative UX audit against supplied mockups",
  "task": "TASK-0014",
  "review_mode": "specialist",
  "status": "open",
  "recorded_at": "2026-07-29",
  "authority_source": "external:operator audit request and 2026-07-29 request to persist the completed audit; no implementation, product-acceptance, release, publication, credential, deployment, integration, or external-action authority",
  "owner": "unassigned",
  "scope": "Point-in-time expert comparative UX, accessibility, governance, complex-workspace, provenance, canon, continuity, review, release-safety, and feature-gap audit of Storyworld Studio at commit 91867eda166591d6ce9ed2b21c6daa08173a7630 against two supplied 1536x1024 dark desktop mockups",
  "evidence_refs": ["EVD-0014", "EVD-0018", "EVD-0021"],
  "limitations": [
    "Viewing the supplied mockups and receiving the requested creator journey primed the evaluator; this is not an unprimed first-use evaluation.",
    "Rendered checks were synthetic expert walkthroughs using local fixture-shaped data, not participant evidence.",
    "Only a fresh local loopback browser context was used; no existing session, credential, provider connection, production data, live integration, or external service was accessed.",
    "The storyworld-ux skill was absent from the audited checkout and was read from a detached project worktree as non-authoritative workflow guidance.",
    "Light theme, full keyboard traversal, screen readers, forced colors, reduced motion, 200 percent zoom, text-spacing overrides, multiple browsers, devices, and consequential mutation outcomes were not rendered during the audit.",
    "Passing tests and automated accessibility checks were inspected only as bounded regression evidence and do not establish discoverability, responsive quality, visual quality, usability, WCAG conformance, or product readiness.",
    "No genuine participant records were supplied; this review contains no participant evidence."
  ]
}
---

# Storyworld Studio comparative UX audit

This is an open specialist review. It records observed defects,
recommendations, unresolved questions, and proposal-only capabilities. It does
not accept a finding, authorize implementation, change durable product intent,
approve canon or a release, grant publication authority, or prove remediation.

Evidence labels used throughout:

- **Observed fact:** directly inspected source, test, contract, rendered local
  behavior, screenshot, or supplied mockup pixels.
- **Heuristic inference:** expert interpretation or plausible consequence.
- **Synthetic evaluation:** an agent walkthrough or fixture-based scenario.
- **Participant evidence:** none; no genuine participant records were
  supplied.

Disposition vocabulary:

`preserve current | adopt mockup intent | adapt mockup intent | reject due to conflict | design decision needed`

## 1. Executive conclusion

The current Studio is a coherent, demonstrable dual-use alpha with strong
domain invariants: Engine-owned state, immutable hash-bound canon releases,
explicit production pins, quarantined generation candidates, provenance
fields, and human-only acceptance checks. The supplied mockups offer a stronger
first-scan workspace hierarchy, persistent context, overview/detail structure,
and a more creator-native visual language.

The smallest safe direction is not pixel-level reproduction. It is to adopt
the mockups' orientation, context, density, and overview/detail intent while
preserving Storyworld's current authority distinctions and adding missing
decision safety. The most serious issues are independent of visual fidelity:
ambiguous mutation recovery, one-click canon/structure decisions, a fabricated
continuity-waiver rationale, release/publication wording collision, immediate
credential crossings, dev-header authority, and an Arc Board save path that
can discard accepted narrative-structure fields.

Priority totals: six P0, six P1, five P2, and one P3 findings. These counts do
not indicate prevalence or participant impact. No numeric usability score is
assigned.

## 2. Audit scope, alpha boundary, evidence inventory, and limitations

### Creator and connected task

- Creator: a new creator or small creative team entering the accepted V1
  dual-use alpha.
- Journey:
  `open Studio → create/select a world/property → understand and organize world truth → navigate characters, places, rules, assets, and arcs → plan a production → inspect an AI-assisted proposal → understand provenance and consequences → review or disposition a continuity contradiction → prepare and approve an exact release without implying external publication`.
- Critical decision: know what is an idea, proposal, draft, working canon,
  accepted canon, candidate, release, or publication, and know exactly what a
  human action changes.
- Consequence of error: false authority, accidental canon/release action,
  credential crossing, lost work, stale or duplicate mutation, hidden
  contradiction, or mistaken external-publication meaning.

### Exact subject

- Repository: `storyworld-platform`
- Branch at audit: `main`
- Commit: `91867eda166591d6ce9ed2b21c6daa08173a7630`
- Commit subject: `docs: synchronize accepted V1 alpha documentation`
- Starting worktree: clean.
- Accepted posture: owner-accepted V1 dual-use alpha under DEC-0017 and
  EVD-0018; demonstrable, not production-ready. Live providers, production
  identity/transport, direct publication, deployment, and other reserved
  crossings remain outside this review's authority.

### Evidence inventory

- Repository authority: `AGENTS.md`, `.agent/START_HERE.md`,
  `.agent/policy.json`, `.agent/context.json`, `.agent/state/current.json`,
  relevant accepted decisions including DEC-0017, and accepted evidence
  EVD-0014/EVD-0018.
- Current product truth: `apps/studio/README.md`, route components, shared
  primitives, `apps/studio/src/lib/engine.ts`, Engine API and kernel source,
  contracts, component tests, integration tests, and design tokens.
- Intended-product context only: canonical Storyworld dossier part 01
  sections 3–4 and part 02 sections 5–6.
- Design-intent references: M1 and M2 below.
- Rendered evidence: local loopback Studio with fixture-shaped Stillhouse
  data, fresh synthetic browser context, no credentials or external requests.
- Validation during the original audit:
  `python -B .agent/scripts/validate.py --check` passed. Existing Studio and
  integration tests were inspected but not rerun because the audit was
  read-only and their caches/output could write.

### Comparator limitations

- The evaluator was primed by both mockups and the specified journey.
  Therefore, no unprimed first-use claim is made.
- Mockup pixels establish only visible design intent. Unannotated hover,
  keyboard, loading, failure, persistence, graph semantics, and mutation
  behavior remain unknown.
- Source establishes implementation logic, not rendered quality. A screenshot
  establishes pixels, not accessibility semantics or usability.
- Browser checks covered one engine/browser environment, dark theme, and
  synthetic data. Settings was intentionally not rendered because it is a
  credential-bearing reserved-crossing surface.
- No mutation button was activated during the rendered audit. Post-action
  behavior is based on source, tests, contracts, and existing evidence.

## 3. Mockup design-intent summary and differences

### Mockup inventory

| ID | File and fingerprint | Dimensions / depicted viewport | Theme and visible lifecycle | Major regions | Ambiguous or omitted |
|---|---|---|---|---|---|
| M1 — Atmospheric overview | `/var/folders/pj/gxd_hdzx0yj6yz1sdtkh2zrc0000gn/T/codex-clipboard-0812e30f-ccbe-4bc7-9dbe-c424ab99affe.png`; SHA-256 `c5b8bd3cf690feb87ab3db736eedb352bbb95fef2e45d54c7b5ede668da5f34f` | 1536×1024 RGB, 3:2 desktop composition | Dark; a populated, active world; lifecycle rail ends in `Published` | persistent left navigation, property identity, top lifecycle rail, overview metrics, atmospheric relationship graph, selected-object inspector, activity/continuity area, contextual actions | loading/empty/error/permission/conflict states; exact graph semantics; keyboard/focus; source of activity; publication authority; narrow/light behavior |
| M2 — Episode-lane workspace | `/var/folders/pj/gxd_hdzx0yj6yz1sdtkh2zrc0000gn/T/codex-clipboard-2533ac25-7c4a-4d2d-9600-e1cedfad1341.png`; SHA-256 `a5f888222e5926314827381def862b8f9f5bc2300a521071e7040af486b501d0` | 1536×1024 RGB, 3:2 desktop composition | Dark; populated planning/branch state; lifecycle rail ends in `Published` | persistent left navigation, top context/lifecycle, lane/card graph, explicit choice point and branches, selection inspector, hero/linked-assets panel, view controls | whether cards edit or navigate; pan/zoom/search/filter persistence; edge/line/color meanings; story time versus presentation order; collaboration semantics; confirmation/failure states; narrow/light behavior |

### Shared design intent

Both mockups depict Storyworld as one context-preserving creative workspace
rather than eight separate forms. Their shared intent is:

- persistent organization/property identity and global navigation;
- a visible lifecycle that locates current work from world truth through
  production/release;
- overview-and-detail composition with a central spatial model and stable
  inspector;
- dense but grouped creative information, with status, alerts, and activity
  reachable without route hunting;
- dark, cinematic visual emphasis with accent color reserved for focus and
  important state;
- contextual actions attached to the selected creative subject.

### Meaningful differences

- M1 optimizes for portfolio/world comprehension: health metrics, broad
  relationships, continuity/activity, and an atmospheric overview.
- M2 optimizes for production structure: ordered episode lanes, a choice point,
  branch traversal, and asset association around the selected unit.
- M1's graph appears semantic and cross-domain; M2's graph appears ordered and
  production-scoped. Neither mockup defines its edge legend or authoritative
  data model.
- M2 makes selection and branch structure more explicit; M1 gives greater
  weight to system status and recent activity.

The `Published` endpoint in both mockups is visual intent only. It conflicts
with the alpha's closed external-publication boundary if interpreted as a
current Studio action or state, so it requires adaptation or rejection rather
than literal adoption.

## 4. Route-to-mockup surface map

| Current route | Nearest mockup region | Comparison strength | Direct evidence and limits |
|---|---|---|---|
| `/` Command Center | M1 overview metrics/activity/property context | partial | Current route lists properties and Engine reachability but lacks attention summary, lifecycle context, and next task. No current graph or activity feed. |
| `/world-bible` | M1 world graph and inspector | partial | Current tables show exact release/hash, entities, and story-time timeline. Characters/places/rules are types in data, not separate rich surfaces. |
| `/arc-board` | M2 episode lanes, branches, choice point | nearest conceptual match | Current table preserves presentation order and story time. It does not render choices, branches, selected-object inspector, or graph controls. |
| `/generation` | M2 linked assets/inspector | partial | Current scene packet and staged-candidate table expose provider, seed, latency, locks, and hash. Candidate listing is not scoped to selected unit/production. |
| `/continuity` | M1 continuity/alerts | partial | Current findings table exposes severity/layer/description/disposition, but not evidence, affected work, confidence, rationale, or durable receipt details. |
| `/review` | Both inspectors and lifecycle decision regions | partial | Current proposal queue exposes type, compact description, proposer kind/id, and direct actions. No diff, impact, authority host, or confirmation. |
| `/release-builder` | Both lifecycle rails and release region | partial | Current exact versions, hashes, supersession input, and production pins are strong. The snapshot action has no consequence preview and kernel audit wording says `published`. |
| `/settings` | No safe direct mockup match | not compared rendered | Credential status/entry/revocation is current alpha behavior but is not visibly depicted by either mockup. Source/test review only. |
| Shared shell | Both persistent navigation/context shells | direct visual comparison | Current desktop sidebar is simpler and route-neutral; at narrow width it disappears with no replacement. |

## 5. Creator-journey results

| Journey step | Result | Evidence label |
|---|---|---|
| Open Studio | Direct entry to `/`, `/world-bible`, `/arc-board`, `/generation`, `/continuity`, `/review`, and `/release-builder` worked locally with no browser warning/error logs. First scan names the route and dev actor but not an active nav item, property, production, lifecycle position, or next task. | Observed fact; synthetic evaluation |
| Create or select a property | Command Center supports property creation; property selectors exist on downstream routes. Rendered mutation was not activated. Selection resets to the first property on mount and is not encoded in the URL. | Observed fact; heuristic inference |
| Understand and organize world truth | World Bible shows the latest canon release with version/hash, entities, and a story-time ordered timeline. It does not offer the mockups' cross-domain overview or rich character/place/rule organization. | Observed fact |
| Navigate characters, places, rules, assets, and arcs | Entity types and candidates are visible, and Arc Board shows units/threads. Dedicated characters, places, rules, and asset-detail navigation are not implemented in the alpha; they are not defects solely because mature mockups/context depict them. | Observed fact |
| Plan a production | Release Builder creates productions pinned to exact releases; Arc Board adds units. The production picker defaults to the first property/production and does not preserve context across routes. | Observed fact; heuristic inference |
| Inspect an AI-assisted proposal/candidate | Generation candidates visibly expose provider/model endpoint, seed, latency, locked attributes, and content hash. Review proposals expose proposer kind/id. They do not expose a full provenance chain, selected production/unit association, prompt lineage, diff, or affected work. | Observed fact |
| Understand provenance and consequences | Exact candidate provenance is partially reachable; canon proposal consequences and authority host are not. `canonChangeImpact` exists in the kernel but is not exposed through the API/Studio. | Observed fact |
| Review/disposition a contradiction | Continuity findings are listed, but evidence and affected state are hidden. `Resolve` and `Intentional` act directly; `Intentional` submits a UI-authored owner rationale rather than creator input. | Observed fact |
| Prepare and approve an exact release | Release Builder shows exact release version/hash and pinned productions. Snapshot is a direct form submission without diff/impact/unknown contradiction preview or a visible durable decision receipt. Kernel audit action uses `canon.release.published`, blurring release and publication. | Observed fact; heuristic inference |
| Return/recover | Back, Forward, reload, and direct entry worked for the checked routes with the sole default selection. Non-default selection persistence was not tested and source resets to the first item. Ambiguous mutation recovery is not modeled. | Observed fact; synthetic evaluation |

## 6. Tested/untested state and configuration matrix

`Tested` means directly checked in the original rendered audit. `Inspected`
means source/test evidence was reviewed but the configuration was not rendered.
`Not implemented` means no explicit current UI state/contract was found.

| State/configuration | Status | Scope and reason |
|---|---|---|
| Mockups at original resolution | Tested | Both 1536×1024 RGB files inspected; hashes reverified when this record was persisted. |
| Typical desktop, dark | Tested | Requested 1536×1024; browser content reported 1396×931 CSS pixels. Routes `/`, `/world-bible`, `/arc-board`, `/generation`, `/continuity`, `/review`, `/release-builder`. |
| Wide desktop, dark | Tested | Requested 1920×1080; content reported 1745×982. Layout remained sparse and readable; no equivalent mockup-wide density emerged. |
| Narrow near 320 CSS px, dark | Tested | Requested 320×800; content reported 291×727. Sidebar links visible: 0. Horizontal page overflow: World Bible 0 px, Arc 30 px, Generation 75 px, Continuity 232 px, Review 0 px, Release Builder 129 px; Command Center visibly clipped. |
| Light theme | Untested | System/browser audit context rendered dark only. Source tokens were inspected. |
| Reduced motion | Untested | Browser reported `prefers-reduced-motion: false`; no alternate run. |
| Forced colors/high contrast | Untested | Browser reported `forced-colors: false`; no supported alternate run. |
| 200% browser zoom | Untested | Narrow reflow is not a substitute for zoom testing. |
| Text-spacing overrides | Untested | No manual override run. |
| Screen reader | Untested | No browser/reader combination was available and authorized for this audit. |
| Full keyboard-only journey | Untested | A focused InfoHint showed a visible ring/tooltip; automated full Tab traversal did not produce reliable evidence. |
| Pointer/default input | Tested, read-only | Navigation and visual inspection only; no consequential action clicked. |
| Loading/direct entry | Tested | Direct route entry captured transient empty/no-content messages before final data on multiple routes. |
| Populated final state | Tested | Fixture-shaped Stillhouse world, releases, production, units, one generation candidate, continuity findings, and release history. |
| Truly empty property/world | Inspected | Component tests/source contain empty paths; not rendered with a separately empty database. |
| No results | Inspected | Current route-specific empty messages inspected. Distinction from loading/unavailable is incomplete. |
| Dense content | Partially tested | Mockups are dense; current fixture is modest. Long/dense real-world extremes were not exercised. |
| Confirmed mutation success | Inspected | Source and existing tests only; no rendered mutation was authorized. |
| Validation failure | Inspected | Generic catch/notice paths exist; no rendered field-specific failure run. |
| Permission denial | Untested | Dev actor was accepted; no denied-role fixture was rendered. |
| Stale/conflict | Not implemented as Studio state | Revision APIs exist, but no explicit compare/reconcile/reload-latest UI state was found. |
| Service unavailable | Partially inspected | Command Center has `engine unreachable`; route-specific unavailable/recovery states were not rendered. |
| Malformed response | Not implemented as distinct UI state | Generic errors only. |
| Ambiguous/unknown mutation outcome | Not implemented | No reconciliation state or stable retry key is exposed. |
| Success/decision receipt | Inspected | Receipts exist in persistence but are not presented after the audited consequential actions. |
| Long names/IDs/hashes/mixed status | Partially tested | Some hashes and mixed continuity dispositions were present; extreme values were not. |
| Back/Forward/reload/direct entry | Tested | World Bible ↔ Arc Board navigation worked with the default selection. |
| Non-default property/production persistence | Untested; source predicts reset | Selectors initialize to the first list item and URLs contain no context key. |
| Settings/credential states | Inspected only | Not rendered to avoid a credential-bearing reserved crossing. |
| External publication/provider/live integration | Not applicable | Outside authority and current accepted readiness; no external action performed. |

Automated component accessibility checks and passing tests are regression
evidence only. They do not prove discoverability, contrast, responsive
behavior, keyboard completion, WCAG conformance, or usability.

## 7. Visual and design-intent deltas

### Information hierarchy and first scan

- **Observed fact:** Both mockups keep world identity, lifecycle, workspace,
  selected subject, and attention/status visible. Current routes lead with a
  route title and local cards; the shell exposes only `Storyworld Engine
  workspace` and a hard-coded dev actor (`layout.tsx:22-62`).
- **Heuristic inference:** A new creator must reconstruct the relationship
  between property, canon, production, route, and next task by navigating.
- **Disposition:** **adopt mockup intent** for persistent context and
  attention; **adapt mockup intent** to current alpha scope.

### Layout, grid, grouping, density, alignment, and overflow

- M1/M2 use a stable three-part hierarchy: navigation, central overview/canvas,
  and inspector. Current routes use independent one- or two-column card grids.
- Current layouts are clean at typical desktop width but materially less dense
  and less cross-contextual than the mockups. Density itself is not a defect;
  the issue is the absence of stable context and selected-object detail.
- At the 291-CSS-pixel audit width, several pages overflow horizontally and
  the global navigation disappears. **Disposition:** **adapt mockup intent**
  with a narrow task-focused fallback rather than shrinking a graph.

### Typography, iconography, imagery, and emphasis

- The mockups use larger display headings, icon-led navigation, atmospheric
  imagery, prominent selected-state treatments, and richer status hierarchy.
  The current Studio uses restrained native text, badges, tables, and cards.
- **Heuristic inference:** Mockup styling could improve creative orientation,
  but imagery and iconography should remain subordinate to exact state,
  provenance, contradictions, and decisions.
- **Disposition:** **adopt mockup intent** selectively; preserve current plain
  language and semantic HTML.

### Color, contrast, status semantics, and theme

- Current semantic tokens provide strong computed text contrast in both token
  sets: foreground/background approximately 15.76:1 light and 15.50:1 dark;
  muted/background approximately 5.75:1 light and 6.91:1 dark; primary
  foreground/primary approximately 7.32:1.
- Ring/background was approximately 3.85:1 light and 4.59:1 dark. Border
  against adjacent card/background surfaces was approximately 1.29–1.46:1,
  so borders cannot safely carry essential control or region boundaries
  alone.
- Mockup contrast was not instrument-measured; its pixels visibly use subtle
  dark panels and color-coded statuses but do not establish accessible
  semantics.
- **Disposition:** **preserve current** semantic token system; **adapt mockup
  intent** with redundant text/icons and measurable UI-boundary contrast.

### Navigation, lifecycle, inspectors, activity, alerts, and calls to action

- The current shell has all routes in a desktop sidebar but no active route,
  property/production identity, lifecycle indicator, breadcrumbs, activity,
  alert center, or inspector (`layout.tsx:11-62`).
- Mockup lifecycle rails end in `Published`. Current accepted authority keeps
  publication separate and closed. **Disposition:** **reject due to conflict**
  if `Published` is an actionable current Studio stage; otherwise **design
  decision needed** for a non-actionable external-status representation.

### Loading-to-final geometry

- Direct entry showed route content rendering as empty/selection-required
  before data settled. This is both semantic flicker and potential layout
  shift. Mockups depict only populated final states, so their loading geometry
  is unknown.
- **Disposition:** **design decision needed** for skeleton/reserved geometry;
  current false empty messages should not be preserved.

## 8. Interaction and behavior deltas

### Navigation and context

- Current links navigate between global surfaces; mockups visibly imply global,
  property, production, mode, selection, and inspector layers.
- The current `ProductionPicker` defaults to the first property and first
  production on mount (`production-picker.tsx:21-38`). Property selectors on
  other routes do the same. Context is not represented in deep links.
- Back, Forward, reload, and direct entry worked for the sole default
  selection. Non-default preservation is unknown from rendered evidence and
  unsupported by source.
- **Disposition:** **adopt mockup intent** for persistent context; restore only
  after reconciling with authoritative Engine state.

### View modes, grouping, filters, search, zoom, selection, and disclosure

- M2 visibly contains view controls and a selected card/inspector; M1 visibly
  contains a graph and selected-object detail. Exact handlers, persistence,
  and keyboard behavior are unknown.
- Current tables have no cross-route search, filter, zoom, graph selection,
  inspector synchronization, or fit/reset controls.
- **Disposition:** controls required for any adopted canvas are **missing
  interactions necessary for the design to work**; exact behavior remains a
  design decision.

### Graph/canvas behavior

- Pan, zoom, fit/reset, branch traversal, edge direction, legends,
  hidden-item counts, and inspector synchronization are not implemented in
  current Studio and not explicitly annotated in the static mockups.
- M2 visibly depicts branches and a choice point; current contracts support
  choices/branches, but Arc Board renders only units and threads.
- **Disposition:** **adapt mockup intent**. Do not infer invisible behavior;
  require a structured synchronized alternative and explicit story-time versus
  presentation-order semantics.

### Editing, review, feedback, and recovery

- Current forms disable while busy and refresh after success. Generic notices
  conflate failure types; consequential actions lack confirmation and durable
  visible receipts.
- Every client POST creates a new random idempotency key
  (`engine.ts:227-240`). A safe retry after an ambiguous response therefore
  cannot replay the same command.
- Mockups do not depict failure or receipts. **Disposition:** **preserve
  current** Engine ownership/idempotency intent; **adapt** the interaction with
  stable command identity, confirmation, reconciliation, and receipts.

### Observable component states

- Idle, selected, and some busy/disabled states are observable in current
  source. Focus was observed only for InfoHint. Confirmed-result, permission,
  stale/conflict, unavailable, malformed, and ambiguous mutation states are
  incomplete.
- Static mockups establish selected state and populated final state only.
  Hover, focus, busy, disabled, failure, and confirmed results are unknown.

## 9. Independent UX, accessibility, and governance concerns

- The most consequential findings—SWUX-001 through SWUX-007—are incumbent
  safety defects or gaps, not mockup fidelity issues.
- Both mockups and current Studio risk using a linear lifecycle to compress
  distinct authority layers. Release and external publication must remain
  separate.
- Current headings, labels, native buttons/selects/tables, and
  `aria-describedby` help are sound primitives. The shell lacks a skip link
  and active-route state; full focus order and screen-reader behavior remain
  untested.
- The 16×16 InfoHint target (`info-hint.tsx:12-23`) is materially below a
  comfortable pointer target even though its help is reachable on focus.
- Status badges include text, so state is not color-only. Low-contrast borders
  and subtle mockup panels still require care because boundary recognition
  can be essential in dense panes.
- Error and notice text is not consistently associated with the triggering
  control, announced as status, or classified as validation, permission,
  stale, unavailable, rejected, or unknown.
- The current dev actor label and trusted actor headers could imply real
  permission enforcement. The accepted alpha documents this limitation, but
  UI labels do not make it safe outside a controlled local demonstration.

## 10. Complex navigation, graph/canvas, and multi-author findings

### Workspace map

| Layer | Mockup treatment | Current treatment | Finding |
|---|---|---|---|
| Organization | small persistent shell context implied | not visible | identity and tenant context unknown |
| Property/world | persistent title/context | selector repeated per route or property list | resets and is not deep-linkable |
| Production | top context/lifecycle implied | picker on production routes | not shared across global shell |
| Route/tool | active nav and lifecycle position | route title; no active-nav cue | location must be inferred |
| Mode/view/branch/filter | visible controls in M2 | mostly absent | behavior unknown or not implemented |
| Selection/inspector | stable selected card/node and inspector | no shared selection model | identity cannot survive pane collapse |
| Authority/version | visually implied lifecycle/status | exact hashes/pins appear locally | strong data, fragmented presentation |

### Graph/canvas

- Neither mockup provides a complete legend for position, direction, grouping,
  line style, color, branch state, hidden items, or contradictions.
- M2's lanes suggest presentation order; labels and current domain contracts
  require story time to remain independent. Any graph must show both or name
  the current coordinate explicitly.
- A graph must remain a view over Engine state, never the source of authority.
  Consequential actions need exact subject/version confirmation outside a
  spatial gesture.
- Current tables are a useful seed for a synchronized list/outline
  alternative. If the mockup canvas is adopted, essential data/actions must
  remain keyboard and non-drag operable, with visible focus, fit/reset,
  search/filter, hidden-item counts, narrow fallback, reduced-motion support,
  and preserved selection identity.
- Participant validation is useful for graph comprehension after a safe
  prototype exists; it is not required to establish the current absence of
  controls/alternatives.

### Multi-author and provenance

- Mockup avatars/activity imply collaboration but do not establish presence,
  edit ownership, authorship, assignments, permissions, approval authority,
  locks, or merge behavior. Those implications are class 5 ambiguous.
- Current UI exposes `proposerKind:proposedBy` and generation provenance, but
  not later human edits, imports/derivations, branch ancestry, version
  attribution, authority host, comments versus proposed changes, or exact
  decision receipts.
- The actual alpha model is asynchronous append-only revision/proposal work,
  not demonstrated live co-editing. Presence or locking should not be claimed
  or built solely from mockup avatars.
- Stale/concurrent edits need compare/reconcile/reload-latest behavior where
  current supersession APIs expose conflicts. Safe creator input must survive
  failure; no UI evidence currently demonstrates that path.

## 11. Canon, provenance, continuity, review, and release findings

### State-legibility inventory

| State | Current Studio evidence | Assessment |
|---|---|---|
| Idea | proposal form input before filing | present implicitly, not labeled |
| Proposal | Review Room pending queue | implemented and separated from decided proposals |
| Draft | form/input state; no durable general draft model surfaced | ambiguous |
| Working canon | Release Builder says it snapshots current working canon | named, but no current branch diff/identity preview |
| Approved canon | accepted proposal writes a canon revision; UI says accepted canon | implemented domain transition, insufficient pre-decision consequence detail |
| Candidate asset | Generation `Staged candidates` with provenance | implemented and usefully separated |
| Release candidate | no distinct assembled-under-review state found | not implemented |
| Released | immutable canon releases listed | implemented, but kernel audit verb says published |
| Superseded | release model accepts supersedes ID; list does not explain lineage | partially implemented |
| Published | not a current authorized Studio outcome | mockup-implied only; must remain distinct from release |
| Unresolved contradiction | `open` continuity disposition | implemented |
| Resolved contradiction | `resolved` disposition | implemented, evidence hidden |
| Waived/intentional contradiction | domain supports both; UI exposes `Intentional` only | unsafe because reason/scope are fabricated/defaulted |

### Required pre-approval information

For canon proposal acceptance and release snapshotting, the current UI does not
show the complete required set:

- exact subject plus full version/hash;
- what changed and why;
- origin/provenance chain;
- human decision owner, role, and authority host;
- direct, indirect, and unknown affected work;
- affected characters, places, rules, arcs, assets, productions, continuity
  dispositions, approvals, and releases;
- hidden/filtered/unresolved/stale/unavailable contradictions;
- exact state transition and consequence;
- reversibility, supersession, and durable receipt;
- explicit separation of creative release from external publication.

The kernel has exact payload hashing, immutable receipts, release hashes,
production pins, and a `canonChangeImpact` query
(`packages/kernel/src/state-packet.ts:91-105`). That is a strong foundation,
but it is not exposed in the decision interface.

Audit receipts written by current kernel paths bind actor, action, subject,
hash, and correlation ID, but do not materialize the richer accepted
approval-receipt contract fields such as decision layer, decided-by role,
policy references, and authority host (`approval-receipt.schema.json:8-21`,
`137-170`). The UI does not present a receipt after the checked decisions.

## 12. Feature-gap classification

Every candidate below has exactly one class:

1. already implemented;
2. visual treatment of an existing capability;
3. missing interaction necessary for the design to work;
4. genuinely new product capability worth proposing;
5. too ambiguous to infer.

| ID | Implied outcome and mockup evidence | Current/product evidence | Class | Confidence / unknowns |
|---|---|---|---|---|
| FG-01 | Persistent world/workspace shell in M1/M2 | Current global sidebar and repeated selectors already represent routes/context | 2 | High; visual/state architecture change, no new domain outcome |
| FG-02 | Overview metrics and status cards in M1 | Current Engine queries expose properties, releases, productions, candidates, and findings | 2 | Medium; exact metric definitions are unknown |
| FG-03 | Selected node/card remains synchronized with inspector | Current route data exists but no shared selection/inspector interaction | 3 | High for missing interaction; persistence rules need design |
| FG-04 | Pan/zoom/fit/reset/search/filter for the visible canvas | Any functional canvas requires these; current Studio has none | 3 | High that controls are necessary; mockup handlers unknown |
| FG-05 | Choice-point and branch traversal in M2 | Accepted narrative-structure contract has choices/branches; Arc Board renders only units/threads | 3 | High |
| FG-06 | Graph/list/outline synchronization | Current tables can be the structured source; no graph synchronization exists | 3 | High; exact graph scope unknown |
| FG-07 | Persistent lifecycle rail | Current routes already embody world, production, review, release stages | 2 | Medium; linear stage meaning risks false authority |
| FG-08 | Continuity health/alerts in overview | Current findings query and open-count badge exist | 2 | High |
| FG-09 | Link exact assets to narrative units and inspect them in context, visible in M2 | Candidates are tenant-global and current domain/UI does not expose durable unit-asset associations | 4 | Medium; benefit clear, exact lifecycle/authority model undecided |
| FG-10 | Search across world truth, arcs, assets, proposals, findings, and releases, visible in shell intent | No current cross-domain search outcome or index/API | 4 | Medium; mockup search scope is not annotated |
| FG-11 | Collaboration avatars/activity mean live presence or edit ownership | Current audit receipts/proposers exist; no live-presence/locking contract is demonstrated | 5 | High ambiguity |
| FG-12 | Atmospheric graph edge colors/distances have domain meaning | Mockups lack legend/annotation and current data spans several relation types | 5 | High ambiguity |
| FG-13 | `Published` is a current lifecycle state/action | External publication remains out of accepted alpha scope and mockups do not identify authority host | 5 | High ambiguity plus authority conflict |
| FG-14 | Rich hero imagery is authoritative asset selection | Current candidate/accepted-asset states exist, but mockup does not label the image state | 5 | High ambiguity |

Category 3 items are interaction design gaps, not automatically new product
capabilities. Category 4 items are proposals only. Category 5 items require
product clarification or evidence; they are not alpha defects.

## 13. Bounded proposals for category 4 capabilities

### PROP-FG-09 — Unit-to-asset associations

- **Status and evidence:** proposal only. M2 selected episode/unit inspector
  visibly groups linked visual assets. Current Generation Workbench lists
  candidates globally (`generation-workbench.tsx:254-300`;
  `queries.ts:86-110`) and does not expose a durable unit association.
- **Smallest outcome:** let an authorized creator associate an exact candidate
  or accepted asset version with an exact production narrative unit and see
  that relationship from both unit and asset views.
- **Non-goals:** no automatic asset acceptance, canon promotion, release
  inclusion, publishing, provider invocation, live presence, or DAM
  replacement.
- **Creator benefit:** makes unit planning and provenance inspection local to
  the creative task instead of requiring global candidate scanning.
- **Workflow fit:** entry from Arc Board or Generation Workbench; association
  informs continuity/review/release impact but does not itself change canon,
  accept an asset, or approve a release.
- **Authority effects:** association state must record human/AI/imported
  origin, exact asset version/hash, unit/production/canon pin, actor, and
  receipt. Models may suggest links; an authorized person decides. Release
  assembly must separately review exact linked versions. Publication remains
  outside Storyworld creative approval.
- **Dependencies:** proposed Engine/domain relation and API; exact version and
  supersession rules; confirmed production/unit/asset IDs; role checks;
  inspector/list UI; keyboard and narrow alternatives; continuity and release
  impact queries; migration only if accepted.
- **Risks/failure modes:** linking the wrong version, stale unit revision,
  implying candidate acceptance, losing links on supersession, hidden affected
  releases, or duplicate action after ambiguous failure.
- **Alternatives:** show non-durable generation-run context; maintain a manual
  reference in unit notes; defer until asset acceptance/release assembly is
  designed; no-build and retain global candidate table.
- **Confidence/unknowns:** medium. The creator benefit and current gap are
  evidence-backed; durable relation cardinality, branch behavior, permissions,
  and release semantics require product decisions. Participant research is
  useful after a safe prototype.
- **Acceptance checklist:**
  1. Association binds exact unit revision, production, canon pin, asset
     version, and content hash.
  2. Candidate, accepted master, release inclusion, and published state remain
     visibly distinct.
  3. A model suggestion cannot create or approve the association without a
     human decision.
  4. Stale/conflicting state preserves input and offers compare/reload/revise;
     ambiguous outcomes reconcile before retry.
  5. Unit and asset views show the same authoritative link and provenance.
  6. Keyboard, non-drag, narrow, zoom, and screen-reader alternatives preserve
     identity and actions.
  7. Canon/release impact includes direct, indirect, and unknown effects
     without implying external publication authority.

### PROP-FG-10 — Cross-domain creator search

- **Status and evidence:** proposal only. Both mockups imply a persistent
  workspace-level search/control area. Current Studio has no cross-domain
  search route or Engine query.
- **Smallest outcome:** search by creator-facing name/term across accessible
  properties, entities, timeline events, narrative units, assets, proposals,
  continuity findings, productions, and releases, returning typed results
  with exact state and context.
- **Non-goals:** no external indexing, semantic/model search, cross-tenant
  access, hidden-content discovery, mutation, approval, or publication.
- **Creator benefit:** reduces route hunting and helps creators recover a known
  subject while preserving its property/production/state context.
- **Workflow fit:** global shell entry; results deep-link to an authoritative
  route and selected subject. Search is navigation, never a source of canon or
  an approval action.
- **Authority effects:** results must respect tenant, role, visibility,
  spoiler/restricted policy, and current authoritative state. They must label
  proposal/candidate/canon/release status and provenance. No result may imply
  authorization or expose content unavailable to the actor.
- **Dependencies:** product decision on scope and ranking; Engine query/index
  contracts; permission filtering; stable deep links; typed result model;
  accessible combobox/list pattern; stale/deleted result recovery; privacy and
  telemetry boundaries.
- **Risks/failure modes:** information leakage, stale results, state-label
  flattening, ambiguous duplicate names, keyboard/focus traps, or treating
  search ranking as authority.
- **Alternatives:** per-route native filtering; command palette over routes
  only; manual navigation; defer until context/deep links exist; no-build.
- **Confidence/unknowns:** medium. Route fragmentation is directly observed,
  but mockup scope and participant demand are unknown. Research is useful to
  choose searchable types and result language.
- **Acceptance checklist:**
  1. Results are tenant/role/visibility filtered before presentation.
  2. Every result names type, property/production context, authoritative state,
     and exact stable identity.
  3. Opening a result deep-links to the correct authoritative route and
     selection with a safe recovery path if stale or unavailable.
  4. Proposal, candidate, canon, released, and published meanings are not
     collapsed.
  5. No search action mutates, approves, invokes a provider, or publishes.
  6. Keyboard, screen-reader, 200% zoom, narrow, no-results, busy, unavailable,
     and stale-result behavior is verified.

Cross-cutting decision order: first define persistent authoritative context and
deep links; then design structured selection/inspection; then decide whether
unit-asset associations are needed; only then define search scope. A search
index without trustworthy context would amplify current ambiguity.

## 14. Complete prioritized findings

### SWUX-001 — P0 — Ambiguous mutation outcomes cannot be safely reconciled

- **Affected creator/task:** any creator creating a property, proposal,
  structure revision, generation run, continuity disposition, canon snapshot,
  production, or credential change.
- **Mockup region:** M1/M2 contextual calls to action; failure/recovery behavior
  is not depicted.
- **Current route/state/location:** all mutation routes;
  `apps/studio/src/lib/engine.ts:227-240`;
  `apps/engine-api/src/server.ts:45-55,100-116`.
- **Observed fact:** every POST constructs a new random `Idempotency-Key`;
  Engine replay storage is process-local; the client reduces non-OK responses
  to a generic status error. Current UIs have busy states but no
  ambiguous/unknown outcome, reconciliation query, or stable retry identity.
- **Heuristic inference:** a timeout after server commit can invite a retry
  that sends a new key and performs a second consequential command, while the
  creator cannot determine authoritative state.
- **Impact:** duplicate or contradictory mutations, false completion, or
  blocked recovery at canon/release/credential boundaries.
- **Disposition:** **adapt mockup intent**.
- **Smallest coherent remediation:** generate a stable command ID before
  submission; retain it through retry; parse Problem Details and correlation
  IDs; represent validation, denial, conflict, unavailable, rejected, and
  unknown separately; reconcile authoritative state before enabling retry.
- **Verification method:** deterministic integration tests for
  response-lost-after-commit, process restart, duplicate click, reload, and
  retry; rendered confirmation/recovery checks for each consequential flow.
- **Evidence-based confidence:** high.
- **Participant validation:** unnecessary for the objective safety claim;
  useful later for recovery language.

### SWUX-002 — P0 — Canon and accepted-structure decisions are single-step actions without consequence review

- **Affected creator/task:** property owner accepting a canon proposal or
  adding a unit that supersedes an accepted narrative structure.
- **Mockup region:** M1/M2 inspector actions and lifecycle rail.
- **Current route/state/location:** `/review` pending proposal,
  `review-room.tsx:49-60,233-280`; `/arc-board` Add unit,
  `arc-board.tsx:52-85,143-189`; kernel acceptance
  `commands.ts:102-140`, `releases.ts:79-98`.
- **Observed fact:** `Accept`, `Reject`, and `Add unit` submit directly. The
  proposal row shows only a compact description/proposer; the Arc form says it
  supersedes the current revision but does not show the exact document diff,
  affected work, role/authority host, contradictions, state transition,
  reversibility, or receipt.
- **Heuristic inference:** an ordinary-looking button can make working canon or
  accepted plan changes before the creator understands scope and consequences.
- **Impact:** accidental canon/plan mutation and invalid downstream approvals.
- **Disposition:** **adapt mockup intent**.
- **Smallest coherent remediation:** introduce a shared pre-decision review
  step bound to exact proposal/document hash, diff, provenance, decision role,
  affected work, hidden/unknown contradictions, transition, supersession, and
  receipt; require explicit confirmation.
- **Verification method:** component/integration tests that no acceptance
  command fires from the list row or a single accidental keypress; browser
  checks for exact identity, stale blocking, focus containment/return, and
  durable result.
- **Evidence-based confidence:** high.
- **Participant validation:** useful for consequence language; unnecessary to
  establish the missing safeguard.

### SWUX-003 — P0 — `Intentional` fabricates an owner waiver rationale

- **Affected creator/task:** owner disposing a continuity contradiction as an
  intentional exception.
- **Mockup region:** M1 continuity/alerts area.
- **Current route/state/location:** `/continuity` open finding;
  `continuity-console.tsx:73-87,173-187`;
  `packages/evaluation/src/evaluate.ts:109-155`.
- **Observed fact:** clicking `Intentional` immediately sends
  `reason: "Accepted as intentional by the owner"`, scope `this production`,
  and no expiry. The creator is not asked for the reason, scope, or expiry;
  source assigns the rationale.
- **Heuristic inference:** the durable record can falsely attribute creative
  intent to the owner and obscure whether the contradiction was knowingly
  accepted.
- **Impact:** false provenance/authority evidence and unsafe continuity
  disposition.
- **Disposition:** **reject due to conflict**.
- **Smallest coherent remediation:** replace the direct action with a
  human-authored disposition form showing finding evidence, proposed
  correction, exact scope, reason, expiry, affected work, decision owner, and
  resulting receipt; never pre-author rationale.
- **Verification method:** tests that intentional/waived dispositions cannot
  submit without creator-entered rationale and exact scope; audit receipt and
  reload verification; keyboard/escape/focus-return checks.
- **Evidence-based confidence:** high.
- **Participant validation:** unnecessary for false-attribution claim; useful
  for form language.

### SWUX-004 — P0 — Release and publication semantics are conflated

- **Affected creator/task:** owner snapshotting or interpreting a canon
  release without authorizing external publication.
- **Mockup region:** M1/M2 lifecycle endpoint `Published`; current Release
  Builder.
- **Current route/state/location:** `/release-builder` snapshot form,
  `release-builder.tsx:125-225`; kernel
  `packages/kernel/src/releases.ts:11-56`.
- **Observed fact:** Studio calls the action `Snapshot`, but the kernel audit
  action is `canon.release.published`. Both mockups visibly end in `Published`
  without an authority host. Accepted alpha boundaries keep external
  publication separate and closed.
- **Heuristic inference:** creators or downstream receipt consumers can mistake
  a creative canon snapshot for external publication.
- **Impact:** false authority, misleading lifecycle meaning, and unsafe future
  integration assumptions.
- **Disposition:** **reject due to conflict** for literal adoption;
  **design decision needed** for external publication-status display.
- **Smallest coherent remediation:** rename internal audit/event semantics to
  exact canon snapshot/release language; reserve `published` for a separately
  authorized host-specific action and receipt; add explicit “does not publish
  externally” consequence text.
- **Verification method:** contract/kernel/UI tests asserting distinct event
  names, approval layers, authority host, and receipts; browser review of the
  full pre-approval consequence.
- **Evidence-based confidence:** high.
- **Participant validation:** useful for lifecycle wording; unnecessary for
  the authority conflict.

### SWUX-005 — P0 — Credential entry/revocation crosses a reserved boundary without deliberate confirmation

- **Affected creator/task:** operator saving, replacing, or revoking a hosted
  provider credential.
- **Mockup region:** no direct region; independent governance concern.
- **Current route/state/location:** `/settings`, source-only;
  `settings.tsx:36-65,78-127`.
- **Observed fact:** `Save encrypted` immediately stores a pasted key and opens
  the hosted-generation crossing; `Revoke` immediately denies use. Neither
  action has a review/confirmation step naming provider, scopes, consequence,
  actor/authority, or recovery. Notice text appears after action.
- **Heuristic inference:** an accidental click or misunderstood provider slot
  can enable spend/data transfer or disrupt generation.
- **Impact:** unauthorized external/provider crossing, spend exposure, or
  operational interruption.
- **Disposition:** **preserve current** encrypted-store/revocation invariants;
  **adapt** the interaction.
- **Smallest coherent remediation:** deliberate confirmation for exact
  provider/slot/scopes and crossing consequence; explicit replacement versus
  first entry; reauthentication/role gate when production identity exists;
  durable redacted receipt; no secret echo.
- **Verification method:** component/API tests for role denial, duplicate
  prevention, redaction, replace/revoke confirmation, ambiguous failure, and
  recovery; controlled local browser checks with fake values only.
- **Evidence-based confidence:** high from source; rendered behavior untested.
- **Participant validation:** unnecessary for consequential-action safeguard;
  useful for operator wording.

### SWUX-006 — P0 — Dev identity headers and human-kind-only checks do not establish approval authority

- **Affected creator/task:** any creator interpreting the displayed
  `property_owner` as an enforced authorization boundary.
- **Mockup region:** M1/M2 user/avatar/authority context.
- **Current route/state/location:** shared shell
  `layout.tsx:58-61`; client `engine.ts:199-217`; server
  `apps/engine-api/src/server.ts:80-97`; kernel
  `packages/kernel/src/actors.ts:5-17`.
- **Observed fact:** Studio hard-codes `ryan-cooper/property_owner`; when mock
  signing is absent, the server accepts actor headers and defaults missing
  kind to human; `requireHuman` checks actor kind but not role, delegation,
  permission, or authority host.
- **Heuristic inference:** any local client that can set headers can appear to
  be an authorized human owner and perform acceptance-class actions.
- **Impact:** false permission/authority in any environment beyond the tightly
  bounded alpha demonstration.
- **Disposition:** **preserve current** as an explicitly labeled accepted
  alpha limitation only; **design decision needed** before broader use.
- **Smallest coherent remediation:** fail closed outside explicit dev mode;
  use verified identity; enforce role/delegation/tenant/authority host at the
  command boundary; present the actual enforced principal and limitations.
- **Verification method:** negative integration tests for forged/missing
  headers, wrong tenant/role, expired delegation, and authority-host mismatch;
  UI checks that dev mode cannot look production-authorized.
- **Evidence-based confidence:** high.
- **Participant validation:** unnecessary.

### SWUX-007 — P1 — Adding an Arc unit can discard accepted structure data

- **Affected creator/task:** creator adding an episode/scene to a production
  with branches, choices, metadata, or contract-required bindings.
- **Mockup region:** M2 episode lanes, choice point, and branches.
- **Current route/state/location:** `/arc-board` Add unit;
  `arc-board.tsx:43-80`; contract
  `narrative-structure.schema.json:9-20,46-122`; test
  `arc-board.test.tsx:21-35`.
- **Observed fact:** the save reconstructs a document containing only
  `schema_version`, `structure_id`, `narrative_units`, and `threads`. The
  accepted contract also requires property/canon/production bindings,
  `choices`, `branches`, timestamps, hash, and required per-unit metadata.
  Existing component test asserts only unit addition and supersession.
- **Heuristic inference:** an accepted save can silently drop branches,
  choices, bindings, metadata, and future unknown fields—the exact structures
  M2 emphasizes.
- **Impact:** lost creative work and invalid/partial accepted structure.
- **Disposition:** **preserve current** append-only supersession invariant;
  **reject** destructive reconstruction.
- **Smallest coherent remediation:** round-trip the complete authoritative
  document or submit a typed append command/patch validated by the Engine;
  reject stale revisions and preserve unknown/untouched fields.
- **Verification method:** contract-backed tests using a full branching
  fixture, unknown fields, stale revision, retry, and hash comparison; prove
  only the intended unit changes.
- **Evidence-based confidence:** high.
- **Participant validation:** unnecessary.

### SWUX-008 — P1 — Narrow layouts remove all global navigation

- **Affected creator/task:** keyboard, zoomed, or narrow-screen creator trying
  to move between Studio surfaces or recover location.
- **Mockup region:** M1/M2 persistent sidebar; no narrow variant supplied.
- **Current route/state/location:** shared shell
  `layout.tsx:26-62`; rendered at 291×727 CSS.
- **Observed fact:** the sidebar is `hidden ... md:block` and no replacement
  control exists. At the checked narrow width, visible navigation links were
  zero on every route.
- **Heuristic inference:** a creator who enters a route directly cannot
  discover or reach the rest of Studio without editing the URL or widening the
  viewport.
- **Impact:** blocked critical navigation and severe reflow/zoom barrier.
- **Disposition:** **adopt mockup intent** for persistent reachability;
  **adapt** to a narrow drawer/menu with clear location and return.
- **Smallest coherent remediation:** add a labeled mobile navigation trigger,
  active route, focus-managed overlay or task-focused alternative, Escape and
  focus return, plus a bypass link.
- **Verification method:** 320-CSS-pixel-equivalent, 200% zoom, keyboard,
  screen-reader, orientation, long-label, and direct-entry checks across every
  route.
- **Evidence-based confidence:** high.
- **Participant validation:** unnecessary for reachability; useful for narrow
  information architecture.

### SWUX-009 — P1 — Loading is presented as false empty or selection-required state

- **Affected creator/task:** creator opening World Bible, Arc Board,
  Generation, Continuity, Review, or Release Builder directly.
- **Mockup region:** populated final states only; loading omitted.
- **Current route/state/location:** rendered direct entry; examples
  `world-bible.tsx:23-40,74-80`, `generation-workbench.tsx:38-69,124-167`,
  `continuity-console.tsx:34-56,137-149`.
- **Observed fact:** async state begins with empty arrays/nulls. Before requests
  settle, routes display messages such as `No canon release`, `Select a
  production and unit`, or empty counts that later become populated.
- **Heuristic inference:** creators can briefly conclude content is absent,
  select the wrong recovery action, or experience preventable layout shift.
- **Impact:** materially misleading authoritative state and unstable first
  scan.
- **Disposition:** **design decision needed** for loading geometry;
  **reject** false emptiness.
- **Smallest coherent remediation:** explicit loading state per dependency,
  reserved final geometry, stale-while-refresh labels where safe, and empty
  messages only after an authoritative successful response.
- **Verification method:** delayed-response tests and browser captures from
  first paint to final at narrow/typical/wide widths; unavailable/malformed
  responses must not resolve to empty.
- **Evidence-based confidence:** high.
- **Participant validation:** unnecessary.

### SWUX-010 — P1 — Continuity decisions hide evidence, affected work, and exact receipt context

- **Affected creator/task:** creator deciding whether a contradiction is
  resolved, waived, intentional, or needs a canon change.
- **Mockup region:** M1 continuity/alerts and inspector.
- **Current route/state/location:** `/continuity` findings table;
  `continuity-console.tsx:137-193`; view model `engine.ts:184-197`.
- **Observed fact:** the table shows severity, layer, description, disposition,
  and actions. It omits finding/revision IDs, content hash, source evidence,
  confidence/limits, suggested remediation, affected characters/rules/arcs/
  assets/releases, decision rationale, previous disposition lineage, and
  receipt details. In the rendered fixture, essentially the same description
  appeared across open, intentional, and resolved rows.
- **Heuristic inference:** different authoritative states can look like
  duplicate alerts, and the creator cannot judge whether the contradiction is
  actually addressed.
- **Impact:** unsafe or poorly evidenced continuity disposition and revalidation
  gaps.
- **Disposition:** **adapt mockup intent** with overview plus evidence detail.
- **Smallest coherent remediation:** selectable finding detail/inspector with
  evidence, exact state, provenance, affected work, proposed correction,
  confidence/limits, history, rationale, and receipt; keep hidden/unresolved
  counts visible.
- **Verification method:** full-state fixtures for open/resolved/waived/
  intentional/canon-change-proposed, stale/hidden/unavailable evidence, and
  keyboard/narrow inspector synchronization.
- **Evidence-based confidence:** high.
- **Participant validation:** useful for comprehension and disposition labels.

### SWUX-011 — P1 — Proposal review lacks full provenance, diff, impact, and exact decision consequence

- **Affected creator/task:** owner reviewing human- or AI-originated canon
  proposals.
- **Mockup region:** M1/M2 selected-object inspectors and lifecycle decision
  areas.
- **Current route/state/location:** `/review` pending queue;
  `review-room.tsx:108-113,233-280`; proposal view
  `engine.ts:164-173`; impact function `state-packet.ts:91-105`.
- **Observed fact:** each row exposes type, short summary, and proposer
  kind/id. It omits full payload/diff, rationale, source/prompt/import chain,
  parent version, later edits, policy, branch context in creator language,
  affected productions/releases/approvals/continuity findings, authority host,
  and receipt preview. `canonChangeImpact` is not exposed in Studio/API.
- **Heuristic inference:** AI origin is visible but not sufficiently
  consequential; fluent or compact content can be accepted without knowing
  what it changes.
- **Impact:** unsafe canon acceptance and loss of provenance/impact context.
- **Disposition:** **adapt mockup intent**.
- **Smallest coherent remediation:** shared proposal-detail review model with
  exact subject/hash, human/AI/imported/derived chain, diff/rationale,
  direct/indirect/unknown impacts, contradiction visibility, decision role,
  confirmation, and receipt.
- **Verification method:** fixtures for human, model, imported, derived, edited,
  stale, and conflicting proposals; negative tests that acceptance is blocked
  when identity/impact is unknown.
- **Evidence-based confidence:** high.
- **Participant validation:** useful for review comprehension.

### SWUX-012 — P1 — Mockup graph intent lacks a required structured, keyboard-operable authority-safe alternative

- **Affected creator/task:** keyboard, screen-reader, low-vision, zoomed, or
  non-drag creator understanding narrative structure and relationships.
- **Mockup region:** M1 central graph; M2 episode-lane branch canvas.
- **Current route/state/location:** mockup-only graph intent; nearest routes
  `/world-bible` and `/arc-board`, with current tables at
  `world-bible.tsx:82-135` and `arc-board.tsx:101-140`.
- **Observed fact:** static mockups show spatial nodes/edges but no legend,
  structured alternative, visible keyboard focus, non-drag operation,
  hidden-item count, story-time/presentation-order toggle, or narrow fallback.
  Current Studio has accessible-looking tables but no synchronized graph.
- **Heuristic inference:** literal adoption could make essential truth and
  selection accessible only through spatial perception or drag gestures, and
  could make the graph appear authoritative.
- **Impact:** severe access barrier and possible state/authority
  misinterpretation.
- **Disposition:** **adapt mockup intent**.
- **Smallest coherent remediation:** make Engine-backed list/outline/table the
  synchronized semantic alternative; add named graph controls, legend,
  selection state, browser-zoom-safe behavior, reduced motion, and narrow
  task fallback; keep mutations outside ambiguous gestures.
- **Verification method:** keyboard and screen-reader traversal, non-drag
  branch navigation, 200% zoom, 320 CSS px, forced colors, reduced motion,
  dense graph, hidden filters, and selection synchronization.
- **Evidence-based confidence:** medium because graph interaction is not yet
  implemented and mockup behavior is unknown.
- **Participant validation:** required before claiming graph comprehension or
  usability; unnecessary for the need for an equivalent path.

### SWUX-013 — P2 — Property, production, route, branch, and selection context is not persistent or deep-linkable

- **Affected creator/task:** creator moving among World Bible, Arc Board,
  Generation, Continuity, Review, and Release Builder.
- **Mockup region:** both persistent shells and inspectors.
- **Current route/state/location:** shared selectors;
  `production-picker.tsx:21-38`; `world-bible.tsx:23-40`;
  `review-room.tsx:32-47`; `release-builder.tsx:33-51`.
- **Observed fact:** each route independently loads lists and selects the first
  item. URLs contain only route names. No shared context, branch, filter,
  selected object, or return path is encoded.
- **Heuristic inference:** with multiple properties/productions, route changes
  can silently move the creator to a different context and make Back/reload
  feel inconsistent.
- **Impact:** significant orientation and wrong-subject risk, with a viable
  manual selection path.
- **Disposition:** **adopt mockup intent**.
- **Smallest coherent remediation:** a shared reconciled workspace context
  with property/production/branch/selection encoded in stable deep links,
  visible in shell, and reset explicitly when stale/unauthorized.
- **Verification method:** multiple-world/production tests for direct entry,
  link sharing, Back/Forward, reload, stale/deleted context, role changes, and
  narrow collapse.
- **Evidence-based confidence:** high from source; non-default rendered flow
  untested.
- **Participant validation:** useful for IA; unnecessary for persistence claim.

### SWUX-014 — P2 — Several routes overflow horizontally near 320 CSS pixels

- **Affected creator/task:** narrow-screen or zoomed creator reading tables and
  operating controls.
- **Mockup region:** no narrow variants supplied.
- **Current route/state/location:** rendered at 291×727 CSS: Arc Board 30 px,
  Generation 75 px, Continuity 232 px, Release Builder 129 px page overflow;
  Command Center visibly clipped.
- **Observed fact:** fixed-width selectors, `whitespace-nowrap`, tables, and
  side-by-side action groups exceed the page. World Bible and Review did not
  show page overflow in the same fixture, but their full dense states remain
  untested.
- **Heuristic inference:** essential labels/actions can leave the viewport,
  requiring two-dimensional scrolling and obscuring selected subject or
  decision consequence.
- **Impact:** significant reflow and task-efficiency barrier.
- **Disposition:** **adapt mockup intent**.
- **Smallest coherent remediation:** route-specific stacked/card or contained
  table patterns; preserve exact subject/status/action and use intentional
  local scroll only when a structured alternative exists.
- **Verification method:** 320 CSS px equivalent, 200% zoom, text spacing,
  long names/hashes, dense mixed states, keyboard focus visibility, and both
  themes.
- **Evidence-based confidence:** high for checked fixture.
- **Participant validation:** unnecessary.

### SWUX-015 — P2 — Accessibility feedback, boundaries, targets, and bypass behavior are incomplete

- **Affected creator/task:** keyboard, screen-reader, low-vision, motor, and
  zoomed creators using any route.
- **Mockup region:** both dense shells and inspectors.
- **Current route/state/location:** shell `layout.tsx:26-62`; tokens
  `globals.css:3-30`; InfoHint `info-hint.tsx:9-28`; buttons
  `button.tsx:5-20`; route notices/errors throughout.
- **Observed fact:** native semantics, labels, tables, text status, and focus
  rings are strengths. No skip link or active-route state exists. InfoHint is
  16×16. Notices are plain paragraphs without consistent live/status or
  field-error association. Border contrast against adjacent surfaces computes
  around 1.29–1.46:1. Full keyboard, screen reader, forced colors, zoom, and
  reduced motion were not tested.
- **Heuristic inference:** users can struggle to bypass repeated navigation,
  acquire small targets, recognize pane/control boundaries, or learn dynamic
  outcomes.
- **Impact:** significant accessibility and feedback inconsistency; severity
  may rise with manual assistive-technology evidence.
- **Disposition:** **preserve current** native/design-token invariants;
  **adapt** missing behaviors.
- **Smallest coherent remediation:** add skip/active-route semantics, enlarge
  help targets, use semantic status/error associations, ensure essential
  boundaries meet non-text contrast or have redundant structure, and validate
  focus/overlay behavior.
- **Verification method:** WCAG 2.2 scoped manual matrix across keyboard,
  browser zoom, screen reader, forced colors, reduced motion, both themes,
  target size, and dynamic states; report criteria, not conformance.
- **Evidence-based confidence:** medium because several configurations remain
  untested.
- **Participant validation:** useful, not required for measured/structural
  claims.

### SWUX-016 — P2 — Command Center does not answer what needs attention or what to do next

- **Affected creator/task:** new creator orienting and selecting the next safe
  task.
- **Mockup region:** M1 overview metrics, continuity, and activity.
- **Current route/state/location:** `/`, `command-center.tsx:58-156`.
- **Observed fact:** the route shows Engine reachability, a property table, and
  a creation form. It does not show selected world, current canon/production,
  pending proposals, open blockers, staged candidates, release readiness,
  reserved-crossing status, or recommended next action.
- **Heuristic inference:** the first screen reads as administration rather
  than a governed creative command center; a creator must route-hop to find
  work.
- **Impact:** significant orientation/discoverability cost without blocking
  every task.
- **Disposition:** **adopt mockup intent** using existing queries first.
- **Smallest coherent remediation:** a context-bound attention summary with
  clearly typed proposal/finding/candidate/release states and safe links; do
  not invent readiness metrics or collapse approvals.
- **Verification method:** source-backed metric definitions, empty/populated/
  stale/unavailable states, permission filtering, narrow/zoom layout, direct
  link context, and real-participant first-scan research.
- **Evidence-based confidence:** high for current absence; medium for proposed
  hierarchy.
- **Participant validation:** required to claim first-scan comprehension or
  choose information priority.

### SWUX-017 — P2 — Multi-author meaning and provenance are only partially represented

- **Affected creator/task:** team creator distinguishing who is present,
  editing, proposing, reviewing, permitted, and authorized.
- **Mockup region:** avatars/activity/inspector in M1/M2.
- **Current route/state/location:** shared actor badge
  `layout.tsx:58-61`; Review proposer
  `review-room.tsx:258-275`; Generation provenance
  `generation-workbench.tsx:254-297`; receipt writes in kernel.
- **Observed fact:** current UI shows one actor label, proposer kind/id, and
  generation provider/seed/locks. It does not distinguish presence, edit
  ownership, assignment, comments, later edits/merges, branch conflicts,
  permission, review responsibility, approval authority, or version-attributed
  receipts. Mockup avatars/activity do not define those meanings.
- **Heuristic inference:** adding collaboration visuals without semantic
  distinctions could imply canon acceptance or approval from mere presence or
  activity.
- **Impact:** significant provenance and authority ambiguity in future
  multi-author use.
- **Disposition:** **design decision needed**; do not infer live presence from
  mockups.
- **Smallest coherent remediation:** first expose actual asynchronous
  author/proposer/decision/version/authority data and conflict recovery; add
  presence/locks only after a demonstrated concurrency model and risk.
- **Verification method:** multi-actor fixtures for proposer/editor/reviewer/
  approver roles, stale conflicts, delegation expiry, compare/reconcile, and
  receipt attribution.
- **Evidence-based confidence:** medium; current absence is clear, mockup
  collaboration intent is ambiguous.
- **Participant validation:** useful for role-language comprehension.

### SWUX-018 — P3 — Current visual hierarchy is coherent but too uniform for a dense creative workspace

- **Affected creator/task:** desktop creator scanning a populated route.
- **Mockup region:** both full compositions.
- **Current route/state/location:** all checked routes; shared cards, badges,
  tables, and `text-lg` route headings.
- **Observed fact:** current spacing and semantic components are consistent,
  but route titles, cards, secondary descriptions, selectors, and actions have
  similar visual weight. Mockups create stronger distinction among world
  identity, mode, selected subject, status, evidence, and primary action.
- **Heuristic inference:** at greater density, the uniform card/table language
  will slow scanning and obscure the current task.
- **Impact:** local visual-comprehension/polish issue after safety and
  accessibility gaps are addressed.
- **Disposition:** **adopt mockup intent** selectively.
- **Smallest coherent remediation:** strengthen the shared shell, page header,
  context bar, section hierarchy, selected state, and decision-region
  primitives before route-specific decoration.
- **Verification method:** same-state before/after comparisons at narrow,
  typical, and wide widths in both themes; check loading geometry, long
  content, focus, contrast, and action prominence.
- **Evidence-based confidence:** medium; expert visual judgment only.
- **Participant validation:** useful, not required for consistency work.

## 15. Preserved strengths and current design-system invariants

- Preserve Engine ownership of authoritative state; Studio must not maintain a
  second canon.
- Preserve append-only revisions, exact hashes, supersession, correlation
  identity, and immutable canon releases.
- Preserve explicit production pins and the statement that later canon changes
  do not silently drift into a production.
- Preserve the proposal/candidate distinction and human-only acceptance
  invariant; models and tools propose, authorized people decide.
- Preserve generation candidate quarantine and visible provider, endpoint,
  seed, latency, locked attributes, and content hash.
- Preserve the explicit separation of story time and presentation order.
- Preserve native headings, labels, controls, tables, text status, semantic
  tokens, focus-visible rings, and `aria-describedby` help.
- Preserve the restrained semantic design system rather than importing
  unverified mockup components.
- Preserve direct route entry and ordinary browser navigation.
- Preserve the alpha boundary: no mockup or mature dossier surface becomes an
  implemented or approved capability by appearing in this review.

## 16. Smallest coherent improvement set

### Immediate

1. Fix Arc Board round-trip data loss before exposing branch-rich structures.
2. Remove fabricated continuity rationale and direct one-click intentional
   disposition.
3. Introduce stable mutation identity, typed outcomes, reconciliation, and
   visible receipts for consequential commands.
4. Add consequence review/confirmation to proposal acceptance, accepted
   structure changes, canon snapshotting, and credential changes.
5. Correct release versus publication terminology across kernel receipts and
   UI.
6. Keep the dev-identity limitation explicit and fail closed outside bounded
   local demonstration.

### Near-term

1. Add explicit loading/unavailable/empty states with stable geometry.
2. Restore narrow global navigation, active route, bypass link, and
   route-specific reflow.
3. Expose continuity evidence/history and proposal provenance/diff/impact.
4. Establish shared property/production/branch context and safe deep links.
5. Improve dynamic-status semantics, help target size, boundary contrast, and
   focus verification.
6. Upgrade Command Center using existing authoritative queries, without
   inventing readiness or collapsing lifecycle states.

### Structural

1. Enforce verified identity, role, delegation, tenant, and authority host at
   the command boundary.
2. Align runtime audit receipts with the richer accepted approval-receipt
   contract and expose exact decision evidence.
3. Define a selected-subject/inspector model and structured navigation before
   adding graph/canvas presentation.
4. If a graph is pursued, ship synchronized list/outline/table, legends,
   non-drag operation, narrow fallback, and explicit story-time/presentation
   semantics.
5. Decide category 4 proposals through product authority and evidence; this
   review does not authorize either.

## 17. Engineering and browser verification plan for a later implementation task

This is a plan only. A later implementation request must name exact scope and
authority.

### Engineering

1. Add complete contract fixtures for branching narrative structures and
   round-trip/patch tests that preserve all untouched fields.
2. Add a typed mutation state machine and stable command/idempotency identity;
   test lost responses, reload, replay, stale revisions, denial, malformed
   responses, and process restart.
3. Add consequence-preview contracts for proposal, structure, continuity,
   release, and credential actions, bound to exact subject/hash, actor role,
   authority host, impact, and receipt.
4. Add negative authority tests for forged/missing headers, wrong role/tenant,
   expired delegation, model/service actors, and external authority hosts.
5. Add route/context tests for direct entry, deep links, multiple properties/
   productions, stale selections, Back/Forward, and reload.
6. Keep existing unit/component/integration/contract/harness validation and
   interpret axe results within their configured scope.

### Browser and accessibility

1. Use fresh local synthetic contexts and loopback-only services; block
   unexpected external requests.
2. Check loading, empty, no-results, populated, dense, success, validation,
   denial, stale/conflict, unavailable, malformed, ambiguous, and confirmed
   receipt states.
3. Cover widths near 320 CSS pixels, immediately below/above shell and table
   breakpoints, typical desktop, and wide desktop; add 200% zoom and text
   spacing.
4. Cover light/dark, reduced motion, forced colors/high contrast, long names/
   IDs/hashes, hidden filters, and mixed status.
5. Complete forward/reverse keyboard journeys, visible/obscured focus, bypass,
   overlays, Escape, focus return, no accidental consequential keypress, and
   non-drag graph operation.
6. Use an available screen reader and record the exact reader/browser/OS;
   report scoped observations, never global conformance.
7. Compare loading-to-final geometry and before/after captures using identical
   data, viewport, theme, motion preference, and selection.

### Governance and evidence

- Bind all test evidence to exact revision/fingerprint and state skipped
  configurations.
- Do not treat automated checks as participant evidence or WCAG conformance.
- Do not activate credentials, providers, publication, deployment, or live
  integrations without separate explicit authority.
- Require a product decision before category 4 work or any lifecycle change
  involving external publication.

## 18. Questions requiring a product decision or real participant research

### Product decisions

1. What is the shared shell's canonical context model: organization, property,
   production, branch, selected subject, and lifecycle—and which parts belong
   in the URL?
2. Is the mockup lifecycle a navigation aid, a status summary, or an action
   flow? How will external publication be shown without implying Storyworld
   authority?
3. Which exact transition does proposal acceptance perform: working canon,
   approved canon, or another state, and what consequence preview is required?
4. What constitutes a release candidate versus canon release versus creative
   release package in the alpha's successor scope?
5. What graph data and semantics are approved: units, choices, branches,
   characters, relationships, assets, continuity, or a bounded subset?
6. Should unit-to-asset association become durable Engine state, and how does
   it interact with candidate acceptance, continuity, supersession, and
   release assembly?
7. What entities may global search reveal, under which tenant/role/visibility
   rules, and what stale-result guarantees are required?
8. What collaboration model actually applies: asynchronous proposals,
   checkout, locks, branches, or live co-editing?
9. Which actor roles may accept canon, structure, continuity waivers, releases,
   and credentials, and how are delegation and authority host represented?

### Real participant research

1. Can new creators explain property, canon, proposal, production pin,
   candidate, release, and publication after the first scan?
2. Which overview signals help them choose the next task without turning
   uncertain metrics into false readiness?
3. Can creators distinguish story time, presentation order, branch direction,
   hidden items, and selected state in a graph plus structured alternative?
4. Do creators understand AI origin and later human edits without treating
   model confidence or fluency as authority?
5. Can owners accurately predict the consequence of accepting a proposal,
   disposing a contradiction, snapshotting canon, or approving a release?
6. Which evidence and affected-work details are needed at decision time versus
   progressively disclosed?
7. Can keyboard, screen-reader, zoomed, and narrow-screen creators retain
   context and recover from stale/ambiguous outcomes?

No participant behavior, prevalence, quotation, metric, consensus, product
acceptance, or implementation readiness is claimed. The original audit
changed no Studio, canon, release, publication, credential, deployment,
provider, integration, or external state. Persisting this review changes only
the repository-local records named by TASK-0014 and their mechanically
refreshed generated integrity views; it does not change the audited
implementation or any product authority.

## Conclusion and limitations

- Actionable findings: SWUX-001 through SWUX-018, all open.
- Residual risks: the six P0 and six P1 findings remain unremediated; category
  4 proposals remain unaccepted; untested configurations remain unknown.
- Review limitations: primed expert comparison, synthetic local rendered
  checks, one browser/theme/data set, incomplete manual accessibility coverage,
  no participant evidence, and no consequential rendered mutations.
- Approval authority: none created by this review.
