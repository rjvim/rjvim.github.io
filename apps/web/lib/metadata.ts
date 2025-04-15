import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
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

export const baseUrl =
  process.env.NODE_ENV === "development" || !process.env.NEXT_PUBLIC_SITE_URL
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.NEXT_PUBLIC_SITE_URL}`);
