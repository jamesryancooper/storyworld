"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
import { PropertyPicker } from "@/components/property-picker";
import {
  createEngineClient,
  type CanonReleaseView,
  type EngineClient,
} from "@/lib/engine";

export function WorldBible({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [release, setRelease] = React.useState<CanonReleaseView | null>(null);
  const [releaseLoaded, setReleaseLoaded] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);

  React.useEffect(() => {
    if (!selected) {
      setRelease(null);
      setReleaseLoaded(false);
      return;
    }
    setReleaseLoaded(false);
    void (async () => {
      try {
        setRelease(await engine.latestCanonRelease(selected));
      } catch {
        setUnavailable(true);
      } finally {
        setReleaseLoaded(true);
      }
    })();
  }, [engine, selected]);

  const entities = (release?.document.entities ?? []) as Record<string, unknown>[];
  const events = (release?.document.timeline_events ?? []) as Record<string, unknown>[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">World Bible</h1>
        {release ? (
          <Badge variant="outline">
            {release.releaseName} v{release.releaseVersion} · {release.contentSha256.slice(0, 12)}
          </Badge>
        ) : null}
      </div>

      <div className="max-w-sm">
        <PropertyPicker
          engine={engine}
          onProperty={(property) => setSelected(property?.propertyId ?? null)}
          labelId="wb-property"
        />
      </div>

      {unavailable ? (
        <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
      ) : !selected ? null : !releaseLoaded ? (
        <Loading />
      ) : release === null ? (
        <p className="text-sm text-muted-foreground">
          No canon release on this property yet — canon appears here once a
          release is snapshotted.
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Entities</CardTitle>
              <CardDescription>{entities.length} in the pinned release</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Kind</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entities.map((entity) => (
                    <TableRow key={String(entity["entity_id"])}>
                      <TableCell className="font-medium">{String(entity["name"] ?? "—")}</TableCell>
                      <TableCell>
                        <Badge variant="muted">{String(entity["entity_type"] ?? "?")}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>{events.length} canonical event(s), story-time ordered</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Story time</TableHead>
                    <TableHead>Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...events]
                    .sort((a, b) => (String(a["story_time"]) < String(b["story_time"]) ? -1 : 1))
                    .map((event) => (
                      <TableRow key={String(event["event_id"])}>
                        <TableCell className="whitespace-nowrap">{String(event["story_time"] ?? "?")}</TableCell>
                        <TableCell>{String(event["summary"] ?? "—")}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
