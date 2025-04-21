# Blog Component Registry

This directory contains a simple registry pattern that allows overriding default components with custom implementations.

## How to Use

### 1. Create your custom component

Create a custom component that matches the interface of the component you want to override. For example, to override the `PostCard` component:

```tsx
// custom-post-card.tsx
import Link from "next/link";
import { Card } from "@repo/shadverse/components/card";
// ... other imports

interface CustomPostCardProps {
  post: any; // Use the same props interface as the original component
}

export function CustomPostCard({ post }: CustomPostCardProps) {
  // Your custom implementation
}
```

### 2. Configure the registry in component-registry.tsx

Edit the `component-registry.tsx` file to use your custom component:

```tsx
// component-registry.tsx
import { PostCard as DefaultPostCard } from './post-card';
import { CustomPostCard } from './custom-post-card';

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
  // Uncomment the line below to use the custom post card
  PostCard: CustomPostCard,
  ...defaultRegistry,
};

// Export the components from the registry
export const PostCard = customRegistry.PostCard;
```

### 3. That's it!

The application will now use your custom component wherever the original component was used.

## Available Components

The following components can be overridden:

- `PostCard`: The card component used to display blog posts in lists

## Adding More Overridable Components

To make more components overridable:

1. Add the component to the ComponentRegistry type in component-registry.tsx
2. Add the component to the default registry
3. Export the component from the registry
