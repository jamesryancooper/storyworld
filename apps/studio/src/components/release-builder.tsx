"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  createEngineClient,
  type EngineClient,
  type PropertySummary,
  type ReleaseSummary,
} from "@/lib/engine";

export function ReleaseBuilder({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [properties, setProperties] = React.useState<PropertySummary[]>([]);
  const [propertyId, setPropertyId] = React.useState("");
  const [releases, setReleases] = React.useState<ReleaseSummary[]>([]);
  const [releaseName, setReleaseName] = React.useState("");
  const [releaseVersion, setReleaseVersion] = React.useState("");
  const [productionName, setProductionName] = React.useState("");
  const [pinReleaseId, setPinReleaseId] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      const list = await engine.listProperties();
      setProperties(list);
      if (list.length > 0) setPropertyId(list[0]!.propertyId);
    })();
  }, [engine]);

  const refresh = React.useCallback(async () => {
    if (!propertyId) return;
    const list = await engine.listCanonReleases(propertyId);
    setReleases(list);
    if (list.length > 0) setPinReleaseId(list[0]!.canonReleaseId);
  }, [engine, propertyId]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  const property = properties.find((p) => p.propertyId === propertyId) ?? null;

  async function onSnapshot(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!property || !releaseName || !releaseVersion) return;
    setBusy(true);
    setNotice(null);
    try {
      const newest = releases[0];
      await engine.snapshotCanonRelease({
        propertyId: property.propertyId,
        branchId: property.officialBranchId,
        releaseName,
        releaseVersion,
        ...(newest ? { supersedesReleaseId: newest.canonReleaseId } : {}),
      });
      setReleaseName("");
      setReleaseVersion("");
      await refresh();
    } catch (cause) {
      setNotice(String(cause));
    } finally {
      setBusy(false);
    }
  }

  async function onCreateProduction(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!property || !productionName || !pinReleaseId) return;
    setBusy(true);
    setNotice(null);
    try {
      await engine.createProduction({
        propertyId: property.propertyId,
        pinnedCanonReleaseId: pinReleaseId,
        name: productionName,
      });
      setNotice(`Production "${productionName}" pinned to the selected release.`);
      setProductionName("");
    } catch (cause) {
      setNotice(String(cause));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Release Builder</h1>
        {releases[0] ? <Badge variant="outline">latest v{releases[0].releaseVersion}</Badge> : null}
      </div>

      <div className="max-w-sm">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rb-property">Property</Label>
          <Select
            id="rb-property"
            value={propertyId}
            onChange={(event) => setPropertyId(event.target.value)}
            disabled={properties.length === 0}
          >
            {properties.map((item) => (
              <option key={item.propertyId} value={item.propertyId}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Canon releases</CardTitle>
            <CardDescription>
              Immutable, hash-bound snapshots; productions pin an exact
              release and never drift.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {releases.length === 0 ? (
              <p className="text-sm text-muted-foreground">No releases yet — snapshot the first.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Hash</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {releases.map((release) => (
                    <TableRow key={release.canonReleaseId}>
                      <TableCell className="font-medium">{release.releaseName}</TableCell>
                      <TableCell>v{release.releaseVersion}</TableCell>
                      <TableCell className="font-mono text-xs">{release.contentSha256.slice(0, 12)}</TableCell>
                      <TableCell className="text-muted-foreground">{release.createdAt.slice(0, 10)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Snapshot release</CardTitle>
              <CardDescription>Freezes the current working canon of the official branch.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSnapshot} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="rb-name">Release name</Label>
                  <Input id="rb-name" value={releaseName} onChange={(event) => setReleaseName(event.target.value)} placeholder="stillhouse-canon" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="rb-version">Version</Label>
                  <Input id="rb-version" value={releaseVersion} onChange={(event) => setReleaseVersion(event.target.value)} placeholder="1.1.0" />
                </div>
                <Button type="submit" disabled={busy || !releaseName || !releaseVersion}>
                  {busy ? "Snapshotting…" : "Snapshot"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New production</CardTitle>
              <CardDescription>Pins an exact release.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onCreateProduction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="rb-production">Production name</Label>
                  <Input id="rb-production" value={productionName} onChange={(event) => setProductionName(event.target.value)} placeholder="Season One" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="rb-pin">Pinned release</Label>
                  <Select id="rb-pin" value={pinReleaseId} onChange={(event) => setPinReleaseId(event.target.value)} disabled={releases.length === 0}>
                    {releases.map((release) => (
                      <option key={release.canonReleaseId} value={release.canonReleaseId}>
                        {release.releaseName} v{release.releaseVersion}
                      </option>
                    ))}
                  </Select>
                </div>
                {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
                <Button type="submit" disabled={busy || !productionName || !pinReleaseId}>
                  {busy ? "Creating…" : "Create production"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
