# Research Method and Quality Standard

## Scope

The assessment began from the Storyworld repository and proposed skill library, not from public popularity lists. Every external candidate had to map to an existing Storyworld capability, identified gap, POC, or maintenance need.

## Storyworld baseline

- Repository: `jamesryancooper/storyworld`
- Commit: `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565`
- Authority model: `.agent/` is live governance and state; `.agents/` contains optional capabilities that cannot expand task authority.
- Existing proposed library: 33 skills, 41 specialist profiles, 5 workflows, and one router.
- Product direction: intent-driven creative production with Engine-owned authority, human exact-version decisions, provider neutrality, custody, rights, accessibility, portability, and small-team deployment.

## Candidate evaluation sequence

For each serious candidate the research:

1. Identified the original repository and exact file path.
2. Pinned the assessed commit.
3. Read the operative skill or instruction file and relevant supporting material.
4. Checked repository/license posture and obvious executable surfaces.
5. Compared the content with the current Storyworld skill library.
6. Classified overlap, portability, customization effort, security risk, and maintenance risk.
7. Assigned exactly one primary disposition.
8. Defined a Storyworld boundary, next action, and decision requirement.

No installer, package, hook, scanner, provider, browser profile, deployment, or live credential was executed during research.

## Evidence labels used

- **Repository fact:** directly observed in Storyworld or an external source at the pinned revision.
- **External research finding:** a source’s documented method, rule, or architecture.
- **Storyworld inference:** a reasoned consequence of applying the source to Storyworld.
- **Recommendation:** the proposed disposition or amendment.
- **Open decision:** owner or governance action still required.
- **Rejected alternative:** considered and excluded with a reason.

## Disposition discipline

Each candidate receives one primary disposition from A–G. Secondary value may be noted, but the primary result cannot be ambiguous.

Notably, this assessment assigns no wholesale “adopt as written” recommendation. Even the strongest sources need Storyworld authority, provenance, validation, trigger, licensing, and security adaptation.

## Limitations

- Public repository activity, issues, PRs, and release metadata can change after the assessment date.
- File-level licenses, examples, assets, fonts, datasets, and generated material may differ from repository-level licenses.
- A clean static review does not prove that an executable skill is safe.
- The report does not test every candidate in every agent environment; portability claims are conservative and pilots are required where behavior matters.
- No external skill can supply Storyworld-specific canon, rights, provider-egress, asset-lifecycle, or human-authority semantics.
