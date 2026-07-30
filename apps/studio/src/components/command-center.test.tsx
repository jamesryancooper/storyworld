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

  it("surfaces a refresh failure after a created property, not swallowing it (SF3)", async () => {
    let calls = 0;
    const base = mockEngine();
    const engine = mockEngine({
      async listProperties() {
        calls += 1;
        if (calls > 1) throw new Error("refetch boom");
        return base.listProperties();
      },
    });
    const user = userEvent.setup();
    render(<CommandCenter client={engine} />);
    await waitFor(() => expect(screen.getByText("Stillhouse")).toBeDefined());
    await user.type(screen.getByLabelText("Property name"), "Vellumvale");
    await user.click(screen.getByRole("button", { name: "Create property" }));
    await waitFor(() => expect(engine.created).toHaveLength(1));
    // The property is recorded; the failed refetch is shown, and the name
    // is cleared so an accidental duplicate is not one Enter away.
    await waitFor(() => expect(screen.getByText(/the list failed to refresh/)).toBeDefined());
    expect((screen.getByLabelText("Property name") as HTMLInputElement).value).toBe("");
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
