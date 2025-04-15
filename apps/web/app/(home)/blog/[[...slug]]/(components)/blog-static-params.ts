import { blogSource } from "@/lib/source";
import { getSeriesNames } from "@/lib/series";

export async function generateAllParams() {
  const blogPostsParams = await blogSource.generateParams();

  // Generate series page params
  const seriesParams = generateSeriesPathParams();

  // Get root and pagination params
  const rootParams = generateRootPathParams(blogPostsParams);

  // Generate category params (both category pages and their pagination)
  const categoryParams = generateCategoryPathParams(blogPostsParams);

  // Combine all params
  const allParams = [
    ...rootParams,
    ...categoryParams,
    ...seriesParams,
    ...blogPostsParams,
  ];

  console.log("generateStaticParams", allParams);

  return allParams;
}

/**
 * Generates static parameters for blog routes including:
 * - Root route
 * - Individual blog posts
 * - Category pages
 * - Pagination for root and category pages
 */
export async function generateBlogStaticParams() {
  return await generateAllParams();
}

/**
 * Builds URLs for the blog root path and its paginated versions
 */
export function generateRootPathParams(
  blogPostsParams: Array<{ slug: string[] }>
) {
  const postsPerPage = 5;
  const totalPages = Math.ceil(blogPostsParams.length / postsPerPage);

  // Generate pagination params for root route - skip page 1 as it's handled by the root route
  const rootPaginationParams = Array.from(
    { length: totalPages - 1 },
    (_, i) => ({
      slug: ["page", (i + 2).toString()],
    })
  );

  // Return root route and pagination params
  return [
    { slug: [] }, // Root route
    ...rootPaginationParams,
  ];
}

/**
 * Builds URLs for category paths and their paginated versions
 */
export function generateCategoryPathParams(
  blogPostsParams: Array<{ slug: string[] }>
) {
  const postsPerPage = 5;

  // Extract categories from two-part slugs
  const categoryPages = blogPostsParams
    .filter((param) => param.slug && param.slug.length === 2)
    .map((param) => ({ slug: [param.slug[0]] }))
    .filter(
      (category, index, self) =>
        // Remove duplicates
        index === self.findIndex((c) => c.slug[0] === category.slug[0])
    );

  const categoryPaginationParams = [];

  for (const category of categoryPages) {
    const categorySlug = category.slug[0];

    // Get posts for this category by checking the URL structure
    const categoryPosts = blogPostsParams.filter((postSlug) => {
      // Extract category from URL path
      return postSlug.slug?.length === 2 && postSlug.slug[0] === categorySlug;
    });

    const categoryTotalPages = Math.ceil(categoryPosts.length / postsPerPage);

    // Skip page 1 as it's handled by the category route
    for (let i = 1; i < categoryTotalPages; i++) {
      categoryPaginationParams.push({
        slug: [categorySlug, "page", (i + 1).toString()],
      });
    }
  }

  return [...categoryPages, ...categoryPaginationParams];
}

/**
 * Builds URLs for series pages
 */
export function generateSeriesPathParams() {
  return getSeriesNames().map((seriesName) => ({
    slug: ["series", seriesName],
  }));
}
