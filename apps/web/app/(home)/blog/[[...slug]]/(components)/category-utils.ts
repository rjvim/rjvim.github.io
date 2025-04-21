export const getPostsByCategory = (
  category: string,
  getSortedByDatePosts: () => any[]
) => {
  return getSortedByDatePosts()
    .filter((post: any) => post.slugs && post.slugs[0] === category)
    .sort((a: any, b: any) => b.data.date.getTime() - a.data.date.getTime());
};

export const getPostsByCategoryAndSlug = (
  category: string,
  slug: string,
  getSortedByDatePosts: () => any[]
) => {
  return (
    getSortedByDatePosts()
      .filter(
        (post: any) =>
          post.slugs && post.slugs[0] === category && post.slugs[1] === slug
      )
      .sort(
        (a: any, b: any) => b.data.date.getTime() - a.data.date.getTime()
      )[0] || undefined
  );
};
