# @storyworld/domain

Domain primitives for the Storyworld Engine (F2+). First module:
identity/integrity primitives per ADR-0009 — UUIDv7 generation and
validation, content hashing, semver guards, and canonical JSON serialization
byte-compatible with the contract validator's canonical form (sorted keys,
compact separators) so TypeScript and the zero-dependency Python validator
agree on every hash.
