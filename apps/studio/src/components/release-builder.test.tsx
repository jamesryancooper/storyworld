import * as React from "react";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { setSearchParams } from "@/test/next-navigation";
import { ReleaseBuilder } from "./release-builder";

afterEach(cleanup);

describe("Release Builder", () => {
  it("lists hash-bound releases", async () => {
    render(<ReleaseBuilder client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    expect(screen.getByText("aaaaaaaaaaaa")).toBeDefined();
    expect(screen.getByText("latest v1.0.0")).toBeDefined();
  });

  it("snapshotting goes through the consequence review and states the publication boundary (SWUX-004)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReleaseBuilder client={engine} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    await user.type(screen.getByLabelText("Release name"), "stillhouse-canon");
    await user.type(screen.getByLabelText("Version"), "1.1.0");
    await user.click(screen.getByRole("button", { name: "Snapshot" }));
    // One activation opens the review; nothing is snapshotted yet.
    expect(engine.snapshots).toHaveLength(0);
    expect(screen.getByText(/canon\.release\.created/)).toBeDefined();
    expect(screen.getByText(/does not publish anything externally/)).toBeDefined();
    expect(screen.getByText(/Season One — stays pinned to v1\.0\.0/)).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Snapshot canon release" }));
    await waitFor(() => expect(engine.snapshots).toHaveLength(1));
    expect(engine.snapshots[0]).toMatchObject({
      branchId: "b-1",
      releaseVersion: "1.1.0",
      supersedesReleaseId: "r-1",
    });
    await waitFor(() => expect(screen.getByText(/Canon release created — receipt rcpt-rel-1/)).toBeDefined());
  });

  it("creates a production through review, pinned to an exact release, and shows it immediately", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReleaseBuilder client={engine} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    expect(screen.getByText("Season One")).toBeDefined();
    await user.type(screen.getByLabelText("Production name"), "Season Two");
    await user.click(screen.getByRole("button", { name: "Create production" }));
    expect(engine.productions).toHaveLength(0);
    expect(within(screen.getByRole("region")).getByText(/stillhouse-canon v1\.0\.0/)).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Create production" }));
    await waitFor(() => expect(engine.productions).toHaveLength(1));
    expect(engine.productions[0]).toEqual({
      propertyId: "p-1",
      pinnedCanonReleaseId: "r-1",
      name: "Season Two",
    });
    // Walkthrough finding #3: the new production must be visible right here,
    // not only as a notice line or on other surfaces.
    await waitFor(() => expect(screen.getByText("Season Two")).toBeDefined());
  });

  it("keyboard Enter in the snapshot form opens the review but never snapshots (SF1)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReleaseBuilder client={engine} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    await user.type(screen.getByLabelText("Release name"), "stillhouse-canon");
    const version = screen.getByLabelText("Version");
    version.focus();
    await user.type(version, "1.1.0");
    await user.keyboard("{Enter}");
    expect(engine.snapshots).toHaveLength(0);
    expect(screen.getByRole("region")).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Snapshot canon release" }));
    await waitFor(() => expect(engine.snapshots).toHaveLength(1));
  });

  it("keyboard Enter in the production form opens the review but never pins (SF1)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReleaseBuilder client={engine} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    const name = screen.getByLabelText("Production name");
    name.focus();
    await user.type(name, "Season Two");
    await user.keyboard("{Enter}");
    expect(engine.productions).toHaveLength(0);
    expect(screen.getByRole("region")).toBeDefined();
    await user.click(screen.getByRole("button", { name: "Create production" }));
    await waitFor(() => expect(engine.productions).toHaveLength(1));
  });

  it("freezes the reviewed property and disables the selector while a review is open (SF4)", async () => {
    const engine = mockEngine({
      async listProperties() {
        return [
          { propertyId: "p-1", name: "Stillhouse", propertyType: "fictional", officialBranchId: "b-1", createdAt: "2026-07-28T00:00:00.000Z" },
          { propertyId: "p-2", name: "Vellumvale", propertyType: "brand", officialBranchId: "b-2", createdAt: "2026-07-28T00:00:00.000Z" },
        ];
      },
    });
    // With multiple properties the URL carries the choice (DEC-0022) — no
    // silent auto-select of the first.
    setSearchParams("property=p-1");
    const user = userEvent.setup();
    render(<ReleaseBuilder client={engine} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    await user.type(screen.getByLabelText("Release name"), "stillhouse-canon");
    await user.type(screen.getByLabelText("Version"), "1.1.0");
    await user.click(screen.getByRole("button", { name: "Snapshot" }));
    // The review names the exact property, and the selector can no longer
    // be switched out from under the pending decision.
    expect(within(screen.getByRole("region")).getByText("Stillhouse")).toBeDefined();
    expect((screen.getByLabelText("Property") as HTMLSelectElement).disabled).toBe(true);
    await user.click(screen.getByRole("button", { name: "Snapshot canon release" }));
    await waitFor(() => expect(engine.snapshots).toHaveLength(1));
    expect(engine.snapshots[0]).toMatchObject({ propertyId: "p-1" });
  });

  it("has no accessibility violations, including the open review region", async () => {
    const user = userEvent.setup();
    const { container } = render(<ReleaseBuilder client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    await user.type(screen.getByLabelText("Release name"), "stillhouse-canon");
    await user.type(screen.getByLabelText("Version"), "1.1.0");
    await user.click(screen.getByRole("button", { name: "Snapshot" }));
    await expectAccessible(container);
  });
});
