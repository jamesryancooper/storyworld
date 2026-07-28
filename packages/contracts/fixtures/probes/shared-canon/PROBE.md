# PROBE-SHARED-CANON — shared-canon

Source: owner pattern program, section E (Shared universe and cross-property canon reuse).

Generic capability tested: cross-property canon reuse through version-pinned dependencies; shared-entity ownership stays with the provider property; deliberate forks record lineage.

Belongs in the reusable domain model: shared_canon_dependencies (provider ref, pinned canon release, entity refs, fork lineage) — the versioned PropertyDependency option from the pattern doc, mirroring the accepted Commerce Foundry snapshot pattern (ADR-0010) instead of live cross-property references. Ratification: DEC-0007.

Template/policy/adapter-specific: who may propose changes to shared canon (workspace policy), universe-level style rules.

Must-tests carried: shared ownership, version pinning, reference-not-copy, deliberate forking with lineage, no silent propagation.
Deferred to F3 kernel: cross-property impact analysis when the provider publishes a new release; authority workflow for shared-fact changes; time-scoped shared location states.
