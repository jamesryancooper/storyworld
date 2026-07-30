import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { SearchBox } from "@/components/ui/search-box";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { navState } from "@/test/next-navigation";
import type { EngineClient } from "@/lib/engine";

afterEach(cleanup);

describe("SearchBox (DEC-0026 — read-only, navigation-only)", () => {
  it("is a combobox whose expanded state and listbox wiring reflect the query", async () => {
    render(<SearchBox client={mockEngine()} />);
    const combobox = screen.getByRole("combobox", { name: "Search the storyworld" });
    expect(combobox.getAttribute("aria-expanded")).toBe("false");
    await userEvent.type(combobox, "Mara");
    await waitFor(() => expect(combobox.getAttribute("aria-expanded")).toBe("true"));
    const listbox = await screen.findByRole("listbox");
    expect(combobox.getAttribute("aria-controls")).toBe(listbox.getAttribute("id"));
    // typed results carry their type and state
    expect(screen.getByText("Mara Venn")).toBeDefined();
    expect(screen.getAllByRole("option").length).toBe(3);
    await expectAccessible(combobox.closest("div")!);
  });

  it("does not open a listbox for a query shorter than two characters", async () => {
    render(<SearchBox client={mockEngine()} />);
    const combobox = screen.getByRole("combobox");
    await userEvent.type(combobox, "M");
    await new Promise((r) => setTimeout(r, 260));
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("ArrowDown + Enter navigates to the active result's deep link and mutates nothing", async () => {
    const engine = mockEngine();
    render(<SearchBox client={engine as EngineClient} />);
    const combobox = screen.getByRole("combobox");
    await userEvent.type(combobox, "Mara");
    await screen.findByRole("listbox");
    await userEvent.keyboard("{ArrowDown}"); // activate the first option (property → /world-bible?property=p-1)
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(navState.pushCalls).toContain("/world-bible?property=p-1"));
    // navigation-only: no command was issued
    expect(engine.commandKeys).toHaveLength(0);
    expect(engine.decisions).toHaveLength(0);
  });

  it("closes on Escape", async () => {
    render(<SearchBox client={mockEngine()} />);
    const combobox = screen.getByRole("combobox");
    await userEvent.type(combobox, "Mara");
    await screen.findByRole("listbox");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    expect(combobox.getAttribute("aria-expanded")).toBe("false");
  });

  it("shows an unavailable error when search throws", async () => {
    const engine = mockEngine({ search: async () => { throw new Error("engine down"); } });
    render(<SearchBox client={engine} />);
    await userEvent.type(screen.getByRole("combobox"), "Mara");
    await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("unavailable"));
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
