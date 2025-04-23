import Hero from "@/components/hero";
import { GridBackground } from "@repo/ui/components/grid-background";
import { getBlogPosts } from "@/lib/source";
import { RecentPosts } from "@repo/fumadocs-blog/blog";
import { getBlogConfiguration } from "@/blog-configuration";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <div className="relative flex w-full flex-col items-center overflow-x-hidden">
        <GridBackground maxWidthClass="container" />

        <div className="relative flex items-center justify-center w-full mx-auto container">
          <div className="space-y-8">
            <Hero />
          </div>
        </div>

        <RecentPosts
          configuration={getBlogConfiguration()}
          posts={getBlogPosts()}
          heading="Recent Posts"
          description="The recently published"
        />
      </div>
    </div>
  );
}
