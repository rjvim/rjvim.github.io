import { blogSource } from "@/lib/source";
import React from "react";
import { notFound } from "next/navigation";
import {
  BlogList,
  CategoryBlogList,
} from "@/app/(home)/blog/[[...slug]]/(components)/blog-list";
import { BlogPost } from "@/app/(home)/blog/[[...slug]]/(components)/blog-post";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  // There is no slug, it's /blog page
  if (!params.slug || params.slug.length === 0) {
    return <BlogList page={1} />;
  }

  // There is a category in url
  if (!params.slug || params.slug.length === 1) {
    return <CategoryBlogList category={params.slug[0]} />;
  }

  // There is no category in url, it's /blog page with page number
  if (
    params.slug.length === 2 &&
    params.slug[0] === "page" &&
    !isNaN(Number(params.slug[1]))
  ) {
    return <BlogList page={Number(params.slug[1])} />;
  }

  // There is a category in url, it's /blog/category page with page number
  if (
    params.slug.length === 3 &&
    params.slug[1] === "page" &&
    !isNaN(Number(params.slug[2]))
  ) {
    return (
      <CategoryBlogList
        category={params.slug[0]}
        page={Number(params.slug[2])}
      />
    );
  }

  if (params.slug.length === 2) {
    const page = blogSource.getPage(params.slug);
    const category = params.slug?.[0] || undefined;

    if (!page) notFound();

    const lastModified = page?.data.lastModified;
    const lastUpdate = lastModified ? new Date(lastModified) : undefined;
    const tags = page?.data.tags ?? [];

    return (
      <BlogPost
        page={page}
        category={category}
        lastUpdate={lastUpdate}
        tags={tags}
      />
    );
  }
}

export { generateBlogStaticParams as generateStaticParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";

// export async function generateMetadata(props: {
//   params: Promise<{ slug?: string[] }>;
// }) {
//   const params = await props.params;
//   const page = blogSource.getPage(params.slug);
//   if (!page) notFound();

//   return createMetadata(
//     blogsMetaImage.withImage(page.slugs, {
//       title: page.data.title,
//       description: page.data.description,
//       openGraph: {
//         url: page.url,
//       },
//       alternates: {
//         canonical: page.url,
//       },
//     })
//   );
// }
