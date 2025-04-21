"use client";

import React, { createContext, useContext, ReactNode, isValidElement } from "react";
import { PostCard as DefaultPostCard } from "./post-card";
import { BlogPost } from "@/lib/source";
import { Slot } from '@radix-ui/react-slot';
import { CustomPostCard } from "./custom-post-card";

export interface PostCardProps {
  post: NonNullable<BlogPost>;
}

export interface PostCardSlot {
  enabled?: boolean;
  component?: ReactNode;
}

type BlogContextType = {
  pageSize: number;
  recentPostsPageSize: number;
  postCardSlot?: PostCardSlot;
};

export const BlogContext = createContext<BlogContextType>({
  pageSize: 5,
  recentPostsPageSize: 3,
  postCardSlot: undefined
});

// Utility function for slots, similar to HomeLayout
export function slot(
  obj: {
    enabled?: boolean;
    component?: ReactNode;
  } | undefined,
  def: ReactNode
): ReactNode {
  if (obj?.enabled === false) return null;
  if (obj?.component !== undefined) return <Slot>{obj.component}</Slot>;
  return def;
}

export default function BlogProvider({
  children,
  pageSize = 5,
  recentPostsPageSize = 3,
  postCardComponent,
}: {
  children: React.ReactNode;
  pageSize?: number;
  recentPostsPageSize?: number;
  postCardComponent?: PostCardSlot;
}) {
  return (
    <BlogContext.Provider 
      value={{ 
        pageSize, 
        recentPostsPageSize, 
        postCardSlot: postCardComponent 
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(BlogContext);
}

// PostCard component that uses the slot pattern
export function PostCard({ post }: PostCardProps) {
  const { postCardSlot } = useBlog();
  
  if (postCardSlot?.component) {
    // For simplicity, we'll just render the CustomPostCard directly
    // This avoids the cloneElement issues with type checking
    return <CustomPostCard post={post} />;
  }
  
  return <DefaultPostCard post={post} />;
}
