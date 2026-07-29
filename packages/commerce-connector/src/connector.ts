import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import type { KernelContext } from "@storyworld/kernel";

/**
 * Commerce Foundry connector (interface commerce-foundry-connector.v1;
 * ADR-0010/0011): signed immutable documents in and out, inbox dedupe for
 * at-least-once delivery, no shared business tables, no counterparty
 * credentials. CF authority stays CF-side — commercial approval arrives as
 * a receipt, never as a Storyworld state we invent.
 */

export type CampaignLifecycle =
  | "brief_received"
  | "in_production"
  | "submitted_to_cf"
  | "commercial_revision_requested"
  | "commercially_approved"
  | "published"
  | "withdrawn";

const TRANSITIONS: Record<CampaignLifecycle, CampaignLifecycle[]> = {
  brief_received: ["in_production", "withdrawn"],
  in_production: ["submitted_to_cf", "withdrawn"],
  submitted_to_cf: ["commercial_revision_requested", "commercially_approved", "withdrawn"],
  commercial_revision_requested: ["submitted_to_cf", "withdrawn"],
  commercially_approved: ["published", "withdrawn"],
  published: ["withdrawn"],
  withdrawn: [],
};

async function currentCampaign(
  ctx: KernelContext,
  campaignId: string,
): Promise<{ revisionId: string; lifecycle: CampaignLifecycle; briefSha256: string; document: Record<string, unknown>; stale: boolean } | null> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const row = (await c.query(
      `SELECT campaign_revision_id AS "revisionId", lifecycle, brief_sha256 AS "briefSha256",
              document, source_drift_stale AS stale
         FROM storyworld.connected_campaigns f
        WHERE campaign_id=$1
          AND NOT EXISTS (SELECT 1 FROM storyworld.connected_campaigns s
                           WHERE s.supersedes_revision_id = f.campaign_revision_id)`,
      [campaignId],
    )).rows[0];
    return row ?? null;
  });
}

async function reviseCampaign(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  campaignId: string,
  next: CampaignLifecycle,
  action: string,
  detail: Record<string, unknown>,
  options?: { markStale?: boolean },
): Promise<{ campaignRevisionId: string }> {
  const current = await currentCampaign(ctx, campaignId);
  if (!current) throw new Error(`campaign ${campaignId} not found`);
  if (next !== current.lifecycle && !TRANSITIONS[current.lifecycle].includes(next)) {
    throw new Error(`illegal campaign transition ${current.lifecycle} -> ${next}`);
  }
  const campaignRevisionId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.connected_campaigns (campaign_revision_id, organization_id, campaign_id, lifecycle, source_drift_stale, brief_sha256, document, supersedes_revision_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [campaignRevisionId, ctx.organizationId, campaignId, next,
       options?.markStale ?? current.stale, current.briefSha256,
       JSON.stringify(current.document), current.revisionId],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`, action,
       `connected-campaign:${campaignId}`, current.briefSha256, uuidv7(), JSON.stringify(detail)],
    );
  });
  return { campaignRevisionId };
}

/** Inbox-deduped brief intake: pins the brief document and opens the campaign. */
export async function receiveBrief(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  brief: Record<string, unknown>,
): Promise<{ campaignId: string; deduped: boolean }> {
  if (brief["schema_version"] !== "storyworld.narrative-campaign-brief.v1") {
    throw new Error("not a narrative-campaign-brief.v1 document");
  }
  if (!brief["signature"]) throw new Error("unsigned brief refused");
  const briefId = String(brief["brief_id"]);
  const sha = contentSha256(canonicalJson(brief));
  const campaignId = String(
    (brief["identifiers"] as Record<string, unknown> | undefined)?.["campaign_id"] ?? uuidv7(),
  );
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    // Interface-declared idempotency: brief id (+ signature checked above).
    const dedupe = await c.query(
      "INSERT INTO storyworld.inbox (message_id, organization_id, source) VALUES ($1,$2,'commerce_foundry') ON CONFLICT (message_id) DO NOTHING",
      [briefId, ctx.organizationId],
    );
    if ((dedupe.rowCount ?? 0) === 0) return { campaignId, deduped: true };
    await c.query(
      "INSERT INTO storyworld.connected_campaigns (campaign_revision_id, organization_id, campaign_id, lifecycle, brief_sha256, document) VALUES ($1,$2,$3,'brief_received',$4,$5)",
      [uuidv7(), ctx.organizationId, campaignId, sha, JSON.stringify(brief)],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,'commerce.brief.received',$4,$5,$6,$7)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`,
       `connected-campaign:${campaignId}`, sha, uuidv7(),
       JSON.stringify({ brief_id: briefId, authority_host: brief["authority_host"] })],
    );
    return { campaignId, deduped: false };
  });
}

