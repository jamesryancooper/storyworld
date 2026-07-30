"use client";

import * as React from "react";
import { EngineError, EngineUnknownOutcomeError } from "@/lib/engine";

/**
 * Safe-command state machine (SWUX-001; DEC-0023). One logical operation
 * mints ONE idempotency key and keeps it until the outcome is definite:
 * an uncertain retry therefore replays on the engine instead of running
 * the command twice. Success is only reported once the authoritative
 * result arrived, and a refresh failure after a committed command is a
 * distinct state — never an error that masks the recorded outcome.
 */
export type CommandStatus =
  | "idle"
  | "submitting"
  | "confirmed"
  | "rejected"
  | "validation_failed"
  | "permission_denied"
  | "conflict"
  | "unavailable"
  | "unknown"
  | "refresh_failed";

export interface CommandOperation<R> {
  execute: (idempotencyKey: string) => Promise<R>;
  refresh?: () => Promise<void>;
}

export interface EngineCommandState<R> {
  status: CommandStatus;
  error: string | null;
  result: R | null;
  /**
   * Starts (or revises) an operation. Blocked while submitting, and — for
   * the SAME operation — while the outcome is unknown. Pass a stable opId
   * that identifies the logical operation (subject + variant): when it
   * changes, a fresh idempotency key is minted so a retained key can never
   * leak from one subject's command into another's (SF5).
   */
  run(op: CommandOperation<R>, opId?: string): Promise<CommandStatus>;
  /** Re-executes with the SAME idempotency key; legal from unknown/unavailable. */
  retry(): Promise<CommandStatus>;
  reset(): void;
}

function classify(cause: unknown): { status: CommandStatus; message: string } {
  if (cause instanceof EngineUnknownOutcomeError) {
    return { status: "unknown", message: cause.message };
  }
  if (cause instanceof EngineError) {
    const message = cause.detail;
    if (cause.status === 400) return { status: "validation_failed", message };
    if (cause.status === 401 || cause.status === 403) return { status: "permission_denied", message };
    if (cause.status === 409) return { status: "conflict", message };
    if (cause.status === 404) return { status: "rejected", message };
    if (cause.status >= 500) return { status: "unavailable", message };
    return { status: "rejected", message };
  }
  // Unclassifiable failure: treat as unknown — we cannot prove the command
  // did not commit, so duplicates stay blocked until reconciliation.
  return { status: "unknown", message: cause instanceof Error ? cause.message : String(cause) };
}

export function useEngineCommand<R>(): EngineCommandState<R> {
  const [status, setStatus] = React.useState<CommandStatus>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<R | null>(null);
  const statusRef = React.useRef<CommandStatus>("idle");
  const keyRef = React.useRef<string | null>(null);
  const opRef = React.useRef<CommandOperation<R> | null>(null);
  const opIdRef = React.useRef<string | null>(null);
  const busyRef = React.useRef(false);

  const update = React.useCallback((next: CommandStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const perform = React.useCallback(async (): Promise<CommandStatus> => {
    const op = opRef.current;
    const key = keyRef.current;
    if (!op || !key) return statusRef.current;
    busyRef.current = true;
    setError(null);
    update("submitting");
    let out: R;
    try {
      out = await op.execute(key);
    } catch (cause) {
      const { status: failure, message } = classify(cause);
      if (failure === "rejected") keyRef.current = null; // definite outcome; series over
      setError(message);
      busyRef.current = false;
      update(failure);
      return failure;
    }
    // The command is recorded; the key's series is complete.
    keyRef.current = null;
    setResult(out);
    if (op.refresh) {
      try {
        await op.refresh();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : String(cause));
        busyRef.current = false;
        update("refresh_failed");
        return "refresh_failed";
      }
    }
    busyRef.current = false;
    update("confirmed");
    return "confirmed";
  }, [update]);

  const run = React.useCallback(
    async (op: CommandOperation<R>, opId?: string): Promise<CommandStatus> => {
      // Never overlap an in-flight submission.
      if (busyRef.current) return statusRef.current;
      const sameOp = opId === undefined || opId === opIdRef.current;
      // Duplicate blocking: the SAME operation may not re-run while its
      // outcome is unknown — it must be retried (same key) or reconciled.
      // A genuinely different operation is allowed to proceed with a fresh
      // key even if a prior op is still unknown (that one is recorded
      // separately for the creator to verify).
      if (sameOp && statusRef.current === "unknown") return statusRef.current;
      if (!sameOp) {
        // A new logical operation must never inherit the prior op's key.
        keyRef.current = null;
        opIdRef.current = opId ?? null;
      }
      opRef.current = op;
      keyRef.current = keyRef.current ?? crypto.randomUUID();
      setResult(null);
      return perform();
    },
    [perform],
  );

  const retry = React.useCallback(async (): Promise<CommandStatus> => {
    if (busyRef.current) return statusRef.current;
    if (statusRef.current !== "unknown" && statusRef.current !== "unavailable") {
      return statusRef.current;
    }
    return perform();
  }, [perform]);

  const reset = React.useCallback(() => {
    if (busyRef.current) return;
    keyRef.current = null;
    opRef.current = null;
    opIdRef.current = null;
    setError(null);
    setResult(null);
    update("idle");
  }, [update]);

  return { status, error, result, run, retry, reset };
}

/** Distinct, honest user-facing message per failure state; null when not failed. */
export function describeCommandFailure(status: CommandStatus, error: string | null): string | null {
  const suffix = error ? ` ${error}` : "";
  switch (status) {
    case "validation_failed":
      return `The engine refused this as invalid — nothing was recorded.${suffix}`;
    case "permission_denied":
      return `Not authorized — nothing was recorded.${suffix}`;
    case "conflict":
      return `The subject changed since you loaded it — nothing was recorded.${suffix}`;
    case "unavailable":
      return `The engine is unavailable — this command was not confirmed.${suffix}`;
    case "unknown":
      return "The outcome is unknown — the command may or may not have been recorded. Check current state, or retry (the same idempotency key makes a retry safe).";
    case "rejected":
      return `The engine rejected this command.${suffix}`;
    default:
      return null;
  }
}
