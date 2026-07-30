import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Announced status/error text (SWUX-015). Wraps the plain notice/error
 * paragraphs so assistive technology hears them: notices and successes are a
 * polite live region (role="status"); errors are assertive (role="alert").
 * Keep the wording identical to what it replaces.
 */
export function StatusMessage({
  variant = "notice",
  id,
  className,
  children,
}: {
  variant?: "notice" | "success" | "error";
  id?: string;
  className?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  const isError = variant === "error";
  return (
    <p
      id={id}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={cn("text-sm", isError ? "text-destructive" : "text-muted-foreground", className)}
    >
      {children}
    </p>
  );
}
