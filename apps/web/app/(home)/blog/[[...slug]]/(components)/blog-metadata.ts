import { blogSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { blogsMetaImage } from "@/lib/metadata-image";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/categories";
import { getSeriesBySlug } from "@/lib/series";
import {
  isBlogRootPage,
  isSeriesPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  isBlogPostPage,
  getSeriesSlug,
  getCategorySlug,
} from "@repo/fumadocs-blog/blog";

export async function generateBlogMetadata(props: {
  params: { slug?: string[] };
  createBlogMetadata: (override: Metadata) => Metadata;
  blogConstants: any;
}): Promise<Metadata> {
  const { params, createBlogMetadata, blogConstants } = props;

  // Default for root blog page or when slug is undefined
  if (isBlogRootPage(params)) {
    return createBlogMetadata({
      title: blogConstants.blogTitle,
      description: blogConstants.blogDescription,
      openGraph: {
        url: blogConstants.urls.blogBase,
      },
      alternates: {
        canonical: blogConstants.urls.blogBase,
      },
    });
  }

  // Handle blog post page
  if (isBlogPostPage(params)) {
    const page = blogSource.getPage(params.slug);
    if (!page) notFound();

    const metadata = createBlogMetadata(
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

    const canonicalUrl = blogConstants.urls.getSeriesUrl(seriesSlug);

    return createBlogMetadata({
      title: `${series.label} - ${blogConstants.seriesSuffix}`,
      description:
        series.description ||
        blogConstants.seriesDefaultDescription(series.label),
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
      return createBlogMetadata({
        title: blogConstants.blogTitle,
        description: blogConstants.blogDescription,
        openGraph: {
          url: blogConstants.urls.blogBase,
        },
        alternates: {
          canonical: blogConstants.urls.blogBase,
        },
      });
    }

    const canonicalUrl = `/blog/${category}`;
    const categoryInfo = getCategoryBySlug(category);

    const metadata = createBlogMetadata({
      title: `${categoryInfo.label} - ${blogConstants.categorySuffix}`,
      description:
        categoryInfo.description ||
        blogConstants.categoryDefaultDescription(categoryInfo.label),
      openGraph: {
        url: canonicalUrl,
        images: {
          alt: blogConstants.images.altText,
          url: blogConstants.urls.getBlogOgImageUrl(category),
          width: blogConstants.images.ogImageDimensions.width,
          height: blogConstants.images.ogImageDimensions.height,
        },
      },
      twitter: {
        images: {
          alt: blogConstants.images.altText,
          url: blogConstants.urls.getBlogOgImageUrl(category),
          width: blogConstants.images.ogImageDimensions.width,
          height: blogConstants.images.ogImageDimensions.height,
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
    const canonicalUrl = blogConstants.urls.blogBase; // Use main blog URL as canonical for all paginated pages

    return createBlogMetadata({
      title: blogConstants.paginationTitle(page),
      description: blogConstants.paginationDescription(page),
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
      return createBlogMetadata({
        title: blogConstants.blogTitle,
        description: blogConstants.blogDescription,
        openGraph: {
          url: blogConstants.urls.blogBase,
        },
        alternates: {
          canonical: blogConstants.urls.blogBase,
        },
      });
    }

    const page = Number(params.slug[2]);
    const canonicalUrl = blogConstants.urls.getCategoryUrl(category); // Use main category URL as canonical

    return createBlogMetadata({
      title: blogConstants.categoryPaginationTitle(category, page),
      description: blogConstants.categoryPaginationDescription(category, page),
      openGraph: {
        url: canonicalUrl,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });
  }

  // Default fallback
  return createBlogMetadata({
    title: blogConstants.blogTitle,
    description: blogConstants.blogDescription,
    openGraph: {
      url: blogConstants.urls.blogBase,
    },
    alternates: {
      canonical: blogConstants.urls.blogBase,
    },
  });
}
