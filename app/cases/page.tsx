import Reveal from "@/components/Reveal";
import CasesHero from "@/components/heroes/CasesHero";
import CountUp from "@/components/motion/CountUp";
import GrowBar from "@/components/motion/GrowBar";
import CasesExplorer from "@/components/CasesExplorer";
import { casesSummary as s, docketSample } from "@/lib/cases";
import DocketFeed from "@/components/DocketFeed";
import SectionHead from "@/components/SectionHead";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
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
    [s.registered, "Registered, High Court of Sindh"],
    [s.disposed, "Disposed of"],
    [s.pending, "Currently pending"],
    [s.judgments, "With a judgment on record"],
  ] as const;
  const groupMax = Math.max(...s.groups.map(([, n]) => n));
  const subjects = s.subjects.filter(([k]) => !["Other writ matters", "Bail"].includes(k)).slice(0, 8);

  return (
    <div>
      <CasesHero registered={s.registered} byYear={s.byYear} since={s.firstYear} />

      <section className="relative bg-ink-2 border-b border-cream/8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_25%_40%,black,transparent_70%)]" />
        <div className="relative max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(64px,9vw,120px)] grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(40px,6vw,96px)] items-start">
          <div>
            <SectionHead index="01" label="On the docket" title="Matters, as they appear in the register." className="mb-10" />
            <Reveal delay={0.1}>
              <DocketFeed items={docketSample(48)} total={s.listed} visible={6} />
            </Reveal>
          </div>
          <div className="lg:pt-4">
            <Stagger className="grid grid-cols-2 border-t border-cream/10 mb-14">
              {headline.map(([v, l], i) => (
                <StaggerItem key={l} className={`py-6 border-b border-cream/10 ${i % 2 ? "pl-6 border-l border-cream/10" : "pr-6"}`}>
                  <div className="font-display font-medium tracking-[-0.05em] text-gold-light text-[clamp(40px,4.4vw,60px)] leading-none mb-2.5">
                    <CountUp to={v} />
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.16em] leading-relaxed uppercase text-cream/45">{l}</div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mb-12">
              <div className="eyebrow mb-6">By jurisdiction</div>
              <Bars rows={s.groups as [string, number][]} max={groupMax} />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="eyebrow mb-6">By subject</div>
              <Bars rows={subjects as [string, number][]} max={subjects[0][1]} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] py-[clamp(52px,8vw,88px)]">
        <Reveal>
          <SectionHead index="02" label="Case register" title="Search the record." className="mb-5" />
          <p className="text-cream/55 text-[15px] leading-relaxed max-w-[680px] mb-10">
            {s.listed} matters from the High Court of Sindh case register, as generated on {s.generated}. Case numbers and
            titles are taken from the court&apos;s public record.
          </p>
          <CasesExplorer />
        </Reveal>
      </section>
    </div>
  );
}
