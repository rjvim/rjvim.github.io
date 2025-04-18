import React from "react";
import Link from "next/link";
import { getSeriesInfo } from "@/lib/series";
import { cn } from "@repo/shadverse/lib/utils";

interface SeriesComponentProps {
  seriesName: string;
  currentPart: number;
}

export function SeriesPopoverContent({
  seriesName,
  currentPart,
}: SeriesComponentProps) {
  const seriesInfo = getSeriesInfo(seriesName);
  if (!seriesInfo) return null;

  const { title, posts, totalParts } = seriesInfo;

  return (
    <div className="p-4">
      <div className="mb-2 font-medium text-gray-900 dark:text-white">
        Part {currentPart} of {totalParts} in series:{" "}
        <Link
          href={`/blog/series/${seriesName}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {title}
        </Link>
      </div>
      <div className="space-y-1">
        {posts.map((post, index) => (
          <div
            key={post.url}
            className={cn(
              "flex items-center",
              post.data.seriesPart === currentPart
                ? "font-medium text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            <span className="mr-2 text-sm">
              {(post.data.seriesPart || index + 1).toString().padStart(2, "0")}
            </span>
            <Link
              href={post.url}
              className={cn(
                "hover:underline",
                post.data.seriesPart === currentPart
                  ? ""
                  : "hover:text-blue-600 dark:hover:text-blue-400"
              )}
            >
              {post.data.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SeriesInfo({ seriesName, currentPart }: SeriesComponentProps) {
  const seriesInfo = getSeriesInfo(seriesName);
  if (!seriesInfo) return null;

  const { title, posts, totalParts } = seriesInfo;

  return (
    <div className="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-2 font-medium text-gray-900 dark:text-white">
        Part {currentPart} of {totalParts} in series:{" "}
        <Link
          href={`/blog/series/${seriesName}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {title}
        </Link>
      </div>
      <div className="space-y-1">
        {posts.map((post, index) => (
          <div
            key={post.url}
            className={cn(
              "flex items-center",
              post.data.seriesPart === currentPart
                ? "font-medium text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            <span className="mr-2 text-sm">
              {(post.data.seriesPart || index + 1).toString().padStart(2, "0")}
            </span>
            <Link
              href={post.url}
              className={cn(
                "hover:underline",
                post.data.seriesPart === currentPart
                  ? ""
                  : "hover:text-blue-600 dark:hover:text-blue-400"
              )}
            >
              {post.data.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
