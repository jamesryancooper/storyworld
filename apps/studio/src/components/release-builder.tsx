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
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import { clearUnknownOutcome, recordUnknownOutcome } from "@/lib/unknown-outcome-log";
import {
  actorLine,
  createEngineClient,
  type EngineClient,
  type ProductionSummary,
  type PropertySummary,
  type ReleaseSummary,
} from "@/lib/engine";

/**
 * Subjects frozen when a consequence review opens (SF4): the exact
 * property/release named in the review, so switching the property selector
 * or the pinned release afterwards can never retarget the confirmed
 * command.
 */
interface SnapshotReview {
  opId: string;
  propertyId: string;
  propertyName: string;
  branchId: string;
  releaseName: string;
  releaseVersion: string;
  supersedesReleaseId?: string;
  supersedesLabel: string;
  pinnedProductionsLabel: string;
}

interface ProductionReview {
  opId: string;
  propertyId: string;
  propertyName: string;
  productionName: string;
  pinReleaseId: string;
  pinReleaseLabel: string;
  pinReleaseHash: string | null;
}

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
  const [loaded, setLoaded] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);
  const [snapshotReview, setSnapshotReview] = React.useState<SnapshotReview | null>(null);
  const [productionReview, setProductionReview] = React.useState<ProductionReview | null>(null);
  const snapshot = useEngineCommand<{ canonReleaseId: string; receiptId: string }>();
  const produce = useEngineCommand<{ productionId: string; receiptId: string }>();
  const snapshotReceipt = React.useRef<string | null>(null);
  const productionReceipt = React.useRef<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      const list = await engine.listProperties();
      setProperties(list);
      if (list.length > 0) setPropertyId(list[0]!.propertyId);
    })();
  }, [engine]);

  // refresh stays throwing for the command state machine's refresh_failed
  // signal (SF3); the mount effect wraps it for the loading states (SWUX-009).
  const refresh = React.useCallback(async () => {
    if (!propertyId) return;
    const list = await engine.listCanonReleases(propertyId);
    setReleases(list);
    if (list.length > 0) setPinReleaseId(list[0]!.canonReleaseId);
    setProductions(await engine.listProductions(propertyId));
  }, [engine, propertyId]);

  React.useEffect(() => {
    void refresh().then(
      () => {
        setUnavailable(false);
        setLoaded(true);
      },
      () => {
        setUnavailable(true);
        setLoaded(true);
      },
    );
  }, [refresh]);

  const property = properties.find((p) => p.propertyId === propertyId) ?? null;
  const newest = releases[0] ?? null;
  const pinRelease = releases.find((r) => r.canonReleaseId === pinReleaseId) ?? null;
  const reviewOpen = snapshotReview !== null || productionReview !== null;

  // Changing the property closes any open review (SF4): a frozen review must
  // never be confirmed against a different property than it named.
  React.useEffect(() => {
    setSnapshotReview(null);
    setProductionReview(null);
    snapshot.reset();
    produce.reset();
  }, [propertyId, snapshot.reset, produce.reset]);

  function openSnapshotReview(): void {
    if (!property || !releaseName || !releaseVersion) return;
    setNotice(null);
    setSnapshotReview({
      opId: `snapshot:${property.propertyId}:${releaseVersion}`,
      propertyId: property.propertyId,
      propertyName: property.name,
      branchId: property.officialBranchId,
      releaseName,
      releaseVersion,
      ...(newest ? { supersedesReleaseId: newest.canonReleaseId } : {}),
      supersedesLabel: newest ? `${newest.releaseName} v${newest.releaseVersion}` : "none — first release",
      pinnedProductionsLabel:
        productions.length > 0
          ? productions.map((p) => `${p.name} — stays pinned to v${p.releaseVersion}`).join("; ")
          : "none yet",
    });
  }

  function openProductionReview(): void {
    if (!property || !productionName || !pinReleaseId) return;
    setNotice(null);
    setProductionReview({
      opId: `production:${property.propertyId}:${productionName}`,
      propertyId: property.propertyId,
      propertyName: property.name,
      productionName,
      pinReleaseId,
      pinReleaseLabel: pinRelease ? `${pinRelease.releaseName} v${pinRelease.releaseVersion}` : pinReleaseId,
      pinReleaseHash: pinRelease ? pinRelease.contentSha256 : null,
    });
  }

  function finalizeSnapshot(outcome: string, r: SnapshotReview): void {
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      clearUnknownOutcome(r.opId);
      setReleaseName("");
      setReleaseVersion("");
      setSnapshotReview(null);
      setNotice(
        outcome === "confirmed"
          ? `Canon release created${snapshotReceipt.current ? ` — receipt ${snapshotReceipt.current}` : ""}. Nothing was published externally.`
          : `Canon release created${snapshotReceipt.current ? ` (receipt ${snapshotReceipt.current})` : ""} — but refreshing the lists failed; reload to see current state.`,
      );
      snapshot.reset();
    } else if (outcome === "unknown" || outcome === "unavailable") {
      recordUnknownOutcome({ id: r.opId, actionLabel: `canon release ${r.releaseName} v${r.releaseVersion}`, subjectLabel: r.propertyName });
    }
  }

  function finalizeProduction(outcome: string, r: ProductionReview): void {
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      clearUnknownOutcome(r.opId);
      setProductionName("");
      setProductionReview(null);
      setNotice(
        outcome === "confirmed"
          ? `Production "${r.productionName}" pinned to the selected release${productionReceipt.current ? ` — receipt ${productionReceipt.current}` : ""}.`
          : `Production "${r.productionName}" pinned${productionReceipt.current ? ` (receipt ${productionReceipt.current})` : ""} — but refreshing the lists failed; reload to see current state.`,
      );
      produce.reset();
    } else if (outcome === "unknown" || outcome === "unavailable") {
      recordUnknownOutcome({ id: r.opId, actionLabel: `production "${r.productionName}"`, subjectLabel: r.propertyName });
    }
  }

  async function onConfirmSnapshot(): Promise<void> {
    const r = snapshotReview;
    if (!r) return;
    snapshotReceipt.current = null;
    const outcome = await snapshot.run(
      {
        execute: async (idempotencyKey) => {
          const out = await engine.snapshotCanonRelease(
            {
              propertyId: r.propertyId,
              branchId: r.branchId,
              releaseName: r.releaseName,
              releaseVersion: r.releaseVersion,
              ...(r.supersedesReleaseId ? { supersedesReleaseId: r.supersedesReleaseId } : {}),
            },
            { idempotencyKey },
          );
          snapshotReceipt.current = out.receiptId;
          return out;
        },
        refresh,
      },
      r.opId,
    );
    finalizeSnapshot(outcome, r);
  }

  async function onConfirmProduction(): Promise<void> {
    const r = productionReview;
    if (!r) return;
    productionReceipt.current = null;
    const outcome = await produce.run(
      {
        execute: async (idempotencyKey) => {
          const out = await engine.createProduction(
            {
              propertyId: r.propertyId,
              pinnedCanonReleaseId: r.pinReleaseId,
              name: r.productionName,
            },
            { idempotencyKey },
          );
          productionReceipt.current = out.receiptId;
          return out;
        },
        refresh,
      },
      r.opId,
    );
    finalizeProduction(outcome, r);
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
            disabled={properties.length === 0 || reviewOpen}
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
            {!loaded ? (
              <Loading rows={2} />
            ) : unavailable ? (
              <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
            ) : releases.length === 0 ? (
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
            {!loaded ? (
              <Loading rows={2} />
            ) : unavailable ? (
              <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
            ) : productions.length === 0 ? (
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
                  openSnapshotReview();
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
                {notice ? <StatusMessage variant="notice">{notice}</StatusMessage> : null}
                {!snapshotReview ? (
                  <Button type="submit" disabled={!releaseName || !releaseVersion || productionReview !== null}>
                    Snapshot
                  </Button>
                ) : null}
              </form>
              {snapshotReview ? (
                <div className="mt-4 flex flex-col gap-2">
                  <ConsequenceReview
                    id="rb-snapshot-review"
                    title="Review — create a canon release"
                    rows={[
                      { label: "Property", value: snapshotReview.propertyName },
                      { label: "Release", value: `${snapshotReview.releaseName} v${snapshotReview.releaseVersion}` },
                      { label: "Branch", value: "official" },
                      { label: "Supersedes", value: snapshotReview.supersedesLabel },
                      { label: "Pinned productions", value: snapshotReview.pinnedProductionsLabel },
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
                      setSnapshotReview(null);
                      snapshot.reset();
                    }}
                    busy={snapshot.status === "submitting"}
                  />
                  {snapshotFailure ? <StatusMessage variant="error">{snapshotFailure}</StatusMessage> : null}
                  <CommandRecovery
                    status={snapshot.status}
                    onRetry={() => void snapshot.retry().then((outcome) => finalizeSnapshot(outcome, snapshotReview))}
                    onCheckStatus={() => {
                      void refresh();
                      setNotice("Releases refetched — check whether this release already exists before retrying.");
                    }}
                  />
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
                  openProductionReview();
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
                  <Select id="rb-pin" value={pinReleaseId} onChange={(event) => setPinReleaseId(event.target.value)} disabled={releases.length === 0 || productionReview !== null}>
                    {releases.map((release) => (
                      <option key={release.canonReleaseId} value={release.canonReleaseId}>
                        {release.releaseName} v{release.releaseVersion}
                      </option>
                    ))}
                  </Select>
                </div>
                {!productionReview ? (
                  <Button type="submit" disabled={!productionName || !pinReleaseId || snapshotReview !== null}>
                    Create production
                  </Button>
                ) : null}
              </form>
              {productionReview ? (
                <div className="mt-4 flex flex-col gap-2">
                  <ConsequenceReview
                    id="rb-production-review"
                    title="Review — pin a new production"
                    rows={[
                      { label: "Property", value: productionReview.propertyName },
                      { label: "Production", value: productionReview.productionName },
                      { label: "Pinned release", value: productionReview.pinReleaseLabel },
                      {
                        label: "Release hash",
                        value: productionReview.pinReleaseHash ? productionReview.pinReleaseHash.slice(0, 12) : "—",
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
                      setProductionReview(null);
                      produce.reset();
                    }}
                    busy={produce.status === "submitting"}
                  />
                  {produceFailure ? <StatusMessage variant="error">{produceFailure}</StatusMessage> : null}
                  <CommandRecovery
                    status={produce.status}
                    onRetry={() => void produce.retry().then((outcome) => finalizeProduction(outcome, productionReview))}
                    onCheckStatus={() => {
                      void refresh();
                      setNotice("Productions refetched — check whether this production already exists before retrying.");
                    }}
                  />
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
