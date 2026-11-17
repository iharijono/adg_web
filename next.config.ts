import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the marketing site is served as plain HTML/CSS/JS
  // (via nginx on the same EC2 instance as the demo stack, per the
  // "transactional, monolithic up/down together" deployment decision).
  // No server-only features (API routes, ISR, middleware) are used here.
  output: "export",
  images: {
    // next/image optimization requires a server; static export can't use it.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
