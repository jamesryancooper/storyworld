# Lifecycle State Machines

Machine-readable state machines for canon/plans, media artifacts, reviews,
and connected commerce work, per canonical part 02 §6.4. Format: strict JSON
(states, transitions, gates), mirroring the harness lifecycle.json pattern.
No state transition may be inferred from side effects (downloads, provider
completion, comments).
