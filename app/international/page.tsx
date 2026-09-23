import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CooperationCard from "@/components/CooperationCard";
import LogoBadge from "@/components/LogoBadge";
import { partners, emle, erasmusMundusAssociation } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International",
  description:
    "Partnerships and panels across the United States, Cyprus, Greece, Portugal, the Netherlands and Pakistan.",
  alternates: { canonical: "/international" },
};

export default function InternationalPage() {
  return (
    <div>
      <PageHero
        eyebrow="International"
        title="Partnerships and panels"
        description="Standing arrangements with firms, developers, banks and universities in the United States, Cyprus, Greece, Portugal, the Netherlands and Pakistan."
      />

      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(50px,8vw,84px)] pb-11">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i * 0.04, 0.3)}>
              <CooperationCard partner={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-15 pb-25">
        <Reveal className="bg-ink-3 border border-gold/22 py-14 px-12">
          <div className="flex flex-wrap items-start justify-between gap-8 mb-4">
            <div>
              <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-4">
                Associated Partner
              </div>
              <h2 className="font-serif font-medium text-[clamp(26px,4.2vw,38px)] mb-3 leading-tight text-white">
                European Master in Law and Economics
              </h2>
              <p className="text-cream/50 text-[15.5px] mb-0 font-light tracking-wide">
                Erasmus University of Rotterdam, The Netherlands · since
                December 2009
              </p>
            </div>
            <a
              href={erasmusMundusAssociation.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={erasmusMundusAssociation.name}
            >
              <LogoBadge
                src={erasmusMundusAssociation.logo}
                alt={erasmusMundusAssociation.name}
                size="sm"
              />
            </a>
          </div>
          <p className="text-cream/80 text-base leading-[1.75] font-light mb-6 mt-6">
            BABAR LAW ASSOCIATES is one of the Associated Partner of European
            Masters in Law and Economics (www.emle.org) which is providing
            following services:
          </p>
          <div className="grid gap-4">
            {emle.map((e) => (
              <div key={e.n} className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 items-start">
                <span className="text-gold font-serif text-lg">{e.n}</span>
                <span className="text-cream/68 text-base leading-[1.75] font-light">
                  {e.text}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
