# @storyworld/persistence

F2 persistence foundation (PLAN-0004; ADR-0004/0009/0010): plain-SQL
migrations with an immutable-history runner (content-hash verified),
tenant isolation via PostgreSQL row-level security bound to a
transaction-local setting, append-only audit receipts and content-blob
custody (trigger + privilege enforced), and the transactional outbox/inbox.

Integration tests need PostgreSQL:
`docker compose -f infra/compose.yaml up -d postgres` (or DATABASE_URL).
