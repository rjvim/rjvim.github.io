import { BlogPost } from "./types";

export const getSeriesNames = (getSortedByDatePosts: () => BlogPost[]) => {
  const seriesSet = new Set<string>();

  for (const post of getSortedByDatePosts()) {
    if (post.data.series) {
      seriesSet.add(post.data.series);
    }
  }

  return Array.from(seriesSet).sort();
};

export const getPostsBySeries = (
  seriesName: string,
  getSortedByDatePosts: () => BlogPost[]
) => {
  return getSortedByDatePosts()
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
  getSortedByDatePosts: () => BlogPost[]
) => {
  const posts = getPostsBySeries(seriesName, getSortedByDatePosts);
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
