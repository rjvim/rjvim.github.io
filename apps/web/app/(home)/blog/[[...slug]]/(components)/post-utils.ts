import { BlogPost } from "./types";

/**
 * Returns posts sorted by date in descending order (newest first)
 * @param getBlogPosts Function to get all blog posts
 * @param includeDrafts Whether to include draft posts (default: false)
 * @returns Array of blog posts sorted by date
 */
export const getSortedByDatePosts = (
  getBlogPosts: () => any[],
  includeDrafts: boolean = false
): any[] => {
  const posts = getBlogPosts().filter((post) => includeDrafts || !post.data.draft);
  
  return [...posts].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
};
