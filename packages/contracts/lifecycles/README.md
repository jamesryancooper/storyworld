# Lifecycle State Machines

Machine-readable state machines per canonical part 02 §6.4, in strict JSON
mirroring the harness lifecycle pattern. Fields: `states`, `entry_states`
(multiple entries allowed and documented), `terminal_states`, `transitions`
(closed map), `inferred_transitions` (branches not literally enumerated in
the canonical sequence, each with a rationale), and `gates` (conditions a
transition must satisfy — enforced by application invariants, never inferred
from side effects).

Temporal workflow definitions (ADR-0006) derive from these machines; the
machines never encode orchestrator identifiers. Validated by
`../tests/validate_contracts.py`.
