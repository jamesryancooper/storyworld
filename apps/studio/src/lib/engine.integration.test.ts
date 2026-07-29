// @vitest-environment node
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import { createEngineServer } from "@storyworld/engine-api";
import type { KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";
import { createEngineClient, type EngineClient } from "./engine.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..", "packages", "persistence", "migrations",
);

describe("Studio engine client against a live engine-api", () => {
  let admin: Pool;
  let ctx: KernelContext;
  let server: Server;
  let client: EngineClient;
  const org = uuidv7();

  beforeAll(async () => {
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b2-studio-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "b2-studio-blobs-"))),
      organizationId: org,
    };
    server = createEngineServer(ctx).listen(0);
    const port = (server.address() as AddressInfo).port;
    client = createEngineClient(`http://localhost:${port}`);
  });

  afterAll(async () => {
    server?.close();
    await ctx?.pool.end();
    await admin?.end();
  });

  it("drives the property flow end to end over HTTP", async () => {
    expect(await client.health()).toBe(true);
    const before = await client.listProperties();
    const { propertyId } = await client.createProperty({
      workspaceName: "studio-int workspace",
      propertyName: "Studio Integration",
      propertyType: "fictional",
    });
    expect(propertyId).toBeTruthy();
    const after = await client.listProperties();
    expect(after.length).toBe(before.length + 1);
    expect(after.some((p) => p.propertyId === propertyId)).toBe(true);
    expect(await client.latestCanonRelease(propertyId)).toBeNull();
    expect(await client.listProductions(propertyId)).toEqual([]);
  });
});
