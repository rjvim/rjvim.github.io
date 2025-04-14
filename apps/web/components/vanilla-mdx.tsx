import type { ReactNode } from "react";
import type { TableOfContents } from "fumadocs-core/server";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";
import { cn } from "@repo/shadcn/lib/utils";
import { GridBackground } from "@repo/ui/components/grid-background";

interface MdxLayoutProps {
  children: ReactNode;
  title: string;
  toc?: TableOfContents;
}

export default function VanillaMdx({
  children,
  title,
  toc,
}: MdxLayoutProps): ReactNode {
  return (
    <>
      <DocsLayout
        nav={{ enabled: false }}
        tree={{
          name: "JustMDX",
          children: [],
        }}
        sidebar={{ enabled: false, prefetch: false, tabs: false }}
        containerProps={{
          className: cn("relative container md:[--fd-nav-height:57px]"),
        }}
      >
        <GridBackground maxWidthClass="container" />
        <DocsPage
          toc={toc}
          article={{
            className: "!m-[unset] max-w-none",
          }}
          tableOfContent={{
            style: "clerk",
            single: false,
          }}
        >
          {children}
        </DocsPage>
      </DocsLayout>
    </>
  );
}
