/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.google.com',
                pathname: '/favicon.ico',
            },
        ],
    },
};

module.exports = nextConfig; 