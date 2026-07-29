"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductionPicker } from "@/components/production-picker";
import {
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

export function ContinuityConsole({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [production, setProduction] = React.useState<ProductionSummary | null>(null);
  const [units, setUnits] = React.useState<Record<string, unknown>[]>([]);
  const [unitId, setUnitId] = React.useState("");
  const [findings, setFindings] = React.useState<FindingView[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    if (!production) {
      setFindings([]);
      return;
    }
    setFindings(await engine.listContinuityFindings(production.productionId));
  }, [engine, production]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  React.useEffect(() => {
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

  async function onEvaluate(): Promise<void> {
    if (!production || !unitId) return;
    setBusy(true);
    setNotice(null);
    try {
      const out = await engine.runEvaluation({ productionId: production.productionId, unitId });
      setNotice(`Evaluation recorded ${out.findings.length} finding(s).`);
      await refresh();
    } catch (cause) {
      setNotice(String(cause));
    } finally {
      setBusy(false);
    }
  }

  async function onDispose(finding: FindingView, disposition: "resolved" | "intentional_exception"): Promise<void> {
    setNotice(null);
    try {
      await engine.disposeFinding({
        findingId: finding.findingId,
        disposition,
        ...(disposition === "intentional_exception"
          ? { waiver: { reason: "Accepted as intentional by the owner", scope: "this production", expiry: null } }
          : {}),
      });
      await refresh();
    } catch (cause) {
      setNotice(String(cause));
    }
  }

  const open = findings.filter((f) => f.disposition === "open");

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
            <Button onClick={() => void onEvaluate()} disabled={busy || !unitId}>
              {busy ? "Evaluating…" : "Evaluate continuity"}
            </Button>
            {notice ? <p className="w-full text-sm text-muted-foreground">{notice}</p> : null}
          </CardContent>
        </Card>
      ) : null}

      {production ? (
        <Card>
          <CardHeader>
            <CardTitle>Findings</CardTitle>
            <CardDescription>
              Evidence-backed, bound to exact content hashes; every
              disposition is an append-only revision with a receipt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {findings.length === 0 ? (
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
                          <span className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => void onDispose(finding, "resolved")}>
                              Resolve
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => void onDispose(finding, "intentional_exception")}
                            >
                              Intentional
                            </Button>
                          </span>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
