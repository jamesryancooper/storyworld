# New Storyworld Skill Package Template

```text
.agents/skills/<skill-id>/
├── SKILL.md
├── agents/openai.yaml
└── references/
    ├── provenance.json
    ├── checklist.md
    ├── output-contract.md
    ├── failure-cases.md
    └── profiles/          # optional
```

## Frontmatter

`SKILL.md` frontmatter must contain only:

```yaml
---
name: <lowercase-dashed-id>
description: <clear trigger description>
---
```

## Required SKILL sections

- Purpose
- Use when / do not use
- Authoritative sources
- Inputs
- Preconditions
- Workflow
- Invariants
- Allowed side effects
- Prohibited actions
- Outputs
- Validation/evidence
- Failure/escalation
- Traceability
- Profiles
- Package references

## Provenance requirements

- `schema_version: harness.skill-provenance.v1`
- semantic version
- explicit unadopted/adopted status
- `permission_grant: false`
- authority inherits current task and may not expand
- side-effect class
- required/optional inputs
- evidence-backed output contract
- prohibited actions
- included files
- license/security review state
- trust class
- limitations
