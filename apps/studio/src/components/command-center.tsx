"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InfoHint } from "@/components/ui/info-hint";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import { createEngineClient, type AttentionRow, type EngineClient } from "@/lib/engine";

/**
 * A single attention fact. count/label are always shown; a href is added
 * only when the count is non-zero, so a zero never becomes a misleading
 * link. Facts are defined Engine state — no readiness score, no "drift".
 */
function AttentionFact({ count, label, href }: { count: number; label: string; href?: string }): React.JSX.Element {
  const text = `${count} ${label}`;
  if (count > 0 && href) {
    return (
      <Link href={href} className="rounded-md underline decoration-dotted underline-offset-2 hover:text-foreground">
        {text}
      </Link>
    );
  }
  return <span className="text-muted-foreground">{text}</span>;
}

const PROPERTY_TYPES = ["fictional", "editorial", "brand", "interactive", "hybrid"];

export function CommandCenter({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [reachable, setReachable] = React.useState<boolean | null>(null);
  const [attention, setAttention] = React.useState<AttentionRow[]>([]);
  const [name, setName] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("fictional");
  const [notice, setNotice] = React.useState<string | null>(null);
  const create = useEngineCommand<{ propertyId: string }>();

  // The command uses loadPortfolio (it throws, so a post-create refresh
  // failure is a real refresh_failed outcome, SF3). The mount health check
  // wraps it to also drive the reachable badge without throwing.
  const loadPortfolio = React.useCallback(async () => {
    setAttention(await engine.listAttention());
    setReachable(true);
  }, [engine]);

  const checkHealth = React.useCallback(async () => {
    try {
      await loadPortfolio();
    } catch {
      setReachable(false);
    }
  }, [loadPortfolio]);

  React.useEffect(() => {
    void checkHealth();
  }, [checkHealth]);

  async function onCreate(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!name.trim()) return;
    setNotice(null);
    const outcome = await create.run({
      execute: (idempotencyKey) =>
        engine.createProperty(
          {
            workspaceName: `${name.trim()} workspace`,
            propertyName: name.trim(),
            propertyType,
          },
          { idempotencyKey },
        ),
      refresh: loadPortfolio,
    });
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      // The property is recorded in both cases; clearing the name prevents
      // an accidental duplicate create. A refresh failure is surfaced, not
      // swallowed (SF3) — the list simply did not refetch.
      setName("");
      if (outcome === "refresh_failed") {
        setNotice("Property created — but the list failed to refresh; reload to see it.");
      }
      create.reset();
    }
  }

  const createFailure = describeCommandFailure(create.status, create.error);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Command Center</h1>
        {reachable === null ? (
          <Badge variant="muted">checking engine…</Badge>
        ) : reachable ? (
          <Badge>engine connected</Badge>
        ) : (
          <Badge variant="outline">engine unreachable</Badge>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio &amp; attention</CardTitle>
            <CardDescription>
              What each property needs next, from current Engine facts — open
              a property or jump straight to what awaits a decision.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reachable === null ? (
              <Loading />
            ) : reachable === false ? (
              <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
            ) : attention.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No properties yet — create the first one.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {attention.map((row) => {
                  const hints: string[] = [];
                  if (row.pendingProposals > 0) hints.push(`review ${row.pendingProposals} pending proposal(s)`);
                  if (row.pendingStructureProposals > 0) hints.push(`decide ${row.pendingStructureProposals} structure proposal(s)`);
                  if (row.openFindings > 0) hints.push(`disposition ${row.openFindings} open finding(s)`);
                  return (
                    <li key={row.propertyId} className="min-w-0 rounded-lg border border-border p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <Link
                          href={`/world-bible?property=${encodeURIComponent(row.propertyId)}`}
                          className="text-base font-semibold underline decoration-dotted underline-offset-2 hover:text-foreground"
                        >
                          {row.name}
                        </Link>
                        <Badge variant="muted">
                          {row.latestReleaseVersion ? `latest canon v${row.latestReleaseVersion}` : "no release yet"}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        <AttentionFact count={row.pendingProposals} label="proposals awaiting review" href={`/review?property=${encodeURIComponent(row.propertyId)}`} />
                        <AttentionFact count={row.pendingStructureProposals} label="structure proposals awaiting review" href={`/review?property=${encodeURIComponent(row.propertyId)}`} />
                        <AttentionFact count={row.openFindings} label="open continuity findings" href={`/continuity?property=${encodeURIComponent(row.propertyId)}`} />
                        <AttentionFact count={row.productionCount} label="production(s)" />
                      </div>
                      {hints.length > 0 ? (
                        <p className="mt-2 text-sm text-muted-foreground">Next: {hints.join("; ")}.</p>
                      ) : (
                        <p className="mt-2 text-sm text-muted-foreground">Nothing awaits a decision.</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New property</CardTitle>
            <CardDescription>
              A governed mutation: idempotent, receipted, actor-bound.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="property-name">Property name</Label>
                <Input
                  id="property-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Stillhouse"
                  aria-invalid={createFailure ? true : undefined}
                  aria-describedby={createFailure ? "property-name-error" : undefined}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5">
                  <Label htmlFor="property-type">Property type</Label>
                  <InfoHint
                    id="hint-property-type"
                    text="What kind of world this is: fictional (story canon), editorial, brand, interactive, or a hybrid. It shapes which rules and surfaces matter most."
                  />
                </span>
                <Select
                  id="property-type"
                  value={propertyType}
                  onChange={(event) => setPropertyType(event.target.value)}
                >
                  {PROPERTY_TYPES.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
              {createFailure ? (
                <StatusMessage variant="error" id="property-name-error">
                  {createFailure}
                </StatusMessage>
              ) : null}
              {notice ? <StatusMessage variant="notice">{notice}</StatusMessage> : null}
              <Button type="submit" disabled={create.status === "submitting" || !name.trim()}>
                {create.status === "submitting" ? "Creating…" : "Create property"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
