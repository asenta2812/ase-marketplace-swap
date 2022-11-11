/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'salt.tikicdn.com',
      'pancakeswap.finance',
      'asenta-marketplace-bucket.s3.ap-southeast-1.amazonaws.com',
    ],
  },
  // env: {
  //   NEXT_PUBLIC_JRPC_PROVIDER: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  //   NEXT_PUBLIC_CHAIN_ID: 97,
  // },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/marketplace',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
