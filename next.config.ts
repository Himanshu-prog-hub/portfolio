import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  // Next.js doesn't auto-serve index.html for public/ subdirectories,
  // so we rewrite each bundled app path to its index.html.
  async rewrites() {
    return [
      { source: "/lld-playground",              destination: "/lld-playground/index.html" },
      { source: "/lld-playground/",             destination: "/lld-playground/index.html" },
      { source: "/linkedin-post-generator",     destination: "/linkedin-post-generator/index.html" },
      { source: "/linkedin-post-generator/",    destination: "/linkedin-post-generator/index.html" },
    ];
  },
};

export default nextConfig;
