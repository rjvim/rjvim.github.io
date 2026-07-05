import { blogSource } from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";

export const revalidate = false;

export const { staticGET: GET } = createSearchAPI("simple", {
  indexes: [
    ...blogSource
      .getPages()
      .filter((page) => !page.data.draft) // Filter out draft posts
      .map((page) => {
        const headings = page.data.structuredData.headings.map(
          (heading) => heading.content
        );
        const contents = page.data.structuredData.contents.map(
          (content) => content.content
        );

        return {
          title: page.data.title,
          description: page.data.description,
          breadcrumbs: [],
          content: [page.data.description, ...headings, ...contents]
            .filter(Boolean)
            .join("\n"),
          url: page.url,
          keywords: page.data.tags?.join(", "),
        };
      }),
  ],
});
