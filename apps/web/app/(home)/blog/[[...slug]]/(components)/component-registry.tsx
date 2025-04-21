// This file serves as a simple registry for overridable components
// Import the default components
import { PostCard as DefaultPostCard } from "./post-card";

// Import any custom components you want to use
// import { CustomPostCard } from './custom-post-card';

// Export the components you want to use
// To override a component, just change the export to your custom component
export const PostCard = DefaultPostCard;

// Example of how to override:
// export const PostCard = CustomPostCard;
