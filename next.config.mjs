import BundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["highlight.js", "lucide-react"],
  },
  // Optimize images
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable unnecessary features for docs site
  reactStrictMode: true,
  poweredByHeader: false,
  // Allow filesystem access during build
  serverRuntimeConfig: {
    // Will only be available on the server side
    PROJECT_ROOT: process.cwd(),
  },
  async rewrites() {
    return [
      // Rewrite direct native hash URLs to the natives page with search params
      {
        source: "/0x:hash(.*)",
        destination: "/docs/natives?hash=0x:hash",
      },
      // Rewrite old dynamic route pattern to new search params pattern
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

export default withBundleAnalyzer(nextConfig);
