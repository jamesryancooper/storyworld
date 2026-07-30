import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { mockEngine } from "@/test/mock-engine";
import { WorldBible } from "./world-bible";
import { CommandCenter } from "./command-center";

afterEach(cleanup);

/**
 * SWUX-009: a surface must show a loading placeholder while its query is in
 * flight and must NOT render authoritative empty/absent text before the query
 * resolves; a failed fetch is an "unavailable" error, not an empty state.
 */
describe("loading / empty / unavailable discipline (SWUX-009)", () => {
  it("World Bible shows Loading — not 'No canon release' — until the release query resolves", async () => {
    // Deferred created before render so its resolver is never the noop.
    let resolveRelease!: (value: null) => void;
    const releasePromise = new Promise<null>((r) => {
      resolveRelease = r;
    });
    const engine = mockEngine({ latestCanonRelease: () => releasePromise });
    render(<WorldBible client={engine} />);
    await waitFor(() => expect(screen.getAllByText("Loading…").length).toBeGreaterThan(0));
    expect(screen.queryByText(/No canon release/)).toBeNull();
    resolveRelease(null);
    await waitFor(() => expect(screen.getByText(/No canon release/)).toBeDefined());
  });

  it("Command Center shows Loading before properties resolve, then the empty state", async () => {
    let resolveProps!: (value: never[]) => void;
    const propsPromise = new Promise<never[]>((r) => {
      resolveProps = r;
    });
    const pending = mockEngine({ listAttention: () => propsPromise });
    render(<CommandCenter client={pending} />);
    await waitFor(() => expect(screen.getByText("Loading…")).toBeDefined());
    expect(screen.queryByText(/No properties yet/)).toBeNull();
    resolveProps([]);
    await waitFor(() => expect(screen.getByText(/No properties yet/)).toBeDefined());
  });

  it("Command Center shows an unavailable error — not an empty state — when the fetch rejects", async () => {
    const failing = mockEngine({
      async listAttention() {
        throw new Error("down");
      },
    });
    render(<CommandCenter client={failing} />);
    await waitFor(() => expect(screen.getByText(/engine is unavailable/)).toBeDefined());
    expect(screen.queryByText(/No properties yet/)).toBeNull();
  });
});
