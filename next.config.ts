import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    // Enable Turbopack for faster builds
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
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
  
  // TypeScript
  typescript: {
    // Don't run TypeScript during builds in development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  // ESLint
  eslint: {
    // Don't run ESLint during builds in development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig
