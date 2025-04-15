import { blogSource } from "@/lib/source";
import React from "react";
import { notFound } from "next/navigation";
import {
  BlogList,
  CategoryBlogList,
} from "@/app/(home)/blog/[[...slug]]/(components)/blog-list";
import { BlogPost } from "@/app/(home)/blog/[[...slug]]/(components)/blog-post";
import { SeriesList } from "@/app/(home)/blog/[[...slug]]/(components)/series-list";
import { getSeriesBySlug, getPostsBySeries } from "@/lib/series";
import { GridBackground } from "@repo/ui/components/grid-background";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { blogsMetaImage } from "@/lib/metadata-image";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/categories";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  // There is no slug, it's /blog page
  if (!params.slug || params.slug.length === 0) {
    return <BlogList page={1} />;
  }

  // Handle series route
  if (
    params.slug.length >= 2 &&
    params.slug[0] === "series" &&
    params.slug[1]
  ) {
    const seriesSlug = params.slug[1];
    return <SeriesList seriesSlug={seriesSlug} />;
  }

  // There is a category in url
  if (!params.slug || params.slug.length === 1) {
    const category = params.slug?.[0] || "";
    return <CategoryBlogList category={category} />;
  }

  // There is no category in url, it's /blog page with page number
  if (
    params.slug.length === 2 &&
    params.slug[0] === "page" &&
    !isNaN(Number(params.slug[1]))
  ) {
    return <BlogList page={Number(params.slug[1])} />;
  }

  // There is a category in url, it's /blog/category page with page number
  if (
    params.slug.length === 3 &&
    params.slug[1] === "page" &&
    !isNaN(Number(params.slug[2]))
  ) {
    return (
      <CategoryBlogList
        category={params.slug[0]}
        page={Number(params.slug[2])}
      />
    );
  }

  if (params.slug.length === 2) {
    const page = blogSource.getPage(params.slug);
    const category = params.slug?.[0] || undefined;

    if (!page) notFound();

    const lastModified = page?.data.lastModified;
    const lastUpdate = lastModified ? new Date(lastModified) : undefined;
    const tags = page?.data.tags ?? [];

    return (
      <BlogPost
        page={page}
        category={category}
        lastUpdate={lastUpdate}
        tags={tags}
      />
    );
  }
}

export { generateBlogStaticParams as generateStaticParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;

  // Default for root blog page or when slug is undefined
  if (!params.slug || params.slug.length === 0) {
    return createMetadata({
      title: "Blog",
      description: "Articles and thoughts",
      openGraph: {
        url: "/blog",
      },
      alternates: {
        canonical: "/blog",
      },
    });
  }

  // Handle blog post page
  if (
    params.slug.length === 2 &&
    params.slug[0] !== "page" &&
    params.slug[0] !== "series"
  ) {
    const page = blogSource.getPage(params.slug);
    if (!page) notFound();

    const metadata = createMetadata(
      blogsMetaImage.withImage(page.slugs, {
        title: page.data.title,
        description: page.data.description,
        openGraph: {
          url: page.url,
        },
        alternates: {
          canonical: page.url,
        },
      })
    );

    // console.log("metadata for single blog", metadata);

    return metadata;
  }

  // Handle series page
  if (
    params.slug.length >= 2 &&
    params.slug[0] === "series" &&
    params.slug[1]
  ) {
    const seriesSlug = params.slug[1];
    const series = getSeriesBySlug(seriesSlug);

    const canonicalUrl = `/blog/series/${seriesSlug}`;

    return createMetadata({
      title: `${series.label} - Blog Series`,
      description:
        series.description || `Articles in the ${series.label} series`,
      openGraph: {
        url: canonicalUrl,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });
  }

  // Handle category page
  if (params.slug.length === 1) {
    const category = params.slug[0];
    if (!category) {
      return createMetadata({
        title: "Blog",
        description: "Articles and thoughts",
        openGraph: {
          url: "/blog",
        },
        alternates: {
          canonical: "/blog",
        },
      });
    }

    const canonicalUrl = `/blog/${category}`;
    const categoryInfo = getCategoryBySlug(category);

    const metadata = createMetadata({
      title: `${categoryInfo.label} - Blog`,
      description:
        categoryInfo.description ||
        `Articles in the ${categoryInfo.label} category`,
      openGraph: {
        url: canonicalUrl,
        images: {
          alt: "Banner",
          url: `/blog-og/${category}`,
          width: 1200,
          height: 630,
        },
      },
      twitter: {
        images: {
          alt: "Banner",
          url: `/blog-og/${category}`,
          width: 1200,
          height: 630,
        },
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });

    console.log("metadata for category", metadata);

    return metadata;
  }

  // Handle paginated root blog page
  if (params.slug.length === 2 && params.slug[0] === "page") {
    const page = Number(params.slug[1]);
    const canonicalUrl = `/blog`; // Use main blog URL as canonical for all paginated pages

    return createMetadata({
      title: `Blog - Page ${page}`,
      description: `Articles and thoughts - Page ${page}`,
      openGraph: {
        url: canonicalUrl,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });
  }

  // Handle paginated category page
  if (params.slug.length === 3 && params.slug[1] === "page") {
    const category = params.slug[0];
    if (!category) {
      return createMetadata({
        title: "Blog",
        description: "Articles and thoughts",
        openGraph: {
          url: "/blog",
        },
        alternates: {
          canonical: "/blog",
        },
      });
    }

    const page = Number(params.slug[2]);
    const canonicalUrl = `/blog/${category}`; // Use main category URL as canonical

    return createMetadata({
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Page ${page}`,
      description: `Articles in the ${category} category - Page ${page}`,
      openGraph: {
        url: canonicalUrl,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });
  }

  // Default fallback
  return createMetadata({
    title: "Blog",
    description: "Articles and thoughts",
    openGraph: {
      url: "/blog",
    },
    alternates: {
      canonical: "/blog",
    },
  });
}
