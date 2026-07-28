-- 0002_custody: audit receipts (append-only), outbox/inbox, content blobs.

CREATE TABLE storyworld.audit_receipts (
  receipt_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  actor text NOT NULL,
  action text NOT NULL,
  subject_ref text NOT NULL,
  subject_sha256 text,
  correlation_id uuid NOT NULL,
  causation_id uuid,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  detail jsonb NOT NULL DEFAULT '{}'::jsonb
);
ALTER TABLE storyworld.audit_receipts ENABLE ROW LEVEL SECURITY;
CREATE POLICY audit_tenant_isolation ON storyworld.audit_receipts
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);

-- Receipts are immutable evidence (ADR-0009): no UPDATE/DELETE for anyone
-- but the migration owner, enforced by trigger as well as privileges.
REVOKE UPDATE, DELETE ON storyworld.audit_receipts FROM storyworld_app;
CREATE FUNCTION storyworld.reject_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'append-only table: % on %.% is prohibited', TG_OP, TG_TABLE_SCHEMA, TG_TABLE_NAME;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER audit_receipts_append_only
  BEFORE UPDATE OR DELETE ON storyworld.audit_receipts
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();

-- Transactional outbox/inbox (ADR-0010): at-least-once, idempotent consumers.
CREATE TABLE storyworld.outbox (
  outbox_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  event_type text NOT NULL,
  envelope jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  delivered_at timestamptz
);
ALTER TABLE storyworld.outbox ENABLE ROW LEVEL SECURITY;
CREATE POLICY outbox_tenant_isolation ON storyworld.outbox
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE INDEX outbox_undelivered ON storyworld.outbox (created_at) WHERE delivered_at IS NULL;

CREATE TABLE storyworld.inbox (
  message_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  source text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.inbox ENABLE ROW LEVEL SECURITY;
CREATE POLICY inbox_tenant_isolation ON storyworld.inbox
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);

-- Content-addressed blob metadata (ADR-0005): bytes live in object storage;
-- the row is the semantic owner of identity and custody.
CREATE TABLE storyworld.content_blobs (
  sha256 text PRIMARY KEY CHECK (sha256 ~ '^[a-f0-9]{64}$'),
  organization_id uuid NOT NULL,
  size_bytes bigint NOT NULL CHECK (size_bytes >= 0),
  media_type text NOT NULL,
  storage_uri text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.content_blobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY blob_tenant_isolation ON storyworld.content_blobs
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER content_blobs_append_only
  BEFORE UPDATE OR DELETE ON storyworld.content_blobs
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.content_blobs FROM storyworld_app;
