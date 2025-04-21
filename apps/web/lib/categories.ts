import {
  Brain,
  Book,
  Code,
  Cog,
  Lightbulb,
  Megaphone,
  Rocket,
  Users,
  Wrench,
} from "lucide-react";
import { SocialIcons } from "@repo/ui/components/social-icons";

export const getCategoryBySlug = (slug: string) => {
  const categories = {
    "behind-the-scenes": {
      label: "Behind the Scenes",
      icon: Wrench,
      description:
        "Raw process of building—why and how you create tools, launches, updates, redesigns.",
    },
    "dev-life": {
      label: "Dev Life",
      icon: Code,
      description:
        "Personal takes on being a developer/founder—tips, lessons, workflows.",
    },
    plans: {
      label: "Plans",
      icon: Lightbulb,
      description:
        "Public brainstorming—future features, tool concepts, Teurons' direction.",
    },
    idea: {
      label: "Idea",
      icon: Brain,
      description:
        "Exploratory thoughts and wild concepts for Teurons and beyond.",
    },
    "tools-tech": {
      label: "Tools Tech",
      icon: Cog,
      description: "Deep dives into tech stacks, tool mechanics, trends.",
    },
    team: {
      label: "Team",
      icon: Users,
      description: "Teurons' startup journey, team dynamics, Betalectic roots.",
    },
    startup: {
      label: "Startup",
      icon: Rocket,
      description: "Growth stories and insights from Teurons and Betalectic.",
    },
    opinions: {
      label: "Opinions",
      icon: Megaphone,
      description:
        "Subjective, wild, gut-hunch takes—less informed, out-of-box rants.",
    },
    "deep-domain-problems": {
      label: "Deep Domain Problems",
      icon: Book,
      description:
        "Isolated series like a book/course—tackling big, specific domain issues.",
    },
  };

  return (
    categories[slug as keyof typeof categories] || {
      label: slug.toString().replace(/-/g, " ").toLowerCase(),
      icon: SocialIcons.github,
    }
  );
};


