-- 0010: linear structure supersession (DEC-0020; TASK-0016). At most one
-- narrative-structure revision may supersede any given revision, so a stale
-- concurrent save fails at the database instead of silently forking the
-- accepted plan; clients reconcile against the new head and retry.
CREATE UNIQUE INDEX narrative_structures_supersedes_unique
  ON storyworld.narrative_structures (supersedes_revision_id)
  WHERE supersedes_revision_id IS NOT NULL;
