import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, beforeAll } from "vitest";
import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import { addressOf, blobKey, createFsStore, createS3Store, type BlobStore } from "./index.js";

const bytes = new TextEncoder().encode("storyworld immutable blob");
const other = new TextEncoder().encode("different bytes");

function contract(name: string, make: () => Promise<BlobStore>, enabled: boolean): void {
  describe.skipIf(!enabled)(name, () => {
    let store: BlobStore;
    beforeAll(async () => {
      store = await make();
    });
    it("stores content-addressed, idempotently, and verifies", async () => {
      const put1 = await store.put(bytes, "text/plain");
      const put2 = await store.put(bytes, "text/plain");
      expect(put1.sha256).toBe(addressOf(bytes));
      expect(put2.sha256).toBe(put1.sha256);
      expect(await store.has(put1.sha256)).toBe(true);
      expect(new TextDecoder().decode(await store.get(put1.sha256))).toBe(
        "storyworld immutable blob",
      );
      expect(await store.verify(put1.sha256)).toBe(true);
    });
    it("different bytes get different addresses", async () => {
      const a = await store.put(bytes, "text/plain");
      const b = await store.put(other, "text/plain");
      expect(a.sha256).not.toBe(b.sha256);
    });
    it("rejects invalid addresses", async () => {
      expect(() => blobKey("nope")).toThrow(RangeError);
      expect(await store.has(addressOf(new TextEncoder().encode("missing")))).toBe(false);
    });
  });
}

contract("fs store", async () => createFsStore(await mkdtemp(join(tmpdir(), "sw-blobs-"))), true);

const s3Endpoint = process.env["S3_ENDPOINT"] ?? "http://localhost:9000";
const s3Enabled = process.env["S3_TESTS"] !== "off";
contract(
  "s3 store (minio)",
  async () => {
    const config = {
      endpoint: s3Endpoint,
      region: "us-east-1",
      bucket: "storyworld-test",
      accessKeyId: process.env["S3_ACCESS_KEY"] ?? "storyworld",
      secretAccessKey: process.env["S3_SECRET_KEY"] ?? "storyworld-dev-only",
    };
    const client = new S3Client({
      endpoint: config.endpoint,
      region: config.region,
      forcePathStyle: true,
      credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
    });
    try {
      await client.send(new CreateBucketCommand({ Bucket: config.bucket }));
    } catch {
      /* bucket exists */
    }
    return createS3Store(config);
  },
  s3Enabled,
);
