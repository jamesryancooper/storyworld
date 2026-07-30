# Browser, visual, responsive, and keyboard QA

Use this reference for rendered audits and visual verification after an
authorized implementation.

## Contents

- Safe browser boundary
- Coverage matrix
- Visual and interaction inspection
- Navigation, hydration, and evidence reporting

## Establish a safe browser boundary

For ordinary QA, inspect current startup instructions, test configuration, and
the relevant route before launching a browser. Use an available approved
browser-control skill/tool according to its instructions. Use only
project-owned loopback services started or verified for this task, a fresh
ephemeral context, and clearly synthetic data. Block or abort unexpected
external requests.

Never reuse an existing profile, session, cookies, storage, login, credential,
provider, or production data. Do not download a browser, package, or helper.
If a safe stack or approved browser is unavailable, continue with source/test
inspection and report that rendered QA was not executed.

For an eligible first-use pass, follow `first-use.md` before inspecting routes
or intended behavior. Preserve its raw notes and any limitation during later
expert QA.

## Build the coverage matrix

Cover the audited or changed surface across:

- Initial loading and in-place refresh.
- Empty, no-results, populated, and dense content.
- Confirmed success with persistent authoritative feedback.
- Validation failure with preserved input.
- Read-only or permission denial.
- Stale/version/conflict state.
- Service unavailable or malformed response.
- Ambiguous/unknown mutation outcome with reconciliation.
- Reduced motion.
- Keyboard-only use.
- Narrow reflow near 320 CSS pixels.
- Widths immediately below and above relevant navigation, grid, table,
  dialog, and control-wrap breakpoints.
- Typical and wide/dense desktop layouts.
- Light and dark themes.
- 200% zoom or equivalent reflow/text scaling.
- Long names, prose, IDs, hashes, versions, missing values, and mixed statuses.

Add flow-specific states. Do not create fixtures that bypass domain authority
or make a proposal, candidate, approval, or publication look real.

## Inspect visual behavior

- Capture or inspect the full page and the critical decision region.
- Check first-scan orientation, reading order, grouping, alignment, spacing,
  density, and action prominence.
- Check overflow, clipping, wrapping, truncation, scroll containers, sticky
  chrome, tables, help, and overlays.
- Keep exact subject, state, version/hash, authority, and consequence reachable
  when content truncates or stacks.
- Compare loading and final geometry for layout shift.
- Check draft, proposal, model-assisted, candidate, accepted, canon, release,
  and publication presentations in both themes.
- Verify model assistance remains visible but visually subordinate to human
  decision authority.
- Check focus rings, native controls, muted text, errors, borders, and status
  cues in both themes.
- Check reduced motion without losing progress or state feedback.
- For implementation, compare before/after captures at the same data, state,
  viewport, theme, and motion preference.

Source inspection alone is not rendered evidence. A screenshot is not a user
test.

## Inspect keyboard and interaction behavior

- Traverse from before the app shell through the complete task in DOM order.
- Verify navigation bypass, visible focus, and no hidden focus.
- Operate each changed control and overlay with its expected keyboard model.
- Verify focus entry, containment, safe Escape behavior, and return.
- Confirm busy state blocks duplicates without erasing result or recovery.
- Confirm stale and ambiguous states disable consequential actions and do not
  resend after reload.
- Confirm accessible names match visible, specific verb-object labels.
- Confirm accepting a proposal, disposing a contradiction, snapshotting or
  approving a release, publishing, and credential changes require deliberate
  action and cannot fire from an accidental single keystroke.
- For dense panes, layered navigation, a graph/canvas, or concurrent editing,
  add `complex-workspaces.md`.

## Inspect navigation and hydration

- Open important routes directly; exercise reload, Back, and Forward.
- Verify the selected property/production, pinned canon, reviewed subject, and
  next safe action remain understandable.
- Do not let unresolved, stale, busy, or ambiguous states disappear into a
  false current view or unsafe resend path.
- Restore filters, selection, and input only when doing so cannot misrepresent
  authoritative Engine state.
- Watch console and rendered output for hydration errors, layout jumps,
  duplicate announcements, wrong-theme flashes, or action availability that
  changes after hydration.
- Never allow a late client read to briefly enable a consequential control
  before permission, version, and exact binding are known.

## Report evidence

Record:

- Browser method and command, if any.
- Route, task, data state, viewport, theme, motion preference, and input
  method.
- Passed and failed observations with source/test locations.
- Screenshot paths when captured.
- External-request guard status.
- Checks not performed, including browser engine, screen reader, forced
  colors, device, theme, zoom, motion, or state coverage.

Do not claim cross-browser, responsive, keyboard, visual, or usability
coverage beyond configurations actually exercised.
