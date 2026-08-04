# Adoption and Installation Guide

## 1. Review before installation

The library is intentionally generated as **unadopted**. Review:

1. skill scope and trigger wording;
2. authority and prohibited actions;
3. side-effect classification;
4. required inputs and outputs;
5. dependency chains;
6. repository paths and validation commands;
7. provenance and source basis;
8. license/security review status;
9. overlap with existing `storyworld-ux`, `change-review`, `storyworld-steward`, and `safe-change`;
10. owner and maintainer assignments.

## 2. Decide the adoption unit

Adopt skills individually or in coherent waves. Do not adopt all skills merely because they validate structurally.

A useful first decision can approve the governance foundation while leaving product/integration skills unadopted.

## 3. Create an accepted decision

The adoption decision should state:

- exact skill IDs and versions;
- files reviewed;
- maintainer/owner;
- trust and security review basis;
- permitted side-effect class;
- relationship to existing capabilities;
- required validation;
- deprecation/update process;
- explicit statement that `permission_grant` remains `false`.

Update each adopted `references/provenance.json` with:

- `adoption_status: "adopted"`;
- `adoption_decision_ref`;
- assigned `owner`;
- reviewed license/security state;
- `provenance.trust_class: "project_local_reviewed_capability"`;
- limitations that remain.

Adoption still does not grant authority beyond the active task.

## 4. Dry-run installation

```bash
python scripts/install_into_storyworld.py /path/to/storyworld
```

The installer checks for:

- a Storyworld root `AGENTS.md`;
- `.agent/` and `.agents/`;
- path collisions;
- existing capability IDs;
- exact files that would be copied.

It does not write without `--apply`.

## 5. Apply under an authorized task

```bash
python scripts/install_into_storyworld.py /path/to/storyworld --apply
```

By default the installer refuses to overwrite existing paths. Review collisions manually rather than using a blanket force operation.

## 6. Register and validate in Storyworld

After copying:

1. update any project-local registries required by the current harness;
2. create or update the adopting decision/evidence records;
3. run the Storyworld harness refresh/check;
4. run harness unit tests;
5. run project checks proportionate to the capability change;
6. inspect generated manifests rather than hand-editing them;
7. record actual validation results and limitations.

## 7. Suggested coexistence

- `storyworld-engineering` routes broad work.
- Existing `storyworld-ux` remains the specialist for user-facing Studio UX auditing/implementation guidance.
- Existing `change-review` remains a read-only patch-review mode until dispositioned.
- Existing `storyworld-steward` remains the adopted dossier/contract proposal mode.
- New skills narrow and specialize implementation procedure; they never replace `.agent/` governance.

## 8. Updating the library

When Storyworld architecture changes:

1. run repository orientation;
2. perform decision-impact analysis;
3. update affected skills and profiles;
4. bump semantic versions;
5. add migration notes;
6. rerun library and Storyworld validation;
7. require a new or amended adoption decision when scope, authority, prohibited actions, or side effects materially change.
