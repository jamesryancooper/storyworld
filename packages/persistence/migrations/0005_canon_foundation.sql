-- 0005_canon_foundation (F3 tranche 1): properties, canon branches, and
-- immutable canon releases. Release documents are the canonical F1
-- contract instances (canon-release schema) stored verbatim as JSONB with
-- their canonical-form content hash; the application layer validates
-- against the contract schema and computes the hash via
-- @storyworld/domain canonicalJson (byte-compatible with the contract
-- validator). ADR-0009: releases are append-only and explicitly superseded.

CREATE TABLE storyworld.properties (
  property_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  workspace_id uuid NOT NULL REFERENCES storyworld.workspaces,
  name text NOT NULL,
  property_type text NOT NULL CHECK (property_type IN
    ('fictional','editorial','brand','interactive','hybrid')),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY property_tenant_isolation ON storyworld.properties
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);

CREATE TABLE storyworld.canon_branches (
  branch_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  property_id uuid NOT NULL REFERENCES storyworld.properties,
  branch_name text NOT NULL,
  branch_type text NOT NULL CHECK (branch_type IN
    ('official','alternate','experimental','adaptation')),
  parent_branch_id uuid REFERENCES storyworld.canon_branches,
  pinned_source_release_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (property_id, branch_name),
  CHECK (branch_type <> 'adaptation' OR parent_branch_id IS NOT NULL)
);
ALTER TABLE storyworld.canon_branches ENABLE ROW LEVEL SECURITY;
CREATE POLICY branch_tenant_isolation ON storyworld.canon_branches
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);

CREATE TABLE storyworld.canon_releases (
  canon_release_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  property_id uuid NOT NULL REFERENCES storyworld.properties,
  branch_id uuid NOT NULL REFERENCES storyworld.canon_branches,
  release_name text NOT NULL,
  release_version text NOT NULL,
  document jsonb NOT NULL,
  content_sha256 text NOT NULL CHECK (content_sha256 ~ '^[a-f0-9]{64}$'),
  accepted_receipt_id uuid NOT NULL,
  supersedes_release_id uuid REFERENCES storyworld.canon_releases,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (branch_id, release_version)
);
ALTER TABLE storyworld.canon_releases ENABLE ROW LEVEL SECURITY;
CREATE POLICY release_tenant_isolation ON storyworld.canon_releases
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER canon_releases_append_only
  BEFORE UPDATE OR DELETE ON storyworld.canon_releases
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.canon_releases FROM storyworld_app;

-- Adaptation branches must pin their source release once one exists; the
-- application enforces pinning at branch use, the schema records it.
