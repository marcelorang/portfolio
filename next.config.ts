import type { NextConfig } from "next";

// Static export: the build output in /out runs on Vercel, bohr.io or any static host.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
