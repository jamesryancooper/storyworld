import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { ReleaseBuilder } from "./release-builder";

afterEach(cleanup);

describe("Release Builder", () => {
  it("lists hash-bound releases", async () => {
    render(<ReleaseBuilder client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    expect(screen.getByText("aaaaaaaaaaaa")).toBeDefined();
    expect(screen.getByText("latest v1.0.0")).toBeDefined();
  });

  it("snapshots a release superseding the newest", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReleaseBuilder client={engine} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    await user.type(screen.getByLabelText("Release name"), "stillhouse-canon");
    await user.type(screen.getByLabelText("Version"), "1.1.0");
    await user.click(screen.getByRole("button", { name: "Snapshot" }));
    await waitFor(() => expect(engine.snapshots).toHaveLength(1));
    expect(engine.snapshots[0]).toMatchObject({
      branchId: "b-1",
      releaseVersion: "1.1.0",
      supersedesReleaseId: "r-1",
    });
  });

  it("creates a production pinned to an exact release and shows it immediately", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ReleaseBuilder client={engine} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    expect(screen.getByText("Season One")).toBeDefined();
    await user.type(screen.getByLabelText("Production name"), "Season Two");
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

  it("has no accessibility violations", async () => {
    const { container } = render(<ReleaseBuilder client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("stillhouse-canon")).toBeDefined());
    await expectAccessible(container);
  });
});
