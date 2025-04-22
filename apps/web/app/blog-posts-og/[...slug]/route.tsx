import { generateOGImage } from "fumadocs-ui/og";
import type { ImageResponse } from "next/og";
import { createMetadataImage } from "fumadocs-core/server";
import { blogSource } from "@/lib/source";
import type { Metadata } from "next";

const blogsMetaImage = createMetadataImage({
  imageRoute: "/blog-posts-og",
  source: blogSource,
}) as MetadataImageResult;

export const GET = blogsMetaImage.createAPI((page: any): ImageResponse => {
  return generateOGImage({
    title: page.data.title,
    // description: page.data.description,
    site: "rjv.im",
  });
});

interface MetadataImageResult {
  getImageMeta: (slugs: string[]) => { alt: string; url: string };
  withImage: (slugs: string[], metadata?: Metadata) => Metadata;
  generateParams: () => { slug: string[] }[];
  createAPI: (handler: any) => any;
}

export function generateStaticParams() {
  const params = blogsMetaImage.generateParams();
  return params;
}
