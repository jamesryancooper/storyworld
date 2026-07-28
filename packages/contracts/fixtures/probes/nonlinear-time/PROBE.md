# PROBE-NONLINEAR-TIME — nonlinear-time

Source: owner pattern program, section C (Nonlinear chronology).

Generic capability tested: four independent time coordinates — story time, presentation order, publication time, revision — with state bound to story time only.

Belongs in the reusable domain model: explicit story_time and presentation_order on every narrative unit; publication_time as release metadata; temporal markers (flashback, flash-forward, replay); scene state packets pinned to story-time coordinates.

Template/policy/adapter-specific: how out-of-order release is presented (recap cards, timeline UI), spoiler-window policies per channel.

Must-tests carried: story order A-D vs release order C-A-D-B; one event shown twice via replay_alternate_perspective; lamp state at scene C derived from story time.
Deferred to F3 kernel: automatic state recomputation by story time; spoiler calculations for out-of-order release; revision-after-approval impact (revision_of_ref exists; invalidation is a lifecycle/kernel behavior).
