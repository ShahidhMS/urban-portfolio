import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/urban-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
