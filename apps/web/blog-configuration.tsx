import type { Metadata } from "next/types";
import { GridBackground } from "@repo/ui/components/grid-background";
import { cn } from "@repo/shadverse/lib/utils";
import { Button } from "@repo/shadverse/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/shadverse/components/popover";
import { Badge } from "@repo/shadverse/components/badge";
import { Book } from "@repo/shadverse/components/ui/book";
import { Card } from "@repo/shadverse/components/card";
import type {
  BlogConstants,
  BlogConfiguration,
} from "@repo/fumadocs-blog/blog";
import { PostCard } from "@repo/fumadocs-blog/blog";
import {
  Brain,
  Book as LucideBook,
  Code,
  Cog,
  Lightbulb,
  Megaphone,
  Rocket,
  Users,
  Wrench,
} from "lucide-react";
import { SocialIcons } from "@repo/ui/components/social-icons";

// Blog text constants that can be customized

export const blogConstants: BlogConstants = {
  // General
  blogTitle: "Blog",
  blogDescription: "Articles and thoughts",
  siteName: "rjv.im",
  defaultAuthorName: "Rajiv",
  xUsername: "@rjv_im",
  // Pagination
  paginationTitle: (page: number) => `Blog - Page ${page}`,
  paginationDescription: (page: number) =>
    `Articles and thoughts - Page ${page}`,
  categoryPaginationTitle: (category: string, page: number) =>
    `${category.charAt(0).toUpperCase() + category.slice(1)} - Page ${page}`,
  categoryPaginationDescription: (category: string, page: number) =>
    `Articles in the ${category} category - Page ${page}`,
  // URLs
  blogBase: "/blog",
  blogOgImageBase: "blog-og",
  pageSize: 5,
};

export function createBlogMetadata(
  override: Metadata,
  blogConstants: BlogConstants
): Metadata {
  // Derive values from the core properties
  const siteUrl = `https://${blogConstants.siteName}`;
  const author = {
    name: blogConstants.defaultAuthorName,
    url: siteUrl,
  };
  const creator = blogConstants.defaultAuthorName;

  return {
    ...override,
    authors: [author],
    creator: creator,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: siteUrl,
      siteName: blogConstants.siteName,
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      site: blogConstants.xUsername,
      creator: blogConstants.xUsername,
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      ...override.twitter,
    },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/api/rss.xml",
      },
      ...override.alternates,
    },
    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: "/assets/light-logo.svg",
          href: "/assets/light-logo.svg",
        },
        {
          media: "(prefers-color-scheme: dark)",
          url: "/assets/dark-logo.svg",
          href: "/assets/dark-logo.svg",
        },
      ],
    },
  };
}

export function getBlogConfiguration(): BlogConfiguration {
  return {
    PostCard: PostCard,
    backgroundPattern: {
      enabled: true,
      component: <GridBackground maxWidthClass="container" />,
    },
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Badge,
    Book,
    Card,
    cn,
    config: {
      blogBase: blogConstants.blogBase,
      blogOgImageBase: blogConstants.blogOgImageBase,
      pageSize: 5,
    },
  };
}

export const useBlogConfiguration = getBlogConfiguration;

// Moved from lib/categories.ts
export const getCategoryBySlug = (slug: string) => {
  const categories = {
    "behind-the-scenes": {
      label: "Behind the Scenes",
      icon: Wrench,
      description:
        "Raw process of building—why and how you create tools, launches, updates, redesigns.",
    },
    "dev-life": {
      label: "Dev Life",
      icon: Code,
      description:
        "Personal takes on being a developer/founder—tips, lessons, workflows.",
    },
    plans: {
      label: "Plans",
      icon: Lightbulb,
      description:
        "Public brainstorming—future features, tool concepts, Teurons' direction.",
    },
    idea: {
      label: "Idea",
      icon: Brain,
      description:
        "Exploratory thoughts and wild concepts for Teurons and beyond.",
    },
    "tools-tech": {
      label: "Tools Tech",
      icon: Cog,
      description: "Deep dives into tech stacks, tool mechanics, trends.",
    },
    team: {
      label: "Team",
      icon: Users,
      description: "Teurons' startup journey, team dynamics, Betalectic roots.",
    },
    startup: {
      label: "Startup",
      icon: Rocket,
      description: "Growth stories and insights from Teurons and Betalectic.",
    },
    opinions: {
      label: "Opinions",
      icon: Megaphone,
      description:
        "Subjective, wild, gut-hunch takes—less informed, out-of-box rants.",
    },
    "deep-domain-problems": {
      label: "Deep Domain Problems",
      icon: LucideBook,
      description:
        "Isolated series like a book/course—tackling big, specific domain issues.",
    },
  };

  return (
    categories[slug as keyof typeof categories] || {
      label: slug.toString().replace(/-/g, " ").toLowerCase(),
      icon: SocialIcons.github,
    }
  );
};

export const getSeriesBySlug = (slug: string) => {
  const series = {
    x: {
      label: "Series X",
      icon: LucideBook,
      description:
        "A comprehensive series on Zero Trust security architecture.",
    },
    "building-react-component-library": {
      label: "Building React Component Library",
      icon: LucideBook,
      description: "A series on building a React component library.",
    },
    // Add more series here as needed
  };

  return (
    series[slug as keyof typeof series] || {
      label: slug.charAt(0).toUpperCase() + slug.slice(1),
      icon: LucideBook,
      description: `Articles in the ${slug.charAt(0).toUpperCase() + slug.slice(1)} series.`,
    }
  );
};
