"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Inline field explanation: an ⓘ button that reveals help on hover or
 * keyboard focus. The hint text stays in the DOM and is wired via
 * aria-describedby, so assistive tech always has it; no dependency and no
 * positioning library (vendored design-system rule). The hit area is a
 * 24×24 target and the tooltip dismisses on Escape (SWUX-015 / WCAG 2.2).
 */
export function InfoHint({ id, text }: { id: string; text: string }): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="What is this?"
        aria-describedby={id}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        className="flex min-h-6 min-w-6 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span
          aria-hidden
          className="flex h-4 w-4 items-center justify-center rounded-full border border-border text-[10px] leading-none"
        >
          i
        </span>
      </button>
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-card p-2.5 text-xs font-normal text-card-foreground shadow-md transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {text}
      </span>
    </span>
  );
}
