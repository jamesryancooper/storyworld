import * as React from "react";

/**
 * Inline field explanation: an ⓘ button that reveals help on hover or
 * keyboard focus. The hint text stays in the DOM and is wired via
 * aria-describedby, so assistive tech always has it; no dependency and no
 * positioning library (vendored design-system rule).
 */
export function InfoHint({ id, text }: { id: string; text: string }): React.JSX.Element {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label="What is this?"
        aria-describedby={id}
        className="flex h-4 w-4 items-center justify-center rounded-full border border-border text-[10px] leading-none text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        i
      </button>
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-card p-2.5 text-xs font-normal text-card-foreground opacity-0 shadow-md transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}
