import type { NextConfig } from "next";

// Noindex the test copy on its vercel.app hosts ONLY (approved by Khubair 13 Nov 2026).
// Host-gated so no other host (and never percolator.trade) gets this header.
// Next matches this as `^${value}$`, so the alternation must be grouped or the
// anchors only bind to the first and last branch.
const NOINDEX_HOSTS =
  "(?:percolator-ui-nu|percolator-ui-khubair-nasirs-projects|percolator-ui-git-master-khubair-nasirs-projects)\\.vercel\\.app";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@percolator/core"],
  turbopack: {
    resolveAlias: {
      buffer: "buffer",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: NOINDEX_HOSTS }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
