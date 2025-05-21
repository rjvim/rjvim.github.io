import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import GithubCodeBlock from "./components/github-code-block";
import { XEmbedClient } from "./components/XEmbedClient";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";
import Opacity from "@/components/animations/opacity";
import TranslateBox from "@/components/animations/translate";
import Scale from "@/components/animations/scale";
import RotateBox from "@/components/animations/rotate";
import TransformOriginBox from "@/components/animations/transform-origin";
import KeyframesBox from "@/components/animations/keyframes";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Opacity,
    TranslateBox,
    Scale,
    RotateBox,
    TransformOriginBox,
    KeyframesBox,
    Tab,
    Tabs,
    Step,
    Steps,
    XEmbed: XEmbedClient,
    GithubCodeBlock: GithubCodeBlock,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
