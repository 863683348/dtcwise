import type { MetadataRoute } from "next";
import {
  tools,
  categories,
  getCompareSlugs,
  siteUrl,
} from "@/lib/tools";
import { posts } from "@/lib/blog";

const LISTS = [
  "best-dropshipping-suppliers-usa",
  "best-shopify-dropshipping-tools",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  const now = new Date();

  const staticRoutes = [
    "",
    "/ranking/monthly",
    "/submit",
  ].map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/category/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const toolRoutes = tools.map((t) => ({
    url: `${base}/tool/${t.id}`,
    lastModified: new Date(t.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const altRoutes = tools.map((t) => ({
    url: `${base}/alternatives/${t.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  const compareRoutes = getCompareSlugs().map((s) => ({
    url: `${base}/compare/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const listRoutes = LISTS.map((s) => ({
    url: `${base}/lists/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = [
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...toolRoutes,
    ...altRoutes,
    ...compareRoutes,
    ...listRoutes,
    ...blogRoutes,
  ];
}
