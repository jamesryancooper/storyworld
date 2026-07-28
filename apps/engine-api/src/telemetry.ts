import { uuidv7 } from "@storyworld/domain";

/**
 * Telemetry baseline (F2 deferral landed with the app): structured JSON
 * lines with correlation ids. OpenTelemetry wiring can replace the sink
 * later without changing call sites.
 */
export interface LogFields {
  [key: string]: string | number | boolean | null;
}

export function correlationId(header: string | string[] | undefined): string {
  return typeof header === "string" && header.length > 0 ? header : uuidv7();
}

export function logLine(level: "info" | "warn" | "error", message: string, fields: LogFields): void {
  process.stdout.write(
    `${JSON.stringify({ ts: new Date().toISOString(), level, message, ...fields })}\n`,
  );
}
