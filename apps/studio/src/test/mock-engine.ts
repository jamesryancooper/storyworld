import type {
  CanonReleaseView,
  EngineClient,
  ProductionSummary,
  PropertySummary,
} from "@/lib/engine";

export function mockEngine(overrides: Partial<EngineClient> = {}): EngineClient & {
  created: { workspaceName: string; propertyName: string; propertyType: string }[];
} {
  const properties: PropertySummary[] = [
    {
      propertyId: "p-1",
      name: "Stillhouse",
      propertyType: "fictional",
      officialBranchId: "b-1",
      createdAt: "2026-07-28T00:00:00.000Z",
    },
  ];
  const release: CanonReleaseView = {
    canonReleaseId: "r-1",
    releaseName: "stillhouse-canon",
    releaseVersion: "1.0.0",
    contentSha256: "a".repeat(64),
    document: {
      entities: [
        { entity_id: "e-1", entity_type: "character", name: "Mara" },
        { entity_id: "e-2", entity_type: "location", name: "The Archive" },
      ],
      timeline_events: [
        { event_id: "t-1", story_time: "1989-06-01", summary: "Mara finds the archive" },
      ],
    },
  };
  const created: { workspaceName: string; propertyName: string; propertyType: string }[] = [];
  return {
    created,
    async health() {
      return true;
    },
    async listProperties() {
      return properties;
    },
    async createProperty(input) {
      created.push(input);
      return { propertyId: `p-${created.length + 1}` };
    },
    async listProductions(): Promise<ProductionSummary[]> {
      return [];
    },
    async latestCanonRelease() {
      return release;
    },
    ...overrides,
  };
}
