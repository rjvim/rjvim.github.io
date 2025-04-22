import { generateOGImage } from "@/components/og-image";
import { generateAllParams } from "@repo/fumadocs-blog/blog";
import { getCategoryBySlug, getSeriesBySlug } from "@/blog-components";
import { blogSource, getBlogPosts } from "@/lib/source";
import {
  isBlogRootPage,
  isSeriesPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  getSeriesSlug,
  getCategorySlug,
  getPageNumber,
} from "@repo/fumadocs-blog/blog";

export const contentType = "image/png";
export const dynamic = "force-static";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const resolvedParams = await params;

  console.log("resolvedParams", resolvedParams);

  // Process params by removing image.png from the end
  const processedParams = {
    slug: resolvedParams.slug?.filter((s) => s !== "image.png"),
  };

  // Blog root page
  if (isBlogRootPage(processedParams)) {
    return generateOGImage("Rajiv's Blog");
  }

  // Series page
  if (isSeriesPage(processedParams)) {
    const seriesSlug = getSeriesSlug(processedParams);
    if (seriesSlug) {
      const series = getSeriesBySlug(seriesSlug);
      if (series) {
        return generateOGImage(`${series.label} - Series`);
      }
    }
  }

  // Category page
  if (isCategoryPage(processedParams)) {
    const categorySlug = getCategorySlug(processedParams);
    if (categorySlug) {
      const categoryInfo = getCategoryBySlug(categorySlug);
      if (categoryInfo) {
        return generateOGImage(`${categoryInfo.label} - Blog`);
      }
    }
  }

  // Paginated blog page
  if (isPaginatedBlogPage(processedParams)) {
    const pageNumber = getPageNumber(processedParams);
    return generateOGImage(`Rajiv's Blog - Page ${pageNumber}`);
  }

  // Paginated category page
  if (isPaginatedCategoryPage(processedParams)) {
    const categorySlug = processedParams.slug?.[0] || "";
    const pageNumber = getPageNumber(processedParams);
    const categoryInfo = getCategoryBySlug(categorySlug);

    if (categoryInfo) {
      return generateOGImage(`${categoryInfo.label} - Page ${pageNumber}`);
    }
  }

  // Default fallback
  return generateOGImage("Rajiv's Blog");
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
