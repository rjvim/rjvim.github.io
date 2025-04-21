import { PostCard } from "./app/(home)/blog/[[...slug]]/(components)/post-card";
import { PostCard2 } from "./app/(home)/blog/[[...slug]]/(components)/post-card-2";
import type { Metadata } from "next/types";

// Blog text constants that can be customized
export const blogConstants = {
  // General
  blogTitle: "Blog",
  blogDescription: "Articles and thoughts",
  
  // Series
  seriesSuffix: "Blog Series",
  seriesDefaultDescription: (seriesLabel: string) => `Articles in the ${seriesLabel} series`,
  
  // Category
  categorySuffix: "Blog",
  categoryDefaultDescription: (categoryLabel: string) => `Articles in the ${categoryLabel} category`,
  
  // Pagination
  paginationTitle: (page: number) => `Blog - Page ${page}`,
  paginationDescription: (page: number) => `Articles and thoughts - Page ${page}`,
  categoryPaginationTitle: (category: string, page: number) => `${category.charAt(0).toUpperCase() + category.slice(1)} - Page ${page}`,
  categoryPaginationDescription: (category: string, page: number) => `Articles in the ${category} category - Page ${page}`,

  // URLs
  urls: {
    // Base URLs
    blogBase: "/blog",
    seriesBase: "/blog/series",
    
    // URL Generators
    getBlogUrl: () => "/blog",
    getSeriesUrl: (seriesSlug: string) => `/blog/series/${seriesSlug}`,
    getCategoryUrl: (category: string) => `/blog/${category}`,
    getBlogOgImageUrl: (category: string) => `/blog-og/${category}/image.png`,
  },
  
  // Image settings
  images: {
    ogImageDimensions: {
      width: 1200,
      height: 630,
    },
    altText: "Banner"
  }
};

// Replicate the createMetadata function from lib/metadata.ts
export function createBlogMetadata(override: Metadata): Metadata {
  return {
    ...override,
    authors: [
      {
        name: "Rajiv",
        url: "https://rjv.im",
      },
    ],
    creator: "Rajiv",
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://rjv.im",
      siteName: "rjv.im",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      site: "@rjv_im",
      creator: "@rjv_im",
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

export interface BlogComponents {
  PostCard: typeof PostCard2;
}

export function getBlogComponents(): BlogComponents {
  return {
    PostCard: PostCard2,
  };
}

export const useBlogComponents = getBlogComponents;
