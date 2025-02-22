import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // output: 'export',
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {},
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
