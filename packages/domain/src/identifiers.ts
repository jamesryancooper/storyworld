import { createHash, randomBytes } from "node:crypto";

/**
 * Identity and integrity primitives (ADR-0009: immutable versions,
 * UUIDv7/ULID identifiers, content hashes).
 */

const UUID_V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const SHA256_HEX = /^[a-f0-9]{64}$/;
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export function uuidv7(now: () => number = Date.now): string {
  const ts = BigInt(now());
  const bytes = randomBytes(16);
  bytes[0] = Number((ts >> 40n) & 0xffn);
  bytes[1] = Number((ts >> 32n) & 0xffn);
  bytes[2] = Number((ts >> 24n) & 0xffn);
  bytes[3] = Number((ts >> 16n) & 0xffn);
  bytes[4] = Number((ts >> 8n) & 0xffn);
  bytes[5] = Number(ts & 0xffn);
  bytes[6] = (bytes[6]! & 0x0f) | 0x70;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function isUuidV7(value: string): boolean {
  return UUID_V7.test(value);
}

export function uuidV7TimestampMs(value: string): number {
  if (!isUuidV7(value)) throw new RangeError("not a UUIDv7");
  return Number(BigInt(`0x${value.slice(0, 8)}${value.slice(9, 13)}`));
}

export function contentSha256(bytes: Uint8Array | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function isContentSha256(value: string): boolean {
  return SHA256_HEX.test(value);
}

export function isSemver(value: string): boolean {
  return SEMVER.test(value);
}

/** Canonical JSON serialization matching the contract validator (sorted keys, compact separators). */
export function canonicalJson(value: unknown): string {
  return stringifySorted(value);
}

function stringifySorted(value: unknown): string {
  if (value === null || typeof value === "number" || typeof value === "boolean") {
    return JSON.stringify(value);
  }
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stringifySorted).join(",")}]`;
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([k, v]) => `${JSON.stringify(k)}:${stringifySorted(v)}`);
    return `{${entries.join(",")}}`;
  }
  throw new TypeError(`cannot canonicalize ${typeof value}`);
}
