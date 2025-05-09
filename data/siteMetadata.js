/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Anurag Basant',
  author: 'Anurag Basant',
  headerTitle: 'Anurag’s Blog',
  description: 'Exploring AI, reinforcement learning, agentic systems, and making GPUs go brrr.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://anuragbasant.com',
  siteRepo: 'https://github.com/Anurag9292',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: '',
  email: 'anuragbasant@gmail.com',
  github: 'https://github.com/Anurag9292',
  x: 'https://x.com/Anurag9292',
  facebook: '',
  youtube: '',
  linkedin: 'https://www.linkedin.com/in/anurag-basant/',
  threads: '',
  instagram: '',
  medium: '',
  bluesky: '',
  locale: 'en-US',
  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
