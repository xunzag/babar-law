import Reveal from "@/components/Reveal";
import CasesHero from "@/components/heroes/CasesHero";
import CountUp from "@/components/motion/CountUp";
import GrowBar from "@/components/motion/GrowBar";
import CasesExplorer from "@/components/CasesExplorer";
import { casesSummary as s } from "@/lib/cases";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases",
  description: `${s.registered} matters registered before the High Court of Sindh across constitutional, criminal, bail and civil jurisdictions.`,
  alternates: { canonical: "/cases" },
};

const Bars = ({ rows, max }: { rows: [string, number][]; max: number }) => (
  <div className="grid gap-4">
    {rows.map(([label, n]) => (
      <div key={label}>
        <div className="flex justify-between text-[14px] mb-1.5">
          <span className="text-cream/80">{label}</span>
          <span className="text-gold-light">{n}</span>
        </div>
        <div className="h-[3px] bg-cream/10">
          <GrowBar pct={(n / max) * 100} className="h-full bg-gold" />
        </div>
      </div>
    ))}
  </div>
);

export default function CasesPage() {
  const headline = [
    [s.registered, "Matters registered before the High Court of Sindh"],
    [s.disposed, "Disposed of"],
    [s.pending, "Currently pending"],
    [s.judgments, "With a judgment on record"],
  ] as const;
  const groupMax = Math.max(...s.groups.map(([, n]) => n));
  const subjects = s.subjects.filter(([k]) => !["Other writ matters", "Bail"].includes(k)).slice(0, 8);

  return (
    <div>
      <CasesHero registered={s.registered} byYear={s.byYear} since={s.firstYear} />

      <section className="bg-ink-2 border-b border-gold/16">
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] overflow-hidden">
          <div className="-ml-px grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {headline.map(([v, l]) => (
              <div key={l} className="py-11 px-8 border-l border-gold/16">
                <div className="font-display font-medium tracking-[-0.04em] text-gold-light text-[clamp(38px,5vw,56px)] leading-none mb-3"><CountUp to={v} /></div>
                <div className="text-cream/50 text-xs tracking-[0.12em] leading-relaxed uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(52px,8vw,88px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-x-[clamp(36px,6vw,80px)] gap-y-14">
          <Reveal>
            <div className="eyebrow mb-6">By jurisdiction</div>
            <Bars rows={s.groups as [string, number][]} max={groupMax} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="eyebrow mb-6">By subject</div>
            <Bars rows={subjects as [string, number][]} max={subjects[0][1]} />
          </Reveal>
        </div>
      </section>


      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(52px,8vw,88px)]">
        <Reveal>
          <div className="eyebrow mb-3">Case register</div>
          <h2 className="font-display font-medium text-[clamp(26px,4vw,38px)] text-white mb-3">Search the record</h2>
          <p className="text-cream/55 text-[15px] font-light leading-relaxed max-w-[680px] mb-10">
            {s.listed} matters from the High Court of Sindh case register, as generated on {s.generated}. Case numbers and
            titles are taken from the court&apos;s public record.
          </p>
          <CasesExplorer />
        </Reveal>
      </section>
    </div>
  );
}
