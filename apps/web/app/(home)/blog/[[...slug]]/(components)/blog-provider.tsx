"use client";

import { createContext } from "react";

export const BlogContext = createContext({});

export default function BlogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogContext.Provider value="dark">{children}</BlogContext.Provider>;
}
