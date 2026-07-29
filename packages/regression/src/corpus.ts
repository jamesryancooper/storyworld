import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { checkStructural, checkTemporalState, type FindingDraft } from "@storyworld/evaluation";
import { canonicalJson, contentSha256 } from "@storyworld/domain";

/**
 * B4 golden-corpus executor: runs the REAL deterministic continuity layers
 * over the owner's fixture families. Golden documents must come back
 * clean; the defect-injection matrix (defects.ts) must come back caught.
 */

export const FIXTURES_ROOT = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "contracts", "fixtures",
);

export interface CorpusFamily {
  family: string;
  canonRelease: string;
  structure: string | null;
}

export const GOLDEN_FAMILIES: CorpusFamily[] = [
  { family: "stillhouse", canonRelease: "stillhouse-canon-release.instance.json", structure: "stillhouse-structure.instance.json" },
  { family: "editorial", canonRelease: "editorial-canon-release.instance.json", structure: "editorial-structure.instance.json" },
  { family: "bekindrewind", canonRelease: "bkr-canon-release.instance.json", structure: "bkr-structure.instance.json" },
  { family: "commerce", canonRelease: "commerce-canon-release.instance.json", structure: null },
];

export async function loadFixture(family: string, name: string): Promise<Record<string, unknown>> {
  const raw = await readFile(join(FIXTURES_ROOT, family, "records", name), "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
}

export interface CorpusResult {
  family: string;
  releaseSha256: string;
  findings: FindingDraft[];
}

export async function runFamily(entry: CorpusFamily): Promise<CorpusResult> {
  const release = await loadFixture(entry.family, entry.canonRelease);
  const structure = entry.structure
    ? await loadFixture(entry.family, entry.structure)
    : { narrative_units: [], threads: [] };
  const releaseSha256 = contentSha256(canonicalJson(release));
  const structureSha256 = contentSha256(canonicalJson(structure));
  return {
    family: entry.family,
    releaseSha256,
    findings: [
      ...checkStructural(release, structure, releaseSha256, structureSha256),
      ...checkTemporalState(release, releaseSha256),
    ],
  };
}
