import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: "../../node_modules/.cache/vitest/providers",
  test: { testTimeout: 60_000, hookTimeout: 60_000 },
});
