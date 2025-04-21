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
import {
  isBlogRootPage,
  isSeriesPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  isBlogPostPage,
  getSeriesSlug,
  getCategorySlug,
  getPageNumber,
} from "@repo/fumadocs-blog/blog";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Handle blog root page
  if (isBlogRootPage(params)) {
    return <BlogList page={1} />;
  }

  // Handle series page
  if (isSeriesPage(params)) {
    const seriesSlug = getSeriesSlug(params)!;
    return <SeriesList seriesSlug={seriesSlug} />;
  }

  // Handle category page
  if (isCategoryPage(params)) {
    const category = getCategorySlug(params);
    return <CategoryBlogList category={category} />;
  }

  // Handle paginated blog page
  if (isPaginatedBlogPage(params)) {
    return <BlogList page={getPageNumber(params)} />;
  }

  // Handle paginated category page
  if (isPaginatedCategoryPage(params)) {
    const category = params.slug?.[0];

    if (!category) {
      return notFound();
    }

    return (
      <CategoryBlogList category={category} page={getPageNumber(params)} />
    );
  }

  // Handle blog post page
  if (isBlogPostPage(params)) {
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
  if (isBlogRootPage(params)) {
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
  if (isBlogPostPage(params)) {
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

    return metadata;
  }

  // Handle series page
  if (isSeriesPage(params)) {
    const seriesSlug = getSeriesSlug(params)!;
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
  if (isCategoryPage(params)) {
    const category = getCategorySlug(params);
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
          url: `/blog-og/${category}/image.png`,
          width: 1200,
          height: 630,
        },
      },
      twitter: {
        images: {
          alt: "Banner",
          url: `/blog-og/${category}/image.png`,
          width: 1200,
          height: 630,
        },
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });

    return metadata;
  }

  // Handle paginated root blog page
  if (isPaginatedBlogPage(params) && params.slug) {
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
  if (isPaginatedCategoryPage(params) && params.slug) {
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
