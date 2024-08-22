import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ProvenanceWidgets',
  tagline: 'A JavaScript Library of UI Controls to Track and Dynamically Overlay Analytic Provenance',
  favicon: 'img/favicon.ico',
  customFields: {
    authors: ['Arpit Narechania', 'Kaustubh Odak', 'Mennatallah El-Assady', 'Alex Endert'],
    institutes: ['Georgia Institute of Technology', 'ETH Zürich'],
  },
  // Set the production url of your site here
  url: 'https://provenancewidgets.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ProvenanceWidgets', // Usually your GitHub org/user name.
  projectName: 'ProvenanceWidgets', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: null,
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          routeBasePath: '/show',
          blogSidebarCount: 0,
          showLastUpdateTime: false
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/pw-social-card.png',
    navbar: {
      title: 'ProvenanceWidgets',
      logo: {
        alt: 'ProvenanceWidgets Logo',
        src: 'img/logo-light.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {href: 'https://provenancewidgets.github.io/showcase/', label: 'Showcase', position: 'left'},
        {
          href: `https://github.com/ProvenanceWidgets/ProvenanceWidgets`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ProvenanceWidgets/ProvenanceWidgets',
            },
            {
              label: 'arXiv',
              href: 'https://arxiv.org/abs/2407.17431',
            },
            {
              label: 'Supplemental Material (VIS 2024)',
              href: 'https://github.com/ProvenanceWidgets/Supplemental-Material'
            }
          ],
        },
        {
          title: 'Contacts',
          items: [
            {
              label: 'Arpit Narechania arpitnarechania [at] gmail.com',
              href: 'mailto:'
            },
            {
              label: 'Kaustubh Odak kaustubhodak1 [at] gmail.com',
              href: 'mailto:'
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ProvenanceWidgets`
    },
    prism: {
      additionalLanguages: ['bash', 'json', 'typescript'],
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oceanicNext
    },
  } satisfies Preset.ThemeConfig,

  clientModules: [
    'node_modules/provenance-widgets/web-components/index.js'
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  stylesheets: [
    '/styles/styles.css'
  ],
};

export default config;