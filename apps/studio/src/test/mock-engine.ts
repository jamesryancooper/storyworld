import type {
  CanonReleaseView,
  EngineClient,
  GenerationCandidateView,
  NarrativeStructureView,
  ProductionSummary,
  PropertySummary,
  ScenePacketView,
} from "@/lib/engine";

export function mockEngine(overrides: Partial<EngineClient> = {}): EngineClient & {
  created: { workspaceName: string; propertyName: string; propertyType: string }[];
  saved: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string }[];
  runs: Record<string, unknown>[];
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
  const saved: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string }[] = [];
  const runs: Record<string, unknown>[] = [];
  return {
    created,
    saved,
    runs,
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
      return [
        {
          productionId: "prod-1",
          name: "Season One",
          pinnedCanonReleaseId: "r-1",
          releaseVersion: "1.0.0",
        },
      ];
    },
    async latestCanonRelease() {
      return release;
    },
    async getNarrativeStructure(): Promise<NarrativeStructureView | null> {
      return {
        structureRevisionId: "sr-1",
        document: {
          schema_version: "storyworld.narrative-structure.v1",
          structure_id: "st-1",
          narrative_units: [
            { unit_id: "u-1", unit_type: "episode", presentation_order: 1, story_time: "1989-06-02" },
            { unit_id: "u-2", unit_type: "episode", presentation_order: 2, story_time: "1989-06-01" },
          ],
          threads: [{ thread_id: "th-1", thread_type: "mystery" }],
        },
      };
    },
    async saveNarrativeStructure(input) {
      saved.push(input);
      return { structureRevisionId: `sr-${saved.length + 1}` };
    },
    async getScenePacket(): Promise<ScenePacketView> {
      return {
        packet_id: "pk-1",
        scene_ref: "u-1",
        story_time: "1989-06-02",
        entering_state_summary: "Computed state at story time 1989-06-02 from 1 timeline event(s).",
        entity_states: [{ entity_ref: "entity:e-1", state: { location: "the archive" } }],
        active_threads: [{ thread_ref: "th-1", thread_type: "mystery" }],
        content_sha256: "b".repeat(64),
      };
    },
    async runGeneration(input) {
      runs.push(input);
      return { generationRunId: "11111111-run", candidateAssetVersionIds: ["av-1"] };
    },
    async listGenerationCandidates(): Promise<GenerationCandidateView[]> {
      return [
        {
          assetVersionId: "av-1",
          contentSha256: "c".repeat(64),
          state: "candidate",
          createdAt: "2026-07-28T00:00:00.000Z",
          generationRunId: "11111111-run",
          provenance: {
            provider: "mock",
            endpoint: "mock/deterministic",
            seed: 7,
            latency_ms: 3,
            locked_attributes: ["character:mara:appearance"],
          },
        },
      ];
    },
    ...overrides,
  };
}
