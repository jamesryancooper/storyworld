"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoHint } from "@/components/ui/info-hint";
import { Input } from "@/components/ui/input";
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
  const [proposalType, setProposalType] = React.useState<"entity" | "timeline_event">("entity");
  const [entityType, setEntityType] = React.useState("character");
  const [entityName, setEntityName] = React.useState("");
  const [eventTime, setEventTime] = React.useState("");
  const [eventSummary, setEventSummary] = React.useState("");
  const [filing, setFiling] = React.useState(false);

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
  const property = properties.find((p) => p.propertyId === propertyId) ?? null;

  async function onPropose(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!property) return;
    setFiling(true);
    setNotice(null);
    try {
      const payload =
        proposalType === "entity"
          ? {
              entity_id: crypto.randomUUID(),
              entity_type: entityType,
              name: entityName.trim(),
              visibility: "team_private",
            }
          : {
              event_id: crypto.randomUUID(),
              story_time: eventTime.trim(),
              summary: eventSummary.trim(),
              state_transitions: [],
            };
      await engine.proposeCanon({
        propertyId: property.propertyId,
        branchId: property.officialBranchId,
        proposalType,
        payload,
      });
      setEntityName("");
      setEventTime("");
      setEventSummary("");
      setNotice("Proposal filed — it waits in the queue below until you decide it.");
      await refresh();
    } catch (cause) {
      setNotice(String(cause));
    } finally {
      setFiling(false);
    }
  }

  const proposeReady =
    proposalType === "entity" ? entityName.trim().length > 0 : eventTime.trim().length > 0 && eventSummary.trim().length > 0;

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
          <CardTitle>Propose to canon</CardTitle>
          <CardDescription>
            Your idea enters the same governed doorway as machine proposals:
            it waits in the queue until a decision, and nothing changes canon
            silently — authorship and authority stay separate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onPropose} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex w-52 flex-col gap-1.5">
                <span className="flex items-center gap-1.5">
                  <Label htmlFor="pr-type">Proposal type</Label>
                  <InfoHint
                    id="hint-proposal-type"
                    text="What kind of canon you are suggesting: a new entity (character, location, object...) or an event on the story timeline."
                  />
                </span>
                <Select
                  id="pr-type"
                  value={proposalType}
                  onChange={(event) => setProposalType(event.target.value as "entity" | "timeline_event")}
                >
                  <option value="entity">Entity</option>
                  <option value="timeline_event">Timeline event</option>
                </Select>
              </div>
              {proposalType === "entity" ? (
                <>
                  <div className="flex w-44 flex-col gap-1.5">
                    <Label htmlFor="pr-entity-type">Entity type</Label>
                    <Select
                      id="pr-entity-type"
                      value={entityType}
                      onChange={(event) => setEntityType(event.target.value)}
                    >
                      {["character", "location", "organization", "faction", "object", "artifact", "vehicle", "symbol"].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex min-w-56 flex-1 flex-col gap-1.5">
                    <Label htmlFor="pr-entity-name">Name</Label>
                    <Input
                      id="pr-entity-name"
                      value={entityName}
                      onChange={(event) => setEntityName(event.target.value)}
                      placeholder="The Archivist"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-44 flex-col gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <Label htmlFor="pr-event-time">Story time</Label>
                      <InfoHint
                        id="hint-proposal-story-time"
                        text="When the event happens in the story's own chronology (e.g. 2031-04-05), independent of presentation order."
                      />
                    </span>
                    <Input
                      id="pr-event-time"
                      value={eventTime}
                      onChange={(event) => setEventTime(event.target.value)}
                      placeholder="1989-06-02"
                    />
                  </div>
                  <div className="flex min-w-56 flex-1 flex-col gap-1.5">
                    <Label htmlFor="pr-event-summary">Summary</Label>
                    <Input
                      id="pr-event-summary"
                      value={eventSummary}
                      onChange={(event) => setEventSummary(event.target.value)}
                      placeholder="The Archivist first appears at the Stillhouse desk"
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              <Button type="submit" disabled={filing || !property || !proposeReady}>
                {filing ? "Filing…" : "File proposal"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

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
