import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: "../../node_modules/.cache/vitest/storage",
  test: { testTimeout: 30_000, hookTimeout: 30_000 },
});
