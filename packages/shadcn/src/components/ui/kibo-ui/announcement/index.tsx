import { Badge, badgeVariants } from "@repo/shadverse/components/badge";
import { cn } from "@repo/shadverse/lib/utils";
import type { HTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

export type AnnouncementProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    themed?: boolean;
  };

export const Announcement = ({
  variant = "outline",
  themed = false,
  className,
  ...props
}: AnnouncementProps) => (
  <Badge
    variant={variant}
    className={cn(
      "group max-w-full gap-2 rounded-full bg-background px-3 py-0.5 font-medium shadow-sm transition-all",
      "hover:shadow-md",
      themed && "announcement-themed border-foreground/5",
      className
    )}
    {...props}
  />
);

export type AnnouncementTagProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTag = ({
  className,
  ...props
}: AnnouncementTagProps) => (
  <div
    className={cn(
      "-ml-2.5 shrink-0 truncate rounded-full bg-foreground/5 px-2.5 py-1 text-xs",
      "group-[.announcement-themed]:bg-background/60",
      className
    )}
    {...props}
  />
);

export type AnnouncementTitleProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTitle = ({
  className,
  ...props
}: AnnouncementTitleProps) => (
  <div
    className={cn("flex items-center gap-1 truncate py-1", className)}
    {...props}
  />
);
