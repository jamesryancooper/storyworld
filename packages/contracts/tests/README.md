# Contract Acceptance Tests

Round-trip determinism, schema compatibility, package verification,
signature, and idempotency tests over schemas + fixtures (F1 exit gate
GATE-0003). First implementation: Python 3.11+ stdlib validator (per
proposed DEC-0005) so CI stays dependency-free; wire it into
.agent/project.json project_test and .github/workflows/validate.yml in the
same change that adds it.
