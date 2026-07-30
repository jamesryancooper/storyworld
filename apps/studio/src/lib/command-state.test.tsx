import * as React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { useEngineCommand } from "./command-state";
import { EngineError, EngineUnknownOutcomeError } from "./engine";

afterEach(cleanup);

function Harness({
  execute,
  refresh,
}: {
  execute: (key: string) => Promise<string>;
  refresh?: () => Promise<void>;
}): React.JSX.Element {
  const command = useEngineCommand<string>();
  return (
    <div>
      <output aria-label="status">{command.status}</output>
      <output aria-label="result">{command.result ?? ""}</output>
      <output aria-label="error">{command.error ?? ""}</output>
      <button onClick={() => void command.run({ execute, ...(refresh ? { refresh } : {}) })}>run</button>
      <button onClick={() => void command.retry()}>retry</button>
      <button onClick={() => command.reset()}>reset</button>
    </div>
  );
}

describe("useEngineCommand (SWUX-001 safe-command state machine)", () => {
  it("retains one idempotency key across an unknown-outcome retry, mints a fresh one after reset", async () => {
    const keys: string[] = [];
    let calls = 0;
    const user = userEvent.setup();
    render(
      <Harness
        execute={async (key) => {
          keys.push(key);
          calls += 1;
          if (calls === 1) throw new EngineUnknownOutcomeError("/v1/test");
          return "recorded";
        }}
      />,
    );
    await user.click(screen.getByRole("button", { name: "run" }));
    await waitFor(() => expect(screen.getByLabelText("status").textContent).toBe("unknown"));
    // Duplicate blocking: run() is ignored while the outcome is unknown.
    await user.click(screen.getByRole("button", { name: "run" }));
    expect(keys).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "retry" }));
    await waitFor(() => expect(screen.getByLabelText("status").textContent).toBe("confirmed"));
    expect(keys).toHaveLength(2);
    expect(keys[1]).toBe(keys[0]);
    expect(screen.getByLabelText("result").textContent).toBe("recorded");

    await user.click(screen.getByRole("button", { name: "reset" }));
    await user.click(screen.getByRole("button", { name: "run" }));
    await waitFor(() => expect(keys).toHaveLength(3));
    expect(keys[2]).not.toBe(keys[0]);
  });

  it("keeps the confirmed result when only the refresh fails", async () => {
    const user = userEvent.setup();
    render(
      <Harness
        execute={async () => "recorded"}
        refresh={async () => {
          throw new Error("refresh boom");
        }}
      />,
    );
    await user.click(screen.getByRole("button", { name: "run" }));
    await waitFor(() => expect(screen.getByLabelText("status").textContent).toBe("refresh_failed"));
    expect(screen.getByLabelText("result").textContent).toBe("recorded");
    expect(screen.getByLabelText("error").textContent).toContain("refresh boom");
  });

  it("maps engine problem statuses to distinct failure states", async () => {
    const user = userEvent.setup();
    const statuses: [EngineError, string][] = [
      [new EngineError(400, "validation", "bad document"), "validation_failed"],
      [new EngineError(403, "authority", "not the owner"), "permission_denied"],
      [new EngineError(409, "stale-conflict", "stale supersession"), "conflict"],
      [new EngineError(503, "internal", "engine down"), "unavailable"],
    ];
    for (const [error, expected] of statuses) {
      const { unmount } = render(
        <Harness
          execute={async () => {
            throw error;
          }}
        />,
      );
      await user.click(screen.getByRole("button", { name: "run" }));
      await waitFor(() => expect(screen.getByLabelText("status").textContent).toBe(expected));
      expect(screen.getByLabelText("error").textContent).toBe(error.detail);
      unmount();
      cleanup();
    }
  });

  it("mints a fresh key when the operation identity changes, retains it for the same op (SF5)", async () => {
    const keys: string[] = [];
    let firstOpCalls = 0;
    const user = userEvent.setup();
    function TwoOps(): React.JSX.Element {
      const command = useEngineCommand<string>();
      return (
        <div>
          <output aria-label="status">{command.status}</output>
          <button
            onClick={() =>
              void command.run(
                {
                  execute: async (key) => {
                    keys.push(key);
                    firstOpCalls += 1;
                    if (firstOpCalls === 1) throw new EngineError(400, "validation", "bad");
                    return "a";
                  },
                },
                "op-A",
              )
            }
          >
            runA
          </button>
          <button
            onClick={() =>
              void command.run(
                {
                  execute: async (key) => {
                    keys.push(key);
                    return "b";
                  },
                },
                "op-B",
              )
            }
          >
            runB
          </button>
        </div>
      );
    }
    render(<TwoOps />);
    // op-A fails validation: its key is retained for a same-op retry…
    await user.click(screen.getByRole("button", { name: "runA" }));
    await waitFor(() => expect(screen.getByLabelText("status").textContent).toBe("validation_failed"));
    await user.click(screen.getByRole("button", { name: "runA" }));
    await waitFor(() => expect(keys).toHaveLength(2));
    expect(keys[1]).toBe(keys[0]);
    // …but switching to a different operation mints a fresh key (no leak).
    await user.click(screen.getByRole("button", { name: "runB" }));
    await waitFor(() => expect(keys).toHaveLength(3));
    expect(keys[2]).not.toBe(keys[0]);
  });

  it("treats an unclassifiable failure as unknown so duplicates stay blocked", async () => {
    const user = userEvent.setup();
    render(
      <Harness
        execute={async () => {
          throw new Error("socket hang up");
        }}
      />,
    );
    await user.click(screen.getByRole("button", { name: "run" }));
    await waitFor(() => expect(screen.getByLabelText("status").textContent).toBe("unknown"));
    await user.click(screen.getByRole("button", { name: "run" }));
    // Still one attempt: an unknown outcome blocks re-run until retry/reconcile.
    expect(screen.getByLabelText("status").textContent).toBe("unknown");
  });

  it("blocks duplicate submissions while one is in flight", async () => {
    let calls = 0;
    let release: (() => void) | null = null;
    const user = userEvent.setup();
    render(
      <Harness
        execute={async () => {
          calls += 1;
          await new Promise<void>((resolve) => {
            release = resolve;
          });
          return "recorded";
        }}
      />,
    );
    await user.click(screen.getByRole("button", { name: "run" }));
    await user.click(screen.getByRole("button", { name: "run" }));
    await user.click(screen.getByRole("button", { name: "run" }));
    expect(calls).toBe(1);
    release!();
    await waitFor(() => expect(screen.getByLabelText("status").textContent).toBe("confirmed"));
  });
});
