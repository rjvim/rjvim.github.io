import { Book } from "lucide-react";
import { getSortedByDatePosts } from "./source";

export const getSeriesBySlug = (slug: string) => {
  const series = {
    x: {
      label: "Series X",
      icon: Book,
      description:
        "A comprehensive series on Zero Trust security architecture.",
    },
    "building-react-component-library": {
      label: "Building React Component Library",
      icon: Book,
      description: "A series on building a React component library.",
    },
    // Add more series here as needed
  };

  return (
    series[slug as keyof typeof series] || {
      label: slug.charAt(0).toUpperCase() + slug.slice(1),
      icon: Book,
      description: `Articles in the ${slug.charAt(0).toUpperCase() + slug.slice(1)} series.`,
    }
  );
};

export const getSeriesNames = () => {
  const seriesSet = new Set<string>();

  for (const post of getSortedByDatePosts()) {
    if (post.data.series) {
      seriesSet.add(post.data.series);
    }
  }

  return Array.from(seriesSet).sort();
};

export const getPostsBySeries = (seriesName: string) => {
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

export const getSeriesInfo = (seriesName: string) => {
  const posts = getPostsBySeries(seriesName);
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
