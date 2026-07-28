import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { addressOf, blobKey, type BlobStore, type StoredBlob } from "./store.js";

export interface S3StoreConfig {
  endpoint: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

/** S3-compatible adapter (MinIO locally, any S3-compatible service later). */
export function createS3Store(config: S3StoreConfig): BlobStore {
  const client = new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
  const bucket = config.bucket;
  return {
    async put(bytes, mediaType): Promise<StoredBlob> {
      const sha256 = addressOf(bytes);
      const key = blobKey(sha256);
      const exists = await head(client, bucket, key);
      if (!exists) {
        await client.send(
          new PutObjectCommand({ Bucket: bucket, Key: key, Body: bytes, ContentType: mediaType }),
        );
      }
      return { sha256, sizeBytes: bytes.byteLength, mediaType, uri: `s3://${bucket}/${key}` };
    },
    async get(sha256): Promise<Uint8Array> {
      const out = await client.send(new GetObjectCommand({ Bucket: bucket, Key: blobKey(sha256) }));
      const body = await out.Body?.transformToByteArray();
      if (!body) throw new Error(`blob ${sha256} unreadable`);
      return body;
    },
    async has(sha256): Promise<boolean> {
      return head(client, bucket, blobKey(sha256));
    },
    async verify(sha256): Promise<boolean> {
      try {
        return addressOf(await this.get(sha256)) === sha256;
      } catch {
        return false;
      }
    },
  };
}

async function head(client: S3Client, bucket: string, key: string): Promise<boolean> {
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch {
    return false;
  }
}
