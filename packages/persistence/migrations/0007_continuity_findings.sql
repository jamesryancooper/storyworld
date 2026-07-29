-- 0007_continuity_findings: evidence-backed continuity findings (B1;
-- contract continuity-finding.v1; ADR-0008 — a human decides dispositions).
-- Rows are append-only revisions of a stable finding_id; a disposition
-- change is a new revision superseding the prior one, never an edit.

CREATE TABLE storyworld.continuity_findings (
  finding_revision_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  finding_id uuid NOT NULL,
  production_id uuid NOT NULL REFERENCES storyworld.productions,
  check_layer text NOT NULL CHECK (check_layer IN (
    'structural','technical_media','temporal_state','narrative',
    'visual_continuity','commerce_fidelity','rights_safety')),
  severity text NOT NULL CHECK (severity IN ('blocker','major','minor','advisory')),
  disposition text NOT NULL CHECK (disposition IN (
    'open','resolved','waived','intentional_exception','canon_change_proposed')),
  document jsonb NOT NULL,
  content_sha256 text NOT NULL,
  supersedes_revision_id uuid REFERENCES storyworld.continuity_findings,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.continuity_findings ENABLE ROW LEVEL SECURITY;
CREATE POLICY continuity_finding_tenant_isolation ON storyworld.continuity_findings
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER continuity_findings_append_only
  BEFORE UPDATE OR DELETE ON storyworld.continuity_findings
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.continuity_findings FROM storyworld_app;
