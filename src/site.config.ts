import { PORTFOLIO } from './data/portfolio/index.ts';

const twitterUsername = new URL(PORTFOLIO.socialPages.twitter).pathname.replace(/^\/+|\/+$/gu, '');

// canonical metadata and navigation shared by every generated page
export const SITE_CONFIG = {
  author: {
    email: PORTFOLIO.email,
    familyName: 'Graterol',
    givenName: 'Jesus',
    jobTitle: 'Software Developer',
    name: PORTFOLIO.name,
    twitterHandle: `@${twitterUsername}`,
    url: PORTFOLIO.url,
    username: 'jesusgraterol',
  },
  defaultDescription:
    'Jesus Graterol is a seasoned software developer building scalable systems, AI-powered products, and agentic workflows with the OpenAI API and Codex.',
  language: 'en',
  license: 'MIT',
  name: PORTFOLIO.name,
  navigation: [
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#tech-stack', label: 'Stack' },
    { href: '#contact', label: 'Contact' },
  ],
  openGraph: {
    height: 630,
    image: '/og.png',
    imageAlt: 'Jesus Graterol, Software Developer',
    imageType: 'image/png',
    locale: 'en_US',
    width: 1200,
  },
  repositoryUrl: 'https://github.com/jesusgraterol/jesusgraterol.dev',
  themeColors: {
    dark: '#1e2939',
    light: '#fefdfb',
  },
  title: 'Jesus Graterol | Software Developer',
  url: 'https://jesusgraterol.dev',
} as const;
