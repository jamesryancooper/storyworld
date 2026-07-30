"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loading";
import { Select } from "@/components/ui/select";
import { StatusMessage } from "@/components/ui/status-message";
import { useUrlContext } from "@/lib/url-context";
import type { EngineClient, PropertySummary } from "@/lib/engine";

/**
 * URL-driven property selection (SWUX-013; DEC-0022). Resolves the property
 * from the URL; auto-selects only when exactly one exists (and reflects that
 * into the URL, noting it); with several, prompts for an explicit choice
 * rather than silently picking the first; and when the URL names a property
 * that is not available, shows an explicit reconcile state instead of
 * substituting a different one. Emits the resolved property id (or null).
 */
export function PropertyPicker({
  engine,
  onProperty,
  labelId = "property",
  disabled = false,
}: {
  engine: EngineClient;
  onProperty: (property: PropertySummary | null) => void;
  labelId?: string;
  disabled?: boolean;
}): React.JSX.Element {
  const { property: urlProperty, setProperty } = useUrlContext();
  const [properties, setProperties] = React.useState<PropertySummary[] | null>(null);
  const [unavailable, setUnavailable] = React.useState(false);

  React.useEffect(() => {
    let live = true;
    setProperties(null);
    setUnavailable(false);
    engine.listProperties().then(
      (list) => {
        if (live) setProperties(list);
      },
      () => {
        if (live) setUnavailable(true);
      },
    );
    return () => {
      live = false;
    };
  }, [engine]);

  const resolution = React.useMemo(() => {
    if (unavailable) return { state: "unavailable" as const };
    if (!properties) return { state: "loading" as const };
    if (urlProperty) {
      const match = properties.some((p) => p.propertyId === urlProperty);
      return match
        ? { state: "resolved" as const, id: urlProperty, auto: false }
        : { state: "context-unavailable" as const };
    }
    if (properties.length === 0) return { state: "empty" as const };
    if (properties.length === 1) return { state: "resolved" as const, id: properties[0]!.propertyId, auto: true };
    return { state: "choose" as const };
  }, [properties, urlProperty, unavailable]);

  const resolvedId = resolution.state === "resolved" ? resolution.id : null;
  const resolved = React.useMemo(
    () => (properties && resolvedId ? properties.find((p) => p.propertyId === resolvedId) ?? null : null),
    [properties, resolvedId],
  );

  // Reflect a single-candidate auto-selection into the URL once, so the
  // choice is shareable and survives reload. Guarded so it never loops.
  React.useEffect(() => {
    if (resolution.state === "resolved" && resolution.auto && urlProperty !== resolution.id) {
      setProperty(resolution.id);
    }
  }, [resolution, urlProperty, setProperty]);

  React.useEffect(() => {
    onProperty(resolved);
  }, [resolved, onProperty]);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={labelId}>Property</Label>
      {resolution.state === "unavailable" ? (
        <StatusMessage variant="error">The engine is unavailable — reload to retry.</StatusMessage>
      ) : resolution.state === "loading" ? (
        <Loading label="Loading properties…" rows={1} />
      ) : (
        <>
          <Select
            id={labelId}
            value={resolvedId ?? ""}
            onChange={(event) => setProperty(event.target.value || null)}
            disabled={disabled || !properties || properties.length === 0}
            className="w-full sm:w-64"
            aria-invalid={resolution.state === "context-unavailable"}
          >
            {resolution.state === "resolved" && !resolution.auto ? null : (
              <option value="">
                {resolution.state === "empty" ? "No properties yet" : "Select a property…"}
              </option>
            )}
            {(properties ?? []).map((property) => (
              <option key={property.propertyId} value={property.propertyId}>
                {property.name}
              </option>
            ))}
          </Select>
          {resolution.state === "context-unavailable" ? (
            <StatusMessage variant="error">
              The property named in the link is not available — choose another.
            </StatusMessage>
          ) : resolution.state === "choose" ? (
            <p className="text-xs text-muted-foreground">Choose a property to continue.</p>
          ) : resolution.state === "resolved" && resolution.auto ? (
            <p className="text-xs text-muted-foreground">Auto-selected (the only property).</p>
          ) : null}
        </>
      )}
    </div>
  );
}
