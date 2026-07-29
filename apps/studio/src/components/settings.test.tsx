import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { Settings } from "./settings";

afterEach(cleanup);

describe("Settings (provider credentials)", () => {
  it("shows the fal slot with its lifecycle and the store state", async () => {
    render(<Settings client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("fal.ai key (engine generation)")).toBeDefined());
    expect(screen.getByText("absent")).toBeDefined();
    expect(screen.getByText("encrypted store ready")).toBeDefined();
  });

  it("stores a key through the governed path and reports the reserved crossing", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<Settings client={engine} />);
    await waitFor(() => expect(screen.getByLabelText("Enter key")).toBeDefined());
    const input = screen.getByLabelText("Enter key") as HTMLInputElement;
    expect(input.type).toBe("password");
    await user.type(input, "fal-live-0123456789abcdef");
    await user.click(screen.getByRole("button", { name: "Save encrypted" }));
    await waitFor(() => expect(engine.storedKeys).toHaveLength(1));
    expect(engine.storedKeys[0]).toEqual({ name: "fal", value: "fal-live-0123456789abcdef" });
    await waitFor(() => expect(screen.getByText(/stored encrypted/)).toBeDefined());
    expect(screen.queryByDisplayValue("fal-live-0123456789abcdef")).toBeNull();
  });

  it("revokes an active key", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<Settings client={engine} />);
    await waitFor(() => expect(screen.getByLabelText("Enter key")).toBeDefined());
    await user.type(screen.getByLabelText("Enter key"), "fal-live-0123456789abcdef");
    await user.click(screen.getByRole("button", { name: "Save encrypted" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Revoke" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Revoke" }));
    await waitFor(() => expect(engine.revokedKeys).toHaveLength(1));
    await waitFor(() => expect(screen.getByText(/Revocation denies immediately/)).toBeDefined());
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Settings client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("fal.ai key (engine generation)")).toBeDefined());
    await expectAccessible(container);
  });
});
