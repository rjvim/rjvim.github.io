import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface GithubCodeBlockProps {
  url: string;
  extractLines?: boolean;
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
      if (lineParts.length > 0 && lineParts[0].startsWith("L")) {
        fromLine = parseInt(lineParts[0].slice(1), 10) - 1;
        if (lineParts.length > 1 && lineParts[1].startsWith("L")) {
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

      return selectedLines
        .map((line) =>
          line.length > 0
            ? line.slice(preceedingSpace < Infinity ? preceedingSpace : 0)
            : line
        )
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
}: GithubCodeBlockProps) {
  try {
    // Validate that it's a GitHub URL
    if (!url.includes("github.com")) {
      throw new Error("This component only supports GitHub URLs");
    }

    // Parse GitHub URL to get raw URL and line info
    const reference = parseGitHubUrl(url);

    // Fetch the code content, extracting specific lines if needed
    const code = await fetchCode(
      reference.rawUrl,
      extractLines ? reference.fromLine : undefined,
      extractLines ? reference.toLine : undefined
    );

    const lang = getLanguageFromUrl(reference.rawUrl);

    return <DynamicCodeBlock lang={lang} code={code} />;
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
