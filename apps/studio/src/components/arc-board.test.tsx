import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { EngineError } from "@/lib/engine";
import { ArcBoard } from "./arc-board";

afterEach(cleanup);

describe("Arc Board", () => {
  it("shows units in presentation order with independent story time", async () => {
    render(<ArcBoard client={mockEngine()} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/)).toHaveLength(2));
    const rows = screen.getAllByRole("row").slice(1);
    expect(rows[0]?.textContent).toContain("1989-06-02");
    expect(rows[1]?.textContent).toContain("1989-06-01");
    expect(screen.getByText(/1 narrative thread/)).toBeDefined();
  });

  it("adding a unit goes through the consequence review, then the typed append (DEC-0020)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/)).toHaveLength(2));
    await user.type(screen.getByLabelText("Story time"), "1989-06-03");
    await user.click(screen.getByRole("button", { name: "Add unit" }));
    // One activation opens the review; nothing is recorded yet.
    expect(engine.added).toHaveLength(0);
    expect(screen.getByText(/Supersedes/)).toBeDefined();
    expect(screen.getByText(/revision sr-1/)).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Save as accepted revision" }));
    await waitFor(() => expect(engine.added).toHaveLength(1));
    expect(engine.added[0]).toEqual({
      productionId: "prod-1",
      unit: { unitType: "episode", presentationOrder: 3, storyTime: "1989-06-03" },
      supersedesRevisionId: "sr-1",
    });
    await waitFor(() => expect(screen.getByText(/receipt rcpt-arc-1/)).toBeDefined());
  });

  it("a stale base is a conflict that preserves the typed input (SWUX-007)", async () => {
    const engine = mockEngine({
      async addNarrativeUnit() {
        throw new EngineError(
          409,
          "stale-conflict",
          "stale supersession for production prod-1: current structure revision is sr-9; reload the current structure and re-apply the change",
        );
      },
    });
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/)).toHaveLength(2));
    await user.type(screen.getByLabelText("Story time"), "1989-06-04");
    await user.click(screen.getByRole("button", { name: "Add unit" }));
    await user.click(screen.getByRole("button", { name: "Save as accepted revision" }));
    // The conflict names the server's current head and offers reconciliation…
    await waitFor(() => expect(screen.getByText(/current structure revision is sr-9/)).toBeDefined());
    expect(screen.getByRole("button", { name: /Reload mode/ })).toBeDefined();
    // …and the creator's typed input survives.
    expect((screen.getByLabelText("Story time") as HTMLInputElement).value).toBe("1989-06-04");
  });

  it("keyboard Enter in the form opens the review but never appends (SF1)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/)).toHaveLength(2));
    const storyTime = screen.getByLabelText("Story time");
    storyTime.focus();
    await user.type(storyTime, "1989-06-03");
    await user.keyboard("{Enter}");
    // Enter submits the form → opens the review; nothing is appended yet.
    expect(engine.added).toHaveLength(0);
    expect(screen.getByRole("region")).toBeDefined();
    // A second, explicit activation is required to record.
    await user.click(screen.getByRole("button", { name: "Save as accepted revision" }));
    await waitFor(() => expect(engine.added).toHaveLength(1));
  });

  it("a refresh failure after a recorded append is surfaced, not swallowed (SF3)", async () => {
    let calls = 0;
    const engine = mockEngine({
      async getNarrativeStructure() {
        calls += 1;
        if (calls > 1) throw new Error("refetch boom");
        return {
          structureRevisionId: "sr-1",
          contentSha256: "d".repeat(64),
          document: { narrative_units: [], choices: [], branches: [], threads: [] },
        };
      },
    });
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    await waitFor(() => expect(screen.getByLabelText("Story time")).toBeDefined());
    await user.type(screen.getByLabelText("Story time"), "1989-06-03");
    await user.click(screen.getByRole("button", { name: "Add unit" }));
    await user.click(screen.getByRole("button", { name: "Save as accepted revision" }));
    await waitFor(() => expect(engine.added).toHaveLength(1));
    // The append committed; the warning is visible with its receipt.
    await waitFor(() => expect(screen.getByText(/refreshing the board failed/)).toBeDefined());
    expect(screen.getByText(/receipt rcpt-arc-1/)).toBeDefined();
  });

  it("preserves the typed story time when the engine rejects the document (SF5 lost-work)", async () => {
    const engine = mockEngine({
      async addNarrativeUnit() {
        throw new EngineError(400, "validation", "document failed contract validation");
      },
    });
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/)).toHaveLength(2));
    await user.type(screen.getByLabelText("Story time"), "1989-06-09");
    await user.click(screen.getByRole("button", { name: "Add unit" }));
    await user.click(screen.getByRole("button", { name: "Save as accepted revision" }));
    await waitFor(() => expect(screen.getByText(/refused this as invalid/)).toBeDefined());
    expect((screen.getByLabelText("Story time") as HTMLInputElement).value).toBe("1989-06-09");
  });

  it("switches the save control and copy when the property is flipped to queued mode (DEC-0020)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    // Wait for the mode to load (the toggle only renders once mode is known).
    await waitFor(() => expect(screen.getByRole("button", { name: "Switch to queued" })).toBeDefined());
    // Direct by default.
    expect(screen.getByText(/Direct authoring mode/)).toBeDefined();
    // Flip to queued through the governed toggle (two activations).
    await user.click(screen.getByRole("button", { name: "Switch to queued" }));
    expect(engine.commandKeys.filter((k) => k.method === "setAuthoringMode")).toHaveLength(0);
    await user.click(screen.getByRole("button", { name: "Change authoring mode" }));
    await waitFor(() => expect(screen.getByText(/now queued/)).toBeDefined());
    // The save control and copy now reflect queued mode.
    await waitFor(() => expect(screen.getByRole("button", { name: "Submit for review" })).toBeDefined());
    expect(screen.getByText(/Queued authoring mode/)).toBeDefined();
  });

  it("in queued mode a save submits a proposal, not a direct append (DEC-0020)", async () => {
    const engine = mockEngine();
    await engine.setAuthoringMode({ propertyId: "p-1", mode: "queued" });
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Submit for review" })).toBeDefined());
    await user.type(screen.getByLabelText("Story time"), "1989-07-15");
    await user.click(screen.getByRole("button", { name: "Submit for review" }));
    // One activation opens the review; nothing submitted yet.
    expect(engine.commandKeys.filter((k) => k.method === "submitStructureProposal")).toHaveLength(0);
    await user.click(screen.getByRole("button", { name: "Submit for review" }));
    await waitFor(() =>
      expect(engine.commandKeys.filter((k) => k.method === "submitStructureProposal")).toHaveLength(1),
    );
    // It did NOT go through the direct append path.
    expect(engine.added).toHaveLength(0);
    await waitFor(() => expect(screen.getByText(/waits in the Review Room/)).toBeDefined());
  });

  it("a direct save refused for a queued property surfaces the conflict and preserves input", async () => {
    const engine = mockEngine({
      async addNarrativeUnit() {
        throw new EngineError(409, "stale-conflict", "this property is in queued authoring mode; submit the unit for review instead of saving it directly");
      },
    });
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Add unit" })).toBeDefined());
    await user.type(screen.getByLabelText("Story time"), "1989-08-01");
    await user.click(screen.getByRole("button", { name: "Add unit" }));
    await user.click(screen.getByRole("button", { name: "Save as accepted revision" }));
    await waitFor(() => expect(screen.getByText(/queued authoring mode/)).toBeDefined());
    expect(screen.getByRole("button", { name: /Reload mode/ })).toBeDefined();
    expect((screen.getByLabelText("Story time") as HTMLInputElement).value).toBe("1989-08-01");
  });

  it("explains jargon fields inline (walkthrough finding #4)", async () => {
    render(<ArcBoard client={mockEngine()} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/).length).toBeGreaterThan(0));
    const hints = screen.getAllByRole("button", { name: "What is this?" });
    expect(hints.length).toBeGreaterThanOrEqual(2);
    const storyTimeHint = document.getElementById("hint-story-time");
    expect(storyTimeHint?.textContent).toMatch(/story's own chronology/);
    const described = hints.find((h) => h.getAttribute("aria-describedby") === "hint-story-time");
    expect(described).toBeDefined();
  });

  it("has no accessibility violations, including the open review region", async () => {
    const user = userEvent.setup();
    const { container } = render(<ArcBoard client={mockEngine()} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/)).toHaveLength(2));
    await user.type(screen.getByLabelText("Story time"), "1989-06-03");
    await user.click(screen.getByRole("button", { name: "Add unit" }));
    await expectAccessible(container);
  });
});
