function resolveUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Vercel build-time deployment URL (preview + production), no protocol
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://blog.robinjiang.com";
}

export const site = {
  title: "Agile Robin",
  tagline: "AI · 软件工程 · DevOps · 可观测性",
  description:
    "Robin 的技术博客：AI、软件工程、DevOps 与可观测性。每周六《开源周报》，每周三《硬核深挖》，月末《工具生态盘点》。",
  author: "Robin Jiang",
  url: resolveUrl(),
  github: "https://github.com",
};

export const CATEGORIES = [
  {
    slug: "weekly",
    name: "开源周报",
    match: "开源周报",
    desc: "每周六更新：GitHub 开源项目动态，一句话定位 + star 增量。",
  },
  {
    slug: "deepdive",
    name: "硬核深挖",
    match: "硬核深挖",
    desc: "每周三更新：DataOps、可观测性、DevOps —— 把原理讲透，把实战讲细。",
  },
  {
    slug: "tools",
    name: "工具盘点",
    match: "工具盘点",
    desc: "月末更新：工具生态横评，给人群画像，不给唯一答案。",
  },
] as const;
