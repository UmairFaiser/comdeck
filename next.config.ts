import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Explicitly set the root directory to avoid lockfile detection issues
  experimental: {
    turbo: {
      root: ".",
    },
  },
};

export default nextConfig;
