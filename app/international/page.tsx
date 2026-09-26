import Reveal from "@/components/Reveal";
import InternationalHero from "@/components/heroes/InternationalHero";
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
      <InternationalHero />

      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-[clamp(50px,8vw,84px)] pb-11">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i * 0.04, 0.3)}>
              <CooperationCard partner={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] pt-15 pb-25">
        <Reveal className="relative overflow-hidden bg-paper text-ink py-[clamp(36px,5vw,64px)] px-[clamp(22px,4vw,56px)]">
          <div className="flex flex-wrap items-start justify-between gap-8 mb-4">
            <div>
              <div className="eyebrow text-gold-deep! mb-4">
                Associated Partner
              </div>
              <h2 className="font-display font-medium text-[clamp(26px,4.2vw,38px)] mb-3 leading-tight text-ink">
                European Master in Law and Economics
              </h2>
              <p className="text-ink/62 text-[15.5px] mb-0 font-light tracking-wide">
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
          <p className="text-ink/80 text-base leading-[1.75] font-light mb-6 mt-6">
            BABAR LAW ASSOCIATES is one of the Associated Partner of European
            Masters in Law and Economics (www.emle.org) which is providing
            following services:
          </p>
          <div className="grid gap-4">
            {emle.map((e) => (
              <div key={e.n} className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 items-start">
                <span className="text-gold-deep font-medium text-sm pt-1">{e.n}</span>
                <span className="text-ink/65 text-base leading-[1.75] font-light">
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
