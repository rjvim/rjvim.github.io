import Hero from "@/components/hero";
import Link from "next/link";
import { RecentPosts } from "./blog/[[...slug]]/(components)/blog-list";
import { GridBackground } from "@repo/ui/components/grid-background";

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

        <RecentPosts />
      </div>
    </div>
  );
}
