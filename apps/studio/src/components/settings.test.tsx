import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { EngineUnknownOutcomeError } from "@/lib/engine";
import { Settings } from "./settings";

afterEach(cleanup);

const KEY = "fal-live-0123456789abcdef";

describe("Settings (provider credentials)", () => {
  it("shows the fal slot with its lifecycle and the store state", async () => {
    render(<Settings client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("fal.ai key (engine generation)")).toBeDefined());
    expect(screen.getByText("absent")).toBeDefined();
    expect(screen.getByText("encrypted store ready")).toBeDefined();
  });

  it("storing a key requires the crossing review and never echoes the key (SWUX-005)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<Settings client={engine} />);
    await waitFor(() => expect(screen.getByLabelText("Enter key")).toBeDefined());
    const input = screen.getByLabelText("Enter key") as HTMLInputElement;
    expect(input.type).toBe("password");
    await user.type(input, KEY);
    await user.click(screen.getByRole("button", { name: "Save encrypted" }));
    // One activation opens the review — nothing is stored yet, and the
    // consequence is named without echoing the key.
    expect(engine.storedKeys).toHaveLength(0);
    expect(
      screen.getByText(/Activating this credential opens the hosted-generation reserved crossing/),
    ).toBeDefined();
    expect(screen.getByText("(hidden — never displayed)")).toBeDefined();
    expect(screen.queryByText(KEY)).toBeNull();
    await user.click(screen.getByRole("button", { name: "Save encrypted — open crossing" }));
    await waitFor(() => expect(engine.storedKeys).toHaveLength(1));
    expect(engine.storedKeys[0]).toEqual({ name: "fal", value: KEY });
    await waitFor(() => expect(screen.getByText(/stored encrypted/)).toBeDefined());
    expect(screen.getByText(/Receipt rcpt-cred-1/)).toBeDefined();
    expect(screen.queryByDisplayValue(KEY)).toBeNull();
  });

  it("revoking requires its own review and reports immediate denial", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<Settings client={engine} />);
    await waitFor(() => expect(screen.getByLabelText("Enter key")).toBeDefined());
    await user.type(screen.getByLabelText("Enter key"), KEY);
    await user.click(screen.getByRole("button", { name: "Save encrypted" }));
    await user.click(screen.getByRole("button", { name: "Save encrypted — open crossing" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Revoke" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Revoke" }));
    expect(engine.revokedKeys).toHaveLength(0);
    await user.click(screen.getByRole("button", { name: "Revoke — deny immediately" }));
    await waitFor(() => expect(engine.revokedKeys).toHaveLength(1));
    await waitFor(() => expect(screen.getByText(/Revocation denies immediately/)).toBeDefined());
  });

  it("an unknown outcome preserves the key input and offers a same-key retry and reconciliation", async () => {
    let fail = true;
    const keys: (string | undefined)[] = [];
    const engine = mockEngine();
    const flaky = mockEngine({
      async setCredential(input, opts) {
        keys.push(opts?.idempotencyKey);
        if (fail) throw new EngineUnknownOutcomeError("/v1/credentials");
        return engine.setCredential(input, opts);
      },
      async listCredentials() {
        return engine.listCredentials();
      },
    });
    const user = userEvent.setup();
    render(<Settings client={flaky} />);
    await waitFor(() => expect(screen.getByLabelText("Enter key")).toBeDefined());
    await user.type(screen.getByLabelText("Enter key"), KEY);
    await user.click(screen.getByRole("button", { name: "Save encrypted" }));
    await user.click(screen.getByRole("button", { name: "Save encrypted — open crossing" }));
    await waitFor(() => expect(screen.getByText(/outcome is unknown/)).toBeDefined());
    // The typed key survives the uncertain outcome (never cleared, never echoed).
    expect((screen.getByLabelText("Enter key") as HTMLInputElement).value).toBe(KEY);
    expect(screen.getByRole("button", { name: "Check current status" })).toBeDefined();
    fail = false;
    await user.click(screen.getByRole("button", { name: "Retry (same idempotency key)" }));
    await waitFor(() => expect(screen.getByText(/stored encrypted/)).toBeDefined());
    expect(keys).toHaveLength(2);
    expect(keys[1]).toBe(keys[0]);
  });

  it("has no accessibility violations, including the open review region", async () => {
    const user = userEvent.setup();
    const { container } = render(<Settings client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("fal.ai key (engine generation)")).toBeDefined());
    await user.type(screen.getByLabelText("Enter key"), KEY);
    await user.click(screen.getByRole("button", { name: "Save encrypted" }));
    await expectAccessible(container);
  });
});
