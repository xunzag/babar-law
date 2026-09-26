import LegalPage, { type LegalSection } from "@/components/LegalPage";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { firm } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies used on the Babar Law Associates website and how to control them.",
  alternates: { canonical: "/cookies" },
};

const rows = [
  {
    name: "bla_consent",
    who: "Babar Law Associates",
    purpose: "Remembers your cookie choices so we do not ask again on every page.",
    type: "Strictly necessary",
    duration: "180 days",
  },
  {
    name: "Google cookies (e.g. NID)",
    who: "Google",
    purpose: "Set by Google Maps when you choose to load the office map on the contact page.",
    type: "Embedded content",
    duration: "Set by Google",
  },
];

const sections: LegalSection[] = [
  {
    id: "what",
    heading: "What cookies are",
    body: (
      <p>
        Cookies are small text files a website stores on your device. Some are essential for a site to work; others
        are set by third parties whose content appears on the page.
      </p>
    ),
  },
  {
    id: "which",
    heading: "Cookies we use",
    body: (
      <>
        <p>
          We keep cookies to a minimum. We do not use advertising or tracking cookies, and we do not currently use
          analytics.
        </p>
        <div className="mt-6 grid gap-3">
          {rows.map((r) => (
            <div key={r.name} className="border border-ink/12 bg-paper-2/60 p-5 text-[15px] leading-relaxed">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <strong>{r.name}</strong>
                <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-gold-deep">{r.type}</span>
              </div>
              <p>{r.purpose}</p>
              <p className="text-ink/55 text-[14px]">
                Set by {r.who} · Kept for {r.duration}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6">
          Our fonts are served from our own website, so loading a page does not contact Google Fonts.
        </p>
      </>
    ),
  },
  {
    id: "control",
    heading: "Your choices",
    body: (
      <>
        <p>
          When you first visit, you can allow embedded content or keep to strictly necessary cookies. You can change
          your mind at any time:
        </p>
        <div className="my-6">
          <CookieSettingsButton />
        </div>
        <p>
          You can also block or delete cookies in your browser settings. Blocking the consent cookie means we will ask
          for your choice again on your next visit.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Questions",
    body: (
      <p>
        Email <a href={`mailto:${firm.email}`}>{firm.email}</a> with any questions about cookies on this site.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      crumb="Cookies"
      current="/cookies"
      title="Cookie policy"
      intro={<p>Which cookies this website uses, why, and how to control them.</p>}
      sections={sections}
    />
  );
}
