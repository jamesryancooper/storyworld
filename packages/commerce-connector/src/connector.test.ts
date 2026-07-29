import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import type { KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";
import {
  getCampaign,
  receiveBrief,
  receiveCommercialApproval,
  receivePublicationReceipt,
  receiveReviewFinding,
  receiveSourceChange,
  startProduction,
  submitBundle,
} from "./connector.js";
import { createCfSimulator } from "./simulator.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const here = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(here, "..", "..", "persistence", "migrations");
const fixturesDir = join(here, "..", "..", "contracts", "fixtures", "commerce", "records");

async function fixture(name: string): Promise<Record<string, unknown>> {
  return JSON.parse(await readFile(join(fixturesDir, name), "utf8")) as Record<string, unknown>;
}

describe("B3 Commerce Foundry connector against the simulator (fixture loop)", () => {
  let admin: Pool;
  let ctx: KernelContext;
  let simulator: Server;
  let cfBaseUrl: string;
  const org = uuidv7();
  const service = { id: "cf-connector", kind: "service", role: "integration" } as const;
  const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;

  beforeAll(async () => {
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b3-cf-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "b3-cf-blobs-"))),
      organizationId: org,
    };
    simulator = createCfSimulator().listen(0);
    cfBaseUrl = `http://localhost:${(simulator.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    simulator?.close();
    await ctx?.pool.end();
    await admin?.end();
  });

  it("runs the full campaign loop on the owner's commerce fixtures", async () => {
    // Per-run unique ids: the dev database is shared and append-only, and
    // the inbox dedupe is exactly what we are testing (in-run, below).
    const fixtureBrief = await fixture("commerce-brief.instance.json");
    const brief = {
      ...fixtureBrief,
      brief_id: uuidv7(),
      identifiers: {
        ...(fixtureBrief["identifiers"] as Record<string, unknown>),
        campaign_id: uuidv7(),
      },
    };
    const first = await receiveBrief(ctx, service, brief);
    expect(first.deduped).toBe(false);
    // At-least-once delivery: the duplicate is absorbed by the inbox.
    expect((await receiveBrief(ctx, service, brief)).deduped).toBe(true);
    const { campaignId } = first;
    expect((await getCampaign(ctx, campaignId))?.lifecycle).toBe("brief_received");

    await startProduction(ctx, ryan, { campaignId });
    const bundleV1 = await fixture("commerce-bundle-v1.instance.json");
    const submission = await submitBundle(ctx, service, { campaignId, bundle: bundleV1, cfBaseUrl });
    expect(submission.accepted).toBe(true);
    expect(submission.cfReceipt["imported_as"]).toBe("unapproved");
    expect((await getCampaign(ctx, campaignId))?.lifecycle).toBe("submitted_to_cf");

    const rejection = await fixture("commerce-rejection-receipt.instance.json");
    await receiveReviewFinding(ctx, service, { campaignId, finding: rejection });
    expect((await getCampaign(ctx, campaignId))?.lifecycle).toBe("commercial_revision_requested");

    const bundleV2 = await fixture("commerce-bundle-v2.instance.json");
    const resubmission = await submitBundle(ctx, service, { campaignId, bundle: bundleV2, cfBaseUrl });
    expect(resubmission.accepted).toBe(true);
    expect(resubmission.bundleSha256).not.toBe(submission.bundleSha256);

    await receiveCommercialApproval(ctx, service, {
      campaignId, approval: { approval_layer: "commerce_approval", authority_host: "commerce_foundry" },
    });
    await receivePublicationReceipt(ctx, service, {
      campaignId, publication: { external_id: "ig-post-1", channel: "instagram" },
    });
    expect((await getCampaign(ctx, campaignId))?.lifecycle).toBe("published");

    // Source drift: stale + proposed actions, published work retained.
    const drift = await receiveSourceChange(ctx, service, {
      campaignId, change: { source_ref: "product-snapshot:ff-17", change_type: "price_change" },
    });
    expect(drift.proposedActions).toContain("revalidate");
    const after = await getCampaign(ctx, campaignId);
    expect(after?.lifecycle).toBe("published");
    expect(after?.stale).toBe(true);

    const receipts = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT action FROM storyworld.audit_receipts WHERE subject_ref=$1 ORDER BY recorded_at", [`connected-campaign:${campaignId}`]));
    const actions = receipts.rows.map((r) => String(r.action));
    for (const expected of [
      "commerce.brief.received", "commerce.bundle.submitted", "commerce.review_finding.received",
      "commerce.approval.received", "commerce.publication_receipt.received", "commerce.source_change.received",
    ]) {
      expect(actions).toContain(expected);
    }
  });

  it("refuses illegal lifecycle transitions and unsigned briefs", async () => {
    const brief = await fixture("commerce-brief.instance.json");
    const unsigned: Record<string, unknown> = { ...brief, brief_id: uuidv7() };
    delete unsigned["signature"];
    await expect(receiveBrief(ctx, service, unsigned)).rejects.toThrow(/unsigned/);

    const fresh = { ...brief, brief_id: uuidv7(),
      identifiers: { ...(brief["identifiers"] as Record<string, unknown>), campaign_id: uuidv7() } };
    const { campaignId } = await receiveBrief(ctx, service, fresh);
    await expect(
      receivePublicationReceipt(ctx, service, { campaignId, publication: {} }),
    ).rejects.toThrow(/illegal campaign transition/);
  });

  it("the exportable conformance suite passes against the simulator", async () => {
    const out = await promisify(execFile)("node", [join(here, "..", "conformance", "conformance.mjs")], {
      env: { ...process.env, CF_BASE_URL: cfBaseUrl },
    });
    expect(out.stdout).toContain("PASS accepts well-formed signed bundle");
    expect(out.stdout).toContain("PASS idempotent resubmission replays the receipt");
    expect(out.stdout).toContain("PASS refuses bundle without creative-approval evidence");
  });
});
