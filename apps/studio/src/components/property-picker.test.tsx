import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { navState, setSearchParams } from "@/test/next-navigation";
import type { PropertySummary } from "@/lib/engine";
import { PropertyPicker } from "./property-picker";

afterEach(cleanup);

const TWO: PropertySummary[] = [
  { propertyId: "p-1", name: "Stillhouse", propertyType: "fictional", officialBranchId: "b-1", createdAt: "2026-07-28T00:00:00.000Z" },
  { propertyId: "p-2", name: "Vellumvale", propertyType: "brand", officialBranchId: "b-2", createdAt: "2026-07-28T00:00:00.000Z" },
];
const twoEngine = () => mockEngine({ async listProperties() { return TWO; } });

describe("PropertyPicker URL-owned context (SWUX-013; DEC-0022)", () => {
  it("resolves the property named in the URL, not the first", async () => {
    setSearchParams("property=p-2");
    const onProperty = vi.fn();
    render(<PropertyPicker engine={twoEngine()} onProperty={onProperty} />);
    await waitFor(() =>
      expect((screen.getByLabelText("Property") as HTMLSelectElement).value).toBe("p-2"),
    );
    await waitFor(() => expect(onProperty).toHaveBeenCalledWith(expect.objectContaining({ propertyId: "p-2" })));
  });

  it("reconciles an unavailable URL property instead of substituting another", async () => {
    setSearchParams("property=ghost");
    const onProperty = vi.fn();
    render(<PropertyPicker engine={twoEngine()} onProperty={onProperty} />);
    await waitFor(() => expect(screen.getByText(/not available — choose another/)).toBeDefined());
    // Never resolved to a real property.
    expect(onProperty).not.toHaveBeenCalledWith(expect.objectContaining({ propertyId: "p-1" }));
    expect(onProperty).not.toHaveBeenCalledWith(expect.objectContaining({ propertyId: "p-2" }));
  });

  it("auto-selects only when exactly one property exists, noting it and reflecting it into the URL", async () => {
    const onProperty = vi.fn();
    render(<PropertyPicker engine={mockEngine()} onProperty={onProperty} />); // mock default = single p-1
    await waitFor(() => expect(screen.getByText(/Auto-selected \(the only property\)/)).toBeDefined());
    await waitFor(() => expect(onProperty).toHaveBeenCalledWith(expect.objectContaining({ propertyId: "p-1" })));
    expect(navState.replaceCalls.some((u) => u.includes("property=p-1"))).toBe(true);
  });

  it("prompts for an explicit choice with multiple properties and no URL value", async () => {
    const onProperty = vi.fn();
    render(<PropertyPicker engine={twoEngine()} onProperty={onProperty} />);
    await waitFor(() => expect(screen.getByText(/Choose a property to continue/)).toBeDefined());
    expect(onProperty).not.toHaveBeenCalledWith(expect.objectContaining({ propertyId: "p-1" }));
    expect(navState.replaceCalls).toHaveLength(0);
  });

  it("writes the chosen property to the URL", async () => {
    const user = userEvent.setup();
    render(<PropertyPicker engine={twoEngine()} onProperty={vi.fn()} />);
    await waitFor(() => expect(screen.getByText(/Choose a property to continue/)).toBeDefined());
    await user.selectOptions(screen.getByLabelText("Property"), "p-2");
    expect(navState.replaceCalls.at(-1)).toContain("property=p-2");
  });

  it("has no accessibility violations in the choose state", async () => {
    const { container } = render(<PropertyPicker engine={twoEngine()} onProperty={vi.fn()} />);
    await waitFor(() => expect(screen.getByText(/Choose a property to continue/)).toBeDefined());
    await expectAccessible(container);
  });
});
