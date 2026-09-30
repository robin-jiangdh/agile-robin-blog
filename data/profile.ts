export type SocialLink = {
  label: string
  href: string
}

export type SiteStackNote = {
  title: string
  description: string
}

export const profile = {
  name: 'Robin',
  handle: 'robin-jiangdh',
  title: 'AI / 软件工程 / DevOps / 可观测性',
  email: '',
  location: 'China',
  avatar: '/static/images/avatar.svg',
  intro:
    '我是 Robin，「Agile Robin」的主理人。关注 AI 与软件工程的交叉地带：AI Coding、Agent 工作流、MLOps，以及 DevOps 与可观测性，还有 Home Lab 折腾。这个博客用 Markdown 写作，推代码即发布。',
  quote: '把事情做成，把过程写下来，把系统越改越好。',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/robin-jiangdh' },
    { label: 'Blog', href: 'https://blog.robinjiang.com/' },
  ] satisfies SocialLink[],
  interests: ['AI Coding', 'DevOps', '可观测性', 'Home Lab', '开源'],
  skills: {
    languages: ['TypeScript', 'Python', 'Go', 'SQL'],
    frontend: ['Next.js', 'React', 'Tailwind CSS', 'MDX'],
    content: ['Contentlayer', 'RSS', 'Local Search', 'SEO'],
    deployment: ['Vercel', 'GitHub Actions', 'Rundeck', 'Airflow'],
  },
  siteHistory: [
    '2026 年 9 月之前，博客跑在 Hashnode 上（blog.robinjiang.com）。',
    '2026 年 9 月迁移到自建站：Next.js + Contentlayer + Vercel，内容全部用 Markdown 管理。',
    '固定栏目：周六《开源周报》、周三《硬核深挖》、月末《工具生态盘点》。',
    '历史文章 36 篇已全量迁移，老链接（/<slug>）全部 308 跳转到新地址。',
  ],
  siteStackNotes: [
    {
      title: 'Framework',
      description: 'Next.js App Router with TypeScript and React 19.',
    },
    {
      title: 'Content',
      description:
        'Contentlayer-powered MDX posts, computed slugs, reading time, and table of contents.',
    },
    {
      title: 'Publishing',
      description: 'RSS, sitemap, robots, local search, dark mode, and optional Giscus comments.',
    },
  ] satisfies SiteStackNote[],
}
