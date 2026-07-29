-- 0009_provider_credentials: envelope-encrypted provider credential store
-- (V1 review amendment, owner-instructed 2026-07-29; pattern ported from
-- Commerce Foundry foundry_credentials). Rows are append-only revisions of
-- a stable credential name: entry, replacement, revocation, and
-- re-activation are each a NEW revision with a receipt — never an edit.
-- Only ciphertext and the wrapped data-encryption key are stored; the
-- master key never enters the database (see @storyworld/credentials).

CREATE TABLE storyworld.provider_credentials (
  credential_revision_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  name text NOT NULL,
  provider text NOT NULL,
  scopes jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL CHECK (status IN ('active','revoked','expired')),
  ciphertext text NOT NULL,
  wrapped_dek text NOT NULL,
  hint text NOT NULL,
  expires_at timestamptz,
  supersedes_revision_id uuid REFERENCES storyworld.provider_credentials,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.provider_credentials ENABLE ROW LEVEL SECURITY;
CREATE POLICY provider_credential_tenant_isolation ON storyworld.provider_credentials
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER provider_credentials_append_only
  BEFORE UPDATE OR DELETE ON storyworld.provider_credentials
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.provider_credentials FROM storyworld_app;
