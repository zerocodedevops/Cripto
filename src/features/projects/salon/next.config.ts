import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: '/',
  outputFileTracingRoot: __dirname,
};

export default withNextIntl(nextConfig);
