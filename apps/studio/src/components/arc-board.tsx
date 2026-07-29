"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductionPicker } from "@/components/production-picker";
import {
  createEngineClient,
  type EngineClient,
  type NarrativeStructureView,
  type ProductionSummary,
} from "@/lib/engine";

const UNIT_TYPES = ["episode", "scene", "chapter", "post", "panel"];

export function ArcBoard({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [production, setProduction] = React.useState<ProductionSummary | null>(null);
  const [structure, setStructure] = React.useState<NarrativeStructureView | null>(null);
  const [unitType, setUnitType] = React.useState("episode");
  const [storyTime, setStoryTime] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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

  const units = React.useMemo(
    () =>
      [...((structure?.document.narrative_units ?? []) as Record<string, unknown>[])].sort(
        (a, b) => Number(a["presentation_order"] ?? 0) - Number(b["presentation_order"] ?? 0),
      ),
    [structure],
  );
  const threads = (structure?.document.threads ?? []) as Record<string, unknown>[];

  async function onAddUnit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!production || !storyTime) return;
    setBusy(true);
    setError(null);
    try {
      const nextOrder = units.length + 1;
      const document = {
        schema_version: "storyworld.narrative-structure.v1",
        structure_id: structure?.document.structure_id ?? crypto.randomUUID(),
        narrative_units: [
          ...units,
          {
            unit_id: crypto.randomUUID(),
            unit_type: unitType,
            presentation_order: nextOrder,
            story_time: storyTime,
          },
        ],
        threads,
      };
      await engine.saveNarrativeStructure({
        productionId: production.productionId,
        document,
        ...(structure ? { supersedesRevisionId: structure.structureRevisionId } : {}),
      });
      setStoryTime("");
      await refresh();
    } catch (cause) {
      setError(String(cause));
    } finally {
      setBusy(false);
    }
  }

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
                      <TableHead>#</TableHead>
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
              <CardDescription>Supersedes the current structure revision.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onAddUnit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="unit-type">Unit type</Label>
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
                  <Label htmlFor="unit-story-time">Story time</Label>
                  <Input
                    id="unit-story-time"
                    value={storyTime}
                    onChange={(event) => setStoryTime(event.target.value)}
                    placeholder="1989-06-01"
                  />
                </div>
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
                <Button type="submit" disabled={busy || !storyTime}>
                  {busy ? "Saving…" : "Add unit"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
