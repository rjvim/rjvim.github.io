import { getSortedByDatePosts } from "./post-utils";

export const getPostsByCategory = (
  category: string,
  postsOrGetter: any[] | (() => any[])
) => {
  const posts = Array.isArray(postsOrGetter) ? postsOrGetter : getSortedByDatePosts(postsOrGetter);
  return posts
    .filter((post) => post.slugs && post.slugs[0] === category)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

export const getPostsByCategoryAndSlug = (
  category: string,
  slug: string,
  postsOrGetter: any[] | (() => any[])
) => {
  const posts = Array.isArray(postsOrGetter) ? postsOrGetter : getSortedByDatePosts(postsOrGetter);
  return (
    posts
      .filter(
        (post) =>
          post.slugs && post.slugs[0] === category && post.slugs[1] === slug
      )
      .sort(
        (a, b) => b.data.date.getTime() - a.data.date.getTime()
      )[0] || undefined
  );
};
