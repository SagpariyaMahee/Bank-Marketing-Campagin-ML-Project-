/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["localhost:3000", "127.0.0.1:3000", "192.168.0.185", "192.168.0.185:3000"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
