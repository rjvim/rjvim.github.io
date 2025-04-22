import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogComponents } from "./types";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  components?: BlogComponents;
};

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
  components = {},
}: PaginationProps) {
  const pageIndex = currentPage - 1;

  if (totalPages <= 1) {
    return null;
  }

  if (!components.Button) return null;

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <div className="flex items-center gap-2">
        <components.Button
          variant="outline"
          size="sm"
          disabled={pageIndex === 0}
          asChild={pageIndex > 0}
        >
          {pageIndex > 0 ? (
            <Link
              href={
                pageIndex === 1 ? basePath : `${basePath}/page/${pageIndex}`
              }
              prefetch={false}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Link>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </>
          )}
        </components.Button>

        <div className="text-sm text-muted-foreground">
          Page {pageIndex + 1} of {totalPages}
        </div>

        <components.Button
          variant="outline"
          size="sm"
          disabled={pageIndex + 1 >= totalPages}
          asChild={pageIndex + 1 < totalPages}
        >
          {pageIndex + 1 < totalPages ? (
            <Link href={`${basePath}/page/${currentPage + 1}`} prefetch={false}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </components.Button>
      </div>
    </div>
  );
}
