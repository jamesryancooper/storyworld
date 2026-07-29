import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import { acceptAssetVersion, importAsset, type KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);
import { exportPublicKeyPem, generateSigningKeyPair, verifyDetached } from "@storyworld/portability";
import { canonicalJson, contentSha256 } from "@storyworld/domain";
import { ChannelRuleError, declareCapabilities, renderChannelPackage } from "./adapter.js";

describe("B3 Instagram channel adapter (export-first)", () => {
  let admin: Pool;
  let ctx: KernelContext;
  let acceptedId: string;
  let candidateId: string;
  const org = uuidv7();
  const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;
  const pair = generateSigningKeyPair("studio-dev-key");

  beforeAll(async () => {
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b3-ig-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "b3-ig-blobs-"))),
      organizationId: org,
    };
    const still = await importAsset(ctx, ryan, {
      bytes: new TextEncoder().encode(`ig-master-${uuidv7()}`), mediaType: "image/png",
    });
    candidateId = still.assetVersionId;
    acceptedId = (await acceptAssetVersion(ctx, ryan, { assetVersionId: still.assetVersionId })).acceptedVersionId;
  });

  afterAll(async () => {
    await ctx?.pool.end();
    await admin?.end();
  });

  it("renders an accepted master into a signed channel package with rendition lineage", async () => {
    const out = await renderChannelPackage(ctx, ryan, {
      acceptedAssetVersionIds: [acceptedId],
      format: "feed_single", aspectRatio: "4:5",
      caption: "The archive at dusk. #storyworld",
      unitRef: `unit:${uuidv7()}`, signingPair: pair,
      renderedAt: "2026-07-29T00:00:00Z",
    });
    expect(out.renditionAssetVersionIds).toHaveLength(1);
    const signature = out.envelope["signature"] as Record<string, unknown>;
    expect(signature["content_sha256"]).toBe(out.sha256);
    const { signature: _sig, ...unsigned } = out.envelope;
    const canonical = canonicalJson(unsigned);
    expect(contentSha256(canonical)).toBe(out.sha256);
    expect(
      verifyDetached(
        new TextEncoder().encode(canonical),
        new Uint8Array(Buffer.from(String(signature["signature"]), "base64")),
        exportPublicKeyPem(pair),
      ),
    ).toBe(true);
    const rows = await withTenant(ctx.pool, org, (c) =>
      c.query(
        "SELECT transformation, provider_provenance FROM storyworld.derivations WHERE from_asset_version_id=$1",
        [acceptedId],
      ));
    expect(rows.rows[0]?.transformation).toBe("rendition.instagram.feed_single");
    expect((rows.rows[0]?.provider_provenance as Record<string, unknown>)["aspect_ratio"]).toBe("4:5");
  });

  it("platform rules live in the adapter: enforced without touching canonical data", async () => {
    await expect(renderChannelPackage(ctx, ryan, {
      acceptedAssetVersionIds: [acceptedId], format: "story", aspectRatio: "4:5",
      caption: "x", unitRef: "unit:u", signingPair: pair, renderedAt: "2026-07-29T00:00:00Z",
    })).rejects.toThrow(ChannelRuleError);
    await expect(renderChannelPackage(ctx, ryan, {
      acceptedAssetVersionIds: [acceptedId], format: "feed_single", aspectRatio: "1:1",
      caption: "#a ".repeat(31), unitRef: "unit:u", signingPair: pair, renderedAt: "2026-07-29T00:00:00Z",
    })).rejects.toThrow(/hashtags/);
    // C2 gate: a platform-rule change is an adapter-version change only.
    const tightened = { ...declareCapabilities(), adapter_version: "1.1.0",
      limits: { caption_max_chars: 10, hashtags_max: 30 } };
    await expect(renderChannelPackage(ctx, ryan, {
      acceptedAssetVersionIds: [acceptedId], format: "feed_single", aspectRatio: "1:1",
      caption: "far too long for the tightened rule", unitRef: "unit:u",
      signingPair: pair, capabilities: tightened, renderedAt: "2026-07-29T00:00:00Z",
    })).rejects.toThrow(/caption exceeds 10/);
  });

  it("only accepted masters render", async () => {
    await expect(renderChannelPackage(ctx, ryan, {
      acceptedAssetVersionIds: [candidateId], format: "feed_single", aspectRatio: "1:1",
      caption: "x", unitRef: "unit:u", signingPair: pair, renderedAt: "2026-07-29T00:00:00Z",
    })).rejects.toThrow(/not accepted_master/);
  });
});
