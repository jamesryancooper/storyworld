import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { EngineError, EngineUnknownOutcomeError, type ProposalView } from "@/lib/engine";
import { ReviewRoom } from "./review-room";

afterEach(cleanup);

const TWO_PENDING: ProposalView[] = [
  {
    proposalId: "cp-A",
    branchId: "b-1",
    proposalType: "entity",
    payload: { entity_id: "e-A", entity_type: "character", name: "Proposal A" },
    proposedBy: "extraction-model",
    proposerKind: "model",
    createdAt: "2026-07-28T00:00:00.000Z",
    decision: null,
  },
  {
    proposalId: "cp-B",
    branchId: "b-1",
    proposalType: "entity",
    payload: { entity_id: "e-B", entity_type: "character", name: "Proposal B" },
    proposedBy: "extraction-model",
    proposerKind: "model",
    createdAt: "2026-07-28T00:00:00.000Z",
    decision: null,
  },
];

describe("Review Room", () => {
  it("separates the pending queue from decided proposals", async () => {
    render(<ReviewRoom client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/The Archivist/)).toBeDefined());
    expect(screen.getByText("1 awaiting decision")).toBeDefined();
    expect(screen.getByText(/1 previously decided/)).toBeDefined();
    expect(screen.queryByText(/character: Mara/)).toBeNull();
  });

  it("a single activation opens the review — it never decides (SWUX-002)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReviewRoom client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Review…" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    // The review region is open with the full consequence context…
    expect(screen.getByRole("region")).toBeDefined();
    expect(screen.getByText(/Accept records one working-canon revision/)).toBeDefined();
    expect(screen.getByText(/development identity — not verified/)).toBeDefined();
    expect(screen.getByText(/"entity_id": "e-9"/)).toBeDefined();
    // …and nothing has been decided by that single activation.
    expect(engine.decisions).toHaveLength(0);
  });

  it("accepting an entity proposal takes two activations and carries its stable id", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReviewRoom client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Review…" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    expect(engine.decisions).toHaveLength(0);
    await user.click(screen.getByRole("button", { name: "Accept" }));
    await waitFor(() => expect(engine.decisions).toHaveLength(1));
    expect(engine.decisions[0]).toEqual({
      proposalId: "cp-1",
      decision: "accepted",
      stableId: "e-9",
    });
    await waitFor(() => expect(screen.getByText(/Decision "accepted" recorded — receipt rcpt-dec-1/)).toBeDefined());
  });

  it("keyboard-only decisions also require two explicit activations", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReviewRoom client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Review…" })).toBeDefined());
    const review = screen.getByRole("button", { name: "Review…" });
    review.focus();
    await user.keyboard("{Enter}");
    expect(engine.decisions).toHaveLength(0);
    const reject = await screen.findByRole("button", { name: "Reject" });
    reject.focus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(engine.decisions).toHaveLength(1));
    expect(engine.decisions[0]).toMatchObject({ proposalId: "cp-1", decision: "rejected" });
  });

  it("files a human proposal through the same governed doorway (finding #5)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReviewRoom client={engine} />);
    await waitFor(() => expect(screen.getByText(/The Archivist/)).toBeDefined());
    await user.selectOptions(screen.getByLabelText("Entity type"), "location");
    await user.type(screen.getByLabelText("Name"), "The Stillhouse Cellar");
    await user.click(screen.getByRole("button", { name: "File proposal" }));
    await waitFor(() => expect(engine.filed).toHaveLength(1));
    expect(engine.filed[0]).toMatchObject({
      propertyId: "p-1",
      branchId: "b-1",
      proposalType: "entity",
    });
    const payload = engine.filed[0]!["payload"] as Record<string, unknown>;
    expect(payload["name"]).toBe("The Stillhouse Cellar");
    expect(payload["entity_type"]).toBe("location");
    expect(typeof payload["entity_id"]).toBe("string");
    // The filed proposal appears in the pending queue immediately.
    await waitFor(() => expect(screen.getByText(/location: The Stillhouse Cellar/)).toBeDefined());
    expect(screen.getByText("2 awaiting decision")).toBeDefined();
  });

  it("switches to timeline-event fields and files with story time", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReviewRoom client={engine} />);
    await waitFor(() => expect(screen.getByText(/The Archivist/)).toBeDefined());
    await user.selectOptions(screen.getByLabelText("Proposal type"), "timeline_event");
    await user.type(screen.getByLabelText("Story time"), "1989-06-03");
    await user.type(screen.getByLabelText("Summary"), "The cellar door is found unlocked");
    await user.click(screen.getByRole("button", { name: "File proposal" }));
    await waitFor(() => expect(engine.filed).toHaveLength(1));
    const payload = engine.filed[0]!["payload"] as Record<string, unknown>;
    expect(engine.filed[0]!["proposalType"]).toBe("timeline_event");
    expect(payload["story_time"]).toBe("1989-06-03");
    expect(payload["summary"]).toBe("The cellar door is found unlocked");
  });

  it("an unknown outcome offers a same-key retry and a status reconcile (SF1)", async () => {
    let fail = true;
    const keys: (string | undefined)[] = [];
    const base = mockEngine();
    const flaky = mockEngine({
      async decideProposal(input, opts) {
        keys.push(opts?.idempotencyKey);
        if (fail) throw new EngineUnknownOutcomeError("/v1/review-decisions");
        return base.decideProposal(input, opts);
      },
    });
    const user = userEvent.setup();
    render(<ReviewRoom client={flaky} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Review…" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    await user.click(screen.getByRole("button", { name: "Accept" }));
    await waitFor(() => expect(screen.getByText(/outcome is unknown/)).toBeDefined());
    expect(screen.getByRole("button", { name: "Check current status" })).toBeDefined();
    fail = false;
    await user.click(screen.getByRole("button", { name: "Retry (same idempotency key)" }));
    await waitFor(() => expect(screen.getByText(/Decision "accepted" recorded/)).toBeDefined());
    expect(keys).toHaveLength(2);
    expect(keys[1]).toBe(keys[0]);
  });

  it("a failed decision on one proposal does not leak its key to another (SF5)", async () => {
    const keys: (string | undefined)[] = [];
    const engine = mockEngine({
      async listCanonProposals() {
        return TWO_PENDING;
      },
      async decideProposal(_input, opts) {
        keys.push(opts?.idempotencyKey);
        throw new EngineError(400, "validation", "bad decision");
      },
    });
    const user = userEvent.setup();
    render(<ReviewRoom client={engine} />);
    await waitFor(() => expect(screen.getByText(/Proposal A/)).toBeDefined());
    const reviews = screen.getAllByRole("button", { name: "Review…" });
    await user.click(reviews[0]!);
    await user.click(screen.getByRole("button", { name: "Accept" }));
    await waitFor(() => expect(screen.getByText(/refused this as invalid/)).toBeDefined());
    const reviewsAgain = screen.getAllByRole("button", { name: "Review…" });
    await user.click(reviewsAgain[1]!);
    await user.click(screen.getByRole("button", { name: "Accept" }));
    await waitFor(() => expect(keys).toHaveLength(2));
    expect(keys[1]).not.toBe(keys[0]);
  });

  it("has no accessibility violations, including the open review region", async () => {
    const user = userEvent.setup();
    const { container } = render(<ReviewRoom client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/The Archivist/)).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    await expectAccessible(container);
  });
});
