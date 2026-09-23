import type { Metadata } from "next";
import { Cormorant_Garamond, Barlow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const productionUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (productionUrl ? `https://${productionUrl}` : "http://localhost:3000");
const description =
  "Babar Law Associates is the practice of Ghulam Shabbir Babar, Attorney at Law and LLM (Europe), advising private clients, investors and institutions in Pakistan, the United States, the United Kingdom and the European Union since 2004.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Babar Law Associates · Advocates & International Consultants",
    template: "%s · Babar Law Associates",
  },
  description,
  keywords: [
    "Babar Law Associates",
    "Ghulam Shabbir Babar",
    "immigration lawyer Karachi",
    "Golden Visa lawyer",
    "Cyprus residency by investment",
    "Greece Golden Visa",
    "UBL legal panel",
    "Pakistan immigration attorney",
    "EMLE Erasmus Mundus",
  ],
  authors: [{ name: "Ghulam Shabbir Babar" }],
  creator: "Babar Law Associates",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Babar Law Associates",
    title: "Babar Law Associates · Advocates & International Consultants",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Babar Law Associates · Advocates & International Consultants",
    description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Babar Law Associates",
  image: `${siteUrl}/assets/babar-law-logo.png`,
  url: siteUrl,
  telephone: "+19145577765",
  email: "ghulam.babar123@gmail.com",
  founder: {
    "@type": "Person",
    name: "Ghulam Shabbir Babar",
    jobTitle: "Attorney at Law, LLM (Europe)",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite No. 305, 3rd Floor, Al-Ayesha Chambers, Passport Office, Saddar",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  areaServed: ["Pakistan", "United States", "United Kingdom", "Canada", "Cyprus", "Greece", "European Union"],
  priceRange: "$$",
  sameAs: ["https://www.lawofficesofmanuelbquintal.com"],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${barlow.variable}`}>
      <body className="bg-ink min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
