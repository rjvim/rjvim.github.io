import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadataImage } from "fumadocs-core/server";
import {
  isBlogRootPage,
  isSeriesPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  isSinglePostPage,
  getSeriesSlug,
  getCategorySlug,
} from "./page-type";

// Define the interface for the return type of createMetadataImage
interface MetadataImageResult {
  getImageMeta: (slugs: string[]) => { alt: string; url: string };
  withImage: (slugs: string[], metadata?: Metadata) => Metadata;
  generateParams: () => { slug: string[] }[];
  createAPI: (handler: any) => any;
}

// Helper function to generate image metadata for OpenGraph and Twitter
function getImageMetadata(url: string, blogConstants: any) {
  return {
    alt: blogConstants.images.altText,
    url,
    width: blogConstants.images.ogImageDimensions.width,
    height: blogConstants.images.ogImageDimensions.height,
  };
}

export async function generateBlogMetadata(props: {
  params: { slug?: string[] };
  createBlogMetadata: (override: Metadata) => Metadata;
  blogConstants: any;
  blogSource: any;
  getCategoryBySlug: (slug: string) => any;
  getSeriesBySlug: (slug: string) => any;
}): Promise<Metadata> {
  const {
    params,
    createBlogMetadata,
    blogConstants,
    blogSource,
    getCategoryBySlug,
    getSeriesBySlug,
  } = props;

  // Create metadata image handler using the provided blogSource
  const blogsMetaImage = createMetadataImage({
    imageRoute: "/blog-posts-og",
    source: blogSource,
  }) as MetadataImageResult;

  // Default for root blog page or when slug is undefined
  if (isBlogRootPage(params)) {
    const imageMetaData = getImageMetadata(
      blogConstants.urls.getBlogOgImageUrl(),
      blogConstants
    );

    return createBlogMetadata({
      title: blogConstants.blogTitle,
      description: blogConstants.blogDescription,
      openGraph: {
        url: blogConstants.urls.blogBase,
        images: imageMetaData,
      },
      twitter: {
        images: imageMetaData,
      },
      alternates: {
        canonical: blogConstants.urls.blogBase,
      },
    });
  }

  // Handle blog post page
  if (isSinglePostPage(params)) {
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

    const imageMetaData = getImageMetadata(
      blogConstants.urls.getSeriesOgImageUrl(seriesSlug),
      blogConstants
    );

    const metadata = createBlogMetadata({
      title: `${series.label}`,
      description: series.description,
      openGraph: {
        url: canonicalUrl,
        images: imageMetaData,
      },
      twitter: {
        images: imageMetaData,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });

    return metadata;
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

    // TODO: Solve the url problem much better
    const canonicalUrl = `/blog/${category}`;
    const categoryInfo = getCategoryBySlug(category);

    const imageMetaData = getImageMetadata(
      blogConstants.urls.getCategoryOgImageUrl(category),
      blogConstants
    );

    const metadata = createBlogMetadata({
      title: `${categoryInfo.label}`,
      description: categoryInfo.description,
      openGraph: {
        url: canonicalUrl,
        images: imageMetaData,
      },
      twitter: {
        images: imageMetaData,
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

    const imageMetaData = getImageMetadata(
      blogConstants.urls.getBlogOgImageUrl(),
      blogConstants
    );

    return createBlogMetadata({
      title: blogConstants.paginationTitle(page),
      description: blogConstants.paginationDescription(page),
      openGraph: {
        url: canonicalUrl,
        images: imageMetaData,
      },
      twitter: {
        images: imageMetaData,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });
  }

  // Handle paginated category page
  if (isPaginatedCategoryPage(params) && params.slug) {
    const category = params.slug[0];
    const page = Number(params.slug[2]);
    const canonicalUrl = blogConstants.urls.getCategoryUrl(category); // Use main category URL as canonical

    const imageMetaData = getImageMetadata(
      blogConstants.urls.getCategoryOgImageUrl(category),
      blogConstants
    );

    return createBlogMetadata({
      title: blogConstants.categoryPaginationTitle(category, page),
      description: blogConstants.categoryPaginationDescription(category, page),
      openGraph: {
        url: canonicalUrl,
        images: imageMetaData,
      },
      twitter: {
        images: imageMetaData,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    });
  }

  const imageMetaData = getImageMetadata(
    blogConstants.urls.getBlogOgImageUrl(),
    blogConstants
  );

  // Default fallback
  return createBlogMetadata({
    title: blogConstants.blogTitle,
    description: blogConstants.blogDescription,
    openGraph: {
      url: blogConstants.urls.blogBase,
      images: imageMetaData,
    },
    twitter: {
      images: imageMetaData,
    },
    alternates: {
      canonical: blogConstants.urls.blogBase,
    },
  });
}
