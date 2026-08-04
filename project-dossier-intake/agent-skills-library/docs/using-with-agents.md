# Using the Library with Engineering Agents

## Start every significant task

1. Run `storyworld-repository-orientation`.
2. Route through `storyworld-engineering`.
3. Confirm the active task and accepted decisions.
4. Stop if a successor decision is required.
5. Use only the chosen specialist skill chain.
6. Close with `storyworld-conformance-and-release`.

## Prompt pattern

```text
Use $storyworld-engineering to route this task.
Repository: <path or URL>
Exact request: <request>
Expected side effects: <read-only or repository-local>
Known governing decisions: <refs>
Do not use credentials, live providers, publication, or deployment.
Produce the routing decision and then use only the selected specialist skills.
```

## Evidence discipline

Label claims as:

- observed repository fact;
- external research;
- owner direction;
- inference;
- recommendation;
- open decision;
- rejected alternative;
- deferred consideration.

Never collapse those categories.

## Runtime-agent boundary

These skills help build Storyworld. They are not the future creative agents that operate inside Storyworld. Runtime creative agents must use Storyworld contracts and capability leases and must not inherit repository write privileges.
