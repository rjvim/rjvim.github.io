import { PostList } from "./post-list";
import { BlogComponents, type BlogPost } from "./types";
import { getSortedByDatePosts } from "./utils";
import { createUrlUtils } from "./url-utils";

export function RecentPosts({
  posts,
  heading = "Recent Posts",
  description,
  recentPostsLimit = 3,
  components,
}: {
  posts: BlogPost[];
  heading?: string;
  description?: string;
  recentPostsLimit?: number;
  components?: BlogComponents;
}) {
  const sortedPosts = getSortedByDatePosts(posts);
  const displayPosts = sortedPosts.slice(0, recentPostsLimit);
  const totalPages = 1;

  return (
    <PostList
      posts={displayPosts}
      currentPage={1}
      totalPages={totalPages}
      disablePagination={true}
      heading={heading}
      description={description}
      components={components}
    />
  );
}

export function BlogList({
  page = 1,
  disablePagination = false,
  components,
  posts,
  heading,
  description,
}: {
  page?: number;
  disablePagination?: boolean;
  components?: BlogComponents;
  posts: BlogPost[];
  heading?: string;
  description?: string;
}) {
  const pageSize = components?.config?.pageSize || 5;
  const displayPosts = posts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(posts.length / pageSize);
  
  const urlUtils = components?.config ? createUrlUtils(components.config) : null;
  const basePath = urlUtils?.getBlogUrl() || "/blog";

  return (
    <PostList
      posts={displayPosts}
      currentPage={page}
      totalPages={totalPages}
      disablePagination={disablePagination}
      components={components}
      heading={heading}
      description={description}
      basePath={basePath}
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
  posts: BlogPost[];
  getCategoryBySlug: (slug: string) => any;
}) {
  const pageSize = components?.config?.pageSize || 5;
  const categoryInfo = getCategoryBySlug(category);
  const filteredPosts = posts.filter(
    (post) => post.slugs && post.slugs[0] === category
  );
  const displayPosts = filteredPosts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  
  const urlUtils = components?.config ? createUrlUtils(components.config) : null;
  const basePath = urlUtils?.getCategoryUrl(category) || `/blog/${category}`;

  return (
    <PostList
      posts={displayPosts}
      currentPage={page}
      totalPages={totalPages}
      heading={categoryInfo.label}
      description={categoryInfo.description}
      basePath={basePath}
      disablePagination={disablePagination}
      components={components}
    />
  );
}
