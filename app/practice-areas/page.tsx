import Reveal from "@/components/Reveal";
import PracticeHero from "@/components/heroes/PracticeHero";
import PracticeIcon from "@/components/PracticeIcon";
import ArrowLink from "@/components/ArrowLink";
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
      <PracticeHero />
      <section className="bg-paper text-ink">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(64px,9vw,120px)]">
          {areasFull.map((a) => (
            <Reveal key={a.num}>
              <article
                id={`area-${a.num}`}
                className="group scroll-mt-24 grid grid-cols-1 lg:grid-cols-[minmax(0,0.2fr)_minmax(0,0.9fr)_minmax(0,1fr)] gap-x-10 gap-y-6 py-[clamp(40px,6vw,72px)] border-t border-ink/15 last:border-b"
              >
                <div className="flex lg:flex-col items-center lg:items-start gap-5">
                  <span className="font-display font-medium text-[clamp(32px,3.4vw,48px)] leading-[0.8] tracking-[-0.04em] text-gold-deep">
                    {a.num}
                  </span>
                  <span className="w-12 h-12 border border-ink/15 flex items-center justify-center transition-all duration-500 group-hover:bg-ink group-hover:border-ink">
                    <PracticeIcon num={a.num} className="w-5.5 h-5.5 text-gold-deep group-hover:text-gold" />
                  </span>
                </div>
                <h2 className="m-0 font-display font-medium text-[clamp(30px,3.8vw,52px)] leading-[1.02]">
                  {a.title}
                </h2>
                <div>
                  <p className="m-0 mb-7 text-ink/70 text-[17px] leading-[1.8]">{a.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {a.tags.map((t) => (
                      <span
                        key={t}
                        className="font-medium text-[10.5px] tracking-[0.12em] uppercase border border-ink/15 text-ink/70 py-1.5 px-3 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6">
            <p className="m-0 font-display font-medium text-[clamp(22px,2.6vw,32px)] tracking-[-0.03em] max-w-[640px]">
              Not sure which practice your matter falls under?
            </p>
            <ArrowLink href="/contact" variant="dark">
              Describe it to us
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
