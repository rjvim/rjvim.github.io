import { blogSource } from "@/lib/source";

/**
 * Generates static parameters for blog routes including:
 * - Root route
 * - Individual blog posts
 * - Category pages
 * - Pagination for root and category pages
 */
export async function generateBlogStaticParams() {
  const staticParams = await blogSource.generateParams();

  // Extract categories from two-part slugs and add them as separate params
  const categories = staticParams
    .filter((param) => param.slug && param.slug.length === 2)
    .map((param) => ({ slug: [param.slug[0]] }))
    .filter(
      (category, index, self) =>
        // Remove duplicates
        index === self.findIndex((c) => c.slug[0] === category.slug[0])
    );

  // Get all posts to calculate pagination
  const postsPerPage = 5;
  const totalPages = Math.ceil(staticParams.length / postsPerPage);

  // Generate pagination params for root route - skip page 1 as it's handled by the root route
  const rootPaginationParams = Array.from(
    { length: totalPages - 1 },
    (_, i) => ({
      slug: ["page", (i + 2).toString()],
    })
  );

  // Generate pagination params for each category
  const categoryPaginationParams = [];
  for (const category of categories) {
    const categorySlug = category.slug[0];

    // Get posts for this category by checking the URL structure
    const categoryPosts = staticParams.filter((postSlug) => {
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

  // Filter out any params with slug containing 'page' and '1'
  const filteredParams = [...staticParams, ...categories].filter((param) => {
    // Keep params that don't have 'page' and '1' in sequence
    if (param.slug && param.slug.includes("page")) {
      const pageIndex = param.slug.indexOf("page");
      if (
        pageIndex >= 0 &&
        pageIndex + 1 < param.slug.length &&
        param.slug[pageIndex + 1] === "1"
      ) {
        return false; // Filter out page/1 entries
      }
    }
    return true;
  });

  // Combine all params
  const allParams = [
    { slug: [] }, // Root route
    ...filteredParams,
    ...rootPaginationParams,
    ...categoryPaginationParams,
  ];

  // console.log("generateStaticParams", allParams);

  return allParams;
}
