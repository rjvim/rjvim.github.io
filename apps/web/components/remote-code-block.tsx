import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface RemoteCodeBlockProps {
  url: string;
}

async function fetchCode(url: string) {
  const response = await fetch(url, { cache: "force-cache" });
  const content = await response.text();
  return content;
}

function getLanguageFromUrl(url: string): string {
  const extension = url.split(".").pop()?.toLowerCase() || "";
  return extension;
}

export default async function RemoteCodeBlock({ url }: RemoteCodeBlockProps) {
  const code = await fetchCode(url);
  const lang = getLanguageFromUrl(url);

  return <DynamicCodeBlock lang={lang} code={code} />;
}
