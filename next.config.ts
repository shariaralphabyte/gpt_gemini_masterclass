import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/gpt_gemini_masterclass' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/gpt_gemini_masterclass' : '',
};

export default nextConfig;
