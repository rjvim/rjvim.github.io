"use client";

import { createContext, useContext } from "react";

type BlogContextType = {
  pageSize: number;
  recentPostsPageSize: number;
};

export const BlogContext = createContext<BlogContextType>({
  pageSize: 5,
  recentPostsPageSize: 3
});

export default function BlogProvider({
  children,
  pageSize = 5,
  recentPostsPageSize = 3,
}: {
  children: React.ReactNode;
  pageSize?: number;
  recentPostsPageSize?: number;
}) {
  return <BlogContext.Provider value={{ pageSize, recentPostsPageSize }}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  return useContext(BlogContext);
}
