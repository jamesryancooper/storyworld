"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import type { CommandStatus } from "@/lib/command-state";

/**
 * Recovery controls for an unconfirmed command (SF1/SWUX-001). When the
 * outcome is unknown or the engine is unavailable, the creator can retry
 * with the SAME idempotency key (safe: the engine replays a completed
 * command instead of doubling it) or reconcile against current state.
 * Without these, the only exits — cancel or reload — would mint a fresh
 * key and risk a duplicate.
 */
export function CommandRecovery({
  status,
  onRetry,
  onCheckStatus,
}: {
  status: CommandStatus;
  onRetry: () => void;
  onCheckStatus: () => void;
}): React.JSX.Element | null {
  if (status !== "unknown" && status !== "unavailable") return null;
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={onRetry}>
        Retry (same idempotency key)
      </Button>
      <Button size="sm" variant="outline" onClick={onCheckStatus}>
        Check current status
      </Button>
    </div>
  );
}
