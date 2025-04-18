import type { ReactNode } from "react";
import type { TableOfContents } from "fumadocs-core/server";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";
import { cn } from "@repo/shadverse/lib/utils";
import { GridBackground } from "@repo/ui/components/grid-background";
import { Section } from "@repo/ui/components/section";

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
      <Section className="p-4 lg:p-6">
        <h1 className="text-center font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
          {title}
        </h1>
      </Section>

      <DocsLayout
        nav={{ enabled: false }}
        tree={{
          name: "JustMDX",
          children: [],
        }}
        sidebar={{ enabled: false, prefetch: false, tabs: false }}
        containerProps={{
          className: cn(
            "vanilla-page-layout relative container md:[--fd-nav-height:57px]"
          ),
        }}
      >
        <GridBackground maxWidthClass="container" />
        <DocsPage
          toc={toc}
          article={{
            className: "vanilla-page-article !m-[unset] max-w-none",
          }}
          tableOfContent={{
            style: "clerk",
            single: false,
          }}
        >
          <div className="prose min-w-0">{children}</div>
        </DocsPage>
      </DocsLayout>
    </>
  );
}
