# PROBE-BRANCHING — branching

Source: owner pattern program, section A (Branching and reconvergent narrative).

Generic capability tested: branch-local state, mutually exclusive facts, choice prerequisites/effects, reconvergence without flattening branch history, branch-gated outcomes.

Belongs in the reusable domain model: choices with typed options, prerequisites, and effects; branch labels with declared mutual exclusion and reconvergence points; threads gated on branch-local units. Authored choice structure is canonical; an individual player's selection is runtime state (ADR-0012).

Template/policy/adapter-specific: branch presentation (chapter select, dialogue wheel), option copy, and per-channel branch rendering.

Must-tests carried by this probe: branch-local state; mutually exclusive facts; choice prerequisites and effects; reconvergence; branch-gated ending.
Deferred to F3 kernel (semantic, beyond schema power): unreachable-node detection, circular-dependency detection across choices, branch-conditional dialogue lines, and the runtime both-states contradiction (the packet's literal planned rejection).
