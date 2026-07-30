"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsequenceReview } from "@/components/ui/consequence-review";
import { Input } from "@/components/ui/input";
import { InfoHint } from "@/components/ui/info-hint";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CommandRecovery } from "@/components/ui/command-recovery";
import { ProductionPicker } from "@/components/production-picker";
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import { clearUnknownOutcome, recordUnknownOutcome } from "@/lib/unknown-outcome-log";
import {
  actorLine,
  createEngineClient,
  type AuthoringMode,
  type EngineClient,
  type NarrativeStructureView,
  type ProductionSummary,
} from "@/lib/engine";

const UNIT_TYPES = ["episode", "scene", "chapter", "post", "panel"];

/**
 * The exact subject a consequence review was opened against (SF4). Frozen
 * at open — including the authoring mode — so changing the production
 * selector, flipping the mode, or editing the form after opening can never
 * retarget the confirmed command.
 */
interface ArcReview {
  opId: string;
  mode: AuthoringMode;
  productionId: string;
  productionName: string;
  supersedesRevisionId?: string;
  currentHash: string | null;
  unitType: string;
  storyTime: string;
  presentationOrder: number;
}

export function ArcBoard({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [production, setProduction] = React.useState<ProductionSummary | null>(null);
  const [structure, setStructure] = React.useState<NarrativeStructureView | null>(null);
  const [mode, setMode] = React.useState<AuthoringMode | null>(null);
  const [unitType, setUnitType] = React.useState("episode");
  const [storyTime, setStoryTime] = React.useState("");
  const [review, setReview] = React.useState<ArcReview | null>(null);
  const [modeReview, setModeReview] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const save = useEngineCommand<{ receiptId?: string; proposalId?: string; structureRevisionId?: string }>();
  const modeCmd = useEngineCommand<{ mode: AuthoringMode; from: AuthoringMode; receiptId: string }>();
  const resultRef = React.useRef<string | null>(null);

  const propertyId = production?.propertyId ?? null;

  const refresh = React.useCallback(async () => {
    if (!production) {
      setStructure(null);
      return;
    }
    setStructure(await engine.getNarrativeStructure(production.productionId));
  }, [engine, production]);

  const refreshMode = React.useCallback(async () => {
    if (!propertyId) {
      setMode(null);
      return;
    }
    setMode((await engine.getAuthoringMode(propertyId)).mode);
  }, [engine, propertyId]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  React.useEffect(() => {
    void refreshMode();
  }, [refreshMode]);

  // Changing the production closes any open review (SF4): a frozen review
  // must never be confirmed against a different production than it named.
  React.useEffect(() => {
    setReview(null);
    setModeReview(false);
    save.reset();
    modeCmd.reset();
  }, [production?.productionId, save.reset, modeCmd.reset]);

  const units = React.useMemo(
    () =>
      [...((structure?.document.narrative_units ?? []) as Record<string, unknown>[])].sort(
        (a, b) => Number(a["presentation_order"] ?? 0) - Number(b["presentation_order"] ?? 0),
      ),
    [structure],
  );
  const threads = (structure?.document.threads ?? []) as Record<string, unknown>[];
  const nextOrder = units.length + 1;

  function onOpenReview(event: React.FormEvent): void {
    event.preventDefault();
    if (!production || !storyTime || !mode) return;
    setNotice(null);
    setReview({
      opId: `arc:${production.productionId}:${mode}:${structure?.structureRevisionId ?? "root"}`,
      mode,
      productionId: production.productionId,
      productionName: production.name,
      ...(structure ? { supersedesRevisionId: structure.structureRevisionId } : {}),
      currentHash: structure ? structure.contentSha256 : null,
      unitType,
      storyTime,
      presentationOrder: nextOrder,
    });
  }

  function finalizeAdd(outcome: string, r: ArcReview): void {
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      clearUnknownOutcome(r.opId);
      setStoryTime("");
      setReview(null);
      const recorded =
        r.mode === "queued"
          ? `Submitted for review${resultRef.current ? ` (proposal ${resultRef.current})` : ""} — it waits in the Review Room until you decide it.`
          : `Accepted plan revision recorded${resultRef.current ? ` — receipt ${resultRef.current}` : ""}.`;
      setNotice(
        outcome === "refresh_failed"
          ? `${recorded} — but refreshing the board failed; reload to see current state.`
          : recorded,
      );
      save.reset();
    } else if (outcome === "unknown" || outcome === "unavailable") {
      recordUnknownOutcome({
        id: r.opId,
        actionLabel: r.mode === "queued" ? "structure proposal" : "plan revision",
        subjectLabel: `${r.productionName} structure`,
      });
    }
  }

  async function onConfirm(): Promise<void> {
    const r = review;
    if (!r) return;
    resultRef.current = null;
    const outcome = await save.run(
      {
        execute: async (idempotencyKey) => {
          const unit = { unitType: r.unitType, presentationOrder: r.presentationOrder, storyTime: r.storyTime };
          const supersedes = r.supersedesRevisionId ? { supersedesRevisionId: r.supersedesRevisionId } : {};
          if (r.mode === "queued") {
            const out = await engine.submitStructureProposal(
              { productionId: r.productionId, unit, ...supersedes },
              { idempotencyKey },
            );
            resultRef.current = out.proposalId;
            return { proposalId: out.proposalId };
          }
          const out = await engine.addNarrativeUnit(
            { productionId: r.productionId, unit, ...supersedes },
            { idempotencyKey },
          );
          resultRef.current = out.receiptId;
          return { receiptId: out.receiptId, structureRevisionId: out.structureRevisionId };
        },
        refresh,
      },
      r.opId,
    );
    finalizeAdd(outcome, r);
  }

  async function onConfirmMode(): Promise<void> {
    if (!propertyId || !mode) return;
    const target: AuthoringMode = mode === "direct" ? "queued" : "direct";
    const outcome = await modeCmd.run(
      {
        execute: (idempotencyKey) => engine.setAuthoringMode({ propertyId, mode: target }, { idempotencyKey }),
        refresh: refreshMode,
      },
      `mode:${propertyId}:${target}`,
    );
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      setModeReview(false);
      setMode(target);
      setNotice(`Authoring mode for this property is now ${target}.`);
      modeCmd.reset();
    }
  }

  const failure = describeCommandFailure(save.status, save.error);
  const modeFailure = describeCommandFailure(modeCmd.status, modeCmd.error);
  const nextMode: AuthoringMode = mode === "direct" ? "queued" : "direct";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Arc Board</h1>
        {production ? <Badge variant="outline">pinned canon v{production.releaseVersion}</Badge> : null}
      </div>

      <ProductionPicker engine={engine} onProduction={setProduction} />

      {!production ? (
        <p className="text-sm text-muted-foreground">
          Select a production — its narrative structure is revisioned, never edited in place.
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Narrative units</CardTitle>
              <CardDescription>
                Presentation order and story time are independent — nonlinear
                presentation never changes derived state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {units.length === 0 ? (
                <p className="text-sm text-muted-foreground">No units yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Story time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {units.map((unit) => (
                      <TableRow key={String(unit["unit_id"])}>
                        <TableCell>{String(unit["presentation_order"])}</TableCell>
                        <TableCell>
                          <Badge variant="muted">{String(unit["unit_type"])}</Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{String(unit["story_time"] ?? "—")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {threads.length > 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  {threads.length} narrative thread(s) tracked on this structure.
                </p>
              ) : null}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authoring mode</CardTitle>
                <CardDescription>
                  Per property (DEC-0020). Direct mode records accepted plan
                  revisions; queued mode sends them to the Review Room to decide.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Current:</span>
                  <Badge variant="muted">{mode ?? "…"}</Badge>
                  {mode && !modeReview ? (
                    <Button
                      size="sm"
                      variant="outline"
                      aria-expanded={modeReview}
                      onClick={() => {
                        setNotice(null);
                        setModeReview(true);
                      }}
                    >
                      Switch to {nextMode}
                    </Button>
                  ) : null}
                </div>
                {modeReview && mode && propertyId ? (
                  <div className="mt-4 flex flex-col gap-2">
                    <ConsequenceReview
                      id="arc-mode-review"
                      title="Review — change authoring mode"
                      rows={[
                        { label: "Property", value: production.name },
                        { label: "Change", value: `${mode} → ${nextMode}` },
                        { label: "Recorded by", value: actorLine() },
                        {
                          label: "Effect",
                          value:
                            "Changes how Arc saves for this property are recorded, receipted as structure.authoring_mode.changed. No existing structure changes.",
                        },
                      ]}
                      confirmLabel="Change authoring mode"
                      onConfirm={() => void onConfirmMode()}
                      onCancel={() => {
                        setModeReview(false);
                        modeCmd.reset();
                      }}
                      busy={modeCmd.status === "submitting"}
                    />
                    {modeFailure ? <p className="text-sm text-destructive">{modeFailure}</p> : null}
                    <CommandRecovery
                      status={modeCmd.status}
                      onRetry={() => void modeCmd.retry().then((outcome) => {
                        if (outcome === "confirmed" || outcome === "refresh_failed") {
                          setModeReview(false);
                          setMode(nextMode);
                          modeCmd.reset();
                        }
                      })}
                      onCheckStatus={() => void refreshMode()}
                    />
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add unit</CardTitle>
                <CardDescription>
                  {mode === "queued"
                    ? "Queued authoring mode (DEC-0020): submitting sends this unit to the Review Room; nothing changes the accepted plan until it is accepted there."
                    : "Direct authoring mode (DEC-0020): saving records an accepted plan revision after review, superseding the current one."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onOpenReview} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <Label htmlFor="unit-type">Unit type</Label>
                      <InfoHint
                        id="hint-unit-type"
                        text="The granularity of this narrative unit: a full episode, a single scene, a chapter, a social post, or a comic panel."
                      />
                    </span>
                    <Select
                      id="unit-type"
                      value={unitType}
                      onChange={(event) => setUnitType(event.target.value)}
                    >
                      {UNIT_TYPES.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <Label htmlFor="unit-story-time">Story time</Label>
                      <InfoHint
                        id="hint-story-time"
                        text="When this unit happens inside the story's own chronology (e.g. 2031-04-05) — independent of the order you present units in. The world's state at a scene is derived from story time, so flashbacks and nonlinear cuts stay consistent."
                      />
                    </span>
                    <Input
                      id="unit-story-time"
                      value={storyTime}
                      onChange={(event) => setStoryTime(event.target.value)}
                      placeholder="1989-06-01"
                    />
                  </div>
                  {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
                  {!review ? (
                    <Button type="submit" disabled={!storyTime || !mode}>
                      {mode === "queued" ? "Submit for review" : "Add unit"}
                    </Button>
                  ) : null}
                </form>
                {review ? (
                  <div className="mt-4 flex flex-col gap-2">
                    <ConsequenceReview
                      id="arc-review"
                      title={review.mode === "queued" ? "Review — submit this plan revision" : "Review — accept this plan revision"}
                      rows={[
                        { label: "Production", value: review.productionName },
                        { label: "Unit", value: `${review.unitType} · story time ${review.storyTime} · presentation order ${review.presentationOrder}` },
                        {
                          label: "Supersedes",
                          value: review.supersedesRevisionId
                            ? `revision ${review.supersedesRevisionId}`
                            : "none — this is the first structure revision",
                        },
                        {
                          label: "Current hash",
                          value: review.currentHash ? review.currentHash.slice(0, 12) : "—",
                        },
                        { label: "Recorded by", value: actorLine() },
                        {
                          label: "Effect",
                          value:
                            review.mode === "queued"
                              ? "Submits a structure proposal (no accepted-plan change until it is accepted in the Review Room). Choices, branches, threads, and bindings are preserved exactly."
                              : "Records an accepted plan revision (structure.accepted). Everything else in the structure — choices, branches, threads, bindings — is preserved exactly.",
                        },
                      ]}
                      confirmLabel={review.mode === "queued" ? "Submit for review" : "Save as accepted revision"}
                      onConfirm={() => void onConfirm()}
                      onCancel={() => {
                        setReview(null);
                        save.reset();
                      }}
                      busy={save.status === "submitting"}
                    />
                    {failure ? <p className="text-sm text-destructive">{failure}</p> : null}
                    {save.status === "conflict" ? (
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            void Promise.all([refresh(), refreshMode()]).then(() => {
                              setReview(null);
                              save.reset();
                            });
                          }}
                        >
                          Reload mode &amp; structure
                        </Button>
                      </div>
                    ) : null}
                    <CommandRecovery
                      status={save.status}
                      onRetry={() => void save.retry().then((outcome) => finalizeAdd(outcome, review))}
                      onCheckStatus={() => {
                        void refresh();
                        setNotice("Board refetched — compare the current structure before retrying.");
                      }}
                    />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
