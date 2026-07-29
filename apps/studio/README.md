# Storyworld Studio

Next.js (App Router) workbench over the engine API — the same governed
command surface every client uses (ADR-0002): mutations POST with an
Idempotency-Key and actor identity; reads are tenant-scoped queries.

## Design system (delegated decision, DEC-0012)

**shadcn/ui-pattern, vendored.** Components live in `src/components/ui/`
as project-owned source (copy-in, not a runtime dependency), styled with
Tailwind CSS v4 design tokens (CSS variables, light + dark) and composed
with class-variance-authority + tailwind-merge. Rationale:

- Vendored components keep the governed surface auditable — no upstream
  package can change the Studio's rendered output without a diff here.
- Radix primitives are adopted per-component when a surface needs them
  (dialogs, selects); flat components stay dependency-free.
- Tokens (`src/app/globals.css`) are the single theming point.

## Surfaces (canonical dependency order, part 06 section 19.6)

1. Command Center (`/`) — identity, property portfolio, governed create.
2. World Bible (`/world-bible`) — pinned canon: releases, entities, events.
3. Arc Board (`/arc-board`) — nonlinear-safe structures and supersession.
4. Generation Workbench (`/generation`) — governed recipes, models, costs,
   candidates, and provenance.
5. Continuity Console (`/continuity`) — deterministic/model-assisted findings
   and human dispositions.
6. Review Room (`/review`) — human-authored proposals and explicit decisions.
7. Release Builder (`/release-builder`) — hash-bound releases and productions.
8. Settings (`/settings`) — masked, encrypted provider-credential entry,
   status, and revocation.

Accessibility is CI-enforced: every surface renders through axe-core in
the component suites with zero violations tolerated.

Set `NEXT_PUBLIC_ENGINE_URL` (default `http://localhost:4400`) and run
`pnpm dev`. Studio is an accepted alpha surface, not production identity,
transport-security, publication, or operations configuration.
