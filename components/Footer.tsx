import Image from "next/image";
import Link from "next/link";
import { areasFull, callLines, firm, offices } from "@/lib/content";
import ArrowLink from "@/components/ArrowLink";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import FooterCta from "@/components/FooterCta";

const firmLinks = [
  { href: "/about", label: "About the principal" },
  { href: "/associates", label: "Associates" },
  { href: "/cases", label: "Case portfolio" },
  { href: "/experience", label: "Experience" },
  { href: "/international", label: "International" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
];

const wrap = "max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]";

function Heading({ children }: { children: string }) {
  return <h2 className="m-0 mb-5 text-[12px] font-medium tracking-[0.14em] uppercase text-cream/55">{children}</h2>;
}

export default function Footer() {
  const [karachi, newYork] = offices;
  const pk = callLines.filter((c) => c.label.startsWith("Pakistan"));
  const us = callLines.filter((c) => !c.label.startsWith("Pakistan"));

  return (
    <footer className="bg-ink-6 text-cream/60">
      {/* Consultation band */}
      <FooterCta>
      <div className="border-y border-cream/8 bg-ink-2">
        <div className={`${wrap} py-[clamp(40px,6vw,64px)] flex flex-col md:flex-row md:items-center justify-between gap-8`}>
          <div className="max-w-[640px]">
            <h2 className="m-0 font-display font-medium text-white text-[clamp(26px,3.2vw,40px)] leading-[1.1] tracking-[-0.03em] mb-3">
              Arrange a consultation
            </h2>
            <p className="m-0 text-cream/60 text-[15.5px] leading-relaxed">
              In Karachi, by appointment in New York, or remotely. Every enquiry is reviewed by Mr. Babar personally.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <ArrowLink href="/contact">Book a consultation</ArrowLink>
            <ArrowLink href={firm.whatsapp} external variant="outline">
              WhatsApp
            </ArrowLink>
          </div>
        </div>
      </div>
      </FooterCta>

      {/* Directory */}
      <div className={`${wrap} py-[clamp(48px,7vw,80px)] grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.25fr)]`}>
        <div className="sm:col-span-2 lg:col-span-1 max-w-[380px]">
          <Link href="/" className="inline-flex items-center gap-3.5 mb-6">
            <Image src="/assets/babar-law-mark.png" alt="" width={44} height={44} className="h-11 w-auto" />
            <span className="leading-tight">
              <span className="block font-display font-semibold text-white text-[17px] tracking-[0.06em]">
                BABAR LAW ASSOCIATES
              </span>
              <span className="block text-[12px] text-gold mt-1">Advocates &amp; International Legal Consultants</span>
            </span>
          </Link>
          <p className="m-0 text-[14.5px] leading-relaxed mb-5">
            The practice of Ghulam Shabbir Babar, Attorney at Law and LLM (Europe), in litigation and international
            practice since 2004.
          </p>
          <a href={`mailto:${firm.email}`} className="text-[14.5px] text-cream/80 hover:text-white break-all">
            {firm.email}
          </a>
        </div>

        <nav aria-label="The firm">
          <Heading>The firm</Heading>
          <ul className="m-0 p-0 list-none grid gap-2.5">
            {firmLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[14.5px] text-cream/65 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Practice areas">
          <Heading>Practice areas</Heading>
          <ul className="m-0 p-0 list-none grid gap-2.5">
            {areasFull.map((a) => (
              <li key={a.num}>
                <Link href={`/practice-areas#area-${a.num}`} className="text-[14.5px] text-cream/65 hover:text-white">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Heading>Offices</Heading>
          <div className="grid gap-7">
            <address className="not-italic">
              <div className="text-white text-[15px] mb-1.5">{karachi.city}</div>
              <p className="m-0 text-[14px] leading-relaxed mb-2">
                Suite No. 305, 3rd Floor, Al-Ayesha Chambers, Passport Office, Saddar, Karachi, Sindh, Pakistan
              </p>
              {pk.map((c) => (
                <a key={c.href} href={c.href} className="block py-1 text-[14px] text-cream/80 hover:text-white tabular-nums">
                  {c.number}
                </a>
              ))}
            </address>
            <address className="not-italic">
              <div className="text-white text-[15px] mb-1.5">{newYork.city}</div>
              <p className="m-0 text-[14px] leading-relaxed mb-2">{newYork.address}</p>
              {us.map((c) => (
                <a key={c.href} href={c.href} className="block py-1 text-[14px] text-cream/80 hover:text-white tabular-nums">
                  {c.number}
                </a>
              ))}
            </address>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-cream/8">
        <div className={`${wrap} pt-7 pb-24 sm:pb-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center`}>
          <div className="text-[13px] leading-relaxed text-cream/55">
            <span className="text-cream/55">© {new Date().getFullYear()} Babar Law Associates.</span> Information on this
            website is not legal advice, and contacting us does not create an advocate–client relationship.
          </div>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-cream/50">
            <Link href="/privacy" className="text-cream/50 hover:text-cream">
              Privacy policy
            </Link>
            <Link href="/cookies" className="text-cream/50 hover:text-cream">
              Cookie policy
            </Link>
            <Link href="/terms" className="text-cream/50 hover:text-cream">
              Terms &amp; disclaimer
            </Link>
            <CookieSettingsButton variant="link" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
