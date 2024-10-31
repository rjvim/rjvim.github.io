import React from 'react';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import TagsListInline from '@theme/TagsListInline';
import clsx from 'clsx';

export default function BlogPostItemHeader(): JSX.Element {

  const {metadata, isBlogPostPage} = useBlogPost();

  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;

  const tagsExists = tags.length > 0;

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

    const tagItems = tags.map((tag,index) =>
        <span key={index} className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10">
            {tag.label}
        </span>
    );

    return (
      <header className='
        bg-gradient-to-br 
        from-gray-50 to-gray-100 hover:to-gray-200 
        dark:from-gray-800 dark:to-gray-800 dark:hover:to-gray-700 
        px-4 py-2 rounded-md blog-list-item
      '>
        <div className='w-full flex flex-row items-center justify-between'>
          <BlogPostItemHeaderInfo />
          <div>
          {tagsExists && (
            <div className='space-x-0.5'>
              {tagItems}
            </div>
          )}
          </div>
        </div>
        <BlogPostItemHeaderTitle />
        <BlogPostItemHeaderAuthors />
      </header>
    );
  }
}
