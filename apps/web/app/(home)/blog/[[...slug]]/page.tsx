import { blogSource, getBlogPosts } from "@/lib/source";
import { BlogWrapper } from "@/app/(home)/blog/[[...slug]]/(components)/blog-wrapper";
import { generateBlogMetadata } from "@/app/(home)/blog/[[...slug]]/(components)/blog-metadata";
import { createBlogMetadata, blogConstants } from "@/blog-components";
import { getCategoryBySlug } from "@/lib/categories";
import { getSeriesBySlug } from "@/lib/series";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const posts = getBlogPosts();

  return (
    <BlogWrapper
      params={params}
      blogSource={blogSource}
      posts={posts}
      getCategoryBySlug={getCategoryBySlug}
      getMDXComponents={getMDXComponents}
    />
  );
}

export { generateBlogStaticParams as generateStaticParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";

// Create a custom generateMetadata function that passes the required dependencies
export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  // Await params here so we don't need to await in blog-metadata.ts
  const params = await props.params;

  return generateBlogMetadata({
    params,
    createBlogMetadata,
    blogConstants,
    blogSource,
    getCategoryBySlug,
    getSeriesBySlug,
  });
}
