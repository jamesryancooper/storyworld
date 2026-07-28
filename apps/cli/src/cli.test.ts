import { describe, expect, it } from "vitest";
import { runCli } from "./index.js";

describe("cli argument handling", () => {
  it("prints usage and exits 2 on unknown commands", async () => {
    const lines: string[] = [];
    const code = await runCli(["nonsense"], {
      ctx: {} as never,
      out: (l: string) => lines.push(l),
    });
    expect(code).toBe(2);
    expect(lines[0]).toContain("usage: storyworld");
  });
  it("requires --production for export-production", async () => {
    await expect(
      runCli(["export-production"], { ctx: {} as never, out: () => {} }),
    ).rejects.toThrow(/--production required/);
  });
});
