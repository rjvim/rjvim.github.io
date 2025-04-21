"use client";

import { createContext, useContext } from "react";

type BlogContextType = {
  pageSize: number;
};

export const BlogContext = createContext<BlogContextType>({ pageSize: 5 });

export default function BlogProvider({
  children,
  pageSize = 5,
}: {
  children: React.ReactNode;
  pageSize?: number;
}) {
  return <BlogContext.Provider value={{ pageSize }}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  return useContext(BlogContext);
}
