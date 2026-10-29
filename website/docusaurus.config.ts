import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Deployment configuration: GitHub Pages is the primary target
const defaultUrl = 'https://dineshwev.github.io';
const defaultBaseUrl = '/content-pipeline-docs/';

const config: Config = {
  title: 'Content Pipeline Docs',
  tagline: 'Practical technology research. Clearer decisions.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Set the production url and baseUrl of the site
  // By default, targets GitHub Pages at https://dineshwev.github.io/content-pipeline-docs/
  url: process.env.URL || (process.env.VERCEL ? 'https://content-pipeline-docs.vercel.app' : defaultUrl),
  baseUrl: process.env.BASE_URL || (process.env.VERCEL ? '/' : defaultBaseUrl),

  organizationName: 'dineshwev',
  projectName: 'content-pipeline-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  clientModules: [require.resolve('./src/clientModules/readingProgress.ts')],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/Dineshwev/content-pipeline-docs/tree/main/website/',
        },
        blog: false, // Default template blog disabled in favor of articles publication
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Content Pipeline Docs',
      logo: {
        alt: 'Content Pipeline Docs Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'left',
          exact: true,
        },
        {
          to: '/docs/intro',
          label: 'Articles',
          position: 'left',
        },
        {
          href: 'https://github.com/Dineshwev/content-pipeline-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Publication',
          items: [
            {
              label: 'Overview & Guidelines',
              to: '/docs/intro',
            },
            {
              label: 'Developer Research Track',
              to: '/docs/category/developer-oriented-articles',
            },
            {
              label: 'Owner Decisions Track',
              to: '/docs/category/owner-oriented-articles',
            },
          ],
        },
        {
          title: 'Categories',
          items: [
            {
              label: 'Developer Case Studies',
              to: '/docs/category/developer-case-studies',
            },
            {
              label: 'Owner Case Studies',
              to: '/docs/category/owner-case-studies',
            },
            {
              label: 'Technology Comparisons',
              to: '/docs/category/developer-comparisons',
            },
            {
              label: 'Business Decisions',
              to: '/docs/category/developer-business-decisions',
            },
          ],
        },
        {
          title: 'Repository',
          items: [
            {
              label: 'GitHub Source',
              href: 'https://github.com/Dineshwev/content-pipeline-docs',
            },
            {
              label: 'Issue Tracker',
              href: 'https://github.com/Dineshwev/content-pipeline-docs/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dinesh Regar. Content Pipeline Docs — Evidence-based technical research and practical decision frameworks.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript', 'javascript', 'json', 'yaml', 'markdown', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
