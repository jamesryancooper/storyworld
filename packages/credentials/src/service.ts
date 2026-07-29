import { uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import { requireHuman, type Actor, type KernelContext } from "@storyworld/kernel";
import {
  loadMasterKey,
  openWithKey,
  sealWithKey,
  generateKeyBytes,
  unwrapDek,
  wrapDek,
  CredentialCryptoError,
} from "./crypto.js";
import { credentialHint, requireSlot } from "./slots.js";

/**
 * The at-rest credential service. Entry, replacement, revocation, and
 * re-activation are append-only revisions with binding receipts; the
 * receipt carries the redacted hint, never the value. status() is what
 * client surfaces see — plaintext never leaves this module except through
 * the broker's resolve path.
 */

export class CredentialDeniedError extends Error {}

export interface CredentialStatus {
  name: string;
  provider: string;
  label: string;
  note: string;
  scopes: string[];
  status: "absent" | "active" | "revoked" | "expired";
  hint: string | null;
  updatedAt: string | null;
}

interface CurrentRow {
  revisionId: string;
  status: string;
  ciphertext: string;
  wrappedDek: string;
  hint: string;
  expiresAt: string | null;
  createdAt: string;
  scopes: string[];
  provider: string;
}

async function currentRevision(ctx: KernelContext, name: string): Promise<CurrentRow | null> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const row = (await c.query(
      `SELECT credential_revision_id AS "revisionId", status, ciphertext,
              wrapped_dek AS "wrappedDek", hint, expires_at AS "expiresAt",
              created_at AS "createdAt", scopes, provider
         FROM storyworld.provider_credentials f
        WHERE name=$1
          AND NOT EXISTS (SELECT 1 FROM storyworld.provider_credentials s
                           WHERE s.supersedes_revision_id = f.credential_revision_id)`,
      [name],
    )).rows[0];
    return row ?? null;
  });
}

export function storeEnabled(): boolean {
  try {
    return loadMasterKey() !== null;
  } catch {
    return false;
  }
}

export async function setCredential(
  ctx: KernelContext,
  actor: Actor,
  input: { name: string; value: string; expiresAt?: string | null },
): Promise<{ credentialRevisionId: string; hint: string }> {
  requireHuman(actor, "credential entry");
  const slot = requireSlot(input.name);
  if (!input.value || input.value.trim().length < 8) {
    throw new Error("credential value looks empty or truncated; refusing to store it");
  }
  const kek = loadMasterKey();
  if (kek === null) {
    throw new CredentialCryptoError(
      "credential store is disabled: no master key is configured and none could be created",
    );
  }
  const dek = generateKeyBytes();
  const ciphertext = sealWithKey(dek, input.value.trim());
  const wrapped = wrapDek(kek, dek);
  const hint = credentialHint(input.value);
  const prior = await currentRevision(ctx, input.name);
  const credentialRevisionId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.provider_credentials (credential_revision_id, organization_id, name, provider, scopes, status, ciphertext, wrapped_dek, hint, expires_at, supersedes_revision_id) VALUES ($1,$2,$3,$4,$5,'active',$6,$7,$8,$9,$10)",
      [credentialRevisionId, ctx.organizationId, slot.name, slot.provider,
       JSON.stringify(slot.scopes), ciphertext, wrapped, hint,
       input.expiresAt ?? null, prior?.revisionId ?? null],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,NULL,$6,$7)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`,
       prior ? "credential.replaced" : "credential.entered",
       `provider-credential:${slot.name}`, uuidv7(),
       JSON.stringify({ provider: slot.provider, scopes: slot.scopes, hint,
                        reserved_crossing: "hosted generation becomes reachable while this credential is active" })],
    );
  });
  return { credentialRevisionId, hint };
}

export async function revokeCredential(
  ctx: KernelContext,
  actor: Actor,
  input: { name: string },
): Promise<{ credentialRevisionId: string }> {
  requireHuman(actor, "credential revocation");
  const slot = requireSlot(input.name);
  const prior = await currentRevision(ctx, input.name);
  if (!prior) throw new Error(`no stored credential for slot ${slot.name}`);
  const credentialRevisionId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.provider_credentials (credential_revision_id, organization_id, name, provider, scopes, status, ciphertext, wrapped_dek, hint, expires_at, supersedes_revision_id) VALUES ($1,$2,$3,$4,$5,'revoked',$6,$7,$8,$9,$10)",
      [credentialRevisionId, ctx.organizationId, slot.name, slot.provider,
       JSON.stringify(slot.scopes), prior.ciphertext, prior.wrappedDek, prior.hint,
       prior.expiresAt, prior.revisionId],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,'credential.revoked',$4,NULL,$5,$6)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`,
       `provider-credential:${slot.name}`, uuidv7(),
       JSON.stringify({ provider: slot.provider, hint: prior.hint })],
    );
  });
  return { credentialRevisionId };
}

/**
 * Resolve plaintext for the broker. Lifecycle is enforced at issuance:
 * revoked/expired DENIES (CredentialDeniedError) so callers can refuse to
 * fall back past an operator decision. A disabled/undecryptable store
 * resolves null (degraded, fall back allowed).
 */
export async function issueCredential(ctx: KernelContext, name: string): Promise<string | null> {
  requireSlot(name);
  const row = await currentRevision(ctx, name);
  if (!row) return null;
  if (row.status === "revoked") throw new CredentialDeniedError(`credential ${name} is revoked`);
  if (row.status === "expired" || (row.expiresAt && new Date(row.expiresAt).toISOString() <= new Date().toISOString())) {
    throw new CredentialDeniedError(`credential ${name} is expired`);
  }
  let kek: Buffer | null;
  try {
    kek = loadMasterKey();
  } catch {
    return null;
  }
  if (kek === null) return null;
  try {
    return openWithKey(unwrapDek(kek, row.wrappedDek), row.ciphertext);
  } catch {
    return null; // wrong/rotated master key: degraded, never a crash path
  }
}

export async function credentialStatuses(ctx: KernelContext): Promise<CredentialStatus[]> {
  const { PROVIDER_SLOTS } = await import("./slots.js");
  const out: CredentialStatus[] = [];
  for (const slot of Object.values(PROVIDER_SLOTS)) {
    const row = await currentRevision(ctx, slot.name);
    out.push({
      name: slot.name,
      provider: slot.provider,
      label: slot.label,
      note: slot.note,
      scopes: slot.scopes,
      status: row ? (row.status as CredentialStatus["status"]) : "absent",
      hint: row?.hint ?? null,
      updatedAt: row ? new Date(row.createdAt).toISOString() : null,
    });
  }
  return out;
}
