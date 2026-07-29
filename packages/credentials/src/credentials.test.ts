import { mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import type { KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";
import {
  generateKeyBytes,
  loadMasterKey,
  openWithKey,
  sealWithKey,
  unwrapDek,
  wrapDek,
  CredentialCryptoError,
} from "./crypto.js";
import { credentialHint, requireSlot, ProviderSlotError } from "./slots.js";
import {
  credentialStatuses,
  issueCredential,
  revokeCredential,
  setCredential,
  CredentialDeniedError,
} from "./service.js";
import { createCredentialBroker } from "./broker.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);

describe("envelope crypto", () => {
  it("round-trips, detects tampering, and refuses the wrong key", () => {
    const kek = generateKeyBytes();
    const dek = generateKeyBytes();
    const sealed = sealWithKey(dek, "fal-0123456789-example");
    expect(openWithKey(dek, sealed)).toBe("fal-0123456789-example");
    const wrapped = wrapDek(kek, dek);
    expect(unwrapDek(kek, wrapped).equals(dek)).toBe(true);
    const tampered = sealed.slice(0, -4) + (sealed.endsWith("AAAA") ? "BBBB" : "AAAA");
    expect(() => openWithKey(dek, tampered)).toThrow(CredentialCryptoError);
    expect(() => openWithKey(generateKeyBytes(), sealed)).toThrow(CredentialCryptoError);
  });

  it("KEK ladder: inline env wins; a named file must already exist; corrupt files fail closed", async () => {
    const inline = generateKeyBytes().toString("base64url");
    expect(loadMasterKey({ STORYWORLD_SECRET_KEY: inline })?.toString("base64url")).toBe(inline);
    const dir = await mkdtemp(join(tmpdir(), "kek-"));
    expect(loadMasterKey({ STORYWORLD_SECRET_KEY_FILE: join(dir, "missing.key") })).toBeNull();
    const corrupt = join(dir, "corrupt.key");
    await writeFile(corrupt, "not-a-key", { mode: 0o600 });
    expect(() => loadMasterKey({ STORYWORLD_SECRET_KEY_FILE: corrupt })).toThrow(CredentialCryptoError);
    const good = join(dir, "good.key");
    await writeFile(good, generateKeyBytes().toString("base64url"), { mode: 0o600 });
    const loaded = loadMasterKey({ STORYWORLD_SECRET_KEY_FILE: good });
    expect(loaded?.length).toBe(32);
    expect(((await stat(good)).mode & 0o777)).toBe(0o600);
    expect((await readFile(good, "utf8")).trim().length).toBeGreaterThan(0);
  });
});

describe("slots and hints", () => {
  it("only allowlisted slots exist and hints never carry usable material", () => {
    expect(requireSlot("fal").provider).toBe("fal.ai");
    expect(() => requireSlot("stripe")).toThrow(ProviderSlotError);
    const hint = credentialHint("fal-abcdef0123456789");
    expect(hint).toBe("fal-…89 (20 chars)");
    expect(hint.includes("abcdef0123456")).toBe(false);
  });
});

describe("credential store + broker against live Postgres", () => {
  let admin: Pool;
  let ctx: KernelContext;
  const org = uuidv7();
  const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;
  const service = { id: "engine", kind: "service", role: "runtime" } as const;
  const priorInline = process.env["STORYWORLD_SECRET_KEY"];
  const priorFal = process.env["FAL_KEY"];

  beforeAll(async () => {
    process.env["STORYWORLD_SECRET_KEY"] = generateKeyBytes().toString("base64url");
    delete process.env["FAL_KEY"];
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "cred-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "cred-blobs-"))),
      organizationId: org,
    };
  });

  afterAll(async () => {
    if (priorInline === undefined) delete process.env["STORYWORLD_SECRET_KEY"];
    else process.env["STORYWORLD_SECRET_KEY"] = priorInline;
    if (priorFal !== undefined) process.env["FAL_KEY"] = priorFal;
    await ctx?.pool.end();
    await admin?.end();
  });

  it("entry is human-only, allowlisted, receipted with a hint and never the value", async () => {
    await expect(setCredential(ctx, service, { name: "fal", value: "fal-svc-0123456789" }))
      .rejects.toThrow(/human/i);
    await expect(setCredential(ctx, ryan, { name: "stripe", value: "sk-0123456789" }))
      .rejects.toThrow(ProviderSlotError);
    await expect(setCredential(ctx, ryan, { name: "fal", value: "short" }))
      .rejects.toThrow(/empty or truncated/);

    const entered = await setCredential(ctx, ryan, { name: "fal", value: "fal-live-0123456789abcdef" });
    expect(entered.hint).toContain("fal-");
    const receipts = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT action, detail FROM storyworld.audit_receipts WHERE subject_ref='provider-credential:fal' ORDER BY recorded_at"));
    expect(receipts.rows.map((r) => String(r.action))).toContain("credential.entered");
    expect(JSON.stringify(receipts.rows)).not.toContain("fal-live-0123456789abcdef");
    const rows = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT ciphertext FROM storyworld.provider_credentials WHERE name='fal'"));
    expect(JSON.stringify(rows.rows)).not.toContain("fal-live-0123456789abcdef");
  });

  it("status surfaces hint and lifecycle, never plaintext; issuance resolves; replacement supersedes", async () => {
    const statuses = await credentialStatuses(ctx);
    const fal = statuses.find((s) => s.name === "fal");
    expect(fal?.status).toBe("active");
    expect(JSON.stringify(statuses)).not.toContain("fal-live-0123456789abcdef");
    expect(await issueCredential(ctx, "fal")).toBe("fal-live-0123456789abcdef");

    await setCredential(ctx, ryan, { name: "fal", value: "fal-rotated-9876543210zyxw" });
    expect(await issueCredential(ctx, "fal")).toBe("fal-rotated-9876543210zyxw");
    const revisions = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT count(*)::int AS n FROM storyworld.provider_credentials WHERE name='fal'"));
    expect(revisions.rows[0]?.n).toBe(2);
  });

  it("revocation denies and the broker never falls back past it; re-entry restores", async () => {
    const broker = createCredentialBroker(ctx, { FAL_KEY: "env-fallback-key-123" });
    expect(await broker.resolve("fal", "generation")).toBe("fal-rotated-9876543210zyxw");

    await revokeCredential(ctx, ryan, { name: "fal" });
    await expect(issueCredential(ctx, "fal")).rejects.toThrow(CredentialDeniedError);
    expect(await broker.resolve("fal", "generation")).toBeNull();
    expect((await credentialStatuses(ctx)).find((s) => s.name === "fal")?.status).toBe("revoked");

    await setCredential(ctx, ryan, { name: "fal", value: "fal-reentered-1122334455" });
    expect(await broker.resolve("fal", "generation")).toBe("fal-reentered-1122334455");
  });

  it("with no stored credential the broker falls back to the operator environment", async () => {
    const empty: KernelContext = { ...ctx, organizationId: uuidv7() };
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [empty.organizationId, "cred-empty-org"]);
    const broker = createCredentialBroker(empty, { FAL_KEY: "env-fallback-key-123" });
    expect(await broker.resolve("fal", "generation")).toBe("env-fallback-key-123");
    expect(await createCredentialBroker(empty, {}).resolve("fal", "generation")).toBeNull();
  });
});
