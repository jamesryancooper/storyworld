-- 0013: queued Arc authoring mode and structure proposals (DEC-0020;
-- TASK-0017). Additive to Phase 1 direct authoring, which stays the default.

-- Per-property authoring mode. A property is 'direct' unless a
-- property_owner sets it to 'queued'; the change is receipted separately
-- (structure.authoring_mode.changed), so this row is the current value and
-- the receipt is the durable audit. The app upserts it, hence UPDATE.
CREATE TABLE storyworld.property_authoring_modes (
  property_id uuid PRIMARY KEY REFERENCES storyworld.properties,
  organization_id uuid NOT NULL,
  mode text NOT NULL DEFAULT 'direct' CHECK (mode IN ('direct','queued')),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.property_authoring_modes ENABLE ROW LEVEL SECURITY;
CREATE POLICY authoring_mode_tenant_isolation ON storyworld.property_authoring_modes
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
GRANT UPDATE ON storyworld.property_authoring_modes TO storyworld_app;

-- A queued structure edit is stored as a pending proposal: the complete,
-- already-validated document plus the base revision it was built to
-- supersede. Acceptance revalidates the base and applies it as a
-- structure.accepted revision; a moved base fails closed and preserves this
-- row. Mirrors canon_proposals.
CREATE TABLE storyworld.structure_proposals (
  proposal_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  production_id uuid NOT NULL REFERENCES storyworld.productions,
  proposed_document jsonb NOT NULL,
  base_revision_id uuid,
  content_sha256 text NOT NULL CHECK (content_sha256 ~ '^[a-f0-9]{64}$'),
  submitted_by text NOT NULL,
  submitter_kind text NOT NULL CHECK (submitter_kind IN ('human','model','import')),
  summary text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.structure_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY structure_proposal_tenant_isolation ON storyworld.structure_proposals
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);

-- One decision per structure proposal (append-only), mirroring
-- proposal_decisions. applied_revision_id names the accepted revision an
-- acceptance created.
CREATE TABLE storyworld.structure_proposal_decisions (
  decision_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  proposal_id uuid NOT NULL REFERENCES storyworld.structure_proposals,
  decision text NOT NULL CHECK (decision IN ('accepted','rejected')),
  applied_revision_id uuid,
  decided_by text NOT NULL,
  receipt_id uuid NOT NULL,
  decided_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (proposal_id)
);
ALTER TABLE storyworld.structure_proposal_decisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY structure_decision_tenant_isolation ON storyworld.structure_proposal_decisions
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER structure_proposal_decisions_append_only
  BEFORE UPDATE OR DELETE ON storyworld.structure_proposal_decisions
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.structure_proposal_decisions FROM storyworld_app;
