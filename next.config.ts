import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer modern formats — AVIF then WebP — for the largest byte savings
    // on mobile. Next serves the best format the requesting browser accepts.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images at the edge for a year; sources are hashed.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "userpic.codeforces.org",
      },
    ],
  },
  // Ship smaller client bundles by tree-shaking heavy icon/util imports.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
