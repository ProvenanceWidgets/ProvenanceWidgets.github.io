import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const isProduction = process.env.NODE_ENV === "production";

const config: Config = {
  title: "ProvenanceWidgets",
  tagline:
    "A JavaScript Library of UI Controls to Track and Dynamically Overlay Analytic Provenance",
  favicon: "img/favicon.ico",
  customFields: {
    authors: [
      "Arpit Narechania",
      "Kaustubh Odak",
      "Mennatallah El-Assady",
      "Alex Endert",
    ],
    institutes: ["Georgia Institute of Technology", "ETH Zürich"],
  },
  // Set the production url of your site here
  url: "https://provenancewidgets.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ProvenanceWidgets", // Usually your GitHub org/user name.
  projectName: "ProvenanceWidgets", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          lastVersion: "current",
          versions: {
            current: {
              label: "2.0",
              path: "v2",
              banner: "none",
              badge: false,
            },
            "1.0": {
              label: "1.0",
              path: "v1",
              banner: "none",
              badge: false,
            },
          },
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: null,
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          routeBasePath: "/show",
          blogSidebarCount: 0,
          showLastUpdateTime: false,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        ...(isProduction
          ? {
              gtag: {
                trackingID: "G-XD9VD9JL4D",
                anonymizeIP: true,
              },
            }
          : {}),
      } satisfies Preset.Options,
    ]
  ],

  plugins: ["docusaurus-plugin-hotjar"],

  themeConfig: {
    // Replace with your project's social card
    image: "img/pw-social-card.png",
    navbar: {
      title: "ProvenanceWidgets",
      logo: {
        alt: "ProvenanceWidgets Logo",
        src: "img/logo-light.svg",
        srcDark: "img/logo-dark.svg",
      },
      items: [
        {
          type: "custom-siteVersionLink",
          target: "docs",
          position: "left",
          label: "Docs",
        },
        {
          type: "custom-siteVersionLink",
          target: "showcase",
          position: "left",
          label: "Showcase",
        },
        {
          type: "docsVersionDropdown",
          position: "left",
          dropdownActiveClassDisabled: true,
        },
        {
          href: `https://github.com/ProvenanceWidgets/ProvenanceWidgets`,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    hotjar: {
      applicationId: 5207146,
    },
    footer: {
      style: "dark",
      copyright: [
        '<div class="pw-footer">',
        '<div>Copyright 2026 <a href="https://datavisards.com/">DataVisards Lab</a> at <a href="https://hkust.edu.hk/">HKUST</a>.</div>',
        '<div>Collaborators: <a href="https://www.gatech.edu/">Georgia Tech</a>, <a href="https://ethz.ch/">ETH Zurich</a>, and <a href="https://aws.amazon.com/">AWS</a>.</div>',
        '<div class="pw-footer__contact">Contact <a href="https://narechania.com/">Arpit Narechania</a> about anything.</div>',
        "</div>",
      ].join(""),
    },
    prism: {
      additionalLanguages: ["bash", "json", "typescript"],
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oceanicNext,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,

  clientModules: [require.resolve("./src/pw.js")],

  themes: ["@docusaurus/theme-live-codeblock"],

  stylesheets: ["/styles/styles.css"],
};

export default config;
