---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0014",
  "title": "B2 Storyworld Studio: six surfaces over the governed gateway with a CI-enforced accessibility gate",
  "task": "TASK-0008",
  "recorded_at": "2026-07-29",
  "authority_source": "external:operator-instruction-2026-07-28 (DEC-0012 B-run authorization; Next.js accepted; design system delegated)",
  "owner": "claude-agent (storyworld-steward working mode)",
  "scope": "B2 exit behaviors: Studio surfaces in canonical dependency order (Command Center, World Bible, Arc Board, Generation Workbench, Continuity Console, Review Room, Release Builder) operating kernel flows end to end through engine-api's public contracts; design-system decision; automated accessibility",
  "method": "27 vitest suites: component behavior with a typed mock client, axe-core zero-violation checks on every surface, and one integration E2E that drives a live engine-api over HTTP against real Postgres through the Studio's own client (property -> proposal -> human decision -> release snapshot -> pinned production -> structure revision -> scene packet -> governed mock generation with provenance -> continuity evaluation -> human disposition -> keyless-fal 403 refusal). Next.js production build in ship-check and CI. Three tranches, each ship-check green",
  "environment": "Local: macOS, Docker compose dev profile. CI: ubuntu-latest platform job (Node 22, Postgres 16, MinIO, Temporal)",
  "subject_revision_or_fingerprint": "main at b7baa75 (tranches: b4401f0, 2b9fc5f, b7baa75; harness-manifest fix ca6a7b8)",
  "result": "pass",
  "fresh_until": "2026-10-29",
  "supersedes": null,
  "limitations": [
    "Owner Studio usability walkthrough is deferred to the V1 consolidated review (DEC-0012 deferral).",
    "Dev identity via X-Actor-* headers; real identity federation is an O1 concern (mock-IdP SSO interface lands in B3).",
    "axe runs under jsdom: color-contrast and whole-page landmark rules are excluded from the component-level gate (documented in the axe helper)."
  ]
}
---

## Behaviors proven

- **Same governed surface as every client**: all Studio mutations POST
  through engine-api with Idempotency-Key + actor identity; the E2E proves
  proposals never silently change canon (human decision required), the
  release snapshot supersedes explicitly, and productions pin exact
  releases.
- **Design system (delegated per DEC-0012)**: shadcn/ui-pattern with
  vendored project-owned components, Tailwind v4 tokens (light + dark),
  class-variance-authority; recorded in apps/studio/README.md.
- **Accessibility**: axe-core zero-violation gate on all six surfaces in
  every CI run.
- **Governance visible in the UI**: reserved-crossing (keyless fal)
  surfaces as an explicit refusal; staged candidates show full provenance
  (provider, endpoint, seed, latency, locked attributes); continuity
  dispositions are human actions with waivers enforced.
- **Nonlinear-safe Arc Board**: presentation order and story time are
  independent; structure changes are supersession revisions.
