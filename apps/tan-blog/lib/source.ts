import {
  loader,
  type MetaData,
  type PageData,
  type Source,
} from "fumadocs-core/source";
import { virtualDocFiles } from "./docs";
import { virtualBlogFiles } from "./blog";

export const docsSource = loader({
  source: {
    files: virtualDocFiles,
  } as Source<{
    pageData: PageData & {
      content: string;
    };
    metaData: MetaData;
  }>,
  baseUrl: "/docs",
});

export const blogSource = loader({
  source: {
    files: virtualBlogFiles,
  } as Source<{
    pageData: PageData & {
      content: string;
    };
    metaData: MetaData;
  }>,
  baseUrl: "/blog",
});

export const { getPage: getBlogPost, getPages: getBlogPosts } = blogSource;
