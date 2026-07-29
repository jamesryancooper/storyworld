import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lint and typecheck run as their own ship-check layers; the build does
  // not duplicate them.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
