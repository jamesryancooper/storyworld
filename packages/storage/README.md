# @storyworld/storage

Content-addressed immutable blob store (ADR-0005): filesystem adapter for
the local/portable profile and an S3-compatible adapter (MinIO locally).
Keys derive from content hashes; existing content is never overwritten;
`verify()` re-hashes stored bytes against their address. Semantic custody
(ownership, lifecycle, rights) lives in @storyworld/persistence
`content_blobs` — this package owns bytes only.
