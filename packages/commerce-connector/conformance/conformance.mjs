#!/usr/bin/env node
// Exportable CF-connector conformance runner. No dependencies beyond Node.
// Usage: CF_BASE_URL=http://localhost:PORT node conformance.mjs [fixture.json]
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const base = process.env.CF_BASE_URL;
if (!base) {
  console.error("CF_BASE_URL is required");
  process.exit(2);
}
const fixturePath =
  process.argv[2] ??
  join(dirname(fileURLToPath(import.meta.url)), "..", "..", "contracts", "fixtures", "commerce", "records", "commerce-bundle-v1.instance.json");
const bundle = JSON.parse(await readFile(fixturePath, "utf8"));

let failures = 0;
function check(name, condition, detail) {
  if (condition) {
    console.log(`PASS ${name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${name}: ${detail}`);
  }
}

async function submit(doc, key) {
  const response = await fetch(`${base}/cf/bundles`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-idempotency-key": key },
    body: JSON.stringify(doc),
  });
  return { status: response.status, body: await response.json(), headers: response.headers };
}

const key = `conf-${Date.now()}`;
const accepted = await submit(bundle, key);
check("accepts well-formed signed bundle", accepted.status === 201, `status ${accepted.status}`);
check("imports as unapproved", accepted.body.imported_as === "unapproved", JSON.stringify(accepted.body));
check("commercial review pending", accepted.body.commercial_review === "pending", JSON.stringify(accepted.body));
check("returns a receipt id", typeof accepted.body.receipt_id === "string", JSON.stringify(accepted.body));

const replay = await submit(bundle, key);
check("idempotent resubmission replays the receipt",
  replay.status === 201 && replay.body.receipt_id === accepted.body.receipt_id,
  JSON.stringify(replay.body));

const unsigned = { ...bundle };
delete unsigned.signature;
const refusedUnsigned = await submit(unsigned, `${key}-unsigned`);
check("refuses unsigned bundle 422", refusedUnsigned.status === 422, `status ${refusedUnsigned.status}`);
check("unsigned finding is typed",
  Array.isArray(refusedUnsigned.body.findings) && refusedUnsigned.body.findings.some((f) => f.code === "unsigned"),
  JSON.stringify(refusedUnsigned.body));

const noApproval = { ...bundle, approval_receipts: [] };
const refusedApproval = await submit(noApproval, `${key}-noapproval`);
check("refuses bundle without creative-approval evidence",
  refusedApproval.status === 422 && refusedApproval.body.findings?.some((f) => f.code === "no-creative-approval"),
  JSON.stringify(refusedApproval.body));

process.exit(failures === 0 ? 0 : 1);
