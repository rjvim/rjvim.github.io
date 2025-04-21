"use client";

import { CustomPostCard } from "./custom-post-card";
import { BlogPost } from "@/lib/source";
import { forwardRef } from "react";

interface CustomPostCardWrapperProps {
  post: NonNullable<BlogPost>;
}

// This is a client component wrapper that can be safely rendered in a server component
// Using forwardRef to make it compatible with Radix UI Slot
export const CustomPostCardWrapper = forwardRef<HTMLDivElement, CustomPostCardWrapperProps>(
  function CustomPostCardWrapper({ post, ...props }, ref) {
    return <CustomPostCard post={post} {...props} />;
  }
);
