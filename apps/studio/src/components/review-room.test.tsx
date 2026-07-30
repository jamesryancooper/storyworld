import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { ReviewRoom } from "./review-room";

afterEach(cleanup);

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

  it("has no accessibility violations, including the open review region", async () => {
    const user = userEvent.setup();
    const { container } = render(<ReviewRoom client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/The Archivist/)).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    await expectAccessible(container);
  });
});
