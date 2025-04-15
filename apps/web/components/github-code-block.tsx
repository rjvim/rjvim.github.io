import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import * as Base from "fumadocs-ui/components/codeblock";
import { highlight } from "fumadocs-core/highlight";
import { transformerMetaHighlight } from "@shikijs/transformers";

export interface CodeBlockProps {
  code: string;
  wrapper?: Base.CodeBlockProps;
  lang: string;
}

export async function CodeBlock({ code, lang, wrapper }: CodeBlockProps) {
  const rendered = await highlight(code, {
    lang,
    meta: {
      __raw: "{2,8-16}",
    },
    themes: {
      light: "github-light",
      dark: "vesper",
    },
    components: {
      pre: Base.Pre,
    },
    transformers: [transformerMetaHighlight()],
  });

  return <Base.CodeBlock {...wrapper}>{rendered}</Base.CodeBlock>;
}

interface GithubCodeBlockProps {
  url: string;
  extractLines?: boolean;
  highlightLines?: string;
}

interface GitHubReference {
  rawUrl: string;
  fromLine?: number;
  toLine?: number;
}

function parseGitHubUrl(url: string): GitHubReference {
  try {
    // Split the URL to separate the line reference part
    const [githubUrl, loc] = url.split("#");

    // Parse line references if present
    let fromLine: number | undefined;
    let toLine: number | undefined;

    if (loc) {
      const lineParts = loc.split("-");
      // Make sure lineParts[0] exists and starts with 'L'
      if (
        lineParts.length > 0 &&
        lineParts[0] &&
        lineParts[0].startsWith("L")
      ) {
        fromLine = parseInt(lineParts[0].slice(1), 10) - 1;
        // Make sure lineParts[1] exists and starts with 'L'
        if (
          lineParts.length > 1 &&
          lineParts[1] &&
          lineParts[1].startsWith("L")
        ) {
          toLine = parseInt(lineParts[1].slice(1), 10) - 1;
        } else {
          toLine = fromLine;
        }
      }
    }

    // Parse the GitHub URL to create raw URL
    if (!githubUrl) {
      throw new Error("Invalid GitHub URL");
    }

    const urlObj = new URL(githubUrl);
    const pathParts = urlObj.pathname.split("/").slice(1);

    if (pathParts.length < 5) {
      throw new Error("Invalid GitHub repository path");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [org, repo, blob, branch, ...pathSeg] = pathParts;

    if (!org || !repo || !branch || pathSeg.length === 0) {
      throw new Error("Missing required GitHub path components");
    }

    // Ensure these values are defined
    const safeOrg = org;
    const safeRepo = repo;
    const safeBranch = branch;
    const safePathSeg = pathSeg;

    // Create reference object with raw URL and line info
    return {
      rawUrl: `https://raw.githubusercontent.com/${safeOrg}/${safeRepo}/${safeBranch}/${safePathSeg.join("/")}`,
      fromLine,
      toLine,
    };
  } catch (error) {
    console.error("Error parsing GitHub URL:", error);
    throw new Error(
      `Invalid GitHub URL: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

function parseHighlightLines(highlightLines?: string): number[] {
  if (!highlightLines) return [];

  const result: number[] = [];
  const segments = highlightLines.split(",");

  for (const segment of segments) {
    if (segment.includes("-")) {
      // Range like "3-5"
      const parts = segment.split("-");
      const start = parseInt(parts[0] || "0", 10);
      const end = parseInt(parts[1] || "0", 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          result.push(i);
        }
      }
    } else {
      // Single line like "1"
      const lineNum = parseInt(segment, 10);
      if (!isNaN(lineNum)) {
        result.push(lineNum);
      }
    }
  }

  return result;
}

async function fetchCode(
  url: string,
  fromLine?: number,
  toLine?: number,
  highlightLines: number[] = []
) {
  try {
    const response = await fetch(url, { cache: "force-cache" });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch code: ${response.status} ${response.statusText}`
      );
    }

    const content = await response.text();

    // Extract specific lines if line numbers are provided
    if (fromLine !== undefined && toLine !== undefined) {
      const lines = content.split("\n");
      const selectedLines = lines.slice(fromLine, toLine + 1);

      if (selectedLines.length === 0) {
        return content;
      }

      // Handle indentation
      const preceedingSpace = selectedLines.reduce(
        (prev: number, line: string) => {
          if (line.length === 0) return prev;

          const spaces = line.match(/^\s+/);
          if (spaces) return Math.min(prev, spaces[0].length);

          return 0;
        },
        Infinity
      );

      // Apply highlighting and handle indentation
      return selectedLines
        .map((line, index) => {
          // Calculate the actual line number (relative to the extracted section)
          const lineNumber = fromLine + index + 1;

          // Add highlight comment if this line should be highlighted
          const shouldHighlight = highlightLines.includes(lineNumber);
          const highlightComment = shouldHighlight
            ? " // [!code highlight]"
            : "";

          if (line.length > 0) {
            return (
              line.slice(preceedingSpace < Infinity ? preceedingSpace : 0) +
              highlightComment
            );
          }
          return line;
        })
        .join("\n");
    }

    // If we're not extracting specific lines but still want to highlight
    if (highlightLines.length > 0) {
      const lines = content.split("\n");
      return lines
        .map((line, index) => {
          const lineNumber = index + 1;
          const shouldHighlight = highlightLines.includes(lineNumber);
          return shouldHighlight ? `${line} // [!code highlight]` : line;
        })
        .join("\n");
    }

    return content;
  } catch (error) {
    console.error("Error fetching code:", error);
    return `// Error fetching code: ${error instanceof Error ? error.message : String(error)}`;
  }
}

function getLanguageFromUrl(url: string): string {
  try {
    const extension = url.split(".").pop()?.toLowerCase() || "";
    return extension;
  } catch {
    return "";
  }
}

export default async function GithubCodeBlock({
  url,
  extractLines = true,
  highlightLines,
}: GithubCodeBlockProps) {
  try {
    // Validate that it's a GitHub URL
    if (!url.includes("github.com")) {
      throw new Error("This component only supports GitHub URLs");
    }

    // Parse GitHub URL to get raw URL and line info
    const reference = parseGitHubUrl(url);

    // Parse highlight lines
    const highlightLinesArray = parseHighlightLines(highlightLines);

    // Fetch the code content, extracting specific lines if needed
    const code = await fetchCode(
      reference.rawUrl,
      extractLines ? reference.fromLine : undefined,
      extractLines ? reference.toLine : undefined,
      highlightLinesArray
    );

    const lang = getLanguageFromUrl(reference.rawUrl);

    // console.log("code", code);

    // return (
    //   <DynamicCodeBlock
    //     lang={lang}
    //     code={code}
    //     options={{
    //       meta: {
    //         __raw: "{8-16}",
    //       },
    //     }}
    //   />
    // );

    return <CodeBlock lang={lang} code={code} />;
  } catch (error) {
    console.error("Error in GithubCodeBlock:", error);
    return (
      <DynamicCodeBlock
        lang="text"
        code={`// Error: ${error instanceof Error ? error.message : String(error)}`}
      />
    );
  }
}
