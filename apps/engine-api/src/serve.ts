import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createPool, migrate } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import { uuidv7 } from "@storyworld/domain";
import type { KernelContext } from "@storyworld/kernel";
import { defaultKekPath, loadMasterKey } from "@storyworld/credentials";
import { createEngineServer } from "./server.js";
import { logLine } from "./telemetry.js";

/**
 * Dev entrypoint for the owner walkthrough (V1 review): migrates the
 * compose database, ensures a stable dev organization, and serves the
 * engine on ENGINE_PORT (default 4400 — the Studio's default base URL).
 * Dev-profile only; production serving is an O1 concern.
 */
const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const port = Number(process.env["ENGINE_PORT"] ?? 4400);
const DEV_ORG_NAME = "storyworld-dev";

const admin = createPool(url);
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "packages", "persistence", "migrations",
);
await migrate(admin, migrationsDir);
const existing = await admin.query(
  "SELECT organization_id FROM storyworld.organizations WHERE name=$1",
  [DEV_ORG_NAME],
);
let organizationId = existing.rows[0]?.organization_id as string | undefined;
if (!organizationId) {
  organizationId = uuidv7();
  await admin.query(
    "INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)",
    [organizationId, DEV_ORG_NAME],
  );
}
await admin.end();

const blobRoot = process.env["BLOB_ROOT"] ?? join(homedir(), ".storyworld-dev", "blobs");
await mkdir(blobRoot, { recursive: true });
const ctx: KernelContext = {
  pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
  blobs: createFsStore(blobRoot),
  organizationId,
};

// Provision the credential-store master key at boot so the Settings page
// reports the store ready before any secret is entered. Dev default lives
// OUTSIDE the working tree; production sets STORYWORLD_SECRET_KEY(_FILE).
const kekReady = loadMasterKey() !== null;

createEngineServer(ctx).listen(port, () => {
  logLine("info", "engine.listening", {
    port, organization: DEV_ORG_NAME, blob_root: blobRoot,
    credential_store: kekReady ? `ready (master key at ${defaultKekPath()})` : "DISABLED (no master key)",
  });
});
