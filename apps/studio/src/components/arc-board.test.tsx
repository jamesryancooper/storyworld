import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
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

  it("adding a unit supersedes the current structure revision", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ArcBoard client={engine} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/)).toHaveLength(2));
    await user.type(screen.getByLabelText("Story time"), "1989-06-03");
    await user.click(screen.getByRole("button", { name: "Add unit" }));
    await waitFor(() => expect(engine.saved).toHaveLength(1));
    const savedInput = engine.saved[0]!;
    expect(savedInput.supersedesRevisionId).toBe("sr-1");
    const units = savedInput.document["narrative_units"] as Record<string, unknown>[];
    expect(units).toHaveLength(3);
    expect(units[2]?.["story_time"]).toBe("1989-06-03");
    expect(units[2]?.["presentation_order"]).toBe(3);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ArcBoard client={mockEngine()} />);
    await waitFor(() => expect(screen.getAllByText(/1989-06/)).toHaveLength(2));
    await expectAccessible(container);
  });
});
