import type { MetadataRoute } from "next";
import { siteUrl as base } from "@/lib/site-url";
import { POSTS } from "./_data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...POSTS.map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p.iso),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
