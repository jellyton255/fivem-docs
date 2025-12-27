import BundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    optimizePackageImports: ["highlight.js", "lucide-react"],
    mdxRs: true,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/docs/natives",
      },
      {
        source: "/0x:hash(.*)",
        destination: "/docs/natives?hash=0x:hash",
      },
      {
        source: "/docs/natives/:hash",
        destination: "/docs/natives?hash=:hash",
      },
    ];
  },
};

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withBundleAnalyzer(withMDX(nextConfig));
