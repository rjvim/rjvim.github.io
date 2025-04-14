import React from "react";
import Link from "next/link";
import { GridBackground } from "@repo/ui/components/grid-background";
import { getSeriesBySlug, getPostsBySeries } from "@/lib/series";

interface SeriesListProps {
  seriesSlug: string;
}

export function SeriesList({ seriesSlug }: SeriesListProps) {
  const seriesInfo = getSeriesBySlug(seriesSlug);
  const posts = getPostsBySeries(seriesSlug);
  
  return (
    <div className="container px-4 py-8 lg:py-12 lg:px-6">
      <GridBackground maxWidthClass="container" />
      <div className="relative">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {seriesInfo.label}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {seriesInfo.description}
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.url}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium">
                  {post.data.seriesPart || ""}
                </div>
                <div className="flex-1">
                  <Link href={post.url}>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2">
                      {post.data.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {post.data.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      {post.data.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.data.tags && post.data.tags.length > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <div className="flex flex-wrap gap-2">
                          {post.data.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
