import { PostCard } from "./app/(home)/blog/[[...slug]]/(components)/post-card";
import { PostCard2 } from "./app/(home)/blog/[[...slug]]/(components)/post-card-2";

export function getBlogComponents() {
  return {
    PostCard: PostCard2,
  };
}

export const useBlogComponents = getBlogComponents;
