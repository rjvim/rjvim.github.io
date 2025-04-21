"use client";

import { createContext, useContext } from "react";
import { PostCard as DefaultPostCard } from "./post-card";
import { BlogPost } from "@/lib/source";

interface PostCardProps {
  post: NonNullable<BlogPost>;
}

type PostCardComponent = React.ComponentType<PostCardProps>;

type BlogContextType = {
  pageSize: number;
  recentPostsPageSize: number;
  PostCard: PostCardComponent;
};

export const BlogContext = createContext<BlogContextType>({
  pageSize: 5,
  recentPostsPageSize: 3,
  PostCard: DefaultPostCard
});

export default function BlogProvider({
  children,
  pageSize = 5,
  recentPostsPageSize = 3,
  PostCard = DefaultPostCard,
}: {
  children: React.ReactNode;
  pageSize?: number;
  recentPostsPageSize?: number;
  PostCard?: PostCardComponent;
}) {
  return <BlogContext.Provider value={{ pageSize, recentPostsPageSize, PostCard }}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  return useContext(BlogContext);
}
