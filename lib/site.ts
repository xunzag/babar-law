import type { Metadata } from "next";

// The canonical domain. Production always uses it; previews and local builds
// fall back to their own URL so links resolve while testing.
export const CANONICAL_URL = "https://www.babarlawassociates.com";

const deployment = process.env.VERCEL_URL;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production"
    ? CANONICAL_URL
    : deployment
      ? `https://${deployment}`
      : "http://localhost:3000");

export const SITE_NAME = "Babar Law Associates";

/** Per-page metadata with matching Open Graph and Twitter cards. */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Serialise JSON-LD safely for a <script> tag. */
export const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: `${siteUrl}${t.path === "/" ? "" : t.path}`,
  })),
});
