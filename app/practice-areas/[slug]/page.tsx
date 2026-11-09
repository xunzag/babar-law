import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SplitWords from "@/components/motion/SplitWords";
import { FadeIn } from "@/components/heroes/HeroFrame";
import Reveal from "@/components/Reveal";
import ArrowLink from "@/components/ArrowLink";
import PracticeIcon from "@/components/PracticeIcon";
import CountUp from "@/components/motion/CountUp";
import ParallaxImage from "@/components/motion/ParallaxImage";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import EngagementSteps from "@/components/EngagementSteps";
import FaqAccordion from "@/components/FaqAccordion";
import { articles } from "@/lib/insights";
import JsonLd from "@/components/JsonLd";
import { practiceBySlug, practicePages } from "@/lib/practice";
import { breadcrumbLd, pageMeta, siteUrl } from "@/lib/site";
import { callLines, firm } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return practicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/practice-areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = practiceBySlug(slug);
  if (!p) return {};
  return pageMeta({ title: p.seoTitle, description: p.description, path: `/practice-areas/${p.slug}` });
}

const wrap = "max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]";

// Years read as dates, so only real counts animate.
function Fact({ value }: { value: number | string }) {
  if (typeof value === "number" && value < 1900) return <CountUp to={value} />;
  return <>{value}</>;
}

