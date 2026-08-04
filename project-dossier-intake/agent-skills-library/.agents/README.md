# Storyworld Capability Library

This plural `.agents/` tree contains proposed, discoverable agent skills and workflow records. It is designed to merge into Storyworld's existing `.agents/` tree.

The singular `.agent/` tree remains the live governance and state plane.

Every packaged capability:

- inherits the current task's authority;
- may narrow but never expand permission;
- has `permission_grant: false`;
- is `generated_unadopted_baseline`;
- cannot approve its own work;
- cannot turn a plan, dossier, skill, or validation result into permission;
- requires project review and an accepted decision before adoption.

`SKILL.md` discovery frontmatter contains only `name` and `description`. All version, adoption, trust, side-effect, provenance, and limitation data lives in `references/provenance.json`.
