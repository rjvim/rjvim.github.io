export const getTags = (getSortedByDatePosts: () => any[]) => {
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
  getSortedByDatePosts: () => any[]
) => {
  return [...getSortedByDatePosts()]
    .filter((post: any) => post.data.tags?.includes(tag))
    .sort((a: any, b: any) => b.data.date.getTime() - a.data.date.getTime());
};
