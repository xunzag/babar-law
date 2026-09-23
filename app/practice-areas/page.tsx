import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import PracticeIcon from "@/components/PracticeIcon";
import { areasFull } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Immigration & visas, citizenship & residency by investment, banking & consumer law, corporate & commercial, litigation, mediation & ADR, and academic advisory.",
  alternates: { canonical: "/practice-areas" },
};

export default function PracticeAreasPage() {
  return (
    <div>
      <PageHero
        eyebrow="Practice areas"
        title="What the firm handles"
        description="Instructions are accepted from private individuals, families, investors, companies and institutions."
      />
      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(48px,8vw,80px)] pb-25">
        <div className="grid gap-px bg-gold/16 border border-gold/16">
          {areasFull.map((a, i) => (
            <Reveal key={a.num} delay={Math.min(i * 0.05, 0.3)}>
              <div className="bg-ink-4 py-12.5 px-10.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-9 items-start transition-colors duration-350 hover:bg-ink-5">
                <div>
                  <div className="w-12.5 h-12.5 border border-gold/35 flex items-center justify-center mb-6">
                    <PracticeIcon num={a.num} className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif font-semibold text-[clamp(23px,3.4vw,30px)] leading-tight text-white">
                    {a.title}
                  </h3>
                </div>
                <div>
                  <p className="m-0 mb-5 text-cream/70 text-[16.5px] leading-[1.8] font-light">
                    {a.body}
                  </p>
                  <div className="flex flex-wrap gap-2.25">
                    {a.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-gold/30 text-gold-light/90 text-xs tracking-wide py-1.75 px-3.5 uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
