-- 0006_narrative_kernel (F3 tranche 2): sources, proposals/decisions,
-- working canon as append-only revisions, productions with canon pinning,
-- and narrative structures. Pure append-only discipline: a change is a new
-- revision row referencing its predecessor (supersedes_revision_id); the
-- current revision is the one no successor references. Decisions are
-- separate append-only rows so proposal records themselves never mutate.

CREATE TABLE storyworld.source_records (
  source_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  property_id uuid NOT NULL REFERENCES storyworld.properties,
  name text NOT NULL,
  content_sha256 text NOT NULL REFERENCES storyworld.content_blobs (sha256),
  sensitivity text NOT NULL DEFAULT 'restricted' CHECK (sensitivity IN
    ('public','internal','confidential','restricted','embargoed')),
  rights_note text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.source_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY source_tenant_isolation ON storyworld.source_records
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER source_records_append_only
  BEFORE UPDATE OR DELETE ON storyworld.source_records
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.source_records FROM storyworld_app;

CREATE TABLE storyworld.canon_proposals (
  proposal_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  property_id uuid NOT NULL REFERENCES storyworld.properties,
  branch_id uuid NOT NULL REFERENCES storyworld.canon_branches,
  proposal_type text NOT NULL CHECK (proposal_type IN
    ('entity','relationship','fact','timeline_event','retcon')),
  payload jsonb NOT NULL,
  source_ref uuid REFERENCES storyworld.source_records,
  proposed_by text NOT NULL,
  proposer_kind text NOT NULL CHECK (proposer_kind IN ('human','model','import')),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.canon_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY proposal_tenant_isolation ON storyworld.canon_proposals
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER canon_proposals_append_only
  BEFORE UPDATE OR DELETE ON storyworld.canon_proposals
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.canon_proposals FROM storyworld_app;

CREATE TABLE storyworld.proposal_decisions (
  decision_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  proposal_id uuid NOT NULL REFERENCES storyworld.canon_proposals,
  decision text NOT NULL CHECK (decision IN ('accepted','rejected','revision_requested')),
  decided_by text NOT NULL,
  receipt_id uuid NOT NULL,
  decided_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (proposal_id)
);
ALTER TABLE storyworld.proposal_decisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY decision_tenant_isolation ON storyworld.proposal_decisions
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER proposal_decisions_append_only
  BEFORE UPDATE OR DELETE ON storyworld.proposal_decisions
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.proposal_decisions FROM storyworld_app;

-- Working canon: one append-only revision stream per concern.
CREATE TABLE storyworld.canon_revisions (
  revision_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  property_id uuid NOT NULL REFERENCES storyworld.properties,
  branch_id uuid NOT NULL REFERENCES storyworld.canon_branches,
  concern text NOT NULL CHECK (concern IN
    ('entity','relationship','fact','timeline_event')),
  stable_id uuid NOT NULL,
  payload jsonb NOT NULL,
  visibility text NOT NULL CHECK (visibility IN
    ('public','spoiler','team_private','restricted')),
  supersedes_revision_id uuid REFERENCES storyworld.canon_revisions,
  accepted_receipt_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (supersedes_revision_id)
);
ALTER TABLE storyworld.canon_revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY revision_tenant_isolation ON storyworld.canon_revisions
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER canon_revisions_append_only
  BEFORE UPDATE OR DELETE ON storyworld.canon_revisions
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.canon_revisions FROM storyworld_app;
CREATE INDEX canon_revisions_stable ON storyworld.canon_revisions (branch_id, concern, stable_id);

CREATE TABLE storyworld.productions (
  production_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  property_id uuid NOT NULL REFERENCES storyworld.properties,
  pinned_canon_release_id uuid NOT NULL REFERENCES storyworld.canon_releases,
  name text NOT NULL,
  authority_host text NOT NULL CHECK (authority_host IN
    ('storyworld','commerce_foundry','bekindrewind_runtime')),
  brief jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE storyworld.productions ENABLE ROW LEVEL SECURITY;
CREATE POLICY production_tenant_isolation ON storyworld.productions
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);

CREATE TABLE storyworld.narrative_structures (
  structure_revision_id uuid PRIMARY KEY,
  organization_id uuid NOT NULL,
  production_id uuid NOT NULL REFERENCES storyworld.productions,
  document jsonb NOT NULL,
  content_sha256 text NOT NULL CHECK (content_sha256 ~ '^[a-f0-9]{64}$'),
  supersedes_revision_id uuid REFERENCES storyworld.narrative_structures,
  accepted_receipt_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (supersedes_revision_id)
);
ALTER TABLE storyworld.narrative_structures ENABLE ROW LEVEL SECURITY;
CREATE POLICY structure_tenant_isolation ON storyworld.narrative_structures
  USING (organization_id = current_setting('storyworld.tenant_id')::uuid);
CREATE TRIGGER narrative_structures_append_only
  BEFORE UPDATE OR DELETE ON storyworld.narrative_structures
  FOR EACH ROW EXECUTE FUNCTION storyworld.reject_mutation();
REVOKE UPDATE, DELETE ON storyworld.narrative_structures FROM storyworld_app;
