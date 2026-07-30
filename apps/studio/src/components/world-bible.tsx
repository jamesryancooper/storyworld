"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
import {
  createEngineClient,
  type CanonReleaseView,
  type EngineClient,
  type PropertySummary,
} from "@/lib/engine";

export function WorldBible({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [properties, setProperties] = React.useState<PropertySummary[]>([]);
  const [selected, setSelected] = React.useState<string>("");
  const [release, setRelease] = React.useState<CanonReleaseView | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [releaseLoaded, setReleaseLoaded] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      try {
        const list = await engine.listProperties();
        setProperties(list);
        if (list.length > 0) setSelected(list[0]!.propertyId);
      } catch {
        setUnavailable(true);
      } finally {
        setLoaded(true);
      }
    })();
  }, [engine]);

  React.useEffect(() => {
    if (!selected) return;
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
        <h1 className="text-lg font-semibold">World Bible</h1>
        {release ? (
          <Badge variant="outline">
            {release.releaseName} v{release.releaseVersion} · {release.contentSha256.slice(0, 12)}
          </Badge>
        ) : null}
      </div>

      <div className="max-w-sm">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="wb-property">Property</Label>
          <Select
            id="wb-property"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
            disabled={properties.length === 0}
          >
            {properties.map((property) => (
              <option key={property.propertyId} value={property.propertyId}>
                {property.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {unavailable ? (
        <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
      ) : !loaded ? (
        <Loading />
      ) : properties.length === 0 ? (
        <p className="text-sm text-muted-foreground">No properties yet.</p>
      ) : !releaseLoaded ? (
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
