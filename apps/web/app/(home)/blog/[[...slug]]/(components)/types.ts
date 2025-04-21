import { PostCard2 } from "./post-card-2";

export interface BlogComponents {
  PostCard: typeof PostCard2;
}

export function getBlogComponents(): BlogComponents {
  return {
    PostCard: PostCard2,
  };
}
