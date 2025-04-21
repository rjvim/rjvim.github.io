"use client";

import { createContext, useContext } from "react";
import { PostCard as DefaultPostCard } from "./post-card";
import { BlogPost } from "@/lib/source";
import { CustomPostCard } from "./custom-post-card";

interface PostCardProps {
  post: NonNullable<BlogPost>;
}

type BlogContextType = {
  pageSize: number;
  recentPostsPageSize: number;
  useCustomPostCard: boolean;
};

export const BlogContext = createContext<BlogContextType>({
  pageSize: 5,
  recentPostsPageSize: 3,
  useCustomPostCard: false
});

export default function BlogProvider({
  children,
  pageSize = 5,
  recentPostsPageSize = 3,
  useCustomPostCard = false,
}: {
  children: React.ReactNode;
  pageSize?: number;
  recentPostsPageSize?: number;
  useCustomPostCard?: boolean;
}) {
  return (
    <BlogContext.Provider 
      value={{ 
        pageSize, 
        recentPostsPageSize, 
        useCustomPostCard 
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(BlogContext);
}

// PostCard component that uses the context
export function PostCard({ post }: PostCardProps) {
  const { useCustomPostCard } = useBlog();
  
  if (useCustomPostCard) {
    // If custom post card is enabled, use it
    return <CustomPostCard post={post} />;
  }
  
  // Otherwise use the default PostCard
  return <DefaultPostCard post={post} />;
}
