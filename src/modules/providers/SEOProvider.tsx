"use client";

import { DefaultSeo } from "next-seo";
import { defaultSEOConfig } from "../../../next-seo.config";

export const SEOProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DefaultSeo {...defaultSEOConfig} />
      {children}
    </>
  );
};
