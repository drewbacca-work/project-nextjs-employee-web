/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  images: {
    domains: ["reqres.in"], // Add the external domain here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reqres.in",
        pathname: "/img/faces/**",
      },
    ],
  },
};

module.exports = nextConfig;
