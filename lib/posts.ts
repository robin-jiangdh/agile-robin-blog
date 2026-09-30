import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  tags?: string[];
  category?: string;
  series?: string;
  seriesSlug?: string;
  cover?: string;
  readingTime?: number;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readMeta(slug: string): PostMeta {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    title: String(data.title || slug),
    description: data.description ? String(data.description) : undefined,
    date: String(data.date || "1970-01-01"),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    category: data.category ? String(data.category) : undefined,
    series: data.series ? String(data.series) : undefined,
    seriesSlug: data.seriesSlug ? String(data.seriesSlug) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: data.readingTime ? Number(data.readingTime) : undefined,
  };
}

let cache: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (!cache) {
    cache = getAllSlugs().map(readMeta);
    cache.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return cache;
}

export function getPost(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: String(data.title || slug),
    description: data.description ? String(data.description) : undefined,
    date: String(data.date || "1970-01-01"),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    category: data.category ? String(data.category) : undefined,
    series: data.series ? String(data.series) : undefined,
    seriesSlug: data.seriesSlug ? String(data.seriesSlug) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: data.readingTime ? Number(data.readingTime) : undefined,
  };
  return { meta, content };
}

export function getAdjacent(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    // prev = newer post, next = older post (list is desc)
    prev: i > 0 ? posts[i - 1] : null,
    next: i >= 0 && i < posts.length - 1 ? posts[i + 1] : null,
  };
}

export function getAllTags(): { name: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.tags || []) m.set(t, (m.get(t) || 0) + 1);
  }
  return [...m.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
