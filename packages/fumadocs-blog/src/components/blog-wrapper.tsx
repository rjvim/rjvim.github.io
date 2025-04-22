import type { loader } from "fumadocs-core/source";
import { notFound } from "next/navigation";
import { BlogList, CategoryBlogList } from "./blog-list";
import { SinglePost } from "./single-post";
import { SeriesList } from "./series-list";
import {
  isBlogRootPage,
  isSeriesPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  isSinglePostPage,
  getSeriesSlug,
  getCategorySlug,
  getPageNumber,
} from "./page-type";
import { type BlogComponents } from "./types";

interface BlogWrapperProps {
  params: { slug?: string[] };
  blogSource: ReturnType<typeof loader>;
  posts: any[];
  components: BlogComponents;
  getCategoryBySlug: (slug: string) => any;
  getSeriesBySlug: (slug: string) => any;
  mdxComponents: any;
}

export async function BlogWrapper({
  params,
  blogSource,
  posts,
  components,
  getCategoryBySlug,
  getSeriesBySlug,
  mdxComponents,
}: BlogWrapperProps) {
  // Handle blog root page
  if (isBlogRootPage(params)) {
    return <BlogList page={1} components={components} posts={posts} />;
  }

  // Handle series page
  if (isSeriesPage(params)) {
    const seriesSlug = getSeriesSlug(params)!;
    return (
      <SeriesList
        seriesSlug={seriesSlug}
        components={components}
        posts={posts}
        getSeriesBySlug={getSeriesBySlug}
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
        posts={posts}
        getCategoryBySlug={getCategoryBySlug}
      />
    );
  }

  // Handle paginated blog page
  if (isPaginatedBlogPage(params)) {
    return (
      <BlogList
        page={getPageNumber(params)}
        components={components}
        posts={posts}
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
        posts={posts}
        getCategoryBySlug={getCategoryBySlug}
      />
    );
  }

  // Handle blog post page
  if (isSinglePostPage(params)) {
    const page = blogSource.getPage(params.slug);
    const category = params.slug?.[0] || undefined;

    if (!page) notFound();

    const lastModified = page?.data.lastModified;
    const lastUpdate = lastModified ? new Date(lastModified) : undefined;
    const tags = page?.data.tags ?? [];

    return (
      <SinglePost
        page={page}
        category={category}
        lastUpdate={lastUpdate}
        tags={tags}
        components={components}
        getCategoryBySlug={getCategoryBySlug}
        mdxComponents={mdxComponents}
      />
    );
  }
}
