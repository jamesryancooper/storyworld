import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { checkStructural, checkTemporalState } from "@storyworld/evaluation";
import { canonicalJson, contentSha256 } from "@storyworld/domain";
import { createFalAdapter, normalizeRecipe } from "@storyworld/providers";
import { DEFECT_MATRIX } from "./defects.js";
import { FIXTURES_ROOT, GOLDEN_FAMILIES, loadFixture, runFamily } from "./corpus.js";

const SEVERITY_RANK: Record<string, number> = { advisory: 0, minor: 1, major: 2, blocker: 3 };

describe("B4 baseline (recorded expectations; drift here is a regression)", () => {
  it("current corpus and matrix match the recorded baseline", async () => {
    const baseline = JSON.parse(
      await readFile(join(FIXTURES_ROOT, "..", "..", "regression", "baselines", "b4-baseline.json"), "utf8"),
    ) as Record<string, unknown>;
    expect(GOLDEN_FAMILIES.map((f) => f.family)).toEqual(baseline["golden_families"]);
    expect(DEFECT_MATRIX.length).toBe(baseline["defect_cases"]);
    expect(GOLDEN_FAMILIES.filter((f) => f.structure).length).toBe(baseline["structured_families"]);
    expect(DEFECT_MATRIX.length * GOLDEN_FAMILIES.filter((f) => f.structure).length).toBe(baseline["injected_runs"]);
    const results = await Promise.all(GOLDEN_FAMILIES.map(runFamily));
    expect(results.reduce((n, r) => n + r.findings.length, 0)).toBe(baseline["golden_findings_expected"]);
  });
});

describe("B4 golden corpus (owner fixture families through the real layers)", () => {
  for (const family of GOLDEN_FAMILIES) {
    it(`${family.family} canon is clean under the deterministic layers`, async () => {
      const result = await runFamily(family);
      expect(result.findings.map((f) => `${f.check_layer}:${f.description}`)).toEqual([]);
    });
  }
});

describe("B4 defect injection (each seeded violation is caught by its owning layer)", () => {
  for (const family of GOLDEN_FAMILIES.filter((f) => f.structure)) {
    for (const defect of DEFECT_MATRIX) {
      it(`${family.family}: ${defect.id} is caught by ${defect.owningLayer}`, async () => {
        const release = await loadFixture(family.family, family.canonRelease);
        const structure = await loadFixture(family.family, family.structure!);
        const injected = defect.inject(release, structure);
        const releaseSha = contentSha256(canonicalJson(injected.release));
        const structureSha = contentSha256(canonicalJson(injected.structure));
        const findings = [
          ...checkStructural(injected.release, injected.structure, releaseSha, structureSha),
          ...checkTemporalState(injected.release, releaseSha),
        ];
        const caught = findings.filter((f) => f.check_layer === defect.owningLayer);
        expect(caught.length, `defect ${defect.id} escaped`).toBeGreaterThanOrEqual(1);
        const strongest = Math.max(...caught.map((f) => SEVERITY_RANK[f.severity] ?? 0));
        expect(strongest).toBeGreaterThanOrEqual(SEVERITY_RANK[defect.minimumSeverity]!);
      });
    }
  }
});

describe("B4 recorded provider fixtures (regression without live calls)", () => {
  it("replays a recorded fal queue transcript deterministically", async () => {
    const transcript = JSON.parse(
      await readFile(join(FIXTURES_ROOT, "..", "..", "regression", "fixtures", "fal-flux-schnell-queue.json"), "utf8"),
    ) as { steps: { path: string; status: number; body: unknown }[]; imageBase64: string };

    async function replayOnce(): Promise<string> {
      const { createServer } = await import("node:http");
      const image = Buffer.from(transcript.imageBase64, "base64");
      const server = createServer((req, res) => {
        const path = new URL(req.url ?? "/", "http://localhost").pathname;
        if (path === "/image.png") {
          res.writeHead(200, { "content-type": "image/png" });
          return res.end(image);
        }
        const step = transcript.steps.find((s) => path.endsWith(s.path));
        if (!step) {
          res.writeHead(404);
          return res.end("{}");
        }
        const port = (server.address() as { port: number }).port;
        const body = JSON.stringify(step.body).replaceAll("BASE_URL", `http://localhost:${port}`);
        res.writeHead(step.status, { "content-type": "application/json" });
        res.end(body);
      }).listen(0);
      const port = (server.address() as { port: number }).port;
      const adapter = createFalAdapter({ falKey: "fixture-replay-not-a-real-credential", baseUrl: `http://localhost:${port}` });
      const recipeDocument = {
        schema_version: "storyworld.generation-recipe.v1",
        prompt: "the archive at dusk",
        negative_prompt: null,
        seed: 7,
        locked_attributes: [],
        cost_ceiling: { amount: 1, currency: "USD" },
        format_rules: { width: 512, height: 512, num_images: 1 },
      };
      const request = normalizeRecipe(recipeDocument, contentSha256(canonicalJson(recipeDocument)));
      const outcome = await adapter.generate("fal-ai/flux/schnell", request);
      server.close();
      return contentSha256(outcome.candidates[0]!.bytes);
    }

    const first = await replayOnce();
    const second = await replayOnce();
    expect(first).toBe(second);
  });
});
