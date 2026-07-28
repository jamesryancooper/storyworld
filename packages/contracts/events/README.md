# Event Catalog

`storyworld-events.asyncapi.yaml` plus CloudEvents-compatible envelope
definitions, per canonical part 04 §14.3 (event list) and §14.4 (envelope).
At-least-once delivery semantics; consumers idempotent; envelopes carry
correlation/causation IDs and are signed when crossing product boundaries.
