import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
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
          <div className="h-full bg-gold" style={{ width: `${(n / max) * 100}%` }} />
        </div>
      </div>
    ))}
  </div>
);

export default function CasesPage() {
  const headline = [
    [String(s.registered), "Matters registered before the High Court of Sindh"],
    [String(s.disposed), "Disposed of"],
    [String(s.pending), "Currently pending"],
    [String(s.judgments), "With a judgment on record"],
  ];
  const yearMax = Math.max(...s.byYear.map(([, n]) => n));
  const groupMax = Math.max(...s.groups.map(([, n]) => n));
  const subjects = s.subjects.filter(([k]) => !["Other writ matters", "Bail"].includes(k)).slice(0, 8);

  return (
    <div>
      <PageHero
        eyebrow="Case portfolio"
        title="A record before the High Court of Sindh"
        description="Constitutional petitions, bail, criminal and civil matters, argued at Karachi and the Sukkur, Larkana and Hyderabad benches since 2008."
      />

      <section className="bg-ink-2 border-b border-gold/16">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] overflow-hidden">
          <div className="-ml-px grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {headline.map(([v, l]) => (
              <div key={l} className="py-11 px-8 border-l border-gold/16">
                <div className="font-serif text-gold-light text-[clamp(38px,5vw,56px)] leading-none mb-3">{v}</div>
                <div className="text-cream/50 text-xs tracking-[0.12em] leading-relaxed uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(52px,8vw,88px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-x-[clamp(36px,6vw,80px)] gap-y-14">
          <Reveal>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-6">By jurisdiction</div>
            <Bars rows={s.groups as [string, number][]} max={groupMax} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-6">By subject</div>
            <Bars rows={subjects as [string, number][]} max={subjects[0][1]} />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-3 border-y border-gold/18">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(52px,8vw,84px)]">
          <Reveal>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-3">Filed each year</div>
            <h2 className="font-serif font-medium text-[clamp(26px,4vw,38px)] text-white mb-10">Steady work for over fifteen years</h2>
            <div className="flex items-end gap-1.5 sm:gap-2.5 h-56 border-b border-gold/25">
              {s.byYear.map(([y, n]) => (
                <div key={y} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <span className="text-gold-light text-[11px] mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">{n}</span>
                  <div className="w-full bg-gold/70 group-hover:bg-gold-light transition-colors" style={{ height: `${(n / yearMax) * 100}%` }} />
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 sm:gap-2.5 mt-2.5">
              {s.byYear.map(([y]) => (
                <div key={y} className="flex-1 text-center text-cream/40 text-[10px] sm:text-[11px]">
                  {String(y).slice(2)}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(52px,8vw,88px)]">
        <Reveal>
          <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-3">Case register</div>
          <h2 className="font-serif font-medium text-[clamp(26px,4vw,38px)] text-white mb-3">Search the record</h2>
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
