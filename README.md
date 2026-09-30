# Agile Robin 博客

自建技术博客：Next.js 14 + Markdown，部署在 Vercel（2026-09 从 Hashnode 迁移）。

## 写文章

在 `content/posts/` 下新建 `<slug>.md`，frontmatter 格式：

```yaml
---
title: "文章标题"
description: "一句话摘要"
date: "2026-10-07"
category: "硬核深挖"   # 开源周报 / 硬核深挖 / 工具盘点（可空）
series: "DataOps"      # 系列名（可空）
seriesSlug: "dataops"
tags: ["DataOps", "dbt"]
cover: "https://..."  # 封面图（可空）
readingTime: 8
slug: "my-post-slug"
---
```

正文用标准 Markdown（支持 GFM 表格、代码高亮、目录自动生成）。

## 本地开发

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 构建验证
```

## 发布

推到 GitHub `main` 分支 → Vercel 自动部署。

- RSS: `/rss.xml`，Sitemap: `/sitemap.xml`
- 老 Hashnode 链接 `/{slug}` 已做 301 跳转到 `/posts/{slug}`
- 评论：Giscus（需配置 `NEXT_PUBLIC_GISCUS_*` 环境变量并在仓库开启 Discussions）


