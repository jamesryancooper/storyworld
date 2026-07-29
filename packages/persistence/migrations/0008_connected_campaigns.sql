-- 0008_connected_campaigns: Commerce-Foundry-connected campaign lifecycle
-- (B3; interface commerce-foundry-connector.v1; ADR-0010/0011). Append-only
-- revisions of a stable campaign_id; lifecycle changes and drift marks are
-- new revisions, never edits. No shared business tables with CF — briefs
-- and receipts arrive as signed immutable documents.

CREATE TABLE storyworld.connected_campaigns (
  campaign_revision_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  campaign_id uuid NOT NULL,
  lifecycle text NOT NULL CHECK (lifecycle IN (
    'brief_received','in_production','submitted_to_cf',
    'commercial_revision_requested','commercially_approved','published','withdrawn')),
  source_drift_stale boolean NOT NULL DEFAULT false,
  brief_sha256 text NOT NULL,
  document jsonb NOT NULL,
  supersedes_revision_id uuid REFERENCES storyworld.connected_campaigns,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.connected_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY connected_campaign_tenant_isolation ON storyworld.connected_campaigns
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER connected_campaigns_append_only
  BEFORE UPDATE OR DELETE ON storyworld.connected_campaigns
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.connected_campaigns FROM storyworld_app;
