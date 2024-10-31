import React from "react";
import Footer from "@theme-original/Footer";
import type FooterType from "@theme/Footer";
import type { WrapperProps } from "@docusaurus/types";
import { useThemeConfig } from "@docusaurus/theme-common";
// import { Footer } from "@site/src/components/Footer";

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  // const { footer } = useThemeConfig();
  // if (!footer) {
  //   return null;
  // }
  // const { copyright, links, logo, style } = footer;
  // console.log("footer", footer);

  return (
    <>
      <Footer />
    </>
  );
}
