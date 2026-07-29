---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0016",
  "title": "B4 evaluation and regression harness: golden corpus, defect injection, recorded provider fixtures, rubrics, baseline",
  "task": "TASK-0010",
  "recorded_at": "2026-07-29",
  "authority_source": "external:operator-instruction-2026-07-28 (DEC-0012 B-run authorization)",
  "owner": "claude-agent (storyworld-steward working mode)",
  "scope": "B4 exit behaviors: corpus execution, defect catch-rate, provider replay, rubric definitions, recorded baseline",
  "method": "18 vitest assertions in @storyworld/regression: all four owner fixture families (stillhouse, editorial, bekindrewind, commerce) run clean through the real deterministic layers; 4-case defect-injection matrix across the 3 structured families (12 runs) with 100% catch by the owning layer at required severity; recorded fal queue transcript replayed through the real adapter twice with byte-identical staged content and zero live calls; recorded baseline (baselines/b4-baseline.json) asserted so corpus/matrix drift fails the suite. Rubrics R1-R5 defined with anchors, protocol, and V1 thresholds (docs/evaluation/rubrics.md). The corpus caught and fixed a real evaluation defect (entity_ref form normalization), demonstrating the harness works",
  "environment": "Local: macOS dev profile; CI: ubuntu-latest platform job",
  "subject_revision_or_fingerprint": "main at b00302a",
  "result": "pass",
  "fresh_until": "2026-10-29",
  "supersedes": null,
  "limitations": [
    "Model-assisted scoring remains mocked (DEC-0012); rubrics are definitions for human panels until keys arrive.",
    "Provider fixtures cover the fal queue happy path; refusal paths are covered in the providers suite."
  ]
}
---

## Baseline (recorded 2026-07-29)

golden families 4 / expected findings 0 / defect cases 4 / injected runs
12 / required catch rate 1.0 / provider replay deterministic.
