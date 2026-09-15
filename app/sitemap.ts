import type { MetadataRoute } from "next";
import { POSTS } from "./_data";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blog.everrest.ai";

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
