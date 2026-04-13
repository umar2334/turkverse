import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      // Non-WWW → WWW (301 Permanent)
      {
        source: "/:path*",
        has: [{ type: "host", value: "turkdrama.live" }],
        destination: "https://www.turkdrama.live/:path*",
        permanent: true,
      },
      // HTTP → HTTPS (301 Permanent)
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://www.turkdrama.live/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
