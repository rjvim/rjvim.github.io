"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { useState } from "react";

export default function RemoteCodeBlock({ ...props }) {
  const [lang, setLang] = useState("ts");
  const [code, setCode] = useState('console.log("Hello Remote!!")');

  return <DynamicCodeBlock lang={lang} code={code} />;
}
