import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Mock identity provider (B3; DEC-0012 — real IdP federation is O1). Issues
 * HMAC-signed bearer tokens carrying the actor identity so the engine can
 * exercise a real token path end to end. The SSO interface (issue/verify)
 * is what a production IdP integration replaces; nothing else changes.
 */

export interface TokenActor {
  id: string;
  kind: "human" | "model" | "service";
  role: string;
}

function b64url(bytes: Buffer): string {
  return bytes.toString("base64url");
}

function hmac(payload: string, signingSecret: string): string {
  return b64url(createHmac("sha256", signingSecret).update(payload).digest());
}

export function issueToken(actor: TokenActor, signingSecret: string, expiresAtIso: string): string {
  const payload = b64url(Buffer.from(JSON.stringify({ ...actor, exp: expiresAtIso }), "utf8"));
  return `${payload}.${hmac(payload, signingSecret)}`;
}

export function verifyToken(token: string, signingSecret: string, nowIso: string): TokenActor | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  const expected = hmac(payload, signingSecret);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as TokenActor & { exp: string };
    if (claims.exp <= nowIso) return null;
    // Structurally validate claims (REV-0002 F7): a signed token with an
    // out-of-enum kind or empty id/role is rejected rather than trusted, so
    // the verified path enforces the same shape the dev-header path does.
    const kinds: readonly TokenActor["kind"][] = ["human", "model", "service"];
    if (typeof claims.id !== "string" || claims.id === "") return null;
    if (typeof claims.role !== "string" || claims.role === "") return null;
    if (!kinds.includes(claims.kind)) return null;
    return { id: claims.id, kind: claims.kind, role: claims.role };
  } catch {
    return null;
  }
}
