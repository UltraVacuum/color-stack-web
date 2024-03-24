const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    // publicRuntimeConfig: {
    //     staticFolder: '/static',
    // },
    // assetPrefix: '',
    pageExtensions: ['mdx', 'ts', 'tsx'],
    basePath: '',
    // output: 'export',
    // distDir: 'build',
}

module.exports = withMDX(nextConfig)
