import { blogSource } from "@/lib/source";
import { BlogWrapper } from "@/app/(home)/blog/[[...slug]]/(components)/blog-wrapper";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Use the BlogWrapper component to handle all blog routes
  return <BlogWrapper params={params} blogSource={blogSource} />;
}

export { generateBlogStaticParams as generateStaticParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";
export { generateBlogMetadata as generateMetadata } from "@/app/(home)/blog/[[...slug]]/(components)/blog-metadata";
