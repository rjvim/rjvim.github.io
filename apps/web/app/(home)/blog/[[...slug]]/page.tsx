import { blogSource, getBlogPosts } from "@/lib/source";
import { BlogWrapper } from "@/app/(home)/blog/[[...slug]]/(components)/blog-wrapper";
import { generateBlogMetadata } from "@/app/(home)/blog/[[...slug]]/(components)/blog-metadata";
import {
  createBlogMetadata,
  blogConstants,
  getBlogComponents,
} from "@/blog-components";
import { getCategoryBySlug } from "@/blog-components";
import { getSeriesBySlug } from "@/blog-components";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { generateBlogStaticParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";

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
      getSeriesBySlug={getSeriesBySlug}
      mdxComponents={getMDXComponents()}
      components={getBlogComponents()}
    />
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return generateBlogStaticParams(blogSource, posts);
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
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
