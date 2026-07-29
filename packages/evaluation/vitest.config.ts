import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: "../../node_modules/.cache/vitest/evaluation",
  test: { testTimeout: 120_000, hookTimeout: 120_000 },
});
