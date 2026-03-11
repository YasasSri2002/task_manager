import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next.config.js
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login', // redirect root to login
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
