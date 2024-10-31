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
      <header className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md blog-list-item'>
        <BlogPostItemHeaderInfo />
        <BlogPostItemHeaderTitle />
        <BlogPostItemHeaderAuthors />
      </header>
    );
  }
}
