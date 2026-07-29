# CF connector conformance suite (exportable)

Runs the same assertions CI runs against the bundled simulator, but against
any base URL — hand this directory to the Commerce Foundry team and point
it at a real endpoint when CF is ready (DEC-0012 deferral).

```sh
CF_BASE_URL=https://cf.example.com node conformance.mjs
```

Exit code 0 = conformant. Cases:

1. A well-formed signed bundle (fixture `commerce-bundle-v1`) is accepted
   201 with a receipt, imported as **unapproved**, commercial review
   pending — Storyworld creative approval is evidence, not authorization.
2. Resubmitting the identical bundle (same idempotency key) replays the
   original receipt — no duplicate import.
3. An unsigned bundle is refused 422 with a typed `unsigned` finding.
4. A bundle without creative-approval evidence is refused 422 with
   `no-creative-approval`.
