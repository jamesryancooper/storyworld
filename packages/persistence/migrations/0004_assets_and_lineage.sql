-- 0004_assets_and_lineage: immutable asset versions and the derivation
-- graph (F2 deliverables: immutable revisions, asset lineage, provenance;
-- ADR-0009). Rows are append-only; supersession is a new version, never an
-- edit.

CREATE TABLE storyworld.asset_versions (
  asset_version_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  asset_id uuid NOT NULL,
  version integer NOT NULL CHECK (version >= 1),
  content_sha256 text NOT NULL REFERENCES storyworld.content_blobs (sha256),
  state text NOT NULL CHECK (state IN (
    'source_imported','staging','candidate','under_review','accepted_master',
    'rendition','submitted','published','runtime_released','superseded',
    'withdrawn','archived')),
  accepted_receipt_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (asset_id, version)
);
ALTER TABLE storyworld.asset_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY asset_version_tenant_isolation ON storyworld.asset_versions
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER asset_versions_append_only
  BEFORE UPDATE OR DELETE ON storyworld.asset_versions
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.asset_versions FROM storyworld_app;

CREATE TABLE storyworld.derivations (
  derivation_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  from_asset_version_id uuid NOT NULL REFERENCES storyworld.asset_versions,
  to_asset_version_id uuid NOT NULL REFERENCES storyworld.asset_versions,
  transformation text NOT NULL,
  provider_provenance jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (from_asset_version_id <> to_asset_version_id)
);
ALTER TABLE storyworld.derivations ENABLE ROW LEVEL SECURITY;
CREATE POLICY derivation_tenant_isolation ON storyworld.derivations
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER derivations_append_only
  BEFORE UPDATE OR DELETE ON storyworld.derivations
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.derivations FROM storyworld_app;
