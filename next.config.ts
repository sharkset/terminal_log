import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_ID: process.env.API_ID,
    API_HASH: process.env.API_HASH,
    GROUP_ID: process.env.GROUP_ID,
    BOT_ID: process.env.BOT_ID,
    SESSION_STRING: process.env.SESSION_STRING,
    USER_SESSION: process.env.USER_SESSION,
    DYNAMIC_ID: process.env.DYNAMIC_ID
  },
  images: {
    domains: ['dd.dexscreener.com'],
  },
};

export default nextConfig;
