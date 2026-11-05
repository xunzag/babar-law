import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { nav } from "@/lib/content";
import { practicePages } from "@/lib/practice";
import { articles } from "@/lib/insights";

const priority: Record<string, number> = {
  "/": 1,
  "/contact": 0.9,
  "/practice-areas": 0.8,
  "/cases": 0.7,
  "/about": 0.7,
  "/associates": 0.7,
  "/international": 0.6,
  "/experience": 0.5,
  "/gallery": 0.5,
  "/faq": 0.5,
  "/insights": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date(),
    changeFrequency: item.href === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: priority[item.href] ?? 0.5,
  }));
  const legal = ["/privacy", "/cookies", "/terms"].map((href) => ({
    url: `${siteUrl}${href}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));
  const practice = practicePages.map((p) => ({
    url: `${siteUrl}/practice-areas/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const posts = articles.map((a) => ({
    url: `${siteUrl}/insights/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...pages, ...practice, ...posts, ...legal];
}
