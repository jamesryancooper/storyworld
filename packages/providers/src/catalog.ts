import { FAL_ENDPOINT_SPECS } from "./fal-adapter.js";

/**
 * Provider/model catalog for client surfaces. Derived from the adapters'
 * static allowlists — never a free-form endpoint proxy (SRC-0004 rule):
 * adding a model here means adding a tested spec to the adapter first.
 */
export interface ProviderModel {
  id: string;
  label: string;
  costPerImage: number;
}

export interface ProviderCatalogEntry {
  adapterId: "mock" | "fal";
  label: string;
  models: ProviderModel[];
}

export function providerCatalog(): ProviderCatalogEntry[] {
  return [
    {
      adapterId: "mock",
      label: "mock (deterministic, free)",
      models: [{ id: "mock/deterministic", label: "Deterministic mock", costPerImage: 0 }],
    },
    {
      adapterId: "fal",
      label: "fal.ai (hosted, requires key)",
      models: Object.values(FAL_ENDPOINT_SPECS).map((spec) => ({
        id: spec.endpointId,
        label: spec.label,
        costPerImage: spec.costPerImage,
      })),
    },
  ];
}
