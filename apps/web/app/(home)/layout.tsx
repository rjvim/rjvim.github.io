import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions, linkItems } from "@/app/layout.config";
import { getLinks } from "fumadocs-ui/layouts/shared";
import { Header } from "@/components/header";
import { SocialIcons } from "@repo/ui/components/social-icons";
import BigFooter from "@/components/big-footer";
import SimpleFooter from "@/components/simple-footer";

export default function Layout({ children }: { children: ReactNode }) {
  // const footerNavigation = {
  //   solutions: [
  //     { name: "Marketing", href: "/marketing" },
  //     { name: "Analytics", href: "/analytics" },
  //     { name: "Automation", href: "/automation" },
  //     { name: "Commerce", href: "/commerce" },
  //   ],
  //   support: [
  //     { name: "Documentation", href: "/docs" },
  //     { name: "Guides", href: "/guides" },
  //     { name: "API Status", href: "/api-status" },
  //   ],
  //   company: [
  //     { name: "About", href: "/about" },
  //     { name: "Blog", href: "/blog" },
  //     { name: "Careers", href: "/careers" },
  //     { name: "Contact", href: "/contact" },
  //   ],
  //   legal: [
  //     { name: "Privacy", href: "/privacy" },
  //     { name: "Terms", href: "/terms" },
  //     { name: "Cookie Policy", href: "/cookies" },
  //   ],
  //   social: [
  //     {
  //       name: "Twitter",
  //       href: "https://x.com/rjv_im",
  //       icon: SocialIcons.x,
  //     },
  //     {
  //       name: "GitHub",
  //       href: "https://github.com/rjvim",
  //       icon: SocialIcons.github,
  //     },
  //   ],
  // };

  // Social media icons for SimpleFooter
  const footerNavigation = [
    {
      name: "X",
      href: "https://x.com/rjv_im",
      icon: SocialIcons.x,
    },
    {
      name: "GitHub",
      href: "https://github.com/rjvim",
      icon: SocialIcons.github,
    },
    {
      name: "YouTube",
      href: "https://www.linkedin.com/in/rajivseelam/",
      icon: SocialIcons.linkedIn,
    },
  ];

  return (
    <HomeLayout
      {...baseOptions}
      nav={{
        component: (
          <Header
            finalLinks={getLinks(linkItems, baseOptions.githubUrl)}
            {...baseOptions}
          />
        ),
      }}
      className="pt-0 home-layout"
    >
      <div className="home-children flex flex-1 flex-col divide-y divide-dashed divide-border/70 border-border/70 border-dashed sm:border-b dark:divide-border dark:border-border">
        {children}
      </div>
      <SimpleFooter navigation={footerNavigation} />

      {/* <BigFooter
        solutions={footerNavigation.solutions}
        support={footerNavigation.support}
        company={footerNavigation.company}
        legal={footerNavigation.legal}
        social={footerNavigation.social}
        companyName="rjv.im"
        companyDescription="I am Rajiv. I love coding and solving problems."
      /> */}
    </HomeLayout>
  );
}
