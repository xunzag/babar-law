import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImageGrid from "@/components/ImageGrid";
import LogoBadge from "@/components/LogoBadge";
import LogoMarquee from "@/components/LogoMarquee";
import PracticeIcon from "@/components/PracticeIcon";
import HomeHero from "@/components/heroes/HomeHero";
import GavelBand from "@/components/GavelBand";
import SectionHead from "@/components/SectionHead";
import ArrowLink from "@/components/ArrowLink";
import CountUp from "@/components/motion/CountUp";
import ScrollText from "@/components/motion/ScrollText";
import ParallaxImage from "@/components/motion/ParallaxImage";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { casesSummary } from "@/lib/cases";
import {
  areasHome,
  recognition,
  cooperationLogos,
  ublSpotlight,
  honors,
  partners,
  associates,
  principal,
  teamGroups,
  initials,
} from "@/lib/content";

const wrap = "max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]";

export default function HomePage() {
  const stats: [number, string, string?][] = [
    [new Date().getFullYear() - 2004, "Years in practice", "+"],
    [casesSummary.registered, "Matters before the High Court"],
    [associates.length + 1, "Members of chambers"],
    [partners.length, "International cooperations"],
  ];

  return (
    <div>
      <HomeHero />

      {/* Statement + numbers, on paper */}
      <section className="bg-paper text-ink">
        <div className={`${wrap} pt-[clamp(80px,12vw,160px)] pb-[clamp(64px,9vw,120px)]`}>
          <div className="eyebrow text-gold-deep! mb-10 flex items-center gap-3">
            <span>01</span>
            <span className="w-8 h-px bg-gold-deep/60" />
            <span>The firm</span>
          </div>
          <ScrollText
            text="Since 2004, Babar Law Associates has argued before the courts of Pakistan and advised clients whose lives and investments cross borders, from Karachi to New York, Nicosia, Athens and Toronto."
            highlight={["2004,", "Karachi", "New", "York,"]}
            className="font-display font-medium text-[clamp(28px,4.4vw,62px)] leading-[1.08] tracking-[-0.035em] max-w-[1180px] m-0"
          />
          <Stagger className="mt-[clamp(64px,9vw,120px)] grid grid-cols-2 lg:grid-cols-4 border-t border-ink/15">
            {stats.map(([n, label, suffix], i) => (
              <StaggerItem
                key={label}
                className={`pt-8 pb-2 pr-6 ${i % 2 ? "pl-6 border-l border-ink/15" : ""} ${
                  i === 2 ? "lg:pl-6 lg:border-l border-ink/15" : ""
                } ${i >= 2 ? "max-lg:mt-8 max-lg:border-t max-lg:border-ink/15" : ""}`}
              >
                <div className="font-display font-medium text-[clamp(52px,7vw,96px)] leading-[0.85] tracking-[-0.05em] mb-4">
                  <CountUp to={n} suffix={suffix} />
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55">{label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Partner logos */}
      <section className="bg-paper-2 border-y border-ink/10 py-8">
        <div className={`${wrap} mb-5`}>
          <span className="font-mono text-ink/45 text-[10.5px] tracking-[0.22em] uppercase">
            In cooperation across three continents
          </span>
        </div>
        <LogoMarquee items={cooperationLogos} />
      </section>

      {/* Practice areas: interactive index */}
      <section className="bg-ink">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <SectionHead
            index="02"
            label="Practice areas"
            title={
              <>
                A practice built <span className="text-gold">across jurisdictions.</span>
              </>
            }
            aside={
              <ArrowLink href="/practice-areas" variant="outline">
                All practice areas
              </ArrowLink>
            }
          />
          <Stagger className="border-t border-cream/10" stagger={0.06}>
            {areasHome.map((a) => (
              <StaggerItem key={a.num}>
                <Link
                  href={`/practice-areas#area-${a.num}`}
                  className="group relative grid grid-cols-[40px_minmax(0,1fr)_32px] lg:grid-cols-[80px_minmax(0,0.9fr)_minmax(0,1fr)_48px] items-center gap-x-6 gap-y-3 py-[clamp(22px,3vw,34px)] border-b border-cream/10 overflow-hidden text-cream"
                >
                  <span className="absolute inset-0 bg-gold origin-bottom scale-y-0 transition-transform duration-600 ease-out-expo group-hover:scale-y-100" />
                  <span className="relative font-mono text-[12px] text-gold group-hover:text-ink/60 transition-colors">
                    {a.num}
                  </span>
                  <h3 className="relative m-0 font-display font-medium text-[clamp(24px,3.2vw,42px)] leading-[1.05] text-white group-hover:text-ink transition-colors duration-300">
                    {a.title}
                  </h3>
                  <p className="relative m-0 hidden lg:block text-[15px] leading-[1.65] text-cream/55 group-hover:text-ink/75 transition-colors duration-300">
                    {a.body}
                  </p>
                  <span className="relative justify-self-end w-10 h-10 border border-cream/15 group-hover:border-ink/30 flex items-center justify-center transition-all duration-500 group-hover:rotate-[-45deg]">
                    <PracticeIcon num={a.num} className="w-4.5 h-4.5 text-gold group-hover:hidden" />
                    <span className="hidden group-hover:block text-ink">→</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <GavelBand />

      {/* Principal */}
      <section className="bg-ink-2 border-y border-cream/8">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)] grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-[clamp(40px,7vw,120px)] items-center`}>
          <div className="relative">
            <ParallaxImage
              src="/assets/home-and-about-page.png"
              alt="Ghulam Shabbir Babar at his desk, Babar Law Associates, Karachi"
              className="aspect-[4/5] w-full"
            />
            <div className="absolute -bottom-5 -right-5 sm:-right-8 bg-gold text-ink px-5 py-4 max-w-[220px]">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-70 mb-1">Principal</div>
              <div className="font-display font-semibold text-[17px] leading-tight tracking-[-0.02em]">
                {principal.name}
              </div>
            </div>
          </div>
          <div>
            <SectionHead
              index="03"
              label="The principal"
              title="An advocate of the High Court, with an international bench."
              className="mb-9"
            />
            <Reveal delay={0.1}>
              <p className="text-cream/80 text-[clamp(17px,1.5vw,19px)] leading-[1.75] mb-5">
                Ghulam Shabbir Babar is Partner of Babar Law Associates: lawyer, academician and international
                consultant in immigration, corporate and commercial matters, in litigation practice since 2004.
              </p>
              <p className="text-cream/55 text-[16px] leading-[1.8] mb-10">
                The firm works alongside the Law Offices of Manuel B. Quintal, P.C. in New York, sits on the UBL
                legal panel, and is an Associated Partner of the European Master in Law and Economics at Erasmus
                University Rotterdam.
              </p>
              <ArrowLink href="/about" variant="outline">
                Read the full profile
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chambers teaser */}
      <section className="bg-paper text-ink">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <SectionHead
            tone="light"
            index="04"
            label="The chambers"
            title={
              <>
                {associates.length + 1} people. <span className="text-gold-deep">One docket.</span>
              </>
            }
            aside={
              <ArrowLink href="/associates" variant="dark">
                Meet the associates
              </ArrowLink>
            }
          />
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/12 border border-ink/12">
            {teamGroups.map((g) => {
              const members = g.id === "partners" ? [principal, ...associates.filter((a) => a.group === g.id)] : associates.filter((a) => a.group === g.id);
              return (
                <StaggerItem key={g.id} className="bg-paper p-7 flex flex-col gap-6 min-h-[280px]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/50">{g.label}</span>
                    <span className="font-mono text-[11px] text-gold-deep">{String(members.length).padStart(2, "0")}</span>
                  </div>
                  <ul className="m-0 p-0 list-none grid gap-3 mt-auto">
                    {members.map((m) => (
                      <li key={m.name} className="flex items-center gap-3">
                        <span className="w-8 h-8 shrink-0 rounded-full border border-ink/20 flex items-center justify-center font-display text-[11px] font-semibold tracking-[-0.02em]">
                          {initials(m.name)}
                        </span>
                        <span className="text-[15px] leading-tight">
                          {m.name}
                          {"role" in m && m.role && (
                            <span className="block font-mono text-[10px] tracking-[0.12em] uppercase text-gold-deep mt-0.5">
                              {m.role}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Case record */}
      <section className="bg-ink">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)] grid lg:grid-cols-2 gap-[clamp(40px,6vw,96px)] items-center`}>
          <div>
            <SectionHead
              index="05"
              label="Case portfolio"
              title="A record before the High Court of Sindh."
              className="mb-7"
            />
            <Reveal delay={0.1}>
              <p className="text-cream/55 text-[16px] leading-[1.8] max-w-[480px] mb-10">
                Constitutional petitions, bail, criminal and civil matters since {casesSummary.firstYear},
                searchable by case number, party and subject.
              </p>
              <ArrowLink href="/cases">Search the register</ArrowLink>
            </Reveal>
          </div>
          <Stagger className="grid grid-cols-2 gap-px bg-cream/10 border border-cream/10">
            {(
              [
                [casesSummary.registered, "Matters registered"],
                [casesSummary.disposed, "Disposed of"],
                [casesSummary.judgments, "Judgments on record"],
                [casesSummary.seats.length, "Court benches"],
              ] as [number, string][]
            ).map(([v, l]) => (
              <StaggerItem key={l} className="bg-ink-3 p-[clamp(20px,3vw,36px)] aspect-[5/4] flex flex-col justify-between">
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cream/45">{l}</div>
                <div className="font-display font-medium text-[clamp(44px,6vw,80px)] leading-[0.85] tracking-[-0.05em] text-gold-light">
                  <CountUp to={v} />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Distinctions */}
      <section className="bg-ink-3 border-y border-cream/8">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <SectionHead index="06" label="Distinctions" title="Trusted by institutions." />
          <div className="grid lg:grid-cols-2 gap-5">
            <Reveal className="h-full">
              <a
                href={ublSpotlight.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-full flex flex-col justify-between gap-12 border border-cream/10 bg-ink-4 p-[clamp(24px,4vw,48px)] transition-colors duration-500 hover:border-gold/50"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="eyebrow">{ublSpotlight.eyebrow}</span>
                  <LogoBadge src={ublSpotlight.logo} alt="UBL, United Bank Limited" size="sm" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-white text-[clamp(26px,3vw,38px)] leading-[1.1] mb-4">
                    {ublSpotlight.heading}
                  </h3>
                  <p className="text-cream/55 text-[15.5px] leading-[1.75] mb-6 max-w-[520px]">{ublSpotlight.body}</p>
                  <span className="text-gold text-[13px] font-medium inline-flex gap-2 items-center">
                    {ublSpotlight.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </a>
            </Reveal>
            {honors.map((h) => (
              <Reveal key={h.title} delay={0.1} className="h-full">
                <div className="relative h-full overflow-hidden flex flex-col justify-between gap-12 border border-gold/30 bg-[linear-gradient(145deg,rgba(195,160,102,0.14),rgba(195,160,102,0.02))] p-[clamp(24px,4vw,48px)]">
                  <div className="absolute -right-6 -top-10 font-display font-semibold text-[200px] leading-none text-gold/8 select-none">
                    ✦
                  </div>
                  <span className="eyebrow relative">{h.eyebrow} · 2026</span>
                  <div className="relative">
                    <h3 className="font-display font-medium text-white text-[clamp(26px,3vw,38px)] leading-[1.1] mb-4">
                      {h.title}
                    </h3>
                    <p className="text-gold-light/90 text-[15px] mb-2">{h.org}</p>
                    <p className="text-cream/50 text-[14.5px] m-0">{h.meta}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global network */}
      <section className="bg-ink">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)] grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-[clamp(40px,6vw,96px)]`}>
          <div className="lg:sticky lg:top-32 self-start">
            <SectionHead
              index="07"
              label="Global network"
              title="Cooperation across immigration, investment and law."
              className="mb-7"
            />
            <Reveal delay={0.1}>
              <p className="text-cream/55 text-[16px] leading-[1.8] max-w-[420px] mb-10">
                Standing arrangements with firms, developers, banks and universities in the United States, Cyprus,
                Greece, Portugal, the Netherlands and Pakistan.
              </p>
              <ArrowLink href="/international" variant="outline">
                All partnerships
              </ArrowLink>
            </Reveal>
          </div>
          <Stagger className="border-t border-cream/10" stagger={0.05}>
            {cooperationLogos.map((p) => {
              const row = (
                <div className="flex items-center gap-6 py-5 group">
                  <div className="h-14 w-32 bg-paper flex items-center justify-center shrink-0 p-3 transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]">
                    <div className="relative w-full h-full">
                      <Image src={p.logo} alt={p.name} fill className="object-contain" sizes="140px" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[17px] text-white leading-tight truncate tracking-[-0.01em]">{p.name}</div>
                    <div className="font-mono text-cream/40 text-[10.5px] tracking-[0.12em] uppercase truncate mt-1.5">
                      {p.country}
                    </div>
                  </div>
                  {p.url && (
                    <span className="text-gold text-lg shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  )}
                </div>
              );
              return (
                <StaggerItem key={p.name} className="border-b border-cream/10">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                      {row}
                    </a>
                  ) : (
                    row
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Recognition */}
      <section className="bg-ink-2 border-t border-cream/8">
        <div className={`${wrap} py-[clamp(80px,11vw,150px)]`}>
          <SectionHead
            index="08"
            label="Recognition"
            title="Invited to speak, asked to advise."
            aside={
              <p className="m-0 text-cream/50 text-[15.5px] max-w-[380px] leading-relaxed">
                Speaking engagements, awards and appearances for bar associations, universities and the British
                Council.
              </p>
            }
          />
          <Reveal delay={0.1}>
            <ImageGrid items={recognition} variant="recognition" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
