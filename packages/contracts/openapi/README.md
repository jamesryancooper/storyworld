# Public Application API Contract

`storyworld.openapi.yaml` (OpenAPI 3.1, per proposed DEC-0005). Contract-first:
endpoint families per canonical part 04 §14.2; 202+operation-id for
long-running work; idempotency keys on externally initiated mutations;
Problem Details errors; cursor pagination. Generated clients live in ../sdk.
