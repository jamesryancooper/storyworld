import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

/**
 * Envelope encryption for the at-rest provider-credential store (pattern
 * ported from Commerce Foundry foundry_credentials.crypto; primitives are
 * node:crypto AES-256-GCM instead of Fernet). Two layers:
 *
 * - each credential gets its own DEK; the value is encrypted under the DEK;
 * - the DEK is WRAPPED under the master KEK. Rotating the KEK re-wraps
 *   DEKs only; a future KMS/Vault-held KEK is a seam swap.
 *
 * The MASTER KEK never enters the database. Resolution order:
 * 1. STORYWORLD_SECRET_KEY (base64url, 32 bytes) — production/operator
 *    control, injected from real custody.
 * 2. STORYWORLD_SECRET_KEY_FILE — operator-named 0600 key file.
 * 3. Dev default: ~/.storyworld/kek.key, auto-created 0600. Unlike CF's
 *    in-repo local-data default, this path is OUTSIDE every working tree
 *    from birth, so repo walks/backups can never sweep it.
 *
 * No resolvable KEK => the store is DISABLED and everything fails closed.
 */

export class CredentialCryptoError extends Error {}

const VERSION = "v1";

export function generateKeyBytes(): Buffer {
  return randomBytes(32);
}

export function sealWithKey(keyBytes: Buffer, plaintext: string): string {
  if (keyBytes.length !== 32) throw new CredentialCryptoError("key must be 32 bytes");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", keyBytes, iv);
  const body = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [VERSION, iv.toString("base64url"), tag.toString("base64url"), body.toString("base64url")].join(".");
}

export function openWithKey(keyBytes: Buffer, sealed: string): string {
  const [version, iv, tag, body] = sealed.split(".");
  if (version !== VERSION || !iv || !tag || !body) {
    throw new CredentialCryptoError("stored ciphertext is not a v1 envelope token");
  }
  try {
    const decipher = createDecipheriv("aes-256-gcm", keyBytes, Buffer.from(iv, "base64url"));
    decipher.setAuthTag(Buffer.from(tag, "base64url"));
    return Buffer.concat([decipher.update(Buffer.from(body, "base64url")), decipher.final()]).toString("utf8");
  } catch {
    throw new CredentialCryptoError(
      "stored credential could not be decrypted (wrong master key or tampered ciphertext)",
    );
  }
}

export function wrapDek(kekBytes: Buffer, dekBytes: Buffer): string {
  return sealWithKey(kekBytes, dekBytes.toString("base64url"));
}

export function unwrapDek(kekBytes: Buffer, wrapped: string): Buffer {
  return Buffer.from(openWithKey(kekBytes, wrapped), "base64url");
}

export function defaultKekPath(): string {
  return process.env["STORYWORLD_SECRET_KEY_FILE"] ?? join(homedir(), ".storyworld", "kek.key");
}

function readValidKeyFile(path: string): Buffer | null {
  const raw = readFileSync(path, "utf8").trim();
  if (!raw) return null; // interrupted-create artifact; safe to regenerate
  const bytes = Buffer.from(raw, "base64url");
  if (bytes.length !== 32) {
    // A corrupt non-empty file may guard real ciphertext: fail closed, never overwrite.
    throw new CredentialCryptoError(`master key file ${path} is not a valid key; refusing to replace it`);
  }
  return bytes;
}

function createKeyFile(path: string): Buffer {
  mkdirSync(dirname(path), { recursive: true });
  const bytes = generateKeyBytes();
  const tmp = `${path}.${process.pid}.tmp`;
  writeFileSync(tmp, bytes.toString("base64url"), { mode: 0o600 });
  renameSync(tmp, path); // atomic: readers never observe a partial key
  return bytes;
}

/** Resolve (or, for the dev default path, create) the master KEK. Null = store disabled. */
export function loadMasterKey(env: Record<string, string | undefined> = process.env): Buffer | null {
  const inline = env["STORYWORLD_SECRET_KEY"];
  if (inline && inline.trim()) {
    const bytes = Buffer.from(inline.trim(), "base64url");
    if (bytes.length !== 32) throw new CredentialCryptoError("STORYWORLD_SECRET_KEY is not base64url of 32 bytes");
    return bytes;
  }
  const named = env["STORYWORLD_SECRET_KEY_FILE"];
  const path = named && named.trim() ? named.trim() : join(homedir(), ".storyworld", "kek.key");
  try {
    if (existsSync(path)) {
      const mode = statSync(path).mode & 0o777;
      if (mode !== 0o600) chmodSync(path, 0o600);
      const existing = readValidKeyFile(path);
      if (existing) return existing;
    }
    if (named && named.trim()) return null; // operator-named file must already exist
    return createKeyFile(path);
  } catch (error) {
    if (error instanceof CredentialCryptoError) throw error;
    return null;
  }
}
