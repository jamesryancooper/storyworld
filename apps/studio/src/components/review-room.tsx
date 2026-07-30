"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CommandRecovery } from "@/components/ui/command-recovery";
import { ConsequenceReview } from "@/components/ui/consequence-review";
import { InfoHint } from "@/components/ui/info-hint";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import { clearUnknownOutcome, recordUnknownOutcome } from "@/lib/unknown-outcome-log";
import {
  actorLine,
  createEngineClient,
  type EngineClient,
  type ProposalView,
  type PropertySummary,
  type StructureProposalView,
} from "@/lib/engine";

export function ReviewRoom({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [properties, setProperties] = React.useState<PropertySummary[]>([]);
  const [propertyId, setPropertyId] = React.useState("");
  const [proposals, setProposals] = React.useState<ProposalView[]>([]);
  const [structureProposals, setStructureProposals] = React.useState<StructureProposalView[]>([]);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [reviewingId, setReviewingId] = React.useState<string | null>(null);
  const [structureReviewingId, setStructureReviewingId] = React.useState<string | null>(null);
  const decideStructure = useEngineCommand<{ decisionId: string; appliedRevisionId: string | null; receiptId: string }>();
  const [proposalType, setProposalType] = React.useState<"entity" | "timeline_event">("entity");
  const [entityType, setEntityType] = React.useState("character");
  const [entityName, setEntityName] = React.useState("");
  const [eventTime, setEventTime] = React.useState("");
  const [eventSummary, setEventSummary] = React.useState("");
  const decide = useEngineCommand<{ decisionId: string; revisionId: string | null; receiptId: string }>();
  const file = useEngineCommand<{ proposalId: string }>();

  React.useEffect(() => {
    void (async () => {
      const list = await engine.listProperties();
      setProperties(list);
      if (list.length > 0) setPropertyId(list[0]!.propertyId);
    })();
  }, [engine]);

  const refresh = React.useCallback(async () => {
    if (!propertyId) return;
    const [canon, structures] = await Promise.all([
      engine.listCanonProposals(propertyId),
      engine.listStructureProposals(propertyId),
    ]);
    setProposals(canon);
    setStructureProposals(structures);
  }, [engine, propertyId]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  const decideCtx = React.useRef<
    { opId: string; decision: string; subjectLabel: string; receipt: string | null } | null
  >(null);

  function finalizeDecide(outcome: string): void {
    const ctx = decideCtx.current;
    if (!ctx) return;
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      clearUnknownOutcome(ctx.opId);
      setReviewingId(null);
      setNotice(
        outcome === "confirmed"
          ? `Decision "${ctx.decision}" recorded${ctx.receipt ? ` — receipt ${ctx.receipt}` : ""}.`
          : `Decision "${ctx.decision}" recorded${ctx.receipt ? ` (receipt ${ctx.receipt})` : ""} — but refreshing the queue failed; reload to see current state.`,
      );
      decide.reset();
    } else if (outcome === "unknown" || outcome === "unavailable") {
      recordUnknownOutcome({ id: ctx.opId, actionLabel: `${ctx.decision} decision`, subjectLabel: ctx.subjectLabel });
    }
  }

  async function onDecide(proposal: ProposalView, decision: "accepted" | "rejected"): Promise<void> {
    setNotice(null);
    const stableId =
      proposal.proposalType === "entity" && typeof proposal.payload["entity_id"] === "string"
        ? { stableId: proposal.payload["entity_id"] }
        : {};
    const opId = `decide:${proposal.proposalId}:${decision}`;
    decideCtx.current = { opId, decision, subjectLabel: `proposal "${describe(proposal)}"`, receipt: null };
    const outcome = await decide.run(
      {
        execute: async (idempotencyKey) => {
          const out = await engine.decideProposal(
            { proposalId: proposal.proposalId, decision, ...stableId },
            { idempotencyKey },
          );
          if (decideCtx.current) decideCtx.current.receipt = out.receiptId;
          return out;
        },
        refresh,
      },
      opId,
    );
    finalizeDecide(outcome);
  }

  const structureCtx = React.useRef<{ opId: string; decision: string; receipt: string | null } | null>(null);

  function finalizeStructure(outcome: string): void {
    const ctx = structureCtx.current;
    if (!ctx) return;
    if (outcome === "confirmed" || outcome === "refresh_failed") {
      clearUnknownOutcome(ctx.opId);
      setStructureReviewingId(null);
      setNotice(
        outcome === "confirmed"
          ? `Structure proposal ${ctx.decision}${ctx.receipt ? ` — receipt ${ctx.receipt}` : ""}.`
          : `Structure proposal ${ctx.decision}${ctx.receipt ? ` (receipt ${ctx.receipt})` : ""} — but refreshing the queue failed; reload to see current state.`,
      );
      decideStructure.reset();
    } else if (outcome === "unknown" || outcome === "unavailable") {
      recordUnknownOutcome({ id: ctx.opId, actionLabel: `${ctx.decision} structure decision`, subjectLabel: "structure proposal" });
    }
  }

  async function onDecideStructure(proposal: StructureProposalView, decision: "accepted" | "rejected"): Promise<void> {
    setNotice(null);
    const opId = `decide-structure:${proposal.proposalId}:${decision}`;
    structureCtx.current = { opId, decision, receipt: null };
    const outcome = await decideStructure.run(
      {
        execute: async (idempotencyKey) => {
          const out = await engine.decideStructureProposal({ proposalId: proposal.proposalId, decision }, { idempotencyKey });
          if (structureCtx.current) structureCtx.current.receipt = out.receiptId;
          return out;
        },
        refresh,
      },
      opId,
    );
    finalizeStructure(outcome);
  }

  const pending = proposals.filter((p) => p.decision === null);
  const decided = proposals.filter((p) => p.decision !== null);
  const pendingStructure = structureProposals.filter((p) => p.decision === null);
  const property = properties.find((p) => p.propertyId === propertyId) ?? null;
  const reviewing = pending.find((p) => p.proposalId === reviewingId) ?? null;
  const structureReviewing = pendingStructure.find((p) => p.proposalId === structureReviewingId) ?? null;
  const decideFailure = describeCommandFailure(decide.status, decide.error);
  const structureFailure = describeCommandFailure(decideStructure.status, decideStructure.error);

  async function onPropose(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!property) return;
    setNotice(null);
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
    const outcome = await file.run({
      execute: (idempotencyKey) =>
        engine.proposeCanon(
          {
            propertyId: property.propertyId,
            branchId: property.officialBranchId,
            proposalType,
            payload,
          },
          { idempotencyKey },
        ),
      refresh,
    });
    if (outcome === "confirmed") {
      setEntityName("");
      setEventTime("");
      setEventSummary("");
      setNotice("Proposal filed — it waits in the queue below until you decide it.");
      file.reset();
    }
  }

  const proposeReady =
    proposalType === "entity" ? entityName.trim().length > 0 : eventTime.trim().length > 0 && eventSummary.trim().length > 0;
  const fileFailure = describeCommandFailure(file.status, file.error);

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
            {fileFailure ? <p className="text-sm text-destructive">{fileFailure}</p> : null}
            <div>
              <Button type="submit" disabled={file.status === "submitting" || !property || !proposeReady}>
                {file.status === "submitting" ? "Filing…" : "File proposal"}
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
            here is reviewed first, then receipted and append-only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notice ? <p className="mb-3 text-sm text-muted-foreground">{notice}</p> : null}
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
                      <Button
                        size="sm"
                        variant="outline"
                        aria-expanded={reviewingId === proposal.proposalId}
                        onClick={() => {
                          setNotice(null);
                          setReviewingId((prior) => (prior === proposal.proposalId ? null : proposal.proposalId));
                        }}
                      >
                        Review…
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {reviewing ? (
            <div className="mt-4 flex flex-col gap-2">
              <ConsequenceReview
                id="rr-review"
                title={`Review proposal — ${describe(reviewing)}`}
                rows={[
                  { label: "Type", value: reviewing.proposalType },
                  { label: "Origin", value: `${reviewing.proposerKind}:${reviewing.proposedBy}` },
                  { label: "Target branch", value: reviewing.branchId },
                  { label: "Deciding actor", value: actorLine() },
                  {
                    label: "Transition",
                    value: "Accept records one working-canon revision; reject records the decision with no canon change.",
                  },
                  { label: "Receipt", value: "A durable canon_approval receipt is recorded either way." },
                ]}
                actions={
                  <>
                    <Button
                      onClick={() => void onDecide(reviewing, "accepted")}
                      disabled={decide.status === "submitting"}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => void onDecide(reviewing, "rejected")}
                      disabled={decide.status === "submitting"}
                    >
                      Reject
                    </Button>
                  </>
                }
                onCancel={() => {
                  setReviewingId(null);
                  decide.reset();
                }}
                busy={decide.status === "submitting"}
              >
                <pre className="max-h-56 overflow-auto rounded-lg border border-border bg-background p-3 text-xs">
                  {JSON.stringify(reviewing.payload, null, 2)}
                </pre>
              </ConsequenceReview>
              {decideFailure ? <p className="text-sm text-destructive">{decideFailure}</p> : null}
              <CommandRecovery
                status={decide.status}
                onRetry={() => void decide.retry().then(finalizeDecide)}
                onCheckStatus={() => {
                  void refresh();
                  setNotice("Queue refetched — check whether the decision already applied before retrying.");
                }}
              />
            </div>
          ) : null}
          {decided.length > 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">{decided.length} previously decided proposal(s).</p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Structure proposals</CardTitle>
          <CardDescription>
            Queued Arc edits (DEC-0020) wait here — accepting one applies it as
            an accepted structure revision only if its base is still current.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingStructure.length === 0 ? (
            <p className="text-sm text-muted-foreground">No structure proposals awaiting review.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Production</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Submitter</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingStructure.map((proposal) => (
                  <TableRow key={proposal.proposalId}>
                    <TableCell>{proposal.productionName}</TableCell>
                    <TableCell className="max-w-md">{proposal.summary}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {proposal.submitterKind}:{proposal.submittedBy}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="outline"
                        aria-expanded={structureReviewingId === proposal.proposalId}
                        onClick={() => {
                          setNotice(null);
                          setStructureReviewingId((prior) => (prior === proposal.proposalId ? null : proposal.proposalId));
                        }}
                      >
                        Review…
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {structureReviewing ? (
            <div className="mt-4 flex flex-col gap-2">
              <ConsequenceReview
                id="rr-structure-review"
                title={`Review structure proposal — ${structureReviewing.summary}`}
                rows={[
                  { label: "Production", value: structureReviewing.productionName },
                  { label: "Change", value: structureReviewing.summary },
                  { label: "Submitted by", value: `${structureReviewing.submitterKind}:${structureReviewing.submittedBy}` },
                  { label: "Base revision", value: structureReviewing.baseRevisionId ?? "none (first revision)" },
                  { label: "Content hash", value: structureReviewing.contentSha256.slice(0, 12) },
                  { label: "Deciding actor", value: actorLine() },
                  {
                    label: "Effect",
                    value:
                      "Accept applies it as an accepted structure revision only if its base is still current; a moved base is rejected and the proposal preserved.",
                  },
                ]}
                actions={
                  <>
                    <Button
                      onClick={() => void onDecideStructure(structureReviewing, "accepted")}
                      disabled={decideStructure.status === "submitting"}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => void onDecideStructure(structureReviewing, "rejected")}
                      disabled={decideStructure.status === "submitting"}
                    >
                      Reject
                    </Button>
                  </>
                }
                onCancel={() => {
                  setStructureReviewingId(null);
                  decideStructure.reset();
                }}
                busy={decideStructure.status === "submitting"}
              />
              {structureFailure ? <p className="text-sm text-destructive">{structureFailure}</p> : null}
              <CommandRecovery
                status={decideStructure.status}
                onRetry={() => void decideStructure.retry().then(finalizeStructure)}
                onCheckStatus={() => {
                  void refresh();
                  setNotice("Queue refetched — check whether the decision already applied before retrying.");
                }}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
