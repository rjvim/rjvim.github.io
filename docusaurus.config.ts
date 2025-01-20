import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import 'dotenv/config';

const BASE_URL =
  process.env.PR_NUMBER !== undefined
    ? `/pr-preview/pr-${process.env.PR_NUMBER}/`
    : "/";

const config: Config = {
  title: "Rajiv I'm",
  tagline: "I write on tech and product, entrepreneurship. I work @betalectic",
  favicon: "img/favicon.ico",
  titleDelimiter: "-",
  // Set the production url of your site here
  url: "https://rjv.im",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: BASE_URL,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "rjvim", // Usually your GitHub org/user name.
  projectName: "rjvim.github.io", // Usually your repo name.
  deploymentBranch: "main",
  trailingSlash: false,
  plugins: [
    '@saucelabs/theme-github-codeblock',
    "docusaurus-tailwindcss-loader", 
    [
      "@ohimg/ohimg-docusaurus-plugin",
      {
        enabledPlugins: [
          'docusaurus-plugin-content-docs',
          'docusaurus-plugin-content-pages',
          'docusaurus-plugin-content-blog'
        ],
        debug: false,
        publishableKey: process.env.OMG_PUBLISHABLE_KEY,
        signatureSecret: process.env.OMG_SIGNATURE_SECRET,
        imageOptions: {
          "logoSrc": "https://rjv.im/img/logo.png"
        }
      }
    ],
  ],
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Inter:wght@300;400;500;600;700;800;900&family=Lexend:wght@100..900&display=swap",
  ],

  presets: [
    [
      "classic",
      {
        gtag: {
          trackingID: "G-F0RQ63PF3G",
          anonymizeIP: true,
        },
        docs: false,
        // docs: {
        //   sidebarPath: "./sidebars.ts",
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        blog: {
          routeBasePath: "/",
          blogSidebarCount: 0,
          showReadingTime: false,
          postsPerPage: 'ALL',
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // docs: {
    //   sidebar: {
    //     hideable: true,
    //   },
    // },
    // announcementBar: {
    //   id: "support_us",
    //   content:
    //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
    //   backgroundColor: "#fafbfc",
    //   textColor: "#091E42",
    //   isCloseable: false,
    // },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "RJV.IM",
      logo: {
        alt: "Rajiv I'm",
        src: "img/logo.png",
      },
      items: [
        // {
        //   type: "docSidebar",
        //   sidebarId: "tutorialSidebar",
        //   position: "left",
        //   label: "Tutorial",
        // },
        { to: "/about", label: "About", position: "right" },
        // {
        //   href: "https://github.com/facebook/docusaurus",
        //   label: "GitHub",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     {
        //       label: "Tutorial",
        //       to: "/docs/intro",
        //     },
        //   ],
        // },
        {
          title: "Follow",
          items: [
            // {
            //   label: "Github",
            //   href: "https://github.com/rjvim",
            // },
            {
              label: "Me",
              href: "https://twitter.com/rjv_im",
            },
            {
              label: "Work",
              href: "https://twitter.com/betalectic",
            },
            {
              label: "LoCoSpec",
              href: "https://twitter.com/locospec",
            },
          ],
        },
        // {
        //   title: "More",
        //   items: [
        //     {
        //       label: "Blog",
        //       to: "/blog",
        //     },
        //     {
        //       label: "GitHub",
        //       href: "https://github.com/facebook/docusaurus",
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rajiv Seelam. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
