/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devcms.geroserial.com",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "devcms.geroserial.com",
        port: "",
        pathname: "/cdn-cgi/image/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/736x/**",
      },
    ],
  },
};

export default nextConfig;
