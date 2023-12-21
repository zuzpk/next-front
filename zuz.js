const fs = require('fs');

const buildConf = () => {

const [ m, mode ] = process.argv.find(v => v.indexOf('mode=') > -1).split("=")
const [ d, distDir ] = process.argv.find(v => v.indexOf('dir=') > -1).split("=")

return `/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    distDir: "${distDir || `.next`}",
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
module.exports = nextConfig`;
}

fs.writeFileSync(
    `./next.config.js`,
    buildConf(),
    {
        encoding:'utf8',
        flag:'w'
    }
)