export default async function PracticePage({ params }: PageProps<"/practice-areas/[slug]">) {
  const { slug } = await params;
  const p = practiceBySlug(slug);
  if (!p) notFound();
  const related = p.related.map((r) => practiceBySlug(r)).filter((r) => r !== undefined);
  const path = `/practice-areas/${p.slug}`;
  const guides = articles.filter((a) => a.practice === p.slug);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: p.title,
          serviceType: p.title,
          description: p.description,
          url: `${siteUrl}${path}`,
          image: `${siteUrl}${p.hero}`,
          provider: { "@id": `${siteUrl}/#firm` },
          areaServed: ["Pakistan", "United States", "United Kingdom", "Canada", "European Union", "United Arab Emirates"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: p.title,
            itemListElement: p.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
          },
        }}
      />
      {p.faqs && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
      <JsonLd
        data={breadcrumbLd([
          { name: "Practice areas", path: "/practice-areas" },
          { name: p.title, path },
        ])}
      />

      {/* Hero: full-bleed photograph, even scrim, text bottom-left */}
      <section className="relative min-h-[86svh] flex flex-col overflow-hidden bg-ink">
        <div className="absolute inset-0 settle">
          <Image src={p.hero} alt={p.heroAlt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: p.heroPos }} />
        </div>
        <div className="absolute inset-0 bg-ink/65 lg:bg-ink/58" />

        <div className={`relative flex-1 flex flex-col w-full ${wrap} pt-[clamp(112px,14vw,156px)] pb-[clamp(40px,6vw,72px)]`}>
          <nav aria-label="Breadcrumb" className="fade-rise flex flex-wrap items-center gap-2.5 text-[12.5px]">
            <Link href="/" className="text-cream/70 hover:text-white">
              Home
            </Link>
            <span className="text-cream/50">/</span>
            <Link href="/practice-areas" className="text-cream/70 hover:text-white">
              Practice areas
            </Link>
            <span className="text-cream/50">/</span>
            <span className="text-gold-light">{p.title}</span>
          </nav>

          <div className="mt-auto pt-16 max-w-[880px] [text-shadow:0_1px_24px_rgba(10,13,19,0.5)]">
            <FadeIn className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 bg-gold/15 border border-gold/50 backdrop-blur-sm flex items-center justify-center">
                <PracticeIcon num={p.num} className="w-5 h-5 text-gold-light" />
              </span>
              <span className="eyebrow text-gold-light!">Practice area {p.num.replace(/^0/, "")} of 7</span>
            </FadeIn>
            <SplitWords
              text={`${p.title}.`}
              className="font-display font-medium text-white text-[clamp(44px,7vw,104px)] leading-[0.94] tracking-[-0.045em] mb-7"
            />
            <FadeIn delay={0.3}>
              <p className="m-0 text-cream/90 text-[clamp(16px,1.6vw,20px)] leading-[1.6] max-w-[680px] mb-9">{p.lead}</p>
              <div className="flex flex-wrap gap-3">
                <ArrowLink href="/contact">Discuss your matter</ArrowLink>
                <ArrowLink href={firm.whatsapp} external variant="outline">
                  WhatsApp
                </ArrowLink>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="bg-ink border-b border-cream/8">
        <Stagger className={`${wrap} grid grid-cols-1 sm:grid-cols-3`}>
          {p.facts.map((f, i) => (
            <StaggerItem
              key={f.label}
              className={`py-6 sm:py-10 ${i ? "border-t sm:border-t-0 sm:border-l border-cream/10 sm:pl-8" : ""} ${i < 2 ? "sm:pr-8" : ""}`}
            >
              <div className="font-display font-medium text-gold-light text-[clamp(38px,4.6vw,60px)] leading-none tracking-[-0.045em] mb-3 tabular-nums">
                <Fact value={f.value} />
              </div>
              <div className="text-[14px] leading-snug text-cream/65 max-w-[300px]">{f.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Introduction beside a photograph */}
      <section className="bg-paper text-ink">
        <div className={`${wrap} py-[clamp(64px,9vw,130px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(40px,6vw,96px)] items-center`}>
          <Reveal>
            <div className="eyebrow text-gold-deep! mb-5">The practice</div>
            <h2 className="m-0 mb-8 font-display font-medium text-[clamp(22px,2.4vw,31px)] leading-[1.3] tracking-[-0.02em] text-ink">
              {p.body[0]}
            </h2>
            {p.body.slice(1).map((para) => (
              <p key={para.slice(0, 24)} className="m-0 mb-5 text-[17px] leading-[1.8] text-ink/75">
                {para}
              </p>
            ))}
            <p className="mt-8 mb-0 pl-5 border-l-2 border-gold-deep text-[15.5px] leading-relaxed text-ink/70">
              <strong className="font-medium text-ink">Who we act for:</strong> {p.forWhom}
            </p>
          </Reveal>
          <div className="relative">
            <ParallaxImage
              src={p.side}
              alt={p.sideAlt}
              className="aspect-[4/5] w-full"
              strength={6}
              sizes="(max-width: 1024px) 100vw, 40vw"
              imgStyle={{ objectPosition: p.sidePos ?? "center" }}
            />
            <div className="absolute -bottom-5 left-5 sm:left-auto sm:-right-6 bg-ink text-cream px-5 py-4 max-w-[260px] shadow-[0_24px_60px_rgba(10,13,19,0.25)]">
              <div className="text-[11px] font-medium tracking-[0.14em] uppercase text-gold mb-1">Babar Law Associates</div>
              <div className="text-[14px] leading-snug">Karachi · New York · Remote consultations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-ink">
        <div className={`${wrap} py-[clamp(72px,10vw,140px)]`}>
          <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5 mb-12">
            <div>
              <div className="eyebrow mb-4">What we handle</div>
              <h2 className="m-0 font-display font-medium text-white text-[clamp(30px,4.4vw,54px)] leading-[1.04]">
                {p.title}: our work.
              </h2>
            </div>
            <p className="m-0 max-w-[400px] text-cream/60 text-[15.5px] leading-relaxed">
              Every matter starts with an assessment by Mr. Babar personally, before any engagement or fee.
            </p>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10 border border-cream/10" stagger={0.06}>
            {p.services.map((s, i) => (
              <StaggerItem key={s} className="h-full">
                <div className="group relative h-full min-h-[104px] sm:min-h-[150px] bg-ink-3 p-5 sm:p-7 flex flex-col justify-between gap-5 sm:gap-8 overflow-hidden">
                  <span className="absolute inset-0 bg-gold origin-bottom scale-y-0 transition-transform duration-600 ease-out-expo group-hover:scale-y-100" />
                  <span className="relative text-[13px] font-medium tabular-nums text-gold group-hover:text-ink/70 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative font-display font-medium text-[clamp(19px,1.7vw,22px)] leading-[1.25] tracking-[-0.015em] text-white group-hover:text-ink transition-colors duration-300">
                    {s}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Guides from the insights section on this practice area */}
      {guides.length > 0 && (
        <section className="bg-paper-2 text-ink">
          <div className={`${wrap} pt-[clamp(72px,10vw,130px)] ${p.faqs ? "pb-[clamp(40px,5vw,64px)]" : "pb-[clamp(72px,10vw,130px)]"}`}>
            <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <div className="eyebrow text-gold-deep! mb-4">Guides</div>
                <h2 className="m-0 font-display font-medium text-[clamp(30px,4.4vw,54px)] leading-[1.04]">Read before you decide.</h2>
              </div>
              <ArrowLink href="/insights" variant="outlineDark">
                All insights
              </ArrowLink>
            </Reveal>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              {guides.map((a) => (
                <StaggerItem key={a.slug}>
                  <Link href={`/insights/${a.slug}`} className="group grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-5 sm:gap-7 items-center text-ink">
                    <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                      <Image
                        src={a.image}
                        alt={a.imageAlt}
                        fill
                        sizes="(max-width: 768px) 45vw, 22vw"
                        className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
                        style={{ objectPosition: a.imagePos }}
                      />
                    </div>
                    <div>
                      <div className="text-[12px] font-medium tracking-[0.14em] uppercase text-gold-deep mb-2">{a.readMinutes} min read</div>
                      <h3 className="m-0 font-display font-medium text-[clamp(19px,1.9vw,25px)] leading-[1.18] tracking-[-0.02em] group-hover:text-gold-deep transition-colors">
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Common questions */}
      {p.faqs && (
        <section className="bg-paper-2 text-ink">
          <div className={`${wrap} ${guides.length > 0 ? "pt-[clamp(40px,5vw,64px)]" : "pt-[clamp(72px,10vw,130px)]"} pb-[clamp(72px,10vw,130px)] grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-x-[clamp(40px,6vw,96px)] gap-y-10`}>
            <Reveal className="lg:sticky lg:top-28 self-start">
              <div className="eyebrow text-gold-deep! mb-4">Common questions</div>
              <h2 className="m-0 mb-5 font-display font-medium text-[clamp(30px,4.4vw,54px)] leading-[1.04]">Questions clients ask.</h2>
              <p className="m-0 max-w-[380px] text-ink/60 text-[15.5px] leading-relaxed">
                General answers only. Every case turns on its own facts, so send a short summary for advice on yours.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <FaqAccordion items={p.faqs} />
            </Reveal>
          </div>
        </section>
      )}

      {/* How an engagement begins */}
      <section className="bg-paper text-ink">
        <div className={`${wrap} py-[clamp(72px,10vw,130px)]`}>
          <Reveal className="mb-12 sm:mb-16 max-w-[700px]">
            <div className="eyebrow text-gold-deep! mb-4">How it works</div>
            <h2 className="m-0 font-display font-medium text-[clamp(30px,4.4vw,54px)] leading-[1.04]">How an engagement begins.</h2>
          </Reveal>
          <EngagementSteps />
          <Reveal className="mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-ink text-cream p-[clamp(24px,4vw,44px)]">
            <div>
              <h3 className="m-0 mb-2 font-display font-medium text-white text-[clamp(22px,2.4vw,30px)] leading-tight">
                Ready to discuss your matter?
              </h3>
              <p className="m-0 text-cream/65 text-[15px]">
                Call {callLines[2].number} or {callLines[0].number}, or send a short summary online.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <ArrowLink href="/contact">Send an enquiry</ArrowLink>
              <ArrowLink href={firm.whatsapp} external variant="outline">
                WhatsApp
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related practice areas */}
      {related.length > 0 && (
        <section className="bg-ink border-t border-cream/8">
          <div className={`${wrap} py-[clamp(64px,9vw,120px)]`}>
            <Reveal className="mb-10">
              <div className="eyebrow mb-4">Related practice areas</div>
              <h2 className="m-0 font-display font-medium text-white text-[clamp(28px,3.6vw,44px)] leading-[1.05]">Often handled together.</h2>
            </Reveal>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link href={`/practice-areas/${r.slug}`} className="group relative block aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-ink-3 text-cream">
                    <Image
                      src={r.hero}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
                      style={{ objectPosition: r.heroPos }}
                    />
                    <span className="absolute inset-0 bg-ink/55 group-hover:bg-ink/45 transition-colors duration-500" />
                    <span className="absolute inset-x-0 bottom-0 p-[clamp(20px,3vw,32px)] flex items-end justify-between gap-6">
                      <span>
                        <span className="block text-[12px] font-medium tracking-[0.14em] uppercase text-gold-light mb-2">
                          Practice area
                        </span>
                        <span className="block font-display font-medium text-white text-[clamp(24px,2.6vw,34px)] leading-[1.08] tracking-[-0.03em]">
                          {r.title}
                        </span>
                      </span>
                      <span className="shrink-0 w-12 h-12 border border-cream/40 flex items-center justify-center text-white text-lg transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:text-ink group-hover:-rotate-45">
                        →
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-10">
              <ArrowLink href="/practice-areas" variant="outline">
                All practice areas
              </ArrowLink>
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
