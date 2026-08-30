import type { Metadata } from "next";
import { siteUrl } from "@/lib/tools";

interface SeoInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
}: SeoInput): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: { "en-US": url, "zh-CN": url },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "DTCwise",
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
