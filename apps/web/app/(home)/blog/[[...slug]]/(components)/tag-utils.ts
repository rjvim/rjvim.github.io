import { getSortedByDatePosts } from "./post-utils";

export const getTags = (getBlogPosts: () => any[]) => {
  const tagSet = new Set<string>();
  const posts = getSortedByDatePosts(getBlogPosts);

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
  getBlogPosts: () => any[]
) => {
  return [...getSortedByDatePosts(getBlogPosts)]
    .filter((post) => post.data.tags?.includes(tag))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
