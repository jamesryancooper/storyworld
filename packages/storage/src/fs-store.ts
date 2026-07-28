import { mkdir, readFile, writeFile, access, rename } from "node:fs/promises";
import { dirname, join } from "node:path";
import { addressOf, blobKey, type BlobStore, type StoredBlob } from "./store.js";

/** Filesystem adapter — the local/portable profile (canonical part 03 s9.4). */
export function createFsStore(root: string): BlobStore {
  const pathFor = (sha256: string): string => join(root, blobKey(sha256));
  return {
    async put(bytes, mediaType): Promise<StoredBlob> {
      const sha256 = addressOf(bytes);
      const path = pathFor(sha256);
      try {
        await access(path);
      } catch {
        await mkdir(dirname(path), { recursive: true });
        const temp = `${path}.tmp-${process.pid}-${Date.now()}`;
        await writeFile(temp, bytes, { flag: "wx" });
        await rename(temp, path);
      }
      return { sha256, sizeBytes: bytes.byteLength, mediaType, uri: `file://${path}` };
    },
    async get(sha256): Promise<Uint8Array> {
      return new Uint8Array(await readFile(pathFor(sha256)));
    },
    async has(sha256): Promise<boolean> {
      try {
        await access(pathFor(sha256));
        return true;
      } catch {
        return false;
      }
    },
    async verify(sha256): Promise<boolean> {
      try {
        return addressOf(new Uint8Array(await readFile(pathFor(sha256)))) === sha256;
      } catch {
        return false;
      }
    },
  };
}
