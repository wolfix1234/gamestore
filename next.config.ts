import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  webpack: (config: { resolve: { alias: { canvas: boolean; }; }; }) => {
    // This will completely ignore the 'canvas' package
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
