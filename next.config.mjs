/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://bank-marketing-campagin-ml-project-10lr.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
