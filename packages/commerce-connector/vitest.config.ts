import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: "../../node_modules/.cache/vitest/commerce-connector",
  test: { testTimeout: 120_000, hookTimeout: 120_000 },
});
