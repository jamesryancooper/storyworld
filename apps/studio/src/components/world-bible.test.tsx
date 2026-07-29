import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { WorldBible } from "./world-bible";

afterEach(cleanup);

describe("World Bible", () => {
  it("shows the pinned release, its entities, and the story-time timeline", async () => {
    render(<WorldBible client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("Mara")).toBeDefined());
    expect(screen.getByText("The Archive")).toBeDefined();
    expect(screen.getByText(/stillhouse-canon v1\.0\.0/)).toBeDefined();
    expect(screen.getByText("Mara finds the archive")).toBeDefined();
  });

  it("explains an empty world instead of rendering nothing", async () => {
    const engine = mockEngine({
      async latestCanonRelease() {
        return null;
      },
    });
    render(<WorldBible client={engine} />);
    await waitFor(() => expect(screen.getByText(/No canon release/)).toBeDefined());
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<WorldBible client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText("Mara")).toBeDefined());
    await expectAccessible(container);
  });
});
