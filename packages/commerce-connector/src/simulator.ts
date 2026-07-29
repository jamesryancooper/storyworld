import { createServer, type IncomingMessage, type Server } from "node:http";

/**
 * Commerce Foundry simulator (DEC-0012 deferral: CF-side CI runs this, not
 * Commerce Foundry itself). It enforces the connector-facing rules the
 * interface declares so the SAME conformance suite can later point at a
 * real CF endpoint: bundles import as unapproved, idempotent resubmission
 * returns the original receipt, malformed bundles get typed findings.
 */
export function createCfSimulator(): Server {
  const receipts = new Map<string, { status: number; body: string }>();

  return createServer(async (req, res) => {
    const path = new URL(req.url ?? "/", "http://localhost").pathname;
    if (req.method === "POST" && path === "/cf/bundles") {
      const idempotencyKey = String(req.headers["x-idempotency-key"] ?? "");
      const replay = receipts.get(idempotencyKey);
      if (replay) {
        res.writeHead(replay.status, { "content-type": "application/json", "x-idempotent-replay": "true" });
        return res.end(replay.body);
      }
      const bundle = await readJson(req);
      const problems: { code: string; detail: string }[] = [];
      if (bundle["schema_version"] !== "storyworld.narrative-asset-bundle.v1") {
        problems.push({ code: "wrong-schema", detail: "expected narrative-asset-bundle.v1" });
      }
      if (!bundle["signature"]) problems.push({ code: "unsigned", detail: "bundle must be signed" });
      if (!Array.isArray(bundle["master_assets"]) || bundle["master_assets"].length === 0) {
        problems.push({ code: "no-assets", detail: "bundle has no master assets" });
      }
      if (!Array.isArray(bundle["approval_receipts"]) || bundle["approval_receipts"].length === 0) {
        problems.push({ code: "no-creative-approval", detail: "Storyworld creative approval evidence required (it is evidence, not authorization)" });
      }
      const status = problems.length === 0 ? 201 : 422;
      const body = JSON.stringify(
        problems.length === 0
          ? {
              receipt_id: `cf-receipt-${receipts.size + 1}`,
              bundle_id: bundle["bundle_id"],
              imported_as: "unapproved",
              commercial_review: "pending",
            }
          : { findings: problems },
      );
      if (idempotencyKey) receipts.set(idempotencyKey, { status, body });
      res.writeHead(status, { "content-type": "application/json" });
      return res.end(body);
    }
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: `no route ${req.method} ${path}` }));
  });
}

async function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? (JSON.parse(text) as Record<string, unknown>) : {};
}
