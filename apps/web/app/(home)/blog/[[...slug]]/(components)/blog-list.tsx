import { PostList } from "./post-list";
import { BlogComponents } from "./types";

export function RecentPosts({ posts }: { posts: any[] }) {
  const recentPostsPageSize = 3;
  const displayPosts = posts.slice(0, recentPostsPageSize);
  const totalPages = 1;

  return (
    <PostList
      posts={displayPosts}
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
  posts,
}: {
  page?: number;
  disablePagination?: boolean;
  components?: any;
  posts: any[];
}) {
  const pageSize = 5;
  const displayPosts = posts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(posts.length / pageSize);

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
  posts,
  getCategoryBySlug,
}: {
  category: string;
  page?: number;
  disablePagination?: boolean;
  components?: BlogComponents;
  posts: any[];
  getCategoryBySlug: (slug: string) => any;
}) {
  const pageSize = 5;
  const categoryInfo = getCategoryBySlug(category);
  const filteredPosts = posts.filter(
    (post) => post.slugs && post.slugs[0] === category
  );
  const displayPosts = filteredPosts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(filteredPosts.length / pageSize);

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
