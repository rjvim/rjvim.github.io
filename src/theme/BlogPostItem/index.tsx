import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import type {Props} from '@theme/BlogPostItem';

// apply a bottom margin in list view
function useContainerClassName() {
  const {isBlogPostPage} = useBlogPost();
  return !isBlogPostPage ? 'mb-3' : undefined;
}

export default function BlogPostItem({
  children,
  className,
}: Props): JSX.Element {
  const {isBlogPostPage} = useBlogPost();
  const containerClassName = useContainerClassName();
  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemHeader />
      {isBlogPostPage && 
        <>
          <BlogPostItemContent>{children}</BlogPostItemContent>
          <BlogPostItemFooter />
        </>
      }
    </BlogPostItemContainer>
  );
}
