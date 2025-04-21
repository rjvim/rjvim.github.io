import { Book } from "lucide-react";

export const getSeriesBySlug = (slug: string) => {
  const series = {
    x: {
      label: "Series X",
      icon: Book,
      description:
        "A comprehensive series on Zero Trust security architecture.",
    },
    "building-react-component-library": {
      label: "Building React Component Library",
      icon: Book,
      description: "A series on building a React component library.",
    },
    // Add more series here as needed
  };

  return (
    series[slug as keyof typeof series] || {
      label: slug.charAt(0).toUpperCase() + slug.slice(1),
      icon: Book,
      description: `Articles in the ${slug.charAt(0).toUpperCase() + slug.slice(1)} series.`,
    }
  );
};


