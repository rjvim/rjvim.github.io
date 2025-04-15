import { generateOGImage } from "@/components/og-image";
import { generateAllParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";
import { getCategoryBySlug } from "@/lib/categories";

export const contentType = "image/png";
export const dynamic = "force-static";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const resolvedParams = await params;

  console.log("resolvedParams", resolvedParams);

  if (!resolvedParams.slug || resolvedParams.slug.length === 0) {
    return generateOGImage("Rajiv's Blog");
  }

  // Handle category OG images
  if (resolvedParams.slug.length === 1) {
    const category = resolvedParams.slug[0];
    const categoryInfo = getCategoryBySlug(category);

    if (categoryInfo) {
      return generateOGImage(`${categoryInfo.label} - Blog`);
    }
  }

  // Default fallback
  return generateOGImage("Rajiv's Blog");
}

export async function generateStaticParams() {
  const params = await generateAllParams(false);

  // Create image routes by adding image.png to each existing slug array
  const imageRoutes = params.map((param) => {
    if (param.slug && param.slug.length > 0) {
      return { slug: [...param.slug, "image.png"] };
    }
    return { slug: ["image.png"] };
  });

  console.log("imageRoutes", imageRoutes);

  return imageRoutes;
}
