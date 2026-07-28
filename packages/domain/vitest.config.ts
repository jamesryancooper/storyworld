import { defineConfig } from "vitest/config";

// Cache lives inside the root node_modules tree (fingerprint-excluded);
// tooling must never create files under per-package node_modules paths.
export default defineConfig({
  cacheDir: "../../node_modules/.cache/vitest/domain",
});
