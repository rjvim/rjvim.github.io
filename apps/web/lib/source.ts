import { blog } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import type { InferMetaType, InferPageType } from "fumadocs-core/source";
import type { PageTree } from "fumadocs-core/server";

const blogMdxSource = createMDXSource(blog);

export const blogSource = loader({
  baseUrl: "/blog",
  source: {
    ...blogMdxSource,
    files:
      typeof blogMdxSource.files === "function"
        ? blogMdxSource.files()
        : blogMdxSource.files,
  },
});

export const {
  getPage: getBlogPost,
  getPages: getBlogPosts,
  pageTree: pageBlogTree,
} = blogSource;

export type BlogPost = ReturnType<typeof getBlogPost>;
