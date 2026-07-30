import {
  EngineError,
  type CanonReleaseView,
  type CredentialStatusView,
  type EngineClient,
  type ProviderCatalogView,
  type FindingView,
  type GenerationCandidateView,
  type NarrativeStructureView,
  type ProductionSummary,
  type PropertySummary,
  type ProposalView,
  type ReceiptView,
  type ScenePacketView,
} from "@/lib/engine";

/**
 * In-memory EngineClient double mirroring the Phase 1 contract: receipt
 * ids on every acceptance-class mutation, a contract-complete narrative
 * structure (choices, branches, threads), real supersession checking on
 * the typed unit append (so 409 paths are testable), and per-call
 * idempotency-key capture (so tests can assert key retention).
 */
export function mockEngine(overrides: Partial<EngineClient> = {}): EngineClient & {
  created: { workspaceName: string; propertyName: string; propertyType: string }[];
  saved: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string }[];
  added: { productionId: string; unit: Record<string, unknown>; supersedesRevisionId?: string }[];
  runs: Record<string, unknown>[];
  decisions: Record<string, unknown>[];
  snapshots: Record<string, unknown>[];
  productions: Record<string, unknown>[];
  evaluations: Record<string, unknown>[];
  dispositions: Record<string, unknown>[];
  storedKeys: Record<string, unknown>[];
  revokedKeys: Record<string, unknown>[];
  filed: Record<string, unknown>[];
  commandKeys: { method: string; key: string | undefined }[];
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
  const structureDocument: NarrativeStructureView["document"] = {
    schema_version: "storyworld.narrative-structure.v1",
    structure_id: "st-1",
    property_id: "p-1",
    canon_release_ref: "r-1",
    production_ref: "prod-1",
    narrative_units: [
      { unit_id: "u-1", unit_type: "episode", display_number: "1", presentation_order: 1, story_time: "1989-06-02", publication_time: null, parent_unit_ref: null },
      { unit_id: "u-2", unit_type: "episode", display_number: "2", presentation_order: 2, story_time: "1989-06-01", publication_time: null, parent_unit_ref: null },
    ],
    choices: [
      {
        choice_id: "ch-1",
        at_unit_ref: "u-1",
        prompt: "Open the archive door?",
        options: [
          { option_id: "open", label: "Open it", prerequisites: [], effects: [], leads_to_unit_ref: "u-2", branch_label: "opened" },
          { option_id: "wait", label: "Wait", prerequisites: [], effects: [], leads_to_unit_ref: "u-2", branch_label: "waited" },
        ],
      },
    ],
    branches: [
      { branch_label: "opened", reconverges_at_unit_ref: "u-2", mutually_exclusive_with: ["waited"] },
      { branch_label: "waited", reconverges_at_unit_ref: "u-2", mutually_exclusive_with: ["opened"] },
    ],
    threads: [
      { thread_id: "th-1", thread_type: "mystery", introduced_in_unit_ref: "u-1", resolved_in_unit_ref: null, earliest_permitted_unit_ref: null, depends_on_thread_refs: [] },
    ],
    created_at: "2026-07-28T00:00:00Z",
    content_sha256: "d".repeat(64),
  };
  let structureRevisionId = "sr-1";
  const created: { workspaceName: string; propertyName: string; propertyType: string }[] = [];
  const saved: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string }[] = [];
  const added: { productionId: string; unit: Record<string, unknown>; supersedesRevisionId?: string }[] = [];
  const runs: Record<string, unknown>[] = [];
  const decisions: Record<string, unknown>[] = [];
  const snapshots: Record<string, unknown>[] = [];
  const productions: Record<string, unknown>[] = [];
  const evaluations: Record<string, unknown>[] = [];
  const dispositions: Record<string, unknown>[] = [];
  const storedKeys: Record<string, unknown>[] = [];
  const revokedKeys: Record<string, unknown>[] = [];
  const filed: Record<string, unknown>[] = [];
  const commandKeys: { method: string; key: string | undefined }[] = [];
  return {
    storedKeys,
    revokedKeys,
    filed,
    created,
    saved,
    added,
    runs,
    decisions,
    snapshots,
    productions,
    evaluations,
    dispositions,
    commandKeys,
    async health() {
      return true;
    },
    async listProperties() {
      return properties;
    },
    async createProperty(input, opts) {
      commandKeys.push({ method: "createProperty", key: opts?.idempotencyKey });
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
        ...productions.map((input, index) => ({
          productionId: `prod-${index + 2}`,
          name: String(input["name"]),
          pinnedCanonReleaseId: String(input["pinnedCanonReleaseId"]),
          releaseVersion: "1.0.0",
        })),
      ];
    },
    async latestCanonRelease() {
      return release;
    },
    async getNarrativeStructure(): Promise<NarrativeStructureView | null> {
      return {
        structureRevisionId,
        contentSha256: "d".repeat(64),
        document: structureDocument,
      };
    },
    async saveNarrativeStructure(input, opts) {
      commandKeys.push({ method: "saveNarrativeStructure", key: opts?.idempotencyKey });
      saved.push(input);
      return {
        structureRevisionId: `sr-${saved.length + 1}`,
        contentSha256: "d".repeat(64),
        receiptId: `rcpt-save-${saved.length}`,
      };
    },
    async addNarrativeUnit(input, opts) {
      commandKeys.push({ method: "addNarrativeUnit", key: opts?.idempotencyKey });
      if (input.supersedesRevisionId !== structureRevisionId) {
        throw new EngineError(
          409,
          "stale-conflict",
          `stale supersession for production ${input.productionId}: current structure revision is ${structureRevisionId}; reload the current structure and re-apply the change`,
        );
      }
      added.push(input as never);
      const unitId = `u-new-${added.length}`;
      (structureDocument.narrative_units as Record<string, unknown>[]).push({
        unit_id: unitId,
        unit_type: input.unit.unitType,
        display_number: input.unit.displayNumber ?? null,
        presentation_order: input.unit.presentationOrder,
        story_time: input.unit.storyTime,
        publication_time: input.unit.publicationTime ?? null,
        parent_unit_ref: input.unit.parentUnitRef ?? null,
      });
      structureRevisionId = `sr-${added.length + 1}`;
      return {
        structureRevisionId,
        contentSha256: "d".repeat(64),
        receiptId: `rcpt-arc-${added.length}`,
        unitId,
      };
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
    async runGeneration(input, opts) {
      commandKeys.push({ method: "runGeneration", key: opts?.idempotencyKey });
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
    async proposeCanon(input, opts) {
      commandKeys.push({ method: "proposeCanon", key: opts?.idempotencyKey });
      filed.push(input);
      return { proposalId: `cp-filed-${filed.length}` };
    },
    async listCanonProposals(): Promise<ProposalView[]> {
      return [
        ...filed.map((input, index) => ({
          proposalId: `cp-filed-${index + 1}`,
          branchId: String(input["branchId"]),
          proposalType: String(input["proposalType"]),
          payload: input["payload"] as Record<string, unknown>,
          proposedBy: "ryan-cooper",
          proposerKind: "human",
          createdAt: "2026-07-29T12:00:00.000Z",
          decision: null,
        })),
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
    async decideProposal(input, opts) {
      commandKeys.push({ method: "decideProposal", key: opts?.idempotencyKey });
      decisions.push(input);
      return {
        decisionId: `d-${decisions.length}`,
        revisionId: input.decision === "accepted" ? `rev-${decisions.length}` : null,
        receiptId: `rcpt-dec-${decisions.length}`,
      };
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
    async snapshotCanonRelease(input, opts) {
      commandKeys.push({ method: "snapshotCanonRelease", key: opts?.idempotencyKey });
      snapshots.push(input);
      return {
        canonReleaseId: `r-${snapshots.length + 1}`,
        contentSha256: "e".repeat(64),
        receiptId: `rcpt-rel-${snapshots.length}`,
      };
    },
    async createProduction(input, opts) {
      commandKeys.push({ method: "createProduction", key: opts?.idempotencyKey });
      productions.push(input);
      return { productionId: `prod-${productions.length + 1}`, receiptId: `rcpt-prod-${productions.length}` };
    },
    async runEvaluation(input, opts) {
      commandKeys.push({ method: "runEvaluation", key: opts?.idempotencyKey });
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
          document: {
            description: "Contradictory state: entity:e-1.left_hand at 1989-06-03.",
            confidence: 0.92,
            evidence_refs: ["timeline:1989-06-03", "timeline:1989-06-01"],
            subject_refs: ["entity:e-1"],
            subject_sha256: ["f".repeat(64)],
            suggested_remediation: "Align the state transition at 1989-06-03 with the earlier condition.",
          },
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
    async disposeFinding(input, opts) {
      commandKeys.push({ method: "disposeFinding", key: opts?.idempotencyKey });
      dispositions.push(input);
      return {
        findingRevisionId: `fr-${dispositions.length + 10}`,
        receiptId: `rcpt-fin-${dispositions.length}`,
      };
    },
    async listGenerationProviders(): Promise<ProviderCatalogView[]> {
      return [
        {
          adapterId: "mock",
          label: "mock (deterministic, free)",
          models: [{ id: "mock/deterministic", label: "Deterministic mock", costPerImage: 0 }],
        },
        {
          adapterId: "fal",
          label: "fal.ai (hosted, requires key)",
          models: [
            { id: "fal-ai/flux/schnell", label: "FLUX schnell (fast drafts)", costPerImage: 0.003 },
            { id: "fal-ai/flux/dev", label: "FLUX dev (higher fidelity)", costPerImage: 0.025 },
          ],
        },
      ];
    },
    async listCredentials() {
      const credentials: CredentialStatusView[] = [{
        name: "fal",
        provider: "fal.ai",
        label: "fal.ai key (engine generation)",
        note: "Entering a key opens the hosted-generation reserved crossing.",
        scopes: ["generation"],
        status: storedKeys.length === 0 ? "absent" : revokedKeys.length >= storedKeys.length ? "revoked" : "active",
        hint: storedKeys.length > 0 ? "fal-…89 (20 chars)" : null,
        updatedAt: storedKeys.length > 0 ? "2026-07-29T00:00:00.000Z" : null,
      }];
      return { storeEnabled: true, credentials };
    },
    async setCredential(input, opts) {
      commandKeys.push({ method: "setCredential", key: opts?.idempotencyKey });
      storedKeys.push(input);
      return {
        credentialRevisionId: `cr-set-${storedKeys.length}`,
        hint: "fal-…89 (20 chars)",
        receiptId: `rcpt-cred-${storedKeys.length}`,
      };
    },
    async revokeCredential(input, opts) {
      commandKeys.push({ method: "revokeCredential", key: opts?.idempotencyKey });
      revokedKeys.push(input);
      return { credentialRevisionId: `cr-${revokedKeys.length}`, receiptId: `rcpt-rev-${revokedKeys.length}` };
    },
    async getReceipt(receiptId): Promise<ReceiptView | null> {
      return {
        receiptId,
        actor: "human:ryan-cooper",
        action: "stub.action",
        subjectRef: "stub:subject",
        subjectSha256: null,
        correlationId: "corr-1",
        recordedAt: "2026-07-30T00:00:00.000Z",
        detail: {},
      };
    },
    ...overrides,
  };
}
