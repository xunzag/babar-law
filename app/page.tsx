import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImageGrid from "@/components/ImageGrid";
import LogoBadge from "@/components/LogoBadge";
import LogoMarquee from "@/components/LogoMarquee";
import PracticeIcon from "@/components/PracticeIcon";
import {
  stats,
  areasHome,
  recognition,
  cooperationLogos,
  ublSpotlight,
  honors,
} from "@/lib/content";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden border-b border-gold/25">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/court.png"
            alt="Supreme Court of Pakistan at night"
            fill
            priority
            className="object-cover animate-[heroDrift_26s_ease-in-out_infinite_alternate]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,6,8,0.78)_0%,rgba(6,6,8,0.58)_46%,rgba(6,6,8,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,8,10,0.96)_0%,rgba(8,8,10,0.35)_22%,rgba(8,8,10,0)_40%)]" />
        <div className="relative max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(104px,16vw,150px)] pb-23 w-full">
          <div className="max-w-[830px] animate-[fadeUp_.9s_cubic-bezier(.22,.61,.36,1)_both]">
            <div className="flex items-center gap-4 mb-7.5">
              <span className="w-11.5 h-px bg-gold block" />
              <span className="text-gold text-[11.5px] tracking-[0.36em] uppercase">
                Karachi · New York · Cyprus
              </span>
            </div>
            <h1 className="font-serif font-medium text-[clamp(38px,7.4vw,78px)] leading-[1.04] mb-7.5 tracking-[-0.015em] text-white text-pretty">
              Counsel of consequence, across borders.
            </h1>
            <p className="text-[19px] leading-[1.7] text-cream/78 max-w-[620px] mb-11 font-light">
              Babar Law Associates is the practice of{" "}
              <span className="text-gold-light">Ghulam Shabbir Babar</span>,
              Attorney at Law and LLM (Europe), advising private clients,
              investors and institutions in Pakistan, the United States, the
              United Kingdom and the European Union since 2004.
            </p>
            <div className="flex gap-4.5 flex-wrap">
              <Link
                href="/contact"
                className="bg-gold text-ink py-4.25 px-9 text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-gold-light"
              >
                Book a consultation
              </Link>
              <Link
                href="/practice-areas"
                className="border border-cream/35 text-cream py-4.25 px-9 text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 hover:border-gold hover:text-gold-light"
              >
                Practice areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Logo marquee */}
      <section className="bg-ink-6 border-b border-gold/16 py-9">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] mb-6">
          <span className="text-cream/34 text-[10.5px] tracking-[0.32em] uppercase whitespace-nowrap">
            In partnership across three continents
          </span>
        </div>
        <LogoMarquee items={cooperationLogos} />
      </section>

      {/* Stats */}
      <section className="bg-ink-2 border-b border-gold/16">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] overflow-hidden">
          <div className="-ml-px grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]">
            {stats.map((s) => (
              <div key={s.label} className="py-11.5 px-8.5 border-l border-gold/16">
                <div className="font-serif text-gold-light text-[clamp(24px,3.4vw,32px)] leading-tight mb-3 text-pretty">
                  {s.value}
                </div>
                <div className="text-cream/50 text-xs tracking-[0.12em] leading-relaxed uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice areas */}
      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-[clamp(62px,10vw,110px)] pb-5">
        <Reveal className="flex items-end justify-between gap-9 flex-wrap mb-13">
          <div>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-4.5">
              Practice areas
            </div>
            <h2 className="font-serif font-medium text-[clamp(30px,5.6vw,52px)] tracking-[-0.01em] text-white leading-[1.1]">
              A practice built across jurisdictions
            </h2>
          </div>
          <Link
            href="/practice-areas"
            className="text-gold text-[12.5px] tracking-[0.16em] uppercase pb-2 border-b border-gold/40 transition-colors duration-300 hover:border-gold-light hover:text-gold-light"
          >
            View all areas →
          </Link>
        </Reveal>
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-px bg-gold/16 border border-gold/16">
          {areasHome.map((a) => (
            <div
              key={a.num}
              className="bg-ink-4 py-11.5 px-9.5 transition-all duration-350 hover:bg-ink-5 hover:-translate-y-1"
            >
              <div className="w-12.5 h-12.5 border border-gold/35 flex items-center justify-center mb-6">
                <PracticeIcon num={a.num} className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif font-semibold text-[26px] mb-3.5 leading-tight text-white">
                {a.title}
              </h3>
              <p className="m-0 text-cream/60 text-[15.5px] leading-[1.75] font-light">
                {a.body}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* About teaser */}
      <section className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-25">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(36px,6vw,76px)] items-center">
          <div className="relative">
            <div className="absolute inset-[22px_-22px_-22px_22px] border border-gold/45" />
            <div className="relative w-full aspect-[4/5]">
              <Image
                src="/assets/home-and-about-page.png"
                alt="Ghulam Shabbir Babar at his desk, Babar Law Associates, Karachi"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-5">
              About the firm
            </div>
            <h2 className="font-serif font-medium text-[clamp(28px,5vw,46px)] mb-6.5 leading-[1.15] tracking-[-0.01em] text-white">
              A sole practice with an international bench
            </h2>
            <p className="text-cream/78 text-[17.5px] leading-[1.8] font-light mb-5">
              Babar Ghulam Shabbir is sole Partner of Babar Law Associates,
              lawyer, academician and international consultant in
              immigration, corporate and commercial matters, in litigation
              practice since 2004.
            </p>
            <p className="text-cream/60 text-[17px] leading-[1.8] font-light mb-9">
              The firm works alongside the Law Offices of Manuel B. Quintal,
              P.C. in New York, sits on the UBL legal panel, and is an
              Associated Partner of the European Master in Law and Economics
              at Erasmus University Rotterdam.
            </p>
            <Link
              href="/about"
              className="inline-block border border-cream/30 text-cream py-4 px-[clamp(18px,4.2vw,32px)] text-[12.5px] tracking-[0.16em] uppercase transition-all duration-300 hover:border-gold hover:text-gold-light"
            >
              Read full profile
            </Link>
          </div>
        </Reveal>
      </section>

      {/* UBL Legal Panel spotlight */}
      <section className="bg-[linear-gradient(180deg,#0c0c0e_0%,#0a0a0b_100%)] border-t border-b border-gold/18">
        <Reveal className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(56px,9vw,96px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(34px,5.6vw,70px)] items-center">
          <div>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-5">
              {ublSpotlight.eyebrow}
            </div>
            <h2 className="font-serif font-medium text-[clamp(28px,4.8vw,44px)] mb-5.5 leading-[1.15] text-white max-w-[560px]">
              {ublSpotlight.heading}
            </h2>
            <p className="text-cream/62 text-base leading-[1.8] font-light max-w-[560px] mb-8">
              {ublSpotlight.body}
            </p>
            <a
              href={ublSpotlight.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold text-gold py-3.5 px-7 text-[12.5px] tracking-[0.16em] uppercase transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              {ublSpotlight.cta} →
            </a>
          </div>
          <div className="justify-self-center">
            <LogoBadge src={ublSpotlight.logo} alt="UBL, United Bank Limited" size="md" />
          </div>
        </Reveal>
      </section>

      {/* Honor */}
      {honors.map((h) => (
        <section key={h.title} className="border-b border-gold/18 bg-ink-2">
          <Reveal className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(50px,8vw,80px)]">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-11.5 h-px bg-gold block" />
              <span className="text-gold text-[11.5px] tracking-[0.36em] uppercase">
                {h.eyebrow}
              </span>
            </div>
            <h2 className="font-serif font-medium text-[clamp(26px,4.4vw,40px)] leading-[1.25] text-white max-w-[880px] mb-4.5">
              {h.title}
            </h2>
            <p className="m-0 text-gold-light/85 text-[15.5px] mb-2">{h.org}</p>
            <p className="m-0 text-cream/55 text-[15px] font-light">{h.meta}</p>
          </Reveal>
        </section>
      ))}

      {/* Global network, editorial layout */}
      <section className="bg-ink-3 border-b border-gold/18">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(56px,9vw,96px)] grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[clamp(40px,6vw,80px)]">
          <Reveal>
            <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-5">
              Global network
            </div>
            <h2 className="font-serif font-medium text-[clamp(28px,4.4vw,42px)] text-white leading-[1.2] mb-6 max-w-[420px]">
              Cooperation across immigration, investment and law
            </h2>
            <p className="text-cream/58 text-base leading-[1.8] font-light max-w-[420px] mb-8">
              Standing arrangements with firms, developers, banks and
              universities in the United States, Cyprus, Greece, Portugal,
              the Netherlands and Pakistan.
            </p>
            <Link
              href="/international"
              className="inline-block text-gold text-[12.5px] tracking-[0.16em] uppercase pb-2 border-b border-gold/40 transition-colors duration-300 hover:border-gold-light hover:text-gold-light"
            >
              All partnerships →
            </Link>
          </Reveal>
          <Reveal delay={0.08} className="divide-y divide-gold/12 border-t border-gold/12">
            {cooperationLogos.map((p) => {
              const row = (
                <div className="flex items-center gap-6 py-6 group">
                  <div className="h-14 w-32 bg-[#f7f4ec] flex items-center justify-center shrink-0 p-3">
                    <div className="relative w-full h-full">
                      <Image
                        src={p.logo!}
                        alt={p.name}
                        fill
                        className="object-contain"
                        sizes="140px"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-lg text-white leading-tight truncate">
                      {p.name}
                    </div>
                    <div className="text-cream/45 text-[12.5px] tracking-wide truncate">
                      {p.country} · {p.role}
                    </div>
                  </div>
                  {p.url && (
                    <span className="text-gold text-lg shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </div>
              );
              return p.url ? (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {row}
                </a>
              ) : (
                <div key={p.name}>{row}</div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Recognition */}
      <section className="border-t border-gold/18">
        <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(56px,9vw,96px)]">
          <Reveal className="flex items-end justify-between gap-8 flex-wrap mb-11.5">
            <div>
              <div className="text-gold text-[11.5px] tracking-[0.36em] uppercase mb-4.5">
                Recognition
              </div>
              <h2 className="font-serif font-medium text-[clamp(29px,5.2vw,48px)] text-white leading-[1.12]">
                Invited to speak, asked to advise
              </h2>
            </div>
            <p className="m-0 text-cream/55 text-base font-light max-w-[380px] leading-relaxed">
              Speaking engagements, awards and appearances for bar
              associations, universities and the British Council.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageGrid items={recognition} variant="recognition" />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-gold/20">
        <Image
          src="/assets/court.png"
          alt=""
          fill
          className="absolute inset-0 object-cover opacity-22"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.96),rgba(8,8,10,0.7))]" />
        <Reveal className="relative max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] py-[clamp(60px,10vw,104px)] flex items-center justify-between gap-[clamp(28px,4.4vw,52px)] flex-wrap">
          <div>
            <h2 className="font-serif font-medium text-[clamp(28px,4.8vw,44px)] mb-3.5 leading-[1.2] text-white">
              Speak with counsel directly
            </h2>
            <p className="m-0 text-cream/68 text-[17.5px] font-light">
              Consultations in Karachi, by appointment in New York, and
              remotely worldwide.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-gold text-ink py-4.5 px-9.5 text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-gold-light"
          >
            Book a consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
