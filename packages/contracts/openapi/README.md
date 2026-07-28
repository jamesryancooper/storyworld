# Public Application API Contract

`storyworld.openapi.json` — OpenAPI 3.1, authored as strict JSON per
DEC-0005 (OpenAPI permits JSON natively; this keeps the zero-dependency
validator covering it; generate a YAML derivative only if external tooling
needs one). Conventions per canonical part 04 section 14.1; endpoint families
per section 14.2. Payload shapes referenced via `x-storyworld-contract-schema`
tag: URIs are owned by `../schemas/`.
