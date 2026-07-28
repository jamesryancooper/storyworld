# Event Catalog

`storyworld-events.asyncapi.json` — AsyncAPI 3 catalog of the 24 domain
events (canonical part 04 section 14.3), envelope-first: every message body
is the CloudEvents-compatible envelope defined by
`cloudevents-envelope.schema.json` (validated with the schema set). Strict
JSON per DEC-0005. Delivery: transactional outbox/inbox + signed webhooks,
at-least-once, idempotent consumers (ADR-0010).
