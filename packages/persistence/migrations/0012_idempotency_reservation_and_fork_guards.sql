-- 0012: close the audit-found duplicate-mutation and lost-work forks
-- (REV-0002; TASK-0016).

-- (a) Idempotency becomes a two-phase reservation: a row is claimed with a
-- null status (pending) before the effect runs and finalized after, so the
-- primary key is the mutex that prevents concurrent or crash-window double
-- execution. The app must therefore be able to finalize (UPDATE) and
-- release-on-error (DELETE) these operational rows, and record the claiming
-- actor for replay scoping. Completed rows are never deleted by the app, so
-- durable replay is preserved.
ALTER TABLE storyworld.idempotency_keys ALTER COLUMN status DROP NOT NULL;
ALTER TABLE storyworld.idempotency_keys ALTER COLUMN body DROP NOT NULL;
ALTER TABLE storyworld.idempotency_keys ADD COLUMN actor text;
GRANT UPDATE, DELETE ON storyworld.idempotency_keys TO storyworld_app;

-- (b) Concurrent *initial* writes with distinct keys would each see no head
-- and insert a NULL-supersedes root; Postgres treats NULLs as distinct, so
-- the 0010 index (supersedes IS NOT NULL) does not catch them. These partial
-- indexes make "exactly one current root" enforceable at the database for
-- every append-only supersession chain, so a fork fails closed (23505 -> 409)
-- instead of silently shadowing accepted work.
CREATE UNIQUE INDEX narrative_structures_one_root_per_production
  ON storyworld.narrative_structures (production_id)
  WHERE supersedes_revision_id IS NULL;
CREATE UNIQUE INDEX canon_revisions_one_root_per_stable_id
  ON storyworld.canon_revisions (branch_id, concern, stable_id)
  WHERE supersedes_revision_id IS NULL;
CREATE UNIQUE INDEX canon_revisions_supersedes_unique
  ON storyworld.canon_revisions (supersedes_revision_id)
  WHERE supersedes_revision_id IS NOT NULL;
CREATE UNIQUE INDEX continuity_findings_supersedes_unique
  ON storyworld.continuity_findings (supersedes_revision_id)
  WHERE supersedes_revision_id IS NOT NULL;

-- (c) Asset acceptance had no domain-level idempotency: a double acceptance
-- of one candidate produced two divergent accepted masters. At most one
-- acceptance derivation may originate from a given candidate version.
CREATE UNIQUE INDEX derivations_one_acceptance_per_source
  ON storyworld.derivations (from_asset_version_id)
  WHERE transformation = 'acceptance';
