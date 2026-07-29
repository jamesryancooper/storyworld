import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { CommandCenter } from "./command-center";

afterEach(cleanup);

describe("Command Center", () => {
  it("lists properties from the engine and reports connectivity", async () => {
    render(<CommandCenter client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("Stillhouse")).toBeDefined());
    expect(screen.getByText("engine connected")).toBeDefined();
  });

  it("creates a property through the governed command path", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<CommandCenter client={engine} />);
    await waitFor(() => expect(screen.getByText("Stillhouse")).toBeDefined());
    await user.type(screen.getByLabelText("Property name"), "Vellumvale");
    await user.selectOptions(screen.getByLabelText("Property type"), "brand");
    await user.click(screen.getByRole("button", { name: "Create property" }));
    await waitFor(() => expect(engine.created).toHaveLength(1));
    expect(engine.created[0]).toEqual({
      workspaceName: "Vellumvale workspace",
      propertyName: "Vellumvale",
      propertyType: "brand",
    });
  });

  it("reports the engine as unreachable without crashing", async () => {
    const engine = mockEngine({
      async listProperties() {
        throw new Error("connection refused");
      },
    });
    render(<CommandCenter client={engine} />);
    await waitFor(() => expect(screen.getByText("engine unreachable")).toBeDefined());
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CommandCenter client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("Stillhouse")).toBeDefined());
    await expectAccessible(container);
  });
});
