import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents:true,
  images:{
    remotePatterns:[
      {
        hostname:"res.cloudinary.com",
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", 
    },
  },
};

export default nextConfig;
