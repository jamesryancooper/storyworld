import * as React from "react";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

// usePathname drives the active-route marker; mock it per the current route.
vi.mock("next/navigation", () => ({ usePathname: () => "/arc-board" }));

import { AppNav } from "./app-nav";

afterEach(cleanup);

describe("AppNav (SWUX-008/018)", () => {
  it("marks the current route with aria-current on the desktop sidebar", () => {
    render(<AppNav />);
    const sidebar = screen.getByRole("navigation", { name: "Studio surfaces" });
    const active = within(sidebar).getByRole("link", { name: "Arc Board" });
    expect(active.getAttribute("aria-current")).toBe("page");
    expect(within(sidebar).getByRole("link", { name: "Command Center" }).getAttribute("aria-current")).toBeNull();
  });

  it("exposes a narrow-screen menu that expands, collapses, and closes on Escape returning focus", async () => {
    const user = userEvent.setup();
    render(<AppNav />);
    const toggle = screen.getByRole("button", { name: /Menu/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    // No mobile menu nav until opened.
    expect(screen.queryByRole("navigation", { name: "Studio surfaces menu" })).toBeNull();

    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const menu = screen.getByRole("navigation", { name: "Studio surfaces menu" });
    expect(within(menu).getByRole("link", { name: "Arc Board" }).getAttribute("aria-current")).toBe("page");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("navigation", { name: "Studio surfaces menu" })).toBeNull());
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("collapses the menu after following a link", async () => {
    const user = userEvent.setup();
    render(<AppNav />);
    await user.click(screen.getByRole("button", { name: /Menu/ }));
    const menu = screen.getByRole("navigation", { name: "Studio surfaces menu" });
    await user.click(within(menu).getByRole("link", { name: "World Bible" }));
    await waitFor(() => expect(screen.queryByRole("navigation", { name: "Studio surfaces menu" })).toBeNull());
  });
});
