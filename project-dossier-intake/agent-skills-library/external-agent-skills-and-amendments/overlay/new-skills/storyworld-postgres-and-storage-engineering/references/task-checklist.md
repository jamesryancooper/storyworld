# Task Checklist

## Before

- Every change names the owning module and invariant.
- Production DDL or data access requires explicit task authority.
- RLS is never disabled to simplify tests.
- Blob identity and semantic asset authority remain separate.

## Execute

- Map domain ownership, tenant scope, and transaction boundary.
- Design additive migration and rollback/recovery path.
- Define RLS and cross-tenant negative cases.
- Inspect query plans and indexes with representative data.
- Implement through repository migration conventions.
- Test transactions, conflicts, retries, and idempotency.
- Verify backup, restore, or reconciliation when custody is affected.
- Record operational and replacement implications.

## Close

- migration up/down or recovery test as applicable
- cross-tenant and permission-denial tests
- query-plan comparison
- transaction/locking tests
- content-hash and semantic-record reconciliation
- backup/restore smoke test when affected
- Record every skipped check and limitation.
- Do not adopt, approve, or expand authority.
