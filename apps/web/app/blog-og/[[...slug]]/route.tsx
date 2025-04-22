// import { generateOGImage } from "@/components/og-image";
import { generateOGImage } from "fumadocs-ui/og";
import {
  generateAllParams,
  generateOGImageMetadata,
} from "@repo/fumadocs-blog/blog";
import {
  blogConstants,
  getCategoryBySlug,
  getSeriesBySlug,
} from "@/blog-components";
import { blogSource, getBlogPosts } from "@/lib/source";

export const contentType = "image/png";
export const dynamic = "force-static";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const resolvedParams = await params;

  console.log("resolvedParams", resolvedParams);

  const metadata = generateOGImageMetadata(resolvedParams, {
    blogConstants,
    getCategoryBySlug,
    getSeriesBySlug,
    blogSource,
  });

  return generateOGImage({
    title: metadata.title,
    description: metadata.description,
    site: "rjv.im",
  });
}

export async function generateStaticParams() {
  const posts = getBlogPosts();

  const params = await generateAllParams(blogSource, posts, false);

  // Create image routes by adding image.png to each existing slug array
  const imageRoutes = params.map((param) => {
    if (param.slug && param.slug.length > 0) {
      return { slug: [...param.slug, "image.png"] };
    }
    return { slug: ["image.png"] };
  });

  // console.log("imageRoutes", imageRoutes);

  return imageRoutes;
}
