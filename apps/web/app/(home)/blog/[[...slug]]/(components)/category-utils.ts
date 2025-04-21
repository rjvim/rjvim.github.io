import { BlogPost } from "./types";

export const getPostsByCategory = (
  category: string,
  getSortedByDatePosts: () => BlogPost[]
) => {
  return getSortedByDatePosts()
    .filter((post) => post.slugs && post.slugs[0] === category)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

export const getPostsByCategoryAndSlug = (
  category: string,
  slug: string,
  getSortedByDatePosts: () => BlogPost[]
) => {
  return (
    getSortedByDatePosts()
      .filter(
        (post) =>
          post.slugs && post.slugs[0] === category && post.slugs[1] === slug
      )
      .sort(
        (a, b) => b.data.date.getTime() - a.data.date.getTime()
      )[0] || undefined
  );
};
