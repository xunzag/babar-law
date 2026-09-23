import type { MetadataRoute } from "next";
import { nav } from "@/lib/content";

const productionUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (productionUrl ? `https://${productionUrl}` : "http://localhost:3000");

const priority: Record<string, number> = {
  "/": 1,
  "/contact": 0.9,
  "/practice-areas": 0.8,
  "/cases": 0.7,
  "/about": 0.7,
  "/international": 0.6,
  "/experience": 0.5,
  "/gallery": 0.5,
  "/faq": 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date(),
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: priority[item.href] ?? 0.5,
  }));
}
