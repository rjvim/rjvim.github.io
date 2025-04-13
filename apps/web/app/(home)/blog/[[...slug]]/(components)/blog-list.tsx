import { getSortedByDatePosts, getPostsByCategory } from "@/lib/source";
import { getCategoryBySlug } from "@/lib/categories";
import { PostList } from "./post-list";

export function RecentPosts() {
  const pageSize = 3;
  const allPosts = getSortedByDatePosts();
  const posts = allPosts.slice(0, pageSize);
  const totalPages = 1;

  return (
    <PostList 
      posts={posts} 
      currentPage={1} 
      totalPages={totalPages} 
      disablePagination={true}
      heading="Recent Articles"
      description="Check out my latest thoughts, tutorials, and insights on web development and design."
    />
  );
}

export function BlogList({ page = 1, disablePagination = false }: { page?: number; disablePagination?: boolean }) {
  const pageSize = 5;
  const allPosts = getSortedByDatePosts();
  const posts = allPosts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(allPosts.length / pageSize);

  return <PostList posts={posts} currentPage={page} totalPages={totalPages} disablePagination={disablePagination} />;
}

export function CategoryBlogList({
  category,
  page = 1,
  disablePagination = false,
}: {
  category: string;
  page?: number;
  disablePagination?: boolean;
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
    />
  );
}
