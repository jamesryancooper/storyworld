# PROBE-DEEP-HIERARCHY — deep-hierarchy

Source: owner pattern program, section F (Deep long-form hierarchy).

Generic capability tested: arbitrary hierarchy depth (book/part/chapter/scene plus interlude), stable IDs independent of display numbering, threads spanning the hierarchy, object state across long spans.

Belongs in the reusable domain model: parent_unit_ref hierarchy with template-configurable unit_type labels; display_number as presentation-only; threads referencing unit IDs, never numbers.

Template/policy/adapter-specific: numbering styles (I/1/1.1), interlude conventions, per-format chapter presentation.

Must-tests carried: depth >= 4, stable identity vs display numbering, promise across parts, three object state changes, POV interlude; insertion without renumbering is MET-F1 insert_unit against this file.
Deferred to F3 kernel: context summarization/scene-state compilation over deep trees; partial production approval; rolling continuity reports.
