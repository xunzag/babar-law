import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { experience } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Appointments and engagements since 2004.",
};

export default function ExperiencePage() {
  return (
    <div>
      <PageHero eyebrow="Experience" title="Appointments since 2004" />
      <section className="max-w-[1120px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(50px,8vw,84px)] pb-26">
        {experience.map((x, i) => (
          <Reveal key={x.role + x.period} delay={Math.min(i * 0.04, 0.3)}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-7 py-8 border-b border-cream/9">
              <div className="max-w-55">
                <div className="text-gold text-[13.5px] tracking-wide mb-2">
                  {x.period}
                </div>
                <div className="text-cream/42 text-[13px] leading-snug">
                  {x.place}
                </div>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-[27px] mb-1.5 leading-tight text-white">
                  {x.role}
                </h3>
                <div className="text-gold-light/90 text-[15px] mb-3 tracking-wide">
                  {x.org}
                </div>
                {x.note && (
                  <p className="m-0 text-cream/62 text-base leading-[1.75] font-light">
                    {x.note}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
