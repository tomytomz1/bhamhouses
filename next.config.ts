import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance optimizations
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Bundle analyzer (optional - for debugging)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },
  
  // Compression
  compress: true,
  
  // Powered by header
  poweredByHeader: false,
  
  // React strict mode
  reactStrictMode: true,
  
  // TypeScript - only ignore in CI, not local development
  typescript: {
    ignoreBuildErrors: process.env.CI === 'true' && process.env.NODE_ENV === 'production',
  },
  
  // ESLint - only ignore in CI if needed
  eslint: {
    ignoreDuringBuilds: process.env.CI === 'true' && process.env.SKIP_LINT === 'true',
  },
}

export default nextConfig
