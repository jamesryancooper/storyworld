"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loading";
import { Select } from "@/components/ui/select";
import { StatusMessage } from "@/components/ui/status-message";
import { PropertyPicker } from "@/components/property-picker";
import { useUrlContext } from "@/lib/url-context";
import type { EngineClient, ProductionSummary } from "@/lib/engine";

/**
 * Shared property → production selection (SWUX-013; DEC-0022). The property
 * half is the URL-driven PropertyPicker; the production half applies the same
 * rules — resolve from the URL, auto-select only a sole candidate (reflected
 * into the URL), prompt on several, and reconcile (never substitute) when the
 * URL names an unavailable production. Emits the resolved production.
 */
export function ProductionPicker({
  engine,
  onProduction,
}: {
  engine: EngineClient;
  onProduction: (production: ProductionSummary | null) => void;
}): React.JSX.Element {
  const { production: urlProduction, setProduction } = useUrlContext();
  const [propertyId, setPropertyId] = React.useState<string | null>(null);
  const [productions, setProductions] = React.useState<ProductionSummary[] | null>(null);
  const [unavailable, setUnavailable] = React.useState(false);

  React.useEffect(() => {
    if (!propertyId) {
      setProductions(null);
      return;
    }
    let live = true;
    setProductions(null);
    setUnavailable(false);
    engine.listProductions(propertyId).then(
      (list) => {
        if (live) setProductions(list);
      },
      () => {
        if (live) setUnavailable(true);
      },
    );
    return () => {
      live = false;
    };
  }, [engine, propertyId]);

  const resolution = React.useMemo(() => {
    if (!propertyId) return { state: "none" as const };
    if (unavailable) return { state: "unavailable" as const };
    if (!productions) return { state: "loading" as const };
    if (urlProduction) {
      const match = productions.find((p) => p.productionId === urlProduction);
      return match
        ? { state: "resolved" as const, production: match, auto: false }
        : { state: "context-unavailable" as const };
    }
    if (productions.length === 0) return { state: "empty" as const };
    if (productions.length === 1) return { state: "resolved" as const, production: productions[0]!, auto: true };
    return { state: "choose" as const };
  }, [productions, urlProduction, propertyId, unavailable]);

  const resolved = resolution.state === "resolved" ? resolution.production : null;

  React.useEffect(() => {
    if (resolution.state === "resolved" && resolution.auto && urlProduction !== resolution.production.productionId) {
      setProduction(resolution.production.productionId);
    }
  }, [resolution, urlProduction, setProduction]);

  React.useEffect(() => {
    onProduction(resolved);
  }, [resolved, onProduction]);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full sm:w-64">
        <PropertyPicker
          engine={engine}
          onProperty={(property) => setPropertyId(property?.propertyId ?? null)}
          labelId="pp-property"
        />
      </div>
      <div className="flex w-full flex-col gap-1.5 sm:w-64">
        <Label htmlFor="pp-production">Production</Label>
        {resolution.state === "none" ? (
          <Select id="pp-production" disabled className="w-full sm:w-64">
            <option value="">Select a property first</option>
          </Select>
        ) : resolution.state === "unavailable" ? (
          <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
        ) : resolution.state === "loading" ? (
          <Loading label="Loading productions…" rows={1} />
        ) : (
          <>
            <Select
              id="pp-production"
              value={resolved?.productionId ?? ""}
              onChange={(event) => setProduction(event.target.value || null)}
              disabled={!productions || productions.length === 0}
              className="w-full sm:w-64"
              aria-invalid={resolution.state === "context-unavailable"}
            >
              {resolution.state === "resolved" && !resolution.auto ? null : (
                <option value="">
                  {resolution.state === "empty" ? "No productions yet" : "Select a production…"}
                </option>
              )}
              {(productions ?? []).map((production) => (
                <option key={production.productionId} value={production.productionId}>
                  {production.name} (canon v{production.releaseVersion})
                </option>
              ))}
            </Select>
            {resolution.state === "context-unavailable" ? (
              <StatusMessage variant="error">
                The production named in the link is not available — choose another.
              </StatusMessage>
            ) : resolution.state === "choose" ? (
              <p className="text-xs text-muted-foreground">Choose a production to continue.</p>
            ) : resolution.state === "resolved" && resolution.auto ? (
              <p className="text-xs text-muted-foreground">Auto-selected (the only production).</p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
