import { contentSha256, isContentSha256 } from "@storyworld/domain";

export interface StoredBlob {
  sha256: string;
  sizeBytes: number;
  mediaType: string;
  uri: string;
}

/**
 * Content-addressed immutable blob store (ADR-0005). Keys derive from the
 * content hash; existing content is never overwritten — a put of identical
 * bytes is a no-op, a hash collision with different bytes is an error.
 */
export interface BlobStore {
  put(bytes: Uint8Array, mediaType: string): Promise<StoredBlob>;
  get(sha256: string): Promise<Uint8Array>;
  has(sha256: string): Promise<boolean>;
  /** Verify stored bytes still match their address. */
  verify(sha256: string): Promise<boolean>;
}

export function blobKey(sha256: string): string {
  if (!isContentSha256(sha256)) throw new RangeError("invalid content hash");
  return `${sha256.slice(0, 2)}/${sha256.slice(2, 4)}/${sha256}`;
}

export function addressOf(bytes: Uint8Array): string {
  return contentSha256(bytes);
}
