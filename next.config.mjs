import fs from "node:fs";
import path from "node:path";

// Legacy Hashnode URLs were /<slug>; keep them working after the move.
const postsDir = path.join(process.cwd(), "content", "posts");
let legacyRedirects = [];
try {
  legacyRedirects = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((slug) => !["about", "archive", "rss"].includes(slug))
    .map((slug) => ({
      source: `/${slug}`,
      destination: `/posts/${slug}`,
      permanent: true,
    }));
} catch {
  // content dir not present during some tooling passes
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
