import { describe, expect, it } from "vitest";
import { issueToken, verifyToken } from "./mock-idp.js";

const SIGNING = "dev-only-signing-material";
const NOW = "2026-07-29T00:00:00Z";
const LATER = "2026-07-30T00:00:00Z";

describe("B3 mock IdP (SSO interface; real IdP is O1)", () => {
  it("round-trips an actor through a signed bearer token", () => {
    const token = issueToken({ id: "ryan-cooper", kind: "human", role: "property_owner" }, SIGNING, LATER);
    expect(verifyToken(token, SIGNING, NOW)).toEqual({
      id: "ryan-cooper", kind: "human", role: "property_owner",
    });
  });

  it("rejects tampered payloads, wrong keys, and expired tokens", () => {
    const token = issueToken({ id: "ryan-cooper", kind: "human", role: "property_owner" }, SIGNING, LATER);
    const [payload, mac] = token.split(".") as [string, string];
    const forgedPayload = Buffer.from(
      JSON.stringify({ id: "intruder", kind: "human", role: "property_owner", exp: LATER }), "utf8",
    ).toString("base64url");
    expect(verifyToken(`${forgedPayload}.${mac}`, SIGNING, NOW)).toBeNull();
    expect(verifyToken(token, "some-other-material", NOW)).toBeNull();
    const expired = issueToken({ id: "ryan-cooper", kind: "human", role: "property_owner" }, SIGNING, NOW);
    expect(verifyToken(expired, SIGNING, LATER)).toBeNull();
    expect(verifyToken("garbage", SIGNING, NOW)).toBeNull();
    expect(verifyToken(`${payload}`, SIGNING, NOW)).toBeNull();
  });
});
