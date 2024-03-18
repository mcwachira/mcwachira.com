/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        deviceSizes: [
            360, 414, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840,
        ],
    },
}

module.exports = withContentlayer(nextConfig)