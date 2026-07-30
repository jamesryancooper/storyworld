# Complex Studio workspaces

Use this only for layered navigation, dense panes, a graph/canvas, or
concurrent creative work. Do not infer implementation from a mature target or
mockup. Inspect current behavior, source, and tests; add `accessibility.md`,
`visual-qa.md`, or `canon-consequences.md` only as implicated.

## Map the workspace before judging density

Record the creator's task and visible hierarchy:

1. organization, world/property, and production context;
2. route, tool, view, mode, branch, filters, and sort;
3. selected creative subject and its inspector or contextual actions; and
4. authoritative state, version, provenance, permission, and primary decision.

Check whether the first scan exposes the current subject, official versus
working state, what needs attention, and the next safe action. Density is not a
defect by itself. Report a problem only when hierarchy, comprehension, action,
or recovery is materially impaired.

## Trace layered navigation

- Distinguish global navigation, world/property navigation, production tools,
  local views, mode switches, selected-object context, and actions. A mode
  switch must not look like a canon or workflow transition.
- Keep world/property, production, branch, selected subject, and lifecycle
  state visible where they affect interpretation.
- Test direct entry, deep links, reload, Back, Forward, breadcrumbs or an
  equivalent return path, and escape from an inspector or focused subview.
- Verify whether filters, zoom, selection, and disclosure persist, reset, or
  reconcile. Preserve them only when they cannot imply stale state.
- Make links, tabs, view controls, disclosures, and state-changing actions
  visually and semantically distinct. Do not rely on icon shape or position
  alone.
- On narrow layouts, preserve location, selection, status, and the next safe
  action. Collapsed navigation needs a discoverable entry and return path.

## Audit graph and canvas interfaces

- Identify what position, distance, direction, grouping, line style, or color
  means. Provide a reachable legend and text/semantic equivalents.
- Show the current scope and selection. Make incoming/outgoing relationships,
  branch direction, story time versus presentation order, hidden/filtered
  items, and unresolved contradictions understandable.
- Check discoverable pan, zoom, fit/reset, search, filter, and selection.
  Preserve orientation and provide fast recovery from getting lost.
- Keep canvas selection synchronized with its inspector, outline, or detail
  view without making a visual highlight the only state indicator.
- Provide keyboard and non-drag operation, visible and predictable focus, and
  no input trap. Canvas zoom must not defeat browser zoom or reflow.
- Provide a synchronized outline, list, or table for authoritative information
  and essential actions a canvas cannot expose accessibly.
- Respect reduced motion, target size, high zoom, narrow screens, and dense or
  large graphs. Prefer a task-focused fallback over shrinking an unreadable
  canvas.
- Bind consequential actions to an exact subject and confirmation outside
  ambiguous spatial gestures. A graph is a view, not an authority source.

## Audit multi-author work

- Distinguish presence, edit ownership, authorship, assignment, creative
  provenance, permission, review responsibility, and approval authority.
  “Viewing,” “editing,” or commenting must not imply approval.
- Attribute exact revisions and human, AI-suggested, imported, or derived
  origins without erasing later edits or merges.
- Keep comments, annotations, proposed changes, accepted canon, review
  decisions, and approvals visually and semantically distinct.
- Inspect the concurrency model actually used: live co-editing, edit lock,
  checkout, branch, proposal, or asynchronous revision. Do not recommend
  presence or locking without a demonstrated conflict risk.
- For stale or conflicting work, preserve safe input and offer compare,
  reconcile, merge, branch, reload-latest, or escalation as supported. Never
  silently overwrite or imply a merge succeeded.
- Show who decided, under which role and permission, against which version,
  including expired delegation or approval. Keep a receipt reachable.

## Reduce complexity without hiding truth

- Use overview-and-detail structure, stable regions, explicit modes, and one
  clear primary task at a time.
- Progressively disclose advanced controls and secondary evidence while
  keeping status, provenance, contradictions, affected work, permission, and
  approval consequences visible at decision time.
- Put legends, contextual help, empty-state guidance, and recovery near the
  task they explain. Help must not be the only place that defines official
  state or authority.
- Preserve selected-subject identity as panes resize, collapse, stack, or
  scroll. Avoid multiple independent scroll regions unless their boundaries
  and focus behavior remain clear.
- Treat hidden or filtered unresolved work as still present: expose a count,
  status, and path to reveal it.

Report a compact workspace map, navigation/selection state coverage, input and
viewport coverage, observed facts, separate heuristic inference, and
limitations. Route findings through `critique.md`. Synthetic walkthroughs do
not prove participant comprehension or collaboration usability.
