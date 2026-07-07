/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Sta toe dat de kentekencheck-widget op elke site in een iframe wordt
        // ingesloten (dit is de gratis, deelbare widget). Alleen /embed-routes.
        source: "/embed/:path*",
        headers: [{ key: "Content-Security-Policy", value: "frame-ancestors *" }],
      },
    ];
  },
};

module.exports = nextConfig;
