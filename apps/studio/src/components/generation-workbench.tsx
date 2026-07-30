"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InfoHint } from "@/components/ui/info-hint";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
import { ProductionPicker } from "@/components/production-picker";
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import {
  createEngineClient,
  type EngineClient,
  type GenerationCandidateView,
  type ProductionSummary,
  type ProviderCatalogView,
  type ScenePacketView,
} from "@/lib/engine";

export function GenerationWorkbench({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [production, setProduction] = React.useState<ProductionSummary | null>(null);
  const [units, setUnits] = React.useState<Record<string, unknown>[]>([]);
  const [unitId, setUnitId] = React.useState("");
  const [packet, setPacket] = React.useState<ScenePacketView | null>(null);
  const [candidates, setCandidates] = React.useState<GenerationCandidateView[]>([]);
  const [prompt, setPrompt] = React.useState("");
  const [locked, setLocked] = React.useState("");
  const [seed, setSeed] = React.useState("7");
  const [adapterId, setAdapterId] = React.useState<"mock" | "fal">("mock");
  const [providers, setProviders] = React.useState<ProviderCatalogView[]>([]);
  const [modelId, setModelId] = React.useState("");
  const [notice, setNotice] = React.useState<string | null>(null);
  const [candidatesLoaded, setCandidatesLoaded] = React.useState(false);
  const generate = useEngineCommand<{ generationRunId: string; candidateAssetVersionIds: string[] }>();

  React.useEffect(() => {
    void (async () => {
      try {
        setCandidates(await engine.listGenerationCandidates());
      } finally {
        setCandidatesLoaded(true);
      }
    })();
    void (async () => setProviders(await engine.listGenerationProviders()))();
  }, [engine]);

  const activeProvider = providers.find((p) => p.adapterId === adapterId) ?? null;

  React.useEffect(() => {
    const first = providers.find((p) => p.adapterId === adapterId)?.models[0];
    setModelId(first?.id ?? "");
  }, [providers, adapterId]);

  React.useEffect(() => {
    setPacket(null);
    setUnits([]);
    setUnitId("");
    if (!production) return;
    void (async () => {
      const structure = await engine.getNarrativeStructure(production.productionId);
      const list = (structure?.document.narrative_units ?? []) as Record<string, unknown>[];
      setUnits(list);
      if (list.length > 0) setUnitId(String(list[0]!["unit_id"]));
    })();
  }, [engine, production]);

  React.useEffect(() => {
    setPacket(null);
    if (!production || !unitId) return;
    void (async () => {
      setPacket(await engine.getScenePacket(production.productionId, unitId));
    })();
  }, [engine, production, unitId]);

  async function onGenerate(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!production || !unitId || !prompt.trim()) return;
    setNotice(null);
    let staged: { generationRunId: string; candidateAssetVersionIds: string[] } | null = null;
    const outcome = await generate.run({
      execute: async (idempotencyKey) => {
        const run = await engine.runGeneration(
          {
            productionId: production.productionId,
            unitId,
            prompt: prompt.trim(),
            scenePurpose: "studio workbench",
            emotionalObjective: "as directed",
            lockedAttributes: locked
              .split(",")
              .map((value) => value.trim())
              .filter(Boolean),
            seed: Number(seed) || 1,
            adapterId,
            ...(modelId ? { endpoint: modelId } : {}),
          },
          { idempotencyKey },
        );
        staged = run;
        return run;
      },
      refresh: async () => {
        setCandidates(await engine.listGenerationCandidates());
      },
    });
    if (staged && (outcome === "confirmed" || outcome === "refresh_failed")) {
      const run = staged as { generationRunId: string; candidateAssetVersionIds: string[] };
      const refreshWarning =
        outcome === "refresh_failed" ? " (refreshing the list failed; reload to see them)" : "";
      setNotice(
        `Staged ${run.candidateAssetVersionIds.length} candidate(s) — run ${run.generationRunId.slice(0, 8)}${refreshWarning}`,
      );
      generate.reset();
    }
  }

  const generateFailure = describeCommandFailure(generate.status, generate.error);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Generation Workbench</h1>
        {production ? <Badge variant="outline">pinned canon v{production.releaseVersion}</Badge> : null}
      </div>

      <ProductionPicker engine={engine} onProduction={setProduction} />

      {production && units.length > 0 ? (
        <div className="max-w-sm">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gw-unit">Narrative unit</Label>
            <Select id="gw-unit" value={unitId} onChange={(event) => setUnitId(event.target.value)}>
              {units.map((unit) => (
                <option key={String(unit["unit_id"])} value={String(unit["unit_id"])}>
                  #{String(unit["presentation_order"])} {String(unit["unit_type"])} · {String(unit["story_time"])}
                </option>
              ))}
            </Select>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scene state packet</CardTitle>
            <CardDescription>
              Derived from the pinned canon at the unit&apos;s story time — the
              generation contract&apos;s ground truth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!packet ? (
              <p className="text-sm text-muted-foreground">Select a production and unit.</p>
            ) : (
              <div className="flex flex-col gap-3 text-sm">
                <p>{packet.entering_state_summary}</p>
                {packet.entity_states.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Entity</TableHead>
                        <TableHead>State</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {packet.entity_states.map((entry) => (
                        <TableRow key={entry.entity_ref}>
                          <TableCell className="font-medium">{entry.entity_ref}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {Object.entries(entry.state)
                              .map(([attribute, value]) => `${attribute}=${String(value)}`)
                              .join(", ")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No entity state at this story time.</p>
                )}
                <p className="text-xs text-muted-foreground">
                  packet {packet.content_sha256.slice(0, 12)} · {packet.active_threads.length} active thread(s)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generate</CardTitle>
            <CardDescription>
              Runs through the governed gateway: budget-checked, receipted,
              transactionally staged. Hosted providers only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onGenerate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="gw-prompt">Prompt</Label>
                <Input
                  id="gw-prompt"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="the archive at dusk"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5">
                  <Label htmlFor="gw-locked">Locked attributes (comma-separated)</Label>
                  <InfoHint
                    id="hint-locked"
                    text="Canonical details generation must not change — e.g. character:mara:appearance. They travel with every recipe and are stamped into each candidate's provenance receipt."
                  />
                </span>
                <Input
                  id="gw-locked"
                  value={locked}
                  onChange={(event) => setLocked(event.target.value)}
                  placeholder="character:mara:appearance"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex w-28 flex-col gap-1.5">
                  <span className="flex items-center gap-1.5">
                    <Label htmlFor="gw-seed">Seed</Label>
                    <InfoHint
                      id="hint-seed"
                      text="Fixes the provider's randomness: the same recipe with the same seed reproduces the same image. Change it to explore variations."
                    />
                  </span>
                  <Input
                    id="gw-seed"
                    inputMode="numeric"
                    value={seed}
                    onChange={(event) => setSeed(event.target.value)}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <Label htmlFor="gw-adapter">Provider</Label>
                  <Select
                    id="gw-adapter"
                    value={adapterId}
                    onChange={(event) => setAdapterId(event.target.value as "mock" | "fal")}
                  >
                    <option value="mock">mock (deterministic)</option>
                    <option value="fal">fal.ai (requires operator key)</option>
                  </Select>
                </div>
              </div>
              {adapterId === "fal" && activeProvider ? (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="gw-model">Model</Label>
                  <Select id="gw-model" value={modelId} onChange={(event) => setModelId(event.target.value)}>
                    {activeProvider.models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.label} · ~${model.costPerImage.toFixed(3)}/image
                      </option>
                    ))}
                  </Select>
                </div>
              ) : null}
              {generateFailure ? <StatusMessage variant="error">{generateFailure}</StatusMessage> : null}
              {notice ? <StatusMessage variant="notice">{notice}</StatusMessage> : null}
              <Button
                type="submit"
                disabled={generate.status === "submitting" || !production || !unitId || !prompt.trim()}
              >
                {generate.status === "submitting" ? "Generating…" : "Generate candidates"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staged candidates</CardTitle>
          <CardDescription>
            Every candidate is quarantined with full provenance until a human
            accepts an exact version.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!candidatesLoaded ? (
            <Loading rows={2} />
          ) : candidates.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing staged yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Seed</TableHead>
                  <TableHead>Latency</TableHead>
                  <TableHead>Locked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.assetVersionId}>
                    <TableCell className="font-mono text-xs">{candidate.contentSha256.slice(0, 12)}</TableCell>
                    <TableCell>
                      <Badge variant="muted">
                        {String(candidate.provenance.provider ?? "?")} · {String(candidate.provenance.endpoint ?? "?")}
                      </Badge>
                    </TableCell>
                    <TableCell>{String(candidate.provenance.seed ?? "—")}</TableCell>
                    <TableCell>
                      {typeof candidate.provenance.latency_ms === "number"
                        ? `${candidate.provenance.latency_ms} ms`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {(candidate.provenance.locked_attributes ?? []).join(", ") || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
