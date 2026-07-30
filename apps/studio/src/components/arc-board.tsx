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
  type EngineClient,
  type NarrativeStructureView,
  type ProductionSummary,
} from "@/lib/engine";

const UNIT_TYPES = ["episode", "scene", "chapter", "post", "panel"];

/**
 * The exact subject a consequence review was opened against (SF4). Frozen
 * at open so changing the production selector or editing the form after
 * opening can never retarget the confirmed command.
 */
interface ArcReview {
  opId: string;
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
  const [unitType, setUnitType] = React.useState("episode");
  const [storyTime, setStoryTime] = React.useState("");
  const [review, setReview] = React.useState<ArcReview | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const save = useEngineCommand<{ structureRevisionId: string; receiptId: string; unitId: string }>();
  const receiptRef = React.useRef<string | null>(null);

  const refresh = React.useCallback(async () => {
    if (!production) {
      setStructure(null);
      return;
    }
    setStructure(await engine.getNarrativeStructure(production.productionId));
  }, [engine, production]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  // Changing the production closes any open review (SF4): a frozen review
  // must never be confirmed against a different production than it named.
  React.useEffect(() => {
    setReview(null);
    save.reset();
  }, [production?.productionId, save.reset]);

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
    if (!production || !storyTime) return;
    setNotice(null);
    setReview({
      opId: `arc:${production.productionId}:${structure?.structureRevisionId ?? "root"}`,
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
      // The typed input is cleared only once the command is recorded.
      setStoryTime("");
      setReview(null);
      setNotice(
        outcome === "confirmed"
          ? `Accepted plan revision recorded${receiptRef.current ? ` — receipt ${receiptRef.current}` : ""}.`
          : `Accepted plan revision recorded${receiptRef.current ? ` (receipt ${receiptRef.current})` : ""} — but refreshing the board failed; reload to see current state.`,
      );
      save.reset();
    } else if (outcome === "unknown" || outcome === "unavailable") {
      recordUnknownOutcome({ id: r.opId, actionLabel: "plan revision", subjectLabel: `${r.productionName} structure` });
    }
  }

  async function onConfirm(): Promise<void> {
    const r = review;
    if (!r) return;
    receiptRef.current = null;
    const outcome = await save.run(
      {
        execute: async (idempotencyKey) => {
          const out = await engine.addNarrativeUnit(
            {
              productionId: r.productionId,
              unit: { unitType: r.unitType, presentationOrder: r.presentationOrder, storyTime: r.storyTime },
              ...(r.supersedesRevisionId ? { supersedesRevisionId: r.supersedesRevisionId } : {}),
            },
            { idempotencyKey },
          );
          receiptRef.current = out.receiptId;
          return out;
        },
        refresh,
      },
      r.opId,
    );
    finalizeAdd(outcome, r);
  }

  const failure = describeCommandFailure(save.status, save.error);

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

          <Card>
            <CardHeader>
              <CardTitle>Add unit</CardTitle>
              <CardDescription>
                Direct authoring mode (DEC-0020): saving records an accepted
                plan revision after review, superseding the current one.
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
                  <Button type="submit" disabled={!storyTime}>
                    Add unit
                  </Button>
                ) : null}
              </form>
              {review ? (
                <div className="mt-4 flex flex-col gap-2">
                  <ConsequenceReview
                    id="arc-review"
                    title="Review — accept this plan revision"
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
                          "Records an accepted plan revision (structure.accepted). Everything else in the structure — choices, branches, threads, bindings — is preserved exactly.",
                      },
                    ]}
                    confirmLabel="Save as accepted revision"
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
                          void refresh().then(() => {
                            setReview(null);
                            save.reset();
                          });
                        }}
                      >
                        Reload structure
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
      )}
    </div>
  );
}
