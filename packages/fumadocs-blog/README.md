# fumadocs-blog

A blog extension for [Fumadocs](https://fumadocs.vercel.app/), providing components and utilities for creating a blog with MDX content in Next.js applications.

## Using fumadocs-blog in a Next.js App

### Prerequisites

Ensure you have the following dependencies installed:

```bash
npm install fumadocs-core fumadocs-mdx fumadocs-ui
```

### Setup

#### 1. Create a Catch-All Route

Create a catch-all route in your Next.js app directory structure:

```
app/
└── blog/
    └── [[...slug]]/
        ├── page.tsx         # Handles all blog routes
        └── (components)/    # Optional components folder
```

#### 2. Configure Blog Components in the Catch-All Route

```tsx
// app/blog/[[...slug]]/page.tsx
import { notFound } from 'next/navigation';
import { BlogPost } from '@repo/fumadocs-blog/components';
import { isBlogRootPage } from '@repo/fumadocs-blog';
import { BlogProvider } from '@repo/fumadocs-blog';

// Import your data fetching functions
import { getBlogPost, getSortedByDatePosts } from '@/lib/source';
import { getCategoryBySlug } from '@/lib/categories';
import { getSeriesInfo } from '@/lib/series';
import { getMDXComponents } from '@/mdx-components';

export default function BlogPage({ params }: { params: { slug?: string[] } }) {
  // Set up dependencies for this route
  const dependencies = {
    getMDXComponents,
    getCategoryBySlug,
    getSeriesInfo
  };
  
  // Handle blog index page
  if (isBlogRootPage(params)) {
    const posts = getSortedByDatePosts();
    return (
      <BlogProvider {...dependencies}>
        {/* Your blog index component */}
      </BlogProvider>
    );
  }
  
  // Handle category pages
  if (params.slug?.[0] === 'category' && params.slug?.[1]) {
    // Category page logic
    return (
      <BlogProvider {...dependencies}>
        {/* Your category page component */}
      </BlogProvider>
    );
  }
  
  // Handle series pages
  if (params.slug?.[0] === 'series' && params.slug?.[1]) {
    // Series page logic
    return (
      <BlogProvider {...dependencies}>
        {/* Your series page component */}
      </BlogProvider>
    );
  }
  
  // Handle individual blog posts
  const post = getBlogPost(params.slug);
  
  if (!post || post.data.draft) {
    return notFound();
  }
  
  return (
    <BlogProvider {...dependencies}>
      <BlogPost 
        page={post}
        category={post.data.category}
        lastUpdate={post.data.date}
        tags={post.data.tags || []}
      />
    </BlogProvider>
  );
}
```

#### 3. Set Up Data Fetching with fumadocs

```tsx
// lib/source.ts
import { blog } from '@/.source'; // Your content source
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

// Create the blog source using fumadocs
export const blogSource = loader({
  baseUrl: '/blog',
  source: createMDXSource(blog),
});

// Export helper functions
export const {
  getPage: getBlogPost,
  getPages: getBlogPosts,
  pageTree: pageBlogTree,
} = blogSource;

// Add custom sorting function
export const getSortedByDatePosts = () =>
  [...getBlogPosts().filter(post => !post.data.draft)]
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
```

#### 4. Why Use BlogProvider in the Catch-All Route

Placing the `BlogProvider` in the catch-all route rather than the root layout offers several advantages:

1. **Scoped Context**: Blog-specific context is only available where needed
2. **Route-Specific Configuration**: Different routes can have different configurations
3. **Lazy Loading**: Blog dependencies are only loaded when the blog is accessed
4. **Isolated Functionality**: Blog functionality remains isolated from the rest of the app

#### 5. Overriding Components

You can override any component by passing custom implementations:

```tsx
<BlogProvider
  getMDXComponents={() => ({
    // Your custom MDX components
  })}
  getCategoryBySlug={(slug) => ({
    // Your custom category implementation
  })}
  getSeriesInfo={(seriesName) => {
    // Your custom series implementation
  }}
>
  <BlogPost 
    // You can also override specific components
    SeriesComponent={CustomSeriesComponent}
    CategoryComponent={CustomCategoryComponent}
    // ...
  />
</BlogProvider>
```

#### 6. Integration with Existing fumadocs Setup

If you're already using fumadocs for documentation, you can share components and configurations:

```tsx
// Share MDX components between docs and blog
import { getMDXComponents } from '@/mdx-components';

// Share theme configuration
import { DocsThemeConfig } from 'fumadocs-ui/provider';

const themeConfig: DocsThemeConfig = {
  // Your theme configuration
};

// In your blog route
<BlogProvider 
  getMDXComponents={getMDXComponents}
  themeConfig={themeConfig}
>
  {/* ... */}
</BlogProvider>
```
