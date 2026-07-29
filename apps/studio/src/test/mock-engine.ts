import type {
  CanonReleaseView,
  EngineClient,
  FindingView,
  GenerationCandidateView,
  NarrativeStructureView,
  ProductionSummary,
  PropertySummary,
  ProposalView,
  ScenePacketView,
} from "@/lib/engine";

export function mockEngine(overrides: Partial<EngineClient> = {}): EngineClient & {
  created: { workspaceName: string; propertyName: string; propertyType: string }[];
  saved: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string }[];
  runs: Record<string, unknown>[];
  decisions: Record<string, unknown>[];
  snapshots: Record<string, unknown>[];
  productions: Record<string, unknown>[];
  evaluations: Record<string, unknown>[];
  dispositions: Record<string, unknown>[];
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
  const decisions: Record<string, unknown>[] = [];
  const snapshots: Record<string, unknown>[] = [];
  const productions: Record<string, unknown>[] = [];
  const evaluations: Record<string, unknown>[] = [];
  const dispositions: Record<string, unknown>[] = [];
  return {
    created,
    saved,
    runs,
    decisions,
    snapshots,
    productions,
    evaluations,
    dispositions,
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
    async listCanonProposals(): Promise<ProposalView[]> {
      return [
        {
          proposalId: "cp-1",
          branchId: "b-1",
          proposalType: "entity",
          payload: { entity_id: "e-9", entity_type: "character", name: "The Archivist" },
          proposedBy: "extraction-model",
          proposerKind: "model",
          createdAt: "2026-07-28T00:00:00.000Z",
          decision: null,
        },
        {
          proposalId: "cp-0",
          branchId: "b-1",
          proposalType: "entity",
          payload: { entity_id: "e-1", entity_type: "character", name: "Mara" },
          proposedBy: "ryan-cooper",
          proposerKind: "human",
          createdAt: "2026-07-27T00:00:00.000Z",
          decision: "accepted",
        },
      ];
    },
    async decideProposal(input) {
      decisions.push(input);
      return { decisionId: `d-${decisions.length}` };
    },
    async listCanonReleases() {
      return [
        {
          canonReleaseId: "r-1",
          releaseName: "stillhouse-canon",
          releaseVersion: "1.0.0",
          contentSha256: "a".repeat(64),
          createdAt: "2026-07-28T00:00:00.000Z",
          supersedesReleaseId: null,
        },
      ];
    },
    async snapshotCanonRelease(input) {
      snapshots.push(input);
      return { canonReleaseId: `r-${snapshots.length + 1}` };
    },
    async createProduction(input) {
      productions.push(input);
      return { productionId: `prod-${productions.length + 1}` };
    },
    async runEvaluation(input) {
      evaluations.push(input);
      return { findings: [{ findingId: "f-new", document: { severity: "advisory" } }] };
    },
    async listContinuityFindings(): Promise<FindingView[]> {
      return [
        {
          findingId: "f-1",
          findingRevisionId: "fr-1",
          checkLayer: "temporal_state",
          severity: "blocker",
          disposition: "open",
          document: { description: "Contradictory state: entity:e-1.left_hand at 1989-06-03." },
          createdAt: "2026-07-28T00:00:00.000Z",
        },
        {
          findingId: "f-2",
          findingRevisionId: "fr-2",
          checkLayer: "narrative",
          severity: "advisory",
          disposition: "resolved",
          document: { description: "Scene enters with no established state." },
          createdAt: "2026-07-28T00:00:00.000Z",
        },
      ];
    },
    async disposeFinding(input) {
      dispositions.push(input);
      return { findingRevisionId: `fr-${dispositions.length + 10}` };
    },
    ...overrides,
  };
}
