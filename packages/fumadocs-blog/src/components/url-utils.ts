import { BlogConfig } from "./types";

/**
 * Utility functions for generating blog URLs based on the blog configuration
 */
export class UrlUtils {
  private config: BlogConfig;

  constructor(config: BlogConfig) {
    this.config = config;
  }

  /**
   * Get the base blog URL
   */
  getBlogUrl(): string {
    return this.config.blogBase;
  }

  /**
   * Get the URL for a specific blog post
   */
  getPostUrl(slugs: string[]): string {
    return `${this.config.blogBase}/${slugs.join("/")}`;
  }

  /**
   * Get the URL for a specific series
   */
  getSeriesUrl(seriesSlug: string): string {
    return `${this.config.blogBase}/series/${seriesSlug}`;
  }

  /**
   * Get the URL for a specific category
   */
  getCategoryUrl(category: string): string {
    return `${this.config.blogBase}/${category}`;
  }

  /**
   * Get the URL for a paginated blog page
   */
  getPaginatedBlogUrl(page: number): string {
    return `${this.config.blogBase}/page/${page}`;
  }

  /**
   * Get the URL for a paginated category page
   */
  getPaginatedCategoryUrl(category: string, page: number): string {
    return `${this.config.blogBase}/${category}/page/${page}`;
  }

  /**
   * Get the URL for the blog OG image
   */
  getBlogOgImageUrl(): string {
    return `${this.config.blogBase.replace(/^\//, "")}-og/image.png`;
  }

  /**
   * Get the URL for a category OG image
   */
  getCategoryOgImageUrl(category: string): string {
    return `${this.config.blogBase.replace(/^\//, "")}-og/${category}/image.png`;
  }

  /**
   * Get the URL for a series OG image
   */
  getSeriesOgImageUrl(series: string): string {
    return `${this.config.blogBase.replace(/^\//, "")}-og/series/${series}/image.png`;
  }
}

/**
 * Create a URL utils instance from a blog configuration
 */
export function createUrlUtils(config: BlogConfig): UrlUtils {
  return new UrlUtils(config);
}
