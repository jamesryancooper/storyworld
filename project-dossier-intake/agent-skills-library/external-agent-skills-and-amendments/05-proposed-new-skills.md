# Proposed New Storyworld Skills

Only three new top-level skills are justified. Every other recommended external contribution fits beneath an existing Storyworld skill as a reference, profile, checklist, or pilot.

## `storyworld-skill-authoring-and-evaluation`

**Description:** Create, adapt, evaluate, version, and retire Storyworld agent skills and workflows using pinned sources, trigger tests, context budgets, security review, provenance, and evidence-backed adoption proposals.

**External source records:** EXT-036, EXT-037, EXT-041, EXT-042, EXT-047, EXT-049, EXT-053

**Purpose:** Provide one governed lifecycle for Storyworld capabilities instead of ad hoc skill creation or bulk imports.

### Trigger conditions

- Create or materially revise a Storyworld skill, workflow, router, reference, or capability provenance record.
- Evaluate trigger precision, context cost, output quality, security, portability, or upstream upgrade impact.
- Deprecate, supersede, remove, or replace a capability.

### Required inputs

- active task and applicable instructions
- target capability or capability gap
- pinned source revisions and licenses
- existing Storyworld skill registry and routing graph
- working and holdout fixtures
- security and validation constraints

### Authoritative sources

- current task and applicable Storyworld instructions
- .agent governance/state and accepted decisions
- current repository and skill registry
- pinned external sources as nonauthoritative evidence

### Preconditions

- No source is imported until its exact revision and license are recorded.
- Executable files, hooks, and installers remain disabled until separate security review.
- A new skill is justified only when profiles or references cannot cover the capability.

### Workflow

1. Classify create, adapt, merge, evaluate, upgrade, deprecate, or retire.
2. Inspect existing skills and eliminate duplication.
3. Build a source and license ledger.
4. Choose the smallest execution shape and context budget.
5. Author or amend with minimal frontmatter and routed references.
6. Create should-trigger, should-not-trigger, working, holdout, and adversarial fixtures.
7. Run structural, security, routing, portability, and output-quality evaluations.
8. Produce an adoption or rejection proposal with replacement and rollback strategy.

### Outputs

- skill package or amendment overlay
- source/license/provenance record
- trigger and holdout evaluation report
- security review result
- context-size and dependency report
- adoption/deprecation proposal

### Prohibited actions

- bulk installing external skill repositories
- granting permission or adopting its own output
- copying unclear or incompatible licensed content
- executing unreviewed scripts or hooks
- writing global agent configuration
- creating duplicate skills when a reference/profile suffices
- removing authority or evidence rules merely to reduce tokens

### Validation

- Storyworld capability schema validation
- registry and dependency graph checks
- trigger precision and holdout tests
- manual skill-supply-chain review
- cross-client dry run where claimed
- manifest/checksum verification

### Evidence receipt

- exact source revisions
- license disposition
- files read and files produced
- tests and results
- context-size change
- known gaps
- adoption owner

### Failure and escalation

Stop and mark blocked when license, source, authority, trigger precision, or executable safety is unresolved. Preserve the prior capability unchanged.

### Relationship to existing skills

Owns the lifecycle of Storyworld capability packages; invokes security-review, fixture-authoring, decision-impact-analysis, and conformance-and-release as needed.

## `storyworld-systematic-debugging`

**Description:** Diagnose Storyworld bugs, failed checks, unknown outcomes, provider errors, workflow failures, and cross-component regressions through reproducible root-cause investigation before implementing a bounded fix.

**External source records:** EXT-014, EXT-026, EXT-027

**Purpose:** Prevent guess-and-patch debugging across Storyworld’s authority, workflow, provider, media, and storage boundaries.

### Trigger conditions

- A bug, failed check, performance regression, unknown outcome, provider callback inconsistency, data leak, or unexpected state is reported.
- Two attempted fixes have not resolved the same symptom.

### Required inputs

- exact symptom and expected behavior
- current revision and environment
- reproduction steps or evidence gap
- recent changes
- affected component boundaries
- applicable security and privacy constraints

### Authoritative sources

- current implementation and runtime evidence
- accepted contracts and lifecycle decisions
- task-scoped logs/traces that satisfy redaction policy

### Preconditions

- No fix is proposed before reproduction or a documented evidence-collection plan.
- Diagnostics must not expose credentials, restricted payloads, or unrelated tenants.
- Unknown outcomes remain unknown until reconciled.

