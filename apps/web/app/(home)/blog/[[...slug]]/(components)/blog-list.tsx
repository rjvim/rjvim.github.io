import { getSortedByDatePosts } from "@/lib/source";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/categories";
import { PostList } from "./post-list";
import { BlogComponents } from "./types";

export function RecentPosts() {
  const recentPostsPageSize = 3;
  const allPosts = getSortedByDatePosts();
  const posts = allPosts.slice(0, recentPostsPageSize);
  const totalPages = 1;

  return (
    <PostList
      posts={posts}
      currentPage={1}
      totalPages={totalPages}
      disablePagination={true}
      heading="Recent Posts"
      description="Check out my latest thoughts, tutorials, and insights on web development and design."
    />
  );
}

export function BlogList({
  page = 1,
  disablePagination = false,
  components,
}: {
  page?: number;
  disablePagination?: boolean;
  components?: any;
}) {
  const pageSize = 5;
  const allPosts = getSortedByDatePosts();
  const posts = allPosts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(allPosts.length / pageSize);

  return (
    <PostList
      posts={posts}
      currentPage={page}
      totalPages={totalPages}
      disablePagination={disablePagination}
      components={components}
    />
  );
}

export function CategoryBlogList({
  category,
  page = 1,
  disablePagination = false,
  components,
}: {
  category: string;
  page?: number;
  disablePagination?: boolean;
  components?: BlogComponents;
}) {
  const pageSize = 5;
  const categoryInfo = getCategoryBySlug(category);
  const allPosts = getPostsByCategory(category);
  const posts = allPosts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(allPosts.length / pageSize);

  return (
    <PostList
      posts={posts}
      currentPage={page}
      totalPages={totalPages}
      heading={categoryInfo.label}
      description={categoryInfo.description}
      basePath={`/blog/${category}`}
      disablePagination={disablePagination}
      components={components}
    />
  );
}
