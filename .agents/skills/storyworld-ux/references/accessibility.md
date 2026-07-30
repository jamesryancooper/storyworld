# Accessibility reasoning

Use WCAG 2.2 as the normative baseline and WAI-ARIA Authoring Practices as
informative interaction guidance when current native or vendored primitives do
not already establish a tested pattern.

## Scope evidence precisely

Define the page, complete task, states, viewports, themes, motion preference,
and input methods checked. Report the exact success criterion or interaction
contract, observation, and gap. Never claim the Studio, flow, or component is
accessible or WCAG conformant from an automated scan.

The current jsdom axe gate disables paint- and whole-document-dependent rules.
Treat it as useful regression evidence, not contrast, landmark, keyboard,
screen-reader, responsive, or complete-process proof.

## Semantics and keyboard

- Prefer native headings, landmarks, links, buttons, labels, inputs, selects,
  tables, lists, and disclosure behavior before ARIA.
- Give every control an accessible name that includes its visible label.
- Preserve logical DOM and focus order through the creator journey.
- Make every action keyboard operable, with visible focus that is not hidden
  by sticky chrome or overlays.
- Provide a bypass route for repeated navigation when the shell requires it.
- Verify overlays contain focus, support safe Escape behavior, and return
  focus to the opener or next logical element.
- Follow the expected keyboard model for any tabs, menus, listboxes,
  comboboxes, or other composite widgets.
- Do not allow a single keypress or shortcut to accept canon, decide a review,
  snapshot/release, publish, revoke a credential, or perform another
  consequential action.
- Keep disabled actions and prerequisites understandable without hover alone.

## Perception, reflow, and themes

- Preserve meaningful text alternatives and hide decorative icons from
  assistive technology.
- Programmatically associate headings, fields, descriptions, errors, groups,
  tables, and statuses.
- Do not encode draft/candidate/accepted/canon/released/published or severity
  with color alone.
- Measure text, UI, and focus contrast in both themes; semantic token names do
  not prove contrast.
- Check 200% text zoom, text-spacing overrides, and 320-CSS-pixel-equivalent
  reflow without lost truth or functionality.
- Check target size and a non-drag alternative for any drag interaction.
- Make hover/focus content dismissible, hoverable, and persistent when
  required. Ensure tooltip text that carries necessary instructions has a
  non-hover path.
- Respect reduced motion while retaining status, progress, and change
  feedback.
- Check forced-colors/high-contrast behavior when the environment supports it.

## Forms, errors, and dynamic status

- Use persistent labels and connect instructions, constraints, and field-level
  errors programmatically.
- Preserve entered creative work after validation or recoverable failure.
- Identify invalid fields and provide a clear error summary for multi-field
  failure when useful.
- Distinguish validation, permission, stale/conflict, unavailable, rejected,
  and ambiguous/unknown outcomes; each requires different recovery.
- Announce routine status politely and urgent failure assertively without
  duplicate announcements or unnecessary focus movement.
- Keep busy state from sending duplicate mutations while leaving action
  identity and recovery understandable.
- For canon, review, release, publication, or credential actions, provide a
  review/confirmation/correction path that names the exact subject, version,
  authority, and effect.

## Manual and automated checks

Perform the applicable checks:

1. Complete the critical flow keyboard-only in forward and reverse directions.
2. Inspect focus entry, order, visibility, obstruction, overlay containment,
   and return.
3. Inspect accessible names, roles, states, descriptions, and live regions.
4. Test 200% zoom, narrow reflow, text spacing, both themes, and reduced
   motion.
5. Exercise loading, empty, validation, permission, stale, unavailable, and
   unknown states.
6. Use a screen reader when available and record the exact browser/reader
   combination; otherwise disclose the gap.
7. Run the repository’s existing pinned accessibility and behavior checks,
   then interpret each result manually.

Do not install or run unpinned/global accessibility tooling or target an
external site. Report “no automated violations in the checked scope,” never
“WCAG compliant.”
