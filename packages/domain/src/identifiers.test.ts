import { describe, expect, it } from "vitest";
import {
  canonicalJson,
  contentSha256,
  isContentSha256,
  isSemver,
  isUuidV7,
  uuidv7,
  uuidV7TimestampMs,
} from "./identifiers.js";

describe("uuidv7", () => {
  it("produces RFC-shaped v7 identifiers with recoverable timestamps", () => {
    const before = Date.now();
    const id = uuidv7();
    const after = Date.now();
    expect(isUuidV7(id)).toBe(true);
    const ts = uuidV7TimestampMs(id);
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after);
  });
  it("is injectable for deterministic tests", () => {
    const id = uuidv7(() => 0);
    expect(uuidV7TimestampMs(id)).toBe(0);
  });
  it("rejects non-v7 values", () => {
    expect(isUuidV7("00000000-0000-4000-8000-000000000000")).toBe(false);
    expect(() => uuidV7TimestampMs("nope")).toThrow(RangeError);
  });
});

describe("contentSha256", () => {
  it("matches the known empty-string vector", () => {
    expect(contentSha256("")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
    expect(isContentSha256(contentSha256("storyworld"))).toBe(true);
  });
});

describe("canonicalJson", () => {
  it("sorts keys recursively and uses compact separators (contract-validator parity)", () => {
    expect(canonicalJson({ b: 1, a: { d: [2, { z: 0, y: 1 }], c: "x" } })).toBe(
      '{"a":{"c":"x","d":[2,{"y":1,"z":0}]},"b":1}',
    );
  });
  it("hash of canonical form is stable regardless of key order", () => {
    const one = contentSha256(canonicalJson({ a: 1, b: 2 }));
    const two = contentSha256(canonicalJson({ b: 2, a: 1 }));
    expect(one).toBe(two);
  });
});

describe("isSemver", () => {
  it("accepts plain semver and rejects prefixes/suffixes", () => {
    expect(isSemver("1.0.1")).toBe(true);
    expect(isSemver("v1.0.1")).toBe(false);
    expect(isSemver("1.0")).toBe(false);
  });
});
