import React from "react";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { getMDXComponents } from "@/mdx-components";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@repo/shadcn/lib/utils";
import { GridBackground } from "@repo/ui/components/grid-background";
import { getCategoryBySlug } from "@/lib/categories";

interface BlogPostProps {
  page: any;
  category?: string;
  lastUpdate?: Date;
  tags: string[];
}

export function BlogPost({ page, category, lastUpdate, tags }: BlogPostProps) {
  const MDX = page.data.body;

  return (
    <>
      <div className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left">
        <GridBackground maxWidthClass="container" />
        {category && (
          <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 capitalize">
                {getCategoryBySlug(category).icon &&
                  React.createElement(getCategoryBySlug(category).icon, {
                    className: "h-4 w-4",
                  })}
                <Link href={`/blog/${category}`}>
                  {getCategoryBySlug(category).label}
                </Link>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {lastUpdate?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        )}
        <DocsTitle className="text-left dark:text-white">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="text-left mt-3 dark:text-gray-300">
          {page.data.description}
        </DocsDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.length > 0 &&
            tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      <DocsLayout
        nav={{ enabled: false }}
        tree={{
          name: "Tree",
          children: [],
        }}
        sidebar={{ enabled: false, prefetch: false, tabs: false }}
        containerProps={{
          className: cn(
            "flex-row-reverse",
            "relative container [--fd-nav-height:calc(var(--spacing)*14)] md:[--fd-nav-height:57px]"
          ),
        }}
      >
        <GridBackground maxWidthClass="container" />

        <div className="grid grid-cols-4">
          <DocsPage
            toc={page.data.toc}
            full={page.data.full}
            lastUpdate={lastUpdate}
            footer={{
              enabled: false,
            }}
            tableOfContent={{
              style: "clerk",
              single: false,
            }}
            article={{
              className: cn(
                "!m-[unset] max-w-none bg-zinc-50/50 dark:bg-zinc-900/50 py-8 md:py-12"
              ),
            }}
          >
            <DocsBody>
              <MDX components={getMDXComponents()} />
            </DocsBody>
          </DocsPage>
        </div>
      </DocsLayout>
    </>
  );
}
