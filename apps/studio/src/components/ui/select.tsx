import * as React from "react";
import { cn } from "@/lib/utils";

/** Native select: fully accessible without a primitive dependency. */
export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>): React.JSX.Element {
  return (
    <select
      className={cn(
        "flex h-9 w-full rounded-lg border border-border bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
