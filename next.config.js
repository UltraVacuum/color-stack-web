// const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx'],
    basePath: '',
    // Vercel optimizations
    images: {
        domains: ['xuojpcauoculhjchfqrw.supabase.co'],
        formats: ['image/webp', 'image/avif'],
    },
    experimental: {
        optimizeCss: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Enable React strict mode for better development
    reactStrictMode: true,
}

module.exports = nextConfig
