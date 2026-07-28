-- 0003_principals_and_leases: service principals and capability leases
-- (F2 identity/capability boundaries; ADR-0007).

CREATE TABLE storyworld.service_principals (
  principal_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  name text NOT NULL,
  key_id text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);
ALTER TABLE storyworld.service_principals ENABLE ROW LEVEL SECURITY;
CREATE POLICY principal_tenant_isolation ON storyworld.service_principals
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);

-- Capability leases: mission-scoped, budgeted, expiring authority envelopes
-- for agent/tool execution. A lease is coordination and audit, never
-- standing permission (ADR-0007, ADR-0008).
CREATE TABLE storyworld.capability_leases (
  lease_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  principal_id uuid NOT NULL REFERENCES storyworld.service_principals,
  mission_ref text NOT NULL,
  scope jsonb NOT NULL,
  budget jsonb,
  issued_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  CHECK (expires_at > issued_at)
);
ALTER TABLE storyworld.capability_leases ENABLE ROW LEVEL SECURITY;
CREATE POLICY lease_tenant_isolation ON storyworld.capability_leases
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
