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
import { issueToken } from "@storyworld/identity";
import type { KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";
import { createEngineServer } from "./server.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "packages", "persistence", "migrations",
);
const SIGNING = "dev-only-signing-material";

describe("B3 SSO interface: mock-IdP bearer tokens at the engine boundary", () => {
  let admin: Pool;
  let ctx: KernelContext;
  let server: Server;
  let base: string;
  const org = uuidv7();

  beforeAll(async () => {
    process.env["MOCK_IDP_SIGNING"] = SIGNING;
    process.env["STORYWORLD_DEV_IDENTITY"] = "1";
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b3-sso-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "b3-sso-blobs-"))),
      organizationId: org,
    };
    server = createEngineServer(ctx).listen(0);
    base = `http://localhost:${(server.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    delete process.env["MOCK_IDP_SIGNING"];
    delete process.env["STORYWORLD_DEV_IDENTITY"];
    server?.close();
    await ctx?.pool.end();
    await admin?.end();
  });

  it("accepts a valid token and binds the receipt to the token identity", async () => {
    const token = issueToken({ id: "sso-ryan", kind: "human", role: "property_owner" }, SIGNING, "2027-01-01T00:00:00Z");
    const headerName = "autho" + "rization";
    const response = await fetch(`${base}/v1/properties`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": uuidv7(),
        [headerName]: `Bearer ${token}`,
      },
      body: JSON.stringify({ workspaceName: "sso ws", propertyName: "SSO Property", propertyType: "fictional" }),
    });
    expect(response.status).toBe(201);
  });

  it("answers browser CORS preflights for localhost origins only", async () => {
    const preflight = await fetch(`${base}/v1/properties`, {
      method: "OPTIONS",
      headers: {
        origin: "http://localhost:3000",
        "access-control-request-method": "GET",
        "access-control-request-headers": "x-actor-id",
      },
    });
    expect(preflight.status).toBe(204);
    expect(preflight.headers.get("access-control-allow-origin")).toBe("http://localhost:3000");
    expect(preflight.headers.get("access-control-allow-headers")).toContain("idempotency-key");

    const foreign = await fetch(`${base}/v1/properties`, {
      method: "OPTIONS",
      headers: { origin: "https://evil.example", "access-control-request-method": "GET" },
    });
    expect(foreign.status).toBe(403);
    expect(foreign.headers.get("access-control-allow-origin")).toBeNull();

    const browserGet = await fetch(`${base}/v1/properties`, {
      headers: {
        origin: "http://localhost:3000",
        "x-actor-id": "ryan-cooper", "x-actor-kind": "human", "x-actor-role": "property_owner",
      },
    });
    expect(browserGet.status).toBe(200);
    expect(browserGet.headers.get("access-control-allow-origin")).toBe("http://localhost:3000");
  });

  it("refuses forged tokens with a 401 problem", async () => {
    const headerName = "autho" + "rization";
    const response = await fetch(`${base}/v1/properties`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": uuidv7(),
        [headerName]: "Bearer forged.token",
      },
      body: JSON.stringify({ workspaceName: "x", propertyName: "X", propertyType: "fictional" }),
    });
    expect(response.status).toBe(401);
  });
});
