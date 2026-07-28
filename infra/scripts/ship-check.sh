#!/usr/bin/env bash
# Single closure gate: every validation layer must pass or this exits
# nonzero. Never mask these exit codes behind pipes or echoes.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
pnpm -r typecheck
pnpm -r test
pnpm -r lint
python3 -B packages/contracts/tests/validate_contracts.py
python3 -B .agent/scripts/refresh.py --refresh
python3 -B .agent/scripts/validate.py --check
python3 -B -m unittest discover -s .agent/tests -p "test_*.py"
echo "SHIP-CHECK: all layers green"
