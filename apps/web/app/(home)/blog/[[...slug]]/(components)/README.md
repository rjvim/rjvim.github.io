# Blog Component Registry

This directory contains a simple component registry pattern that allows overriding default components with custom implementations.

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

### 2. Update the component registry

Edit the `component-registry.tsx` file to use your custom component:

```tsx
// component-registry.tsx
import { PostCard as DefaultPostCard } from './post-card';
import { CustomPostCard } from './custom-post-card';

// Use the custom component instead of the default
export const PostCard = CustomPostCard;
```

### 3. That's it!

The application will now use your custom component wherever the original component was used.

## Available Components

The following components can be overridden:

- `PostCard`: The card component used to display blog posts in lists

## Adding More Overridable Components

To make more components overridable:

1. Add the component to the registry with its default implementation
2. Update imports in the files that use the component to import from the registry instead
