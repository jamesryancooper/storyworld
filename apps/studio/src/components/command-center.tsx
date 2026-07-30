"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InfoHint } from "@/components/ui/info-hint";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import { createEngineClient, type EngineClient, type PropertySummary } from "@/lib/engine";

const PROPERTY_TYPES = ["fictional", "editorial", "brand", "interactive", "hybrid"];

export function CommandCenter({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [reachable, setReachable] = React.useState<boolean | null>(null);
  const [properties, setProperties] = React.useState<PropertySummary[]>([]);
  const [name, setName] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("fictional");
  const [notice, setNotice] = React.useState<string | null>(null);
  const create = useEngineCommand<{ propertyId: string }>();

  // The command uses loadProperties (it throws, so a post-create refresh
  // failure is a real refresh_failed outcome, SF3). The mount health check
  // wraps it to also drive the reachable badge without throwing.
  const loadProperties = React.useCallback(async () => {
    setProperties(await engine.listProperties());
    setReachable(true);
  }, [engine]);

  const checkHealth = React.useCallback(async () => {
    try {
      await loadProperties();
    } catch {
      setReachable(false);
    }
  }, [loadProperties]);

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
      refresh: loadProperties,
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
        <h1 className="text-lg font-semibold">Command Center</h1>
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
            <CardTitle>Properties</CardTitle>
            <CardDescription>
              Every property carries an official canon branch from birth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reachable === null ? (
              <Loading />
            ) : reachable === false ? (
              <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
            ) : properties.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No properties yet — create the first one.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.propertyId}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell>
                        <Badge variant="muted">{property.propertyType}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {property.createdAt.slice(0, 10)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
