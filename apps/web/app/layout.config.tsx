import { Icons } from "@/components/icons";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";

export const title = "mfstack";
export const description =
  "Personal website of MFStack. This is where I articulate my work, open source projects, thoughts, ideas, work, commentary and opinions.";
export const owner = "MFStack";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <img src="/logo.svg" alt="logo" className="w-12 h-12" />
        MFStack
      </>
    ),
  },
  links: [
    {
      text: "Docs",
      url: "/docs",
    },
  ],
};

export const linkItems: LinkItemType[] = [
  {
    icon: <Icons.info />,
    text: "Blog",
    url: "/blog",
    active: "url",
  },
  {
    icon: <Icons.info />,
    text: "About",
    url: "/about",
    active: "url",
  },
  {
    icon: <Icons.posts />,
    text: "Me",
    url: "/me",
    active: "url",
  },
  {
    icon: <Icons.tags />,
    text: "Tags",
    url: "/tags",
    active: "url",
  },
];

export const postsPerPage = 5;
