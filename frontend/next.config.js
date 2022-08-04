/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['salt.tikicdn.com', 'pancakeswap.finance'],
  },
  // env: {
  //   NEXT_PUBLIC_JRPC_PROVIDER: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  //   NEXT_PUBLIC_CHAIN_ID: 97,
  // },
};

module.exports = nextConfig;
