"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { PostCard as DefaultPostCard } from "./post-card";
import { CustomPostCard } from "./custom-post-card";
import { BlogPost } from "@/lib/source";
import { Slot } from "@radix-ui/react-slot";

export interface PostCardProps {
  post: NonNullable<BlogPost>;
}

export interface BlogProviderProps {
  children: React.ReactNode;
  pageSize?: number;
  recentPostsPageSize?: number;
  useCustomPostCard?: boolean;
}

type BlogContextType = {
  pageSize: number;
  recentPostsPageSize: number;
  useCustomPostCard: boolean;
};

export const BlogContext = createContext<BlogContextType>({
  pageSize: 5,
  recentPostsPageSize: 3,
  useCustomPostCard: false,
});

export default function BlogProvider({
  children,
  pageSize = 5,
  recentPostsPageSize = 3,
  useCustomPostCard = false,
}: BlogProviderProps) {
  return (
    <BlogContext.Provider
      value={{
        pageSize,
        recentPostsPageSize,
        useCustomPostCard,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(BlogContext);
}

// This is a wrapper component that will be used in post-list.tsx
export function PostCard({ post }: PostCardProps) {
  const { useCustomPostCard } = useBlog();

  // Use a simple conditional to determine which component to render
  if (useCustomPostCard) {
    // Directly use the imported component
    // This avoids dynamic imports which can be problematic in client components
    return <CustomPostCard post={post} />;
  }

  return <DefaultPostCard post={post} />;
}
