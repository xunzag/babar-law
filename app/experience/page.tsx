import ExperienceHero from "@/components/heroes/ExperienceHero";
import Reveal from "@/components/Reveal";
import { experience } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Appointments and engagements since 2004.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div>
      <ExperienceHero count={experience.length} />
      <section className="bg-paper text-ink">
        <div className="max-w-[1200px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(64px,9vw,120px)]">
          <div className="relative">
            {/* Timeline spine */}
            <div className="absolute left-[7px] md:left-[227px] top-2 bottom-2 w-px bg-ink/15" />
            {experience.map((x) => (
              <Reveal key={x.role + x.period + x.org}>
                <div className="group relative grid md:grid-cols-[200px_minmax(0,1fr)] gap-x-14 gap-y-2 pl-9 md:pl-0 py-8">
                  <span className="absolute left-0 md:left-[220px] top-10 w-[15px] h-[15px] rounded-full border border-ink/30 bg-paper group-hover:bg-gold group-hover:border-gold-deep transition-colors duration-300" />
                  <div className="md:text-right md:pt-1.5">
                    <div className="font-mono text-[12px] text-gold-deep mb-1.5">{x.period}</div>
                    <div className="text-ink/45 text-[13px] leading-snug">{x.place}</div>
                  </div>
                  <div className="md:pl-2">
                    <h3 className="m-0 font-display font-medium text-[clamp(24px,2.6vw,32px)] leading-[1.1] mb-2">
                      {x.role}
                    </h3>
                    <div className="text-ink/75 text-[15.5px] mb-3">{x.org}</div>
                    {x.note && <p className="m-0 text-ink/60 text-[15.5px] leading-[1.75] max-w-[720px]">{x.note}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
