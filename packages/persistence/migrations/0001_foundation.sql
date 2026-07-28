-- 0001_foundation: schema, tenancy, roles (F2; canonical part 06 s19.3)
-- Applied migrations are immutable: the runner verifies content hashes and
-- refuses to proceed if an applied file changed (ADR-0009 discipline).

CREATE SCHEMA IF NOT EXISTS storyworld;

CREATE TABLE storyworld.organizations (
  organization_id uuid PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE storyworld.workspaces (
  workspace_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES storyworld.organizations,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE storyworld.memberships (
  membership_id uuid PRIMARY KEY,
  workspace_id uuid NOT NULL REFERENCES storyworld.workspaces,
  principal text NOT NULL,
  role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, principal)
);

-- Tenant isolation: every tenant-scoped table carries organization_id and an
-- RLS policy bound to the request-scoped setting. Defense in depth per
-- part 05 s15.1; application authorization remains the primary gate.
ALTER TABLE storyworld.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE storyworld.memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY workspace_tenant_isolation ON storyworld.workspaces
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);

CREATE POLICY membership_tenant_isolation ON storyworld.memberships
  USING (workspace_id IN (
    SELECT w.workspace_id FROM storyworld.workspaces w
    WHERE w.organization_id = current_setting('storyworld.tenant_id')::uuid));

-- Non-superuser application role; the engine connects as this role so RLS
-- applies. Local/dev password matches the compose profile; managed
-- deployments override it.
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'storyworld_app') THEN
    CREATE ROLE storyworld_app LOGIN PASSWORD 'storyworld-dev-only';
  END IF;
END
$$;
GRANT USAGE ON SCHEMA storyworld TO storyworld_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA storyworld TO storyworld_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA storyworld
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO storyworld_app;
