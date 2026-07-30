---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0026",
  "title": "Phase 1 rendered browser verification of the changed Studio surfaces",
  "task": "TASK-0016",
  "recorded_at": "2026-07-30",
  "authority_source": "external:project-owner instruction 2026-07-30 — \"Yes, please continue.\" authorizing the rendered browser/assistive-technology pass, the last TASK-0016 exit-gate item",
  "owner": "claude-agent (improvement program lead)",
  "scope": "Rendered verification of the Phase 1 acceptance surfaces (Command Center, Arc Board, Continuity Console, Release Builder) against the loopback stack, plus one rendered-only defect found and fixed",
  "method": "Studio :3000 and Engine :4400 dev servers over the declared compose postgres, driven through Chrome: identity labeling, consequence-review two-activation (pointer and keyboard), receipt display, continuity evidence and reviewer-authored waiver, release/publication vocabulary, loopback-only network, console-error sweep, and narrow-width reflow; console/network read directly",
  "environment": "Local macOS; Studio dev build with cleared .next cache pointed at Engine :4400 (STORYWORLD_DEV_IDENTITY=1); loopback compose postgres; synthetic Stillhouse fixture; no live provider, publication, credential value, or external access",
  "subject_revision_or_fingerprint": "Rendered against the working tree at commit 049c734 plus the banner fix committed with this evidence; one governed test mutation (a narrative-structure unit) written to the local Stillhouse fixture",
  "result": "pass",
  "fresh_until": "2026-08-30",
  "supersedes": null,
  "limitations": [
    "The macOS minimum window width clamped the narrow test to 606 CSS px (REV-0001 hit the same limit); true ~320 px reflow and the SWUX-014 overflow re-check could not be executed via this tooling — both remain Phase 2 scope.",
    "Dark theme could not be rendered-verified: the tooling does not expose prefers-color-scheme emulation, and Studio theming is CSS-media based. The tokens are unchanged from the REV-0001 baseline; dark rendering is unverified here.",
    "No screen reader, 200% browser page zoom (blocked by the tool), forced-colors, or reduced-motion pass was executed. Rendered failure states (unknown/unavailable/conflict/refresh_failed) were not driven live; they remain covered by the component test suite (studio 65 green).",
    "This is synthetic expert verification, not participant evidence, and establishes no WCAG conformance."
  ]
}
---

## Method

Brought up Studio (:3000, fresh build) and Engine (:4400, dev identity,
migrations applied) over the declared loopback compose postgres, then drove
the changed surfaces through Chrome.

## Result

**One rendered-only defect found and fixed.** `UnknownOutcomeBanner`
(the SF2/SWUX-001 reload-recovery banner) threw a React error on every page
load — "The result of getServerSnapshot should be cached to avoid an
infinite loop" — because its `useSyncExternalStore` server snapshot was
`() => []`, a fresh array literal per call. jsdom's store shim does not
exercise the SSR snapshot path, so the 64-test suite was green while every
real page load errored. Fixed by using the module's stable cached snapshot
(`listUnknownOutcomes`) for both snapshots; the mount gate still handles
hydration parity. A referential-stability regression test was added
(studio now 65 green), with the honest note that the SSR-path guard is the
rendered pass itself.

**Verified in the rendered UI (observed fact):**

- Identity labeling (SWUX-006): the shell badge and every consequence
  review read "ryan-cooper · property_owner · development identity — not
  verified · authority host: storyworld".
- Arc Board consequence review (SWUX-002/007): the first activation opens
  the review — proven for BOTH pointer (click) and keyboard (Enter in the
  story-time field opened the review, `recorded=false`, no receipt, unit
  count unchanged). The review shows the unit's story time and independent
  presentation order, the exact superseded revision id and current hash,
  and the effect line "choices, branches, threads, bindings — preserved
  exactly." The confirm control reads "Save as accepted revision" (DEC-0020
  point-of-action label). The second activation POSTed
  `/v1/narrative-unit-additions` → 201 and rendered "Accepted plan revision
  recorded — receipt 019fb47e-…"; the new unit appeared.
- Continuity disposition review (SWUX-010): exposes finding id, confidence
  (50%), evidence ref, subject ref with hash, suggested remediation, decider
  identity, and an effect stating resolution never implies an unrecorded
  canon change.
- Continuity waiver (SWUX-003): selecting intentional_exception surfaces an
  empty "Waiver rationale — your own words" textarea and an empty "Waiver
  scope" field, with "The rationale and scope are recorded verbatim in the
  durable waiver — nothing is filled in for you," and "Record disposition"
  disabled until both are non-empty. No canned rationale anywhere.
- Release Builder (SWUX-004): "A canon release is not an external
  publication"; the action is "Snapshot" not "Publish"; pinned productions
  show "canon changes never reach it silently," with latest v1.2.0 vs the
  production's pinned v1.0 visible.
- Network is loopback-only: every engine call is `http://localhost:4400`
  (OPTIONS 204 / GET 200 / POST 201); no external host was contacted.
- Console-error sweep after the full session: no errors (post-fix).
- Narrow reflow at 606 CSS px (tooling floor): no horizontal overflow on
  Arc Board (`bodyScrollWidth == clientWidth`). The sidebar is hidden below
  the md breakpoint with no replacement — the pre-existing SWUX-008
  narrow-navigation gap, unchanged and confirmed Phase 2 scope, not a
  Phase 1 regression.

## Limitations

See frontmatter. The rendered pass covered the Phase 1 safety UX and its
happy/keyboard paths and caught a real load-time defect; dark theme, true
320 px, assistive technology, page zoom, and live failure-state rendering
were not executable through this tooling and are recorded as untested.
