import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { UnknownOutcomeBanner } from "@/components/ui/unknown-outcome-banner";
import {
  clearUnknownOutcome,
  listUnknownOutcomes,
  recordUnknownOutcome,
} from "./unknown-outcome-log";

afterEach(cleanup);
beforeEach(() => {
  for (const entry of listUnknownOutcomes()) clearUnknownOutcome(entry.id);
});

describe("unknown-outcome log (SF2/SWUX-001)", () => {
  it("persists an entry to sessionStorage keyed by id, upserting rather than duplicating", () => {
    recordUnknownOutcome({ id: "op-1", actionLabel: "accepted decision", subjectLabel: 'proposal "X"' });
    recordUnknownOutcome({ id: "op-1", actionLabel: "accepted decision", subjectLabel: 'proposal "X"' });
    expect(listUnknownOutcomes()).toHaveLength(1);
    const raw = window.sessionStorage.getItem("storyworld.unknown-outcomes");
    expect(raw).toContain("op-1");
    clearUnknownOutcome("op-1");
    expect(listUnknownOutcomes()).toHaveLength(0);
  });

  it("returns a referentially stable snapshot until the store changes (useSyncExternalStore safety)", () => {
    // getSnapshot / getServerSnapshot must return the SAME reference across
    // calls when nothing changed, or React's useSyncExternalStore throws
    // "getServerSnapshot should be cached to avoid an infinite loop" (a
    // render-time error jsdom's store shim does not surface, so assert the
    // underlying invariant directly).
    const a = listUnknownOutcomes();
    const b = listUnknownOutcomes();
    expect(a).toBe(b);
    recordUnknownOutcome({ id: "op-stable", actionLabel: "accepted decision", subjectLabel: "X" });
    const c = listUnknownOutcomes();
    expect(c).not.toBe(a);
    expect(listUnknownOutcomes()).toBe(c);
  });

  it("the banner renders recorded outcomes and Dismiss removes them", async () => {
    recordUnknownOutcome({ id: "op-2", actionLabel: "canon release", subjectLabel: "Stillhouse" });
    const user = userEvent.setup();
    render(<UnknownOutcomeBanner />);
    await waitFor(() =>
      expect(screen.getByText(/canon release on Stillhouse had an unknown outcome/)).toBeDefined(),
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    await waitFor(() => expect(screen.queryByText(/had an unknown outcome/)).toBeNull());
    expect(listUnknownOutcomes()).toHaveLength(0);
  });

  it("survives a remount (the reload case): the entry is read back from storage", async () => {
    recordUnknownOutcome({ id: "op-3", actionLabel: "credential save", subjectLabel: "fal.ai slot" });
    const first = render(<UnknownOutcomeBanner />);
    await waitFor(() => expect(screen.getByText(/credential save on fal.ai slot/)).toBeDefined());
    first.unmount();
    cleanup();
    // A fresh mount (as after a page reload) still surfaces the entry.
    render(<UnknownOutcomeBanner />);
    await waitFor(() => expect(screen.getByText(/credential save on fal.ai slot/)).toBeDefined());
  });
});
