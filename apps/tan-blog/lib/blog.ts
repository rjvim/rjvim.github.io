import { globSync } from "tinyglobby";
import * as fs from "node:fs";
import {
  loader,
  type MetaData,
  type PageData,
  type Source,
  type VirtualFile,
} from "fumadocs-core/source";
import matter from "gray-matter";
import * as path from "node:path";

let blogFiles: [string, string][];

if (typeof import.meta.glob === "function") {
  blogFiles = Object.entries(
    import.meta.glob<true, "raw">("/content/blog/**/*", {
      eager: true,
      query: "?raw",
      import: "default",
    })
  );
} else {
  blogFiles = globSync("content/blog/**/*").map((file) => {
    return [file, fs.readFileSync(file).toString()];
  });
}

const virtualBlogFiles: VirtualFile[] = blogFiles.flatMap(([file, content]) => {
  const ext = path.extname(file);
  const virtualPath = path.relative(
    "content/blog",
    path.join(process.cwd(), file)
  );

  if (ext === ".mdx" || ext === ".md") {
    const parsed = matter(content);

    return {
      type: "page",
      path: virtualPath,
      data: {
        ...parsed.data,
        content: parsed.content,
      },
    };
  }

  return [];
});

export { blogFiles, virtualBlogFiles };
