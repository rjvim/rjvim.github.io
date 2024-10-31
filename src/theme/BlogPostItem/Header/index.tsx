import React from 'react';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemHeader(): JSX.Element {

  const {isBlogPostPage} = useBlogPost();

  if(isBlogPostPage) {
      return (
        <header>
          <BlogPostItemHeaderInfo />
          <BlogPostItemHeaderTitle />
          <BlogPostItemHeaderAuthors />
        </header>
      );
  }
  else {
    return (
      <header className='
        bg-gradient-to-br 
        from-gray-50 to-gray-100 hover:to-gray-200 
        dark:from-gray-800 dark:to-gray-700 dark:hover:to-gray-600 
        px-4 py-2 rounded-md blog-list-item
      '>
        <BlogPostItemHeaderInfo />
        <BlogPostItemHeaderTitle />
        <BlogPostItemHeaderAuthors />
      </header>
    );
  }
}
