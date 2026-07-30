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
import { CommandRecovery } from "@/components/ui/command-recovery";
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
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
  const [structureLoaded, setStructureLoaded] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);
  const [mode, setMode] = React.useState<AuthoringMode | null>(null);
  const [unitType, setUnitType] = React.useState("episode");
  const [storyTime, setStoryTime] = React.useState("");
  const [review, setReview] = React.useState<ArcReview | null>(null);
  const [modeReview, setModeReview] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [selectedUnitId, setSelectedUnitId] = React.useState<string | null>(null);
  const save = useEngineCommand<{ receiptId?: string; proposalId?: string; structureRevisionId?: string }>();
  const modeCmd = useEngineCommand<{ mode: AuthoringMode; from: AuthoringMode; receiptId: string }>();
  const resultRef = React.useRef<string | null>(null);

  const propertyId = production?.propertyId ?? null;

  // refresh stays throwing so the command state machine can detect a
  // post-mutation refresh failure (SF3); the mount effect below wraps it to
  // drive the loading/unavailable states (SWUX-009).
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
    void refresh().then(
      () => {
        setUnavailable(false);
        setStructureLoaded(true);
      },
      () => {
        setUnavailable(true);
        setStructureLoaded(true);
      },
    );
  }, [refresh]);

  React.useEffect(() => {
    void refreshMode();
  }, [refreshMode]);

  // Changing the production closes any open review (SF4): a frozen review
  // must never be confirmed against a different production than it named.
  React.useEffect(() => {
    setReview(null);
    setModeReview(false);
    setStructureLoaded(false);
    setSelectedUnitId(null);
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
  const choices = (structure?.document.choices ?? []) as Record<string, unknown>[];
  const branches = (structure?.document.branches ?? []) as Record<string, unknown>[];
  const nextOrder = units.length + 1;

  // Episode-grouped structured view (SWUX-012; DEC-0024). Units are grouped
  // by parent_unit_ref: any unit referenced as a parent heads a group with
  // its children nested; every remaining unit (null or dangling parent) is
  // shown in an explicit "Unparented" group so none is dropped. This is the
  // graph's synchronized structured substrate — never an inferred canvas.
  const unitsById = React.useMemo(
    () => new Map(units.map((u) => [String(u["unit_id"]), u])),
    [units],
  );
  const parentIds = React.useMemo(
    () =>
      new Set(
        units
          .map((u) => u["parent_unit_ref"])
          .filter((p): p is string => typeof p === "string" && unitsById.has(p)),
      ),
    [units, unitsById],
  );
  const byOrder = (a: Record<string, unknown>, b: Record<string, unknown>) =>
    Number(a["presentation_order"] ?? 0) - Number(b["presentation_order"] ?? 0);
  const parentGroups = React.useMemo(
    () =>
      units
        .filter((u) => parentIds.has(String(u["unit_id"])))
        .sort(byOrder)
        .map((parent) => ({
          parent,
          children: units
            .filter((u) => u["parent_unit_ref"] === parent["unit_id"])
            .sort(byOrder),
        })),
    [units, parentIds],
  );
  const unparented = React.useMemo(
    () =>
      units
        .filter((u) => {
          if (parentIds.has(String(u["unit_id"]))) return false;
          const parent = u["parent_unit_ref"];
          return parent == null || !unitsById.has(String(parent));
        })
        .sort(byOrder),
    [units, parentIds, unitsById],
  );

  const selectedUnit = selectedUnitId ? unitsById.get(selectedUnitId) ?? null : null;
  const relatedChoices = choices.filter(
    (choice) =>
      choice["at_unit_ref"] === selectedUnitId ||
      ((choice["options"] as Record<string, unknown>[] | undefined) ?? []).some(
        (option) => option["leads_to_unit_ref"] === selectedUnitId,
      ),
  );
  const relatedBranches = branches.filter((branch) => {
    const opts = choices
      .flatMap((choice) => (choice["options"] as Record<string, unknown>[] | undefined) ?? [])
      .filter((option) => option["leads_to_unit_ref"] === selectedUnitId)
      .map((option) => option["branch_label"]);
    return opts.includes(branch["branch_label"]);
  });

  function unitLabel(unit: Record<string, unknown>): string {
    const display = unit["display_number"] ? ` ${String(unit["display_number"])}` : "";
    return `${String(unit["unit_type"])}${display}`;
  }

  function refLabel(ref: unknown): string {
    const unit = unitsById.get(String(ref));
    return unit ? `${unitLabel(unit)} · story ${String(unit["story_time"] ?? "?")}` : String(ref);
  }

  // A unit is a view-only, keyboard-operable selection target: selecting it
  // only opens the inspector (no Engine effect, SWUX-012). aria-pressed
  // reflects selection so the table and inspector stay synchronized.
  function renderUnit(unit: Record<string, unknown>, isHeading: boolean): React.JSX.Element {
    const id = String(unit["unit_id"]);
    const selected = selectedUnitId === id;
    return (
      <button
        key={id}
        type="button"
        aria-pressed={selected}
        onClick={() => setSelectedUnitId(selected ? null : id)}
        className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-lg px-2 py-1.5 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          selected ? "bg-muted ring-1 ring-ring" : "hover:bg-muted"
        }`}
      >
        <span className="tabular-nums text-muted-foreground">{String(unit["presentation_order"] ?? "—")}</span>
        <span className="min-w-0 truncate">
          <Badge variant={isHeading ? "default" : "muted"}>{unitLabel(unit)}</Badge>
        </span>
        <span className="whitespace-nowrap text-muted-foreground">{String(unit["story_time"] ?? "—")}</span>
      </button>
    );
  }

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
        <h1 className="text-2xl font-semibold tracking-tight">Arc Board</h1>
        {production ? <Badge variant="outline">pinned canon v{production.releaseVersion}</Badge> : null}
      </div>

      <ProductionPicker engine={engine} onProduction={setProduction} />

      {!production ? (
        <p className="text-sm text-muted-foreground">
          Select a production — its narrative structure is revisioned, never edited in place.
        </p>
      ) : (
        <>
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
              {!structureLoaded ? (
                <Loading rows={2} />
              ) : unavailable ? (
                <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
              ) : units.length === 0 ? (
                <p className="text-sm text-muted-foreground">No units yet.</p>
              ) : (
                <div aria-label="Narrative units grouped by parent" className="flex flex-col gap-4">
                  {/* Story time and presentation order are independent, explicitly
                      labeled coordinates — never conveyed by row position or color. */}
                  <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <span>Pres. order</span>
                    <span>Type</span>
                    <span>Story time</span>
                  </div>
                  {parentGroups.map(({ parent, children }) => (
                    <div key={String(parent["unit_id"])} className="flex flex-col gap-1">
                      {renderUnit(parent, true)}
                      <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                        {children.length === 0 ? (
                          <p className="px-2 py-1 text-xs text-muted-foreground">No child units.</p>
                        ) : (
                          children.map((child) => renderUnit(child, false))
                        )}
                      </div>
                    </div>
                  ))}
                  {unparented.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Unparented
                      </p>
                      {unparented.map((unit) => renderUnit(unit, false))}
                    </div>
                  ) : null}
                </div>
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
                    {modeFailure ? <StatusMessage variant="error">{modeFailure}</StatusMessage> : null}
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
                  {notice ? <StatusMessage variant="notice">{notice}</StatusMessage> : null}
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
                    {failure ? <StatusMessage variant="error">{failure}</StatusMessage> : null}
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

        {structureLoaded && !unavailable && units.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Unit inspector</CardTitle>
                <CardDescription>
                  A read-only view of the selected unit and its structural
                  context — selecting a unit changes nothing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedUnit ? (
                  <div className="flex flex-col gap-4">
                    <dl className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-4 gap-y-1 text-sm">
                      <dt className="text-muted-foreground">Unit id</dt>
                      <dd className="break-all font-mono text-xs">{String(selectedUnit["unit_id"])}</dd>
                      <dt className="text-muted-foreground">Type</dt>
                      <dd>{String(selectedUnit["unit_type"])}</dd>
                      <dt className="text-muted-foreground">Display number</dt>
                      <dd>{selectedUnit["display_number"] != null ? String(selectedUnit["display_number"]) : "—"}</dd>
                      <dt className="text-muted-foreground">Presentation order</dt>
                      <dd>{String(selectedUnit["presentation_order"] ?? "—")}</dd>
                      <dt className="text-muted-foreground">Story time</dt>
                      <dd>{String(selectedUnit["story_time"] ?? "—")}</dd>
                      <dt className="text-muted-foreground">Publication time</dt>
                      <dd>{selectedUnit["publication_time"] != null ? String(selectedUnit["publication_time"]) : "—"}</dd>
                      <dt className="text-muted-foreground">Parent unit</dt>
                      <dd>{selectedUnit["parent_unit_ref"] != null ? refLabel(selectedUnit["parent_unit_ref"]) : "none (top level)"}</dd>
                      <dt className="text-muted-foreground">POV entity</dt>
                      <dd>{selectedUnit["pov_entity_ref"] != null ? String(selectedUnit["pov_entity_ref"]) : "—"}</dd>
                      <dt className="text-muted-foreground">Temporal marker</dt>
                      <dd>{selectedUnit["temporal_marker"] != null ? String(selectedUnit["temporal_marker"]) : "linear"}</dd>
                      <dt className="text-muted-foreground">Revision of</dt>
                      <dd>{selectedUnit["revision_of_ref"] != null ? String(selectedUnit["revision_of_ref"]) : "—"}</dd>
                    </dl>
                    {relatedChoices.length > 0 ? (
                      <div className="text-sm">
                        <p className="font-medium">Choices at this unit</p>
                        <ul className="mt-1 flex flex-col gap-1">
                          {relatedChoices.map((choice) => (
                            <li key={String(choice["choice_id"])} className="text-xs text-muted-foreground">
                              {String(choice["prompt"])}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {relatedBranches.length > 0 ? (
                      <div className="text-sm">
                        <p className="font-medium">Branches leading here</p>
                        <ul className="mt-1 flex flex-wrap gap-1">
                          {relatedBranches.map((branch) => (
                            <li key={String(branch["branch_label"])}>
                              <Badge variant="muted">{String(branch["branch_label"])}</Badge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Select a unit to inspect its fields and structural context.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Choices &amp; branches</CardTitle>
                <CardDescription>
                  The structure&apos;s branching, rendered as accessible lists —
                  never an inferred canvas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {choices.length === 0 && branches.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No choices or branches in this structure.</p>
                ) : (
                  <div className="flex flex-col gap-4 text-sm">
                    {choices.length > 0 ? (
                      <div>
                        <p className="font-medium">Choices</p>
                        <ul className="mt-1 flex flex-col gap-2">
                          {choices.map((choice) => (
                            <li key={String(choice["choice_id"])} className="rounded-lg border border-border p-2">
                              <p>{String(choice["prompt"])}</p>
                              <p className="text-xs text-muted-foreground">at {refLabel(choice["at_unit_ref"])}</p>
                              <ul className="mt-1 flex flex-col gap-0.5">
                                {((choice["options"] as Record<string, unknown>[] | undefined) ?? []).map((option) => (
                                  <li key={String(option["option_id"])} className="flex flex-wrap items-center gap-1 text-xs">
                                    <Badge variant="muted">{String(option["branch_label"])}</Badge>
                                    <span className="min-w-0">{String(option["label"])}</span>
                                    <span className="text-muted-foreground">→ {refLabel(option["leads_to_unit_ref"])}</span>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {branches.length > 0 ? (
                      <div>
                        <p className="font-medium">Branches</p>
                        <ul className="mt-1 flex flex-col gap-1">
                          {branches.map((branch, index) => (
                            <li key={`${String(branch["branch_label"])}-${index}`} className="flex flex-wrap items-center gap-1 text-xs">
                              <Badge variant="muted">{String(branch["branch_label"])}</Badge>
                              <span className="text-muted-foreground">
                                reconverges at {branch["reconverges_at_unit_ref"] != null ? refLabel(branch["reconverges_at_unit_ref"]) : "—"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : null}
        </>
      )}
    </div>
  );
}
