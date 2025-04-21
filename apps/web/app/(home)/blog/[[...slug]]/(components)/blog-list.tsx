import { getCategoryBySlug } from "@/lib/categories";
import { getPostsByCategory } from "./category-utils";
import { PostList } from "./post-list";
import { BlogComponents } from "./types";
import { getSortedByDatePosts } from "./post-utils";

export function RecentPosts({
  getBlogPosts,
  posts: providedPosts,
}: {
  getBlogPosts?: () => any[];
  posts?: any[];
}) {
  const recentPostsPageSize = 3;
  const allPosts = providedPosts || (getBlogPosts ? getSortedByDatePosts(getBlogPosts) : []);
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
  posts = [],
  getSortedByDatePosts,
}: {
  page?: number;
  disablePagination?: boolean;
  components?: any;
  posts?: any[];
  getSortedByDatePosts?: () => any[];
}) {
  const pageSize = 5;
  const allPosts = posts.length > 0 ? posts : (getSortedByDatePosts ? getSortedByDatePosts() : []);
  const displayPosts = allPosts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(allPosts.length / pageSize);

  return (
    <PostList
      posts={displayPosts}
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
  posts = [],
  getSortedByDatePosts,
}: {
  category: string;
  page?: number;
  disablePagination?: boolean;
  components?: BlogComponents;
  posts?: any[];
  getSortedByDatePosts?: () => any[];
}) {
  const pageSize = 5;
  const categoryInfo = getCategoryBySlug(category);
  const allPosts = posts.length > 0 
    ? posts.filter(post => post.slugs && post.slugs[0] === category)
    : (getSortedByDatePosts ? getPostsByCategory(category, () => getSortedByDatePosts()) : []);
  const displayPosts = allPosts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(allPosts.length / pageSize);

  return (
    <PostList
      posts={displayPosts}
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
