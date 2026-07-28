# Storyworld Fixture Coverage Matrix

## Portfolio decision

The four repository-named F1 fixtures should remain the minimum exit set. The five extended fixtures should be added to the golden corpus after the F1 records can round-trip, because they expose distinct schema and policy failures that the four minimum fixtures do not fully cover.

## Fixture inventory

| Fixture ID | Property / sample | Phase | Primary proof |
|---|---|---|---|
| FIX-STILLHOUSE | The Stillhouse Archive mini-season | F1 | Reveal graph, symbols, chronology, creator truth versus audience knowledge |
| FIX-EDITORIAL | Hingeweather Notes editorial carousel | F1 | Voice, metaphor, restricted source separation, dignity, prohibited identifiers |
| FIX-BKR | BeKindRewind / Rewind Plaza slice | F1 | Spatial graph, era rules, NPC constraints, missions, triggers, item state, runtime export |
| FIX-COMMERCE | Vellumvale FF-17 campaign | F1 | Product/claim snapshots, depiction rules, disclosure, rejection and focused revision |
| FIX-DFF-CARDS | Dumpster Fire Friends cards 007–008 | Extended | Stable character schema, stats, numbered layouts, collection reuse, recovery arc |
| FIX-NOTES-DAUGHTER | The Porch Light Is Still On | Extended | High-sensitivity dignity controls, likeness prohibition, indirect-identification prevention |
| FIX-LIVING-INHERITANCE | Ordinary Days | Extended | Editorial taxonomy, photo rights, durable source separation, cross-format lineage |
| FIX-FIELD-MANUAL | Proper Manhood Field Note 001 | Extended | Lesson template, design tokens, numbering, cross-reference, derivative formats |
| FIX-LANTERNS | Kael Vire season-one slice | Extended | Hard world rules, character false belief, moral-choice reveal dependencies, safety policy |

## Capability coverage

Legend: `●` primary stressor; `○` meaningful secondary coverage; blank = not a central purpose.

| Capability | Stillhouse | Editorial | BKR | Commerce | DFF | Notes | Living | Proper | Lanterns |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Creator truth / audience knowledge | ● |  |  |  |  | ○ |  |  | ● |
| Character knowledge / false belief | ● |  | ○ |  | ○ | ○ |  |  | ● |
| Reveal dependency graph | ● |  | ○ |  |  | ○ |  |  | ● |
| Fictional chronology | ● |  | ○ |  |  |  | ○ |  | ● |
| Recurring symbols / motifs | ● | ● | ○ |  | ● | ● | ● | ● | ● |
| Narrator voice constraints | ○ | ● | ○ | ○ | ● | ● | ● | ● | ○ |
| Restricted/private source separation |  | ● |  |  |  | ● | ● |  |  |
| Dignity / prohibited identifiers |  | ● |  |  | ○ | ● | ● | ○ |  |
| Likeness prohibition / consent |  | ○ |  |  | ○ | ● | ○ | ○ |  |
| Spatial relationship graph | ○ |  | ● |  |  |  |  |  | ○ |
| Era rules | ● |  | ● |  |  |  |  |  | ○ |
| Mission prerequisites / effects |  |  | ● |  |  |  |  |  |  |
| Trigger definitions |  |  | ● |  |  |  |  |  | ○ |
| Object ownership / movement / condition | ○ | ○ | ● | ○ | ○ | ○ | ● | ○ | ○ |
| Product snapshot / exact claim |  |  |  | ● |  |  |  |  |  |
| Required / prohibited depiction | ○ | ○ | ○ | ● | ● | ● | ○ | ● | ● |
| Exact-version rejection and revision | ○ | ○ | ○ | ● | ○ | ○ | ○ | ○ | ○ |
| Stable recurring character identity | ○ |  | ● | ○ | ● | ● | ○ | ○ | ● |
| Reusable numbered template |  | ○ |  | ○ | ● | ○ | ○ | ● | ○ |
| Original-photo rights |  | ○ |  |  |  | ○ | ● |  |  |
| Cross-format derivation | ○ | ● | ○ | ● | ● | ● | ● | ● | ○ |
| Runtime export boundary |  |  | ● |  |  |  |  |  |  |
| Commercial authority boundary |  |  |  | ● |  |  |  |  |  |
| Hard world-rule validation | ○ |  | ● | ○ | ○ | ○ | ○ | ○ | ● |
| Policy that constrains generation without becoming canon | ○ | ● | ○ | ● | ● | ● | ● | ● | ● |

## Why Notes to My Daughter and Living Inheritance should be separate fixtures

They share an editorial-carousel template but stress different invariants:

- **Notes to My Daughter** tests dignity under emotionally charged family material, no use of real likeness, no indirect identification, no coercive reconciliation message, and no public exposure disguised as wisdom.
- **Living Inheritance** tests source-photo rights, ordinary-memory abstraction, long-lived editorial taxonomy, and one approved lesson becoming a carousel, Reel voiceover, and owned-media note without recovering private identifiers.

Combining them into a single record would hide those differences and make a passing test less meaningful.

## Why Dumpster Fire Friends needs at least two character sets

One card can prove a record shape. Two cards prove that the shape is genuinely reusable rather than secretly customized to one character. Cards 007 and 008 intentionally share semantic positions while differing in stats, motifs, copy density, behavior type, and recovery actions.

## Newly recovered fixture recommendation

**The Lanterns** is the only additional property recovered with enough distinctive prior canon to justify inclusion now. It should be an extended fixture, not an F1 blocker. It tests a combination otherwise missing from the corpus:

- persistent speculative world rules;
- creator truth versus a protagonist’s self-protective belief;
- dependencies around moral agency rather than only factual discovery;
- a ten-episode audience-belief arc;
- safety constraints that must shape output while remaining visibly separate from fictional canon.

## Suggested acceptance order

1. Convert the four F1 files into formal fixture records and confirm deterministic round-trip.
2. Add Proper Manhood and Dumpster Fire Friends, which already align with post-F1 fixture families named in the project dossier.
3. Add Notes to My Daughter and Living Inheritance as separate editorial-property regression fixtures.
4. Add The Lanterns after the core supports world-rule constraints and knowledge/belief/reveal graphs without genre-specific schema forks.

