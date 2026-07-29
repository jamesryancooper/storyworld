"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEngineClient, type CredentialStatusView, type EngineClient } from "@/lib/engine";

const STATUS_VARIANT: Record<CredentialStatusView["status"], "default" | "outline" | "muted"> = {
  active: "default",
  absent: "muted",
  revoked: "outline",
  expired: "outline",
};

export function Settings({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const [storeEnabled, setStoreEnabled] = React.useState<boolean | null>(null);
  const [slots, setSlots] = React.useState<CredentialStatusView[]>([]);
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});
  const [busy, setBusy] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    const out = await engine.listCredentials();
    setStoreEnabled(out.storeEnabled);
    setSlots(out.credentials);
  }, [engine]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  async function onSave(slot: CredentialStatusView): Promise<void> {
    const value = (drafts[slot.name] ?? "").trim();
    if (!value) return;
    setBusy(slot.name);
    setNotice(null);
    try {
      const saved = await engine.setCredential({ name: slot.name, value });
      setDrafts((prior) => ({ ...prior, [slot.name]: "" }));
      setNotice(`${slot.provider} key stored encrypted (${saved.hint}). This opens the hosted-generation reserved crossing.`);
      await refresh();
    } catch (cause) {
      setNotice(String(cause));
    } finally {
      setBusy(null);
    }
  }

  async function onRevoke(slot: CredentialStatusView): Promise<void> {
    setBusy(slot.name);
    setNotice(null);
    try {
      await engine.revokeCredential({ name: slot.name });
      setNotice(`${slot.provider} key revoked. Revocation denies immediately — no environment fallback.`);
      await refresh();
    } catch (cause) {
      setNotice(String(cause));
    } finally {
      setBusy(null);
    }
  }

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
            replacement, and revocation is receipted with a redacted hint —
            plaintext never reaches this page again after you save it.
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
                  onClick={() => void onSave(slot)}
                  disabled={busy === slot.name || !(drafts[slot.name] ?? "").trim() || storeEnabled === false}
                >
                  {busy === slot.name ? "Saving…" : "Save encrypted"}
                </Button>
                {slot.status === "active" ? (
                  <Button variant="outline" onClick={() => void onRevoke(slot)} disabled={busy === slot.name}>
                    Revoke
                  </Button>
                ) : null}
              </div>
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
