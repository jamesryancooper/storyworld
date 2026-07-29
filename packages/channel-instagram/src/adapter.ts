import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import { signDetached, type SigningKeyPair } from "@storyworld/portability";
import type { KernelContext } from "@storyworld/kernel";

/**
 * Instagram channel adapter (interface channel-adapter.v1; ADR-0013/0014):
 * channel-neutral accepted masters in; target renditions and a signed
 * common-package-envelope out. Platform rules live HERE, independently
 * versioned — a platform-rule change never requires a narrative-domain
 * migration (C2 gate). Publication submission stays export-only until the
 * project's authority policy grants Storyworld publication.
 */

export interface ChannelCapabilities {
  channel: "instagram";
  adapter_version: string;
  formats: { kind: string; aspect_ratios: string[]; max_assets: number }[];
  limits: { caption_max_chars: number; hashtags_max: number };
}

export function declareCapabilities(): ChannelCapabilities {
  return {
    channel: "instagram",
    adapter_version: "1.0.0",
    formats: [
      { kind: "feed_single", aspect_ratios: ["1:1", "4:5"], max_assets: 1 },
      { kind: "carousel", aspect_ratios: ["1:1", "4:5"], max_assets: 10 },
      { kind: "story", aspect_ratios: ["9:16"], max_assets: 1 },
    ],
    limits: { caption_max_chars: 2200, hashtags_max: 30 },
  };
}

export class ChannelRuleError extends Error {}

export async function renderChannelPackage(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: {
    acceptedAssetVersionIds: string[];
    format: string;
    aspectRatio: string;
    caption: string;
    unitRef: string;
    signingPair: SigningKeyPair;
    capabilities?: ChannelCapabilities;
    renderedAt: string;
  },
): Promise<{ envelope: Record<string, unknown>; renditionAssetVersionIds: string[]; sha256: string }> {
  const capabilities = input.capabilities ?? declareCapabilities();
  const format = capabilities.formats.find((f) => f.kind === input.format);
  if (!format) throw new ChannelRuleError(`format ${input.format} is not offered by this adapter version`);
  if (!format.aspect_ratios.includes(input.aspectRatio)) {
    throw new ChannelRuleError(`aspect ratio ${input.aspectRatio} is not allowed for ${input.format}`);
  }
  if (input.acceptedAssetVersionIds.length === 0 || input.acceptedAssetVersionIds.length > format.max_assets) {
    throw new ChannelRuleError(`${input.format} takes 1..${format.max_assets} asset(s)`);
  }
  if (input.caption.length > capabilities.limits.caption_max_chars) {
    throw new ChannelRuleError(`caption exceeds ${capabilities.limits.caption_max_chars} characters`);
  }
  const hashtags = input.caption.match(/#[\p{L}0-9_]+/gu) ?? [];
  if (hashtags.length > capabilities.limits.hashtags_max) {
    throw new ChannelRuleError(`caption exceeds ${capabilities.limits.hashtags_max} hashtags`);
  }

  const renditionAssetVersionIds: string[] = [];
  const manifest: Record<string, unknown>[] = [];
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    for (const masterId of input.acceptedAssetVersionIds) {
      const master = (await c.query(
        `SELECT v.asset_id, v.content_sha256, v.state, b.size_bytes, b.media_type
           FROM storyworld.asset_versions v
           JOIN storyworld.content_blobs b ON b.sha256 = v.content_sha256
          WHERE v.asset_version_id=$1`,
        [masterId],
      )).rows[0];
      if (!master) throw new ChannelRuleError(`asset version ${masterId} not found`);
      if (master.state !== "accepted_master") {
        throw new ChannelRuleError(`asset version ${masterId} is ${String(master.state)}, not accepted_master — only accepted masters render`);
      }
      const max = await c.query(
        "SELECT coalesce(max(version),0) AS v FROM storyworld.asset_versions WHERE asset_id=$1",
        [master.asset_id],
      );
      const renditionId = uuidv7();
      await c.query(
        "INSERT INTO storyworld.asset_versions (asset_version_id, organization_id, asset_id, version, content_sha256, state) VALUES ($1,$2,$3,$4,$5,'rendition')",
        [renditionId, ctx.organizationId, master.asset_id, Number(max.rows[0]?.v ?? 0) + 1, master.content_sha256],
      );
      await c.query(
        "INSERT INTO storyworld.derivations (derivation_id, organization_id, from_asset_version_id, to_asset_version_id, transformation, provider_provenance) VALUES ($1,$2,$3,$4,$5,$6)",
        [uuidv7(), ctx.organizationId, masterId, renditionId,
         `rendition.instagram.${input.format}`,
         JSON.stringify({ aspect_ratio: input.aspectRatio, adapter_version: capabilities.adapter_version })],
      );
      await c.query(
        "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,'channel.rendition.created',$4,$5,$6,$7)",
        [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`,
         `asset-version:${renditionId}`, master.content_sha256, uuidv7(),
         JSON.stringify({ channel: "instagram", format: input.format, aspect_ratio: input.aspectRatio, master: masterId })],
      );
      renditionAssetVersionIds.push(renditionId);
      manifest.push({
        entry: `renditions/${String(master.content_sha256)}`,
        role: "rendition",
        master_ref: `asset-version:${masterId}`,
        sha256: String(master.content_sha256),
        content_type: String(master.media_type),
        size_bytes: Number(master.size_bytes),
      });
    }
  });

  const unsigned: Record<string, unknown> = {
    schema_version: "storyworld.common-package-envelope.v1",
    package_type: "channel_export",
    package_version: "1.0.0",
    origin: { system: "storyworld-platform", system_version: "0.1.0", created_at: input.renderedAt },
    authority_host: "storyworld",
    identifiers: { package_id: uuidv7(), unit_ref: input.unitRef, correlation_id: uuidv7() },
    snapshots: { channel: "instagram", format: input.format, aspect_ratio: input.aspectRatio, caption: input.caption },
    manifest,
    asset_index: manifest.map((entry) => ({
      asset_version_ref: String(entry["master_ref"]),
      location: String(entry["entry"]),
      content_type: String(entry["content_type"]),
      size_bytes: Number(entry["size_bytes"]),
      sha256: String(entry["sha256"]),
      embedding: "embedded",
    })),
    governance_metadata: {
      rights_evidence_refs: [],
      provenance_complete: true,
      disclosure_obligations: [],
      sensitivity: "internal",
    },
    approval_receipts: input.acceptedAssetVersionIds.map((id) => `asset-version:${id}`),
    validation_reports: [],
    integration_associations: [],
  };
  const canonical = canonicalJson(unsigned);
  const sha256 = contentSha256(canonical);
  const signature = Buffer.from(signDetached(new TextEncoder().encode(canonical), input.signingPair)).toString("base64");
  const envelope: Record<string, unknown> = {
    ...unsigned,
    signature: { algorithm: "ed25519", key_id: input.signingPair.keyId, content_sha256: sha256, signature },
  };
  return { envelope, renditionAssetVersionIds, sha256 };
}
