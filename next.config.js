/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['imgix.cosmicjs.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgix.cosmicjs.com',
        pathname: '**',
      },
    ],
  },
  typedRoutes: false,
};

module.exports = nextConfig;