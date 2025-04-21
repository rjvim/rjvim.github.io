import { PostCard2 } from "./post-card-2";

// Define a type for blog posts that matches the structure used in the app
export type BlogPost = {
  slugs?: string[];
  data: {
    date: Date;
    tags?: string[];
    [key: string]: any;
  };
  [key: string]: any;
};

export interface BlogComponents {
  PostCard: typeof PostCard2;
}

export function getBlogComponents(): BlogComponents {
  return {
    PostCard: PostCard2,
  };
}
