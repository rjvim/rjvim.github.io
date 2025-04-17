import { blog } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import type { InferMetaType, InferPageType } from "fumadocs-core/source";
import type { PageTree } from "fumadocs-core/server";

export const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(blog),
});

export const {
  getPage: getBlogPost,
  getPages: getBlogPosts,
  pageTree: pageBlogTree,
} = blogSource;

export type BlogPost = ReturnType<typeof getBlogPost>;

const posts = getBlogPosts().filter((post) => !post.data.draft);

const getDate = (url: string) => {
  const slugs = url.replace(/^\/blog\//, "").split("/");
  const post = getBlogPost(slugs);
  if (post === undefined) return 0;
  return post.data.date.getTime();
};

export const sortedByDatePageTree: PageTree.Root = {
  name: "Blogs",
  children: pageBlogTree.children
    .filter((node) => node.type === "page")
    .filter((node) => {
      const slugs = node.url.replace(/^\/blog\//, "").split("/");
      const post = getBlogPost(slugs);
      return post && !post.data.draft;
    })
    .sort((a, b) => getDate(a.url) - getDate(b.url)),
};

export const getSortedByDatePosts = () =>
  [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
