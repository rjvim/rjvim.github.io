// This file serves as a simple registry for overridable components
// Import the default components
import { PostCard as DefaultPostCard } from "./post-card";
import { CustomPostCard } from "./custom-post-card";

// Registry configuration
type ComponentRegistry = {
  PostCard: typeof DefaultPostCard;
};

// Default registry
const defaultRegistry: ComponentRegistry = {
  PostCard: DefaultPostCard,
};

// Custom registry - this is what you would modify to override components
const customRegistry: ComponentRegistry = {
  // Override the default PostCard with the custom implementation
  PostCard: CustomPostCard,
  // No need to spread defaultRegistry here as we're explicitly setting all components
};

// Export the components from the registry
export const PostCard = customRegistry.PostCard;
