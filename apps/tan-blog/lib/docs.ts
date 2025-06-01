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

let docFiles: [string, string][];

if (typeof import.meta.glob === "function") {
  docFiles = Object.entries(
    import.meta.glob<true, "raw">("/content/docs/**/*", {
      eager: true,
      query: "?raw",
      import: "default",
    })
  );
} else {
  docFiles = globSync("content/docs/**/*").map((file) => {
    return [file, fs.readFileSync(file).toString()];
  });
}

const virtualDocFiles: VirtualFile[] = docFiles.flatMap(([file, content]) => {
  const ext = path.extname(file);
  const virtualPath = path.relative(
    "content/docs",
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

  if (ext === ".json") {
    return {
      type: "meta",
      path: virtualPath,
      data: JSON.parse(content),
    };
  }

  return [];
});

export { docFiles, virtualDocFiles };
