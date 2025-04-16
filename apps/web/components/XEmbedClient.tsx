"use client";

import { XEmbed, XEmbedProps } from "react-social-media-embed";

export function XEmbedClient({ ...props }: XEmbedProps) {
  return (
    <div className="flex justify-center">
      <XEmbed {...props} />
    </div>
  );
}
