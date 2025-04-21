import { BlogPost } from "@/lib/source";
import { GridBackground } from "@repo/ui/components/grid-background";
import { Pagination } from "./pagination";
import { DocsTitle, DocsDescription } from "fumadocs-ui/page";
import { PostCard } from "@/app/(home)/blog/[[...slug]]/(components)/post-card";
import { BlogComponents } from "@/blog-components";

export type PostListProps = {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  heading?: string;
  description?: string;
  basePath?: string;
  disablePagination?: boolean;
  components?: BlogComponents;
};

export function PostList({
  posts,
  currentPage,
  totalPages,
  heading = "Blog Posts",
  description = "Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.",
  basePath = "/blog",
  disablePagination = false,
  components,
}: PostListProps) {
  // PostCard is now imported directly

  return (
    <>
      <section className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left bg-zinc-50/50 dark:bg-zinc-900/50">
        <GridBackground maxWidthClass="container" />

        <div className="text-center">
          <DocsTitle className="dark:text-white capitalize">
            {heading}
          </DocsTitle>
          <DocsDescription className="mt-3 dark:text-gray-300 mb-0">
            {description}
          </DocsDescription>
        </div>
      </section>

      <section className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left">
        <GridBackground maxWidthClass="container" />
        <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {posts
            .filter(
              (post): post is NonNullable<typeof post> => post !== undefined
            )
            .map((post) => {
              // Pass the actual post data to the PostCard component
              // return <PostCard key={post.url} post={post} />;
              return components ? (
                <components.PostCard key={post.url} post={post} />
              ) : (
                <PostCard key={post.url} post={post} />
              );
            })}
        </div>

        {!disablePagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={basePath}
          />
        )}
      </section>
    </>
  );
}
