# Task Checklist

## Before

- No fix is proposed before reproduction or a documented evidence-collection plan.
- Diagnostics must not expose credentials, restricted payloads, or unrelated tenants.
- Unknown outcomes remain unknown until reconciled.

## Execute

- Read the complete error and reproduce consistently.
- Map the data, authority, and workflow boundaries crossed.
- Compare with the nearest working path.
- Trace the first divergence and state one falsifiable root-cause hypothesis.
- Test one variable with the smallest safe experiment.
- Create a failing regression fixture.
- Implement one bounded root-cause fix.
- Run fresh scoped and regression verification.
- After repeated failed hypotheses, stop and request architectural review rather than stacking fixes.

## Close

- original symptom reproduced or evidence limitation recorded
- regression fixture fails before and passes after
- full relevant validators pass
- no new cross-tenant or authority regression
- diagnostic instrumentation removed or governed
- Record every skipped check and limitation.
- Do not adopt, approve, or expand authority.
