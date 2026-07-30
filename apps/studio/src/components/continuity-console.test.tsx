import * as React from "react";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { expectAccessible } from "@/test/axe";
import { mockEngine } from "@/test/mock-engine";
import { EngineError } from "@/lib/engine";
import { ContinuityConsole } from "./continuity-console";

afterEach(cleanup);

describe("Continuity Console", () => {
  it("lists findings blocker-first with dispositions", async () => {
    render(<ContinuityConsole client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/Contradictory state/)).toBeDefined());
    expect(screen.getByText("blocker")).toBeDefined();
    expect(screen.getByText("1 open finding(s)")).toBeDefined();
    expect(screen.getByText("resolved")).toBeDefined();
  });

  it("runs an evaluation and reports the recorded findings", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ContinuityConsole client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Evaluate continuity" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Evaluate continuity" }));
    await waitFor(() => expect(engine.evaluations).toHaveLength(1));
    expect(engine.evaluations[0]).toMatchObject({ productionId: "prod-1", unitId: "u-1" });
    await waitFor(() => expect(screen.getByText(/recorded 1 finding/)).toBeDefined());
  });

  it("resolving goes through the finding review — never a single click", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ContinuityConsole client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Review…" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    // The review shows the finding's contract evidence…
    expect(screen.getByText("f-1")).toBeDefined();
    expect(screen.getByText("92%")).toBeDefined();
    expect(screen.getByText(/timeline:1989-06-03/)).toBeDefined();
    expect(screen.getByText(/Align the state transition/)).toBeDefined();
    // …and nothing is recorded by that single activation.
    expect(engine.dispositions).toHaveLength(0);
    await user.click(screen.getByRole("button", { name: "Record disposition" }));
    await waitFor(() => expect(engine.dispositions).toHaveLength(1));
    expect(engine.dispositions[0]).toEqual({ findingId: "f-1", disposition: "resolved" });
    await waitFor(() => expect(screen.getByText(/receipt rcpt-fin-1/)).toBeDefined());
  });

  it("a waiver requires the reviewer's own rationale and scope, sent verbatim (SWUX-003)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ContinuityConsole client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Review…" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    await user.selectOptions(screen.getByLabelText("Disposition"), "intentional_exception");
    // Without a typed rationale and scope, the confirm stays disabled.
    const confirm = screen.getByRole("button", { name: "Record disposition" }) as HTMLButtonElement;
    expect(confirm.disabled).toBe(true);
    await user.type(
      screen.getByLabelText("Waiver rationale — your own words"),
      "The flashback intentionally contradicts the archive record.",
    );
    expect(confirm.disabled).toBe(true);
    await user.type(screen.getByLabelText("Waiver scope"), "this production only");
    await waitFor(() => expect(confirm.disabled).toBe(false));
    await user.click(confirm);
    await waitFor(() => expect(engine.dispositions).toHaveLength(1));
    expect(engine.dispositions[0]).toEqual({
      findingId: "f-1",
      disposition: "intentional_exception",
      waiver: {
        reason: "The flashback intentionally contradicts the archive record.",
        scope: "this production only",
        expiry: null,
      },
    });
  });

  it("keyboard-only disposition needs two explicit activations (SF1)", async () => {
    const engine = mockEngine();
    const user = userEvent.setup();
    render(<ContinuityConsole client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Review…" })).toBeDefined());
    const review = screen.getByRole("button", { name: "Review…" });
    review.focus();
    await user.keyboard("{Enter}");
    expect(engine.dispositions).toHaveLength(0);
    const record = await screen.findByRole("button", { name: "Record disposition" });
    record.focus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(engine.dispositions).toHaveLength(1));
  });

  it("an evaluation whose refresh fails is surfaced, not swallowed (SF3)", async () => {
    let calls = 0;
    const base = mockEngine();
    const engine = mockEngine({
      async listContinuityFindings(productionId) {
        calls += 1;
        if (calls > 1) throw new Error("refetch boom");
        return base.listContinuityFindings(productionId);
      },
    });
    const user = userEvent.setup();
    render(<ContinuityConsole client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Evaluate continuity" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Evaluate continuity" }));
    await waitFor(() => expect(engine.evaluations).toHaveLength(1));
    await waitFor(() => expect(screen.getByText(/refreshing the list failed/)).toBeDefined());
  });

  it("preserves typed waiver rationale and scope when the engine denies (SF5 lost-work)", async () => {
    const engine = mockEngine({
      async disposeFinding() {
        throw new EngineError(403, "authority", "not the owner");
      },
    });
    const user = userEvent.setup();
    render(<ContinuityConsole client={engine} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Review…" })).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    await user.selectOptions(screen.getByLabelText("Disposition"), "waived");
    await user.type(screen.getByLabelText("Waiver rationale — your own words"), "Deliberate ambiguity for the mystery.");
    await user.type(screen.getByLabelText("Waiver scope"), "this production only");
    await user.click(screen.getByRole("button", { name: "Record disposition" }));
    await waitFor(() => expect(screen.getByText(/Not authorized/)).toBeDefined());
    // The reviewer's own words survive the rejection.
    expect((screen.getByLabelText("Waiver rationale — your own words") as HTMLTextAreaElement).value).toBe(
      "Deliberate ambiguity for the mystery.",
    );
    expect((screen.getByLabelText("Waiver scope") as HTMLInputElement).value).toBe("this production only");
  });

  it("never fabricates the owner's waiver rationale anywhere in the source (SWUX-003)", () => {
    const srcRoot = join(process.cwd(), "src");
    const files: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(ts|tsx)$/.test(entry)) files.push(full);
      }
    };
    walk(srcRoot);
    const fabricated = "Accepted as intentional" + " by the owner";
    for (const file of files.filter((f) => !f.endsWith("continuity-console.test.tsx"))) {
      expect(readFileSync(file, "utf8"), file).not.toContain(fabricated);
    }
  });

  it("has no accessibility violations, including the open review region", async () => {
    const user = userEvent.setup();
    const { container } = render(<ContinuityConsole client={mockEngine()} />);
    await waitFor(() => expect(screen.getByText(/Contradictory state/)).toBeDefined());
    await user.click(screen.getByRole("button", { name: "Review…" }));
    await user.selectOptions(screen.getByLabelText("Disposition"), "intentional_exception");
    await expectAccessible(container);
  });
});
