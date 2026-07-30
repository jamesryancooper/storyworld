"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsequenceReview } from "@/components/ui/consequence-review";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { CommandRecovery } from "@/components/ui/command-recovery";
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
import { ProductionPicker } from "@/components/production-picker";
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import { clearUnknownOutcome, recordUnknownOutcome } from "@/lib/unknown-outcome-log";
import {
  actorLine,
  createEngineClient,
  type EngineClient,
  type FindingView,
  type ProductionSummary,
} from "@/lib/engine";

const SEVERITY_VARIANT: Record<string, "default" | "outline" | "muted"> = {
  blocker: "default",
  major: "outline",
  minor: "muted",
  advisory: "muted",
};

type Disposition = "resolved" | "intentional_exception" | "waived";

export function ContinuityConsole({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [production, setProduction] = React.useState<ProductionSummary | null>(null);
  const [units, setUnits] = React.useState<Record<string, unknown>[]>([]);
  const [unitId, setUnitId] = React.useState("");
  const [findings, setFindings] = React.useState<FindingView[]>([]);
  const [findingsLoaded, setFindingsLoaded] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [reviewingId, setReviewingId] = React.useState<string | null>(null);
  const [disposition, setDisposition] = React.useState<Disposition>("resolved");
  const [rationale, setRationale] = React.useState("");
  const [scope, setScope] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const evaluate = useEngineCommand<{ findings: unknown[] }>();
  const dispose = useEngineCommand<{ findingRevisionId: string; receiptId: string }>();

  // refresh stays throwing for the command state machine's refresh_failed
  // signal (SF3); the mount effect wraps it for the loading states (SWUX-009).
  const refresh = React.useCallback(async () => {
    if (!production) {
      setFindings([]);
      return;
    }
    setFindings(await engine.listContinuityFindings(production.productionId));
  }, [engine, production]);

  React.useEffect(() => {
    void refresh().then(
      () => {
        setUnavailable(false);
        setFindingsLoaded(true);
      },
      () => {
        setUnavailable(true);
        setFindingsLoaded(true);
      },
    );
  }, [refresh]);

  React.useEffect(() => {
    setUnits([]);
    setUnitId("");
    setFindingsLoaded(false);
    if (!production) return;
    void (async () => {
      const structure = await engine.getNarrativeStructure(production.productionId);
      const list = (structure?.document.narrative_units ?? []) as Record<string, unknown>[];
      setUnits(list);
      if (list.length > 0) setUnitId(String(list[0]!["unit_id"]));
    })();
  }, [engine, production]);

  async function onEvaluate(): Promise<void> {
    if (!production || !unitId) return;
    setNotice(null);
    let count = 0;
    const outcome = await evaluate.run({
      execute: async (idempotencyKey) => {
        const out = await engine.runEvaluation(
          { productionId: production.productionId, unitId },
          { idempotencyKey },
        );
        count = out.findings.length;
        return out;
      },
      refresh,
    });
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      setNotice(
        outcome === "confirmed"
          ? `Evaluation recorded ${count} finding(s).`
          : `Evaluation recorded ${count} finding(s) — but refreshing the list failed; reload to see them.`,
      );
      evaluate.reset();
    }
  }

  function openReview(finding: FindingView): void {
    setNotice(null);
    setDisposition("resolved");
    setRationale("");
    setScope("");
    setExpiry("");
    dispose.reset();
    setReviewingId((prior) => (prior === finding.findingId ? null : finding.findingId));
  }

  const needsWaiver = disposition === "intentional_exception" || disposition === "waived";
  const waiverIncomplete = needsWaiver && (rationale.trim().length === 0 || scope.trim().length === 0);

  const disposeCtx = React.useRef<
    { opId: string; disposition: string; subjectLabel: string; receipt: string | null } | null
  >(null);

  function finalizeDisposition(outcome: string): void {
    const ctx = disposeCtx.current;
    if (!ctx) return;
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      clearUnknownOutcome(ctx.opId);
      setReviewingId(null);
      setNotice(
        outcome === "confirmed"
          ? `Disposition "${ctx.disposition}" recorded${ctx.receipt ? ` — receipt ${ctx.receipt}` : ""}.`
          : `Disposition "${ctx.disposition}" recorded${ctx.receipt ? ` (receipt ${ctx.receipt})` : ""} — but refreshing the list failed; reload to see current state.`,
      );
      dispose.reset();
    } else if (outcome === "unknown" || outcome === "unavailable") {
      recordUnknownOutcome({ id: ctx.opId, actionLabel: `${ctx.disposition} disposition`, subjectLabel: ctx.subjectLabel });
    }
  }

  async function onConfirmDisposition(finding: FindingView): Promise<void> {
    const opId = `dispose:${finding.findingId}:${disposition}`;
    disposeCtx.current = { opId, disposition, subjectLabel: `finding ${finding.findingId}`, receipt: null };
    const outcome = await dispose.run(
      {
        execute: async (idempotencyKey) => {
          const out = await engine.disposeFinding(
            {
              findingId: finding.findingId,
              disposition,
              ...(needsWaiver
                ? { waiver: { reason: rationale.trim(), scope: scope.trim(), expiry: expiry ? expiry : null } }
                : {}),
            },
            { idempotencyKey },
          );
          if (disposeCtx.current) disposeCtx.current.receipt = out.receiptId;
          return out;
        },
        refresh,
      },
      opId,
    );
    finalizeDisposition(outcome);
  }

  const open = findings.filter((f) => f.disposition === "open");
  const reviewing = findings.find((f) => f.findingId === reviewingId) ?? null;
  const evaluateFailure = describeCommandFailure(evaluate.status, evaluate.error);
  const disposeFailure = describeCommandFailure(dispose.status, dispose.error);

  function confidenceLabel(finding: FindingView): string {
    return typeof finding.document.confidence === "number"
      ? `${Math.round(finding.document.confidence * 100)}%`
      : "not stated";
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Continuity Console</h1>
        {production ? (
          <Badge variant={open.some((f) => f.severity === "blocker") ? "default" : "outline"}>
            {open.length} open finding(s)
          </Badge>
        ) : null}
      </div>

      <ProductionPicker engine={engine} onProduction={setProduction} />

      {production ? (
        <Card>
          <CardHeader>
            <CardTitle>Run evaluation</CardTitle>
            <CardDescription>
              Deterministic layers run for real; model-assisted layers stay
              mocked until provider keys arrive. Pass never means legal
              certainty — dispositions are yours.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-end gap-4">
            {units.length > 0 ? (
              <div className="flex w-72 flex-col gap-1.5">
                <Label htmlFor="cc-unit">Narrative unit</Label>
                <Select id="cc-unit" value={unitId} onChange={(event) => setUnitId(event.target.value)}>
                  {units.map((unit) => (
                    <option key={String(unit["unit_id"])} value={String(unit["unit_id"])}>
                      #{String(unit["presentation_order"])} {String(unit["unit_type"])} · {String(unit["story_time"])}
                    </option>
                  ))}
                </Select>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">This production has no narrative units yet.</p>
            )}
            <Button onClick={() => void onEvaluate()} disabled={evaluate.status === "submitting" || !unitId}>
              {evaluate.status === "submitting" ? "Evaluating…" : "Evaluate continuity"}
            </Button>
            {evaluateFailure ? <StatusMessage variant="error" className="w-full">{evaluateFailure}</StatusMessage> : null}
            {notice ? <StatusMessage variant="notice" className="w-full">{notice}</StatusMessage> : null}
          </CardContent>
        </Card>
      ) : null}

      {production ? (
        <Card>
          <CardHeader>
            <CardTitle>Findings</CardTitle>
            <CardDescription>
              Evidence-backed, bound to exact content hashes; every
              disposition is reviewed first, then recorded append-only with a
              receipt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!findingsLoaded ? (
              <Loading rows={2} />
            ) : unavailable ? (
              <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
            ) : findings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No findings recorded.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Severity</TableHead>
                    <TableHead>Layer</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Disposition</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {findings.map((finding) => (
                    <TableRow key={finding.findingId}>
                      <TableCell>
                        <Badge variant={SEVERITY_VARIANT[finding.severity] ?? "muted"}>{finding.severity}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{finding.checkLayer}</TableCell>
                      <TableCell className="max-w-md">{String(finding.document.description ?? "")}</TableCell>
                      <TableCell>
                        <Badge variant="muted">{finding.disposition}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {finding.disposition === "open" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            aria-expanded={reviewingId === finding.findingId}
                            onClick={() => openReview(finding)}
                          >
                            Review…
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {reviewing ? (
              <div className="mt-4 flex flex-col gap-2">
                <ConsequenceReview
                  id="cc-review"
                  title="Review finding — record a disposition"
                  rows={[
                    { label: "Finding", value: reviewing.findingId },
                    { label: "Severity", value: reviewing.severity },
                    { label: "Layer", value: reviewing.checkLayer },
                    { label: "Description", value: String(reviewing.document.description ?? "—") },
                    { label: "Confidence", value: confidenceLabel(reviewing) },
                    {
                      label: "Evidence",
                      value: (reviewing.document.evidence_refs ?? []).join(", ") || "not recorded",
                    },
                    {
                      label: "Subjects",
                      value:
                        (reviewing.document.subject_refs ?? []).join(", ") +
                          ((reviewing.document.subject_sha256 ?? []).length > 0
                            ? ` (${(reviewing.document.subject_sha256 ?? []).map((h) => h.slice(0, 12)).join(", ")})`
                            : "") || "not recorded",
                    },
                    {
                      label: "Suggested remediation",
                      value: String(reviewing.document.suggested_remediation ?? "none proposed"),
                    },
                    { label: "Decided by", value: actorLine() },
                    {
                      label: "Effect",
                      value:
                        "Records an append-only disposition revision with a continuity_disposition receipt. Resolution never implies an unrecorded canon change.",
                    },
                  ]}
                  confirmLabel="Record disposition"
                  onConfirm={() => void onConfirmDisposition(reviewing)}
                  onCancel={() => {
                    setReviewingId(null);
                    dispose.reset();
                  }}
                  busy={dispose.status === "submitting"}
                  confirmDisabled={waiverIncomplete}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex w-64 flex-col gap-1.5">
                      <Label htmlFor="cc-disposition">Disposition</Label>
                      <Select
                        id="cc-disposition"
                        value={disposition}
                        onChange={(event) => setDisposition(event.target.value as Disposition)}
                      >
                        <option value="resolved">resolved — the contradiction is fixed</option>
                        <option value="intentional_exception">intentional exception — waive with reason</option>
                        <option value="waived">waived — waive with reason</option>
                      </Select>
                    </div>
                    {needsWaiver ? (
                      <>
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="cc-rationale">Waiver rationale — your own words</Label>
                          <Textarea
                            id="cc-rationale"
                            value={rationale}
                            onChange={(event) => setRationale(event.target.value)}
                            placeholder="Why this contradiction is intentional or acceptable"
                          />
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex min-w-56 flex-1 flex-col gap-1.5">
                            <Label htmlFor="cc-scope">Waiver scope</Label>
                            <Input
                              id="cc-scope"
                              value={scope}
                              onChange={(event) => setScope(event.target.value)}
                              placeholder="e.g. this production only"
                            />
                          </div>
                          <div className="flex w-44 flex-col gap-1.5">
                            <Label htmlFor="cc-expiry">Waiver expiry (optional)</Label>
                            <Input
                              id="cc-expiry"
                              type="date"
                              value={expiry}
                              onChange={(event) => setExpiry(event.target.value)}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          The rationale and scope are recorded verbatim in the
                          durable waiver — nothing is filled in for you.
                        </p>
                      </>
                    ) : null}
                  </div>
                </ConsequenceReview>
                {disposeFailure ? <StatusMessage variant="error">{disposeFailure}</StatusMessage> : null}
                <CommandRecovery
                  status={dispose.status}
                  onRetry={() => void dispose.retry().then(finalizeDisposition)}
                  onCheckStatus={() => {
                    void refresh();
                    setNotice("Findings refetched — check whether this disposition already applied before retrying.");
                  }}
                />
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
