import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Enable strict type checking in TypeScript
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
