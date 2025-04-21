import { BlogPost } from "./types";

export const getTags = (getSortedByDatePosts: () => BlogPost[]) => {
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
  getSortedByDatePosts: () => BlogPost[]
) => {
  return [...getSortedByDatePosts()]
    .filter((post) => post.data.tags?.includes(tag))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
