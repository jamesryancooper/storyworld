"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  clearUnknownOutcome,
  listUnknownOutcomes,
  subscribeUnknownOutcomes,
} from "@/lib/unknown-outcome-log";

/**
 * Persistent warning for commands whose outcome was never confirmed
 * (SF2/SWUX-001). Reads the sessionStorage-backed log, so a reload during
 * an unknown outcome still tells the creator to verify the action before
 * resubmitting. Rendered only after mount to avoid a hydration mismatch
 * (the server has no sessionStorage).
 */
export function UnknownOutcomeBanner(): React.JSX.Element | null {
  // Both snapshots return the module's stable `cache` reference (the server
  // value is always the initial empty array), so React never sees a changing
  // snapshot and its infinite-loop guard stays quiet. Hydration parity is
  // handled separately by the mount gate below.
  const entries = React.useSyncExternalStore(
    subscribeUnknownOutcomes,
    listUnknownOutcomes,
    listUnknownOutcomes,
  );
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted || entries.length === 0) return null;
  return (
    <div className="mb-4 flex flex-col gap-2">
      {entries.map((entry) => (
        <div
          key={entry.id}
          role="alert"
          className="flex items-start justify-between gap-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm"
        >
          <span>
            A previous {entry.actionLabel} on {entry.subjectLabel} had an unknown outcome — verify it
            before resubmitting.
          </span>
          <Button size="sm" variant="outline" onClick={() => clearUnknownOutcome(entry.id)}>
            Dismiss
          </Button>
        </div>
      ))}
    </div>
  );
}
