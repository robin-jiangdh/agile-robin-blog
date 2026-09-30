const siteMetadata = {
  title: 'Agile Robin',
  author: 'Robin',
  headerTitle: 'Agile Robin',
  description: 'Robin 的技术博客：AI、软件工程、DevOps、可观测性，以及 Home Lab 折腾记录。',
  language: 'zh-cn',
  theme: 'system',
  siteUrl: 'https://agile-robin-blog-robinjiangs-projects.vercel.app',
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/skyplume-card.svg`,
  email: '',
  github: 'https://github.com/robin-jiangdh',
  locale: 'zh-CN',
  stickyNav: false,
  analytics: {},
  newsletter: {
    provider: '',
  },
  comments: {
    provider: 'giscus',
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
