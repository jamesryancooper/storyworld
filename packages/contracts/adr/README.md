# Product Architecture Decision Records (F0)

Product ADRs for the Storyworld platform. These are distinct from the
harness's governance decisions in `.agent/decisions/`:

- **ADR-#### here** = what the *platform* is (deployment boundary, identity,
  assets, approvals, publication, runtime state, analytics, portability…).
- **DEC-#### there** = how this *repository* is governed.

## Seed list

`project-dossier/canonical/storyworld/08_appendices.md` Appendix A proposes
ADR-001 through ADR-016. Author each as `ADR-0001-short-slug.md` (four-digit
IDs; Appendix A's ADR-1..16 map to ADR-0001..0016).

## Record format

Each ADR contains: status line (`proposed` | `accepted` | `superseded by
ADR-####`, with date and accepting authority), context, decision, scope,
consequences, alternatives considered, and links to the canonical dossier
sections and any schemas/fixtures it constrains.

## Acceptance rule

An ADR becomes authoritative only through the F0 exit-gate evaluation
(GATE-0002) and an umbrella harness decision in `.agent/decisions/`
recording the owner's acceptance of the ADR set. Until then every record
stays `proposed`. Supersession never deletes a record; it links a successor.
