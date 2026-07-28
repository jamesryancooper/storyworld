# Smoke Fixture (synthetic)

Deliberately synthetic, non-creative instances that keep the contract
validator exercising schema conformance, cross-schema references, and
deterministic round-trips before the four real golden fixtures exist
(owner-supplied source content, PLAN-0007). Nothing here represents real
canon, people, products, or decisions.

Mechanism: each `*.instance.json` names its schema in `$comment_schema`;
the remaining document is the instance.
