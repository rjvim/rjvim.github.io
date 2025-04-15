import * as Base from "fumadocs-ui/components/codeblock";
import { highlight } from "fumadocs-core/highlight";
import { transformerMetaHighlight } from "@shikijs/transformers";

export interface CodeBlockProps {
  code: string;
  wrapper?: Base.CodeBlockProps;
  lang: string;
  highlightLines?: string;
}

export async function CodeBlock({
  code,
  lang,
  wrapper,
  highlightLines,
}: CodeBlockProps) {
  const rendered = await highlight(code, {
    lang,
    meta: highlightLines
      ? {
          __raw: highlightLines,
        }
      : undefined,
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
  useLocForHighlight?: boolean;
}

interface GitHubReference {
  rawUrl: string;
  fromLine?: number;
  toLine?: number;
  highlightLines?: string;
}

function parseGitHubUrl(
  url: string,
  useLocForHighlight?: boolean
): GitHubReference {
  try {
    // Split the URL to separate the line reference part
    const [githubUrl, loc] = url.split("#");

    // Parse line references if present
    let fromLine: number | undefined;
    let toLine: number | undefined;
    let highlightLines: string | undefined;

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

        // If useLocForHighlight is true, generate highlight lines from loc
        if (
          useLocForHighlight &&
          fromLine !== undefined &&
          toLine !== undefined
        ) {
          // Convert to 1-based for highlighting (fromLine and toLine are 0-based)
          const startLine = fromLine + 1;
          const endLine = toLine + 1;

          if (startLine === endLine) {
            highlightLines = `{${startLine}}`;
          } else {
            highlightLines = `{${startLine}-${endLine}}`;
          }
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
      highlightLines,
    };
  } catch (error) {
    console.error("Error parsing GitHub URL:", error);
    throw new Error(
      `Invalid GitHub URL: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

function formatHighlightLines(highlightLines?: string): string | undefined {
  if (!highlightLines) return undefined;

  // If the highlightLines already starts with '{' and ends with '}', return it as is
  if (highlightLines.startsWith("{") && highlightLines.endsWith("}")) {
    return highlightLines;
  }

  // Otherwise, wrap it with curly braces
  return `{${highlightLines}}`;
}

async function fetchCode(url: string, fromLine?: number, toLine?: number) {
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

      // Handle indentation only
      return selectedLines
        .map((line) => {
          if (line.length > 0) {
            return line.slice(preceedingSpace < Infinity ? preceedingSpace : 0);
          }
          return line;
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
  extractLines = false,
  highlightLines,
  useLocForHighlight = true,
}: GithubCodeBlockProps) {
  try {
    // Validate that it's a GitHub URL
    if (!url.includes("github.com")) {
      throw new Error("This component only supports GitHub URLs");
    }

    // Parse GitHub URL to get raw URL and line info
    const reference = parseGitHubUrl(url, useLocForHighlight);

    // Format highlight lines for Shiki, but only if we're not extracting lines
    // Priority: explicitly provided highlightLines prop > lines from URL loc
    const formattedHighlightLines = !extractLines
      ? formatHighlightLines(highlightLines || reference.highlightLines)
      : undefined;

    // Fetch the code content, extracting specific lines if needed
    const code = await fetchCode(
      reference.rawUrl,
      extractLines ? reference.fromLine : undefined,
      extractLines ? reference.toLine : undefined
    );

    const lang = getLanguageFromUrl(reference.rawUrl);

    return (
      <CodeBlock
        lang={lang}
        code={code}
        highlightLines={formattedHighlightLines}
      />
    );
  } catch (error) {
    console.error("Error in GithubCodeBlock:", error);
    return (
      <CodeBlock
        lang="text"
        code={`// Error: ${error instanceof Error ? error.message : String(error)}`}
      />
    );
  }
}
