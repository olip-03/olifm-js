import { withPayload } from '@payloadcms/next/withPayload'
import path from 'node:path'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

// Define all trusted hostnames for your media assets (Local subnet IP + production domain)
const trustedImageOrigins = [NEXT_PUBLIC_SERVER_URL, 'http://192.168.189.78:3000', 'https://oli.fm']

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: trustedImageOrigins.map((item) => {
      try {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
          port: url.port || '', // Handle explicit development ports vs standard production ports
        }
      } catch (e) {
        // Fallback catch block in case an entry is a malformed URL string
        return {
          hostname: item,
          protocol: 'https',
        }
      }
    }),
  },
  webpack: (webpackConfig) => {
    // 1. Maintain existing extension rules
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // 2. Force explicit resolution for path aliases (Fixing the Webpack error)
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias ?? {}),
      '@': path.resolve(process.cwd(), 'src'),
      '@payload-config': path.resolve(process.cwd(), 'src/payload.config.ts'),
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
