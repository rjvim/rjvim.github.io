import type { Metadata } from "next";
import {
  isBlogRootPage,
  isSeriesPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  getSeriesSlug,
  getCategorySlug,
  getPageNumber,
} from "./page-type";

export interface OGImageGeneratorConfig {
  /**
   * Function to generate the OG image
   */
  generateOGImage: (title: string) => Response;
  
  /**
   * Blog constants from the application
   */
  blogConstants: {
    blogTitle: string;
    seriesSuffix: string;
    categorySuffix: string;
    paginationTitle: (page: number) => string;
    categoryPaginationTitle: (category: string, page: number) => string;
  };
  
  /**
   * Function to get category information by slug
   */
  getCategoryBySlug: (slug: string) => { label: string; description?: string };
  
  /**
   * Function to get series information by slug
   */
  getSeriesBySlug: (slug: string) => { label: string; description?: string };
  
  /**
   * Blog source to get post data
   */
  blogSource: any;
}

/**
 * Process URL parameters by removing image.png from the slug
 */
export function processImageParams(params: { slug?: string[] }) {
  return {
    slug: params.slug?.filter((s) => s !== "image.png"),
  };
}

/**
 * Generate OG image title based on URL parameters
 */
export function generateOGImageTitle(
  params: { slug?: string[] },
  config: OGImageGeneratorConfig
): string {
  const processedParams = processImageParams(params);
  const { blogConstants, getCategoryBySlug, getSeriesBySlug, blogSource } = config;

  // Blog root page
  if (isBlogRootPage(processedParams)) {
    return blogConstants.blogTitle;
  }

  // Series page
  if (isSeriesPage(processedParams)) {
    const seriesSlug = getSeriesSlug(processedParams);
    if (seriesSlug) {
      const series = getSeriesBySlug(seriesSlug);
      if (series) {
        return `${series.label} - ${blogConstants.seriesSuffix}`;
      }
    }
  }

  // Category page
  if (isCategoryPage(processedParams)) {
    const categorySlug = getCategorySlug(processedParams);
    if (categorySlug) {
      const categoryInfo = getCategoryBySlug(categorySlug);
      if (categoryInfo) {
        return `${categoryInfo.label} - ${blogConstants.categorySuffix}`;
      }
    }
  }

  // Paginated blog page
  if (isPaginatedBlogPage(processedParams)) {
    const pageNumber = getPageNumber(processedParams);
    return blogConstants.paginationTitle(pageNumber);
  }

  // Paginated category page
  if (isPaginatedCategoryPage(processedParams)) {
    const categorySlug = processedParams.slug?.[0] || "";
    const pageNumber = getPageNumber(processedParams);
    const categoryInfo = getCategoryBySlug(categorySlug);
    
    if (categoryInfo) {
      return blogConstants.categoryPaginationTitle(categorySlug, pageNumber);
    }
  }

  // Single post page (default case for any other URL pattern)
  if (processedParams.slug && processedParams.slug.length > 0) {
    const post = blogSource.getPage(processedParams.slug);
    if (post && post.data && post.data.title) {
      return post.data.title;
    }
  }

  // Default fallback
  return blogConstants.blogTitle;
}

/**
 * Handle OG image generation for blog routes
 */
export function handleOGImageRequest(
  params: { slug?: string[] },
  config: OGImageGeneratorConfig
): Response {
  const title = generateOGImageTitle(params, config);
  return config.generateOGImage(title);
}
