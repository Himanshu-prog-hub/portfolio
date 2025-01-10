import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable or disable strict mode
  swcMinify: true, // Use SWC for minification
  compiler: {
    styledComponents: true, // Example: styled-components support
  },
  webpack: (config) => {
    // Add any custom webpack configurations here
    return config;
  },
};

export default nextConfig;

