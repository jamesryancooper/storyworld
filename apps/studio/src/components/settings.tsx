"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsequenceReview } from "@/components/ui/consequence-review";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { describeCommandFailure, useEngineCommand } from "@/lib/command-state";
import { clearUnknownOutcome, recordUnknownOutcome } from "@/lib/unknown-outcome-log";
import { actorLine, createEngineClient, type CredentialStatusView, type EngineClient } from "@/lib/engine";

const STATUS_VARIANT: Record<CredentialStatusView["status"], "default" | "outline" | "muted"> = {
  active: "default",
  absent: "muted",
  revoked: "outline",
  expired: "outline",
};

type CredentialAction = { name: string; action: "save" | "revoke" };

export function Settings({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [storeEnabled, setStoreEnabled] = React.useState<boolean | null>(null);
  const [slots, setSlots] = React.useState<CredentialStatusView[]>([]);
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});
  const [notice, setNotice] = React.useState<string | null>(null);
  const [reviewing, setReviewing] = React.useState<CredentialAction | null>(null);
  const command = useEngineCommand<{ credentialRevisionId: string; receiptId: string }>();

  const refresh = React.useCallback(async () => {
    const out = await engine.listCredentials();
    setStoreEnabled(out.storeEnabled);
    setSlots(out.credentials);
  }, [engine]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  const receiptRef = React.useRef<string | null>(null);

  const finish = React.useCallback(
    (slot: CredentialStatusView, action: "save" | "revoke", outcome: string) => {
      const opId = `cred:${slot.name}:${action}`;
      if (outcome === "unknown" || outcome === "unavailable") {
        recordUnknownOutcome({
          id: opId,
          actionLabel: action === "save" ? "credential save" : "credential revoke",
          subjectLabel: `${slot.provider} slot`,
        });
        return;
      }
      if (outcome !== "confirmed" && outcome !== "refresh_failed") return;
      clearUnknownOutcome(opId);
      const receipt = receiptRef.current;
      if (action === "save") {
        // The key leaves the page only after the store confirmed it.
        setDrafts((prior) => ({ ...prior, [slot.name]: "" }));
      }
      setReviewing(null);
      const refreshWarning =
        outcome === "refresh_failed" ? " Refreshing the status failed — reload to see current state." : "";
      setNotice(
        action === "save"
          ? `${slot.provider} key stored encrypted. This opens the hosted-generation reserved crossing.${receipt ? ` Receipt ${receipt}.` : ""}${refreshWarning}`
          : `${slot.provider} key revoked. Revocation denies immediately — no environment fallback.${receipt ? ` Receipt ${receipt}.` : ""}${refreshWarning}`,
      );
      command.reset();
    },
    [command],
  );

  async function onConfirm(slot: CredentialStatusView, action: "save" | "revoke"): Promise<void> {
    receiptRef.current = null;
    const outcome = await command.run(
      {
        execute: async (idempotencyKey) => {
          if (action === "save") {
            const value = (drafts[slot.name] ?? "").trim();
            const out = await engine.setCredential({ name: slot.name, value }, { idempotencyKey });
            receiptRef.current = out.receiptId;
            return out;
          }
          const out = await engine.revokeCredential({ name: slot.name }, { idempotencyKey });
          receiptRef.current = out.receiptId;
          return out;
        },
        refresh,
      },
      `cred:${slot.name}:${action}`,
    );
    finish(slot, action, outcome);
  }

  const failure = describeCommandFailure(command.status, command.error);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Settings</h1>
        {storeEnabled === null ? null : storeEnabled ? (
          <Badge variant="outline">encrypted store ready</Badge>
        ) : (
          <Badge>store disabled — no master key</Badge>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Provider credentials</CardTitle>
          <CardDescription>
            Keys are envelope-encrypted at rest; the master key lives outside
            the repository and never enters the database. Every entry,
            replacement, and revocation is reviewed first, then receipted
            with a redacted hint — plaintext never reaches this page again
            after you save it.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
          {slots.map((slot) => (
            <div key={slot.name} className="flex flex-col gap-3 rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{slot.label}</p>
                <Badge variant={STATUS_VARIANT[slot.status]}>
                  {slot.status}
                  {slot.hint ? ` · ${slot.hint}` : ""}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{slot.note}</p>
              <div className="flex items-end gap-3">
                <div className="flex flex-1 flex-col gap-1.5">
                  <Label htmlFor={`cred-${slot.name}`}>
                    {slot.status === "active" ? "Replace key" : "Enter key"}
                  </Label>
                  <Input
                    id={`cred-${slot.name}`}
                    type="password"
                    autoComplete="off"
                    value={drafts[slot.name] ?? ""}
                    onChange={(event) =>
                      setDrafts((prior) => ({ ...prior, [slot.name]: event.target.value }))
                    }
                    placeholder="paste the key; it is encrypted on save"
                  />
                </div>
                <Button
                  aria-expanded={reviewing?.name === slot.name && reviewing.action === "save"}
                  onClick={() => {
                    setNotice(null);
                    command.reset();
                    setReviewing({ name: slot.name, action: "save" });
                  }}
                  disabled={
                    command.status === "submitting" ||
                    !(drafts[slot.name] ?? "").trim() ||
                    storeEnabled === false
                  }
                >
                  Save encrypted
                </Button>
                {slot.status === "active" ? (
                  <Button
                    variant="outline"
                    aria-expanded={reviewing?.name === slot.name && reviewing.action === "revoke"}
                    onClick={() => {
                      setNotice(null);
                      command.reset();
                      setReviewing({ name: slot.name, action: "revoke" });
                    }}
                    disabled={command.status === "submitting"}
                  >
                    Revoke
                  </Button>
                ) : null}
              </div>
              {reviewing?.name === slot.name ? (
                <div className="flex flex-col gap-2">
                  <ConsequenceReview
                    id={`cred-review-${slot.name}`}
                    title={
                      reviewing.action === "save"
                        ? "Review — store this key and open the crossing"
                        : "Review — revoke this key"
                    }
                    rows={[
                      { label: "Provider", value: slot.provider },
                      { label: "Slot", value: slot.name },
                      { label: "Scopes", value: slot.scopes.join(", ") },
                      ...(reviewing.action === "save"
                        ? [{ label: "Key", value: "(hidden — never displayed)" }]
                        : []),
                      { label: "Recorded by", value: actorLine() },
                      {
                        label: "Effect",
                        value:
                          reviewing.action === "save"
                            ? "Activating this credential opens the hosted-generation reserved crossing: provider spend becomes possible until revocation."
                            : "Revocation denies immediately; no environment fallback.",
                      },
                    ]}
                    confirmLabel={
                      reviewing.action === "save" ? "Save encrypted — open crossing" : "Revoke — deny immediately"
                    }
                    onConfirm={() => void onConfirm(slot, reviewing.action)}
                    onCancel={() => {
                      setReviewing(null);
                      command.reset();
                    }}
                    busy={command.status === "submitting"}
                  />
                  {failure ? <p className="text-sm text-destructive">{failure}</p> : null}
                  {command.status === "unknown" || command.status === "unavailable" ? (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          const action = reviewing.action;
                          void command.retry().then((outcome) => finish(slot, action, outcome));
                        }}
                      >
                        Retry (same idempotency key)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          void refresh();
                          setNotice("Current status refetched — compare the slot status and hint before retrying.");
                        }}
                      >
                        Check current status
                      </Button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            The local InvokeAI install keeps its own separate metered key
            inside InvokeAI&apos;s External Providers settings — it is
            intentionally not a slot here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
