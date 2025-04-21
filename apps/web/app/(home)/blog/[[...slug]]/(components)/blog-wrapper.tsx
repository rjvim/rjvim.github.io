import type { loader } from "fumadocs-core/source";
import { notFound } from "next/navigation";
import {
  BlogList,
  CategoryBlogList,
} from "@/app/(home)/blog/[[...slug]]/(components)/blog-list";
import { BlogPost } from "@/app/(home)/blog/[[...slug]]/(components)/blog-post";
import { SeriesList } from "@/app/(home)/blog/[[...slug]]/(components)/series-list";
import {
  isBlogRootPage,
  isSeriesPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  isBlogPostPage,
  getSeriesSlug,
  getCategorySlug,
  getPageNumber,
} from "@repo/fumadocs-blog/blog";
import { getBlogComponents } from "./types";

interface BlogWrapperProps {
  params: { slug?: string[] };
  blogSource: ReturnType<typeof loader>;
  getSortedByDatePosts: any;
}

export async function BlogWrapper({
  params,
  blogSource,
  getSortedByDatePosts,
}: BlogWrapperProps) {
  // Get blog components
  const components = getBlogComponents();

  // Handle blog root page
  if (isBlogRootPage(params)) {
    return (
      <BlogList
        page={1}
        components={components}
        getSortedByDatePosts={getSortedByDatePosts}
      />
    );
  }

  // Handle series page
  if (isSeriesPage(params)) {
    const seriesSlug = getSeriesSlug(params)!;
    return (
      <SeriesList
        seriesSlug={seriesSlug}
        components={components}
        getSortedByDatePosts={getSortedByDatePosts}
      />
    );
  }

  // Handle category page
  if (isCategoryPage(params)) {
    const category = getCategorySlug(params);
    return (
      <CategoryBlogList
        category={category}
        components={components}
        getSortedByDatePosts={getSortedByDatePosts}
      />
    );
  }

  // Handle paginated blog page
  if (isPaginatedBlogPage(params)) {
    return (
      <BlogList
        page={getPageNumber(params)}
        components={components}
        getSortedByDatePosts={getSortedByDatePosts}
      />
    );
  }

  // Handle paginated category page
  if (isPaginatedCategoryPage(params)) {
    const category = params.slug?.[0];

    if (!category) {
      return notFound();
    }

    return (
      <CategoryBlogList
        category={category}
        page={getPageNumber(params)}
        components={components}
        getSortedByDatePosts={getSortedByDatePosts}
      />
    );
  }

  // Handle blog post page
  if (isBlogPostPage(params)) {
    const page = blogSource.getPage(params.slug);
    const category = params.slug?.[0] || undefined;

    if (!page) notFound();

    const lastModified = page?.data.lastModified;
    const lastUpdate = lastModified ? new Date(lastModified) : undefined;
    const tags = page?.data.tags ?? [];

    return (
      <BlogPost
        page={page}
        category={category}
        lastUpdate={lastUpdate}
        tags={tags}
        components={components}
      />
    );
  }
}