### Workflow

1. Read the complete error and reproduce consistently.
2. Map the data, authority, and workflow boundaries crossed.
3. Compare with the nearest working path.
4. Trace the first divergence and state one falsifiable root-cause hypothesis.
5. Test one variable with the smallest safe experiment.
6. Create a failing regression fixture.
7. Implement one bounded root-cause fix.
8. Run fresh scoped and regression verification.
9. After repeated failed hypotheses, stop and request architectural review rather than stacking fixes.

### Outputs

- root-cause statement with evidence
- boundary trace
- tested hypotheses
- regression fixture
- bounded fix or blocked finding
- verification receipt
- residual risks

### Prohibited actions

- guessing a fix without evidence
- logging secrets or private payloads
- making multiple unrelated changes in one hypothesis test
- changing accepted architecture to make a test pass
- claiming a provider job failed or succeeded without reconciliation
- using production data without authorization

### Validation

- original symptom reproduced or evidence limitation recorded
- regression fixture fails before and passes after
- full relevant validators pass
- no new cross-tenant or authority regression
- diagnostic instrumentation removed or governed

### Evidence receipt

- symptom
- revision
- reproduction
- hypothesis
- test result
- fix diff
- validation commands
- unknowns

### Failure and escalation

Return blocked with the missing evidence and safest next diagnostic action. Escalate for architectural review after repeated nonconfirming hypotheses or evidence of systemic coupling.

### Relationship to existing skills

Runs under governed-change; uses fixture-authoring and conformance-and-release; does not replace security-review for security incidents.

## `storyworld-postgres-and-storage-engineering`

**Description:** Design, implement, review, and migrate Storyworld PostgreSQL and object-storage behavior with tenant isolation, RLS, transactions, exact versions, query evidence, backup and restore, reconciliation, and portable replacement boundaries.

**External source records:** EXT-023, EXT-029

**Purpose:** Provide a dedicated database/storage discipline for Storyworld’s modular monolith and content-addressed custody model.

### Trigger conditions

- Change tables, columns, indexes, migrations, RLS, transactions, SQL, search, database functions, storage records, blob reconciliation, backup, restore, or query performance.
- Investigate cross-tenant visibility, locks, bloat, connection exhaustion, or slow queries.

### Required inputs

- governing domain/module and contract
- current migrations and schema
- RLS and tenant model
- query plan or performance symptom
- storage and lineage invariants
- backup/restore and replacement constraints

### Authoritative sources

- accepted Storyworld contracts and module ownership
- current migrations and database code
- current PostgreSQL official documentation
- Storyworld storage and custody decisions

### Preconditions

- Every change names the owning module and invariant.
- Production DDL or data access requires explicit task authority.
- RLS is never disabled to simplify tests.
- Blob identity and semantic asset authority remain separate.

### Workflow

1. Map domain ownership, tenant scope, and transaction boundary.
2. Design additive migration and rollback/recovery path.
3. Define RLS and cross-tenant negative cases.
4. Inspect query plans and indexes with representative data.
5. Implement through repository migration conventions.
6. Test transactions, conflicts, retries, and idempotency.
7. Verify backup, restore, or reconciliation when custody is affected.
8. Record operational and replacement implications.

### Outputs

- migration or query plan
- RLS and tenant test matrix
- EXPLAIN evidence where relevant
- transaction and locking analysis
- storage reconciliation plan
- backup/restore evidence
- rollback and compatibility result

### Prohibited actions

- disabling RLS or tenant filters
- arbitrary cross-module table access
- destructive production changes without authorization
- making Supabase-specific services canonical
- treating object-store paths as semantic identity
- claiming performance improvement without representative measurement

### Validation

- migration up/down or recovery test as applicable
- cross-tenant and permission-denial tests
- query-plan comparison
- transaction/locking tests
- content-hash and semantic-record reconciliation
- backup/restore smoke test when affected

### Evidence receipt

- schema revision
- migration IDs
- queries/plans
- RLS results
- storage hashes
- rollback/recovery result
- remaining operational risk

### Failure and escalation

Fail closed on uncertain tenant isolation, migration reversibility, data-loss risk, or custody reconciliation. Require owner/DB review before proceeding.

### Relationship to existing skills

Composes with contract-authoring, schema-evolution, asset-custody-and-lineage, security-review, and conformance-and-release.
