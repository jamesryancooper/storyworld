import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { ContinuityConsole } from "./continuity-console";

afterEach(cleanup);

describe("Continuity Console", () => {
  it("lists findings blocker-first with dispositions", async () => {
    render(<ContinuityConsole client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/Contradictory state/)).toBeDefined());
    expect(screen.getByText("blocker")).toBeDefined();
    expect(screen.getByText("1 open finding(s)")).toBeDefined();
    expect(screen.getByText("resolved")).toBeDefined();
  });

  it("runs an evaluation and reports the recorded findings", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ContinuityConsole client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Evaluate continuity" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Evaluate continuity" }));
    await waitFor(() => expect(engine.evaluations).toHaveLength(1));
    expect(engine.evaluations[0]).toMatchObject({ productionId: "prod-1", unitId: "u-1" });
    await waitFor(() => expect(screen.getByText(/recorded 1 finding/)).toBeDefined());
  });

  it("disposes an open finding through the governed path", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ContinuityConsole client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Resolve" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Resolve" }));
    await waitFor(() => expect(engine.dispositions).toHaveLength(1));
    expect(engine.dispositions[0]).toMatchObject({ findingId: "f-1", disposition: "resolved" });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ContinuityConsole client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/Contradictory state/)).toBeDefined());
    await expectAccessible(container);
  });
});
