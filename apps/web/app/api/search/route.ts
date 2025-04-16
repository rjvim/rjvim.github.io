import { blogSource } from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";

export const revalidate = false;

export const { staticGET: GET } = createSearchAPI("advanced", {
  indexes: [
    ...blogSource
      .getPages()
      .filter((page) => !page.data.draft) // Filter out draft posts
      .map((page) => {
        return {
          title: page.data.title,
          description: page.data.description,
          url: page.url,
          id: page.url,
          structuredData: page.data.structuredData,
          tag: "blog",
        };
      }),
  ],
});
