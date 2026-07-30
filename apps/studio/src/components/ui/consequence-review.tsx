import * as React from "react";
import { Button } from "@/components/ui/button";

export interface ConsequenceRow {
  label: string;
  value: React.ReactNode;
}

/**
 * Inline pre-decision review region (SWUX-002; DEC-0020): a consequential
 * action takes two explicit activations — one to open this review, one on
 * the named confirm control inside it — so no single click or keypress
 * ever performs an acceptance-class command. Rendered inline (not an
 * overlay), so focus order stays natural and no trap is needed.
 */
export function ConsequenceReview({
  id,
  title,
  rows,
  children,
  confirmLabel,
  onConfirm,
  actions,
  onCancel,
  busy = false,
  confirmDisabled = false,
}: {
  id: string;
  title: string;
  rows: ConsequenceRow[];
  children?: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
  /** Custom decision buttons (e.g. Accept AND Reject) instead of one confirm. */
  actions?: React.ReactNode;
  onCancel: () => void;
  busy?: boolean;
  confirmDisabled?: boolean;
}): React.JSX.Element {
  return (
    <section
      role="region"
      aria-labelledby={`${id}-title`}
      className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4"
    >
      <h3 id={`${id}-title`} className="text-sm font-semibold">
        {title}
      </h3>
      <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
        {rows.map((row) => (
          <React.Fragment key={row.label}>
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="min-w-0 break-words">{row.value}</dd>
          </React.Fragment>
        ))}
      </dl>
      {children}
      <div className="flex flex-wrap items-center gap-2">
        {actions ?? (
          <Button onClick={onConfirm} disabled={busy || confirmDisabled}>
            {confirmLabel}
          </Button>
        )}
        <Button variant="outline" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
      </div>
    </section>
  );
}
