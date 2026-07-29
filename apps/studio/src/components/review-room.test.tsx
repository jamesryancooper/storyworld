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

  it("accepting an entity proposal carries its stable id", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReviewRoom client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Accept" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Accept" }));
    await waitFor(() => expect(engine.decisions).toHaveLength(1));
    expect(engine.decisions[0]).toEqual({
      proposalId: "cp-1",
      decision: "accepted",
      stableId: "e-9",
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ReviewRoom client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/The Archivist/)).toBeDefined());
    await expectAccessible(container);
  });
});
