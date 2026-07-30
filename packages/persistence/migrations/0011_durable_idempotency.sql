-- 0011: durable idempotency replay (SWUX-001; DEC-0023; TASK-0016). The
-- first completed result for a command key is stored and replayed verbatim,
-- surviving engine restarts, so a client retry with a retained key can
-- never re-execute a completed command. Append-only like receipts.
CREATE TABLE storyworld.idempotency_keys (
  idempotency_key text NOT NULL,
  organization_id uuid NOT NULL,
  status integer NOT NULL,
  body text NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, idempotency_key)
);
ALTER TABLE storyworld.idempotency_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY idempotency_tenant_isolation ON storyworld.idempotency_keys
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
REVOKE UPDATE, DELETE ON storyworld.idempotency_keys FROM storyworld_app;
