import axe from "axe-core";
import { expect } from "vitest";

/**
 * Zero-tolerance accessibility gate (B2 acceptance criterion). Rules that
 * need a real rendering engine are disabled under jsdom: color-contrast
 * (no layout/paint) and region/landmark checks that only make sense on a
 * full document (components render standalone in these suites).
 */
export async function expectAccessible(container: Element): Promise<void> {
  const results = await axe.run(container, {
    rules: {
      "color-contrast": { enabled: false },
      region: { enabled: false },
      "landmark-one-main": { enabled: false },
      "page-has-heading-one": { enabled: false },
    },
  });
  expect(
    results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
  ).toEqual([]);
}
