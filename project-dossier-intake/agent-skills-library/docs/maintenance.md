# Library Maintenance

## Change classification

- **Patch:** wording, examples, checklists, or nonsemantic profile guidance.
- **Minor:** new skill/profile/workflow or compatible output-field addition.
- **Major:** changed authority, side effects, prohibited actions, routing semantics, adoption model, or incompatible package structure.

## Required maintenance flow

1. Orient to the current Storyworld revision.
2. Run decision-impact analysis for architectural changes.
3. Update skill content, provenance version, registries, routing, and traceability.
4. Rebuild file inventory, manifest, and checksums.
5. Run validator and unit tests.
6. Test dry-run installation against a clean Storyworld checkout.
7. Record source revision and limitations.
8. Require adoption-decision review for material scope changes.

## Deprecation

A deprecated skill remains discoverable until its declared removal version, names its successor, and documents migration. Removal must not break adopted agents/workflows without their own successor.

## Provider and external-tool profiles

Recheck before implementation:

- current official documentation;
- release and revision;
- license and redistribution;
- security policy/advisories;
- API or file-format compatibility;
- data retention and training;
- self-hosting or cloud assumptions;
- operational and accessibility posture.

Profile guidance is deliberately noncanonical and must not fossilize provider behavior into Storyworld contracts.
