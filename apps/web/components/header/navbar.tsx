"use client";

import Link, { type LinkProps } from "fumadocs-core/link";
import { cn } from "@repo/shadverse/lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "fumadocs-ui/components/ui/navigation-menu";
import { type HTMLAttributes, useState } from "react";
import { GridBackground } from "@repo/ui/components/grid-background";

export const Navbar = (props: HTMLAttributes<HTMLElement>) => {
  const [value, setValue] = useState("");

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id="nd-nav"
        {...props}
        className={cn(
          "sticky top-[var(--fd-banner-height)] z-30 box-content w-full bg-background/80 backdrop-blur-lg transition-colors",
          "border-border/70 border-b border-dashed dark:border-border",
          // value.length > 0 ? 'shadow-lg' : 'shadow-xs',
          props.className
        )}
      >
        <div
          className={cn(
            "relative container mx-auto flex size-full h-14 flex-row items-center"
          )}
        >
          <GridBackground maxWidthClass="container" />
          <div
            className="absolute top-0 left-0 h-14 w-14 -z-10"
            style={{
              backgroundColor: "#f5f5f5",
              opacity: 0.2,
              backgroundImage:
                "repeating-radial-gradient(circle at 0 0, transparent 0, #f5f5f5 8px), repeating-linear-gradient(#9ca3af55, #6b7280)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
          <div className="flex flex-row size-full items-center gap-1.5 px-4 lg:px-6">
            {props.children}
          </div>
        </div>
        <NavigationMenuViewport />
      </header>
    </NavigationMenu>
  );
};

export const NavbarMenuLink = (props: LinkProps) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        {...props}
        className={cn(
          "flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground",
          props.className
        )}
      >
        {props.children}
      </Link>
    </NavigationMenuLink>
  );
};
