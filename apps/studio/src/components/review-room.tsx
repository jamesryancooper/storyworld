"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  createEngineClient,
  type EngineClient,
  type ProposalView,
  type PropertySummary,
} from "@/lib/engine";

export function ReviewRoom({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [properties, setProperties] = React.useState<PropertySummary[]>([]);
  const [propertyId, setPropertyId] = React.useState("");
  const [proposals, setProposals] = React.useState<ProposalView[]>([]);
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
    setProposals(await engine.listCanonProposals(propertyId));
  }, [engine, propertyId]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  async function onDecide(proposal: ProposalView, decision: "accepted" | "rejected"): Promise<void> {
    setNotice(null);
    try {
      const stableId =
        proposal.proposalType === "entity" && typeof proposal.payload["entity_id"] === "string"
          ? { stableId: proposal.payload["entity_id"] }
          : {};
      await engine.decideProposal({ proposalId: proposal.proposalId, decision, ...stableId });
      await refresh();
    } catch (cause) {
      setNotice(String(cause));
    }
  }

  const pending = proposals.filter((p) => p.decision === null);
  const decided = proposals.filter((p) => p.decision !== null);

  function describe(proposal: ProposalView): string {
    const payload = proposal.payload;
    if (proposal.proposalType === "entity") return `${String(payload["entity_type"] ?? "entity")}: ${String(payload["name"] ?? "?")}`;
    if (proposal.proposalType === "timeline_event") return `${String(payload["story_time"] ?? "?")} — ${String(payload["summary"] ?? "?")}`;
    return JSON.stringify(payload).slice(0, 80);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Review Room</h1>
        <Badge variant={pending.length > 0 ? "default" : "outline"}>{pending.length} awaiting decision</Badge>
      </div>

      <div className="max-w-sm">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rr-property">Property</Label>
          <Select
            id="rr-property"
            value={propertyId}
            onChange={(event) => setPropertyId(event.target.value)}
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

      <Card>
        <CardHeader>
          <CardTitle>Proposal queue</CardTitle>
          <CardDescription>
            Proposals never silently change accepted canon — every decision
            here is receipted and append-only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notice ? <p className="mb-3 text-sm text-destructive">{notice}</p> : null}
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing awaiting review.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Proposal</TableHead>
                  <TableHead>Proposer</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((proposal) => (
                  <TableRow key={proposal.proposalId}>
                    <TableCell>
                      <Badge variant="muted">{proposal.proposalType}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md">{describe(proposal)}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {proposal.proposerKind}:{proposal.proposedBy}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="flex gap-2">
                        <Button size="sm" onClick={() => void onDecide(proposal, "accepted")}>
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => void onDecide(proposal, "rejected")}>
                          Reject
                        </Button>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {decided.length > 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">{decided.length} previously decided proposal(s).</p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
