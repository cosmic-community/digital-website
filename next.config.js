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
  // Removed typedRoutes as it's not recognized in Next.js 14.1.0
};

module.exports = nextConfig;