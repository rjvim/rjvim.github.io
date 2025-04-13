// source.config.ts
import {
  defineCollections,
  defineConfig,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
import { transformerTwoslash } from "fumadocs-twoslash";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { transformerRemoveNotationEscape } from "@shikijs/transformers";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
var blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().or(z.date()).transform((value, context) => {
      try {
        return new Date(value);
      } catch {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid date"
        });
        return z.NEVER;
      }
    }),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false)
  })
});
var source_config_default = defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      inline: "tailing-curly-colon",
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      transformers: [
        ...rehypeCodeDefaultOptions.transformers ?? [],
        transformerTwoslash(),
        transformerRemoveNotationEscape()
      ]
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v]
  }
});
export {
  blog,
  source_config_default as default
};
