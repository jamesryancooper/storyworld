# Fixture-Driven Design Notes (§ mismatch log)

Mismatches and ambiguities recorded while grounding the F1 contracts in the
owner-supplied fixture packet (SRC-0003), per the narrowest-coherent-change
rule. Refinement candidates are proposals only; schema changes flow through
the compatibility rules and, where they touch accepted decisions, the
decision process.

## Deferred to the F3 kernel (semantic enforcement beyond schema power)

| Item | Fixtures affected | Note |
|---|---|---|
| Reveal-order enforcement (a reveal packaged before its prerequisite) | stillhouse | Graph semantics; F1 carries the dependency data, invalid-case covers the schema-detectable aspect |
| Mutually-exclusive branch states, unreachable/circular choice graphs, cross-ref resolution | branching probe | Schema proxies in place; kernel validates graphs |
| State recomputation by story time | nonlinear-time probe | Coordinates explicit in F1; computation is F3 |
| Mission prerequisite / trigger condition grammar (free-string micro-DSL) | bekindrewind | Typed condition grammar is a compiler/kernel concern |
| Trigger idempotency semantics | bekindrewind | Runtime/adapter concern |

## Template / policy / adapter concerns (correctly outside the generic core)

| Item | Fixtures affected | Owner |
|---|---|---|
| Source-drift behavior vocabulary on briefs | commerce | policy pack |
| Edition-specific reveal policy for assertions | contested-truth probe | policy pack |
| Spoiler windows for out-of-order release | nonlinear-time probe | channel policy |
| Per-medium adaptation conventions | adaptation probe | template |
| Numbering styles vs stable IDs | deep-hierarchy probe | template |
| Fact-check workflow and correction-notice formats | correction probe | policy/template |
| Provider-exclusion enforcement after rights revocation | rights-change probe | gateway policy |

## Schema refinement candidates (additive; not yet applied)

| Candidate | Driver | Status |
|---|---|---|
| Nullable `story_time` for non-chronological unit types | editorial ("editorial-timeless" placeholder) | proposed; needs a second driver per the generic-primitive rule |
| Explicit `supersedes_ref` on narrative-asset-bundle | commerce v1→v2 loop modeled via lineage | proposed (minor) |
| Nullable `budget` on campaign brief | commerce source specifies none (synthetic 2500 USD used, manifest-noted) | proposed (minor) |
| Typed severity on receipt revision-request findings | commerce rejection ("blocking" in text) | proposed (minor) |
| Identity-alias primitive (one person, public/secret identities) | stillhouse (modeled as two entities + secret_truth link) | watch; adopt only if a second fixture needs it |
| Dedicated publication record schema | correction probe (published-version preservation via lifecycle + facts) | deferred to B3 (publication/receipts phase) |
| `maximum` keyword and map-typing support in the subset validator | continuity-finding confidence ≤1; rights `affected_on_expiry` map | validator enhancement candidates; constraints documented + metamorphic-checked meanwhile |

## Source-fidelity notes

- Editorial source defines **nine** panels (not ten as the working spec
  assumed); the source governed.
- Editorial restricted note split verbatim into `source/restricted/`
  (6030 → 5408 + 933 bytes) with a pointer line; separation enforced by the
  validator.
- Shared `$defs` across schema files are deliberately inlined (subset
  validator resolves whole-schema `$id` refs only).
- OpenAPI and AsyncAPI documents are authored as strict JSON (both
  specifications permit JSON natively). Appendix B names `.yaml` filenames;
  the JSON authoring keeps DEC-0005's zero-dependency validator covering
  them and honors the strict-JSON canonical rule. Generate YAML derivatives
  only if external tooling requires them.
