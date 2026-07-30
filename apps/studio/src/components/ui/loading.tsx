import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Explicit loading placeholder (SWUX-009). A surface must never render
 * authoritative empty/absent text while its query is still in flight; it
 * shows this instead, reserving comparable vertical space so the layout does
 * not jump when data arrives. The visible "Loading…" is announced politely;
 * the skeleton bars are decorative.
 */
export function Loading({ rows = 3, label = "Loading…" }: { rows?: number; label?: string }): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3" role="status" aria-live="polite">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div aria-hidden className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className={cn("h-4 animate-pulse rounded bg-muted", index % 2 === 0 ? "w-3/4" : "w-1/2")}
          />
        ))}
      </div>
    </div>
  );
}
