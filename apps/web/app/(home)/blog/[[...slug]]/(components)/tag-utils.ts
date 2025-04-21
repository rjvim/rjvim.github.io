import { getSortedByDatePosts as defaultGetSortedByDatePosts } from "@/lib/source";

export const getTags = (getSortedByDatePosts = defaultGetSortedByDatePosts) => {
  const tagSet = new Set<string>();
  const posts = getSortedByDatePosts();

  for (const post of posts) {
    if (post.data.tags) {
      for (const tag of post.data.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).sort();
};

export const getPostsByTag = (
  tag: string,
  getSortedByDatePosts = defaultGetSortedByDatePosts
) => {
  return [...getSortedByDatePosts()]
    .filter((post) => post.data.tags?.includes(tag))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
