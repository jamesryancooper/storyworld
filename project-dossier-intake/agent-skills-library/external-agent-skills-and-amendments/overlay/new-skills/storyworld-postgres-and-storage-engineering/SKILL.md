---
name: storyworld-postgres-and-storage-engineering
description: Design, implement, review, and migrate Storyworld PostgreSQL and object-storage behavior with tenant isolation, RLS, transactions, exact versions, query evidence, backup and restore, reconciliation, and portable replacement boundaries.
---

# Storyworld Postgres And Storage Engineering

This is a proposal-only Storyworld capability. It inherits the active task and cannot expand authority, adopt itself, approve work, activate credentials, perform external effects, or bypass project validation.

## Use this skill when

- Change tables, columns, indexes, migrations, RLS, transactions, SQL, search, database functions, storage records, blob reconciliation, backup, restore, or query performance.
- Investigate cross-tenant visibility, locks, bloat, connection exhaustion, or slow queries.

## Do not use this skill when

- The task is unrelated to this lifecycle.
- A narrower existing skill owns the work.
- The active task does not authorize repository-local changes.
- A missing decision, license, security review, or source revision blocks safe execution.

## Required inputs

- governing domain/module and contract
- current migrations and schema
- RLS and tenant model
- query plan or performance symptom
- storage and lineage invariants
- backup/restore and replacement constraints

## Authoritative sources

- accepted Storyworld contracts and module ownership
- current migrations and database code
- current PostgreSQL official documentation
- Storyworld storage and custody decisions

Read `references/provenance.json` before adopting or modifying this package. Read `references/source-ledger.md` before using an external rule. Use `references/task-checklist.md`, `references/output-contract.md`, and `references/adversarial-cases.md` during execution.

## Preconditions

- Every change names the owning module and invariant.
- Production DDL or data access requires explicit task authority.
- RLS is never disabled to simplify tests.
- Blob identity and semantic asset authority remain separate.

## Workflow

1. Map domain ownership, tenant scope, and transaction boundary.
2. Design additive migration and rollback/recovery path.
3. Define RLS and cross-tenant negative cases.
4. Inspect query plans and indexes with representative data.
5. Implement through repository migration conventions.
6. Test transactions, conflicts, retries, and idempotency.
7. Verify backup, restore, or reconciliation when custody is affected.
8. Record operational and replacement implications.

## Required outputs

- migration or query plan
- RLS and tenant test matrix
- EXPLAIN evidence where relevant
- transaction and locking analysis
- storage reconciliation plan
- backup/restore evidence
- rollback and compatibility result

## Prohibited actions

- disabling RLS or tenant filters
- arbitrary cross-module table access
- destructive production changes without authorization
- making Supabase-specific services canonical
- treating object-store paths as semantic identity
- claiming performance improvement without representative measurement

## Validation

- migration up/down or recovery test as applicable
- cross-tenant and permission-denial tests
- query-plan comparison
- transaction/locking tests
- content-hash and semantic-record reconciliation
- backup/restore smoke test when affected

## Evidence receipt

- schema revision
- migration IDs
- queries/plans
- RLS results
- storage hashes
- rollback/recovery result
- remaining operational risk

## Failure and escalation

Fail closed on uncertain tenant isolation, migration reversibility, data-loss risk, or custody reconciliation. Require owner/DB review before proceeding.

## Relationship to other Storyworld skills

Composes with contract-authoring, schema-evolution, asset-custody-and-lineage, security-review, and conformance-and-release.
