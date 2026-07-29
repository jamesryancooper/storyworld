import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { GenerationWorkbench } from "./generation-workbench";

afterEach(cleanup);

describe("Generation Workbench", () => {
  it("shows the scene state packet for the selected unit", async () => {
    render(<GenerationWorkbench client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/Computed state at story time/)).toBeDefined());
    expect(screen.getByText("entity:e-1")).toBeDefined();
    expect(screen.getByText(/1 active thread/)).toBeDefined();
  });

  it("runs a governed generation and shows staged provenance", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<GenerationWorkbench client={engine} />);
    await waitFor(() => expect(screen.getByText(/Computed state/)).toBeDefined());
    await user.type(screen.getByLabelText("Prompt"), "the archive at dusk");
    await user.type(screen.getByLabelText(/Locked attributes/), "character:mara:appearance");
    await user.click(screen.getByRole("button", { name: "Generate candidates" }));
    await waitFor(() => expect(engine.runs).toHaveLength(1));
    expect(engine.runs[0]).toMatchObject({
      adapterId: "mock",
      prompt: "the archive at dusk",
      lockedAttributes: ["character:mara:appearance"],
    });
    await waitFor(() => expect(screen.getByText(/Staged 1 candidate/)).toBeDefined());
    expect(screen.getByText(/mock · mock\/deterministic/)).toBeDefined();
    expect(screen.getByText("3 ms")).toBeDefined();
  });

  it("surfaces a reserved-crossing refusal instead of failing silently", async () => {
    const engine = mockEngine({
      async runGeneration() {
        throw new Error("engine POST /v1/generation-runs failed: 403 (reserved crossing)");
      },
    });
    const user = userEvent.setup();
    render(<GenerationWorkbench client={engine} />);
    await waitFor(() => expect(screen.getByText(/Computed state/)).toBeDefined());
    await user.type(screen.getByLabelText("Prompt"), "dusk");
    await user.selectOptions(screen.getByLabelText("Provider"), "fal");
    await user.click(screen.getByRole("button", { name: "Generate candidates" }));
    await waitFor(() => expect(screen.getByText(/reserved crossing/)).toBeDefined());
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<GenerationWorkbench client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/Computed state/)).toBeDefined());
    await expectAccessible(container);
  });
});
