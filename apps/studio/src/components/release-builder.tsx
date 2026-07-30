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
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import {
  actorLine,
  createEngineClient,
  type EngineClient,
  type ProductionSummary,
  type PropertySummary,
  type ReleaseSummary,
} from "@/lib/engine";

export function ReleaseBuilder({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [properties, setProperties] = React.useState<PropertySummary[]>([]);
  const [propertyId, setPropertyId] = React.useState("");
  const [releases, setReleases] = React.useState<ReleaseSummary[]>([]);
  const [productions, setProductions] = React.useState<ProductionSummary[]>([]);
  const [releaseName, setReleaseName] = React.useState("");
  const [releaseVersion, setReleaseVersion] = React.useState("");
  const [productionName, setProductionName] = React.useState("");
  const [pinReleaseId, setPinReleaseId] = React.useState("");
  const [notice, setNotice] = React.useState<string | null>(null);
  const [reviewingSnapshot, setReviewingSnapshot] = React.useState(false);
  const [reviewingProduction, setReviewingProduction] = React.useState(false);
  const snapshot = useEngineCommand<{ canonReleaseId: string; receiptId: string }>();
  const produce = useEngineCommand<{ productionId: string; receiptId: string }>();

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
    setProductions(await engine.listProductions(propertyId));
  }, [engine, propertyId]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  const property = properties.find((p) => p.propertyId === propertyId) ?? null;
  const newest = releases[0] ?? null;
  const pinRelease = releases.find((r) => r.canonReleaseId === pinReleaseId) ?? null;

  async function onConfirmSnapshot(): Promise<void> {
    if (!property) return;
    let receipt: string | null = null;
    const outcome = await snapshot.run({
      execute: async (idempotencyKey) => {
        const out = await engine.snapshotCanonRelease(
          {
            propertyId: property.propertyId,
            branchId: property.officialBranchId,
            releaseName,
            releaseVersion,
            ...(newest ? { supersedesReleaseId: newest.canonReleaseId } : {}),
          },
          { idempotencyKey },
        );
        receipt = out.receiptId;
        return out;
      },
      refresh,
    });
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      setReleaseName("");
      setReleaseVersion("");
      setReviewingSnapshot(false);
      setNotice(
        outcome === "confirmed"
          ? `Canon release created${receipt ? ` — receipt ${receipt}` : ""}. Nothing was published externally.`
          : `Canon release created${receipt ? ` (receipt ${receipt})` : ""} — but refreshing the lists failed; reload to see current state.`,
      );
      snapshot.reset();
    }
  }

  async function onConfirmProduction(): Promise<void> {
    if (!property) return;
    let receipt: string | null = null;
    const outcome = await produce.run({
      execute: async (idempotencyKey) => {
        const out = await engine.createProduction(
          {
            propertyId: property.propertyId,
            pinnedCanonReleaseId: pinReleaseId,
            name: productionName,
          },
          { idempotencyKey },
        );
        receipt = out.receiptId;
        return out;
      },
      refresh,
    });
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      const namedProduction = productionName;
      setProductionName("");
      setReviewingProduction(false);
      setNotice(
        outcome === "confirmed"
          ? `Production "${namedProduction}" pinned to the selected release${receipt ? ` — receipt ${receipt}` : ""}.`
          : `Production "${namedProduction}" pinned${receipt ? ` (receipt ${receipt})` : ""} — but refreshing the lists failed; reload to see current state.`,
      );
      produce.reset();
    }
  }

  const snapshotFailure = describeCommandFailure(snapshot.status, snapshot.error);
  const produceFailure = describeCommandFailure(produce.status, produce.error);

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
        <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Canon releases</CardTitle>
            <CardDescription>
              Immutable, hash-bound snapshots; productions pin an exact
              release and never drift. A canon release is not an external
              publication.
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

        <Card>
          <CardHeader>
            <CardTitle>Productions</CardTitle>
            <CardDescription>
              Each production works against exactly the release it pinned;
              canon changes never reach it silently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {productions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No productions yet — pin one to a release on the right.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Pinned release</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productions.map((production) => (
                    <TableRow key={production.productionId}>
                      <TableCell className="font-medium">{production.name}</TableCell>
                      <TableCell>
                        <Badge variant="muted">v{production.releaseVersion}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Snapshot release</CardTitle>
              <CardDescription>Freezes the current working canon of the official branch.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!property || !releaseName || !releaseVersion) return;
                  setNotice(null);
                  setReviewingSnapshot(true);
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="rb-name">Release name</Label>
                  <Input id="rb-name" value={releaseName} onChange={(event) => setReleaseName(event.target.value)} placeholder="stillhouse-canon" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5">
                    <Label htmlFor="rb-version">Version</Label>
                    <InfoHint
                      id="hint-release-version"
                      text="A label for this immutable snapshot of accepted canon (e.g. 1.1.0). Every release is content-hash-bound; productions pin exactly one and never drift."
                    />
                  </span>
                  <Input id="rb-version" value={releaseVersion} onChange={(event) => setReleaseVersion(event.target.value)} placeholder="1.1.0" />
                </div>
                {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
                {!reviewingSnapshot ? (
                  <Button type="submit" disabled={!releaseName || !releaseVersion}>
                    Snapshot
                  </Button>
                ) : null}
              </form>
              {reviewingSnapshot ? (
                <div className="mt-4 flex flex-col gap-2">
                  <ConsequenceReview
                    id="rb-snapshot-review"
                    title="Review — create a canon release"
                    rows={[
                      { label: "Release", value: `${releaseName} v${releaseVersion}` },
                      { label: "Branch", value: "official" },
                      {
                        label: "Supersedes",
                        value: newest ? `${newest.releaseName} v${newest.releaseVersion}` : "none — first release",
                      },
                      {
                        label: "Pinned productions",
                        value:
                          productions.length > 0
                            ? productions.map((p) => `${p.name} — stays pinned to v${p.releaseVersion}`).join("; ")
                            : "none yet",
                      },
                      { label: "Recorded by", value: actorLine() },
                      {
                        label: "Effect",
                        value:
                          "Creates an immutable, hash-bound canon release (canon.release.created). This does not publish anything externally.",
                      },
                    ]}
                    confirmLabel="Snapshot canon release"
                    onConfirm={() => void onConfirmSnapshot()}
                    onCancel={() => {
                      setReviewingSnapshot(false);
                      snapshot.reset();
                    }}
                    busy={snapshot.status === "submitting"}
                  />
                  {snapshotFailure ? <p className="text-sm text-destructive">{snapshotFailure}</p> : null}
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New production</CardTitle>
              <CardDescription>Pins an exact release.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!property || !productionName || !pinReleaseId) return;
                  setNotice(null);
                  setReviewingProduction(true);
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="rb-production">Production name</Label>
                  <Input id="rb-production" value={productionName} onChange={(event) => setProductionName(event.target.value)} placeholder="Season One" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5">
                    <Label htmlFor="rb-pin">Pinned release</Label>
                    <InfoHint
                      id="hint-pinned-release"
                      text="The exact canon snapshot this production works against. Later canon changes never reach it silently — repinning is an explicit decision."
                    />
                  </span>
                  <Select id="rb-pin" value={pinReleaseId} onChange={(event) => setPinReleaseId(event.target.value)} disabled={releases.length === 0}>
                    {releases.map((release) => (
                      <option key={release.canonReleaseId} value={release.canonReleaseId}>
                        {release.releaseName} v{release.releaseVersion}
                      </option>
                    ))}
                  </Select>
                </div>
                {!reviewingProduction ? (
                  <Button type="submit" disabled={!productionName || !pinReleaseId}>
                    Create production
                  </Button>
                ) : null}
              </form>
              {reviewingProduction ? (
                <div className="mt-4 flex flex-col gap-2">
                  <ConsequenceReview
                    id="rb-production-review"
                    title="Review — pin a new production"
                    rows={[
                      { label: "Production", value: productionName },
                      {
                        label: "Pinned release",
                        value: pinRelease ? `${pinRelease.releaseName} v${pinRelease.releaseVersion}` : pinReleaseId,
                      },
                      {
                        label: "Release hash",
                        value: pinRelease ? pinRelease.contentSha256.slice(0, 12) : "—",
                      },
                      { label: "Recorded by", value: actorLine() },
                      {
                        label: "Effect",
                        value:
                          "Pins the production to exactly this release. Later canon changes never reach it silently; repinning is a separate explicit decision.",
                      },
                    ]}
                    confirmLabel="Create production"
                    onConfirm={() => void onConfirmProduction()}
                    onCancel={() => {
                      setReviewingProduction(false);
                      produce.reset();
                    }}
                    busy={produce.status === "submitting"}
                  />
                  {produceFailure ? <p className="text-sm text-destructive">{produceFailure}</p> : null}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
