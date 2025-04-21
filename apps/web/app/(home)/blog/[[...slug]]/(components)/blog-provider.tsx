"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { PostCard as DefaultPostCard } from "./post-card";
import { BlogPost } from "@/lib/source";
import { Slot } from '@radix-ui/react-slot';

export interface PostCardProps {
  post: NonNullable<BlogPost>;
}

export interface BlogProviderProps {
  children: React.ReactNode;
  pageSize?: number;
  recentPostsPageSize?: number;
  customPostCardPath?: string;
}

type BlogContextType = {
  pageSize: number;
  recentPostsPageSize: number;
  customPostCardPath?: string;
};

export const BlogContext = createContext<BlogContextType>({
  pageSize: 5,
  recentPostsPageSize: 3,
  customPostCardPath: undefined
});



export default function BlogProvider({
  children,
  pageSize = 5,
  recentPostsPageSize = 3,
  customPostCardPath,
}: BlogProviderProps) {
  return (
    <BlogContext.Provider 
      value={{ 
        pageSize, 
        recentPostsPageSize, 
        customPostCardPath 
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
  const { customPostCardPath } = useBlog();
  
  // Use a simple conditional to determine which component to render
  if (customPostCardPath) {
    // Dynamically import the component based on the provided path
    // This avoids passing components across the client/server boundary
    try {
      // Use dynamic require to load the component
      const CustomComponent = require(customPostCardPath).default || 
                             require(customPostCardPath).CustomPostCard;
      return <CustomComponent post={post} />;
    } catch (error) {
      console.error(`Failed to load custom post card from ${customPostCardPath}:`, error);
      // Fallback to default if loading fails
      return <DefaultPostCard post={post} />;
    }
  }
  
  return <DefaultPostCard post={post} />;
}
