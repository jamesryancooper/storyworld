"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { EngineClient, ProductionSummary, PropertySummary } from "@/lib/engine";

/** Shared property -> production selection used by every production-scoped surface. */
export function ProductionPicker({
  engine,
  onProduction,
}: {
  engine: EngineClient;
  onProduction: (production: ProductionSummary | null) => void;
}): React.JSX.Element {
  const [properties, setProperties] = React.useState<PropertySummary[]>([]);
  const [propertyId, setPropertyId] = React.useState("");
  const [productions, setProductions] = React.useState<ProductionSummary[]>([]);
  const [productionId, setProductionId] = React.useState("");

  React.useEffect(() => {
    void (async () => {
      const list = await engine.listProperties();
      setProperties(list);
      if (list.length > 0) setPropertyId(list[0]!.propertyId);
    })();
  }, [engine]);

  React.useEffect(() => {
    if (!propertyId) return;
    void (async () => {
      const list = await engine.listProductions(propertyId);
      setProductions(list);
      const first = list[0] ?? null;
      setProductionId(first?.productionId ?? "");
      onProduction(first);
    })();
  }, [engine, propertyId, onProduction]);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex w-64 flex-col gap-1.5">
        <Label htmlFor="pp-property">Property</Label>
        <Select
          id="pp-property"
          value={propertyId}
          onChange={(event) => setPropertyId(event.target.value)}
          disabled={properties.length === 0}
        >
          {properties.map((property) => (
            <option key={property.propertyId} value={property.propertyId}>
              {property.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex w-64 flex-col gap-1.5">
        <Label htmlFor="pp-production">Production</Label>
        <Select
          id="pp-production"
          value={productionId}
          onChange={(event) => {
            setProductionId(event.target.value);
            onProduction(productions.find((p) => p.productionId === event.target.value) ?? null);
          }}
          disabled={productions.length === 0}
        >
          {productions.map((production) => (
            <option key={production.productionId} value={production.productionId}>
              {production.name} (canon v{production.releaseVersion})
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
