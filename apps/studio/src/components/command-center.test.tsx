import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { CommandCenter } from "./command-center";

afterEach(cleanup);

describe("Command Center", () => {
  it("shows the attention portfolio from engine facts and reports connectivity", async () => {
    render(<CommandCenter client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("Stillhouse")).toBeDefined());
    expect(screen.getByText("engine connected")).toBeDefined();
    // Defined attention facts (SWUX-016).
    expect(screen.getByText("2 proposals awaiting review")).toBeDefined();
    expect(screen.getByText("1 open continuity findings")).toBeDefined();
    expect(screen.getByText("latest canon v1.2.0")).toBeDefined();
    expect(screen.getByText(/Next: review 2 pending proposal/)).toBeDefined();
  });

  it("makes the property name and non-zero facts contextual deep links", async () => {
    render(<CommandCenter client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("Stillhouse")).toBeDefined());
    expect((screen.getByRole("link", { name: "Stillhouse" }) as HTMLAnchorElement).getAttribute("href")).toBe(
      "/world-bible?property=p-1",
    );
    expect(
      (screen.getByRole("link", { name: "2 proposals awaiting review" }) as HTMLAnchorElement).getAttribute("href"),
    ).toBe("/review?property=p-1");
    expect(
      (screen.getByRole("link", { name: "1 open continuity findings" }) as HTMLAnchorElement).getAttribute("href"),
    ).toBe("/continuity?property=p-1");
    // A zero-count fact is not a misleading link.
    expect(screen.getByText("0 structure proposals awaiting review").closest("a")).toBeNull();
  });

  it("invents no readiness score and never says 'drift'", async () => {
    const { container } = render(<CommandCenter client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("Stillhouse")).toBeDefined());
    expect(container.textContent?.toLowerCase()).not.toContain("drift");
    expect(container.textContent?.toLowerCase()).not.toContain("readiness score");
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
      async listAttention() {
        calls += 1;
        if (calls > 1) throw new Error("refetch boom");
        return base.listAttention();
      },
    });
    const user = userEvent.setup();
    render(<CommandCenter client={engine} />);
    await waitFor(() => expect(screen.getByText("Stillhouse")).toBeDefined());
    await user.type(screen.getByLabelText("Property name"), "Vellumvale");
    await user.click(screen.getByRole("button", { name: "Create property" }));
    await waitFor(() => expect(engine.created).toHaveLength(1));
    await waitFor(() => expect(screen.getByText(/the list failed to refresh/)).toBeDefined());
    expect((screen.getByLabelText("Property name") as HTMLInputElement).value).toBe("");
  });

  it("reports the engine as unreachable without crashing", async () => {
    const engine = mockEngine({
      async listAttention() {
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
