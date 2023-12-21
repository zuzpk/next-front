/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    distDir: ".next.dev",
    cleanDistDir: true,
    poweredByHeader: false,
    images: {
        loader: 'custom',
        loaderFile: './imgloader.js',
        remotePatterns: [
        {
            protocol: "https",
            hostname: "*"
        }
        ]
    }
}
module.exports = nextConfig