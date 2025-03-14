import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  // Specify a custom path here
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

export default withNextIntl(nextConfig);
