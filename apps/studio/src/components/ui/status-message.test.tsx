import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { StatusMessage } from "./status-message";
import { InfoHint } from "./info-hint";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("StatusMessage (SWUX-015)", () => {
  it("announces notices politely (role=status) and errors assertively (role=alert)", () => {
    render(
      <>
        <StatusMessage variant="notice">saved</StatusMessage>
        <StatusMessage variant="error">boom</StatusMessage>
      </>,
    );
    const status = screen.getByRole("status");
    expect(status.textContent).toBe("saved");
    expect(status.getAttribute("aria-live")).toBe("polite");
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toBe("boom");
    expect(alert.getAttribute("aria-live")).toBe("assertive");
  });
});

describe("InfoHint (SWUX-015 / WCAG 2.2 target size + Escape)", () => {
  it("has a 24px-minimum target and its tooltip is wired via aria-describedby", () => {
    render(<InfoHint id="hint-x" text="explanation" />);
    const trigger = screen.getByRole("button", { name: "What is this?" });
    expect(trigger.className).toContain("min-h-6");
    expect(trigger.className).toContain("min-w-6");
    expect(trigger.getAttribute("aria-describedby")).toBe("hint-x");
    expect(document.getElementById("hint-x")?.textContent).toBe("explanation");
  });

  it("reveals the tooltip on focus and dismisses it on Escape", async () => {
    const user = userEvent.setup();
    render(<InfoHint id="hint-y" text="explain" />);
    const trigger = screen.getByRole("button", { name: "What is this?" });
    const tip = document.getElementById("hint-y")!;
    await user.tab();
    expect(document.activeElement).toBe(trigger);
    expect(tip.className).toContain("opacity-100");
    await user.keyboard("{Escape}");
    expect(tip.className).toContain("opacity-0");
  });
});
