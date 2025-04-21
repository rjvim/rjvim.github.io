import { getSortedByDatePosts } from "./post-utils";

export const getSeriesNames = (postsOrGetter: any[] | (() => any[])) => {
  const seriesSet = new Set<string>();
  const posts = Array.isArray(postsOrGetter) ? postsOrGetter : getSortedByDatePosts(postsOrGetter);

  for (const post of posts) {
    if (post.data.series) {
      seriesSet.add(post.data.series);
    }
  }

  return Array.from(seriesSet).sort();
};

export const getPostsBySeries = (
  seriesName: string,
  postsOrGetter: any[] | (() => any[])
) => {
  const posts = Array.isArray(postsOrGetter) ? postsOrGetter : getSortedByDatePosts(postsOrGetter);
  return posts
    .filter((post) => post.data.series === seriesName)
    .sort((a, b) => {
      // Sort by seriesPart if available, otherwise by date
      if (a.data.seriesPart && b.data.seriesPart) {
        return a.data.seriesPart - b.data.seriesPart;
      }
      return a.data.date.getTime() - b.data.date.getTime();
    });
};

export const getSeriesInfo = (
  seriesName: string,
  postsOrGetter?: any[] | (() => any[])
) => {
  const posts = postsOrGetter ? getPostsBySeries(seriesName, postsOrGetter) : [];
  if (posts.length === 0) return null;

  // Use the first post's title to extract series name if possible
  const firstPost = posts[0];
  if (!firstPost) return null;

  const title = firstPost.data.title || "";
  const seriesTitle = title.includes("Part")
    ? title.split("Part")[0].trim()
    : seriesName.charAt(0).toUpperCase() + seriesName.slice(1);

  return {
    name: seriesName,
    title: seriesTitle,
    posts: posts,
    totalParts: posts.length,
  };
};
