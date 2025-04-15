// import { generateOGImage } from "@/og-image";

import { generateOGImage } from "fumadocs-ui/og";

// Image metadata
export const alt = "rjv.im";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const dynamic = "force-static";
export const revalidate = false;

// Image generation
export default async function Image() {
  return generateOGImage({
    title: "rjv.im",
    description: "rjv.im",
    site: "rjv.im",
  });
}
