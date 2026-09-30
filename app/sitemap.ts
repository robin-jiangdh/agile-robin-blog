import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/archive`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...posts.map((p) => ({
      url: `${site.url}/posts/${p.slug}`,
      lastModified: new Date(p.updated || p.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
