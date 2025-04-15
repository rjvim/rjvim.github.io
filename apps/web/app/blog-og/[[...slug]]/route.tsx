import { generateOGImage } from "@/components/og-image";
import { generateAllParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";
import { getCategoryBySlug } from "@/lib/categories";
import { blogSource } from "@/lib/source";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const resolvedParams = await params;
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
  const params = await generateAllParams(true);
  return params;
}
