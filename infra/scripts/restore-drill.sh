#!/usr/bin/env bash
# F2 restore drill (GATE-0004): dump the authoritative database, destroy the
# schema, restore from the dump, and verify migration history and row
# integrity survive. Runs against the compose profile's version-matched
# pg tools inside the postgres container. Dev-only.
set -euo pipefail
COMPOSE="docker compose -f infra/compose.yaml"
PG="$COMPOSE exec -T postgres"

echo "== pre-drill state =="
BEFORE_MIGRATIONS=$($PG psql -U storyworld -d storyworld -tAc "SELECT count(*) FROM public.schema_migrations")
BEFORE_ORGS=$($PG psql -U storyworld -d storyworld -tAc "SELECT count(*) FROM storyworld.organizations")
BEFORE_RECEIPTS=$($PG psql -U storyworld -d storyworld -tAc "SELECT count(*) FROM storyworld.audit_receipts")
echo "migrations=$BEFORE_MIGRATIONS orgs=$BEFORE_ORGS receipts=$BEFORE_RECEIPTS"

echo "== dump =="
$PG pg_dump -U storyworld -d storyworld -Fc -f /tmp/storyworld-drill.dump

echo "== destroy =="
$PG psql -U storyworld -d storyworld -c "DROP SCHEMA storyworld CASCADE; DROP TABLE public.schema_migrations;"
GONE=$($PG psql -U storyworld -d storyworld -tAc "SELECT count(*) FROM information_schema.schemata WHERE schema_name='storyworld'")
[ "$GONE" = "0" ] || { echo "destroy failed"; exit 1; }
echo "schema destroyed"

echo "== restore =="
$PG pg_restore -U storyworld -d storyworld --no-owner /tmp/storyworld-drill.dump

echo "== verify =="
AFTER_MIGRATIONS=$($PG psql -U storyworld -d storyworld -tAc "SELECT count(*) FROM public.schema_migrations")
AFTER_ORGS=$($PG psql -U storyworld -d storyworld -tAc "SELECT count(*) FROM storyworld.organizations")
AFTER_RECEIPTS=$($PG psql -U storyworld -d storyworld -tAc "SELECT count(*) FROM storyworld.audit_receipts")
echo "migrations=$AFTER_MIGRATIONS orgs=$AFTER_ORGS receipts=$AFTER_RECEIPTS"
[ "$BEFORE_MIGRATIONS" = "$AFTER_MIGRATIONS" ] || { echo "FAIL migrations"; exit 1; }
[ "$BEFORE_ORGS" = "$AFTER_ORGS" ] || { echo "FAIL orgs"; exit 1; }
[ "$BEFORE_RECEIPTS" = "$AFTER_RECEIPTS" ] || { echo "FAIL receipts"; exit 1; }
$PG rm /tmp/storyworld-drill.dump
echo "RESTORE DRILL: PASS (counts identical across dump/destroy/restore)"
