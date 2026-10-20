# Notion 同步发布闭环

流程：Notion「博客文章」数据库写文章 → 状态改成 **已发布** → GitHub Action 每小时
（或手动 Run workflow）把页面同步成 `data/blog/<slug>.mdx` 并 commit → 现有部署自动上线。

## 一次性配置（仓库所有者）

1. Notion 里打开 https://www.notion.so/my-integrations ，新建 Internal Integration，
   关联本工作区。
2. 打开「博客文章」数据库 → 右上角 `...` → 连接（Connections）→ 把该 Integration 加进去。
3. GitHub 仓库 Settings → Secrets and variables → Actions → New repository secret：
   - Name: `NOTION_TOKEN`，Value: Integration 的 token（`ntn_...` 或 `secret_...`）。
4. 完成后到 Actions 页手动跑一次 "Sync Notion to Blog" 验证。

## 同步规则（scripts/sync-notion.mjs）

- 只同步 `状态 = 已发布` 的页面；**Slug 必填**，没填的跳过并在日志里提示。
- frontmatter 映射：标题→title、发布日期→date（空则用创建时间）、标签→tags、摘要→summary。
- 正文 blocks 转 Markdown：标题/段落/列表/待办/引用/callout（转引用块）/代码块/分割线/
  公式/书签/表格均已支持；暂不支持的块类型会被跳过。
- 正文图片会下载到 `public/static/images/notion/<slug>/` 再引用，不使用 Notion 的临时链接。
- 正文里的 `<`、`{`、`}` 会转义，避免 MDX 构建失败（代码块/行内代码不受影响）。

## 注意

- 改已发布文章：直接在 Notion 里改，下一个同步周期自动更新站点。
- 下线文章：把状态改回草稿**不会**删除已生成的 MDX，需要手动删 `data/blog/<slug>.mdx`。
- 封面（封面字段）目前未同步进 frontmatter images，后续按需再加。
