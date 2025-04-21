import Link from "next/link";
import { BlogPost } from "@/lib/source";
import { Card } from "@repo/shadverse/components/card";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";

interface PostCardProps {
  post: NonNullable<BlogPost>;
}

export function PostCard2({ post }: PostCardProps) {
  return (
    <Card
      key={post.url}
      className="order-last border bg-card hover:bg-accent/10 transition-colors duration-200 shadow-sm sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
    >
      <div className="grid gap-y-6 sm:grid-cols-12 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-8 p-6">
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
              {post.data.tags?.map((tag: string) => (
                <span key={tag} className="flex items-center">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl text-left">
            <Link
              href={post.url}
              className="hover:text-primary cursor-pointer transition-colors duration-200"
            >
              {post.data.title}
            </Link>
          </h3>
          <p className="mt-4 text-muted-foreground md:mt-5 text-left line-clamp-3">
            {post.data.description}
          </p>
          <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
            <span className="text-muted-foreground capitalize flex items-center">
              <User className="mr-1 h-4 w-4" />
              {post.data.author || "Anonymous"}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(post.data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="mt-6 flex items-center space-x-2 md:mt-8">
            <Link
              href={post.url}
              className="inline-flex items-center font-semibold text-primary hover:text-primary/80 md:text-base transition-colors duration-200"
            >
              <span>Read article</span>
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div className="order-first sm:order-last sm:col-span-4 p-0 sm:p-6 pr-0">
          <Link href={post.url} className="block">
            <div className="aspect-[4/3] overflow-clip rounded-lg border border-border">
              <img
                src={`https://picsum.photos/400/300?grayscale&title=${post.data.title}`}
                alt={post.data.title}
                className="h-full w-full object-cover transition-all duration-300 hover:scale-105 hover:opacity-80"
              />
            </div>
          </Link>
        </div>
      </div>
    </Card>
  );
}