export async function startProduction(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { campaignId: string },
): Promise<{ campaignRevisionId: string }> {
  return reviseCampaign(ctx, actor, input.campaignId, "in_production", "commerce.campaign.production_started", {});
}

/** Submit a narrative asset bundle to CF over HTTP; the outbox row and receipt bind the exact bundle hash. */
export async function submitBundle(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { campaignId: string; bundle: Record<string, unknown>; cfBaseUrl: string },
): Promise<{ accepted: boolean; cfReceipt: Record<string, unknown>; bundleSha256: string }> {
  if (input.bundle["schema_version"] !== "storyworld.narrative-asset-bundle.v1") {
    throw new Error("not a narrative-asset-bundle.v1 document");
  }
  const bundleSha256 = contentSha256(canonicalJson(input.bundle));
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.outbox (outbox_id, organization_id, event_type, envelope) VALUES ($1,$2,'commerce.bundle.submit',$3)",
      [uuidv7(), ctx.organizationId, JSON.stringify({ campaign_id: input.campaignId, bundle_sha256: bundleSha256 })],
    );
  });
  const response = await fetch(`${input.cfBaseUrl}/cf/bundles`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-idempotency-key": bundleSha256 },
    body: canonicalJson(input.bundle),
  });
  const cfReceipt = (await response.json()) as Record<string, unknown>;
  const accepted = response.status === 201;
  await reviseCampaign(ctx, actor, input.campaignId, "submitted_to_cf", "commerce.bundle.submitted", {
    bundle_sha256: bundleSha256, cf_status: response.status, cf_receipt_id: cfReceipt["receipt_id"] ?? null,
  });
  return { accepted, cfReceipt, bundleSha256 };
}

export async function receiveReviewFinding(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { campaignId: string; finding: Record<string, unknown> },
): Promise<{ campaignRevisionId: string }> {
  return reviseCampaign(ctx, actor, input.campaignId, "commercial_revision_requested",
    "commerce.review_finding.received", { finding: input.finding });
}

export async function receiveCommercialApproval(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { campaignId: string; approval: Record<string, unknown> },
): Promise<{ campaignRevisionId: string }> {
  return reviseCampaign(ctx, actor, input.campaignId, "commercially_approved",
    "commerce.approval.received", {
      approval_layer: "commerce_approval", authority_host: "commerce_foundry",
      approval: input.approval,
    });
}

export async function receivePublicationReceipt(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { campaignId: string; publication: Record<string, unknown> },
): Promise<{ campaignRevisionId: string }> {
  return reviseCampaign(ctx, actor, input.campaignId, "published",
    "commerce.publication_receipt.received", { publication: input.publication });
}

/** Source drift: mark stale and receipt the proposal for human decision — never silently delete published work. */
export async function receiveSourceChange(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { campaignId: string; change: Record<string, unknown> },
): Promise<{ campaignRevisionId: string; proposedActions: string[] }> {
  const current = await currentCampaign(ctx, input.campaignId);
  if (!current) throw new Error(`campaign ${input.campaignId} not found`);
  const proposedActions = ["revalidate", "replace", "withdraw", "waiver"];
  const out = await reviseCampaign(ctx, actor, input.campaignId, current.lifecycle,
    "commerce.source_change.received", {
      change: input.change, proposed_actions: proposedActions,
      note: "published work retained; disposition is a human decision",
    }, { markStale: true });
  return { ...out, proposedActions };
}

export async function receivePerformanceObservation(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { campaignId: string; observation: Record<string, unknown> },
): Promise<void> {
  const sha = contentSha256(canonicalJson(input.observation));
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,'commerce.performance_observation.received',$4,$5,$6,$7)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`,
       `connected-campaign:${input.campaignId}`, sha, uuidv7(),
       JSON.stringify({ observation_sha256: sha })],
    );
  });
}

export async function getCampaign(
  ctx: KernelContext,
  campaignId: string,
): Promise<{ lifecycle: CampaignLifecycle; stale: boolean; briefSha256: string } | null> {
  const current = await currentCampaign(ctx, campaignId);
  return current ? { lifecycle: current.lifecycle, stale: current.stale, briefSha256: current.briefSha256 } : null;
}
