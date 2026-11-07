import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, ogImage, siteUrl } from "@/lib/site";
import { firm } from "@/lib/content";
import { practicePages } from "@/lib/practice";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Lawyers and advocates in Karachi since 2004: litigation before the High Court of Sindh, bail, immigration and Golden Visa, banking and corporate law. Led by Ghulam Shabbir Babar, Advocate High Court. Call +92 300 2723976.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Babar Law Associates | Lawyers & Advocates in Karachi, Pakistan",
    template: "%s · Babar Law Associates",
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: "Ghulam Shabbir Babar" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Legal services",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "Babar Law Associates | Lawyers & Advocates in Karachi, Pakistan",
    description,
    locale: "en_US",
    images: [ogImage("/", "Babar Law Associates | Lawyers & Advocates in Karachi, Pakistan")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Babar Law Associates | Lawyers & Advocates in Karachi, Pakistan",
    description,
    images: [ogImage("/", "Babar Law Associates | Lawyers & Advocates in Karachi, Pakistan")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Google Search Console HTML-tag verification, set in the hosting env.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// Sitewide structured data: the firm, its principal and the website.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LegalService", "LocalBusiness"],
      "@id": `${siteUrl}/#firm`,
      name: SITE_NAME,
      alternateName: "Babar Law",
      description,
      url: siteUrl,
      logo: `${siteUrl}/assets/babar-law-mark.png`,
      image: `${siteUrl}/assets/hero/supreme-court.jpg`,
      telephone: "+923002723976",
      email: firm.email,
      foundingDate: "2004",
      founder: { "@id": `${siteUrl}/#principal` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite No. 305, 3rd Floor, Al-Ayesha Chambers, Passport Office, Saddar",
        addressLocality: "Karachi",
        addressRegion: "Sindh",
        addressCountry: "PK",
      },
      geo: { "@type": "GeoCoordinates", latitude: 24.858007, longitude: 67.021599 },
      hasMap: "https://www.google.com/maps/search/?api=1&query=Al-Ayesha+Chambers+Saddar+Karachi",
      contactPoint: [
        { "@type": "ContactPoint", contactType: "customer service", telephone: "+923002723976", areaServed: "PK", availableLanguage: ["English", "Urdu", "Sindhi"] },
        { "@type": "ContactPoint", contactType: "customer service", telephone: "+19145577765", areaServed: ["US", "CA"], availableLanguage: "English" },
      ],
      areaServed: ["Pakistan", "United States", "United Kingdom", "Canada", "Cyprus", "Greece", "Portugal", "United Arab Emirates", "European Union"],
      knowsAbout: practicePages.map((p) => p.title),
      knowsLanguage: ["en", "ur", "sd"],
      priceRange: "$$",
      sameAs: ["https://www.lawofficesofmanuelbquintal.com"],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#principal`,
      name: "Ghulam Shabbir Babar",
      jobTitle: "Advocate High Court, Attorney at Law, LLM (Europe)",
      url: `${siteUrl}/about`,
      image: `${siteUrl}/assets/team/ghulam-shabbir-babar.jpg`,
      worksFor: { "@id": `${siteUrl}/#firm` },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of Bologna" },
        { "@type": "CollegeOrUniversity", name: "Ghent University" },
        { "@type": "CollegeOrUniversity", name: "Hamdard University" },
        { "@type": "CollegeOrUniversity", name: "University of Sindh" },
      ],
      memberOf: [
        { "@type": "Organization", name: "Sindh Bar Council" },
        { "@type": "Organization", name: "Sindh High Court Bar Association" },
        { "@type": "Organization", name: "Karachi Bar Association" },
        { "@type": "Organization", name: "European Corporate Governance Institute" },
      ],
      knowsLanguage: ["en", "ur", "sd", "it"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_NAME,
      publisher: { "@id": `${siteUrl}/#firm` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable}`}>
      <body className="bg-ink min-h-screen flex flex-col">
        <JsonLd data={jsonLd} />
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
