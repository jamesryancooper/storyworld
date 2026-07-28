# PROBE-RIGHTS-CHANGE — rights-change

Source: owner pattern program, section H (Rights expiry, withdrawal, and replacement).

Generic capability tested: rights as operational constraints — territory/channel/purpose/duration scoping, expiry, withdrawal, replacement lineage, selective invalidation, preserved history.

Belongs in the reusable domain model: grants with scoped validity windows, withdrawal records, replacement_grant_ref lineage, affected_on_expiry mapping consumed by invalidation; approval receipts carrying invalidated_by.

Template/policy/adapter-specific: provider-exclusion enforcement after revocation (provider gateway policy), channel-specific rights vocabularies.

Must-tests carried: three differently-scoped grants; withdrawal with preserved history; replacement grant; selective invalidation (MET-F1 expire_right asserts the exact affected set and disjoint unaffected refs).
Deferred to later phases: blocking of scheduled packages at publish time (lifecycle gate, F3/B3); provider-exclusion after revocation (B1 gateway).
