/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongoose'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'gomentor.tech'],
  },
  env: {
    // Only expose client-side environment variables here
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig 